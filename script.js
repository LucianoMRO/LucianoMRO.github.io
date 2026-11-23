const projects = [
 {name:"Climatech",description:"Aplicação de clima com previsão meteorológica, pesquisa de cidades e interface dinâmica.",image:"assets/images/climatech.png",technologies:["HTML","CSS","JavaScript","React"],github:"https://github.com/LucianoMRO/CLIMATECH"},
 {name:"Travel Tech",description:"Projeto voltado à tecnologia e experiências digitais para viagens.",image:"",technologies:["HTML","CSS","JavaScript"],github:"https://github.com/LucianoMRO/traveltech"}
];
const projectsContainer=document.querySelector("#projects-container");
projects.forEach(project=>{
 const card=document.createElement("article");card.className="project-card";
 if(project.image){const img=document.createElement("img");img.className="project-image";img.src=project.image;img.alt=`Imagem do projeto ${project.name}`;img.loading="lazy";img.onerror=()=>img.replaceWith(makePlaceholder());card.append(img)}
 else card.append(makePlaceholder());
 const content=document.createElement("div");content.className="project-content";
 const title=document.createElement("h3");title.textContent=project.name;
 const desc=document.createElement("p");desc.textContent=project.description;
 const tech=document.createElement("div");tech.className="project-technologies";
 project.technologies.forEach(t=>{const tag=document.createElement("span");tag.textContent=t;tech.append(tag)});
 const links=document.createElement("div");links.className="project-links";
 const link=document.createElement("a");link.href=project.github;link.target="_blank";link.rel="noopener noreferrer";link.textContent="Acessar projeto ↗";links.append(link);
 content.append(title,desc,tech,links);card.append(content);projectsContainer.append(card);
});
function makePlaceholder(){const el=document.createElement("div");el.className="project-placeholder";el.textContent="</>";return el}
document.querySelector("#project-count").textContent=projects.length;
const currentYear=document.querySelector("#current-year");
if(currentYear) currentYear.textContent=new Date().getFullYear();

document.addEventListener("click",event=>{
 const btn=event.target.closest(".btn,.social-row a,.top-github");
 if(!btn)return;
 const rect=btn.getBoundingClientRect();
 const spark=document.createElement("span");spark.className="click-spark";
 spark.style.left=`${event.clientX-rect.left}px`;spark.style.top=`${event.clientY-rect.top}px`;
 btn.append(spark);setTimeout(()=>spark.remove(),650);
});

