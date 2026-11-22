
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

    github: "https://github.com/LucianoMRO/traveltech"

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
