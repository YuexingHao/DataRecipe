const DATASETS = [
  {
    id: "mmlu_precision_medicine",
    name: "MMLU (precision_medicine)",
    domain: "medicine",
    family: "benchmark",
    storage: "s3://model-data/medicine/mmlu/precision_medicine.jsonl",
    description: "Medical reasoning benchmark split.",
    color: "#2f6fe5",
  },
  {
    id: "jama",
    name: "JAMA",
    domain: "medicine",
    family: "journal",
    storage: "s3://model-data/medicine/jama/curated_articles.jsonl",
    description: "Clinical writing and evidence summaries.",
    color: "#de5e40",
  },
  {
    id: "medxpertqa",
    name: "MedXpertQA",
    domain: "medicine",
    family: "qa",
    storage: "s3://model-data/medicine/medxpertqa/train.jsonl",
    description: "Expert-level clinical question answering.",
    color: "#0d9f7a",
  },
  {
    id: "medbullets",
    name: "Medbullets",
    domain: "medicine",
    family: "exam",
    storage: "s3://model-data/medicine/medbullets/boards_style_qa.jsonl",
    description: "Board-style medical exam prompts.",
    color: "#9a4ec9",
  },
  {
    id: "pubmed_summaries",
    name: "PubMed Summaries",
    domain: "medicine",
    family: "literature",
    storage: "s3://model-data/medicine/pubmed/summaries.jsonl",
    description: "Biomedical paper abstracts and summaries.",
    color: "#e19a2e",
  },
  {
    id: "financial_qa",
    name: "Financial QA",
    domain: "finance",
    family: "qa",
    storage: "s3://model-data/finance/finqa/train.jsonl",
    description: "Domain QA for finance and accounting.",
    color: "#2e9dba",
  },
  {
    id: "legalbench",
    name: "LegalBench",
    domain: "law",
    family: "benchmark",
    storage: "s3://model-data/law/legalbench/cleaned.jsonl",
    description: "Legal reasoning and statutory tasks.",
    color: "#b36a33",
  },
];

const MEDICINE_PRESET = {
  mmlu_precision_medicine: 10,
  jama: 40,
  medxpertqa: 30,
  medbullets: 20,
};

const state = {
  selected: new Set(Object.keys(MEDICINE_PRESET)),
  weights: { ...MEDICINE_PRESET },
  search: "",
  drag: null,
};

const barEl = document.getElementById("allocationBar");
const activeListEl = document.getElementById("activeList");
const datasetGridEl = document.getElementById("datasetGrid");
const recipeOutputEl = document.getElementById("recipeOutput");
const searchInputEl = document.getElementById("searchInput");
const modelInputEl = document.getElementById("modelInput");
const modeSelectEl = document.getElementById("modeSelect");

function getSelectedDatasets() {
  return DATASETS.filter((d) => state.selected.has(d.id));
}

function roundWeights(ids, rawWeights) {
  const rounded = {};
  const parts = ids.map((id) => ({
    id,
    raw: Math.max(0, rawWeights[id] || 0),
  }));

  const totalRaw = parts.reduce((acc, part) => acc + part.raw, 0);
  if (totalRaw === 0) {
    const even = 100 / ids.length;
    parts.forEach((part) => {
      part.raw = even;
    });
  } else {
    parts.forEach((part) => {
      part.raw = (part.raw / totalRaw) * 100;
    });
  }

  let sum = 0;
  parts.forEach((p) => {
    rounded[p.id] = Math.floor(p.raw);
    sum += rounded[p.id];
  });

  let remaining = 100 - sum;
  parts
    .sort((a, b) => b.raw - Math.floor(b.raw) - (a.raw - Math.floor(a.raw)))
    .forEach((p) => {
      if (remaining > 0) {
        rounded[p.id] += 1;
        remaining -= 1;
      }
    });

  return rounded;
}

function redistributeBySelection(changedId, selectedNow) {
  if (!selectedNow) {
    delete state.weights[changedId];

    const ids = [...state.selected];
    if (!ids.length) {
      return;
    }

    const total = ids.reduce((acc, id) => acc + (state.weights[id] || 0), 0);
    const next = {};

    if (total === 0) {
      const equal = 100 / ids.length;
      ids.forEach((id) => {
        next[id] = equal;
      });
    } else {
      ids.forEach((id) => {
        next[id] = (state.weights[id] / total) * 100;
      });
    }

    Object.assign(state.weights, roundWeights(ids, next));
    return;
  }

  const idsBefore = [...state.selected].filter((id) => id !== changedId);
  const idsAfter = [...state.selected];

  if (!idsBefore.length) {
    state.weights[changedId] = 100;
    return;
  }

  const newShare = 10;
  const remaining = 100 - newShare;
  const totalBefore = idsBefore.reduce((acc, id) => acc + (state.weights[id] || 0), 0) || 100;
  const next = {};

  idsBefore.forEach((id) => {
    next[id] = ((state.weights[id] || 0) / totalBefore) * remaining;
  });
  next[changedId] = newShare;

  Object.assign(state.weights, roundWeights(idsAfter, next));
}

