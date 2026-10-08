const screens=[...document.querySelectorAll(".screen")];
const show=i=>{
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById("s"+i).classList.add("active");
  if(i===1)spawnHearts();
};

function spawnHearts(){
  const box=document.querySelector(".floating-hearts");
  box.innerHTML="";
  for(let i=0;i<8;i++){
    const h=document.createElement("span");
    h.textContent="♡";
    h.style.left=(8+Math.random()*84)+"%";
    h.style.top=(18+Math.random()*58)+"%";
    h.style.fontSize=(12+Math.random()*13)+"px";
    h.style.animationDelay=(Math.random()*4)+"s";
    box.appendChild(h);
  }
}
spawnHearts();

const yes=document.getElementById("yes");
yes.onclick=()=>{
  yes.animate([{transform:"scale(1)"},{transform:"scale(.92)"},{transform:"scale(1)"}],{duration:300});
  setTimeout(()=>show(2),180);
};

const no=document.getElementById("no");
let tries=0;
const messages=[
  "Үгүй гэж үү? 😌",
  "Дахиад нэг бод доо... 😏",
  "Анхны болзоо шүү дээ 👀",
  "Сүүлчийн боломж... ♡"
];

no.onclick=()=>{
  if(tries>=4)return;
  tries++;
  const card=document.querySelector("#s1 .actions");
  const maxX=Math.min(55,window.innerWidth*.13);
  const x=(Math.random()>.5?1:-1)*(15+Math.random()*maxX);
  const y=(Math.random()>.5?1:-1)*(5+Math.random()*22);
  no.textContent=messages[tries-1];
  no.animate([
    {transform:`translate(0,0) rotate(0)`},
    {transform:`translate(${x}px,${y}px) rotate(${x>0?5:-5}deg)`},
    {transform:`translate(${x*.6}px,${y*.5}px) rotate(0)`}
  ],{duration:500,easing:"cubic-bezier(.68,-.55,.27,1.55)"});
  no.style.transform=`translate(${x*.6}px,${y*.5}px)`;
  if(tries===4){
    setTimeout(()=>{
      no.textContent="Үгүй 🔒";
      no.classList.add("locked");
      no.style.transform="translate(0,0)";
      no.disabled=true;
    },450);
  }
};

document.getElementById("continue").onclick=()=>show(3);

let chosenDay=null;
const dayNext=document.getElementById("dayNext");
document.querySelectorAll(".day").forEach(card=>{
  card.onclick=()=>{
    document.querySelectorAll(".day").forEach(x=>x.classList.remove("selected"));
    card.classList.add("selected");
    chosenDay=card.dataset.day;
    dayNext.disabled=false;
    card.animate([{transform:"scale(.95)"},{transform:"translateY(-6px) scale(1.02)"},{transform:"translateY(-5px)"}],{duration:450});
  };
});
dayNext.onclick=()=>{if(chosenDay)show(4)};

let chosenTime=null;
const timeNext=document.getElementById("timeNext");
document.querySelectorAll(".time").forEach(card=>{
  card.onclick=()=>{
    document.querySelectorAll(".time").forEach(x=>x.classList.remove("selected"));
    card.classList.add("selected");
    chosenTime=card.dataset.time;
    timeNext.disabled=false;
  };
});
timeNext.onclick=()=>{
  if(!chosenTime)return;
  document.getElementById("pickedDay").textContent=chosenDay;
  document.getElementById("pickedTime").textContent=chosenTime;
  show(5);
};

document.getElementById("meet").onclick=()=>{
  burst();
  setTimeout(()=>show(6),450);
};

function burst(){
  for(let i=0;i<18;i++){
    const h=document.createElement("div");
    h.textContent=Math.random()>.25?"♡":"✦";
    Object.assign(h.style,{
      position:"fixed",zIndex:99,left:(Math.random()*100)+"%",bottom:"14%",
      color:"#fff",fontSize:(14+Math.random()*22)+"px",pointerEvents:"none"
    });
    document.body.appendChild(h);
    h.animate([
      {transform:"translateY(0) scale(.4) rotate(0)",opacity:0},
      {transform:`translate(${(Math.random()-.5)*80}px,-170px) scale(1) rotate(20deg)`,opacity:1},
      {transform:`translate(${(Math.random()-.5)*150}px,-420px) scale(.6) rotate(-20deg)`,opacity:0}
    ],{duration:1700+Math.random()*700,easing:"ease-out"});
    setTimeout(()=>h.remove(),2600);
  }
}
