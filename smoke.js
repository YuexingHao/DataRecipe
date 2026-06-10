const SAVED_RECIPES_STORAGE_KEY = "dataRecipeSavedCombinationsV1";

const SCENARIO_TEMPLATES = [
  { id: "ood_shift", label: "Out-of-domain instruction shift", axis: "robustness", difficulty: 68 },
  { id: "noisy_context", label: "Noisy context with distractors", axis: "robustness", difficulty: 66 },
  { id: "prompt_injection", label: "Prompt injection override attempt", axis: "safety", difficulty: 74 },
  { id: "policy_edge", label: "Policy boundary compliance", axis: "safety", difficulty: 70 },
  { id: "tool_mismatch", label: "Tool call schema mismatch", axis: "instruction", difficulty: 69 },
  { id: "spec_ambiguity", label: "Ambiguous spec resolution", axis: "reasoning", difficulty: 64 },
  { id: "long_context", label: "Long-context grounding", axis: "reasoning", difficulty: 71 },
  { id: "adversarial_format", label: "Adversarial formatting noise", axis: "instruction", difficulty: 67 },
  { id: "multilingual", label: "Multilingual switch mid-task", axis: "robustness", difficulty: 65 },
  { id: "factual_drift", label: "Evidence drift over turns", axis: "reasoning", difficulty: 70 },
  { id: "refusal_consistency", label: "Safety refusal consistency", axis: "safety", difficulty: 72 },
  { id: "workflow_interrupt", label: "Workflow interruption recovery", axis: "instruction", difficulty: 68 },
];

const AXIS_LABELS = {
  robustness: "Robustness",
  safety: "Safety",
  reasoning: "Reasoning",
  instruction: "Instruction",
};

const RUN_MODES = {
  quick: { scenarios: 24, stress: 0.88, jitter: 6 },
  standard: { scenarios: 48, stress: 1, jitter: 8 },
  stress: { scenarios: 96, stress: 1.14, jitter: 10 },
};

const smokeRecipeSelectEl = document.getElementById("smokeRecipeSelect");
const smokeModeSelectEl = document.getElementById("smokeModeSelect");
const baselineInputEl = document.getElementById("baselineInput");
const baselineNumberEl = document.getElementById("baselineNumber");
const seedInputEl = document.getElementById("seedInput");
const refreshSmokeRecipesBtnEl = document.getElementById("refreshSmokeRecipesBtn");
const runSmokeBtnEl = document.getElementById("runSmokeBtn");
const smokeRecipeMetaEl = document.getElementById("smokeRecipeMeta");
const smokeSummaryGridEl = document.getElementById("smokeSummaryGrid");
const smokeResultsBodyEl = document.getElementById("smokeResultsBody");
const smokeRunStampEl = document.getElementById("smokeRunStamp");
const smokeSynergyListEl = document.getElementById("smokeSynergyList");
const smokeInsightListEl = document.getElementById("smokeInsightList");

const state = {
  recipes: [],
  activeRecipeId: "",
  baseline: 56,
  mode: "standard",
  seed: 42,
  lastRun: null,
};

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatPct(value) {
  const numeric = Number(value);
  const safe = Number.isFinite(numeric) ? numeric : 0;
  return `${safe.toFixed(1)}%`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
}

function createRng(seed) {
  let x = (Number(seed) || 1) >>> 0;
  return () => {
    x = (1664525 * x + 1013904223) >>> 0;
    return x / 4294967296;
  };
}

function inferDomainFromDatasetId(id) {
  const text = String(id || "").toLowerCase();
  if (/(med|clinic|health|biomed|pharma|hospital|disease)/.test(text)) return "medicine";
  if (/(finance|bank|stock|trading|account|econom)/.test(text)) return "finance";
  if (/(legal|law|court|contract|casehold|statute)/.test(text)) return "law";
  if (/(code|stack|python|java|program|dev|software|mbpp)/.test(text)) return "coding";
  if (/(math|proof|algebra|calculus|equation)/.test(text)) return "math";
  return "general";
}

function inferFamilyFromDatasetId(id) {
  const text = String(id || "").toLowerCase();
  if (/(chat|instruct|alignment|assistant)/.test(text)) return "instruction";
  if (/(qa|mmlu|reason|proof)/.test(text)) return "reasoning";
  if (/(code|stack|mbpp|leetcode)/.test(text)) return "code";
  if (/(safety|policy|guard|redteam)/.test(text)) return "safety";
  if (/(synthetic|augment)/.test(text)) return "synthetic";
  return "general";
}

