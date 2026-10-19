(()=>{
'use strict';
if(!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
const zones=[document.documentElement];
if(!zones.length)return;
const cursor=document.createElement('div');cursor.className='lottery-cursor';cursor.setAttribute('aria-hidden','true');cursor.innerHTML='<div class="lottery-cursor-ball"><span>1</span></div>';document.body.append(cursor);
const ball=cursor.firstElementChild;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastX,lastY,angle=0,shownAngle=0,spinFrame=0,lastScroll=window.scrollY;
const spinningNumber=cursor.querySelector('span');
function spin(amount){if(reduced)return;angle+=amount;if(spinFrame)return;function animate(){const delta=angle-shownAngle;shownAngle+=delta*.16;spinningNumber.style.transform=`rotate(${shownAngle}deg)`;if(Math.abs(delta)>.1)spinFrame=requestAnimationFrame(animate);else{shownAngle=angle;spinningNumber.style.transform=`rotate(${angle}deg)`;spinFrame=0}}spinFrame=requestAnimationFrame(animate)}
function hide(){cursor.classList.remove('visible','pressed');lastX=lastY=undefined}
for(const zone of zones){zone.classList.add('lottery-cursor-zone');zone.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;if(lastX!==undefined&&!reduced){spin(Math.hypot(e.clientX-lastX,e.clientY-lastY)*4)}lastX=e.clientX;lastY=e.clientY;cursor.classList.add('visible');cursor.classList.toggle('over-button',!!e.target.closest('button,a,input,[role="button"]'))});zone.addEventListener('pointerleave',hide);zone.addEventListener('pointerdown',()=>cursor.classList.add('pressed'))}
window.addEventListener('pointerup',()=>cursor.classList.remove('pressed'));window.addEventListener('blur',hide);const slides=[...document.querySelectorAll('main>section')];
const numeral=cursor.querySelector('span');
let scrollFrame=0;
function updateNumber(){scrollFrame=0;const focus=window.innerHeight*.45;let index=0;for(let i=0;i<slides.length;i++){if(slides[i].getBoundingClientRect().top<=focus)index=i;else break}numeral.textContent=String(index+1)}
window.addEventListener('scroll',()=>{const delta=window.scrollY-lastScroll;lastScroll=window.scrollY;spin(delta*.9);if(!scrollFrame)scrollFrame=requestAnimationFrame(updateNumber)},{passive:true});
window.addEventListener('resize',updateNumber,{passive:true});
updateNumber();
})();