function setWeight(id, value) {
  const ids = getSelectedDatasets().map((d) => d.id);
  if (!ids.includes(id)) return;

  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  if (ids.length === 1) {
    state.weights[id] = 100;
    return;
  }

  const others = ids.filter((x) => x !== id);
  const otherTotal = others.reduce((acc, x) => acc + (state.weights[x] || 0), 0);
  const remaining = 100 - clamped;

  const next = { [id]: clamped };

  if (otherTotal === 0) {
    const even = remaining / others.length;
    others.forEach((x) => {
      next[x] = even;
    });
  } else {
    others.forEach((x) => {
      next[x] = ((state.weights[x] || 0) / otherTotal) * remaining;
    });
  }

  Object.assign(state.weights, roundWeights(ids, next));
}

function rebalanceEqual() {
  const ids = getSelectedDatasets().map((d) => d.id);
  if (!ids.length) return;

  const even = 100 / ids.length;
  const next = {};
  ids.forEach((id) => {
    next[id] = even;
  });
  Object.assign(state.weights, roundWeights(ids, next));
}

function applyMedicinePreset() {
  state.selected = new Set(Object.keys(MEDICINE_PRESET));
  state.weights = { ...MEDICINE_PRESET };
  render();
}

function buildRecipe() {
  const chosen = getSelectedDatasets().map((d) => ({
    dataset: d.name,
    dataset_id: d.id,
    storage_path: d.storage,
    weight_pct: state.weights[d.id] || 0,
  }));

  return {
    project: "DataRecipe",
    mode: modeSelectEl.value,
    target_model: modelInputEl.value.trim() || "(unset)",
    total_weight_pct: chosen.reduce((acc, d) => acc + d.weight_pct, 0),
    datasets: chosen,
  };
}

function renderBar() {
  const selected = getSelectedDatasets();
  barEl.innerHTML = "";

  if (!selected.length) {
    const empty = document.createElement("div");
    empty.className = "segment";
    empty.style.width = "100%";
    empty.style.color = "#527267";
    empty.style.background = "#edf3ef";
    empty.textContent = "Select datasets from the library";
    barEl.appendChild(empty);
    return;
  }

  let runningLeft = 0;
  selected.forEach((dataset, idx) => {
    const pct = state.weights[dataset.id] || 0;
    const segment = document.createElement("div");
    segment.className = "segment";
    segment.style.width = `${pct}%`;
    segment.style.background = dataset.color;
    segment.innerHTML = `<span>${dataset.name} ${pct}%</span>`;
    barEl.appendChild(segment);

    runningLeft += pct;
    if (idx < selected.length - 1) {
      const handle = document.createElement("button");
      handle.className = "handle";
      handle.type = "button";
      handle.style.left = `${runningLeft}%`;
      handle.setAttribute("aria-label", `Adjust ${dataset.name} boundary`);
      handle.dataset.index = String(idx);
      handle.addEventListener("mousedown", startDrag);
      barEl.appendChild(handle);
    }
  });
}

function renderActiveList() {
  const selected = getSelectedDatasets();
  activeListEl.innerHTML = "";

  if (!selected.length) {
    activeListEl.innerHTML = '<div class="empty">No datasets selected yet.</div>';
    return;
  }

  selected.forEach((dataset) => {
    const pct = state.weights[dataset.id] || 0;

    const item = document.createElement("div");
    item.className = "active-item";
    item.innerHTML = `
      <div class="active-top">
        <div class="active-name">
          <span class="dot" style="background:${dataset.color};"></span>
          ${dataset.name}
        </div>
        <span>${pct}%</span>
      </div>
      <div class="weight-row">
        <input type="range" min="0" max="100" step="1" value="${pct}" data-weight="${dataset.id}" />
        <input type="number" min="0" max="100" step="1" value="${pct}" data-weight-number="${dataset.id}" />
      </div>
    `;
    activeListEl.appendChild(item);
  });
}

