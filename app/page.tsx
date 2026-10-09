'use client'



import { useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Lenis from '@studio-freight/lenis'



gsap.registerPlugin(ScrollTrigger)



const pillars = [

  { number: '01', title: 'Understand', copy: 'Build concepts that make sense beyond the textbook.', symbol: '◉' },

  { number: '02', title: 'Practise', copy: 'Turn understanding into confidence with focused practice.', symbol: '↗' },

  { number: '03', title: 'Measure', copy: 'Use regular tests to see what is working and what needs attention.', symbol: '⌁' },

  { number: '04', title: 'Improve', copy: 'Make the next study session smarter than the last.', symbol: '✳' },

]



const faqs = [

  ['Which classes do you teach?', 'We teach CBSE and ICSE students from Classes 8 to 10, and Science students in Classes 11 and 12.'],

  ['Do you prepare students for entrance exams?', 'Yes. The Science programme includes preparation for MHT CET, NEET and JEE Main.'],

  ['How do you track progress?', 'Students practise through regular chapter tests, full-syllabus tests and pre-board mocks. Progress is reviewed so that learning gaps can be addressed.'],

  ['Where is Infinity Classes located?', 'We are at Kavya Hill View, Anand Nagar, Kavesar, Ghodbunder Road, Thane West, Thane 400615.'],

]



export default function Home() {

  const root = useRef<HTMLElement>(null)

  const [open, setOpen] = useState<number | null>(0)

  const [menu, setMenu] = useState(false)

  const [scrollProgress, setScrollProgress] = useState(0)



  useEffect(() => {

    const update = () => {

      const max = document.documentElement.scrollHeight - window.innerHeight

      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0)

    }

    update()

    window.addEventListener('scroll', update, { passive: true })

    window.addEventListener('resize', update)

    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }

  }, [])



  useEffect(() => {

    if (!root.current) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = reduceMotion ? null : new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.9 })

    let raf = 0

    const loop = (time: number) => {

      lenis?.raf(time)

      ScrollTrigger.update()

      raf = requestAnimationFrame(loop)

    }

    if (lenis) raf = requestAnimationFrame(loop)



    const ctx = gsap.context(() => {

      if (!reduceMotion) {

        gsap.from('.hero-kicker', { y: 20, opacity: 0, duration: .7, delay: .1, ease: 'power3.out' })

        gsap.from('.hero-title-line', { yPercent: 115, rotate: 2, opacity: 0, stagger: .13, duration: 1.1, delay: .15, ease: 'power4.out' })

        gsap.from('.hero-bottom > *', { y: 24, opacity: 0, stagger: .12, duration: .8, delay: .55, ease: 'power3.out' })

        gsap.from('.hero-art-card', { y: 70, rotate: 7, opacity: 0, duration: 1.25, delay: .3, ease: 'power3.out' })

        gsap.to('.hero-sun', { rotate: 360, duration: 40, repeat: -1, ease: 'none' })

        gsap.to('.hero-doodle', { y: -24, rotate: 8, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' })

        gsap.to('.hero-art-card', { yPercent: 12, rotate: -1, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })

        gsap.to('.ticker-track', { xPercent: -25, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 1 } })

        gsap.to('.orbit-graphic', { rotate: 24, ease: 'none', scrollTrigger: { trigger: '.learning-loop', start: 'top bottom', end: 'bottom top', scrub: 1.3 } })

      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {

        gsap.fromTo(el, { y: reduceMotion ? 0 : 44, opacity: reduceMotion ? 1 : 0 }, {

          y: 0, opacity: 1, duration: .85, ease: 'power3.out',

          scrollTrigger: { trigger: el, start: 'top 86%', once: true },

        })

      })

      gsap.utils.toArray<HTMLElement>('.pillar-card').forEach((el, i) => {

        gsap.fromTo(el, { y: reduceMotion ? 0 : 35, opacity: reduceMotion ? 1 : 0 }, {

          y: 0, opacity: 1, duration: .75, delay: i * .09, ease: 'power3.out',

          scrollTrigger: { trigger: '.pillar-grid', start: 'top 78%', once: true },

        })

      })

      gsap.fromTo('.stat-number', { scale: reduceMotion ? 1 : .72, opacity: reduceMotion ? 1 : 0 }, {

        scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.5)',

        scrollTrigger: { trigger: '.impact', start: 'top 72%', once: true },

      })

    }, root)



    return () => { ctx.revert(); cancelAnimationFrame(raf); lenis?.destroy() }

  }, [])



  return <main ref={root}>

    <div className="reading-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>

    <div className="color-ribbon" aria-hidden="true"><span /><span /><span /><span /><span /></div>

    <header className="site-nav">

      <a className="brand" href="#top" aria-label="Infinity Classes home"><img className="brand-logo-image" src="/images/infinity-classes-logo.png" alt="Infinity Classes — Where excellence becomes a habit" /></a>

      <nav className={menu ? 'nav-links is-open' : 'nav-links'}>

        <a href="#approach" onClick={() => setMenu(false)}>Our approach</a><a href="/courses" onClick={() => setMenu(false)}>Courses</a><a href="/results" onClick={() => setMenu(false)}>Achievements</a><a href="/about" onClick={() => setMenu(false)}>About</a><a href="/contact" onClick={() => setMenu(false)}>Contact</a>

      </nav>

      <a className="nav-contact" href="tel:8507930793">Let’s talk <span>↗</span></a>

      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? '×' : '☰'}</button>

    </header>



    <section className="hero" id="top">

      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-copy">

        <div className="hero-kicker"><span className="live-dot" /> THANE WEST <i /> EST. 2020</div>

        <h1><span className="hero-title-mask"><span className="hero-title-line">Building better</span></span><span className="hero-title-mask"><span className="hero-title-line title-serif">learners.</span></span><span className="hero-title-mask"><span className="hero-title-line">Building better</span></span><span className="hero-title-mask"><span className="hero-title-line title-outline">results<span className="period">.</span></span></span></h1>

        <div className="hero-bottom"><p>Good learning is not a shortcut. It’s a system — built on strong concepts, focused practice and the confidence to keep going.</p><a className="round-link" href="#approach" aria-label="Explore our approach"><span>Explore<br/>Infinity</span><b>↘</b></a></div>

      </div>

      <div className="hero-art" aria-label="Infinity Classes student achievement highlights">

        <div className="hero-sun"><span>LEARN · GROW · REPEAT · </span><b>✳</b></div>

        <div className="hero-doodle">✳</div>

        <div className="hero-art-card"><div className="art-card-top"><span>THE INFINITY MINDSET</span><span>01 — 04</span></div><div className="art-card-image"><img src="/images/icl-star-performers.jpg" alt="Infinity Classes student achievement highlights" /></div><div className="art-card-bottom"><strong>Effort becomes progress.</strong><span>Every student. Every step.</span></div></div>

        <div className="floating-note"><span className="note-icon">↗</span><div><b>500+</b><small>students taught</small></div></div>

        <div className="hero-index">01 <span>/</span> 04</div>

      </div>

      <a className="scroll-cue" href="#approach"><span className="scroll-line" /> SCROLL TO DISCOVER</a>

    </section>



    <section className="ticker" aria-label="Our learning values"><div className="ticker-track">CONCEPTS FIRST <span>✳</span> PRACTISE WITH PURPOSE <span>✳</span> PROGRESS THAT SHOWS <span>✳</span> CONFIDENCE FOR LIFE <span>✳</span> CONCEPTS FIRST <span>✳</span> PRACTISE WITH PURPOSE <span>✳</span></div></section>



    <section className="manifesto section-pad" id="approach">

      <div className="section-label" data-reveal><span>01</span> / THE INFINITY APPROACH</div>

      <div className="manifesto-grid"><h2 data-reveal>Not just more<br/>study. <em>Better</em><br/><em>learning.</em></h2><div className="manifesto-copy" data-reveal><div className="asterisk">✳</div><p className="manifesto-lead">We make progress feel possible — by turning big goals into clear, consistent steps.</p><p>Founded by <strong>Dr. Nikhil Arora</strong>, Infinity Classes brings focused classroom teaching and a practical testing rhythm together, so students can understand what they learn and recognise where they can grow.</p><a className="text-link" href="#programmes">Find your learning path <span>↗</span></a></div></div>

      <div className="manifesto-bottom" data-reveal><span>CURIOUS MINDS. CLEAR DIRECTION.</span><span>THANE · MAHARASHTRA</span></div>

    </section>



    <section className="proof-gallery">

      <div className="gallery-copy" data-reveal><span className="pill-label">PROGRESS IN PRACTICE</span><h2>Small steps.<br/><em>Big shifts.</em></h2><p>Progress looks different for every learner. We celebrate the effort, the improvement and the moment a difficult concept finally clicks.</p></div>

      <div className="gallery-board" data-reveal><div className="board-label"><span>THE PROGRESS BOARD</span><span>INFINITY / 2026</span></div><div className="board-photo"><img src="/images/icl-shining-stars.jpg" alt="Infinity Classes student progress highlights" /></div><div className="board-foot"><span>EFFORT, MADE VISIBLE.</span><span>↗ KEEP GOING</span></div><div className="board-sticker">YOUR<br/>NEXT<br/><em>LEVEL</em><b>✳</b></div></div>

    </section>



    <section className="method section-pad">

      <div className="section-label" data-reveal><span>02</span> / HOW WE HELP STUDENTS GROW</div>

      <div className="method-heading" data-reveal><h2>A rhythm that<br/><em>builds results.</em></h2><p>Learning works best when every step has a purpose. We help students move from understanding to action — and from action to improvement.</p></div>

      <div className="pillar-grid">{pillars.map((p) => <article className="pillar-card" key={p.number}><div className="pillar-top"><span>{p.number} / 04</span><b>{p.symbol}</b></div><h3>{p.title}</h3><p>{p.copy}</p><div className="pillar-bottom"><span>INFINITY METHOD</span><i>↗</i></div></article>)}</div>

    </section>



    <section className="impact section-pad" id="impact"><div className="impact-decoration">∞</div><div className="section-label" data-reveal><span>03</span> / OUR COMMUNITY</div><div className="impact-content"><div className="stat-number">500<span>+</span></div><div className="impact-text" data-reveal><span className="pill-label light">ESTABLISHED 2020</span><h2>More than a number.<br/><em>A learning journey.</em></h2><p>Over 500 students taught, each with their own goals, challenges and moments of progress. We’re proud to be part of the journey.</p></div></div><div className="impact-foot"><span>BUILT ON CONSISTENCY</span><span>GROWTH IS A PRACTICE <b>✳</b></span></div></section>



    <section className="programmes section-pad" id="programmes"><div className="section-label" data-reveal><span>04</span> / FIND YOUR PATH</div><div className="programmes-heading" data-reveal><h2>Made for the<br/><em>next chapter.</em></h2><p>Strong foundations for school. Focused preparation for what comes next.</p></div><div className="programme-list"><a className="programme-row" href="tel:8507930793"><div className="programme-number">01</div><div className="programme-main"><span>SCHOOL PROGRAMME</span><h3>CBSE <i>&</i> ICSE</h3><p>Classes 8–10 · Build strong foundations</p></div><div className="programme-arrow">↗</div></a><a className="programme-row" href="tel:8507530753"><div className="programme-number">02</div><div className="programme-main"><span>SCIENCE PROGRAMME</span><h3>XI <i>&</i> XII</h3><p>Science stream · MHT CET · NEET · JEE Main</p></div><div className="programme-arrow">↗</div></a></div><div className="programme-note" data-reveal><span>THE RIGHT GUIDANCE CHANGES THE JOURNEY.</span><a href="tel:8507930793">Speak with our team ↗</a></div></section>



    <section className="learning-loop section-pad"><div className="loop-copy" data-reveal><div className="section-label"><span>05</span> / THE LEARNING LOOP</div><h2>Keep moving<br/> <em>forward.</em></h2><p>There is no magic moment. There is a better loop: learn something, try it, understand the result, and return stronger.</p><a className="text-link" href="#faq">A little more about us <span>↗</span></a></div><div className="loop-visual" data-reveal><div className="orbit-graphic"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><span className="orbit-word word-learn">LEARN</span><span className="orbit-word word-practise">PRACTISE</span><span className="orbit-word word-review">REVIEW</span><span className="orbit-word word-grow">GROW</span><div className="orbit-centre">∞<small>REPEAT</small></div><div className="orbit-spark">✳</div></div><div className="loop-caption">A LITTLE BETTER, EVERY DAY.</div></div></section>



    <section className="principal section-pad"><div className="principal-mark" data-reveal>“</div><div className="principal-quote" data-reveal>Students don’t need more noise. They need <em>clarity, consistency</em> and the confidence that comes from knowing how far they’ve come.</div><div className="principal-sign" data-reveal><span className="sign-rule"/><div><strong>Dr. Nikhil Arora</strong><small>PRINCIPAL · INFINITY CLASSES</small></div><span className="sign-symbol">∞</span></div></section>


