const BASE_DATASETS = [
  {
    id: "mmlu_precision_medicine",
    repoId: "mmlu_precision_medicine",
    name: "MMLU (precision_medicine)",
    domain: "medicine",
    family: "benchmark",
    storage: "s3://model-data/medicine/mmlu/precision_medicine.jsonl",
    description: "Medical reasoning benchmark split.",
    color: "#2f6fe5",
    source: "internal",
    license: "internal",
    downloads: 0,
    likes: 0,
  },
  {
    id: "jama",
    repoId: "jama",
    name: "JAMA",
    domain: "medicine",
    family: "journal",
    storage: "s3://model-data/medicine/jama/curated_articles.jsonl",
    description: "Clinical writing and evidence summaries.",
    color: "#de5e40",
    source: "internal",
    license: "internal",
    downloads: 0,
    likes: 0,
  },
  {
    id: "medxpertqa",
    repoId: "medxpertqa",
    name: "MedXpertQA",
    domain: "medicine",
    family: "qa",
    storage: "s3://model-data/medicine/medxpertqa/train.jsonl",
    description: "Expert-level clinical question answering.",
    color: "#0d9f7a",
    source: "internal",
    license: "internal",
    downloads: 0,
    likes: 0,
  },
  {
    id: "medbullets",
    repoId: "medbullets",
    name: "Medbullets",
    domain: "medicine",
    family: "exam",
    storage: "s3://model-data/medicine/medbullets/boards_style_qa.jsonl",
    description: "Board-style medical exam prompts.",
    color: "#9a4ec9",
    source: "internal",
    license: "internal",
    downloads: 0,
    likes: 0,
  },
  {
    id: "pubmed_summaries",
    repoId: "pubmed_summaries",
    name: "PubMed Summaries",
    domain: "medicine",
    family: "literature",
    storage: "s3://model-data/medicine/pubmed/summaries.jsonl",
    description: "Biomedical paper abstracts and summaries.",
    color: "#e19a2e",
    source: "internal",
    license: "internal",
    downloads: 0,
    likes: 0,
  },
  {
    id: "financial_qa",
    repoId: "financial_qa",
    name: "Financial QA",
    domain: "finance",
    family: "qa",
    storage: "s3://model-data/finance/finqa/train.jsonl",
    description: "Domain QA for finance and accounting.",
    color: "#2e9dba",
    source: "internal",
    license: "internal",
    downloads: 0,
    likes: 0,
  },
  {
    id: "legalbench",
    repoId: "legalbench",
    name: "LegalBench",
    domain: "law",
    family: "benchmark",
    storage: "s3://model-data/law/legalbench/cleaned.jsonl",
    description: "Legal reasoning and statutory tasks.",
    color: "#b36a33",
    source: "internal",
    license: "internal",
    downloads: 0,
    likes: 0,
  },
];

const MEDICINE_PRESET = {
  mmlu_precision_medicine: 10,
  jama: 40,
  medxpertqa: 30,
  medbullets: 20,
};

const HF_DATASETS_API = "https://huggingface.co/api/datasets";
const HF_DEFAULT_LIMIT = 100;
const HF_SEARCH_LIMIT = 60;
const RECIPE_COUNTER_STORAGE_KEY = "dataRecipeUniqueRecipeCount";
const RECIPE_COUNTER_MIN = 530;
const RECIPE_COUNTER_TICK_MS = 5000;
const COLOR_PALETTE = [
  "#2f6fe5",
  "#de5e40",
  "#0d9f7a",
  "#9a4ec9",
  "#e19a2e",
  "#2e9dba",
  "#b36a33",
  "#3a8756",
  "#be4b6d",
  "#5d67d8",
  "#1f9b94",
  "#d27a2c",
];

const LICENSE_COMPATIBILITY = {
  company: new Set(["permissive", "internal"]),
  academia: new Set(["permissive", "non_commercial", "research_only", "internal"]),
  personal: new Set(["permissive", "non_commercial", "internal"]),
  student: new Set(["permissive", "non_commercial", "research_only", "internal"]),
};

const PERFORMANCE_AXES = [
  { id: "domain_alignment", label: "Domain Alignment" },
  { id: "reasoning", label: "Reasoning" },
  { id: "factuality", label: "Factuality" },
  { id: "instruction_following", label: "Instruction Following" },
  { id: "safety_compliance", label: "Safety & Compliance" },
  { id: "robustness", label: "Robustness" },
];

const BASE_AXIS_SCORES = {
  domain_alignment: 48,
  reasoning: 50,
  factuality: 49,
  instruction_following: 47,
  safety_compliance: 46,
  robustness: 45,
};