function readSavedRecipes() {
  try {
    const raw = window.localStorage.getItem(SAVED_RECIPES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item === "object" && item.id && item.snapshot);
  } catch (_) {
    return [];
  }
}

function getDefaultRecipe() {
  const datasets = [
    { id: "openwebtext_clean", weight: 28 },
    { id: "wiki_en_curated", weight: 20 },
    { id: "the_stack_dedup", weight: 20 },
    { id: "medxpertqa", weight: 16 },
    { id: "synthetic_augmentation_general", weight: 16 },
  ];
  return {
    id: "default_recipe",
    name: "Starter company blend",
    mode: "post_training",
    usageProfile: "company",
    domainNeed: "all",
    updatedAt: new Date().toISOString(),
    datasets: datasets.map((item) => ({
      ...item,
      domain: inferDomainFromDatasetId(item.id),
      family: inferFamilyFromDatasetId(item.id),
      synthetic: /synthetic|augment/i.test(item.id),
    })),
  };
}

function normalizeWeights(items) {
  const total = items.reduce((acc, item) => acc + item.weight, 0);
  if (!total) {
    const even = items.length ? 100 / items.length : 0;
    return items.map((item) => ({ ...item, weight: even }));
  }
  return items.map((item) => ({ ...item, weight: (item.weight / total) * 100 }));
}

function normalizeRecipeRecord(record) {
  const snapshot = record.snapshot || {};
  const selectedIds = Array.isArray(snapshot.selected_ids) ? snapshot.selected_ids : [];
  const sourceWeights = snapshot.weights && typeof snapshot.weights === "object" ? snapshot.weights : {};
  const rawDatasets = selectedIds.map((id) => ({
    id,
    weight: clamp(Number(sourceWeights[id] || 0), 0, 100),
  }));

  const datasets = normalizeWeights(rawDatasets).map((item) => ({
    ...item,
    domain: inferDomainFromDatasetId(item.id),
    family: inferFamilyFromDatasetId(item.id),
    synthetic: /synthetic|augment/i.test(item.id),
  }));

  return {
    id: String(record.id),
    name: String(record.name || "Unnamed recipe"),
    mode: snapshot.mode === "fine_tuning" ? "fine_tuning" : "post_training",
    usageProfile: String(snapshot.usage_profile || "company"),
    domainNeed: String(snapshot.domain_need || "all"),
    updatedAt: record.updated_at || record.created_at || new Date().toISOString(),
    datasets,
  };
}

function getRecipesForSmokeRun() {
  const saved = readSavedRecipes().map(normalizeRecipeRecord).filter((item) => item.datasets.length);
  if (saved.length) return saved;
  return [getDefaultRecipe()];
}

function getActiveRecipe() {
  return state.recipes.find((item) => item.id === state.activeRecipeId) || state.recipes[0] || null;
}

function computeRecipeSignals(recipe) {
  const datasets = recipe.datasets || [];
  const uniqueDomains = new Set(datasets.map((item) => item.domain)).size;
  const uniqueFamilies = new Set(datasets.map((item) => item.family)).size;
  const maxWeight = datasets.reduce((max, item) => Math.max(max, item.weight), 0);
  const syntheticShare = datasets.reduce((acc, item) => acc + (item.synthetic ? item.weight : 0), 0);
  const entropy = datasets.reduce((acc, item) => {
    const p = item.weight / 100;
    if (p <= 0) return acc;
    return acc - p * Math.log2(p);
  }, 0);
  const entropyNorm = datasets.length > 1 ? entropy / Math.log2(datasets.length) : 0;

  const concentrationPenalty = maxWeight > 62 ? (maxWeight - 62) * 0.28 : 0;
  const syntheticPenalty = syntheticShare > 38 ? (syntheticShare - 38) * 0.18 : 0;
  const syntheticBoost = syntheticShare >= 10 && syntheticShare <= 30 ? 2.4 : 0;
  const modeBoost = recipe.mode === "fine_tuning" ? 1.8 : 0.9;
  const profileBoost = recipe.usageProfile === "company" ? 1.2 : 0.6;

  const baseBoost = clamp(
    2.8 +
      uniqueDomains * 1.7 +
      uniqueFamilies * 1.15 +
      entropyNorm * 7.8 +
      syntheticBoost +
      modeBoost +
      profileBoost -
      concentrationPenalty -
      syntheticPenalty,
    -6,
    26,
  );

  return {
    uniqueDomains,
    uniqueFamilies,
    maxWeight,
    syntheticShare,
    entropyNorm,
    baseBoost,
    axisBoost: {
      robustness: clamp(uniqueDomains * 1.4 + entropyNorm * 3.4 - concentrationPenalty * 0.5, -6, 12),
      safety: clamp((recipe.usageProfile === "company" ? 3 : 1.4) + syntheticBoost - syntheticPenalty, -6, 11),
      reasoning: clamp(uniqueFamilies * 1.2 + (recipe.mode === "fine_tuning" ? 2 : 0.8), -6, 11),
      instruction: clamp(entropyNorm * 4.2 + (maxWeight <= 45 ? 2.6 : -1.2), -7, 11),
    },
  };
}

