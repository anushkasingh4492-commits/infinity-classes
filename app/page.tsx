'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

const facts = [
  {n:'01',t:'Real teaching',d:'Small-batch classroom learning with faculty who know students by name.'},
  {n:'02',t:'Real tests',d:'Weekly chapter tests, monthly full-syllabus tests and pre-board mocks.'},
  {n:'03',t:'Real progress',d:'Attendance, performance and improvement are tracked and shared with parents.'},
  {n:'04',t:'Personal attention',d:'Doubt-solving and mentoring beyond the regular classroom.'},
]
const faqs = [
 ['What is the batch size?','Small batches are typically 15–20 students so every child can ask questions and receive personal attention.'],
 ['When are classes held?','Weekday batches generally run in the evening, with weekend morning options. Exact timings depend on class and section.'],
 ['Do students get study material?','Yes. Students receive printed Infinity study material, formula booklets and chapter-wise practice sheets designed in-house.'],
 ['How often are tests conducted?','Weekly chapter tests, monthly full-syllabus tests and pre-board mock exams. Results are shared with parents.'],
 ['Can my child attend before enrolling?','Yes. A prospective student can attend one full class free of charge, subject to scheduling.'],
 ['Are classes offline?','Currently batches are conducted offline at the Thane West campus, with digital resources and practice material shared as needed.'],
]

