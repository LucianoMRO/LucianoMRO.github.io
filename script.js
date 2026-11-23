
/* =====================================
   PROJETOS DO PORTFÓLIO
===================================== */

const projects = [
  {
    name: "Climatech",

    description:
      "Aplicação de clima com previsão meteorológica, pesquisa de cidades e interface dinâmica.",

    image: "assets/images/climatech.png",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React"
    ],

    github: "https://github.com/LucianoMRO/CLIMATECH",

    demo: ""
  },

  {
    name: "Travel Tech",

    description:
      "Projeto voltado à tecnologia e experiências digitais para viagens.",

    image: "assets/images/travel-tech.png",

    technologies: [
      "HTML",
      "CSS",
      "JavaScript"
    ],

    github: "https://github.com/LucianoMRO/traveltech",

    demo: ""
  }
];

/* =====================================
   RENDERIZAÇÃO DOS PROJETOS
===================================== */

const projectsContainer = document.querySelector(
  "#projects-container"
);

function renderProjects() {

  if (!projectsContainer) return;

  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {

    const card = document.createElement("article");
    card.className = "project-card";

    // Imagem
    const image = document.createElement("img");

    image.className = "project-image";
    image.src = project.image;
    image.alt = `Imagem do projeto ${project.name}`;
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", () => {
      image.style.display = "none";
    });

    // Conteúdo
    const content = document.createElement("div");
    content.className = "project-content";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    // Tecnologias
    const technologies = document.createElement("div");
    technologies.className = "project-technologies";

    project.technologies.forEach((technology) => {

      const tag = document.createElement("span");

      tag.textContent = technology;

      technologies.appendChild(tag);

    });

    // Links
    const links = document.createElement("div");
    links.className = "project-links";

    const githubLink = document.createElement("a");

    githubLink.href = project.github;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.textContent = "GitHub ↗";

    links.appendChild(githubLink);

    if (project.demo) {

      const demoLink = document.createElement("a");

      demoLink.href = project.demo;
      demoLink.target = "_blank";
      demoLink.rel = "noopener noreferrer";
      demoLink.textContent = "Visualizar ↗";

      links.appendChild(demoLink);

    }

    content.append(
      title,
      description,
      technologies,
      links
    );

    card.append(
      image,
      content
    );

    fragment.appendChild(card);

  });

  projectsContainer.appendChild(fragment);

  const projectCount = document.querySelector("#project-count");

  if (projectCount) {
    projectCount.textContent = projects.length;
  }

}

/* =====================================
   ANO AUTOMÁTICO
===================================== */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =====================================
   INICIALIZAÇÃO
===================================== */

renderProjects();


/* =====================================
   REPOSITÓRIOS DO GITHUB
   Os dados são carregados automaticamente
   pela API pública do GitHub.
===================================== */

const repositoriesContainer = document.querySelector("#repositories-container");
const repositorySearch = document.querySelector("#repository-search");
const repositoryTotal = document.querySelector("#repository-total");

let githubRepositories = [];

function formatRepositoryDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

function renderRepositories(searchTerm = "") {
  if (!repositoriesContainer) return;

  const term = searchTerm.trim().toLowerCase();
  const filtered = githubRepositories.filter((repo) => {
    const searchable = `${repo.name} ${repo.description || ""} ${repo.language || ""}`.toLowerCase();
    return searchable.includes(term);
  });

  repositoriesContainer.replaceChildren();

  if (repositoryTotal) {
    repositoryTotal.textContent = `${filtered.length} de ${githubRepositories.length} repositórios`;
  }

  if (!filtered.length) {
    const message = document.createElement("div");
    message.className = "repositories-message";
    message.textContent = term
      ? "Nenhum repositório encontrado para essa busca."
      : "Nenhum repositório público encontrado.";
    repositoriesContainer.appendChild(message);
    return;
  }

  const fragment = document.createDocumentFragment();

  filtered.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "repository-card";

    const top = document.createElement("div");
    top.className = "repository-card-top";

    const icon = document.createElement("span");
    icon.className = "repository-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "</>";

    const title = document.createElement("h3");
    title.textContent = repo.name;

    top.append(icon, title);

    const description = document.createElement("p");
    description.className = "repository-description";
    description.textContent = repo.description || "Sem descrição adicionada a este repositório.";

    const details = document.createElement("div");
    details.className = "repository-details";

    if (repo.language) {
      const language = document.createElement("span");
      language.className = "repository-language";
      language.textContent = repo.language;
      details.appendChild(language);
    }

    const stars = document.createElement("span");
    stars.textContent = `★ ${repo.stargazers_count}`;
    details.appendChild(stars);

    const forks = document.createElement("span");
    forks.textContent = `⑂ ${repo.forks_count}`;
    details.appendChild(forks);

    const updated = document.createElement("span");
    updated.textContent = `Atualizado ${formatRepositoryDate(repo.updated_at)}`;
    details.appendChild(updated);

    const link = document.createElement("a");
    link.className = "repository-link";
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Abrir repositório ↗";
    link.setAttribute("aria-label", `Abrir o repositório ${repo.name} no GitHub`);

    card.append(top, description, details, link);
    fragment.appendChild(card);
  });

  repositoriesContainer.appendChild(fragment);
}

async function loadGithubRepositories() {
  if (!repositoriesContainer) return;

  try {
    const response = await fetch(
      "https://api.github.com/users/LucianoMRO/repos?per_page=100&sort=updated",
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error("O GitHub limitou temporariamente as consultas. Tente novamente mais tarde.");
      }
      throw new Error("Não foi possível carregar os repositórios agora.");
    }

    const data = await response.json();
    githubRepositories = data
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    renderRepositories(repositorySearch ? repositorySearch.value : "");
  } catch (error) {
    repositoriesContainer.replaceChildren();
    const message = document.createElement("div");
    message.className = "repositories-message repositories-error";
    message.textContent = error.message;
    repositoriesContainer.appendChild(message);
    if (repositoryTotal) repositoryTotal.textContent = "GitHub indisponível";
  }
}

if (repositorySearch) {
  repositorySearch.addEventListener("input", (event) => {
    renderRepositories(event.target.value);
  });
}

loadGithubRepositories();
