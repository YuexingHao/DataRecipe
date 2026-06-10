#!/usr/bin/env python3
import json
import os
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from openai import OpenAI

HOST = os.getenv("DATARECIPE_PREDICTION_HOST", "127.0.0.1")
PORT = int(os.getenv("DATARECIPE_PREDICTION_PORT", "8787"))
ENDPOINT = os.getenv(
    "DATARECIPE_AZURE_OPENAI_ENDPOINT",
    "https://yuexing-may-26-resource.services.ai.azure.com/openai/v1",
)
DEPLOYMENT = os.getenv("DATARECIPE_AZURE_OPENAI_DEPLOYMENT", "gpt-5.4")
SCOPE = os.getenv("DATARECIPE_AZURE_OPENAI_SCOPE", "https://ai.azure.com/.default")

AXES = [
    ("domain_alignment", "Domain Alignment"),
    ("reasoning", "Reasoning"),
    ("factuality", "Factuality"),
    ("instruction_following", "Instruction Following"),
    ("safety_compliance", "Safety & Compliance"),
    ("robustness", "Robustness"),
]

SYSTEM_PROMPT = """You are evaluating how easy it is for a selected dataset recipe to improve model performance for a user's task and goal.
Return only strict JSON with this schema:
{
  "overallScore": number 0-100,
  "grade": "A" | "B" | "C",
  "gradeBand": "strong" | "moderate" | "risk",
  "summary": string,
  "axes": [
    {"id":"domain_alignment","label":"Domain Alignment","score":number 0-100},
    {"id":"reasoning","label":"Reasoning","score":number 0-100},
    {"id":"factuality","label":"Factuality","score":number 0-100},
    {"id":"instruction_following","label":"Instruction Following","score":number 0-100},
    {"id":"safety_compliance","label":"Safety & Compliance","score":number 0-100},
    {"id":"robustness","label":"Robustness","score":number 0-100}
  ],
  "notes": {
    "positive": [string, ... up to 4],
    "risks": [string, ... up to 4]
  },
  "recommendedSummary": string,
  "datasetInsights": [
    {"dataset_id": string, "value_add": string}
  ],
  "recommendedWeights": [
    {"dataset_id": string, "weight_pct": number 0-100, "reason": string}
  ]
}
Do not include markdown or explanation outside JSON."""


def build_client() -> OpenAI:
    token_provider = get_bearer_token_provider(DefaultAzureCredential(), SCOPE)
    return OpenAI(base_url=ENDPOINT, api_key=token_provider)


CLIENT = build_client()


def clamp(value: float, minimum: int, maximum: int) -> int:
    return max(minimum, min(maximum, int(round(value))))


def infer_grade_band(score: int, grade: str) -> str:
    raw = str(grade or "").strip()
    normalized_band = raw.lower()
    if normalized_band in {"strong", "moderate", "risk"}:
        return normalized_band
    normalized_grade = raw.upper()
    if normalized_grade == "A":
        return "strong"
    if normalized_grade == "B":
        return "moderate"
    if normalized_grade in {"C", "D", "F"}:
        return "risk"
    if score >= 78:
        return "strong"
    if score >= 68:
        return "moderate"
    return "risk"


def extract_json_text(raw: str) -> str:
    text = str(raw or "").strip()
    if not text:
        raise ValueError("Model response is empty.")

    if text.startswith("{") and text.endswith("}"):
        return text

    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError("No JSON object found in model response.")
    return match.group(0)