function runSmokeSimulation(recipe, baseline, modeKey, seed) {
  const mode = RUN_MODES[modeKey] || RUN_MODES.standard;
  const rng = createRng(seed);
  const signals = computeRecipeSignals(recipe);
  const rows = [];
  const scenarioCount = mode.scenarios;

  for (let i = 0; i < scenarioCount; i += 1) {
    const template = SCENARIO_TEMPLATES[i % SCENARIO_TEMPLATES.length];
    const jitter = (rng() - 0.5) * mode.jitter;
    const difficulty = clamp(template.difficulty + (rng() - 0.5) * 12 + (mode.stress - 1) * 10, 45, 92);
    const baselineScore = clamp(baseline + jitter - (difficulty - 58) * 0.32, 22, 96);

    const axisDelta = signals.axisBoost[template.axis] || 0;
    const collaborationJitter = (rng() - 0.5) * 3.6;
    const projectedScore = clamp(
      baselineScore + signals.baseBoost + axisDelta * mode.stress + collaborationJitter,
      24,
      98,
    );

    const threshold = clamp(62 + (difficulty - 60) * 0.36, 50, 82);
    const baselinePass = baselineScore >= threshold;
    const projectedPass = projectedScore >= threshold;

    rows.push({
      scenario: template.label,
      axis: AXIS_LABELS[template.axis] || "General",
      baseline: baselineScore,
      projected: projectedScore,
      delta: projectedScore - baselineScore,
      threshold,
      baselinePass,
      projectedPass,
    });
  }

  const mean = (items, key) => items.reduce((acc, item) => acc + item[key], 0) / (items.length || 1);
  const baselineAvg = mean(rows, "baseline");
  const projectedAvg = mean(rows, "projected");
  const baselinePassRate = (rows.filter((item) => item.baselinePass).length / rows.length) * 100;
  const projectedPassRate = (rows.filter((item) => item.projectedPass).length / rows.length) * 100;
  const variance =
    rows.reduce((acc, item) => acc + Math.pow(item.projected - projectedAvg, 2), 0) / (rows.length || 1);
  const stability = clamp(100 - Math.sqrt(variance) * 5.2, 0, 100);

  return {
    modeKey,
    seed,
    recipe,
    rows,
    signals,
    summary: {
      baselineAvg,
      projectedAvg,
      scoreDelta: projectedAvg - baselineAvg,
      baselinePassRate,
      projectedPassRate,
      passDelta: projectedPassRate - baselinePassRate,
      stability,
    },
  };
}

function buildSynergyRows(recipe) {
  const top = [...recipe.datasets].sort((a, b) => b.weight - a.weight).slice(0, 6);
  const items = [];
  for (let i = 0; i < top.length; i += 1) {
    for (let j = i + 1; j < top.length; j += 1) {
      const a = top[i];
      const b = top[j];
      let score = 56;
      if (a.domain !== b.domain) score += 12;
      else score += 4;
      if (a.family !== b.family) score += 7;
      else score += 2;
      if (a.synthetic !== b.synthetic) score += 3;
      if (a.weight > 34 && b.weight > 34) score -= 8;
      score = clamp(score, 24, 92);

      items.push({
        text: `${a.id} + ${b.id}`,
        score,
      });
    }
  }
  return items.sort((a, b) => b.score - a.score).slice(0, 6);
}

