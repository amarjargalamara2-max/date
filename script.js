const screens=document.querySelectorAll(".screen");
function goToScreen(number){
  screens.forEach(screen=>screen.classList.remove("active"));
  document.getElementById(`screen${number}`).classList.add("active");
}

document.getElementById("yesBtn").addEventListener("click",()=>{
  createHearts();
  setTimeout(()=>goToScreen(2),250);
});

const noBtn=document.getElementById("noBtn");
let noCount=0;
const noMessages=[
  "Үгүй гэж бодож байна уу? 😌",
  "За за... дахиад нэг бод доо. 😏",
  "Энэ чинь анхны болзоо шүү дээ 👀",
  "Сүүлчийн оролдлого... үнэхээр үгүй гэж үү? ♡"
];

noBtn.addEventListener("click",()=>{
  if(noCount>=4)return;
  noCount++;
  noBtn.textContent=noMessages[noCount-1];
  const x=Math.random()*100-50;
  const y=Math.random()*80-40;
  noBtn.style.transform=`translate(${x}px,${y}px) rotate(${Math.random()*10-5}deg)`;
  noBtn.animate([
    {transform:`translate(${x}px,${y}px) rotate(-4deg)`},
    {transform:`translate(${x+10}px,${y}px) rotate(4deg)`},
    {transform:`translate(${x}px,${y}px) rotate(0deg)`}
  ],{duration:500,easing:"ease-out"});
  if(noCount===4){
    setTimeout(()=>{
      noBtn.textContent="Үгүй 🔒";
      noBtn.classList.add("locked");
      noBtn.style.transform="translate(0,0)";
      noBtn.disabled=true;
    },500);
  }
});

document.getElementById("toDay").addEventListener("click",()=>goToScreen(3));

const dayCards=document.querySelectorAll(".day-card");
const dayNext=document.getElementById("dayNext");
let selectedDay=null;

dayCards.forEach(card=>{
  card.addEventListener("click",()=>{
    dayCards.forEach(item=>item.classList.remove("selected"));
    card.classList.add("selected");
    selectedDay={mn:card.dataset.day,en:card.dataset.en};
    dayNext.disabled=false;
    card.animate([
      {transform:"scale(.96)"},{transform:"scale(1.03)"},{transform:"scale(1)"}
    ],{duration:450,easing:"ease-out"});
  });
});

dayNext.addEventListener("click",()=>{
  if(!selectedDay)return;
  goToScreen(4);
});

const timeCards=document.querySelectorAll(".time-card");
const timeNext=document.getElementById("timeNext");
let selectedTime=null;

timeCards.forEach(card=>{
  card.addEventListener("click",()=>{
    timeCards.forEach(item=>item.classList.remove("selected"));
    card.classList.add("selected");
    selectedTime=card.dataset.time;
    timeNext.disabled=false;
    card.animate([
      {transform:"scale(.94)"},{transform:"scale(1.04)"},{transform:"scale(1)"}
    ],{duration:400,easing:"ease-out"});
  });
});

timeNext.addEventListener("click",()=>{
  if(!selectedTime)return;
  document.getElementById("selectedDay").textContent=selectedDay.mn;
  document.getElementById("selectedTime").textContent=selectedTime;
  goToScreen(5);
});

document.getElementById("meetBtn").addEventListener("click",()=>{
  createHearts();
  setTimeout(()=>goToScreen(6),500);
});

function createHearts(){
  for(let i=0;i<12;i++){
    const heart=document.createElement("div");
    heart.innerHTML="♡";
    heart.style.position="fixed";
    heart.style.zIndex="100";
    heart.style.left=Math.random()*100+"%";
    heart.style.bottom="10%";
    heart.style.fontSize=15+Math.random()*25+"px";
    heart.style.color="white";
    heart.style.pointerEvents="none";
    document.body.appendChild(heart);
    heart.animate([
      {transform:"translateY(0) scale(.5) rotate(0deg)",opacity:0},
      {transform:"translateY(-150px) scale(1) rotate(15deg)",opacity:1},
      {transform:"translateY(-400px) scale(.7) rotate(-15deg)",opacity:0}
    ],{duration:1800+Math.random()*1000,easing:"ease-out"});
    setTimeout(()=>heart.remove(),3000);
  }
}
