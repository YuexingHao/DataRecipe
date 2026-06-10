const FORUM_POSTS_STORAGE_KEY = "dataRecipeForumPostsV1";

function makeDatasetEntry(id, weight, license, source = "internal") {
  return {
    dataset: id,
    dataset_id: id,
    source,
    repo_id: id,
    storage_path: `starter://${id}`,
    license,
    license_category: license,
    compatible_with_profile: true,
    weight_pct: weight,
  };
}

function makePayload(mode, profile, targetModel, predictedScore, grade, summary, datasets) {
  return {
    project: "DataRecipe",
    mode,
    training_profile: profile,
    target_model: targetModel,
    total_weight_pct: datasets.reduce((acc, item) => acc + item.weight_pct, 0),
    incompatible_datasets_for_profile: [],
    predicted_performance: {
      overall_score: predictedScore,
      grade,
      axes: [],
      strengths: [],
      risks: [],
      summary,
    },
    datasets,
  };
}

function formatPercent(value, digits = 1) {
  const numeric = Number(value);
  const safe = Number.isFinite(numeric) ? numeric : 0;
  return `${safe.toFixed(digits)}%`;
}

const STARTER_FORUM_RECIPES = [
  {
    id: "starter_general_001",
    title: "General Starter Blend",
    domain: "general",
    mode: "post_training",
    training_profile: "personal",
    target_model: "open-model-8b-general",
    predicted_score: 77,
    final_score: "79.4",
    notes: "Balanced general coverage.",
    datasets: [
      makeDatasetEntry("openwebtext_clean", 35, "permissive", "huggingface"),
      makeDatasetEntry("c4_curated", 25, "permissive", "huggingface"),
      makeDatasetEntry("wiki_en_curated", 22, "permissive", "huggingface"),
      makeDatasetEntry("synthetic_augmentation_general", 18, "internal", "internal"),
    ],
    created_at: "2026-06-09T15:10:00.000Z",
    source: "starter",
  },
  {
    id: "starter_coding_001",
    title: "Coding Starter Blend",
    domain: "coding",
    mode: "fine_tuning",
    training_profile: "academia",
    target_model: "open-model-8b-code",
    predicted_score: 82,
    final_score: "84.1",
    notes: "Strong coding mix.",
    datasets: [
      makeDatasetEntry("the_stack_dedup", 34, "permissive", "huggingface"),
      makeDatasetEntry("codealpaca_clean", 26, "permissive", "huggingface"),
      makeDatasetEntry("mbpp_plus", 20, "permissive", "huggingface"),
      makeDatasetEntry("synthetic_augmentation_coding", 20, "internal", "internal"),
    ],
    created_at: "2026-06-09T15:25:00.000Z",
    source: "starter",
  },
  {
    id: "starter_medicine_001",
    title: "Medicine Starter Blend",
    domain: "medicine",
    mode: "fine_tuning",
    training_profile: "company",
    target_model: "open-model-8b-med",
    predicted_score: 85,
    final_score: "86.0",
    notes: "Clinical reasoning baseline.",
    datasets: [
      makeDatasetEntry("jama", 32, "internal", "internal"),
      makeDatasetEntry("medxpertqa", 24, "internal", "internal"),
      makeDatasetEntry("mmlu_precision_medicine", 24, "internal", "internal"),
      makeDatasetEntry("synthetic_augmentation_medicine", 20, "internal", "internal"),
    ],
    created_at: "2026-06-09T15:40:00.000Z",
    source: "starter",
  },
  {
    id: "starter_legal_001",
    title: "Legal Starter Blend",
    domain: "legal",
    mode: "fine_tuning",
    training_profile: "company",
    target_model: "open-model-8b-legal",
    predicted_score: 80,
    final_score: "81.7",
    notes: "Legal reasoning baseline.",
    datasets: [
      makeDatasetEntry("legalbench", 34, "internal", "internal"),
      makeDatasetEntry("casehold", 22, "research_only", "huggingface"),
      makeDatasetEntry("contractnli", 24, "non_commercial", "huggingface"),
      makeDatasetEntry("synthetic_augmentation_legal", 20, "internal", "internal"),
    ],
    created_at: "2026-06-09T15:55:00.000Z",
    source: "starter",
  },
];

STARTER_FORUM_RECIPES.forEach((post) => {
  post.payload = makePayload(
    post.mode,
    post.training_profile,
    post.target_model,
    post.predicted_score,
    post.predicted_score >= 80 ? "A" : "B",
    `${post.title} baseline payload for ${post.domain} use cases.`,
    post.datasets,
  );
});

const state = {
  domainFilter: "all",
  search: "",
};