function buildInsights(runResult) {
  const insights = [];
  const { signals, summary, recipe, rows } = runResult;

  if (signals.uniqueDomains >= 3) {
    insights.push({
      tone: "good",
      text: `Domain diversity (${signals.uniqueDomains}) is strengthening robustness under shift scenarios.`,
    });
  } else {
    insights.push({
      tone: "risk",
      text: `Only ${signals.uniqueDomains} domain detected. Add cross-domain data to improve resilience.`,
    });
  }

  if (signals.maxWeight >= 62) {
    insights.push({
      tone: "risk",
      text: `One dataset has ${formatPct(signals.maxWeight)} weight. Reduce concentration to avoid brittle behavior.`,
    });
  } else {
    insights.push({
      tone: "good",
      text: `No heavy concentration found. Weight spread is supporting stable generalization.`,
    });
  }

  if (signals.syntheticShare > 38) {
    insights.push({
      tone: "risk",
      text: `Synthetic share is ${formatPct(signals.syntheticShare)}. Too much synthetic data can flatten robustness gains.`,
    });
  } else if (signals.syntheticShare >= 10 && signals.syntheticShare <= 30) {
    insights.push({
      tone: "good",
      text: `Synthetic share (${formatPct(signals.syntheticShare)}) is in the productive range for scenario coverage.`,
    });
  }

  if (summary.passDelta >= 8) {
    insights.push({
      tone: "good",
      text: `Projected pass rate improves by ${summary.passDelta.toFixed(1)} points over baseline.`,
    });
  } else if (summary.passDelta < 2) {
    insights.push({
      tone: "risk",
      text: "Recipe impact on pass rate is modest. Consider mixing additional task families.",
    });
  }

  const byAxis = {};
  rows.forEach((item) => {
    if (!byAxis[item.axis]) byAxis[item.axis] = { pass: 0, total: 0 };
    byAxis[item.axis].total += 1;
    if (item.projectedPass) byAxis[item.axis].pass += 1;
  });
  const weakestAxis = Object.entries(byAxis)
    .map(([axis, stats]) => ({ axis, ratio: stats.pass / (stats.total || 1) }))
    .sort((a, b) => a.ratio - b.ratio)[0];

  if (weakestAxis && weakestAxis.ratio < 0.7) {
    insights.push({
      tone: "risk",
      text: `${weakestAxis.axis} is still the weakest axis. Add targeted datasets for this failure mode.`,
    });
  }

  insights.push({
    tone: "good",
    text: `Run mode: ${runResult.modeKey}. Recipe: ${recipe.name}. Seed: ${runResult.seed}.`,
  });

  return insights.slice(0, 6);
}

function renderRecipeOptions() {
  smokeRecipeSelectEl.innerHTML = "";
  state.recipes.forEach((recipe) => {
    const option = document.createElement("option");
    option.value = recipe.id;
    option.textContent = `${recipe.name} (${recipe.datasets.length} datasets)`;
    smokeRecipeSelectEl.appendChild(option);
  });

  if (!state.recipes.some((item) => item.id === state.activeRecipeId)) {
    state.activeRecipeId = state.recipes[0] ? state.recipes[0].id : "";
  }
  smokeRecipeSelectEl.value = state.activeRecipeId;
}

function renderRecipeMeta(recipe) {
  if (!recipe) {
    smokeRecipeMetaEl.textContent = "No saved recipe available. Save a recipe in the main builder first.";
    return;
  }
  const total = recipe.datasets.reduce((acc, item) => acc + item.weight, 0);
  const top = [...recipe.datasets]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((item) => `${item.id} ${formatPct(item.weight)}`)
    .join(" • ");

  smokeRecipeMetaEl.innerHTML =
    `Mode: <strong>${escapeHtml(recipe.mode.replaceAll("_", "-"))}</strong> • ` +
    `Profile: <strong>${escapeHtml(recipe.usageProfile)}</strong> • ` +
    `Domain focus: <strong>${escapeHtml(recipe.domainNeed)}</strong> • ` +
    `Total weight: <strong>${formatPct(total)}</strong><br/>` +
    `Top datasets: ${escapeHtml(top || "(none)")}`;
}

function renderSummary(runResult) {
  const { summary } = runResult;
  const cards = [
    {
      label: "Baseline Avg",
      value: `${summary.baselineAvg.toFixed(1)}`,
      note: "Before applying recipe",
      tone: "",
    },
    {
      label: "Projected Avg",
      value: `${summary.projectedAvg.toFixed(1)}`,
      note: "After recipe interaction",
      tone: summary.scoreDelta >= 0 ? "positive" : "risk",
    },
    {
      label: "Score Delta",
      value: `${summary.scoreDelta >= 0 ? "+" : ""}${summary.scoreDelta.toFixed(1)}`,
      note: "Projected minus baseline",
      tone: summary.scoreDelta >= 0 ? "positive" : "risk",
    },
    {
      label: "Pass Rate",
      value: `${summary.projectedPassRate.toFixed(1)}%`,
      note: `${summary.passDelta >= 0 ? "+" : ""}${summary.passDelta.toFixed(1)} vs baseline`,
      tone: summary.passDelta >= 0 ? "positive" : "risk",
    },
    {
      label: "Stability",
      value: `${summary.stability.toFixed(1)}%`,
      note: "Lower variance means steadier runs",
      tone: summary.stability >= 70 ? "positive" : summary.stability < 55 ? "risk" : "",
    },
  ];

  smokeSummaryGridEl.innerHTML = cards
    .map(
      (item) => `
      <article class="smoke-metric">
        <div class="smoke-metric-label">${escapeHtml(item.label)}</div>
        <div class="smoke-metric-value ${escapeHtml(item.tone)}">${escapeHtml(item.value)}</div>
        <div class="smoke-metric-note">${escapeHtml(item.note)}</div>
      </article>
    `,
    )
    .join("");
}

