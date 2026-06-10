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
const DOMAIN_AUTO_MIX_MIN_HF_DATASETS = 18;
const DOMAIN_AUTO_MIX_FETCH_LIMIT = 80;
const DOMAIN_AUTO_MIX_QUERY_TERMS = {
  medicine: ["medicine", "medical", "clinical", "biomedical", "health"],
  finance: ["finance", "financial", "economics", "accounting", "trading"],
  law: ["law", "legal", "contract", "court", "statute"],
  coding: ["code", "coding", "programming", "software", "instruction"],
  math: ["math", "mathematics", "algebra", "geometry", "reasoning"],
  general: ["general", "instruction", "dialogue", "qa"],
};
const TARGET_MODEL_CATALOG = {
  open_source: [
    "Llama 3.1 8B Instruct",
    "Llama 3.1 70B Instruct",
    "Mistral 7B Instruct v0.3",
    "Mixtral 8x7B Instruct",
    "Qwen2.5 7B Instruct",
    "Qwen2.5 32B Instruct",
    "DeepSeek-R1 Distill Qwen 32B",
    "Gemma 2 9B Instruct",
    "Gemma 2 27B Instruct",
    "Phi-4",
    "Yi-1.5 34B Chat",
    "Falcon 180B Chat",
  ],
  closed_source: [
    "GPT-5.4",
    "GPT-5.4-mini",
    "Claude Sonnet 4",
    "Claude Opus 4.1",
    "Gemini 2.5 Pro",
    "Gemini 2.5 Flash",
    "Cohere Command R+",
    "Mistral Large",
    "Grok 3",
    "AI21 Jamba 1.5 Large",
    "Amazon Nova Pro",
    "Llama 4 Maverick (Hosted)",
  ],
};
const DEFAULT_TARGET_MODEL = "open-model-8b";
const RECIPE_COUNTER_STORAGE_KEY = "dataRecipeUniqueRecipeCount";
const RECIPE_COUNTER_MIN = 530;
const RECIPE_COUNTER_TICK_MS = 5000;
const BEHAVIOR_LOG_STORAGE_KEY = "dataRecipeBehaviorLogsV1";
const BEHAVIOR_IMPRESSION_COOLDOWN_MS = 12000;
const BEHAVIOR_HIGH_GOAL_THRESHOLD = 65;
const CALIBRATION_MIN_IMPRESSIONS = 80;
const CALIBRATION_MIN_ADDS = 8;
const SAVED_RECIPES_STORAGE_KEY = "dataRecipeSavedCombinationsV1";
const FORUM_POSTS_STORAGE_KEY = "dataRecipeForumPostsV1";
const MAX_SAVED_RECIPES = 24;
const DEFAULT_WEBHOOK_URL = "https://your-trainer.example.com/train";
const SYNTHETIC_DATASET_ID = "synthetic_augmentation";
const SYNTHETIC_BASE_RESERVE_PCT = 12;
const SYNTHETIC_NICHE_RESERVE_PCT = 20;
const WEIGHT_DECIMAL_PLACES = 1;
const WEIGHT_SCALE = 10 ** WEIGHT_DECIMAL_PLACES;
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
  { id: "domain_alignment", label: "Domain Alignment", logo: "DA" },
  { id: "reasoning", label: "Reasoning", logo: "RE" },
  { id: "factuality", label: "Factuality", logo: "FA" },
  { id: "instruction_following", label: "Instruction Following", logo: "IF" },
  { id: "safety_compliance", label: "Safety & Compliance", logo: "SC" },
  { id: "robustness", label: "Robustness", logo: "RB" },
];

const PERFORMANCE_GRADE_HELP = {
  A: "A: Strong projected improvement with stable risk profile.",
  B: "B: Moderate projected improvement; rebalancing can likely improve outcomes.",
  C: "C: Higher-risk projection; recipe likely needs better balance and coverage.",
};

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

const PERFORMANCE_PRIORITY_AXES = {
  balanced: {
    domain_alignment: 1,
    reasoning: 1,
    factuality: 1,
    instruction_following: 1,
    safety_compliance: 1,
    robustness: 1,
  },
  domain_alignment: {
    domain_alignment: 2.1,
    factuality: 1.1,
    safety_compliance: 0.8,
    reasoning: 0.7,
    robustness: 0.7,
  },
  reasoning: {
    reasoning: 2.1,
    robustness: 1.2,
    instruction_following: 0.8,
    factuality: 0.7,
  },
  factuality: {
    factuality: 2.1,
    domain_alignment: 1.1,
    safety_compliance: 1,
    reasoning: 0.7,
  },
  instruction_following: {
    instruction_following: 2.1,
    robustness: 1.1,
    reasoning: 0.9,
    factuality: 0.7,
  },
  safety_compliance: {
    safety_compliance: 2.1,
    factuality: 1.1,
    robustness: 1,
    domain_alignment: 0.8,
  },
  robustness: {
    robustness: 2.1,
    reasoning: 1.2,
    instruction_following: 0.8,
    factuality: 0.7,
  },
};

const PERFORMANCE_PRIORITY_LABELS = {
  balanced: "Balanced quality",
  domain_alignment: "Domain alignment",
  reasoning: "Reasoning",
  factuality: "Factuality",
  instruction_following: "Instruction following",
  safety_compliance: "Safety & compliance",
  robustness: "Robustness",
};

const DOMAIN_NEED_LABELS = {
  all: "All domains",
  medicine: "Medicine",
  finance: "Finance",
  law: "Law",
  coding: "Coding",
  math: "Math",
  general: "General",
};

const PROFILE_RANKING_STRATEGY = {
  company: {
    label: "Enterprise compliance-first",
    baseAxisWeights: {
      domain_alignment: 1,
      reasoning: 0.8,
      factuality: 1.8,
      instruction_following: 1,
      safety_compliance: 2.4,
      robustness: 1.2,
    },
    goalWeight: 0.78,
    popularityWeight: 0.12,
    domainMatchBoost: 24,
    domainMismatchPenalty: 20,
    compatibleBoost: 18,
    incompatiblePenalty: 62,
    selectedBoost: 24,
    sourceBoosts: { internal: 12, huggingface: 0 },
    licensePenaltyByCategory: {
      permissive: 0,
      internal: 0,
      non_commercial: 14,
      research_only: 16,
      restricted: 30,
      unknown: 20,
    },
    smartGoalScoreMin: 68,
    smartFitScoreMin: 72,
    requireDomainMatchWhenSpecified: true,
  },
  academia: {
    label: "Research performance-first",
    baseAxisWeights: {
      domain_alignment: 1.2,
      reasoning: 1.9,
      factuality: 1.6,
      instruction_following: 1.1,
      safety_compliance: 1,
      robustness: 1.6,
    },
    goalWeight: 0.84,
    popularityWeight: 0.14,
    domainMatchBoost: 14,
    domainMismatchPenalty: 8,
    compatibleBoost: 10,
    incompatiblePenalty: 24,
    selectedBoost: 20,
    sourceBoosts: { internal: 2, huggingface: 4 },
    licensePenaltyByCategory: {
      permissive: 0,
      internal: 0,
      non_commercial: 1,
      research_only: 0,
      restricted: 12,
      unknown: 8,
    },
    smartGoalScoreMin: 62,
    smartFitScoreMin: 60,
    requireDomainMatchWhenSpecified: false,
  },
  personal: {
    label: "Personal utility-first",
    baseAxisWeights: {
      domain_alignment: 1.1,
      reasoning: 1.3,
      factuality: 1.3,
      instruction_following: 1.5,
      safety_compliance: 1,
      robustness: 1.2,
    },
    goalWeight: 0.8,
    popularityWeight: 0.16,
    domainMatchBoost: 16,
    domainMismatchPenalty: 10,
    compatibleBoost: 10,
    incompatiblePenalty: 44,
    selectedBoost: 20,
    sourceBoosts: { internal: 2, huggingface: 2 },
    licensePenaltyByCategory: {
      permissive: 0,
      internal: 0,
      non_commercial: 2,
      research_only: 10,
      restricted: 16,
      unknown: 12,
    },
    smartGoalScoreMin: 58,
    smartFitScoreMin: 56,
    requireDomainMatchWhenSpecified: false,
  },
  student: {
    label: "Student learning-first",
    baseAxisWeights: {
      domain_alignment: 1.3,
      reasoning: 1.8,
      factuality: 1.2,
      instruction_following: 1.6,
      safety_compliance: 1,
      robustness: 1.3,
    },
    goalWeight: 0.82,
    popularityWeight: 0.14,
    domainMatchBoost: 18,
    domainMismatchPenalty: 9,
    compatibleBoost: 11,
    incompatiblePenalty: 40,
    selectedBoost: 20,
    sourceBoosts: { internal: 1, huggingface: 3 },
    licensePenaltyByCategory: {
      permissive: 0,
      internal: 0,
      non_commercial: 2,
      research_only: 2,
      restricted: 14,
      unknown: 10,
    },
    smartGoalScoreMin: 60,
    smartFitScoreMin: 58,
    requireDomainMatchWhenSpecified: false,
  },
};

const BASE_PROFILE_RANKING_STRATEGY = JSON.parse(JSON.stringify(PROFILE_RANKING_STRATEGY));
let calibratedProfileRankingStrategy = JSON.parse(JSON.stringify(PROFILE_RANKING_STRATEGY));
let profileCalibrationMeta = {};
const DEFAULT_PROFILE_RANKING_STRATEGY = BASE_PROFILE_RANKING_STRATEGY.company;
const PERFORMANCE_PREDICTION_DELAY_MS = 5000;
const PERFORMANCE_MODEL_LABEL = "gpt-5.4";
const PERFORMANCE_PREDICTION_PROXY_STORAGE_KEY = "dataRecipePredictionProxyUrl";
const DEFAULT_PERFORMANCE_PREDICTION_PROXY_URL = "http://127.0.0.1:8787/predict-performance";
const PERFORMANCE_PREDICTION_TIMEOUT_MS = 45000;

let performancePredictionProxyUrl = DEFAULT_PERFORMANCE_PREDICTION_PROXY_URL;
try {
  const rawPredictionProxyUrl = window.localStorage.getItem(PERFORMANCE_PREDICTION_PROXY_STORAGE_KEY);
  if (rawPredictionProxyUrl && String(rawPredictionProxyUrl).trim()) {
    performancePredictionProxyUrl = String(rawPredictionProxyUrl).trim();
  }
} catch (_) {}

const state = {
  selected: new Set(),
  weights: {},
  targetModels: [DEFAULT_TARGET_MODEL],
  customModels: [],
  modelSearch: "",
  modelImportStatus: "",
  modelImportStatusTone: "",
  search: "",
  usageProfile: "company",
  domainNeed: "all",
  performanceNeed: "balanced",
  groupBy: "domain",
  licenseFilter: "all",
  showCompatibleOnly: false,
  smartRecommendOnly: true,
  savedRecipes: [],
  connectorTarget: "codex",
  webhookUrl: "",
  finalRunScore: "",
  runNotes: "",
  donateRecipe: false,
  forumPostDraft: "",
  drag: null,
  remoteDatasets: [],
  libraryLoading: false,
  libraryError: "",
  lastFetchedCount: 0,
  fetchToken: 0,
};

let searchFetchTimer = null;
let behaviorLogFlushTimer = null;
let behaviorLogs = readBehaviorLogs();
const impressionCooldownMap = new Map();
let latestRankedEntriesById = new Map();
let performanceRenderTimer = null;
let pendingPerformancePredictionKey = "";
let resolvedPerformancePredictionKey = "";
let resolvedPerformancePrediction = null;
let performanceRequestSequence = 0;
let resolvedRecipeIntelKey = "";
let resolvedRecipeIntel = null;
let domainAutoMixSequence = 0;