export default function Home(){
 const root=useRef<HTMLDivElement>(null); const [open,setOpen]=useState<number|null>(null); const [menu,setMenu]=useState(false)
 useEffect(()=>{
  if(!root.current)return
  const lenis=new Lenis({duration:1.15,smoothWheel:true})
  let raf=0; const loop=(t:number)=>{lenis.raf(t);ScrollTrigger.update();raf=requestAnimationFrame(loop)};raf=requestAnimationFrame(loop)
  const ctx=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el)=>gsap.fromTo(el,{y:70,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}}))
   gsap.to('.hero-orb',{yPercent:35,rotate:18,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}})
   gsap.to('.hero-photo',{yPercent:12,scale:1.08,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}})
   gsap.to('.marquee-track',{xPercent:-25,ease:'none',scrollTrigger:{trigger:'.marquee',start:'top bottom',end:'bottom top',scrub:1}})
   gsap.utils.toArray<HTMLElement>('.method-card').forEach((el,i)=>gsap.fromTo(el,{x:i%2?80:-80,opacity:0},{x:0,opacity:1,duration:1,scrollTrigger:{trigger:el,start:'top 80%'}}))
   gsap.fromTo('.number-pop',{scale:.4,opacity:0},{scale:1,opacity:1,duration:1.2,ease:'back.out(1.5)',scrollTrigger:{trigger:'.proof',start:'top 70%'}})
  },root); return()=>{ctx.revert();cancelAnimationFrame(raf);lenis.destroy()}
 },[])
 return <main ref={root}>
  <header className="nav"><a href="#top" className="brand"><span>∞</span><b>INFINITY</b><em>CLASSES</em></a><nav className={menu?'open':''}><a href="#story" onClick={()=>setMenu(false)}>About</a><a href="#courses" onClick={()=>setMenu(false)}>Courses</a><a href="#method" onClick={()=>setMenu(false)}>Method</a><a href="#results" onClick={()=>setMenu(false)}>Results</a><a href="#faq" onClick={()=>setMenu(false)}>FAQ</a></nav><a className="nav-cta" href="tel:8507530753">Talk to us ↗</a><button className="menu" onClick={()=>setMenu(!menu)}>{menu?'×':'☰'}</button></header>

  <section id="top" className="hero">
   <div className="hero-grid"/>
   <div className="hero-copy"><p className="eyebrow">THANE WEST · EST. 2020</p><h1>Where <span>excellence</span><br/> becomes a habit.</h1><p className="lede">Real teachers. Real tests. Real progress. A focused learning environment for students who want to understand deeply and perform confidently.</p><div className="hero-actions"><a className="button primary" href="#courses">Explore programs <i>↘</i></a><a className="button ghost" href="tel:8507930793">Call Infinity</a></div></div>
   <div className="hero-visual"><div className="hero-photo"><img src="/images/icl-star-performers.jpg" alt="Infinity Classes student achievement"/></div><div className="hero-orb"><span>∞</span></div><div className="hero-stamp">500+<small>students taught</small></div></div>
   <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
  </section>

  <section className="marquee"><div className="marquee-track">LEARN · PRACTICE · TEST · ANALYSE · IMPROVE · <b>INFINITY CLASSES</b> · LEARN · PRACTICE · TEST · ANALYSE · IMPROVE ·</div></section>

  <section id="story" className="intro section"><div className="section-kicker">01 / THE INFINITY IDEA</div><div className="intro-layout"><h2>Teaching that makes <span>progress visible.</span></h2><div><p className="big-copy">Infinity Classes is a coaching institute in Thane built on real teaching, real tests and real accountability — for every student and every parent.</p><p>Founded by <strong>Dr. Nikhil Arora</strong>, the institute combines traditional classroom discipline with modern tools so students learn better and parents can see the progress happening.</p></div></div></section>

  <section className="photo-break"><div className="photo-wrap"><img src="/images/icl-shining-stars.jpg" alt="Infinity Classes students"/><div className="photo-caption">DISCIPLINE COMPOUNDS.<br/><span>CONSISTENCY WINS.</span></div></div></section>

  <section id="method" className="method section"><div className="section-kicker">02 / THE METHOD</div><div className="method-head"><h2>Simple system.<br/><span>Serious results.</span></h2><p>We keep the process clear: teach deeply, test honestly, track transparently and intervene when a student needs help.</p></div><div className="method-grid">{facts.map(f=><article className="method-card" key={f.n}><small>{f.n}</small><h3>{f.t}</h3><p>{f.d}</p><span className="line"/></article>)}</div></section>

  <section className="proof section" id="results"><div className="proof-inner"><div className="section-kicker">03 / OUR REACH</div><div className="number-pop">500<span>+</span></div><h2>students taught<br/><i>since 2020.</i></h2><p>No inflated growth charts. Just a simple fact we stand behind: more than 500 students have learned with Infinity Classes.</p></div></section>

  <section id="courses" className="courses section"><div className="section-kicker">04 / PROGRAMS</div><h2>Choose your <span>path.</span></h2><div className="course-list"><article><div><small>01</small><h3>CBSE & ICSE</h3><p>Classes 8th to 10th · Strong academic foundation</p></div><b>↗</b></article><article><div><small>02</small><h3>SCIENCE · XI + XII</h3><p>Science stream with MHT CET · NEET · JEE Main preparation</p></div><b>↗</b></article></div><div className="course-note">Not sure which program fits? <a href="tel:8507930793">Talk to us →</a></div></section>

  <section className="loop section"><div className="loop-copy"><div className="section-kicker">05 / THE INFINITY LOOP</div><h2>Learn.<br/>Test.<br/><span>Improve.</span></h2><p>Every cycle gives students a clearer picture of what they know, what they need to practise and where to focus next.</p></div><div className="loop-ring"><div className="ring r1">LEARN</div><div className="ring r2">TEST</div><div className="ring r3">ANALYSE</div><div className="ring r4">IMPROVE</div><div className="ring-core">∞</div></div></section>

  <section className="principal section"><div className="principal-label">06 / FROM THE PRINCIPAL'S DESK</div><div className="principal-quote">“We believe students don't need more noise. They need clarity, consistency, attention and the confidence that comes from knowing exactly where they stand.”</div><div className="signature"><strong>Dr. Nikhil Arora</strong><span>Infinity Classes</span></div></section>

  <section className="experience section"><div className="section-kicker">07 / INSIDE INFINITY</div><div className="experience-grid"><div><h2>Small batches.<br/><span>Focused attention.</span></h2><p>Typically 15–20 students per batch. Weekday evening batches and weekend morning options are available depending on class and section.</p></div><div className="experience-points"><div><b>01</b><span>Weekly chapter tests</span></div><div><b>02</b><span>Monthly full-syllabus tests</span></div><div><b>03</b><span>Pre-board mock exams</span></div><div><b>04</b><span>Parent progress updates</span></div></div></div></section>

  <section id="faq" className="faq section"><div className="section-kicker">08 / QUESTIONS</div><h2>Everything parents<br/><span>want to know.</span></h2><div className="faq-list">{faqs.map((f,i)=><button key={i} className={'faq-row '+(open===i?'active':'')} onClick={()=>setOpen(open===i?null:i)}><span>0{i+1}</span><strong>{f[0]}</strong><i>{open===i?'−':'+'}</i>{open===i&&<p>{f[1]}</p>}</button>)}</div></section>

  <footer className="footer"><div className="footer-top"><div><a className="brand big" href="#top"><span>∞</span><b>INFINITY</b><em>CLASSES</em></a><p>Where excellence becomes a habit.</p></div><div className="contact"><small>VISIT / CALL</small><p>Infinity Classes, Kavya Hill View,<br/>Anand Nagar, Kavesar, Ghodbunder Road,<br/>Thane West, Thane 400615</p><a href="tel:8507930793">85-0793-0793</a><a href="tel:8507530753">85-0753-0753</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Infinity Classes</span><span>Thane West · Maharashtra</span><a href="#top">Back to top ↑</a></div></footer>
 </main>
}