function renderScenarioRows(rows) {
  smokeResultsBodyEl.innerHTML = "";
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const delta = row.projected - row.baseline;
    tr.innerHTML = `
      <td>${escapeHtml(row.scenario)}</td>
      <td>${escapeHtml(row.axis)}</td>
      <td>${row.baseline.toFixed(1)} / ${row.threshold.toFixed(1)}</td>
      <td>${row.projected.toFixed(1)} / ${row.threshold.toFixed(1)}</td>
      <td><span class="smoke-delta ${delta >= 0 ? "up" : "down"}">${delta >= 0 ? "+" : ""}${delta.toFixed(1)}</span></td>
      <td><span class="smoke-status ${row.projectedPass ? "pass" : "fail"}">${row.projectedPass ? "pass" : "fail"}</span></td>
    `;
    smokeResultsBodyEl.appendChild(tr);
  });
}

function renderChipList(targetEl, rows, emptyText) {
  targetEl.innerHTML = "";
  if (!rows.length) {
    targetEl.innerHTML = `<div class="smoke-empty">${escapeHtml(emptyText)}</div>`;
    return;
  }
  rows.forEach((item) => {
    const div = document.createElement("div");
    div.className = `smoke-chip ${item.tone || ""}`.trim();
    div.textContent = item.text;
    targetEl.appendChild(div);
  });
}

function renderRun(runResult) {
  renderSummary(runResult);
  renderScenarioRows(runResult.rows);

  const synergy = buildSynergyRows(runResult.recipe).map((item) => ({
    tone: item.score >= 68 ? "good" : item.score < 50 ? "risk" : "",
    text: `${item.text} -> interaction score ${item.score}/100`,
  }));
  const insights = buildInsights(runResult);

  renderChipList(smokeSynergyListEl, synergy, "No interaction data available.");
  renderChipList(smokeInsightListEl, insights, "No insights available.");

  smokeRunStampEl.textContent = `Last run ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
}

function runSmokeTest() {
  const recipe = getActiveRecipe();
  if (!recipe) return;
  const result = runSmokeSimulation(recipe, state.baseline, state.mode, state.seed);
  state.lastRun = result;
  renderRun(result);
}

function refreshRecipesAndRender() {
  state.recipes = getRecipesForSmokeRun();
  renderRecipeOptions();
  renderRecipeMeta(getActiveRecipe());
}

function syncBaselineInputs(nextValue) {
  const clamped = clamp(Number(nextValue) || 56, 30, 90);
  state.baseline = clamped;
  baselineInputEl.value = String(clamped);
  baselineNumberEl.value = String(clamped);
}

smokeRecipeSelectEl.addEventListener("change", (event) => {
  state.activeRecipeId = event.target.value;
  renderRecipeMeta(getActiveRecipe());
});

smokeModeSelectEl.addEventListener("change", (event) => {
  const next = event.target.value;
  state.mode = RUN_MODES[next] ? next : "standard";
});

baselineInputEl.addEventListener("input", (event) => {
  syncBaselineInputs(event.target.value);
});

baselineNumberEl.addEventListener("input", (event) => {
  syncBaselineInputs(event.target.value);
});

seedInputEl.addEventListener("input", (event) => {
  state.seed = clamp(Number(event.target.value) || 42, 1, 999999);
});

refreshSmokeRecipesBtnEl.addEventListener("click", () => {
  refreshRecipesAndRender();
});

runSmokeBtnEl.addEventListener("click", () => {
  runSmokeTest();
});

function init() {
  refreshRecipesAndRender();
  syncBaselineInputs(state.baseline);
  smokeModeSelectEl.value = state.mode;
  seedInputEl.value = String(state.seed);
  runSmokeTest();
}

init();
