(()=>{
  'use strict';
  const process=document.querySelector('#experiment .ai-process');
  if(!process||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  process.classList.add('process-motion');
  const observer=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){
      process.classList.add('process-visible');
      observer.disconnect();
    }
  },{threshold:.15});
  observer.observe(process);
})();