<section className="faq section-pad" id="faq"><div className="section-label" data-reveal><span>06</span> / GOOD TO KNOW</div><div className="faq-layout">
    <div className="faq-heading" data-reveal>
      <h2>
        Questions,
        <br />
        <em>answered.</em>
      </h2>

      <p>Anything else on your mind? We’re just a call away.</p>

      <a href="tel:8507930793" className="faq-call">
        Call 85-0793-0793 ↗
      </a>
    </div>

    <div className="faq-list" data-reveal>
      {faqs.map((f, i) => (
        <button
          key={f[0]}
          className={'faq-item ' + (open === i ? 'active' : '')}
          onClick={() => setOpen(open === i ? null : i)}
          aria-expanded={open === i}
        >
          <span className="faq-index">0{i + 1}</span>
          <span className="faq-question">{f[0]}</span>
          <span className="faq-toggle">
            {open === i ? '−' : '+'}
          </span>

          {open === i && (
            <span className="faq-answer">{f[1]}</span>
          )}
        </button>
      ))}
    </div>
  </div>
</section>


    <footer className="footer"><div className="footer-top"><div className="footer-brand-block"><a className="brand footer-brand" href="#top"><img className="brand-logo-image" src="/images/infinity-classes-logo.png" alt="Infinity Classes — Where excellence becomes a habit" /></a><p>Building better learners.<br/><em>Building better results.</em></p><div className="footer-social-note">A BETTER WAY TO LEARN, SINCE 2020.</div></div><div className="footer-contact"><span className="footer-label">COME SAY HELLO</span><p>Infinity Classes, Kavya Hill View,<br/>Anand Nagar, Kavesar, Ghodbunder Road,<br/>Thane West, Thane 400615</p><a href="tel:8507930793">85-0793-0793 <span>↗</span></a><a href="tel:8507530753">85-0753-0753 <span>↗</span></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} INFINITY CLASSES</span><span>BUILDING BETTER LEARNERS.</span><a href="#top">BACK TO TOP ↑</a></div></footer>

    <a className="mobile-contact-fab" href="tel:8507930793" aria-label="Call Infinity Classes"><span className="fab-pulse" /> Talk to Infinity <b>↗</b></a>

  </main>

}