const DOMAIN_SIGNAL = {
  medicine: { domain_alignment: 18, factuality: 10, safety_compliance: 8, reasoning: 3 },
  finance: { domain_alignment: 14, reasoning: 7, factuality: 8, safety_compliance: 4 },
  law: { domain_alignment: 14, reasoning: 8, factuality: 7, safety_compliance: 10 },
  coding: { reasoning: 10, instruction_following: 8, robustness: 6, factuality: 3 },
  math: { reasoning: 14, robustness: 6, factuality: 4, domain_alignment: 4 },
  general: { domain_alignment: 6, instruction_following: 5, robustness: 5, factuality: 3 },
};

const FAMILY_SIGNAL = {
  benchmark: { reasoning: 14, robustness: 10, factuality: 6, domain_alignment: 3 },
  qa: { factuality: 10, instruction_following: 7, reasoning: 6, domain_alignment: 5 },
  journal: { factuality: 12, safety_compliance: 6, instruction_following: 5, domain_alignment: 6 },
  literature: { factuality: 9, instruction_following: 7, domain_alignment: 5, robustness: 4 },
  exam: { reasoning: 11, domain_alignment: 8, robustness: 6, factuality: 6 },
  "text generation": { instruction_following: 11, robustness: 5, reasoning: 4 },
  "question answering": { factuality: 10, instruction_following: 6, reasoning: 5 },
  "multiple choice": { reasoning: 8, factuality: 7, robustness: 5 },
  translation: { factuality: 7, instruction_following: 6, robustness: 4 },
  general: { instruction_following: 5, robustness: 4, reasoning: 3, domain_alignment: 3 },
};

const SOURCE_SIGNAL = {
  internal: { factuality: 6, safety_compliance: 6, robustness: 4 },
  huggingface: { robustness: 2, instruction_following: 2, factuality: 1 },
};

const state = {
  selected: new Set(Object.keys(MEDICINE_PRESET)),
  weights: { ...MEDICINE_PRESET },
  search: "",
  usageProfile: "company",
  licenseFilter: "all",
  showCompatibleOnly: false,
  drag: null,
  remoteDatasets: [],
  libraryLoading: false,
  libraryError: "",
  lastFetchedCount: 0,
  fetchToken: 0,
};

let searchFetchTimer = null;

const barEl = document.getElementById("allocationBar");
const activeListEl = document.getElementById("activeList");
const datasetGridEl = document.getElementById("datasetGrid");
const recipeOutputEl = document.getElementById("recipeOutput");
const searchInputEl = document.getElementById("searchInput");
const modelInputEl = document.getElementById("modelInput");
const modeSelectEl = document.getElementById("modeSelect");
const selectedCountEl = document.getElementById("selectedCount");
const totalPctEl = document.getElementById("totalPct");
const usageProfileSelectEl = document.getElementById("usageProfileSelect");
const licenseFilterSelectEl = document.getElementById("licenseFilterSelect");
const compatibleOnlyToggleEl = document.getElementById("compatibleOnlyToggle");
const libraryStatusEl = document.getElementById("libraryStatus");
const performanceGradeEl = document.getElementById("performanceGrade");
const performanceSummaryEl = document.getElementById("performanceSummary");
const performanceAxesEl = document.getElementById("performanceAxes");
const performanceNotesEl = document.getElementById("performanceNotes");
const recipeCountEl = document.getElementById("recipeCount");

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function trimDescription(text, maxLen = 180) {
  const normalized = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!normalized) return "No description available.";
  if (normalized.length <= maxLen) return normalized;
  return `${normalized.slice(0, maxLen - 3)}...`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function addAxisSignal(target, signal, factor = 1) {
  Object.entries(signal || {}).forEach(([axisId, axisValue]) => {
    target[axisId] = (target[axisId] || 0) + axisValue * factor;
  });
}

function normalizeFamilyKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .trim();
}

function readRecipeCounter() {
  try {
    const raw = window.localStorage.getItem(RECIPE_COUNTER_STORAGE_KEY);
    const parsed = Number.parseInt(String(raw || ""), 10);
    if (Number.isFinite(parsed) && parsed >= RECIPE_COUNTER_MIN) {
      return parsed;
    }
  } catch (_) {}
  return RECIPE_COUNTER_MIN;
}

function writeRecipeCounter(value) {
  try {
    window.localStorage.setItem(RECIPE_COUNTER_STORAGE_KEY, String(value));
  } catch (_) {}
}

function renderRecipeCounter(value) {
  if (!recipeCountEl) return;
  recipeCountEl.textContent = `${formatNumber(value)}+`;
}