function renderLibrary() {
  datasetGridEl.innerHTML = "";
  const keyword = state.search.trim().toLowerCase();

  DATASETS.filter((dataset) => {
    if (!keyword) return true;
    return (
      dataset.name.toLowerCase().includes(keyword) ||
      dataset.domain.toLowerCase().includes(keyword) ||
      dataset.family.toLowerCase().includes(keyword)
    );
  }).forEach((dataset) => {
    const isSelected = state.selected.has(dataset.id);
    const card = document.createElement("article");
    card.className = "dataset-card";

    card.innerHTML = `
      <div class="dataset-head">
        <div>
          <div class="dataset-name">${dataset.name}</div>
          <div class="dataset-meta">
            <span class="badge">${dataset.domain}</span>
            <span>${dataset.family}</span>
          </div>
        </div>
        <button data-toggle="${dataset.id}" class="${isSelected ? "accent" : ""}">
          ${isSelected ? "Selected" : "Add"}
        </button>
      </div>
      <div>${dataset.description}</div>
      <div class="storage">${dataset.storage}</div>
    `;

    datasetGridEl.appendChild(card);
  });

  if (!datasetGridEl.children.length) {
    datasetGridEl.innerHTML = '<div class="empty">No dataset matches that search.</div>';
  }
}

function renderOutput() {
  recipeOutputEl.textContent = JSON.stringify(buildRecipe(), null, 2);
}

function render() {
  renderBar();
  renderActiveList();
  renderLibrary();
  renderOutput();
}

function startDrag(event) {
  const selected = getSelectedDatasets();
  if (selected.length < 2) return;

  const index = Number(event.currentTarget.dataset.index);
  const leftId = selected[index].id;
  const rightId = selected[index + 1].id;
  const ids = selected.map((d) => d.id);

  const prefixBefore = ids
    .slice(0, index)
    .reduce((acc, id) => acc + (state.weights[id] || 0), 0);

  state.drag = {
    barRect: barEl.getBoundingClientRect(),
    prefixBefore,
    leftId,
    rightId,
    pairTotal: (state.weights[leftId] || 0) + (state.weights[rightId] || 0),
    minPct: 2,
  };

  document.body.style.userSelect = "none";
  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", stopDrag);
}

function onDragMove(event) {
  if (!state.drag) return;
  const { barRect, prefixBefore, pairTotal, minPct, leftId, rightId } = state.drag;

  const pointerPct = ((event.clientX - barRect.left) / barRect.width) * 100;
  const minLeft = prefixBefore + minPct;
  const maxLeft = prefixBefore + pairTotal - minPct;
  const clampedLeft = Math.max(minLeft, Math.min(maxLeft, pointerPct));

  state.weights[leftId] = clampedLeft - prefixBefore;
  state.weights[rightId] = pairTotal - state.weights[leftId];

  const ids = getSelectedDatasets().map((d) => d.id);
  Object.assign(state.weights, roundWeights(ids, state.weights));
  render();
}

function stopDrag() {
  state.drag = null;
  document.body.style.userSelect = "";
  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", stopDrag);
}

document.addEventListener("input", (event) => {
  const sliderId = event.target.dataset.weight;
  if (sliderId) {
    setWeight(sliderId, event.target.value);
    render();
    return;
  }

  const numberId = event.target.dataset.weightNumber;
  if (numberId) {
    setWeight(numberId, event.target.value);
    render();
    return;
  }

  if (event.target.id === "searchInput") {
    state.search = event.target.value;
    renderLibrary();
  }

  if (event.target.id === "modelInput" || event.target.id === "modeSelect") {
    renderOutput();
  }
});

document.addEventListener("click", (event) => {
  const toggleId = event.target.dataset.toggle;
  if (toggleId) {
    if (state.selected.has(toggleId)) {
      state.selected.delete(toggleId);
      redistributeBySelection(toggleId, false);
    } else {
      state.selected.add(toggleId);
      redistributeBySelection(toggleId, true);
    }
    render();
    return;
  }

  if (event.target.id === "medicinePreset") {
    applyMedicinePreset();
    return;
  }

  if (event.target.id === "resetWeights") {
    rebalanceEqual();
    render();
    return;
  }

  if (event.target.id === "copyJson") {
    const json = JSON.stringify(buildRecipe(), null, 2);
    navigator.clipboard.writeText(json).then(() => {
      event.target.textContent = "Copied";
      setTimeout(() => {
        event.target.textContent = "Copy JSON";
      }, 1200);
    });
  }
});

searchInputEl.value = "";
render();
