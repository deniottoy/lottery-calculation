(()=>{
 'use strict';
 const art=document.getElementById('balls');
 if(!art||!('IntersectionObserver' in window))return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const hover=matchMedia('(hover: hover) and (pointer: fine)');
 let visible=false,hovered=false;
 function update(){
  art.classList.toggle('first-art-motion',!reduced.matches);
  art.classList.toggle('art-playing',visible&&!document.hidden&&!reduced.matches&&(!hover.matches||hovered));
 }
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.target===art)visible=entry.isIntersecting;
  update();
 });
 observer.observe(art);
 art.addEventListener('pointerenter',event=>{if(event.pointerType==='touch')return;hovered=true;update();});
 art.addEventListener('pointerleave',()=>{hovered=false;update();});
 document.addEventListener('visibilitychange',update);
 for(const query of [reduced,hover]){
  if(query.addEventListener)query.addEventListener('change',update);
  else if(query.addListener)query.addListener(update);
 }
 update();
})();