const barEl = document.getElementById("allocationBar");
const activeListEl = document.getElementById("activeList");
const datasetGridEl = document.getElementById("datasetGrid");
const recipeOutputEl = document.getElementById("recipeOutput");
const saveRecipeNameEl = document.getElementById("saveRecipeName");
const saveRecipeBtnEl = document.getElementById("saveRecipeBtn");
const savedRecipesListEl = document.getElementById("savedRecipesList");
const connectorTargetSelectEl = document.getElementById("connectorTargetSelect");
const webhookUrlInputEl = document.getElementById("webhookUrlInput");
const connectorSnippetDisclosureEl = document.getElementById("connectorSnippetDisclosure");
const connectorSnippetSummaryEl = document.getElementById("connectorSnippetSummary");
const connectorSnippetOutputEl = document.getElementById("connectorSnippetOutput");
const finalRunScoreInputEl = document.getElementById("finalRunScoreInput");
const runNotesInputEl = document.getElementById("runNotesInput");
const donateRecipeToggleEl = document.getElementById("donateRecipeToggle");
const forumDonationOutputEl = document.getElementById("forumDonationOutput");
const searchInputEl = document.getElementById("searchInput");
const modelInputEl = document.getElementById("modelInput");
const addCustomModelBtnEl = document.getElementById("addCustomModelBtn");
const importModelsBtnEl = document.getElementById("importModelsBtn");
const importModelsFileEl = document.getElementById("importModelsFile");
const selectedModelSummaryEl = document.getElementById("selectedModelSummary");
const selectedModelsPanelEl = document.getElementById("selectedModelsPanel");
const selectedModelsPanelSummaryEl = document.getElementById("selectedModelsPanelSummary");
const selectedModelChipsEl = document.getElementById("selectedModelChips");
const openSourceModelChecklistEl = document.getElementById("openSourceModelChecklist");
const closedSourceModelChecklistEl = document.getElementById("closedSourceModelChecklist");
const customModelChecklistEl = document.getElementById("customModelChecklist");
const modelImportStatusEl = document.getElementById("modelImportStatus");
const modeSelectEl = document.getElementById("modeSelect");
const selectedCountEl = document.getElementById("selectedCount");
const totalPctEl = document.getElementById("totalPct");
const usageProfileSelectEl = document.getElementById("usageProfileSelect");
const domainNeedSelectEl = document.getElementById("domainNeedSelect");
const performanceNeedSelectEl = document.getElementById("performanceNeedSelect");
const groupBySelectEl = document.getElementById("groupBySelect");
const licenseFilterSelectEl = document.getElementById("licenseFilterSelect");
const compatibleOnlyToggleEl = document.getElementById("compatibleOnlyToggle");
const smartRecommendOnlyToggleEl = document.getElementById("smartRecommendOnlyToggle");
const libraryStatusEl = document.getElementById("libraryStatus");
const performancePanelEl = document.getElementById("performancePanel");
const performanceGradeEl = document.getElementById("performanceGrade");
const performanceSummaryEl = document.getElementById("performanceSummary");
const performanceAxesEl = document.getElementById("performanceAxes");
const performanceNotesEl = document.getElementById("performanceNotes");
const recipeCountEl = document.getElementById("recipeCount");
const syntheticDataBtnEl = document.getElementById("syntheticDataBtn");
const allocationInsightEl = document.getElementById("allocationInsight");
const allocationHintEl = document.getElementById("allocationHint");
const allocationLegendEl = document.getElementById("allocationLegend");

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

