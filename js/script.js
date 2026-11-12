/* IKL Homepage Design Lab — POC concept search */

const POC_CONCEPT_FILES =
  "https://github.com/jyv5fhwvft-a11y/ikl-reusable-architecture-poc/blob/main/concepts/";

const concepts = [
  {
    name: "Ping",
    slug: "ping",
    subject: "Computer Networking",
    description: "A network diagnostic utility used to test whether a destination responds.",
    status: "POC file available",
    fileAvailable: true
  },
  {
    name: "Process",
    slug: "process",
    subject: "Operating Systems",
    description: "A program in execution, together with its current state and managed resources.",
    status: "POC file available",
    fileAvailable: true
  },
  {
    name: "Threads",
    slug: "threads",
    subject: "Operating Systems",
    description: "Units of execution that operate within a process.",
    status: "POC file available",
    fileAvailable: true
  },
  {
    name: "Virtual Memory",
    slug: "virtual-memory",
    subject: "Operating Systems",
    description: "A memory-management approach that gives programs a virtual address space.",
    status: "Planned",
    fileAvailable: false
  },
  {
    name: "Paging",
    slug: "paging",
    subject: "Operating Systems",
    description: "A memory-management technique that divides memory into fixed-size blocks.",
    status: "Planned",
    fileAvailable: false
  },
  {
    name: "API",
    slug: "api",
    subject: "Software Development",
    description: "A defined way for software components to communicate.",
    status: "Planned",
    fileAvailable: false
  },
  {
    name: "Encryption",
    slug: "encryption",
    subject: "Cybersecurity",
    description: "A method of transforming information so it can only be read with the right key.",
    status: "Planned",
    fileAvailable: false
  }
];

const form = document.getElementById("conceptSearchForm");
const input = document.getElementById("conceptSearch");
const results = document.getElementById("searchResults");
const nav = document.getElementById("primaryNav");
const menu = document.getElementById("menuToggle");

function renderResults(query) {
  const term = query.trim().toLowerCase();
  results.replaceChildren();

  if (!term) {
    results.innerHTML =
      '<p class="no-results">Enter a concept or subject to begin exploring.</p>';
    return;
  }

  const matches = concepts.filter(concept =>
    [
      concept.name,
      concept.subject,
      concept.description,
      concept.status
    ].some(value => value.toLowerCase().includes(term))
  );

  if (!matches.length) {
    results.innerHTML =
      '<p class="no-results no-match">No matching concept found yet. Try another word or subject.</p>';
    return;
  }

  matches.forEach(concept => {
    const card = document.createElement("article");
    card.className = "result-card";

    const title = document.createElement("h3");
    title.textContent = concept.name;

    const description = document.createElement("p");
    description.textContent =
      `${concept.subject} — ${concept.description}`;

    card.append(title, description);

    if (concept.fileAvailable) {
      const link = document.createElement("a");

      link.href =
        POC_CONCEPT_FILES + concept.slug + ".md";

      link.textContent = "Open POC concept file →";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(link);
    } else {
      const status = document.createElement("span");
      status.className = "result-status";
      status.textContent = concept.status;

      card.append(status);
    }

    results.append(card);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  renderResults(input.value);
  input.value = "";
});

document.querySelectorAll("[data-search]").forEach(button => {
  button.addEventListener("click", () => {
    input.value = button.dataset.search;
    renderResults(input.value);
    input.focus();
  });
});

document.querySelectorAll("[data-subject]").forEach(card => {
  card.addEventListener("click", () => {
    input.value = card.dataset.subject;
    renderResults(input.value);
  });
});

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");

  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
  });
});

document.getElementById("currentYear").textContent =
  new Date().getFullYear();
// Return to the top when the page is refreshed.
const navigationEntry = performance.getEntriesByType("navigation")[0];

if (navigationEntry?.type === "reload") {
  window.history.scrollRestoration = "manual";

  window.addEventListener("pageshow", () => {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    window.scrollTo(0, 0);
  }, { once: true });
}

