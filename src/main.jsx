import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useInView, animate } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X, ChevronDown, Music2, Sparkles, Hand } from 'lucide-react';
import { stories, years, achievement, courses, getCourse } from './data';
import './style.css';
const reveal = { initial:{opacity:0,y:26}, whileInView:{opacity:1,y:0}, viewport:{once:true,amount:.15}, transition:{duration:.6} };
function App(){
 const [page,setPage]=useState(1),[filter,setFilter]=useState('all'),[selected,setSelected]=useState(null),[year,setYear]=useState(2026);
 const filterRef=useRef(null);
 const filterWrapRef=useRef(null);
 const filtersInView=useInView(filterWrapRef,{once:true,amount:.7});
 const [swipeHintDismissed,setSwipeHintDismissed]=useState(false);
 const [canScrollCourses,setCanScrollCourses]=useState(false);
 useEffect(()=>{
  if(!filtersInView||!canScrollCourses||swipeHintDismissed)return;
  const timeout=setTimeout(()=>setSwipeHintDismissed(true),4500);
  return()=>clearTimeout(timeout);
 },[filtersInView,canScrollCourses,swipeHintDismissed]);

 useEffect(()=>{
  const el=filterRef.current;
  if(!el)return;
  const update=()=>setCanScrollCourses(el.scrollWidth-el.clientWidth-el.scrollLeft>4);
  update();
  el.addEventListener('scroll',update,{passive:true});
  const observer=new ResizeObserver(update);
  observer.observe(el);
  for(const child of el.children)observer.observe(child);
  document.fonts.ready.then(update);
  return()=>{el.removeEventListener('scroll',update);observer.disconnect()};
 },[year]);
 const reduced=useReducedMotion(); const {scrollY}=useScroll(); const y=useTransform(scrollY,[0,700],[0,reduced?0:120]);
 const closeRef=useRef(null), previousFocus=useRef(null);
 useEffect(()=>{if(!selected)return; previousFocus.current=document.activeElement; const old=document.body.style.overflow;document.body.style.overflow='hidden';closeRef.current?.focus();function key(e){if(e.key==='Escape')setSelected(null);if(e.key==='Tab'){const els=document.querySelectorAll('.modal button'); const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}document.addEventListener('keydown',key);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',key);previousFocus.current?.focus()}},[selected]);
 const visible=stories.filter(s=>s.year===year&&(filter==='all'||getCourse(s.course).id===filter));

 const [pageSize,setPageSize]=useState(()=>window.matchMedia('(max-width: 760px)').matches?6:9);
 useEffect(()=>{
  const media=window.matchMedia('(max-width: 760px)');
  const update=()=>{setPageSize(media.matches?6:9);setPage(1)};
  media.addEventListener('change',update);
  return()=>media.removeEventListener('change',update);
 },[]);
 const pageCount=Math.ceil(visible.length/pageSize);
 const currentPage=Math.min(page,Math.max(1,pageCount));
 const pageStories=visible.slice((currentPage-1)*pageSize,currentPage*pageSize);
 const changePage=next=>{
  setPage(next);
  document.getElementById('story-results')?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
 };

 return <><a className="skip" href="#stories">ストーリーへ進む</a>
 <main><section className="hero" id="about"><a className="hero-brand logo-crop" href="#" aria-label="JOY MUSIC SCHOOL"><img src={`${import.meta.env.BASE_URL}joy-logo.png`} alt="JOY MUSIC SCHOOL"/></a><div className="hero-grid"/><Confetti/><motion.div className="orb orb-one" style={{y}}/><div className="orb orb-two"/><div className="hero-center"><motion.div {...reveal}><p className="eyebrow"><span/> SPECIAL STORIES 2026</p><p className="hero-script">仲間と一緒に、一歩ずつ。</p><h1><span>みんなの</span><strong>「<i>で</i><i>き</i><i>た</i><i>！</i>」</strong></h1><div className="underline"/><h2>その一歩が、<br className="mobile"/>あなただけのストーリー。</h2><p className="hero-copy">はじめて歌えた。あの曲が弾けた。自分の曲ができた。<br/>小さな勇気から生まれた、たくさんの「できた！」。<br/>音楽を楽しむ仲間たちの、成長の瞬間をのぞいてみよう。</p><a className="primary" href="#stories">みんなの「できた！」を見る <ArrowRight size={19}/></a></motion.div><a className="scroll" href="#participation">SCROLL TO DISCOVER <span>↓</span></a></div>
 {[stories[0],stories[1],stories[2],stories[3]].map((s,i)=><motion.button key={s.id} className={`floating speech-bubble floating-${i}`} initial={{opacity:0,y:30,rotate:0}} animate={{opacity:1,y:reduced?0:[0,-13,0],rotate:[-9,7,-5,9][i]}} transition={{opacity:{duration:.6,delay:i*.15},y:{duration:5+i,repeat:Infinity,ease:'easeInOut'}}} onClick={()=>setSelected(s)} aria-label={`${s.name}さんのストーリーを見る`}><p>{['憧れの高音、出せた！','大好きな曲が弾けた！','はじめての曲、完成！','歌声を届けられた！'][i]}</p><span className="bubble-sparkle" aria-hidden="true">✦</span></motion.button>)}<div className="hero-glitter" aria-hidden="true"><span>✧</span><span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span></div><span className="hero-star star-a">✧</span><span className="hero-star star-b">✦</span><span className="hero-note">♫</span><div className="hero-bottom">EVERY LITTLE STEP, A NEW STORY.</div></section>
 <section className="participation" id="participation"><motion.div className="stat-panel" {...reveal}><div className="stat-left"><span className="pill">2026 CHALLENGE</span><h2>やってみたい！が<br/>こんなに集まりました。</h2><p>一人ひとりの目標から、音楽の物語がはじまる。</p></div><div className="stat-number"><span>2026年の目標投稿者</span><p><strong><CountUp value={years.find(y=>y.year===2026).participants}/></strong><b>名</b><Sparkles/></p><small>一歩を踏み出した、音楽を楽しむ仲間たち</small></div></motion.div><AchievementProgress/></section>
 <section className="stories section" id="stories"><motion.div className="section-heading" {...reveal}><div><p className="eyebrow pink">STUDENT STORIES</p><h2>一人ひとりに、<br/>とっておきの<span>「できた！」</span></h2><p>大きな一歩も、小さな一歩も。あなたの次の挑戦のヒントに。</p></div><YearPicker year={year} onChange={value=>{setYear(value);setFilter('all');setPage(1)}}/></motion.div><div className="course-filter-wrap" ref={filterWrapRef}><div className="filters" ref={filterRef} onScroll={()=>setSwipeHintDismissed(true)} aria-label="コースで絞り込み">{courses.filter(c=>c.id!=='unassigned'||stories.some(s=>s.year===year&&getCourse(s.course).id==='unassigned')).map(c=><button key={c.id} className={filter===c.id?'active':''} style={{'--course':c.color}} aria-pressed={filter===c.id} onClick={()=>{setFilter(c.id);setPage(1)}}><span aria-hidden="true">{c.icon}</span>{c.name}</button>)}</div><AnimatePresence>{canScrollCourses&&!swipeHintDismissed&&<motion.button className="swipe-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.3}} onClick={()=>setSwipeHintDismissed(true)} onTouchStart={()=>setSwipeHintDismissed(true)} onWheel={()=>setSwipeHintDismissed(true)} aria-label="横にスクロールできます。案内を閉じる"><span>横にスクロールできます</span><span className="swipe-diagram" aria-hidden="true"><span className="swipe-bidirectional"/><Hand className="overlay-hand" size={36} strokeWidth={2}/></span></motion.button>}</AnimatePresence></div><p id="story-results" className="story-list-note" aria-live="polite">{visible.length} STORIES {visible.length>0&&<span> · {(currentPage-1)*pageSize+1}–{Math.min(currentPage*pageSize,visible.length)}件を表示</span>} </p><motion.div layout className="story-grid"><AnimatePresence mode="popLayout">{pageStories.map(s=><motion.button layout {...reveal} exit={{opacity:0,scale:.95}} key={s.id} className="story-card text-story" onClick={()=>setSelected(s)}><div className="character-heading"><Character id={s.id}/><div><p className="story-meta">{s.name}さん</p><span className={'report-state '+(s.report?'reported':'')}>{s.report?'できた！の報告':'目標に向かって'}</span></div><span className="text-story-star" aria-hidden="true">✧</span></div><div className="story-content"><CourseTag course={s.course}/><span className="field-label">わたしの目標</span><h3>{s.goal}</h3><div className="report-excerpt"><span className="field-label">できた！の報告</span><p>{s.report||'どんな「できた！」が生まれるか、これからのお楽しみ。'}</p></div><div className="card-bottom"><span><span className="desktop-detail-label">もっと見る</span><span className="mobile-detail-label">もっと見る</span><ArrowUpRight size={20}/></span></div></div></motion.button>)}</AnimatePresence></motion.div>{visible.length===0&&<p className="no-stories">この年度・コースのストーリーは、まだありません。</p>}{pageCount>0&&<nav className="pagination" aria-label="ストーリーのページ切り替え"><button disabled={currentPage===1} onClick={()=>changePage(currentPage-1)} aria-label="前のページ">←</button>{Array.from({length:pageCount},(_,i)=><button key={i+1} aria-label={`${i+1}ページ目`} aria-current={currentPage===i+1?'page':undefined} onClick={()=>changePage(i+1)}>{i+1}</button>)}<button disabled={currentPage===pageCount} onClick={()=>changePage(currentPage+1)} aria-label="次のページ">→</button></nav>}<p className="stories-caption">ひとつとして同じじゃない。それぞれのペースで、それぞれの音楽を。 <Music2 size={18}/></p></section>
 <section className="closing"><Confetti/><motion.div {...reveal}><p className="eyebrow">YOUR NEXT CHAPTER</p><h2>次の「できた！」は、<br/><span>あなたの番。</span></h2><p>うまくいく日も、ちょっとつまずく日も。<br/>楽しむ気持ちが、きっと次の一歩になる。</p><a className="primary" href="#stories">仲間のストーリーから、ヒントを見つける <ArrowRight size={18}/></a></motion.div></section></main><footer><a className="logo-crop footer-brand" href="#" aria-label="JOY MUSIC SCHOOL"><img src={`${import.meta.env.BASE_URL}joy-logo.png`} alt="JOY MUSIC SCHOOL"/></a><p><span className="footer-project-name">#「できた！」プロジェクト</span><span className="footer-copyright">© JOY MUSIC SCHOOL</span></p><a href="#">BACK TO TOP ↑</a></footer>
 <AnimatePresence>{selected&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.article className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{y:25,scale:.97}} animate={{y:0,scale:1}} exit={{y:25,opacity:0}} onClick={e=>e.stopPropagation()}><button className="close" aria-label="詳細を閉じる" ref={closeRef} onClick={()=>setSelected(null)}><X/></button><div className="modal-body"><div className="modal-character"><Character id={selected.id}/><div><p className="eyebrow pink">STORY / {selected.year}</p><h2 id="modal-title">{selected.name}さんのストーリー</h2></div></div><CourseTag course={selected.course}/><div className="goal"><Sparkles size={20}/><div><small>わたしの目標</small><p>{selected.goal}</p></div></div><h3>できた！の報告</h3><p>{selected.report||'達成報告は、まだ届いていません。自分のペースで、目標に向かって。'}</p><div className="modal-end"><span>あなたのペースで、次の一歩へ。</span><button onClick={()=>setSelected(null)}>ストーリー一覧に戻る <ArrowRight size={16}/></button></div></div></motion.article></motion.div>}</AnimatePresence></>
}
function YearPicker({year,onChange}){
 const ref=useRef(null);
 const [open,setOpen]=useState(false);
 useEffect(()=>{
  if(!open)return;
  const outside=e=>{if(!ref.current?.contains(e.target))setOpen(false)};
  document.addEventListener('pointerdown',outside);
  return()=>document.removeEventListener('pointerdown',outside);
 },[open]);
 return <div className="year-picker" ref={ref} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false)}} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);ref.current?.querySelector('.year-trigger').focus()}}}>
 <button className="year-trigger" aria-label={`年度を選択：${year}年`} aria-expanded={open} aria-controls="year-options" onClick={()=>setOpen(!open)}><span className="year-caption">YEAR</span><span>{year}</span><ChevronDown size={16} style={{transform:open?'rotate(180deg)':undefined}}/></button>
 {open&&<div id="year-options" className="year-options" aria-label="年度">{years.map(y=><button key={y.year} aria-pressed={year===y.year} onClick={()=>{onChange(y.year);setOpen(false);ref.current?.querySelector('.year-trigger').focus()}}>{y.year}年 <span aria-hidden="true">{year===y.year?'✓':''}</span></button>)}</div>}
 </div>
}
function CountUp({value,onComplete}){
 const ref=useRef(null);
 const completeRef=useRef(onComplete);
 completeRef.current=onComplete;
 const inView=useInView(ref,{once:true,amount:.5});
 const reduced=useReducedMotion();
 const [display,setDisplay]=useState(0);
 useEffect(()=>{
  if(!inView)return;
  if(reduced){completeRef.current?.();return;}
  const controls=animate(0,value,{duration:1.2,ease:'easeOut',onUpdate:latest=>setDisplay(Math.round(latest)),onComplete:()=>completeRef.current?.()});
  return()=>controls.stop();
 },[inView,value,reduced]);
 return <span ref={ref} className="count-up" role="img" aria-label={String(value)}><span aria-hidden="true">{reduced?value:display}</span></span>;
}
function CourseTag({course}){
 const c=getCourse(course);
 return <span className="story-course-label" style={{'--tag-color':c.color}}><span aria-hidden="true">{c.icon}</span> {c.name}</span>
}
function Character({id}){
 const colors=['#ffb5d2','#99def3','#a9e6c8','#cdb8f5','#ffd28e','#b5d8ff'];
 return <span className="character-avatar" aria-hidden="true" style={{'--avatar':colors[(id-1)%colors.length]}}><svg viewBox="0 0 100 100" fill="none"><path d={id%2?'M22 64C8 41 23 17 44 23C69 7 91 37 79 58C89 82 55 94 40 79C26 85 13 75 22 64Z':'M23 34L27 17L42 29C51 26 58 27 64 29L80 20L78 42C95 73 70 88 50 85C23 88 9 60 23 34Z'} fill="var(--avatar)"/><ellipse cx="37" cy="51" rx="3" ry="4" fill="#203054"/><ellipse cx="63" cy="51" rx="3" ry="4" fill="#203054"/><path d="M42 62Q50 71 59 61" stroke="#203054" strokeWidth="3" strokeLinecap="round"/><ellipse cx="29" cy="61" rx="6" ry="3" fill="#f18daf" opacity=".65"/><ellipse cx="72" cy="61" rx="6" ry="3" fill="#f18daf" opacity=".65"/>{id%3===0&&<path d="M42 26L50 12L57 26" stroke="#203054" strokeWidth="3" strokeLinecap="round"/>}</svg></span>
}
function AchievementProgress(){
 const total=years.find(y=>y.year===achievement.year)?.participants ?? 121;
 const count=Number.isInteger(achievement.reportedCount)?Math.max(0,Math.min(total,achievement.reportedCount)):null;
 const percent=count===null?0:Math.round(count/total*100);
 const reduced=useReducedMotion();
 const [countFinished,setCountFinished]=useState(false);
 return <motion.div className="achievement-panel" {...reveal}>
  <div className="achievement-heading"><p className="eyebrow pink">OUR LITTLE VICTORIES</p><h2>みんなの「できた！」<br/>をひと目で。</h2><p>目標を投稿した{total}名のうち、達成の報告を届けてくれた生徒さま。</p></div>
  <div className="achievement-layout"><div className="achievement-chart"><div className="chart-sparkles" aria-hidden="true"><span>✧</span><span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span></div><div className="donut" role="img" aria-label={`目標投稿者${total}名のうち達成報告${count===null?'集計中':count+'名、'+percent+'パーセント'}`}><svg viewBox="0 0 200 200" aria-hidden="true"><circle className="donut-track" cx="100" cy="100" r="84"/><motion.circle className="donut-value" cx="100" cy="100" r="84" pathLength="100" strokeDasharray="100" initial={{strokeDashoffset:100}} whileInView={{strokeDashoffset:100-percent}} viewport={{once:true}} transition={{duration:reduced?0:1.2,ease:'easeOut'}}/></svg><div className="donut-label"><span>達成報告</span><p><strong>{count===null?'—':<CountUp value={count} onComplete={()=>setCountFinished(true)}/>}</strong><b>名</b></p><small>{count===null?'集計中':`目標投稿者 ${total}名のうち`}</small></div></div><div className="achievement-legend"><motion.span initial={{opacity:0,y:12}} animate={{opacity:reduced||count===null||countFinished?1:0,y:reduced||count===null||countFinished?0:12}} transition={{duration:reduced?0:.55,ease:'easeOut'}}><i/>{count===null?'集計中':<>達成報告 {percent}%</>}</motion.span><small>※未報告の方を「未達成」とするものではありません。</small></div></div>
  </div>
 </motion.div>
}
function Confetti(){return <div className="confetti" aria-hidden="true">{Array.from({length:34},(_,i)=><i key={i} style={{left:`${(i*37)%100}%`,top:`${(i*23)%96}%`,background:['#ff729f','#ffd45c','#4bd4de','#a892f0','#ff9b69'][i%5],transform:`rotate(${i*31}deg)`,animationDelay:`-${i*.4}s`,width:i%3===0?7:5,height:i%3===0?15:7}}/>)}</div>}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
