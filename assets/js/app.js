
window.CogniQi = {
  getResult(){
    const fallback = {score:117,percentile:86,accuracy:78,speed:81,time:"11m 35s"};
    try{
      const saved = JSON.parse(localStorage.getItem("cogniqi_result") || "null");
      return saved || fallback;
    }catch(e){return fallback;}
  },
  setResult(result){ localStorage.setItem("cogniqi_result", JSON.stringify(result)); },
  reset(){ localStorage.removeItem("cogniqi_result"); localStorage.removeItem("cogniqi_answers"); },
  fillResult(){
    const r=this.getResult();
    document.querySelectorAll("[data-score]").forEach(el=>el.textContent=r.score);
    document.querySelectorAll("[data-percentile]").forEach(el=>el.textContent=r.percentile+"%");
    document.querySelectorAll("[data-accuracy]").forEach(el=>el.textContent=r.accuracy+"%");
    document.querySelectorAll("[data-speed]").forEach(el=>el.textContent=r.speed+"%");
    document.querySelectorAll("[data-time]").forEach(el=>el.textContent=r.time);
  }
};
document.addEventListener("DOMContentLoaded",()=>CogniQi.fillResult());
