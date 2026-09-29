document.addEventListener("DOMContentLoaded",()=>{
  const buttons=document.querySelectorAll("[data-lang]");
  const trans=document.querySelectorAll("[data-en][data-bg]");
  function setLang(lang){
    trans.forEach(el=>el.textContent=el.dataset[lang]);
    document.documentElement.lang=lang==="bg"?"bg":"en";
    buttons.forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
    localStorage.setItem("portfolio-language",lang);
  }
  buttons.forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
  setLang(localStorage.getItem("portfolio-language")||"en");

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const t=document.querySelector(a.getAttribute("href"));
    if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"})}
  }));

  document.querySelectorAll(".gallery-item img").forEach(img=>{
    img.addEventListener("error",()=>{
      img.style.display="none";
      const s=img.parentElement.querySelector("span");
      if(s)s.style.display="flex";
    });
  });

  const lb=document.getElementById("lightbox");
  const lbi=document.getElementById("lightbox-image");
  document.querySelectorAll(".gallery-item").forEach(btn=>btn.addEventListener("click",()=>{
    const img=btn.querySelector("img");
    if(!img || img.style.display==="none") return;
    lbi.src=btn.dataset.full;
    lb.classList.add("open");
    lb.setAttribute("aria-hidden","false");
  }));
  function close(){
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden","true");
    lbi.src="";
  }
  document.querySelector(".lightbox-close").addEventListener("click",close);
  lb.addEventListener("click",e=>{if(e.target===lb)close()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
});
