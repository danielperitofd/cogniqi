
const questions = [
 {cells:["▲","▶","▼","▶","▼","◀","▼","◀","?"],options:["▲","▶","▼","◀"],correct:0,level:"Fácil"},
 {cells:["●","●●","●●●","■■","■■■","■■■■","▲▲▲","▲▲▲▲","?"],options:["▲▲","▲▲▲","▲▲▲▲▲","▲▲▲▲▲▲"],correct:2,level:"Fácil"},
 {cells:["↗","→","↘","↑","•","↓","↖","←","?"],options:["↙","↗","↑","→"],correct:0,level:"Média"},
 {cells:["○","●","○","●","○","●","○","●","?"],options:["●","○","◉","◎"],correct:1,level:"Fácil"},
 {cells:["1","2","4","2","4","8","3","6","?"],options:["8","9","12","18"],correct:2,level:"Média"},
 {cells:["△","□","○","□","○","△","○","△","?"],options:["□","△","○","◇"],correct:0,level:"Média"},
 {cells:["↑","→","↓","→","↓","←","↓","←","?"],options:["↑","→","↓","←"],correct:0,level:"Difícil"},
 {cells:["◐","◓","◑","◒","◐","◓","◑","◒","?"],options:["◐","◓","◑","◒"],correct:0,level:"Média"},
 {cells:["2","3","5","4","6","10","6","9","?"],options:["12","14","15","18"],correct:2,level:"Difícil"},
 {cells:["◆","◇","◆","◇","◆","◇","◆","◇","?"],options:["◆","◇","◈","■"],correct:0,level:"Fácil"}
];
let current=0, selected=null, answers=[], started=Date.now();
const qEl=document.getElementById("questionIndex");
const levelEl=document.getElementById("questionLevel");
const matrixEl=document.getElementById("matrix");
const optionsEl=document.getElementById("options");
const nextBtn=document.getElementById("nextBtn");
const progressEl=document.getElementById("testProgress");
const timerEl=document.getElementById("timer");
function render(){
 const q=questions[current];
 qEl.textContent=`Questão ${current+1} de ${questions.length}`;
 levelEl.textContent=q.level;
 progressEl.style.width=`${((current)/questions.length)*100}%`;
 matrixEl.innerHTML=q.cells.map(c=>`<div class="matrix-cell">${c}</div>`).join("");
 optionsEl.innerHTML=q.options.map((o,i)=>`<div class="col-6 col-md-3"><button class="answer-option w-100" data-i="${i}">${o}</button></div>`).join("");
 document.querySelectorAll(".answer-option").forEach(btn=>btn.addEventListener("click",()=>{
   selected=Number(btn.dataset.i);
   document.querySelectorAll(".answer-option").forEach(x=>x.classList.remove("active"));
   btn.classList.add("active");
   nextBtn.disabled=false;
 }));
 nextBtn.textContent=current===questions.length-1?"Finalizar avaliação":"Próxima questão";
}
nextBtn.addEventListener("click",()=>{
 if(selected===null)return;
 answers.push({q:current,choice:selected,correct:selected===questions[current].correct});
 selected=null; nextBtn.disabled=true;
 if(current<questions.length-1){current++;render();return;}
 finish();
});
function finish(){
 const elapsed=Math.max(1,Math.round((Date.now()-started)/1000));
 const correct=answers.filter(a=>a.correct).length;
 const accuracy=Math.round((correct/questions.length)*100);
 const speed=Math.max(55,Math.min(95,Math.round(92-(elapsed/questions.length)*2.2)));
 const score=Math.max(88,Math.min(138,Math.round(92 + accuracy*0.25 + speed*0.07)));
 const percentile=Math.max(30,Math.min(99,Math.round((score-70)*1.65)));
 const mins=Math.floor(elapsed/60), secs=String(elapsed%60).padStart(2,"0");
 CogniQi.setResult({score,percentile,accuracy,speed,time:`${mins}m ${secs}s`});
 localStorage.setItem("cogniqi_answers",JSON.stringify(answers));
 window.location.href="resultado.html";
}
setInterval(()=>{
 const s=Math.floor((Date.now()-started)/1000);
 timerEl.textContent=`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
},1000);
render();
