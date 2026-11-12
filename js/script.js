/* IKL Homepage Design Lab — Version 1. Search registry uses accurate availability labels. */
const concepts = [
  {name:"Ping",subject:"Computer Networking",description:"A network diagnostic utility used to test whether a destination responds.",status:"Live lesson",page:"https://jyv5fhwvft-a11y.github.io/interactive-knowledge-lexicon/concepts/ping.html"},
  {name:"Process",subject:"Operating Systems",description:"A program in execution, together with its current state and managed resources.",status:"In development",page:null},
  {name:"Threads",subject:"Operating Systems",description:"Units of execution that operate within a process.",status:"Next concept",page:null},
  {name:"Virtual Memory",subject:"Operating Systems",description:"A memory-management approach that gives programs a virtual address space.",status:"Planned",page:null},
  {name:"Paging",subject:"Operating Systems",description:"A memory-management technique that divides memory into fixed-size blocks.",status:"Planned",page:null},
  {name:"API",subject:"Software Development",description:"A defined way for software components to communicate.",status:"Planned",page:null},
  {name:"Encryption",subject:"Cybersecurity",description:"A method of transforming information so it can only be read with the right key.",status:"Planned",page:null}
];
const form=document.getElementById("conceptSearchForm");
const input=document.getElementById("conceptSearch");
const results=document.getElementById("searchResults");
const nav=document.getElementById("primaryNav");
const menu=document.getElementById("menuToggle");

function renderResults(query){
  const term=query.trim().toLowerCase();
  results.replaceChildren();
  if(!term){results.innerHTML='<p class="no-results">Enter a concept or subject to begin exploring.</p>';return;}
  const matches=concepts.filter(c=>[c.name,c.subject,c.description,c.status].some(v=>v.toLowerCase().includes(term)));
  if(!matches.length){results.innerHTML='<p class="no-results">No matching concept found yet. Try another word or subject.</p>';return;}
  matches.forEach(c=>{
    const card=document.createElement("article");card.className="result-card";
    const title=document.createElement("h3");title.textContent=c.name;
    const desc=document.createElement("p");desc.textContent=`${c.subject} — ${c.description}`;
    card.append(title,desc);
    if(c.page){const link=document.createElement("a");link.href=c.page;link.textContent="Open live lesson →";card.append(link);}
    else{const status=document.createElement("span");status.className="result-status";status.textContent=c.status;card.append(status);}
    results.append(card);
  });
}
form.addEventListener("submit",e=>{e.preventDefault();renderResults(input.value);});
document.querySelectorAll("[data-search]").forEach(button=>button.addEventListener("click",()=>{input.value=button.dataset.search;renderResults(input.value);input.focus();}));
document.querySelectorAll("[data-subject]").forEach(card=>card.addEventListener("click",()=>{input.value=card.dataset.subject;renderResults(input.value);}));
menu.addEventListener("click",()=>{
  const open=nav.classList.toggle("is-open");
  menu.setAttribute("aria-expanded",String(open));
  menu.setAttribute("aria-label",open?"Close navigation":"Open navigation");
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("is-open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation");}));
document.getElementById("currentYear").textContent=new Date().getFullYear();