function formatPercent(value, digits = WEIGHT_DECIMAL_PLACES) {
  const numeric = Number(value);
  const safe = Number.isFinite(numeric) ? numeric : 0;
  return `${safe.toFixed(digits)}%`;
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

function normalizeModelName(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeModelKey(value) {
  return normalizeModelName(value).toLowerCase();
}

function uniqueModelNames(values) {
  const seen = new Set();
  const output = [];
  (Array.isArray(values) ? values : []).forEach((item) => {
    const name = normalizeModelName(item);
    if (!name) return;
    const key = normalizeModelKey(name);
    if (seen.has(key)) return;
    seen.add(key);
    output.push(name);
  });
  return output;
}

function splitModelNames(raw) {
  return uniqueModelNames(String(raw || "").split(/[\n,;]+/));
}

function getAllCatalogModelNames() {
  return uniqueModelNames([
    ...(TARGET_MODEL_CATALOG.open_source || []),
    ...(TARGET_MODEL_CATALOG.closed_source || []),
  ]);
}

function getSelectedTargetModels() {
  return uniqueModelNames(state.targetModels);
}

function getPrimaryTargetModel() {
  const selected = getSelectedTargetModels();
  return selected[0] || "";
}

function getTargetModelSummary(maxItems = 3) {
  const selected = getSelectedTargetModels();
  if (!selected.length) return "(unset)";
  if (selected.length <= maxItems) return selected.join(", ");
  const head = selected.slice(0, maxItems).join(", ");
  return `${head} (+${selected.length - maxItems} more)`;
}

function syncCustomModelsWithSelection() {
  const catalogKeys = new Set(getAllCatalogModelNames().map((name) => normalizeModelKey(name)));
  const merged = [...state.customModels];
  getSelectedTargetModels().forEach((name) => {
    if (catalogKeys.has(normalizeModelKey(name))) return;
    merged.push(name);
  });
  state.customModels = uniqueModelNames(merged);
}

function addCustomModelNames(names, autoSelect = true) {
  const parsed = uniqueModelNames(names);
  if (!parsed.length) return [];

  state.customModels = uniqueModelNames([...(state.customModels || []), ...parsed]);
  if (autoSelect) {
    state.targetModels = uniqueModelNames([...(state.targetModels || []), ...parsed]);
  }
  return parsed;
}

function setModelImportStatus(text, tone = "") {
  state.modelImportStatus = String(text || "");
  state.modelImportStatusTone = tone;
}

function handleTargetModelsChanged() {
  syncCustomModelsWithSelection();
  renderModelPicker();
  renderPerformancePanel();
  renderOutput();
  renderConnectorHub();
  state.forumPostDraft = "";
  renderForumDonation();
}

function toggleTargetModel(modelName, enabled) {
  const name = normalizeModelName(modelName);
  if (!name) return;

  const selected = getSelectedTargetModels();
  const selectedKeys = new Set(selected.map((item) => normalizeModelKey(item)));
  const key = normalizeModelKey(name);
  let next = selected;

  if (enabled) {
    if (!selectedKeys.has(key)) {
      next = [...selected, name];
    }
  } else {
    next = selected.filter((item) => normalizeModelKey(item) !== key);
  }

  state.targetModels = uniqueModelNames(next);
  handleTargetModelsChanged();
}

function removeTargetModel(modelName) {
  toggleTargetModel(modelName, false);
}

function renderModelChecklist(containerEl, names, selectedKeys, searchText) {
  if (!containerEl) return;
  const query = String(searchText || "").trim().toLowerCase();
  const rows = uniqueModelNames(names).filter((name) => {
    if (!query) return true;
    return name.toLowerCase().includes(query);
  });

  if (!rows.length) {
    containerEl.innerHTML = '<div class="model-empty">No matching models.</div>';
    return;
  }

  containerEl.innerHTML = rows
    .map((name) => {
      const checked = selectedKeys.has(normalizeModelKey(name));
      return `
        <label class="model-check-item">
          <input type="checkbox" data-model-toggle="${escapeHtml(name)}" ${checked ? "checked" : ""} />
          <span>${escapeHtml(name)}</span>
        </label>
      `;
    })
    .join("");
}

function renderModelPicker() {
  if (!modelInputEl) return;
  const selected = getSelectedTargetModels();
  const selectedKeys = new Set(selected.map((name) => normalizeModelKey(name)));
  const searchText = String(state.modelSearch || "");

  modelInputEl.value = searchText;

  if (selectedModelSummaryEl) {
    if (!selected.length) {
      selectedModelSummaryEl.textContent =
        "No target models selected yet. Use catalog, Add, or Import.";
    } else {
      selectedModelSummaryEl.textContent =
        `${selected.length} selected: ${getTargetModelSummary(2)}`;
    }
  }

  if (selectedModelsPanelSummaryEl) {
    selectedModelsPanelSummaryEl.textContent = `View Selected Models (${selected.length})`;
  }

  if (selectedModelsPanelEl && !selected.length) {
    selectedModelsPanelEl.open = false;
  }

  if (selectedModelChipsEl) {
    if (!selected.length) {
      selectedModelChipsEl.innerHTML =
        '<span class="model-chip-empty">No target models selected yet.</span>';
    } else {
      selectedModelChipsEl.innerHTML = selected
        .map(
          (name) => `
            <span class="model-chip">
              <span>${escapeHtml(name)}</span>
              <button type="button" data-remove-model="${escapeHtml(name)}" aria-label="Remove ${escapeHtml(name)}">x</button>
            </span>
          `,
        )
        .join("");
    }
  }

  renderModelChecklist(
    openSourceModelChecklistEl,
    TARGET_MODEL_CATALOG.open_source,
    selectedKeys,
    searchText,
  );
  renderModelChecklist(
    closedSourceModelChecklistEl,
    TARGET_MODEL_CATALOG.closed_source,
    selectedKeys,
    searchText,
  );
  renderModelChecklist(customModelChecklistEl, state.customModels, selectedKeys, searchText);

  if (modelImportStatusEl) {
    modelImportStatusEl.textContent = state.modelImportStatus || "";
    modelImportStatusEl.classList.remove("ok", "warn", "error");
    if (state.modelImportStatusTone) {
      modelImportStatusEl.classList.add(state.modelImportStatusTone);
    }
  }
}

function parseImportedModelNames(rawText, fileName = "") {
  const filename = String(fileName || "").toLowerCase();
  if (filename.endsWith(".json")) {
    try {
      const parsed = JSON.parse(String(rawText || ""));
      if (Array.isArray(parsed)) {
        return uniqueModelNames(parsed);
      }
      if (parsed && typeof parsed === "object") {
        if (Array.isArray(parsed.target_models)) {
          return uniqueModelNames(parsed.target_models);
        }
        if (Array.isArray(parsed.models)) {
          return uniqueModelNames(parsed.models);
        }
      }
    } catch (_) {}
  }
  return splitModelNames(String(rawText || ""));
}

async function importTargetModelsFromFile(file) {
  if (!file) return;
  try {
    const raw = await file.text();
    const names = parseImportedModelNames(raw, file.name || "");
    if (!names.length) {
      setModelImportStatus("No model names were found in the imported file.", "warn");
      renderModelPicker();
      return;
    }
    addCustomModelNames(names, true);
    setModelImportStatus(`Imported ${names.length} model${names.length > 1 ? "s" : ""}.`, "ok");
    state.modelSearch = "";
    handleTargetModelsChanged();
  } catch (_) {
    setModelImportStatus("Model import failed. Please use .txt, .csv, or .json.", "error");
    renderModelPicker();
  }
}

function createEmptyBehaviorProfileStats() {
  return {
    impressions: 0,
    adds: 0,
    compatibleImpressions: 0,
    compatibleAdds: 0,
    domainRelevantImpressions: 0,
    domainRelevantAdds: 0,
    domainMatchImpressions: 0,
    domainMatchAdds: 0,
    highGoalImpressions: 0,
    highGoalAdds: 0,
    internalImpressions: 0,
    internalAdds: 0,
    huggingfaceImpressions: 0,
    huggingfaceAdds: 0,
  };
}

function createEmptyBehaviorLog() {
  return {
    version: 1,
    profiles: {
      company: createEmptyBehaviorProfileStats(),
      academia: createEmptyBehaviorProfileStats(),
      personal: createEmptyBehaviorProfileStats(),
      student: createEmptyBehaviorProfileStats(),
    },
  };
}

function readBehaviorLogs() {
  try {
    const raw = window.localStorage.getItem(BEHAVIOR_LOG_STORAGE_KEY);
    if (!raw) return createEmptyBehaviorLog();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return createEmptyBehaviorLog();
    const merged = createEmptyBehaviorLog();
    Object.keys(merged.profiles).forEach((profile) => {
      const incoming = parsed.profiles && parsed.profiles[profile] ? parsed.profiles[profile] : {};
      merged.profiles[profile] = { ...merged.profiles[profile], ...incoming };
    });
    return merged;
  } catch (_) {
    return createEmptyBehaviorLog();
  }
}

function queueBehaviorLogFlush() {
  if (behaviorLogFlushTimer) return;
  behaviorLogFlushTimer = window.setTimeout(() => {
    behaviorLogFlushTimer = null;
    try {
      window.localStorage.setItem(BEHAVIOR_LOG_STORAGE_KEY, JSON.stringify(behaviorLogs));
    } catch (_) {}
  }, 400);
}

function getBehaviorStatsForProfile(profile) {
  if (!behaviorLogs.profiles[profile]) {
    behaviorLogs.profiles[profile] = createEmptyBehaviorProfileStats();
  }
  return behaviorLogs.profiles[profile];
}

function smoothCtr(adds, impressions) {
  const alpha = 2;
  const beta = 10;
  return (Number(adds || 0) + alpha) / (Number(impressions || 0) + alpha + beta);
}

function updateBehaviorStatsForEvent(profile, entry, eventType) {
  if (!entry || !entry.dataset || !entry.fit) return;
  const stats = getBehaviorStatsForProfile(profile);
  const isAdd = eventType === "add";
  const sourceKey = entry.dataset.source === "internal" ? "internal" : "huggingface";
  const domainNeedSpecified = state.domainNeed !== "all";
  const domainMatches = entry.dataset.domain === state.domainNeed;
  const isHighGoal = entry.fit.goalScore >= BEHAVIOR_HIGH_GOAL_THRESHOLD;

  if (isAdd) {
    stats.adds += 1;
    if (entry.fit.compatible) stats.compatibleAdds += 1;
    if (domainNeedSpecified) {
      stats.domainRelevantAdds += 1;
      if (domainMatches) stats.domainMatchAdds += 1;
    }
    if (isHighGoal) stats.highGoalAdds += 1;
    if (sourceKey === "internal") stats.internalAdds += 1;
    if (sourceKey === "huggingface") stats.huggingfaceAdds += 1;
    return;
  }

  stats.impressions += 1;
  if (entry.fit.compatible) stats.compatibleImpressions += 1;
  if (domainNeedSpecified) {
    stats.domainRelevantImpressions += 1;
    if (domainMatches) stats.domainMatchImpressions += 1;
  }
  if (isHighGoal) stats.highGoalImpressions += 1;
  if (sourceKey === "internal") stats.internalImpressions += 1;
  if (sourceKey === "huggingface") stats.huggingfaceImpressions += 1;
}

function calibrateRankingStrategiesFromBehaviorLogs() {
  const nextStrategies = JSON.parse(JSON.stringify(BASE_PROFILE_RANKING_STRATEGY));
  const nextMeta = {};

  Object.keys(nextStrategies).forEach((profile) => {
    const base = BASE_PROFILE_RANKING_STRATEGY[profile];
    const stats = getBehaviorStatsForProfile(profile);
    const next = nextStrategies[profile];
    const hasEnoughData =
      stats.impressions >= CALIBRATION_MIN_IMPRESSIONS && stats.adds >= CALIBRATION_MIN_ADDS;

    if (!hasEnoughData) {
      next.label = base.label;
      nextMeta[profile] = {
        calibrated: false,
        impressions: stats.impressions,
        adds: stats.adds,
      };
      return;
    }

    const overallCtr = smoothCtr(stats.adds, stats.impressions);
    const compatibleCtr = smoothCtr(stats.compatibleAdds, stats.compatibleImpressions);
    const highGoalCtr = smoothCtr(stats.highGoalAdds, stats.highGoalImpressions);

    const domainBaselineCtr = smoothCtr(stats.domainRelevantAdds, stats.domainRelevantImpressions);
    const domainMatchCtr = smoothCtr(stats.domainMatchAdds, stats.domainMatchImpressions);
    const domainLift =
      stats.domainRelevantImpressions >= 35 && stats.domainMatchImpressions >= 25
        ? domainMatchCtr / domainBaselineCtr
        : 1;

    const compatibilityLift =
      stats.compatibleImpressions >= 35 ? compatibleCtr / overallCtr : 1;
    const qualityLift = stats.highGoalImpressions >= 35 ? highGoalCtr / overallCtr : 1;

    const internalCtr = smoothCtr(stats.internalAdds, stats.internalImpressions);
    const huggingfaceCtr = smoothCtr(stats.huggingfaceAdds, stats.huggingfaceImpressions);
    const sourceShift =
      stats.internalImpressions >= 25 && stats.huggingfaceImpressions >= 25
        ? clamp((internalCtr - huggingfaceCtr) * 220, -10, 10)
        : 0;

    next.goalWeight = clamp(base.goalWeight + (qualityLift - 1) * 0.14, 0.65, 0.93);
    next.popularityWeight = clamp(base.popularityWeight - (qualityLift - 1) * 0.06, 0.06, 0.24);

    next.compatibleBoost = Math.round(
      clamp(base.compatibleBoost + (compatibilityLift - 1) * 10, 4, 36),
    );
    next.incompatiblePenalty = Math.round(
      clamp(base.incompatiblePenalty + (compatibilityLift - 1) * 22, 14, 80),
    );

    next.domainMatchBoost = Math.round(
      clamp(base.domainMatchBoost + (domainLift - 1) * 10, 8, 30),
    );
    next.domainMismatchPenalty = Math.round(
      clamp(base.domainMismatchPenalty + (domainLift - 1) * 9, 4, 28),
    );

    next.smartGoalScoreMin = Math.round(
      clamp(base.smartGoalScoreMin + (qualityLift - 1) * 8, 52, 82),
    );
    next.smartFitScoreMin = Math.round(
      clamp(base.smartFitScoreMin + (qualityLift - 1) * 8 + (compatibilityLift - 1) * 4, 52, 84),
    );

    next.sourceBoosts.internal = Math.round(
      clamp((base.sourceBoosts.internal || 0) + sourceShift, -8, 20),
    );
    next.sourceBoosts.huggingface = Math.round(
      clamp((base.sourceBoosts.huggingface || 0) - sourceShift, -8, 20),
    );

    next.requireDomainMatchWhenSpecified =
      base.requireDomainMatchWhenSpecified || domainLift >= 1.22;
    next.label = `${base.label} (calibrated)`;

    nextMeta[profile] = {
      calibrated: true,
      impressions: stats.impressions,
      adds: stats.adds,
      overallCtr,
    };
  });

  calibratedProfileRankingStrategy = nextStrategies;
  profileCalibrationMeta = nextMeta;
}

function getActiveCalibrationMeta() {
  return profileCalibrationMeta[state.usageProfile] || { calibrated: false, impressions: 0, adds: 0 };
}

function shouldLogImpression(profile, datasetId) {
  const key = `${profile}::${datasetId}`;
  const now = Date.now();
  const last = impressionCooldownMap.get(key) || 0;
  if (now - last < BEHAVIOR_IMPRESSION_COOLDOWN_MS) {
    return false;
  }
  impressionCooldownMap.set(key, now);
  return true;
}

function logLibraryImpressions(entries) {
  const profile = state.usageProfile;
  entries.slice(0, 120).forEach((entry) => {
    if (!shouldLogImpression(profile, entry.dataset.id)) return;
    updateBehaviorStatsForEvent(profile, entry, "impression");
  });
  queueBehaviorLogFlush();
}

function logDatasetAddForCalibration(datasetId) {
  let entry = latestRankedEntriesById.get(datasetId);
  if (!entry) {
    const dataset = getDatasetById(datasetId);
    if (!dataset) return;
    entry = {
      dataset,
      fit: scoreDatasetForNeeds(dataset),
      isSelected: state.selected.has(datasetId),
    };
  }
  updateBehaviorStatsForEvent(state.usageProfile, entry, "add");
  queueBehaviorLogFlush();
  calibrateRankingStrategiesFromBehaviorLogs();
}

function readSavedRecipes() {
  try {
    const raw = window.localStorage.getItem(SAVED_RECIPES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item === "object" && item.id && item.name)
      .slice(0, MAX_SAVED_RECIPES);
  } catch (_) {
    return [];
  }
}

function writeSavedRecipes() {
  try {
    window.localStorage.setItem(SAVED_RECIPES_STORAGE_KEY, JSON.stringify(state.savedRecipes));
  } catch (_) {}
}

function formatSavedRecipeTime(value) {
  const parsed = new Date(value || Date.now());
  if (Number.isNaN(parsed.getTime())) return "Unknown time";
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function readForumPosts() {
  try {
    const raw = window.localStorage.getItem(FORUM_POSTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item === "object" && item.id);
  } catch (_) {
    return [];
  }
}

function writeForumPosts(posts) {
  try {
    window.localStorage.setItem(FORUM_POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch (_) {}
}

function getDominantSelectedDomain() {
  if (state.domainNeed !== "all") {
    return state.domainNeed;
  }

  const selected = getSelectedDatasets().filter((dataset) => dataset.id !== SYNTHETIC_DATASET_ID);
  if (!selected.length) {
    return "general";
  }

  const domainWeights = {};
  selected.forEach((dataset) => {
    const domain = dataset.domain || "general";
    domainWeights[domain] = (domainWeights[domain] || 0) + (state.weights[dataset.id] || 0);
  });

  const sorted = Object.entries(domainWeights).sort((a, b) => b[1] - a[1]);
  return sorted[0] ? sorted[0][0] : "general";
}

function getForumDomainLabel(domain) {
  if (domain === "law") return "Legal";
  return DOMAIN_NEED_LABELS[domain] || "General";
}

function syncControlValuesFromState() {
  if (usageProfileSelectEl) usageProfileSelectEl.value = state.usageProfile;
  if (domainNeedSelectEl) domainNeedSelectEl.value = state.domainNeed;
  if (performanceNeedSelectEl) performanceNeedSelectEl.value = state.performanceNeed;
  if (groupBySelectEl) groupBySelectEl.value = state.groupBy;
  if (licenseFilterSelectEl) licenseFilterSelectEl.value = state.licenseFilter;
  if (compatibleOnlyToggleEl) compatibleOnlyToggleEl.checked = state.showCompatibleOnly;
  if (smartRecommendOnlyToggleEl) smartRecommendOnlyToggleEl.checked = state.smartRecommendOnly;
  if (connectorTargetSelectEl) connectorTargetSelectEl.value = state.connectorTarget;
  if (webhookUrlInputEl) {
    webhookUrlInputEl.value = state.webhookUrl || DEFAULT_WEBHOOK_URL;
  }
  if (finalRunScoreInputEl) finalRunScoreInputEl.value = state.finalRunScore;
  if (runNotesInputEl) runNotesInputEl.value = state.runNotes;
  if (donateRecipeToggleEl) donateRecipeToggleEl.checked = state.donateRecipe;
  renderModelPicker();
}

function buildRecipeSnapshotPayload() {
  const selected = getSelectedDatasets().map((dataset) => dataset.id);
  const weights = {};
  selected.forEach((id) => {
    weights[id] = Number(state.weights[id] || 0);
  });
  const targetModels = getSelectedTargetModels();

  return {
    mode: modeSelectEl.value,
    target_model: getPrimaryTargetModel() || "",
    target_models: targetModels,
    custom_models: uniqueModelNames(state.customModels),
    usage_profile: state.usageProfile,
    domain_need: state.domainNeed,
    performance_need: state.performanceNeed,
    group_by: state.groupBy,
    license_filter: state.licenseFilter,
    show_compatible_only: state.showCompatibleOnly,
    smart_recommend_only: state.smartRecommendOnly,
    connector_target: state.connectorTarget,
    webhook_url: state.webhookUrl,
    final_run_score: state.finalRunScore,
    run_notes: state.runNotes,
    donate_recipe: state.donateRecipe,
    selected_ids: selected,
    weights,
  };
}

function saveCurrentRecipeCombination() {
  if (!saveRecipeBtnEl || !saveRecipeNameEl) return;
  const typedName = String(saveRecipeNameEl.value || "").trim();
  const normalizedName = typedName || `Recipe ${state.savedRecipes.length + 1}`;
  const nowIso = new Date().toISOString();

  const nextRecord = {
    id: `saved_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: normalizedName,
    created_at: nowIso,
    updated_at: nowIso,
    snapshot: buildRecipeSnapshotPayload(),
  };

  const existingIndex = state.savedRecipes.findIndex(
    (item) => String(item.name || "").toLowerCase() === normalizedName.toLowerCase(),
  );

  if (existingIndex >= 0) {
    const prev = state.savedRecipes[existingIndex];
    nextRecord.id = prev.id || nextRecord.id;
    nextRecord.created_at = prev.created_at || nextRecord.created_at;
    state.savedRecipes.splice(existingIndex, 1);
  }

  state.savedRecipes.unshift(nextRecord);
  state.savedRecipes = state.savedRecipes.slice(0, MAX_SAVED_RECIPES);
  writeSavedRecipes();
  renderSavedRecipes();
  saveRecipeNameEl.value = "";
  saveRecipeBtnEl.textContent = "Saved";
  window.setTimeout(() => {
    saveRecipeBtnEl.textContent = "Save";
  }, 1100);
}

function applySavedRecipeCombination(record) {
  if (!record || !record.snapshot) return;
  const snapshot = record.snapshot;

  const usageProfile = String(snapshot.usage_profile || state.usageProfile);
  if (LICENSE_COMPATIBILITY[usageProfile]) {
    state.usageProfile = usageProfile;
  }

  const domainNeed = String(snapshot.domain_need || state.domainNeed);
  if (DOMAIN_NEED_LABELS[domainNeed]) {
    state.domainNeed = domainNeed;
  }

  const performanceNeed = String(snapshot.performance_need || state.performanceNeed);
  if (PERFORMANCE_PRIORITY_LABELS[performanceNeed]) {
    state.performanceNeed = performanceNeed;
  }

  const nextGroupBy = String(snapshot.group_by || state.groupBy);
  if (["domain", "family", "source", "license_category"].includes(nextGroupBy)) {
    state.groupBy = nextGroupBy;
  }

  const nextLicenseFilter = String(snapshot.license_filter || state.licenseFilter);
  if (
    [
      "all",
      "permissive",
      "non_commercial",
      "research_only",
      "restricted",
      "unknown",
      "internal",
    ].includes(nextLicenseFilter)
  ) {
    state.licenseFilter = nextLicenseFilter;
  }

  state.showCompatibleOnly = Boolean(snapshot.show_compatible_only);
  state.smartRecommendOnly =
    snapshot.smart_recommend_only === undefined ? true : Boolean(snapshot.smart_recommend_only);
  const connectorTarget = String(snapshot.connector_target || state.connectorTarget);
  if (["codex", "cursor", "claude", "ide_api"].includes(connectorTarget)) {
    state.connectorTarget = connectorTarget;
  }
  state.webhookUrl = String(snapshot.webhook_url || "").trim();
  state.finalRunScore = String(snapshot.final_run_score || "").trim();
  state.runNotes = String(snapshot.run_notes || "");
  state.donateRecipe = Boolean(snapshot.donate_recipe);
  state.forumPostDraft = "";

  modeSelectEl.value = snapshot.mode === "fine_tuning" ? "fine_tuning" : "post_training";
  state.targetModels = Array.isArray(snapshot.target_models)
    ? uniqueModelNames(snapshot.target_models)
    : splitModelNames(snapshot.target_model || "");
  if (!state.targetModels.length && snapshot.target_model) {
    state.targetModels = uniqueModelNames([snapshot.target_model]);
  }
  state.customModels = uniqueModelNames(snapshot.custom_models);
  syncCustomModelsWithSelection();
  state.modelSearch = "";
  setModelImportStatus("", "");

  const available = new Set(getLibraryDatasets().map((dataset) => dataset.id));
  available.add(SYNTHETIC_DATASET_ID);
  const selectedIds = Array.isArray(snapshot.selected_ids)
    ? snapshot.selected_ids.filter((id) => available.has(id))
    : [];

  if (selectedIds.length) {
    state.selected = new Set(selectedIds);
    const rawWeights = {};
    const sourceWeights = snapshot.weights && typeof snapshot.weights === "object" ? snapshot.weights : {};
    selectedIds.forEach((id) => {
      rawWeights[id] = Number(sourceWeights[id] || 0);
    });
    state.weights = roundWeights(selectedIds, rawWeights);
  } else {
    state.selected = new Set();
    state.weights = {};
  }

  syncControlValuesFromState();
  render();
}

function deleteSavedRecipeCombination(id) {
  const before = state.savedRecipes.length;
  state.savedRecipes = state.savedRecipes.filter((item) => item.id !== id);
  if (state.savedRecipes.length === before) return;
  writeSavedRecipes();
  renderSavedRecipes();
}

function renderSavedRecipes() {
  if (!savedRecipesListEl) return;
  savedRecipesListEl.innerHTML = "";

  if (!state.savedRecipes.length) {
    savedRecipesListEl.innerHTML = '<div class="empty">No saved recipes yet.</div>';
    return;
  }

  state.savedRecipes.forEach((record) => {
    const snapshot = record.snapshot || {};
    const selectedCount = Array.isArray(snapshot.selected_ids) ? snapshot.selected_ids.length : 0;
    const item = document.createElement("article");
    item.className = "saved-recipe-item";
    item.innerHTML = `
      <div class="saved-recipe-top">
        <div class="saved-recipe-name">${escapeHtml(record.name)}</div>
        <div class="saved-recipe-meta">${escapeHtml(formatSavedRecipeTime(record.updated_at || record.created_at))}</div>
      </div>
      <div class="saved-recipe-meta">
        ${escapeHtml(String(snapshot.mode || "post_training").replaceAll("_", "-"))} ·
        ${escapeHtml(String(snapshot.usage_profile || "company"))} ·
        ${formatNumber(selectedCount)} datasets
      </div>
      <div class="saved-recipe-actions">
        <button type="button" data-load-recipe="${escapeHtml(record.id)}">Load</button>
        <button type="button" class="delete" data-delete-recipe="${escapeHtml(record.id)}">Delete</button>
      </div>
    `;
    savedRecipesListEl.appendChild(item);
  });
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

function getDomainAutoMixQueryTerms(domain) {
  const fallback = String(domain || "general").trim() || "general";
  const mapped = DOMAIN_AUTO_MIX_QUERY_TERMS[fallback] || [fallback];
  return [...new Set([fallback, ...mapped])];
}

function getDomainRelevanceKeywords(domain) {
  const normalized = String(domain || "general").trim().toLowerCase() || "general";
  return DOMAIN_AUTO_MIX_QUERY_TERMS[normalized] || [normalized];
}

function isDomainRelevantHFDataset(dataset, domain) {
  if (!dataset || dataset.source !== "huggingface") return false;
  if (dataset.domain === domain) return true;

  const keywords = getDomainRelevanceKeywords(domain);
  const haystack = `${dataset.name || ""} ${dataset.repoId || ""} ${dataset.description || ""} ${
    Array.isArray(dataset.tags) ? dataset.tags.join(" ") : ""
  }`
    .toLowerCase()
    .trim();
  if (!haystack) return false;

  return keywords.some((keyword) => haystack.includes(String(keyword).toLowerCase()));
}

async function fetchHFDatasetsByQuery(query, limit = DOMAIN_AUTO_MIX_FETCH_LIMIT) {
  const params = new URLSearchParams({
    full: "true",
    limit: String(limit),
  });
  const normalizedQuery = String(query || "").trim();
  if (normalizedQuery) {
    params.set("search", normalizedQuery);
  }

  const response = await fetch(`${HF_DATASETS_API}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const payload = await response.json();
  return payload.map(toHFDataset).filter(Boolean);
}

function getRankedDomainHFEntries(domain) {
  return getLibraryDatasets()
    .filter((dataset) => isDomainRelevantHFDataset(dataset, domain))
    .map((dataset) => {
      const fit = scoreDatasetForNeeds(dataset);
      return {
        dataset,
        fit,
        popularity: (dataset.downloads || 0) + (dataset.likes || 0) * 10,
      };
    })
    .sort((a, b) => {
      if (a.fit.compatible !== b.fit.compatible) return Number(b.fit.compatible) - Number(a.fit.compatible);
      if (a.fit.fitScore !== b.fit.fitScore) return b.fit.fitScore - a.fit.fitScore;
      if (a.fit.goalScore !== b.fit.goalScore) return b.fit.goalScore - a.fit.goalScore;
      if (a.popularity !== b.popularity) return b.popularity - a.popularity;
      return a.dataset.name.localeCompare(b.dataset.name);
    });
}

async function ensureDomainHFCoverage(domain, minCount = DOMAIN_AUTO_MIX_MIN_HF_DATASETS) {
  let entries = getRankedDomainHFEntries(domain);
  if (entries.length >= minCount) return entries;

  const queryTerms = getDomainAutoMixQueryTerms(domain);
  for (const term of queryTerms) {
    try {
      const mapped = await fetchHFDatasetsByQuery(term);
      mergeRemoteDatasets(mapped);
    } catch (_) {}
    entries = getRankedDomainHFEntries(domain);
    if (entries.length >= minCount) break;
  }
  return entries;
}

async function applyDomainAutoMixFromRequests() {
  const domain = String(state.domainNeed || "").trim().toLowerCase();
  if (!domain || domain === "all") return;

  const requestId = domainAutoMixSequence + 1;
  domainAutoMixSequence = requestId;
  const domainLabel = DOMAIN_NEED_LABELS[domain] || toTitleWords(domain);
  if (allocationInsightEl) {
    allocationInsightEl.textContent = `Building ${domainLabel} mix from Hugging Face datasets...`;
  }

  const entries = await ensureDomainHFCoverage(domain, DOMAIN_AUTO_MIX_MIN_HF_DATASETS);
  if (requestId !== domainAutoMixSequence || state.domainNeed !== domain) {
    return;
  }

  if (!entries.length) {
    if (allocationInsightEl) {
      allocationInsightEl.textContent = `No Hugging Face datasets found yet for ${domainLabel}.`;
    }
    renderLibrary();
    renderLibraryStatus();
    return;
  }

  const targetCount = Math.min(entries.length, DOMAIN_AUTO_MIX_MIN_HF_DATASETS);
  const chosen = entries.slice(0, targetCount);
  const ids = chosen.map((entry) => entry.dataset.id);
  const nextWeights = {};
  chosen.forEach(({ dataset, fit }, index) => {
    const popularityBonus = clamp(Math.log10((dataset.downloads || 0) + 10) * 5, 0, 20);
    const topBoost = index === 0 ? 38 : index === 1 ? 27 : index === 2 ? 19 : index < 6 ? 10 : 0;
    const compatibilityBonus = fit.compatible ? 12 : -20;
    const qualitySignal =
      fit.fitScore * 1.15 + fit.goalScore * 0.92 + popularityBonus + compatibilityBonus;
    const rankDecay = Math.pow(0.93, index);
    nextWeights[dataset.id] = Math.max(1.2, Math.pow(Math.max(6, qualitySignal), 1.16) * rankDecay + topBoost);
  });

  state.selected = new Set(ids);
  state.weights = roundWeights(ids, nextWeights);
  render();

  if (allocationInsightEl) {
    const priorityLabel =
      PERFORMANCE_PRIORITY_LABELS[state.performanceNeed] || PERFORMANCE_PRIORITY_LABELS.balanced;
    allocationInsightEl.textContent =
      `Built ${ids.length} Hugging Face datasets for ${domainLabel}, tuned for ${state.usageProfile} + ${priorityLabel}.`;
  }
}

function getActiveDomainForSynthetic() {
  if (state.domainNeed !== "all") {
    return state.domainNeed;
  }

  const byId = new Map(getLibraryDatasets().map((dataset) => [dataset.id, dataset]));
  const chosen = [...state.selected]
    .filter((id) => id !== SYNTHETIC_DATASET_ID)
    .map((id) => byId.get(id))
    .filter(Boolean);
  if (!chosen.length) {
    return "general";
  }

  const scoreByDomain = {};
  chosen.forEach((dataset) => {
    const key = dataset.domain || "general";
    scoreByDomain[key] = (scoreByDomain[key] || 0) + (state.weights[dataset.id] || 0);
  });

  const sortedDomains = Object.entries(scoreByDomain).sort((a, b) => b[1] - a[1]);
  return sortedDomains[0] ? sortedDomains[0][0] : "general";
}

function getSyntheticDataset() {
  const domain = getActiveDomainForSynthetic();
  const domainLabel = DOMAIN_NEED_LABELS[domain] || "General";
  return {
    id: SYNTHETIC_DATASET_ID,
    repoId: `synthetic.${domain}`,
    name: `Synthetic Data (${domainLabel})`,
    domain,
    family: "synthetic",
    storage: `synthetic://generated/${domain}`,
    description:
      "Programmatically generated augmentation data for underrepresented or niche coverage.",
    color: "#6f7b89",
    source: "internal",
    license: "internal",
    downloads: 0,
    likes: 0,
  };
}

function getDatasetById(id) {
  if (id === SYNTHETIC_DATASET_ID) {
    return getSyntheticDataset();
  }
  return getLibraryDatasets().find((dataset) => dataset.id === id);
}

function getSelectedDatasets() {
  return [...state.selected].map((id) => getDatasetById(id)).filter(Boolean);
}

function getRecommendedSyntheticReservePct() {
  const domain = getActiveDomainForSynthetic();
  const isNicheDomain = ["medicine", "finance", "law", "coding", "math"].includes(domain);
  return isNicheDomain ? SYNTHETIC_NICHE_RESERVE_PCT : SYNTHETIC_BASE_RESERVE_PCT;
}

function reserveWeightForSyntheticDataset() {
  const ids = getSelectedDatasets().map((dataset) => dataset.id);
  if (!ids.includes(SYNTHETIC_DATASET_ID)) return;

  const otherIds = ids.filter((id) => id !== SYNTHETIC_DATASET_ID);
  if (!otherIds.length) {
    state.weights[SYNTHETIC_DATASET_ID] = 100;
    return;
  }

  const reserved = clamp(getRecommendedSyntheticReservePct(), 5, 60);
  const remaining = 100 - reserved;
  const totalOther = otherIds.reduce((acc, id) => acc + (state.weights[id] || 0), 0);
  const next = {};

  if (totalOther === 0) {
    const even = remaining / otherIds.length;
    otherIds.forEach((id) => {
      next[id] = even;
    });
  } else {
    otherIds.forEach((id) => {
      next[id] = ((state.weights[id] || 0) / totalOther) * remaining;
    });
  }

  next[SYNTHETIC_DATASET_ID] = reserved;
  Object.assign(state.weights, roundWeights(ids, next));
}

function toggleSyntheticDataset() {
  if (state.selected.has(SYNTHETIC_DATASET_ID)) {
    state.selected.delete(SYNTHETIC_DATASET_ID);
    redistributeBySelection(SYNTHETIC_DATASET_ID, false);
    return;
  }

  state.selected.add(SYNTHETIC_DATASET_ID);
  reserveWeightForSyntheticDataset();
}

function renderSyntheticButton() {
  if (!syntheticDataBtnEl) return;
  if (state.selected.has(SYNTHETIC_DATASET_ID)) {
    syntheticDataBtnEl.textContent = "remove synthetic";
    syntheticDataBtnEl.classList.add("active");
    return;
  }
  syntheticDataBtnEl.textContent = `add synthetic (${formatPercent(getRecommendedSyntheticReservePct())})`;
  syntheticDataBtnEl.classList.remove("active");
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

  let sumUnits = 0;
  parts.forEach((part) => {
    const flooredUnits = Math.floor(part.raw * WEIGHT_SCALE);
    rounded[part.id] = flooredUnits;
    sumUnits += flooredUnits;
  });

  const targetUnits = 100 * WEIGHT_SCALE;
  let remaining = targetUnits - sumUnits;
  parts
    .sort(
      (a, b) =>
        b.raw * WEIGHT_SCALE - Math.floor(b.raw * WEIGHT_SCALE) - (a.raw * WEIGHT_SCALE - Math.floor(a.raw * WEIGHT_SCALE)),
    )
    .forEach((part) => {
      if (remaining > 0) {
        rounded[part.id] += 1;
        remaining -= 1;
      }
    });

  ids.forEach((id) => {
    rounded[id] = (rounded[id] || 0) / WEIGHT_SCALE;
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
      summary: "Select datasets to see score.",
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

  let summary = `Score ${overallScore}/100 for ${modeSelectEl.value.replace("_", "-")} (${state.usageProfile}).`;
  if (incompatibleCount > 0) {
    summary += " License risk.";
  } else if (overallScore >= 78) {
    summary += " Strong mix.";
  } else if (overallScore >= 68) {
    summary += " Solid mix.";
  } else {
    summary += " High-risk mix.";
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

function inferGradeBand(score, grade) {
  const raw = String(grade || "").trim();
  const normalizedBand = raw.toLowerCase();
  if (["strong", "moderate", "risk"].includes(normalizedBand)) {
    return normalizedBand;
  }
  const normalizedGrade = raw.toUpperCase();
  if (normalizedGrade === "A") return "strong";
  if (normalizedGrade === "B") return "moderate";
  if (normalizedGrade === "C" || normalizedGrade === "D" || normalizedGrade === "F") return "risk";
  if (score >= 78) return "strong";
  if (score >= 68) return "moderate";
  return "risk";
}

function buildPredictionRequestPayload() {
  const selectedDatasets = getSelectedDatasets().map((dataset) => ({
    dataset_id: dataset.id,
    name: dataset.name,
    domain: dataset.domain,
    family: normalizeFamilyKey(dataset.family),
    source: dataset.source,
    license: dataset.license || "unknown",
    compatible_with_profile: isDatasetCompatible(dataset, state.usageProfile),
    weight_pct: Number(state.weights[dataset.id] || 0),
    description: trimDescription(dataset.description || "", 240),
  }));
  const targetModels = getSelectedTargetModels();

  return {
    model: modeSelectEl.value,
    target_model: getPrimaryTargetModel() || "(unset)",
    target_models: targetModels,
    target_model_count: targetModels.length,
    user_profile: state.usageProfile,
    user_task_domain: state.domainNeed,
    user_goal_priority: state.performanceNeed,
    selected_dataset_count: selectedDatasets.length,
    selected_datasets: selectedDatasets,
  };
}

function normalizePredictedPerformance(rawPrediction, fallbackPrediction) {
  const fallback = fallbackPrediction || computePredictedPerformance();
  if (!rawPrediction || typeof rawPrediction !== "object") return fallback;

  const overallScore = clamp(Math.round(Number(rawPrediction.overallScore)), 0, 100);
  const score = Number.isFinite(overallScore) ? overallScore : fallback.overallScore;
  const grade = String(rawPrediction.grade || "").trim() || fallback.grade;
  const gradeBand = inferGradeBand(score, rawPrediction.gradeBand || grade);

  const summaryRaw = String(rawPrediction.summary || "").trim();
  const summary = summaryRaw || fallback.summary;

  const axesInput = Array.isArray(rawPrediction.axes) ? rawPrediction.axes : [];
  const axisById = {};
  axesInput.forEach((axis) => {
    if (!axis || typeof axis !== "object") return;
    const axisId = String(axis.id || axis.axis || "").trim();
    if (!axisId) return;
    axisById[axisId] = axis;
  });

  const axes = PERFORMANCE_AXES.map((axis) => {
    const axisRaw = axisById[axis.id] || {};
    const scoreRaw = Number(axisRaw.score);
    const safeScore = Number.isFinite(scoreRaw)
      ? clamp(Math.round(scoreRaw), 0, 100)
      : (fallback.axes.find((item) => item.id === axis.id) || { score: 0 }).score;
    return {
      id: axis.id,
      label: axis.label,
      score: safeScore,
    };
  });

  const notesInput = rawPrediction.notes && typeof rawPrediction.notes === "object" ? rawPrediction.notes : {};
  const positive = Array.isArray(notesInput.positive)
    ? notesInput.positive
    : Array.isArray(rawPrediction.strengths)
      ? rawPrediction.strengths
      : [];
  const risks = Array.isArray(notesInput.risks)
    ? notesInput.risks
    : Array.isArray(rawPrediction.risks)
      ? rawPrediction.risks
      : [];

  return {
    overallScore: score,
    grade,
    gradeBand,
    summary,
    axes,
    notes: {
      positive: positive.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 4),
      risks: risks.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 4),
    },
  };
}

function buildLocalRecipeIntel() {
  const selected = getSelectedDatasets();
  if (!selected.length) {
    return {
      recommendedSummary: "Select datasets to get a default recommendation.",
      datasetValueById: {},
      recommendedWeights: [],
      source: "local",
    };
  }

  const rawWeights = {};
  const datasetValueById = {};
  const reasonsById = {};
  selected.forEach((dataset) => {
    const fit = scoreDatasetForNeeds(dataset);
    const compatibilityText = fit.compatible ? "license-compatible" : "license-risk";
    const domainText = state.domainNeed !== "all" && dataset.domain === state.domainNeed ? "domain match" : dataset.domain;
    datasetValueById[dataset.id] =
      `${dataset.name} strengthens ${PERFORMANCE_PRIORITY_LABELS[state.performanceNeed] || "balanced quality"} ` +
      `with goal score ${fit.goalScore}/100, ${compatibilityText}, ${domainText}.`;
    reasonsById[dataset.id] =
      `${dataset.name} recommended based on fit score ${fit.fitScore} for ${state.usageProfile}.`;

    const baseScore = Math.max(6, fit.fitScore * 0.9 + fit.goalScore * 0.6 + (fit.compatible ? 12 : 0));
    rawWeights[dataset.id] = baseScore;
  });

  const ids = selected.map((dataset) => dataset.id);
  const rounded = roundWeights(ids, rawWeights);
  const recommendedWeights = ids.map((datasetId) => ({
    dataset_id: datasetId,
    weight_pct: Number(rounded[datasetId] || 0),
    reason: reasonsById[datasetId],
  }));

  return {
    recommendedSummary:
      `Default recommendation optimized for ${state.usageProfile} + ` +
      `${PERFORMANCE_PRIORITY_LABELS[state.performanceNeed] || "balanced quality"}.`,
    datasetValueById,
    recommendedWeights,
    source: "local",
  };
}

function normalizeRecipeIntel(rawPrediction) {
  const fallback = buildLocalRecipeIntel();
  if (!rawPrediction || typeof rawPrediction !== "object") {
    return fallback;
  }

  const selected = getSelectedDatasets();
  const selectedIds = selected.map((dataset) => dataset.id);
  const selectedSet = new Set(selectedIds);
  if (!selectedIds.length) return fallback;

  const datasetInsightsRaw = Array.isArray(rawPrediction.datasetInsights)
    ? rawPrediction.datasetInsights
    : Array.isArray(rawPrediction.dataset_insights)
      ? rawPrediction.dataset_insights
      : [];
  const recommendedWeightsRaw = Array.isArray(rawPrediction.recommendedWeights)
    ? rawPrediction.recommendedWeights
    : Array.isArray(rawPrediction.recommended_weights)
      ? rawPrediction.recommended_weights
      : [];

  const datasetValueById = { ...fallback.datasetValueById };
  datasetInsightsRaw.forEach((item) => {
    if (!item || typeof item !== "object") return;
    const datasetId = String(item.dataset_id || item.datasetId || "").trim();
    const valueAdd = String(item.value_add || item.valueAdd || item.reason || "").trim();
    if (!datasetId || !selectedSet.has(datasetId) || !valueAdd) return;
    datasetValueById[datasetId] = valueAdd;
  });

  const rawRecommendationWeights = {};
  const recommendationReasonById = {};
  recommendedWeightsRaw.forEach((item) => {
    if (!item || typeof item !== "object") return;
    const datasetId = String(item.dataset_id || item.datasetId || "").trim();
    if (!datasetId || !selectedSet.has(datasetId)) return;
    const weight = Number(item.weight_pct ?? item.weightPct ?? item.weight ?? 0);
    if (!Number.isFinite(weight) || weight <= 0) return;
    rawRecommendationWeights[datasetId] = weight;
    const reason = String(item.reason || item.value_add || "").trim();
    if (reason) recommendationReasonById[datasetId] = reason;
  });

  const hasModelRecommendation = Object.keys(rawRecommendationWeights).length > 0;
  const roundedRecommendation = hasModelRecommendation
    ? roundWeights(selectedIds, rawRecommendationWeights)
    : Object.fromEntries(fallback.recommendedWeights.map((item) => [item.dataset_id, item.weight_pct]));

  const recommendedWeights = selectedIds.map((datasetId) => ({
    dataset_id: datasetId,
    weight_pct: Number(roundedRecommendation[datasetId] || 0),
    reason: recommendationReasonById[datasetId] || fallback.recommendedWeights.find((item) => item.dataset_id === datasetId)?.reason || "",
  }));

  const summaryRaw = String(rawPrediction.recommendedSummary || rawPrediction.recommended_summary || "").trim();

  return {
    recommendedSummary: summaryRaw || fallback.recommendedSummary,
    datasetValueById,
    recommendedWeights,
    source: hasModelRecommendation || datasetInsightsRaw.length ? PERFORMANCE_MODEL_LABEL : "local",
  };
}

function getCurrentRecipeIntel() {
  const key = getPerformancePredictionKey();
  if (resolvedRecipeIntel && resolvedRecipeIntelKey === key) {
    return resolvedRecipeIntel;
  }
  return buildLocalRecipeIntel();
}

function renderDefaultAllocationInsight() {
  if (!allocationInsightEl) return;
  const selected = getSelectedDatasets();
  if (!selected.length) {
    allocationInsightEl.textContent = "Select datasets to see value-add insights and a default recommendation.";
    return;
  }
  const intel = getCurrentRecipeIntel();
  const prefix = intel.source === PERFORMANCE_MODEL_LABEL ? "DataRecipe recommendation" : "Recommendation";
  allocationInsightEl.textContent =
    `${prefix}: ${intel.recommendedSummary || "Hover a dataset slice to inspect its value-add."}`;
}

function renderDatasetAllocationInsight(dataset) {
  if (!allocationInsightEl || !dataset) return;
  const intel = getCurrentRecipeIntel();
  const note = intel.datasetValueById[dataset.id];
  if (note) {
    allocationInsightEl.textContent = note;
    return;
  }
  const fit = scoreDatasetForNeeds(dataset);
  allocationInsightEl.textContent =
    `${dataset.name} contributes to ${PERFORMANCE_PRIORITY_LABELS[state.performanceNeed] || "balanced quality"} ` +
    `with fit score ${fit.fitScore} and goal score ${fit.goalScore}.`;
}

async function applyRecommendedDefaultAllocation() {
  const selected = getSelectedDatasets();
  if (!selected.length) return;

  const predictionKey = getPerformancePredictionKey();
  if (!resolvedPerformancePrediction || resolvedPerformancePredictionKey !== predictionKey) {
    if (performanceRenderTimer) {
      clearTimeout(performanceRenderTimer);
      performanceRenderTimer = null;
    }
    pendingPerformancePredictionKey = predictionKey;
    renderPerformanceLoadingState();
    await requestPerformancePredictionFromModel(predictionKey);
  }

  const intel = getCurrentRecipeIntel();
  const ids = selected.map((dataset) => dataset.id);
  const raw = {};
  (intel.recommendedWeights || []).forEach((item) => {
    const datasetId = String(item.dataset_id || "").trim();
    const weight = Number(item.weight_pct || 0);
    if (!ids.includes(datasetId) || !Number.isFinite(weight) || weight <= 0) return;
    raw[datasetId] = weight;
  });

  if (!Object.keys(raw).length) {
    const fallbackIntel = buildLocalRecipeIntel();
    fallbackIntel.recommendedWeights.forEach((item) => {
      raw[item.dataset_id] = item.weight_pct;
    });
  }

  Object.assign(state.weights, roundWeights(ids, raw));
  render();
}

function getPerformancePredictionKey() {
  const selectedSignature = getSelectedDatasets()
    .map((dataset) => `${dataset.id}:${Number(state.weights[dataset.id] || 0).toFixed(2)}`)
    .sort()
    .join("|");
  const targetModelSignature = getSelectedTargetModels().join("|");

  return `${modeSelectEl.value}|${state.usageProfile}|${targetModelSignature}|${selectedSignature}`;
}

function renderPerformanceNotesBuckets(positiveNotes = [], riskNotes = [], pendingText = "") {
  const positives = Array.isArray(positiveNotes) ? positiveNotes.filter(Boolean) : [];
  const risks = Array.isArray(riskNotes) ? riskNotes.filter(Boolean) : [];
  const pending = String(pendingText || "").trim();

  const buildBucket = (title, tone, notes, emptyText) => {
    const notesHtml = notes.length
      ? notes
          .map(
            (note) =>
              `<span class="performance-note-chip ${tone}">${escapeHtml(String(note || "").trim())}</span>`,
          )
          .join("")
      : `<span class="performance-bucket-empty">${escapeHtml(emptyText)}</span>`;

    return `
      <section class="performance-bucket ${tone}">
        <div class="performance-bucket-head">${escapeHtml(title)}</div>
        <div class="performance-bucket-list">${notesHtml}</div>
      </section>
    `;
  };

  const pendingHtml = pending
    ? `<div class="performance-pending-line"><span class="performance-note-chip pending">${escapeHtml(pending)}</span></div>`
    : "";

  performanceNotesEl.innerHTML = `
    ${pendingHtml}
    ${buildBucket("Pros", "pos", positives, "No strong signals yet.")}
    ${buildBucket("Cons", "neg", risks, "No major risks detected yet.")}
  `;
}

function setPerformanceGradeHelpText(currentGrade = "", loading = false) {
  const lines = [
    loading ? "DataRecipe is actively predicting projected performance." : "Projection grade guide.",
    PERFORMANCE_GRADE_HELP.A,
    PERFORMANCE_GRADE_HELP.B,
    PERFORMANCE_GRADE_HELP.C,
  ];
  if (currentGrade) {
    lines.unshift(`Current grade: ${currentGrade}`);
  }
  const tooltip = lines.join(" ");
  performanceGradeEl.dataset.tooltip = tooltip;
  performanceGradeEl.title = tooltip;
}

function renderPerformanceLoadingState() {
  performancePanelEl.classList.add("loading");
  performanceGradeEl.textContent = "...";
  setPerformanceGradeHelpText("", true);
  performanceGradeEl.setAttribute(
    "aria-label",
    "Projected performance is currently being calculated by DataRecipe.",
  );
  performanceGradeEl.classList.remove("strong", "moderate", "risk");
  performanceSummaryEl.textContent =
    "DataRecipe is actively predicting projected performance. Results appear in about 5 seconds.";

  performanceAxesEl.innerHTML = "";
  PERFORMANCE_AXES.forEach((axis) => {
    const row = document.createElement("div");
    row.className = "axis-row loading";
    row.innerHTML = `
      <div class="axis-label">
        <span class="axis-logo" aria-hidden="true">${escapeHtml(axis.logo || "AX")}</span>
        <span>${escapeHtml(axis.label)}</span>
      </div>
      <div class="axis-track"><div class="axis-fill"></div></div>
      <div class="axis-value">--.-%</div>
    `;
    performanceAxesEl.appendChild(row);
  });

  renderPerformanceNotesBuckets([], [], "DataRecipe is actively predicting projection signals");
}

function renderPerformanceResult(prediction) {
  performancePanelEl.classList.remove("loading");
  performanceGradeEl.textContent = prediction.grade;
  performanceGradeEl.classList.remove("strong", "moderate", "risk");
  performanceGradeEl.classList.add(prediction.gradeBand);
  const gradeMeaning =
    prediction.gradeBand === "strong"
      ? "Strong projected performance."
      : prediction.gradeBand === "moderate"
        ? "Moderate projected performance."
        : "Higher-risk projection. This recipe likely needs rebalancing.";
  setPerformanceGradeHelpText(prediction.grade, false);
  performanceGradeEl.setAttribute("aria-label", `Projection grade ${prediction.grade}. ${gradeMeaning}`);
  performanceSummaryEl.textContent = prediction.summary;

  performanceAxesEl.innerHTML = "";
  prediction.axes.forEach((axis) => {
    const axisMeta = PERFORMANCE_AXES.find((item) => item.id === axis.id);
    const axisLogo = axisMeta ? axisMeta.logo : "AX";
    const axisLabel = axisMeta ? axisMeta.label : axis.label;
    const row = document.createElement("div");
    row.className = "axis-row";
    row.innerHTML = `
      <div class="axis-label">
        <span class="axis-logo" aria-hidden="true">${escapeHtml(axisLogo)}</span>
        <span>${escapeHtml(axisLabel)}</span>
      </div>
      <div class="axis-track"><div class="axis-fill" style="width:${formatPercent(axis.score)};"></div></div>
      <div class="axis-value">${formatPercent(axis.score)}</div>
    `;
    performanceAxesEl.appendChild(row);
  });

  renderPerformanceNotesBuckets(prediction.notes.positive, prediction.notes.risks);
}

async function requestPerformancePredictionFromModel(predictionKey) {
  const requestId = performanceRequestSequence + 1;
  performanceRequestSequence = requestId;
  const fallbackPrediction = computePredictedPerformance();
  const payload = buildPredictionRequestPayload();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), PERFORMANCE_PREDICTION_TIMEOUT_MS);

  try {
    const response = await fetch(performancePredictionProxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const body = await response.json();
    const rawPrediction =
      body && body.prediction && typeof body.prediction === "object" ? body.prediction : body;
    const normalizedPrediction = normalizePredictedPerformance(rawPrediction, fallbackPrediction);
    const normalizedIntel = normalizeRecipeIntel(rawPrediction);

    if (requestId !== performanceRequestSequence || pendingPerformancePredictionKey !== predictionKey) {
      return;
    }

    resolvedPerformancePrediction = normalizedPrediction;
    resolvedPerformancePredictionKey = predictionKey;
    resolvedRecipeIntel = normalizedIntel;
    resolvedRecipeIntelKey = predictionKey;
    pendingPerformancePredictionKey = "";
    renderPerformanceResult(resolvedPerformancePrediction);
  } catch (_) {
    if (requestId !== performanceRequestSequence || pendingPerformancePredictionKey !== predictionKey) {
      return;
    }

    const fallback = computePredictedPerformance();
    fallback.summary = `${fallback.summary} DataRecipe predictor unavailable; using local estimate.`;
    fallback.notes.risks = [...fallback.notes.risks, "DataRecipe predictor unavailable; fallback estimate applied."]
      .slice(0, 4);

    resolvedPerformancePrediction = fallback;
    resolvedPerformancePredictionKey = predictionKey;
    resolvedRecipeIntel = buildLocalRecipeIntel();
    resolvedRecipeIntelKey = predictionKey;
    pendingPerformancePredictionKey = "";
    renderPerformanceResult(resolvedPerformancePrediction);
  } finally {
    window.clearTimeout(timeout);
    if (requestId === performanceRequestSequence) {
      renderDefaultAllocationInsight();
      renderOutput();
      renderConnectorHub();
      state.forumPostDraft = "";
      renderForumDonation();
    }
  }
}

function getCurrentPredictionForRecipe() {
  const predictionKey = getPerformancePredictionKey();
  if (resolvedPerformancePrediction && resolvedPerformancePredictionKey === predictionKey) {
    return resolvedPerformancePrediction;
  }
  return computePredictedPerformance();
}

function renderPerformancePanel() {
  if (!performancePanelEl || !performanceGradeEl || !performanceSummaryEl || !performanceAxesEl || !performanceNotesEl) {
    return;
  }

  if (!getSelectedDatasets().length) {
    const emptyPrediction = computePredictedPerformance();
    resolvedPerformancePrediction = emptyPrediction;
    resolvedPerformancePredictionKey = getPerformancePredictionKey();
    resolvedRecipeIntel = buildLocalRecipeIntel();
    resolvedRecipeIntelKey = getPerformancePredictionKey();
    pendingPerformancePredictionKey = "";
    if (performanceRenderTimer) {
      clearTimeout(performanceRenderTimer);
      performanceRenderTimer = null;
    }
    renderPerformanceResult(emptyPrediction);
    return;
  }

  const predictionKey = getPerformancePredictionKey();
  if (resolvedPerformancePrediction && resolvedPerformancePredictionKey === predictionKey) {
    renderPerformanceResult(resolvedPerformancePrediction);
    return;
  }

  if (pendingPerformancePredictionKey === predictionKey) {
    renderPerformanceLoadingState();
    return;
  }

  pendingPerformancePredictionKey = predictionKey;
  resolvedPerformancePrediction = null;
  resolvedPerformancePredictionKey = "";
  resolvedRecipeIntel = null;
  resolvedRecipeIntelKey = "";
  if (performanceRenderTimer) {
    clearTimeout(performanceRenderTimer);
  }

  renderPerformanceLoadingState();
  performanceRenderTimer = setTimeout(() => {
    performanceRenderTimer = null;
    if (pendingPerformancePredictionKey !== predictionKey) return;
    requestPerformancePredictionFromModel(predictionKey);
  }, PERFORMANCE_PREDICTION_DELAY_MS);
}

function buildRecipe() {
  const prediction = getCurrentPredictionForRecipe();
  const targetModels = getSelectedTargetModels();
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
    target_model: targetModels[0] || "(unset)",
    target_models: targetModels,
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

function getRecipeJsonString() {
  return JSON.stringify(buildRecipe(), null, 2);
}

function getResolvedWebhookUrl() {
  const raw = String(state.webhookUrl || "").trim();
  return raw || DEFAULT_WEBHOOK_URL;
}

function flashButtonLabel(buttonEl, activeText, idleText, durationMs = 1100) {
  if (!buttonEl) return;
  buttonEl.textContent = activeText;
  window.setTimeout(() => {
    buttonEl.textContent = idleText;
  }, durationMs);
}

function downloadTextAsFile(filename, content, mimeType = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getConnectorSnippet(target) {
  const recipeJson = getRecipeJsonString();
  const webhookUrl = getResolvedWebhookUrl();

  if (target === "cursor") {
    return `# Cursor task command
cat > datarecipe.pipeline.json <<'JSON'
${recipeJson}
JSON

curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  --data-binary @datarecipe.pipeline.json`;
  }

  if (target === "claude") {
    return `# Claude handoff prompt
Use the following DataRecipe pipeline JSON as the authoritative training mix.
Execute training with this payload and return run metrics.

\`\`\`json
${recipeJson}
\`\`\``;
  }

  if (target === "ide_api") {
    return `# IDE/API webhook push
curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  --data '${recipeJson.replaceAll("'", "'\\''")}'`;
  }

  return `# Codex command flow
cat > datarecipe.pipeline.json <<'JSON'
${recipeJson}
JSON

curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  --data-binary @datarecipe.pipeline.json`;
}

function buildConnectorBundle() {
  const recipeJson = getRecipeJsonString();
  const codexSnippet = getConnectorSnippet("codex");
  const cursorSnippet = getConnectorSnippet("cursor");
  const claudeSnippet = getConnectorSnippet("claude");
  const apiSnippet = getConnectorSnippet("ide_api");

  return `# DataRecipe Connector Bundle

## recipe.json
\`\`\`json
${recipeJson}
\`\`\`

## Codex
\`\`\`bash
${codexSnippet}
\`\`\`

## Cursor
\`\`\`bash
${cursorSnippet}
\`\`\`

## Claude
\`\`\`text
${claudeSnippet}
\`\`\`

## IDE/API Webhook
\`\`\`bash
${apiSnippet}
\`\`\`
`;
}

function buildForumDonationDraft() {
  if (!state.donateRecipe) {
    return "Enable consent, then click Prepare Post.";
  }

  const recipe = buildRecipe();
  const selectedRows = recipe.datasets
    .map((dataset) => `- ${dataset.dataset_id}: ${formatPercent(dataset.weight_pct)} (${dataset.license})`)
    .join("\n");
  const finalScoreText = String(state.finalRunScore || "").trim();
  const notesText = String(state.runNotes || "").trim() || "(No extra notes provided)";

  return `# DataRecipe Donation Post

## Run Context
- Mode: ${recipe.mode}
- Training profile: ${recipe.training_profile}
- Target models: ${recipe.target_models && recipe.target_models.length ? recipe.target_models.join(", ") : recipe.target_model}
- Predicted score: ${recipe.predicted_performance.overall_score}/100 (${recipe.predicted_performance.grade})
- Final run score: ${finalScoreText || "Not reported"}

## Dataset Mix
${selectedRows || "- No datasets selected"}

## Notes
${notesText}

## Payload
\`\`\`json
${JSON.stringify(recipe, null, 2)}
\`\`\``;
}

function prepareForumDonationPost() {
  state.forumPostDraft = buildForumDonationDraft();
  renderForumDonation();
}

function buildForumPostRecord() {
  const recipe = buildRecipe();
  const domain = getDominantSelectedDomain();
  const domainLabel = getForumDomainLabel(domain);
  const finalScoreText = String(state.finalRunScore || "").trim();
  const notesText = String(state.runNotes || "").trim() || "(No extra notes provided)";

  return {
    id: `forum_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: `${domainLabel} recipe - ${recipe.target_model || "(unset)"}`,
    domain: domain === "law" ? "legal" : domain,
    mode: recipe.mode,
    training_profile: recipe.training_profile,
    target_model: recipe.target_model || "(unset)",
    target_models: Array.isArray(recipe.target_models) ? recipe.target_models : [],
    predicted_score: recipe.predicted_performance.overall_score,
    final_score: finalScoreText,
    notes: notesText,
    datasets: recipe.datasets,
    payload: recipe,
    created_at: new Date().toISOString(),
    source: "user",
  };
}

function publishForumPost() {
  if (!state.donateRecipe) return false;
  const posts = readForumPosts();
  const record = buildForumPostRecord();
  posts.unshift(record);
  writeForumPosts(posts.slice(0, 120));
  return true;
}

function renderConnectorHub() {
  const snippet = getConnectorSnippet(state.connectorTarget);
  if (connectorSnippetOutputEl) {
    connectorSnippetOutputEl.textContent = snippet;
  }
  if (connectorSnippetSummaryEl) {
    const firstLine = String(snippet || "").split("\n")[0].trim();
    connectorSnippetSummaryEl.textContent = firstLine || "# Connector snippet";
  }
  if (connectorSnippetDisclosureEl && !connectorSnippetDisclosureEl.open) {
    connectorSnippetDisclosureEl.setAttribute("aria-label", "Expand connector snippet");
  }
}

function renderForumDonation() {
  if (!forumDonationOutputEl) return;
  if (state.forumPostDraft) {
    forumDonationOutputEl.textContent = state.forumPostDraft;
    return;
  }
  forumDonationOutputEl.textContent =
    "Add score and notes, enable consent, then click Prepare Post.";
}

function renderAllocationLegend() {
  if (!allocationLegendEl) return;
  const selected = getSelectedDatasets();
  allocationLegendEl.innerHTML = "";

  if (!selected.length) {
    allocationLegendEl.innerHTML = '<div class="model-empty">No dataset allocations yet.</div>';
    return;
  }

  selected
    .slice()
    .sort((a, b) => (state.weights[b.id] || 0) - (state.weights[a.id] || 0))
    .forEach((dataset) => {
      const pct = state.weights[dataset.id] || 0;
      const item = document.createElement("button");
      item.type = "button";
      item.className = "allocation-legend-item";
      item.innerHTML = `
        <span class="allocation-legend-dot" style="background:${escapeHtml(dataset.color)};"></span>
        <span class="allocation-legend-name">${escapeHtml(dataset.name)}</span>
        <span class="allocation-legend-pct">${formatPercent(pct)}</span>
      `;
      item.addEventListener("mouseenter", () => {
        renderDatasetAllocationInsight(dataset);
      });
      item.addEventListener("focus", () => {
        renderDatasetAllocationInsight(dataset);
      });
      item.addEventListener("mouseleave", () => {
        renderDefaultAllocationInsight();
      });
      item.addEventListener("blur", () => {
        renderDefaultAllocationInsight();
      });
      allocationLegendEl.appendChild(item);
    });
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
    empty.textContent = "Select datasets";
    barEl.appendChild(empty);
    renderAllocationLegend();
    renderDefaultAllocationInsight();
    return;
  }

  let runningLeft = 0;
  selected.forEach((dataset, idx) => {
    const pct = state.weights[dataset.id] || 0;
    const segment = document.createElement("button");
    segment.className = "segment";
    if (pct < 8) {
      segment.classList.add("narrow");
    }
    segment.type = "button";
    segment.style.width = formatPercent(pct);
    segment.style.background = dataset.color;
    segment.setAttribute("aria-label", `${dataset.name} ${formatPercent(pct)}`);
    segment.title = `${dataset.name} ${formatPercent(pct)}`;
    segment.innerHTML = `<span class="segment-pct">${pct >= 5 ? formatPercent(pct) : ""}</span>`;
    segment.addEventListener("mouseenter", () => {
      renderDatasetAllocationInsight(dataset);
    });
    segment.addEventListener("focus", () => {
      renderDatasetAllocationInsight(dataset);
    });
    segment.addEventListener("mouseleave", () => {
      renderDefaultAllocationInsight();
    });
    segment.addEventListener("blur", () => {
      renderDefaultAllocationInsight();
    });
    barEl.appendChild(segment);

    runningLeft += pct;
    if (idx < selected.length - 1) {
      const handle = document.createElement("button");
      handle.className = "handle";
      handle.type = "button";
      handle.style.left = formatPercent(runningLeft);
      handle.setAttribute("aria-label", `Adjust ${dataset.name} boundary`);
      handle.dataset.index = String(idx);
      handle.addEventListener("mousedown", startDrag);
      barEl.appendChild(handle);
    }
  });
  renderAllocationLegend();
  renderDefaultAllocationInsight();
}

function renderActiveList() {
  const selected = getSelectedDatasets();
  activeListEl.innerHTML = "";

  if (!selected.length) {
    activeListEl.innerHTML = '<div class="empty">No datasets selected.</div>';
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
        <span>${formatPercent(pct)}</span>
      </div>
      <div class="active-meta">
        <span>License: ${escapeHtml(dataset.license || "unknown")}</span>
        <span class="compat-tag ${compatible ? "ok" : "blocked"}">${escapeHtml(getCompatibilityMessage(dataset, state.usageProfile))}</span>
      </div>
      <div class="weight-row">
        <input type="range" min="0" max="100" step="0.1" value="${Number(pct).toFixed(1)}" data-weight="${dataset.id}" />
        <input type="number" min="0" max="100" step="0.1" value="${Number(pct).toFixed(1)}" data-weight-number="${dataset.id}" />
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
    libraryStatusEl.textContent = "Syncing datasets...";
    return;
  }

  if (state.libraryError) {
    libraryStatusEl.classList.add("error");
    libraryStatusEl.textContent = state.libraryError;
    return;
  }

  const domainNeedLabel = DOMAIN_NEED_LABELS[state.domainNeed] || DOMAIN_NEED_LABELS.all;
  const performanceLabel =
    PERFORMANCE_PRIORITY_LABELS[state.performanceNeed] || PERFORMANCE_PRIORITY_LABELS.balanced;
  const rankedEntries = getRankedLibraryEntries();
  const querySuffix = state.search.trim().length >= 2 ? ` • Search: "${state.search.trim()}"` : "";
  libraryStatusEl.textContent =
    `${formatNumber(rankedEntries.length)} shown • ` +
    `${formatNumber(state.remoteDatasets.length)} HF + ${formatNumber(BASE_DATASETS.length)} internal • ` +
    `${state.usageProfile} / ${domainNeedLabel} / ${performanceLabel} • ` +
    `${state.smartRecommendOnly ? "recommended only" : "all eligible"}${querySuffix}`;
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

function toTitleWords(value) {
  return String(value || "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeCategoryLabel(value) {
  const normalized = String(value || "unknown")
    .toLowerCase()
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .trim();
  if (!normalized) return "Unknown";
  return toTitleWords(normalized);
}

function getFitBand(score) {
  if (score >= 72) return "strong";
  if (score >= 55) return "moderate";
  return "weak";
}

function getActiveProfileRankingStrategy() {
  return calibratedProfileRankingStrategy[state.usageProfile] || DEFAULT_PROFILE_RANKING_STRATEGY;
}

function scoreDatasetForNeeds(dataset) {
  const strategy = getActiveProfileRankingStrategy();
  const compatible = isDatasetCompatible(dataset, state.usageProfile);
  const axisScores = { ...BASE_AXIS_SCORES };
  const domainSignal = DOMAIN_SIGNAL[dataset.domain] || DOMAIN_SIGNAL.general;
  const familySignal = FAMILY_SIGNAL[normalizeFamilyKey(dataset.family)] || FAMILY_SIGNAL.general;
  const sourceSignal = SOURCE_SIGNAL[dataset.source] || {};
  const licenseCategory = getLicenseCategory(dataset.license);

  addAxisSignal(axisScores, domainSignal, 1.1);
  addAxisSignal(axisScores, familySignal, 0.95);
  addAxisSignal(axisScores, sourceSignal, 0.75);

  if (licenseCategory === "unknown") {
    axisScores.safety_compliance -= 5;
    axisScores.robustness -= 3;
  } else if (licenseCategory === "restricted") {
    axisScores.safety_compliance -= 7;
    axisScores.robustness -= 3;
  }
  if (!compatible) {
    axisScores.safety_compliance -= 20;
    axisScores.robustness -= 9;
    axisScores.instruction_following -= 4;
  }

  const normalizedAxes = {};
  PERFORMANCE_AXES.forEach((axis) => {
    normalizedAxes[axis.id] = clamp(Math.round(axisScores[axis.id] || 0), 0, 100);
  });

  const baseAxisWeights =
    strategy.baseAxisWeights || PERFORMANCE_PRIORITY_AXES.balanced;
  const priorityBoostWeights =
    PERFORMANCE_PRIORITY_AXES[state.performanceNeed] || PERFORMANCE_PRIORITY_AXES.balanced;
  let weightedScore = 0;
  let totalWeight = 0;
  PERFORMANCE_AXES.forEach((axis) => {
    const baseWeight = baseAxisWeights[axis.id] || 0;
    const priorityWeight = priorityBoostWeights[axis.id] || 0;
    const combinedWeight = baseWeight * priorityWeight;
    weightedScore += (normalizedAxes[axis.id] || 0) * combinedWeight;
    totalWeight += combinedWeight;
  });
  const goalScore = totalWeight ? weightedScore / totalWeight : 0;

  const downloads = Number(dataset.downloads) || 0;
  const likes = Number(dataset.likes) || 0;
  const popularityScore = clamp(
    Math.log10(downloads + 10) * 23 + Math.log10(likes + 5) * 14,
    0,
    100,
  );

  const sourceBoost = (strategy.sourceBoosts && strategy.sourceBoosts[dataset.source]) || 0;
  const licensePenalty =
    (strategy.licensePenaltyByCategory && strategy.licensePenaltyByCategory[licenseCategory]) || 0;
  const domainBoost =
    state.domainNeed === "all"
      ? 0
      : dataset.domain === state.domainNeed
        ? strategy.domainMatchBoost
        : -strategy.domainMismatchPenalty;
  const compatibilityBoost = compatible ? strategy.compatibleBoost : -strategy.incompatiblePenalty;
  const selectedBoost = state.selected.has(dataset.id) ? strategy.selectedBoost : 0;

  const goalWeight =
    Number.isFinite(strategy.goalWeight) ? strategy.goalWeight : 0.7;
  const popularityWeight =
    Number.isFinite(strategy.popularityWeight) ? strategy.popularityWeight : 0.2;

  const fitScore = clamp(
    Math.round(
      goalScore * goalWeight +
        popularityScore * popularityWeight +
        domainBoost +
        compatibilityBoost +
        selectedBoost +
        sourceBoost -
        licensePenalty,
    ),
    0,
    100,
  );

  return {
    strategyLabel: strategy.label,
    strategy,
    compatible,
    licenseCategory,
    goalScore: Math.round(goalScore),
    fitScore,
    fitBand: getFitBand(fitScore),
  };
}

function getGroupKey(dataset, fit) {
  if (state.groupBy === "family") {
    return normalizeCategoryLabel(dataset.family || "general");
  }
  if (state.groupBy === "source") {
    return dataset.source === "huggingface" ? "Hugging Face" : "Internal";
  }
  if (state.groupBy === "license_category") {
    return getLicenseCategoryLabel(fit.licenseCategory);
  }
  return normalizeCategoryLabel(dataset.domain || "general");
}

function getRankedLibraryEntries() {
  const keyword = state.search.trim().toLowerCase();
  const strategy = getActiveProfileRankingStrategy();

  return getLibraryDatasets()
    .filter((dataset) => matchesSearch(dataset, keyword))
    .filter((dataset) => {
      if (state.licenseFilter === "all") return true;
      return getLicenseCategory(dataset.license) === state.licenseFilter;
    })
    .filter((dataset) => {
      if (!state.showCompatibleOnly) return true;
      return isDatasetCompatible(dataset, state.usageProfile);
    })
    .map((dataset) => {
      const fit = scoreDatasetForNeeds(dataset);
      return {
        dataset,
        fit,
        isSelected: state.selected.has(dataset.id),
      };
    })
    .filter((entry) => {
      if (!state.smartRecommendOnly) return true;
      if (entry.isSelected) return true;
      if (!entry.fit.compatible) return false;
      if (
        strategy.requireDomainMatchWhenSpecified &&
        state.domainNeed !== "all" &&
        entry.dataset.domain !== state.domainNeed
      ) {
        return false;
      }
      if (entry.fit.goalScore < strategy.smartGoalScoreMin) return false;
      return entry.fit.fitScore >= strategy.smartFitScoreMin;
    })
    .sort((a, b) => {
      if (a.isSelected !== b.isSelected) return Number(b.isSelected) - Number(a.isSelected);
      if (a.fit.fitScore !== b.fit.fitScore) return b.fit.fitScore - a.fit.fitScore;
      if (a.fit.goalScore !== b.fit.goalScore) return b.fit.goalScore - a.fit.goalScore;

      const scoreA = (a.dataset.downloads || 0) + (a.dataset.likes || 0) * 10;
      const scoreB = (b.dataset.downloads || 0) + (b.dataset.likes || 0) * 10;
      if (scoreA !== scoreB) return scoreB - scoreA;

      return a.dataset.name.localeCompare(b.dataset.name);
    })
    .map((entry) => ({
      ...entry,
      groupKey: getGroupKey(entry.dataset, entry.fit),
    }));
}

function getRecommendationBehaviorHint(entry) {
  const stats = getBehaviorStatsForProfile(state.usageProfile);
  if (!stats || stats.impressions < CALIBRATION_MIN_IMPRESSIONS) return "";

  const overallCtr = smoothCtr(stats.adds, stats.impressions);
  const candidates = [];

  if (entry.fit.compatible && stats.compatibleImpressions >= 30) {
    const lift = smoothCtr(stats.compatibleAdds, stats.compatibleImpressions) / overallCtr;
    candidates.push({ lift, text: `Compatible datasets get ${lift.toFixed(2)}x higher add rate for this profile` });
  }

  if (state.domainNeed !== "all" && entry.dataset.domain === state.domainNeed) {
    if (stats.domainRelevantImpressions >= 30 && stats.domainMatchImpressions >= 20) {
      const domainBaseline = smoothCtr(stats.domainRelevantAdds, stats.domainRelevantImpressions);
      const lift = smoothCtr(stats.domainMatchAdds, stats.domainMatchImpressions) / domainBaseline;
      candidates.push({ lift, text: `Domain-matching datasets get ${lift.toFixed(2)}x higher add rate` });
    }
  }

  if (entry.fit.goalScore >= BEHAVIOR_HIGH_GOAL_THRESHOLD && stats.highGoalImpressions >= 30) {
    const lift = smoothCtr(stats.highGoalAdds, stats.highGoalImpressions) / overallCtr;
    candidates.push({ lift, text: `High-goal-score datasets get ${lift.toFixed(2)}x higher add rate` });
  }

  const sourceKey = entry.dataset.source === "internal" ? "internal" : "huggingface";
  if (sourceKey === "internal" && stats.internalImpressions >= 30) {
    const lift = smoothCtr(stats.internalAdds, stats.internalImpressions) / overallCtr;
    candidates.push({ lift, text: `Internal datasets get ${lift.toFixed(2)}x higher add rate` });
  }
  if (sourceKey === "huggingface" && stats.huggingfaceImpressions >= 30) {
    const lift = smoothCtr(stats.huggingfaceAdds, stats.huggingfaceImpressions) / overallCtr;
    candidates.push({ lift, text: `Hugging Face datasets get ${lift.toFixed(2)}x higher add rate` });
  }

  candidates.sort((a, b) => b.lift - a.lift);
  if (!candidates.length || candidates[0].lift < 1.06) return "";
  return candidates[0].text;
}

function buildRecommendationReasons(entry) {
  const { dataset, fit, isSelected } = entry;
  const reasons = [];
  const priorityLabel =
    PERFORMANCE_PRIORITY_LABELS[state.performanceNeed] || PERFORMANCE_PRIORITY_LABELS.balanced;
  const sourcePreference = (fit.strategy.sourceBoosts && fit.strategy.sourceBoosts[dataset.source]) || 0;

  reasons.push(`${priorityLabel} score: ${fit.goalScore}/100 for ${state.usageProfile} profile`);

  if (fit.compatible) {
    reasons.push(`License is compatible with ${state.usageProfile} policy`);
  } else {
    reasons.push(`License is incompatible with ${state.usageProfile} policy`);
  }

  if (state.domainNeed !== "all") {
    if (dataset.domain === state.domainNeed) {
      reasons.push(`Matches requested ${state.domainNeed} domain`);
    } else {
      reasons.push(`Outside requested ${state.domainNeed} domain`);
    }
  }

  if (sourcePreference > 0) {
    reasons.push(`${fit.strategy.label} currently favors ${dataset.source} sources`);
  }

  if (isSelected) {
    reasons.push("Already selected in your active recipe");
  }

  const behaviorHint = getRecommendationBehaviorHint(entry);
  if (behaviorHint) {
    reasons.push(`Behavior logs: ${behaviorHint}`);
  }

  return reasons.slice(0, 4);
}

function buildDatasetCard(entry) {
  const { dataset, fit, isSelected } = entry;
  const blockedToAdd = !fit.compatible && !isSelected;
  const sourceLabel = dataset.source === "huggingface" ? "hf" : "internal";
  const familyLabel = dataset.family || "general";
  const downloadsLabel =
    dataset.source === "huggingface" ? `${formatNumber(dataset.downloads)} downloads` : "Private storage";
  const likesLabel = dataset.source === "huggingface" ? `${formatNumber(dataset.likes)} likes` : "Curated";
  const fitLabel = fit.fitBand === "strong" ? "Strong fit" : fit.fitBand === "moderate" ? "Moderate fit" : "Low fit";
  const whyTitle = buildRecommendationReasons(entry)
    .map((reason, idx) => `${idx + 1}. ${reason}`)
    .join("\n");

  const card = document.createElement("article");
  card.className = `dataset-card ${fit.compatible ? "" : "disabled"}`;

  card.innerHTML = `
    <div class="dataset-head">
      <div>
        <div class="dataset-name">${escapeHtml(dataset.name)}</div>
        <div class="repo-id">${escapeHtml(dataset.repoId || dataset.id)}</div>
        <div class="dataset-meta">
          <span class="badge tag">${escapeHtml(dataset.domain)}</span>
          <span class="meta-pill">${escapeHtml(familyLabel)}</span>
          <span class="meta-pill">${escapeHtml(sourceLabel)}</span>
          <span class="license-chip ${fit.compatible ? "ok" : "restricted"}">${escapeHtml(dataset.license || "unknown")}</span>
          <span class="meta-pill">${escapeHtml(getLicenseCategoryLabel(fit.licenseCategory))}</span>
          <span class="fit-chip ${fit.fitBand}">${escapeHtml(fitLabel)} ${fit.fitScore}</span>
          <button type="button" class="why-chip" title="${escapeHtml(whyTitle)}">Why recommended?</button>
        </div>
      </div>
      <button data-toggle="${escapeHtml(dataset.id)}" class="toggle-btn ${isSelected ? "accent" : ""} ${blockedToAdd ? "blocked" : ""}" ${blockedToAdd ? "disabled" : ""}>
        ${isSelected ? "Selected" : blockedToAdd ? "Blocked" : "Add"}
      </button>
    </div>
    <div>${escapeHtml(dataset.description)}</div>
    <div class="compat-note ${fit.compatible ? "ok" : "blocked"}">${escapeHtml(getCompatibilityMessage(dataset, state.usageProfile))}</div>
    <div class="dataset-stats">${escapeHtml(downloadsLabel)} · ${escapeHtml(likesLabel)} · Goal score ${fit.goalScore}/100</div>
    <div class="storage">${escapeHtml(dataset.storage)}</div>
  `;

  return card;
}

function renderLibrary() {
  datasetGridEl.innerHTML = "";
  const entries = getRankedLibraryEntries();
  latestRankedEntriesById = new Map(entries.map((entry) => [entry.dataset.id, entry]));
  logLibraryImpressions(entries);
  const grouped = new Map();

  entries.forEach((entry) => {
    const existing = grouped.get(entry.groupKey);
    if (existing) {
      existing.entries.push(entry);
      return;
    }
    grouped.set(entry.groupKey, { groupKey: entry.groupKey, entries: [entry] });
  });

  const groups = [...grouped.values()].sort((a, b) => {
    const bestA = a.entries[0] ? a.entries[0].fit.fitScore : 0;
    const bestB = b.entries[0] ? b.entries[0].fit.fitScore : 0;
    if (bestA !== bestB) return bestB - bestA;
    return a.groupKey.localeCompare(b.groupKey);
  });

  groups.forEach((group) => {
    const selectedCount = group.entries.reduce((acc, entry) => acc + (entry.isSelected ? 1 : 0), 0);
    const section = document.createElement("section");
    section.className = "dataset-group";
    section.innerHTML = `
      <div class="dataset-group-head">
        <h3>${escapeHtml(group.groupKey)}</h3>
        <span>${formatNumber(group.entries.length)} datasets · ${formatNumber(selectedCount)} selected</span>
      </div>
    `;

    const list = document.createElement("div");
    list.className = "dataset-group-list";
    group.entries.forEach((entry) => {
      list.appendChild(buildDatasetCard(entry));
    });
    section.appendChild(list);
    datasetGridEl.appendChild(section);
  });

  if (!groups.length) {
    datasetGridEl.innerHTML = '<div class="empty">No matching datasets.</div>';
  }
}

function renderOutput() {
  recipeOutputEl.textContent = JSON.stringify(buildRecipe(), null, 2);
}

function renderSummaryBadges() {
  const selected = getSelectedDatasets();
  const totalPct = selected.reduce((acc, dataset) => acc + (state.weights[dataset.id] || 0), 0);
  if (selectedCountEl) selectedCountEl.textContent = String(selected.length);
  if (totalPctEl) totalPctEl.textContent = formatPercent(totalPct);
}

function renderAllocationHint() {
  if (!allocationHintEl) return;
  const selected = getSelectedDatasets();
  if (!selected.length) {
    allocationHintEl.textContent = "Current dataset size: 0 selected.";
    return;
  }

  const largest = selected
    .slice()
    .sort((a, b) => (state.weights[b.id] || 0) - (state.weights[a.id] || 0))[0];
  const largestPct = state.weights[largest.id] || 0;

  allocationHintEl.textContent =
    `Current dataset size: ${selected.length} selected. ` +
    `Largest slice: ${formatPercent(largestPct)} (${largest.name}).`;
}

function render() {
  renderModelPicker();
  renderBar();
  renderActiveList();
  renderPerformancePanel();
  renderLibrary();
  renderOutput();
  renderConnectorHub();
  renderForumDonation();
  renderSavedRecipes();
  renderSummaryBadges();
  renderAllocationHint();
  renderLibraryStatus();
  renderSyntheticButton();
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
  const modelToggleName = event.target.dataset.modelToggle;
  if (modelToggleName) {
    toggleTargetModel(modelToggleName, Boolean(event.target.checked));
    return;
  }

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
    applyDomainAutoMixFromRequests();
    return;
  }

  if (event.target.id === "domainNeedSelect") {
    state.domainNeed = event.target.value;
    if (state.selected.has(SYNTHETIC_DATASET_ID)) {
      reserveWeightForSyntheticDataset();
    }
    render();
    applyDomainAutoMixFromRequests();
    return;
  }

  if (event.target.id === "performanceNeedSelect") {
    state.performanceNeed = event.target.value;
    render();
    applyDomainAutoMixFromRequests();
    return;
  }

  if (event.target.id === "groupBySelect") {
    state.groupBy = event.target.value;
    renderLibrary();
    renderLibraryStatus();
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

  if (event.target.id === "smartRecommendOnlyToggle") {
    state.smartRecommendOnly = event.target.checked;
    renderLibrary();
    renderLibraryStatus();
    return;
  }

  if (event.target.id === "connectorTargetSelect") {
    state.connectorTarget = event.target.value;
    renderConnectorHub();
    return;
  }

  if (event.target.id === "webhookUrlInput") {
    state.webhookUrl = event.target.value;
    renderConnectorHub();
    return;
  }

  if (event.target.id === "finalRunScoreInput") {
    state.finalRunScore = event.target.value;
    state.forumPostDraft = "";
    renderForumDonation();
    return;
  }

  if (event.target.id === "runNotesInput") {
    state.runNotes = event.target.value;
    state.forumPostDraft = "";
    renderForumDonation();
    return;
  }

  if (event.target.id === "donateRecipeToggle") {
    state.donateRecipe = event.target.checked;
    state.forumPostDraft = "";
    renderForumDonation();
    return;
  }

  if (event.target.id === "modelInput") {
    state.modelSearch = event.target.value;
    setModelImportStatus("", "");
    renderModelPicker();
    return;
  }

  if (event.target.id === "modeSelect") {
    renderPerformancePanel();
    renderOutput();
    renderConnectorHub();
    state.forumPostDraft = "";
    renderForumDonation();
  }
});

document.addEventListener("click", (event) => {
  const removeModelName = event.target.dataset.removeModel;
  if (removeModelName) {
    removeTargetModel(removeModelName);
    return;
  }

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
      logDatasetAddForCalibration(toggleId);
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

  if (event.target.id === "addCustomModelBtn") {
    const names = splitModelNames(modelInputEl ? modelInputEl.value : "");
    if (!names.length) {
      setModelImportStatus("Type at least one model name to add.", "warn");
      renderModelPicker();
      return;
    }
    addCustomModelNames(names, true);
    state.modelSearch = "";
    setModelImportStatus(`Added ${names.length} custom model${names.length > 1 ? "s" : ""}.`, "ok");
    handleTargetModelsChanged();
    return;
  }

  if (event.target.id === "importModelsBtn") {
    if (importModelsFileEl) {
      importModelsFileEl.click();
    }
    return;
  }

  if (event.target.id === "saveWeights") {
    saveCurrentRecipeCombination();
    flashButtonLabel(event.target, "Saved", "Save");
    return;
  }

  if (event.target.id === "syntheticDataBtn") {
    toggleSyntheticDataset();
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
    return;
  }

  if (event.target.id === "copyConnectorSnippet") {
    const snippet = getConnectorSnippet(state.connectorTarget);
    navigator.clipboard.writeText(snippet).then(() => {
      flashButtonLabel(event.target, "Copied", "Copy Snippet");
    });
    return;
  }

  if (event.target.id === "downloadRecipeJson") {
    downloadTextAsFile("datarecipe.pipeline.json", getRecipeJsonString(), "application/json;charset=utf-8");
    flashButtonLabel(event.target, "Downloaded", "Download JSON");
    return;
  }

  if (event.target.id === "downloadConnectorBundle") {
    downloadTextAsFile("datarecipe.connector.bundle.md", buildConnectorBundle(), "text/markdown;charset=utf-8");
    flashButtonLabel(event.target, "Downloaded", "Download Bundle");
    return;
  }

  if (event.target.id === "prepareForumPostBtn") {
    prepareForumDonationPost();
    flashButtonLabel(event.target, "Prepared", "Prepare Post");
    return;
  }

  if (event.target.id === "copyForumPostBtn") {
    if (!state.donateRecipe) {
      flashButtonLabel(event.target, "Enable Consent", "Copy Post");
      return;
    }
    if (!state.forumPostDraft) {
      prepareForumDonationPost();
    }
    navigator.clipboard.writeText(state.forumPostDraft).then(() => {
      flashButtonLabel(event.target, "Copied", "Copy Post");
    });
    return;
  }

  if (event.target.id === "publishForumPostBtn") {
    if (!state.donateRecipe) {
      flashButtonLabel(event.target, "Enable Consent", "Publish");
      return;
    }
    if (!state.forumPostDraft) {
      prepareForumDonationPost();
    }
    const published = publishForumPost();
    if (!published) {
      flashButtonLabel(event.target, "Not Published", "Publish");
      return;
    }
    flashButtonLabel(event.target, "Published", "Publish");
    return;
  }

  if (event.target.id === "saveRecipeBtn") {
    saveCurrentRecipeCombination();
    return;
  }

  const loadRecipeId = event.target.dataset.loadRecipe;
  if (loadRecipeId) {
    const record = state.savedRecipes.find((item) => item.id === loadRecipeId);
    if (!record) return;
    applySavedRecipeCombination(record);
    return;
  }

  const deleteRecipeId = event.target.dataset.deleteRecipe;
  if (deleteRecipeId) {
    deleteSavedRecipeCombination(deleteRecipeId);
  }
});

searchInputEl.value = "";
state.savedRecipes = readSavedRecipes();
syncCustomModelsWithSelection();
syncControlValuesFromState();
if (saveRecipeNameEl) {
  saveRecipeNameEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveCurrentRecipeCombination();
    }
  });
}
if (importModelsFileEl) {
  importModelsFileEl.addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    await importTargetModelsFromFile(file);
    event.target.value = "";
  });
}
calibrateRankingStrategiesFromBehaviorLogs();
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