function startRecipeCounterTicker() {
  let counter = readRecipeCounter();
  renderRecipeCounter(counter);
  writeRecipeCounter(counter);

  window.setInterval(() => {
    const delta = Math.random() < 0.5 ? 1 : 2;
    counter += delta;
    renderRecipeCounter(counter);
    writeRecipeCounter(counter);
  }, RECIPE_COUNTER_TICK_MS);
}

function pickColorFromId(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return COLOR_PALETTE[hash % COLOR_PALETTE.length];
}

function inferDomainFromText(text) {
  if (/(medic|clinic|health|biomed|disease|pharma|doctor|hospital)/i.test(text)) {
    return "medicine";
  }
  if (/(finance|account|bank|econom|stock|trading)/i.test(text)) {
    return "finance";
  }
  if (/(legal|law|court|statute|contract|juris)/i.test(text)) {
    return "law";
  }
  if (/(code|program|software|python|java|developer)/i.test(text)) {
    return "coding";
  }
  if (/(math|algebra|geometry|calculus|proof|equation)/i.test(text)) {
    return "math";
  }
  return "general";
}

function extractLicense(item, tags) {
  if (item.cardData && item.cardData.license) {
    return String(item.cardData.license).toLowerCase();
  }
  const licenseTag = tags.find((tag) => tag.startsWith("license:"));
  if (licenseTag) {
    return licenseTag.replace("license:", "").toLowerCase();
  }
  return "unknown";
}

function normalizeTaskFamily(tags) {
  const taskTag = tags.find((tag) => tag.startsWith("task_categories:"));
  if (!taskTag) return "general";
  return taskTag.replace("task_categories:", "").replaceAll("-", " ");
}

function toHFDataset(item) {
  if (!item || !item.id) return null;
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const license = extractLicense(item, tags);
  const searchableText = `${item.id} ${trimDescription(item.description, 400)} ${tags.join(" ")}`;

  return {
    id: item.id,
    repoId: item.id,
    name: item.cardData && item.cardData.pretty_name ? item.cardData.pretty_name : item.id,
    domain: inferDomainFromText(searchableText),
    family: normalizeTaskFamily(tags),
    storage: `hf://datasets/${item.id}`,
    description: trimDescription(item.description),
    color: pickColorFromId(item.id),
    source: "huggingface",
    license,
    downloads: Number(item.downloads) || 0,
    likes: Number(item.likes) || 0,
    lastModified: item.lastModified || "",
    tags,
  };
}

function mergeRemoteDatasets(newDatasets) {
  const byId = new Map(state.remoteDatasets.map((dataset) => [dataset.id, dataset]));
  newDatasets.forEach((dataset) => {
    const prev = byId.get(dataset.id) || {};
    byId.set(dataset.id, { ...prev, ...dataset });
  });
  state.remoteDatasets = [...byId.values()].sort((a, b) => {
    const scoreA = (a.downloads || 0) + (a.likes || 0) * 10;
    const scoreB = (b.downloads || 0) + (b.likes || 0) * 10;
    return scoreB - scoreA;
  });
}

