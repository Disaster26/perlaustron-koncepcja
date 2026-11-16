(function(){
var d=document,hd=d.getElementById('hd'),b=d.body;
function sc(){hd.classList.toggle('on',scrollY>40)}
addEventListener('scroll',sc,{passive:true});requestAnimationFrame(sc);
var bg=d.getElementById('burger');
bg.addEventListener('click',function(){var o=b.classList.toggle('menu-open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
d.querySelectorAll('#menu a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('menu-open');bg.setAttribute('aria-expanded','false')})});
d.getElementById('rok').textContent=new Date().getFullYear();

/* galeria */
var G=[[1,'Salon z aneksem'],[2,'Sypialnia z kuchnią'],[3,'Sypialnia'],[4,'Łazienka'],[5,'Pokój dzienny'],[6,'Sypialnia'],[7,'Pokój z balkonem'],[8,'Apartament z aneksem'],[9,'Łazienka z prysznicem'],[10,'Sypialnia i aneks'],[11,'Pokój dzienny'],[17,'Balkon']];
var gal=d.getElementById('gal'),L=[];
G.forEach(function(e,i){var t=e[1],n='g'+(e[0]<10?'0':'')+e[0];L.push({s:'img/'+n+'-l.webp',t:t});
 var bt=d.createElement('button');bt.type='button';bt.setAttribute('aria-label','Powiększ: '+t);bt.dataset.i=i;
 bt.innerHTML='<img src="img/'+n+'-t.webp" srcset="img/'+n+'-t280.webp 280w, img/'+n+'-t360.webp 360w, img/'+n+'-t.webp 560w" sizes="(min-width:1800px) 15vw, (min-width:640px) 23vw, 31vw" width="560" height="560" alt="'+t+'" loading="lazy" decoding="async">';gal.appendChild(bt)});
var O=[].slice.call(d.querySelectorAll('#pas [data-lb]')).map(function(x){return{s:'img/'+x.dataset.lb+'-l.webp',t:x.parentNode.querySelector('figcaption').textContent}});

/* lightbox */
var lb=d.getElementById('lb'),li=d.getElementById('lbi'),lc=d.getElementById('lbc'),set=L,ix=0,last;
function show(){li.src=set[ix].s;li.alt=set[ix].t;lc.textContent=set[ix].t+'  '+(ix+1)+' / '+set.length}
function open(s,i){set=s;ix=i;last=d.activeElement;show();lb.classList.add('on');b.style.overflow='hidden';lb.querySelector('.x').focus()}
function close(){lb.classList.remove('on');b.style.overflow='';if(last)last.focus()}
function mv(k){ix=(ix+k+set.length)%set.length;show()}
gal.addEventListener('click',function(e){var t=e.target.closest('button');if(t)open(L,+t.dataset.i)});
lb.querySelector('.x').onclick=close;lb.querySelector('.p').onclick=function(){mv(-1)};lb.querySelector('.n').onclick=function(){mv(1)};
lb.addEventListener('click',function(e){if(e.target===lb)close()});
addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')mv(-1);if(e.key==='ArrowRight')mv(1)});
var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){if(tx===null)return;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40)mv(dx<0?1:-1);tx=null});

/* pas okolicy: przeciaganie mysza + strzalki */
var p=d.getElementById('pas'),down=false,sx=0,sl=0,moved=false;
p.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=p.scrollLeft});
addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;p.classList.add('drag')}p.scrollLeft=sl-dx});
addEventListener('pointerup',function(){if(!down)return;down=false;p.classList.remove('drag')});
p.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;return}var t=e.target.closest('[data-lb]');if(t){var all=[].slice.call(p.querySelectorAll('[data-lb]'));open(O,all.indexOf(t))}},true);
function step(k){var f=p.querySelector('figure');p.scrollBy({left:k*(f.offsetWidth+16),behavior:'smooth'})}
d.getElementById('pl').onclick=function(){step(-1)};d.getElementById('pp').onclick=function(){step(1)};

/* mapa przy przewinieciu */
var m=d.getElementById('mapa');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();var f=d.createElement('iframe');f.src=m.dataset.src;f.title='Mapa dojazdu: ul. Marii Konopnickiej 2, Ustroń';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f)}},{rootMargin:'300px'});io.observe(m)}

/* formularz pokazowy */
var fm=d.getElementById('form');
fm.addEventListener('submit',function(e){e.preventDefault();var ok=true;
 fm.querySelectorAll('[required]').forEach(function(x){var v=x.value.trim();var bad=!v||(x.type==='email'&&!/^\S+@\S+\.\S+$/.test(v));x.style.borderColor=bad?'#C0392B':'';if(bad&&ok){x.focus();ok=false}});
 if(!ok)return;var o=d.getElementById('ok');o.hidden=false;o.scrollIntoView({block:'nearest',behavior:'smooth'});fm.reset()});
})();
