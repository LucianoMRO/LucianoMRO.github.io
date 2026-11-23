const projects = [
  {
    name: "Climatech",
    category: "CLIMA & TECNOLOGIA",
    description: "Aplicação de clima com previsão meteorológica, pesquisa de cidades e interface dinâmica.",
    image: "assets/images/climatech.png",
    imageAlt: "Prévia do projeto Climatech",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    github: "https://github.com/LucianoMRO/CLIMATECH",
    demo: ""
  },
  {
    name: "Travel Tech",
    category: "EXPERIÊNCIA DIGITAL",
    description: "Projeto voltado à tecnologia e a experiências digitais para quem gosta de explorar novos destinos.",
    image: "assets/images/travel-tech.svg",
    imageAlt: "Ilustração do projeto Travel Tech",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/LucianoMRO/traveltech",
    demo: ""
  }
];

const projectsContainer = document.querySelector("#projects-container");

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.style.setProperty("--card-index", index);

  const media = document.createElement("div");
  media.className = "project-media";
  const image = document.createElement("img");
  image.src = project.image;
  image.alt = project.imageAlt;
  image.loading = "lazy";
  image.decoding = "async";
  image.onerror = () => {
    image.remove();
    media.classList.add("project-media-fallback");
    const fallback = document.createElement("span");
    fallback.textContent = project.name === "Climatech" ? "CLIMATECH" : "TRAVEL TECH";
    media.append(fallback);
  };
  media.append(image);

  const body = document.createElement("div");
  body.className = "project-body";
  const top = document.createElement("div");
  top.className = "project-topline";
  const category = document.createElement("span");
  category.textContent = project.category;
  const number = document.createElement("span");
  number.textContent = `0${index + 1}`;
  top.append(category, number);

  const title = document.createElement("h3");
  title.textContent = project.name;
  const description = document.createElement("p");
  description.textContent = project.description;

  const tags = document.createElement("div");
  tags.className = "project-tags";
  project.technologies.forEach((tech) => {
    const tag = document.createElement("span");
    tag.textContent = tech;
    tags.append(tag);
  });

  const links = document.createElement("div");
  links.className = "project-links";
  const github = document.createElement("a");
  github.href = project.github;
  github.target = "_blank";
  github.rel = "noopener noreferrer";
  github.textContent = "Código no GitHub ↗";
  links.append(github);
  if (project.demo) {
    const demo = document.createElement("a");
    demo.href = project.demo;
    demo.target = "_blank";
    demo.rel = "noopener noreferrer";
    demo.textContent = "Ver projeto ↗";
    links.append(demo);
  }

  body.append(top, title, description, tags, links);
  card.append(media, body);
  return card;
}

if (projectsContainer) {
  projects.forEach((project, index) => projectsContainer.append(createProjectCard(project, index)));
  document.querySelector("#project-count").textContent = projects.length;
}

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
  navLinks?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  navLinks.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const backToTop = document.querySelector("#back-to-top");
window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("is-visible", window.scrollY > 500);
}, { passive: true });
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