async function syncHFDatasets(searchTerm = "") {
  const query = String(searchTerm || "").trim();
  const token = state.fetchToken + 1;
  state.fetchToken = token;
  state.libraryLoading = true;
  state.libraryError = "";
  renderLibraryStatus();

  const params = new URLSearchParams({
    full: "true",
    limit: query ? String(HF_SEARCH_LIMIT) : String(HF_DEFAULT_LIMIT),
  });
  if (query) {
    params.set("search", query);
  }

  try {
    const response = await fetch(`${HF_DATASETS_API}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (token !== state.fetchToken) {
      return;
    }

    const mapped = payload.map(toHFDataset).filter(Boolean);
    mergeRemoteDatasets(mapped);
    state.lastFetchedCount = mapped.length;
    state.libraryLoading = false;
    state.libraryError = "";
    render();
  } catch (error) {
    if (token !== state.fetchToken) {
      return;
    }
    state.libraryLoading = false;
    state.libraryError = `Hugging Face sync failed: ${error.message}`;
    renderLibraryStatus();
  }
}

function queueSearchSync() {
  clearTimeout(searchFetchTimer);
  const query = state.search.trim();
  if (query.length < 2) return;
  searchFetchTimer = setTimeout(() => {
    syncHFDatasets(query);
  }, 350);
}

function getLibraryDatasets() {
  const merged = new Map(BASE_DATASETS.map((dataset) => [dataset.id, dataset]));
  state.remoteDatasets.forEach((dataset) => {
    if (!merged.has(dataset.id)) {
      merged.set(dataset.id, dataset);
    }
  });
  return [...merged.values()];
}

function getDatasetById(id) {
  return getLibraryDatasets().find((dataset) => dataset.id === id);
}

function getSelectedDatasets() {
  const byId = new Map(getLibraryDatasets().map((dataset) => [dataset.id, dataset]));
  return [...state.selected].map((id) => byId.get(id)).filter(Boolean);
}

function getLicenseCategory(license) {
  const normalized = String(license || "unknown").toLowerCase();

  if (!normalized || normalized === "unknown" || normalized === "n/a") {
    return "unknown";
  }
  if (normalized.includes("internal")) {
    return "internal";
  }
  if (
    normalized.includes("-nc") ||
    normalized.includes("non-commercial") ||
    normalized.includes("noncommercial")
  ) {
    return "non_commercial";
  }
  if (
    normalized.includes("research") ||
    normalized.includes("academic") ||
    normalized.includes("edu")
  ) {
    return "research_only";
  }
  if (
    normalized.includes("other") ||
    normalized.includes("arr") ||
    normalized.includes("proprietary") ||
    normalized.includes("custom") ||
    normalized.includes("openrail")
  ) {
    return "restricted";
  }
  if (
    /(apache|mit|bsd|gpl|lgpl|agpl|mpl|cc-by|cc0|unlicense|wtfpl|zlib|isc|epl|cddl)/.test(
      normalized,
    )
  ) {
    return "permissive";
  }
  return "restricted";
}

function getLicenseCategoryLabel(category) {
  if (category === "permissive") return "Permissive";
  if (category === "non_commercial") return "Non-commercial";
  if (category === "research_only") return "Research-only";
  if (category === "restricted") return "Restricted";
  if (category === "internal") return "Internal";
  return "Unknown";
}

function isDatasetCompatible(dataset, profile) {
  const policy = LICENSE_COMPATIBILITY[profile] || LICENSE_COMPATIBILITY.company;
  const licenseCategory = getLicenseCategory(dataset.license);
  return policy.has(licenseCategory);
}

function getCompatibilityMessage(dataset, profile) {
  if (isDatasetCompatible(dataset, profile)) {
    return `Compatible for ${profile} training`;
  }
  return `Blocked for ${profile} profile by ${dataset.license || "unknown"} license`;
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
  parts.forEach((part) => {
    rounded[part.id] = Math.floor(part.raw);
    sum += rounded[part.id];
  });

  let remaining = 100 - sum;
  parts
    .sort((a, b) => b.raw - Math.floor(b.raw) - (a.raw - Math.floor(a.raw)))
    .forEach((part) => {
      if (remaining > 0) {
        rounded[part.id] += 1;
        remaining -= 1;
      }
    });

  return rounded;
}

function redistributeBySelection(changedId, selectedNow) {
  if (!selectedNow) {
    delete state.weights[changedId];

    const ids = getSelectedDatasets().map((dataset) => dataset.id);
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

  const idsAfter = getSelectedDatasets().map((dataset) => dataset.id);
  const idsBefore = idsAfter.filter((id) => id !== changedId);

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
  const ids = getSelectedDatasets().map((dataset) => dataset.id);
  if (!ids.includes(id)) return;

  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  if (ids.length === 1) {
    state.weights[id] = 100;
    return;
  }

  const others = ids.filter((otherId) => otherId !== id);
  const otherTotal = others.reduce((acc, otherId) => acc + (state.weights[otherId] || 0), 0);
  const remaining = 100 - clamped;

  const next = { [id]: clamped };

  if (otherTotal === 0) {
    const even = remaining / others.length;
    others.forEach((otherId) => {
      next[otherId] = even;
    });
  } else {
    others.forEach((otherId) => {
      next[otherId] = ((state.weights[otherId] || 0) / otherTotal) * remaining;
    });
  }

  Object.assign(state.weights, roundWeights(ids, next));
}

function rebalanceEqual() {
  const ids = getSelectedDatasets().map((dataset) => dataset.id);
  if (!ids.length) return;

  const next = {};
  const even = 100 / ids.length;
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

function computePredictedPerformance() {
  const selected = getSelectedDatasets();
  const axisScores = { ...BASE_AXIS_SCORES };
  const positiveNotes = [];
  const riskNotes = [];

  if (!selected.length) {
    return {
      overallScore: 0,
      grade: "--",
      gradeBand: "risk",
      summary: "Select datasets to estimate expected performance.",
      axes: PERFORMANCE_AXES.map((axis) => ({ ...axis, score: 0 })),
      notes: { positive: [], risks: [] },
    };
  }

  const weightById = {};
  selected.forEach((dataset) => {
    weightById[dataset.id] = clamp(Number(state.weights[dataset.id] || 0), 0, 100) / 100;
  });

  selected.forEach((dataset) => {
    const weightRatio = weightById[dataset.id];
    const domainSignal = DOMAIN_SIGNAL[dataset.domain] || DOMAIN_SIGNAL.general;
    const familySignal = FAMILY_SIGNAL[normalizeFamilyKey(dataset.family)] || FAMILY_SIGNAL.general;
    const sourceSignal = SOURCE_SIGNAL[dataset.source] || {};

    addAxisSignal(axisScores, domainSignal, weightRatio);
    addAxisSignal(axisScores, familySignal, weightRatio * 0.9);
    addAxisSignal(axisScores, sourceSignal, weightRatio * 0.65);

    const licenseCategory = getLicenseCategory(dataset.license);
    if (licenseCategory === "unknown") {
      axisScores.safety_compliance -= 3 * weightRatio;
      axisScores.robustness -= 2 * weightRatio;
    } else if (licenseCategory === "restricted") {
      axisScores.safety_compliance -= 4 * weightRatio;
      axisScores.robustness -= 1.5 * weightRatio;
    }

    if (!isDatasetCompatible(dataset, state.usageProfile)) {
      axisScores.safety_compliance -= 12 * weightRatio;
      axisScores.robustness -= 4 * weightRatio;
      axisScores.instruction_following -= 2 * weightRatio;
    }
  });

  const uniqueDomains = new Set(selected.map((dataset) => dataset.domain)).size;
  const uniqueFamilies = new Set(selected.map((dataset) => normalizeFamilyKey(dataset.family))).size;
  const maxWeight = selected.reduce((max, dataset) => Math.max(max, state.weights[dataset.id] || 0), 0);
  const incompatibleCount = selected.filter(
    (dataset) => !isDatasetCompatible(dataset, state.usageProfile),
  ).length;
  const incompatibleWeight = selected.reduce((acc, dataset) => {
    if (isDatasetCompatible(dataset, state.usageProfile)) return acc;
    return acc + (state.weights[dataset.id] || 0);
  }, 0);

  if (uniqueDomains >= 3) {
    axisScores.robustness += 6;
    axisScores.instruction_following += 3;
    positiveNotes.push("Diverse domains boost robustness");
  } else if (uniqueDomains === 1) {
    axisScores.robustness -= 4;
    riskNotes.push("Single-domain focus may reduce robustness");
  }

  if (uniqueFamilies >= 3) {
    axisScores.reasoning += 3;
    axisScores.factuality += 2;
    positiveNotes.push("Mixed task families improve generalization");
  }

  if (maxWeight >= 65) {
    axisScores.domain_alignment += 5;
    axisScores.robustness -= 5;
    axisScores.instruction_following -= 2;
    riskNotes.push("Heavy concentration on one dataset increases overfitting risk");
  } else if (maxWeight <= 45 && selected.length >= 3) {
    axisScores.robustness += 4;
    positiveNotes.push("Balanced allocation supports stability");
  }

  if (modeSelectEl.value === "fine_tuning") {
    axisScores.domain_alignment += 5;
    axisScores.reasoning += 2;
    axisScores.robustness -= 2;
    positiveNotes.push("Fine-tuning improves domain specialization");
  } else {
    axisScores.robustness += 4;
    axisScores.factuality += 2;
    axisScores.instruction_following += 1;
    positiveNotes.push("Post-training improves broad capability coverage");
  }

  if (state.usageProfile === "company") {
    axisScores.safety_compliance += 2;
  } else if (state.usageProfile === "student") {
    axisScores.reasoning += 1;
    axisScores.domain_alignment += 1;
  } else if (state.usageProfile === "academia") {
    axisScores.reasoning += 1;
    axisScores.factuality += 1;
  }

  if (incompatibleCount > 0) {
    axisScores.safety_compliance -= Math.min(8, incompatibleWeight * 0.12);
    riskNotes.push(
      `${incompatibleCount} selected dataset${incompatibleCount > 1 ? "s" : ""} conflict with ${state.usageProfile} licensing`,
    );
  }

  const axes = PERFORMANCE_AXES.map((axis) => {
    const score = clamp(Math.round(axisScores[axis.id] || 0), 0, 100);
    return { id: axis.id, label: axis.label, score };
  });

  const overallScore = clamp(
    Math.round(axes.reduce((acc, axis) => acc + axis.score, 0) / axes.length),
    0,
    100,
  );

  let grade = "C";
  let gradeBand = "risk";
  if (overallScore >= 78) {
    grade = "A";
    gradeBand = "strong";
  } else if (overallScore >= 68) {
    grade = "B";
    gradeBand = "moderate";
  }

  let summary = `Projected overall score ${overallScore}/100 for ${modeSelectEl.value.replace("_", "-")} under ${state.usageProfile} profile.`;
  if (incompatibleCount > 0) {
    summary += ` Compliance risk detected due to incompatible licenses.`;
  } else if (overallScore >= 78) {
    summary += " Mix appears strong across multiple evaluation axes.";
  } else if (overallScore >= 68) {
    summary += " Mix is solid but has room to improve.";
  } else {
    summary += " Mix is high-risk and may underperform on multiple axes.";
  }

  return {
    overallScore,
    grade,
    gradeBand,
    summary,
    axes,
    notes: {
      positive: [...new Set(positiveNotes)].slice(0, 4),
      risks: [...new Set(riskNotes)].slice(0, 4),
    },
  };
}

function renderPerformancePanel() {
  if (!performanceGradeEl || !performanceSummaryEl || !performanceAxesEl || !performanceNotesEl) {
    return;
  }

  const prediction = computePredictedPerformance();
  performanceGradeEl.textContent = prediction.grade;
  performanceGradeEl.classList.remove("strong", "moderate", "risk");
  performanceGradeEl.classList.add(prediction.gradeBand);
  performanceSummaryEl.textContent = prediction.summary;

  performanceAxesEl.innerHTML = "";
  prediction.axes.forEach((axis) => {
    const row = document.createElement("div");
    row.className = "axis-row";
    row.innerHTML = `
      <div class="axis-label">${escapeHtml(axis.label)}</div>
      <div class="axis-track"><div class="axis-fill" style="width:${axis.score}%;"></div></div>
      <div class="axis-value">${axis.score}</div>
    `;
    performanceAxesEl.appendChild(row);
  });

  performanceNotesEl.innerHTML = "";
  prediction.notes.positive.forEach((note) => {
    const chip = document.createElement("span");
    chip.className = "performance-note-chip pos";
    chip.textContent = note;
    performanceNotesEl.appendChild(chip);
  });
  prediction.notes.risks.forEach((note) => {
    const chip = document.createElement("span");
    chip.className = "performance-note-chip neg";
    chip.textContent = note;
    performanceNotesEl.appendChild(chip);
  });
}

function buildRecipe() {
  const prediction = computePredictedPerformance();
  const chosen = getSelectedDatasets().map((dataset) => ({
    dataset: dataset.name,
    dataset_id: dataset.id,
    source: dataset.source,
    repo_id: dataset.repoId || dataset.id,
    storage_path: dataset.storage,
    license: dataset.license || "unknown",
    license_category: getLicenseCategory(dataset.license),
    compatible_with_profile: isDatasetCompatible(dataset, state.usageProfile),
    weight_pct: state.weights[dataset.id] || 0,
  }));

  return {
    project: "DataRecipe",
    mode: modeSelectEl.value,
    training_profile: state.usageProfile,
    target_model: modelInputEl.value.trim() || "(unset)",
    total_weight_pct: chosen.reduce((acc, dataset) => acc + dataset.weight_pct, 0),
    incompatible_datasets_for_profile: chosen
      .filter((dataset) => !dataset.compatible_with_profile)
      .map((dataset) => dataset.dataset_id),
    predicted_performance: {
      overall_score: prediction.overallScore,
      grade: prediction.grade,
      axes: prediction.axes.map((axis) => ({
        axis: axis.id,
        label: axis.label,
        score: axis.score,
      })),
      strengths: prediction.notes.positive,
      risks: prediction.notes.risks,
      summary: prediction.summary,
    },
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
    segment.innerHTML = `<span>${escapeHtml(dataset.name)} ${pct}%</span>`;
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
    const compatible = isDatasetCompatible(dataset, state.usageProfile);

    const item = document.createElement("div");
    item.className = `active-item ${compatible ? "" : "active-item-warning"}`;
    item.innerHTML = `
      <div class="active-top">
        <div class="active-name">
          <span class="dot" style="background:${dataset.color};"></span>
          ${escapeHtml(dataset.name)}
        </div>
        <span>${pct}%</span>
      </div>
      <div class="active-meta">
        <span>License: ${escapeHtml(dataset.license || "unknown")}</span>
        <span class="compat-tag ${compatible ? "ok" : "blocked"}">${escapeHtml(getCompatibilityMessage(dataset, state.usageProfile))}</span>
      </div>
      <div class="weight-row">
        <input type="range" min="0" max="100" step="1" value="${pct}" data-weight="${dataset.id}" />
        <input type="number" min="0" max="100" step="1" value="${pct}" data-weight-number="${dataset.id}" />
      </div>
    `;
    activeListEl.appendChild(item);
  });
}

function renderLibraryStatus() {
  if (!libraryStatusEl) return;

  libraryStatusEl.classList.remove("loading", "error");

  if (state.libraryLoading) {
    libraryStatusEl.classList.add("loading");
    libraryStatusEl.textContent = "Syncing datasets from Hugging Face...";
    return;
  }

  if (state.libraryError) {
    libraryStatusEl.classList.add("error");
    libraryStatusEl.textContent = state.libraryError;
    return;
  }

  const profileLabel = state.usageProfile;
  const querySuffix = state.search.trim().length >= 2 ? ` Search: \"${state.search.trim()}\".` : "";
  libraryStatusEl.textContent = `Loaded ${formatNumber(state.remoteDatasets.length)} Hugging Face datasets + ${formatNumber(BASE_DATASETS.length)} internal datasets. Profile: ${profileLabel}.${querySuffix}`;
}

function matchesSearch(dataset, keyword) {
  if (!keyword) return true;
  const haystack = [
    dataset.name,
    dataset.repoId,
    dataset.domain,
    dataset.family,
    dataset.description,
    dataset.license,
    dataset.source,
    ...(Array.isArray(dataset.tags) ? dataset.tags : []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(keyword);
}

function renderLibrary() {
  datasetGridEl.innerHTML = "";
  const keyword = state.search.trim().toLowerCase();

  const datasets = getLibraryDatasets()
    .filter((dataset) => matchesSearch(dataset, keyword))
    .filter((dataset) => {
      if (state.licenseFilter === "all") return true;
      return getLicenseCategory(dataset.license) === state.licenseFilter;
    })
    .filter((dataset) => {
      if (!state.showCompatibleOnly) return true;
      return isDatasetCompatible(dataset, state.usageProfile);
    })
    .sort((a, b) => {
      const aSelected = state.selected.has(a.id) ? 1 : 0;
      const bSelected = state.selected.has(b.id) ? 1 : 0;
      if (aSelected !== bSelected) return bSelected - aSelected;

      const aCompat = isDatasetCompatible(a, state.usageProfile) ? 1 : 0;
      const bCompat = isDatasetCompatible(b, state.usageProfile) ? 1 : 0;
      if (aCompat !== bCompat) return bCompat - aCompat;

      const scoreA = (a.downloads || 0) + (a.likes || 0) * 10;
      const scoreB = (b.downloads || 0) + (b.likes || 0) * 10;
      if (scoreA !== scoreB) return scoreB - scoreA;

      return a.name.localeCompare(b.name);
    });

  datasets.forEach((dataset) => {
    const isSelected = state.selected.has(dataset.id);
    const compatible = isDatasetCompatible(dataset, state.usageProfile);
    const blockedToAdd = !compatible && !isSelected;

    const sourceLabel = dataset.source === "huggingface" ? "hf" : "internal";
    const licenseCategory = getLicenseCategory(dataset.license);
    const familyLabel = dataset.family || "general";
    const downloadsLabel = dataset.source === "huggingface" ? `${formatNumber(dataset.downloads)} downloads` : "Private storage";
    const likesLabel = dataset.source === "huggingface" ? `${formatNumber(dataset.likes)} likes` : "Curated";

    const card = document.createElement("article");
    card.className = `dataset-card ${compatible ? "" : "disabled"}`;

    card.innerHTML = `
      <div class="dataset-head">
        <div>
          <div class="dataset-name">${escapeHtml(dataset.name)}</div>
          <div class="repo-id">${escapeHtml(dataset.repoId || dataset.id)}</div>
          <div class="dataset-meta">
            <span class="badge tag">${escapeHtml(dataset.domain)}</span>
            <span class="meta-pill">${escapeHtml(familyLabel)}</span>
            <span class="meta-pill">${escapeHtml(sourceLabel)}</span>
            <span class="license-chip ${compatible ? "ok" : "restricted"}">${escapeHtml(dataset.license || "unknown")}</span>
            <span class="meta-pill">${escapeHtml(getLicenseCategoryLabel(licenseCategory))}</span>
          </div>
        </div>
        <button data-toggle="${escapeHtml(dataset.id)}" class="toggle-btn ${isSelected ? "accent" : ""} ${blockedToAdd ? "blocked" : ""}" ${blockedToAdd ? "disabled" : ""}>
          ${isSelected ? "Selected" : blockedToAdd ? "Blocked" : "Add"}
        </button>
      </div>
      <div>${escapeHtml(dataset.description)}</div>
      <div class="compat-note ${compatible ? "ok" : "blocked"}">${escapeHtml(getCompatibilityMessage(dataset, state.usageProfile))}</div>
      <div class="dataset-stats">${escapeHtml(downloadsLabel)} · ${escapeHtml(likesLabel)}</div>
      <div class="storage">${escapeHtml(dataset.storage)}</div>
    `;

    datasetGridEl.appendChild(card);
  });

  if (!datasetGridEl.children.length) {
    datasetGridEl.innerHTML = '<div class="empty">No dataset matches these filters.</div>';
  }
}

function renderOutput() {
  recipeOutputEl.textContent = JSON.stringify(buildRecipe(), null, 2);
}

function renderSummaryBadges() {
  const selected = getSelectedDatasets();
  const totalPct = selected.reduce((acc, dataset) => acc + (state.weights[dataset.id] || 0), 0);
  if (selectedCountEl) selectedCountEl.textContent = String(selected.length);
  if (totalPctEl) totalPctEl.textContent = `${totalPct}%`;
}

function render() {
  renderBar();
  renderActiveList();
  renderPerformancePanel();
  renderLibrary();
  renderOutput();
  renderSummaryBadges();
  renderLibraryStatus();
}

function startDrag(event) {
  const selected = getSelectedDatasets();
  if (selected.length < 2) return;

  const index = Number(event.currentTarget.dataset.index);
  const leftId = selected[index].id;
  const rightId = selected[index + 1].id;
  const ids = selected.map((dataset) => dataset.id);

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

  const ids = getSelectedDatasets().map((dataset) => dataset.id);
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
    renderLibraryStatus();
    queueSearchSync();
    return;
  }

  if (event.target.id === "usageProfileSelect") {
    state.usageProfile = event.target.value;
    render();
    return;
  }

  if (event.target.id === "licenseFilterSelect") {
    state.licenseFilter = event.target.value;
    renderLibrary();
    renderLibraryStatus();
    return;
  }

  if (event.target.id === "compatibleOnlyToggle") {
    state.showCompatibleOnly = event.target.checked;
    renderLibrary();
    renderLibraryStatus();
    return;
  }

  if (event.target.id === "modelInput" || event.target.id === "modeSelect") {
    renderPerformancePanel();
    renderOutput();
  }
});

document.addEventListener("click", (event) => {
  const toggleId = event.target.dataset.toggle;
  if (toggleId) {
    const dataset = getDatasetById(toggleId);
    if (!dataset) return;

    const alreadySelected = state.selected.has(toggleId);
    const compatible = isDatasetCompatible(dataset, state.usageProfile);
    if (!alreadySelected && !compatible) {
      return;
    }

    if (alreadySelected) {
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
if (usageProfileSelectEl) usageProfileSelectEl.value = state.usageProfile;
if (licenseFilterSelectEl) licenseFilterSelectEl.value = state.licenseFilter;
if (compatibleOnlyToggleEl) compatibleOnlyToggleEl.checked = state.showCompatibleOnly;
startRecipeCounterTicker();
render();
syncHFDatasets();

const CLUSTER_RADIUS = 36;
const CELL_SIZE = 32;
let cellPositions = [];
let frameQueued = false;
let latestMouseX = -9999;
let latestMouseY = -9999;

function buildBgGrid() {
  const grid = document.getElementById("bgGrid");
  if (!grid) return;
  if (window.matchMedia("(max-width: 820px)").matches) {
    grid.innerHTML = "";
    cellPositions = [];
    return;
  }

  const cols = Math.ceil(window.innerWidth / CELL_SIZE) + 1;
  const rows = Math.ceil(window.innerHeight / CELL_SIZE) + 1;
  const total = cols * rows;

  if (grid.childElementCount !== total) {
    grid.innerHTML = "";
    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i += 1) {
      const cell = document.createElement("span");
      cell.className = "bg-cell";
      cell.innerHTML = '<span class="x">&times;</span><span class="recipe">%</span>';
      frag.appendChild(cell);
    }
    grid.appendChild(frag);
  }

  cellPositions = Array.from(grid.querySelectorAll(".bg-cell")).map((el) => {
    const rect = el.getBoundingClientRect();
    return { el, cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
  });
}

function updateBgCluster(mx, my) {
  const radiusSquared = CLUSTER_RADIUS * CLUSTER_RADIUS;
  for (let i = 0; i < cellPositions.length; i += 1) {
    const cell = cellPositions[i];
    const dx = mx - cell.cx;
    const dy = my - cell.cy;
    const active = dx * dx + dy * dy < radiusSquared;
    if (active !== cell.el.classList.contains("flipped")) {
      cell.el.classList.toggle("flipped", active);
    }
  }
}

document.addEventListener("mousemove", (event) => {
  latestMouseX = event.clientX;
  latestMouseY = event.clientY;
  if (!frameQueued) {
    frameQueued = true;
    requestAnimationFrame(() => {
      frameQueued = false;
      updateBgCluster(latestMouseX, latestMouseY);
    });
  }
});

buildBgGrid();
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildBgGrid, 250);
});
