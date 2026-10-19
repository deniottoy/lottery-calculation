(()=>{
  'use strict';
  const button=document.getElementById('copy-starter-code');
  const code=document.getElementById('starter-code-content');
  const status=document.getElementById('starter-copy-status');
  if(!button||!code||!status)return;
  let timer;
  function legacyCopy(text){
    const input=document.createElement('textarea');
    input.value=text;
    input.setAttribute('readonly','');
    input.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';
    document.body.appendChild(input);
    try{input.select();return document.execCommand('copy');}
    finally{input.remove();button.focus({preventScroll:true});}
  }
  button.addEventListener('click',async()=>{
    clearTimeout(timer);
    const text=code.textContent;
    let copied=false;
    if(navigator.clipboard&&window.isSecureContext){
      try{await navigator.clipboard.writeText(text);copied=true;}catch{}
    }
    if(!copied){try{copied=legacyCopy(text);}catch{}}
    if(copied){
      button.textContent='Copied';
      status.textContent='Code copied. Paste it into your AI coding assistant.';
      timer=setTimeout(()=>{button.textContent='Copy code';status.textContent='';},3000);
    }else{
      button.textContent='Copy code';
      const details=code.closest('details');if(details)details.open=true;
      const range=document.createRange();range.selectNodeContents(code);
      const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
      status.textContent='Automatic copying is unavailable. The code is selected; press Ctrl+C or Command+C to copy.';
    }
  });
})();