const recipeGridEl = document.getElementById("forumRecipeGrid");
const statsEl = document.getElementById("forumStats");
const filtersEl = document.getElementById("forumFilters");
const searchInputEl = document.getElementById("forumSearchInput");

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeForumDomain(domain) {
  const normalized = String(domain || "general").toLowerCase();
  if (normalized === "law") return "legal";
  return normalized;
}

function getDomainLabel(domain) {
  if (domain === "medicine") return "Medicine";
  if (domain === "coding") return "Coding";
  if (domain === "legal") return "Legal";
  return "General";
}

function readUserForumPosts() {
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

function getMergedForumPosts() {
  const userPosts = readUserForumPosts().map((item) => {
    const normalizedDomain = normalizeForumDomain(item.domain);
    return {
      ...item,
      domain: normalizedDomain,
      title: item.title || `${getDomainLabel(normalizedDomain)} community recipe`,
      source: item.source || "user",
      datasets: Array.isArray(item.datasets) ? item.datasets : [],
      payload: item.payload || {},
    };
  });

  return [...userPosts, ...STARTER_FORUM_RECIPES].sort((a, b) => {
    const ta = new Date(a.created_at || 0).getTime();
    const tb = new Date(b.created_at || 0).getTime();
    return tb - ta;
  });
}

function formatTime(value) {
  const parsed = new Date(value || Date.now());
  if (Number.isNaN(parsed.getTime())) return "Unknown time";
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function postMatchesFilter(post) {
  if (state.domainFilter !== "all" && normalizeForumDomain(post.domain) !== state.domainFilter) {
    return false;
  }

  const q = state.search.trim().toLowerCase();
  if (!q) return true;

  const datasetText = (post.datasets || [])
    .map((item) => `${item.dataset_id || ""} ${item.license || ""}`)
    .join(" ");
  const blob = `${post.title || ""} ${post.target_model || ""} ${post.notes || ""} ${datasetText}`.toLowerCase();
  return blob.includes(q);
}

function buildRecipeCard(post) {
  const card = document.createElement("article");
  card.className = "forum-card";
  const domain = normalizeForumDomain(post.domain);
  const shownDatasets = (post.datasets || []).slice(0, 5);

  card.innerHTML = `
    <div class="forum-card-head">
      <div class="forum-card-title">${escapeHtml(post.title || "Untitled recipe")}</div>
      <span class="forum-domain-chip">${escapeHtml(getDomainLabel(domain))}</span>
    </div>
    <div class="forum-card-meta">
      <span>${escapeHtml((post.mode || "post_training").replaceAll("_", "-"))}</span>
      <span>Profile: ${escapeHtml(post.training_profile || "-")}</span>
      <span>Model: ${escapeHtml(post.target_model || "-")}</span>
      <span>Predicted: ${escapeHtml(String(post.predicted_score || "-"))}</span>
      <span>Final: ${escapeHtml(String(post.final_score || "-"))}</span>
      <span>${escapeHtml(formatTime(post.created_at))}</span>
      <span>${escapeHtml(post.source || "user")}</span>
    </div>
    <div class="forum-card-notes">${escapeHtml(post.notes || "(No notes)")}</div>
    <ul class="forum-datasets"></ul>
    <div class="forum-payload">
      <details>
        <summary>Show JSON</summary>
        <pre></pre>
      </details>
    </div>
  `;

  const listEl = card.querySelector(".forum-datasets");
  shownDatasets.forEach((dataset) => {
    const li = document.createElement("li");
    li.textContent = `${dataset.dataset_id || dataset.dataset || "unknown"} - ${formatPercent(dataset.weight_pct)} (${dataset.license || "unknown"})`;
    listEl.appendChild(li);
  });

  const preEl = card.querySelector("pre");
  preEl.textContent = JSON.stringify(post.payload || {}, null, 2);
  return card;
}

function renderForum() {
  const allPosts = getMergedForumPosts();
  const visible = allPosts.filter(postMatchesFilter);

  statsEl.textContent = `${visible.length} shown • ${allPosts.length} total • ${STARTER_FORUM_RECIPES.length} starters`;
  recipeGridEl.innerHTML = "";

  if (!visible.length) {
    recipeGridEl.innerHTML = '<div class="forum-empty">No matching recipes.</div>';
    return;
  }

  visible.forEach((post) => {
    recipeGridEl.appendChild(buildRecipeCard(post));
  });
}

filtersEl.addEventListener("click", (event) => {
  const nextFilter = event.target.dataset.domainFilter;
  if (!nextFilter) return;
  state.domainFilter = nextFilter;
  [...filtersEl.querySelectorAll("button")].forEach((button) => {
    button.classList.toggle("active", button.dataset.domainFilter === state.domainFilter);
  });
  renderForum();
});

searchInputEl.addEventListener("input", (event) => {
  state.search = event.target.value || "";
  renderForum();
});

renderForum();
