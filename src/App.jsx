import { Fragment, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Frame from './components/Frame.jsx'
import Silhouette from './components/Silhouette.jsx'
import Toggle from './components/Toggle.jsx'
import Work from './components/Work.jsx'
import Typewriter from './components/Typewriter.jsx'
import { Squiggle, WavyArrow } from './components/Doodles.jsx'
import { PROFILE, WORKFLOW, EXPERIENCE, SKILLS } from './data.js'

function useReveal(ready) {
  useEffect(() => {
    if (!ready) return
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.05 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ready])
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ anchors: true, smoothWheel: true })
    let raf = 0
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [contactIn, setContactIn] = useState(false)
  const contactRef = useRef(null)

  useReveal(loaded)
  useLenis()

  useEffect(() => {
    const el = contactRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setContactIn(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div id="top" className={loaded ? 'ready' : ''}>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Frame ready={loaded} />
      <div className="noise" />

      {/* HERO — light canvas, guides and annotations, giant name knocked out
          by the black silhouette (hover it: the suit melts into the photo) */}
      <section id="hero">
        <div className="hero-guides" aria-hidden>
          <span className="gline-v" style={{ left: '35%' }} />
          <span className="gline-v" style={{ left: '65%' }} />
          <span className="gline-h" style={{ top: '30%' }} />
          <span className="gline-h" style={{ top: '70%' }} />
          <span className="gpx" style={{ top: '30%', left: '35%' }}>1280 px</span>
          <span className="gpx" style={{ top: '70%', left: '65%' }}>832 px</span>
          <span className="hero-measure"><i className="chip chip--violet">78 px</i></span>
        </div>

        <div className="hero-stack">
          <span className="ann ann-frame chip chip--violet">Frame: Hero</span>
          <span className="ann ann-h1 chip chip--violet">H1 — 900 / Black</span>
          <p className="kicker" data-reveal style={{ transitionDelay: '0.15s' }}>
            <span className="kicker-dot" />UI/UX Designer — Ghaziabad, India
          </p>
          <Silhouette ready={loaded} />
          <p className="hero-line" data-reveal style={{ transitionDelay: '0.45s' }}>
            I design mobile apps, flows and interfaces where <em>clarity</em> decides everything —
            for products people use every day.
          </p>
          <div className="hero-pills" data-reveal style={{ transitionDelay: '0.55s' }}>
            <a className="pill pill--solid" href="#work" data-cursor-text="Scroll ↓">SEE THE WORK</a>
            <a className="pill" href={`mailto:${PROFILE.email}`} data-cursor-text="Say hello">WRITE TO ME</a>
            <a className="pill" href="/resume-aditya-saxena.pdf" target="_blank" rel="noreferrer" data-cursor-text="Resume PDF">CV ↗</a>
          </div>
        </div>

        <div className="hero-scroll mono-label" aria-hidden>Scroll <span className="bob">↓</span></div>
      </section>

      {/* ABOUT — dark "design mode" scene, then the bio */}
      <section className="section section--dark" id="about">
        <div className="container">
          <Toggle />
          <p className="about-bio" data-reveal>{PROFILE.objective}</p>
          <p className="about-row mono-label" data-reveal>{PROFILE.bioRow}</p>
        </div>
      </section>

      {/* WORK — chapters pager + editorial case list inside a figma frame */}
      <section className="section" id="work">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="mono-label">Selected work</span>
            <span className="sec-line" />
            <span className="mono-label">08 cases — 2025/26</span>
          </div>
          <div className="figframe" data-reveal>
            <span className="fh tl" /><span className="fh tr" /><span className="fh bl" /><span className="fh br" />
            <span className="chip chip--violet figframe-tag">Frame: Work</span>
            <span className="chip chip--violet figframe-size">1280 × 640</span>
            <Work />
          </div>
        </div>
      </section>

      {/* PROCESS — how I work, pills chained with hand-drawn arrows */}
      <section className="section" id="process" style={{ paddingTop: 40 }}>
        <div className="container">
          <h2 className="hand-title" data-reveal>
            How I work
            <Squiggle className="hand-squig" width={420} />
          </h2>
        </div>
        <div className="proc-marquee">
          <div className="proc-track">
            {[0, 1].map((copy) => (
              <div className="proc-set" key={copy} aria-hidden={copy === 1}>
                {WORKFLOW.map((s, i) => (
                  <Fragment key={s.label}>
                    <span className={`step ${s.solid ? 'step--solid' : ''}`}>
                      <span className="mono-label">{s.n}</span>
                      <span className="step-pill">{s.label}</span>
                    </span>
                    {i < WORKFLOW.length - 1 && <WavyArrow className="step-arrow" />}
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <p className="proc-note mono-label" data-reveal>
            Research first, pixels second — same flow behind every app above
          </p>
        </div>
      </section>

      {/* RESUME — editorial grid: name, rule, role, disciplines,
          availability pill, big stat, then timeline + skills */}
      <section className="section" id="resume" style={{ paddingTop: 40 }}>
        <div className="container">
          <h2 className="r-name" data-reveal>ADITYA SAXENA</h2>
          <div className="r-rule" data-reveal />
          <div className="r-rolerow" data-reveal>
            <span className="r-role">UI/UX DESIGNER</span>
            <span className="r-focus">APPS &amp; WEB</span>
          </div>
          <p className="r-disciplines mono-label" data-reveal>
            {PROFILE.bioRow.split('·').map((t, i, a) => (
              <span key={t.trim()}>
                {t.trim()}
                {i < a.length - 1 && <i className="r-sep">·</i>}
              </span>
            ))}
          </p>
          <div className="r-bottom">
            <div className="r-left" data-reveal>
              <span className="chip chip--violet" style={{ textTransform: 'uppercase' }}>Available for internships</span>
              <div className="r-pills">
                <a className="pill" href="/resume-aditya-saxena.pdf" target="_blank" rel="noreferrer" data-cursor-text="Resume PDF">DOWNLOAD CV ↗</a>
                <a className="pill" href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor-text="LinkedIn">LINKEDIN ↗</a>
                <a className="pill" href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor-text="GitHub">GITHUB ↗</a>
              </div>
            </div>
            <div className="r-stat" data-reveal>
              8 PROJECTS<span className="dot">.</span>
              <Squiggle className="r-squig" width={380} />
            </div>
          </div>

          <div className="timeline">
            {EXPERIENCE.map((e) => (
              <div className="tl-row" key={e.role} data-reveal>
                <div className="tl-left">
                  <span className="mono-label">{e.period}</span>
                  <span className="tl-where mono-label">{e.where}</span>
                </div>
                <div className="tl-main">
                  <h4>{e.role}</h4>
                  <p>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="skill-grid">
            {SKILLS.map((s) => (
              <div className="skill-cell" key={s.title} data-reveal data-cursor-text={s.title}>
                <span className="mono-label">{s.idx}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT — outro: name, role, typewriter, links */}
      <section id="contact" ref={contactRef}>
        <div className="container">
          <h2 className="c-name" data-reveal>ADITYA SAXENA<span className="dot">.</span></h2>
          <p className="c-role" data-reveal>UI/UX Designer — Apps &amp; Flows</p>
          <p className="c-row mono-label" data-reveal>{PROFILE.contactRow}</p>
          <Typewriter started={contactIn} />
          <div className="c-pills" data-reveal>
            <a className="pill pill--solid" href={`mailto:${PROFILE.email}`} data-cursor-text="Write to me">{PROFILE.email}</a>
            <a className="pill" href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} data-cursor-text="Call">+91 90274 06335</a>
            <a className="pill" href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor-text="LinkedIn">LINKEDIN ↗</a>
            <a className="pill" href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor-text="GitHub">GITHUB ↗</a>
          </div>
        </div>
        <footer className="foot">
          <span>© 2026 Aditya Saxena</span>
          <span>{PROFILE.location} — IST (UTC+5:30)</span>
          <span>Designed in Figma · Built in code</span>
        </footer>
      </section>
    </div>
  )
}