def normalize_prediction(data: dict, request_payload: dict | None = None) -> dict:
    overall_score_raw = data.get("overallScore", data.get("overall_score", 0))
    try:
        overall_score = clamp(float(overall_score_raw), 0, 100)
    except Exception:
        overall_score = 0

    grade = str(data.get("grade", "C")).strip().upper()
    if grade not in {"A", "B", "C"}:
        grade = "B" if overall_score >= 68 else "C"
    grade_band = infer_grade_band(overall_score, data.get("gradeBand", grade))

    summary = str(data.get("summary", "")).strip()
    if not summary:
        summary = f"Score {overall_score}/100 for current recipe."

    axes_in = data.get("axes", [])
    axis_map = {}
    if isinstance(axes_in, list):
        for axis in axes_in:
            if not isinstance(axis, dict):
                continue
            axis_id = str(axis.get("id", axis.get("axis", ""))).strip()
            if axis_id:
                axis_map[axis_id] = axis

    axes = []
    for axis_id, axis_label in AXES:
        axis_raw = axis_map.get(axis_id, {})
        try:
            score = clamp(float(axis_raw.get("score", 0)), 0, 100)
        except Exception:
            score = 0
        axes.append({"id": axis_id, "label": axis_label, "score": score})

    notes = data.get("notes", {})
    positive = []
    risks = []
    if isinstance(notes, dict):
        positive = notes.get("positive", [])
        risks = notes.get("risks", [])
    if not isinstance(positive, list):
        positive = data.get("strengths", [])
    if not isinstance(risks, list):
        risks = data.get("risks", [])

    positive = [str(item).strip() for item in positive if str(item).strip()][:4]
    risks = [str(item).strip() for item in risks if str(item).strip()][:4]

    dataset_insights = data.get("datasetInsights", data.get("dataset_insights", []))
    if not isinstance(dataset_insights, list):
        dataset_insights = []

    selected_datasets = []
    if isinstance(request_payload, dict):
        selected_datasets = request_payload.get("selected_datasets", [])
    if not isinstance(selected_datasets, list):
        selected_datasets = []
    selected_ids = [str(item.get("dataset_id", "")).strip() for item in selected_datasets if isinstance(item, dict)]
    selected_ids = [item for item in selected_ids if item]
    selected_id_set = set(selected_ids)

    normalized_dataset_insights = []
    for item in dataset_insights:
        if not isinstance(item, dict):
            continue
        dataset_id = str(item.get("dataset_id", item.get("datasetId", ""))).strip()
        value_add = str(item.get("value_add", item.get("valueAdd", item.get("reason", "")))).strip()
        if not dataset_id or not value_add:
            continue
        if selected_id_set and dataset_id not in selected_id_set:
            continue
        normalized_dataset_insights.append({"dataset_id": dataset_id, "value_add": value_add})
    normalized_dataset_insights = normalized_dataset_insights[: max(1, len(selected_ids) or 6)]

    raw_recommended_weights = data.get("recommendedWeights", data.get("recommended_weights", []))
    if not isinstance(raw_recommended_weights, list):
        raw_recommended_weights = []

    weight_by_id = {}
    reason_by_id = {}
    for item in raw_recommended_weights:
        if not isinstance(item, dict):
            continue
        dataset_id = str(item.get("dataset_id", item.get("datasetId", ""))).strip()
        if not dataset_id:
            continue
        if selected_id_set and dataset_id not in selected_id_set:
            continue
        try:
            weight = float(item.get("weight_pct", item.get("weightPct", item.get("weight", 0))))
        except Exception:
            continue
        if weight <= 0:
            continue
        weight_by_id[dataset_id] = weight
        reason = str(item.get("reason", item.get("value_add", ""))).strip()
        if reason:
            reason_by_id[dataset_id] = reason

    if not weight_by_id and selected_datasets:
        for item in selected_datasets:
            if not isinstance(item, dict):
                continue
            dataset_id = str(item.get("dataset_id", "")).strip()
            if not dataset_id:
                continue
            try:
                current_weight = float(item.get("weight_pct", 0))
            except Exception:
                current_weight = 0.0
            weight_by_id[dataset_id] = max(1.0, current_weight)
            if dataset_id not in reason_by_id:
                reason_by_id[dataset_id] = "Maintains current mix as fallback recommendation."

    for dataset_id in selected_ids:
        if dataset_id not in weight_by_id:
            weight_by_id[dataset_id] = 1.0
            reason_by_id.setdefault(dataset_id, "Included to preserve baseline coverage.")

    total_weight = sum(weight_by_id.values())
    if total_weight <= 0 and selected_ids:
        even = 100.0 / len(selected_ids)
        weight_by_id = {dataset_id: even for dataset_id in selected_ids}
        total_weight = 100.0

    normalized_recommended_weights = []
    if total_weight > 0:
        for dataset_id in selected_ids if selected_ids else weight_by_id.keys():
            if dataset_id not in weight_by_id:
                continue
            normalized_weight = clamp((weight_by_id[dataset_id] / total_weight) * 100, 0, 100)
            normalized_recommended_weights.append(
                {
                    "dataset_id": dataset_id,
                    "weight_pct": normalized_weight,
                    "reason": reason_by_id.get(dataset_id, ""),
                }
            )

    recommended_summary = str(
        data.get("recommendedSummary", data.get("recommended_summary", ""))
    ).strip()
    if not recommended_summary:
        recommended_summary = "Default recommendation generated for selected task, goal, and profile."

    return {
        "overallScore": overall_score,
        "grade": grade,
        "gradeBand": grade_band,
        "summary": summary,
        "axes": axes,
        "notes": {"positive": positive, "risks": risks},
        "recommendedSummary": recommended_summary,
        "datasetInsights": normalized_dataset_insights,
        "recommendedWeights": normalized_recommended_weights,
    }


def run_prediction(payload: dict) -> dict:
    user_message = (
        "Evaluate this dataset recipe payload and predict how easy it is to improve model performance.\n"
        f"Payload JSON:\n{json.dumps(payload, ensure_ascii=True)}"
    )

    completion = CLIENT.chat.completions.create(
        model=DEPLOYMENT,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.1,
    )

    content = completion.choices[0].message.content
    parsed = json.loads(extract_json_text(content))
    return normalize_prediction(parsed, payload)


class PredictionHandler(BaseHTTPRequestHandler):
    def _write_json(self, status_code: int, body: dict) -> None:
        encoded = json.dumps(body).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.end_headers()
        self.wfile.write(encoded)

    def do_OPTIONS(self):  # noqa: N802
        self._write_json(200, {"ok": True})

    def do_GET(self):  # noqa: N802
        if self.path == "/health":
            self._write_json(
                200,
                {
                    "ok": True,
                    "model": DEPLOYMENT,
                    "endpoint": ENDPOINT,
                },
            )
            return
        self._write_json(404, {"error": "Not found"})

    def do_POST(self):  # noqa: N802
        if self.path != "/predict-performance":
            self._write_json(404, {"error": "Not found"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            raw = self.rfile.read(length).decode("utf-8")
            payload = json.loads(raw) if raw else {}
            if not isinstance(payload, dict):
                raise ValueError("Request body must be a JSON object.")

            prediction = run_prediction(payload)
            self._write_json(
                200,
                {
                    "prediction": prediction,
                    "model": DEPLOYMENT,
                },
            )
        except Exception as exc:
            self._write_json(502, {"error": str(exc)})

    def log_message(self, _format, *_args):
        return


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), PredictionHandler)
    print(f"DataRecipe prediction proxy listening on http://{HOST}:{PORT}")
    print(f"Azure endpoint: {ENDPOINT}")
    print(f"Deployment: {DEPLOYMENT}")
    server.serve_forever()


if __name__ == "__main__":
    main()
