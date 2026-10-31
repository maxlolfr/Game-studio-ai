"use strict";
(function(){
const panel=document.createElement("section");panel.className="panel";
panel.innerHTML='<h2>🎮 Jeux jouables</h2><p class="muted">Premier prototype intégré au studio. Les missions et fichiers de travail restent indépendants du jeu publié.</p><p><a href="./games/eternal-guardians/index.html" target="_blank" rel="noopener" style="color:#ffbc6c;font-weight:bold">▶ Jouer à Eternal Guardians — prototype mobile</a></p><h2>📦 Export de projet</h2><p class="muted">Rassemble les fichiers HTML, CSS et JS enregistrés localement pour produire un fichier HTML autonome. Les références simples aux fichiers CSS et JS sont intégrées.</p><label>Projet<select id="bundleProject"><option>Eternal Guardians</option><option>Infinite Dungeon</option></select></label><button id="bundleExport">Télécharger le jeu HTML</button><p id="bundleStatus" class="muted"></p>';
const anchor=document.querySelector("section.panel");anchor.parentNode.insertBefore(panel,anchor);
const $v=id=>document.getElementById(id);
function decodeData(uri){const pos=uri.indexOf(",");if(pos<0)return"";const head=uri.slice(0,pos),body=uri.slice(pos+1);if(head.includes(";base64")){try{return atob(body)}catch(e){return""}}try{return decodeURIComponent(body)}catch(e){return""}}
function assemble(files){
const main=files.find(f=>f.name==="index.html");
if(!main)throw Error("Ajoute un fichier index.html dans l'atelier de Léa.");
let html=decodeData(main.data);
for(const f of files){
if(f===main)continue;
const content=decodeData(f.data);
if(f.name.endsWith(".css")){
for(const q of ['"',"'"]){const tag='<link rel="stylesheet" href='+q+f.name+q+'>';html=html.split(tag).join("<style>"+content+"</style>")}
}
if(f.name.endsWith(".js")){
for(const q of ['"',"'"]){const tag='<script src='+q+f.name+q+'></script>';html=html.split(tag).join("<script>"+content+"</script>")}
}
}
return html;
}
$v("bundleExport").onclick=()=>{const project=$v("bundleProject").value;try{const files=db.files.filter(f=>f.project===project);const html=assemble(files);const url=URL.createObjectURL(new Blob([html],{type:"text/html"}));const a=document.createElement("a");a.href=url;a.download=project.toLowerCase().replace(/\s+/g,"-")+".html";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$v("bundleStatus").textContent="Jeu exporté. Teste le fichier avant publication."}catch(e){$v("bundleStatus").textContent=e.message}};
})();
