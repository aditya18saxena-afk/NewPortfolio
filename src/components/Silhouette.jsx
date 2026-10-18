import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '../data'
import { SILO_PATH, SILO_ANCHORS } from '../siloPath'

const IM = ['I', "'", 'M']
const FIRST = PROFILE.firstName.split('')
const LAST = PROFILE.lastName.split('')
const TYPED_TOTAL = IM.length + FIRST.length + LAST.length + 1

// Giant type with a solid silhouette standing in front —
// where the figure overlaps the letters they knock out to white. When the
// intro lifts, a violet vector outline is traced on by the pen (anchor
// points popping in), the photo surface dissolves in under the black fill,
// the name lands, and hover melts the figure back to the photo.
export default function Silhouette({ ready }) {
  const [entered, setEntered] = useState(false)
  const [pts, setPts] = useState(0)
  const [typed, setTyped] = useState(0)
  const [caret, setCaret] = useState(null)
  const rootRef = useRef(null)
  const inRef = useRef(null)

  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setEntered(true)
      return
    }
    const t = setTimeout(() => setEntered(true), 1800)
    return () => clearTimeout(t)
  }, [ready])

  // after the fill: "I'M ADITYA SAXENA." types in letter by letter
  useEffect(() => {
    if (!ready || !entered) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setTyped(TYPED_TOTAL)
      return
    }
    let n = 0
    let id = 0
    const start = setTimeout(() => {
      id = setInterval(() => {
        n += 1
        setTyped(n)
        if (n >= TYPED_TOTAL) clearInterval(id)
      }, 115)
    }, 350)
    return () => {
      clearTimeout(start)
      clearInterval(id)
    }
  }, [ready, entered])

  // blinking caret rides the last typed letter
  useEffect(() => {
    const root = rootRef.current
    const inEl = inRef.current
    if (!typed || !root || !inEl) return
    const ch = inEl.querySelectorAll('.silo-ch')[typed - 1]
    if (!ch) return
    const r = ch.getBoundingClientRect()
    const b = root.getBoundingClientRect()
    const fs = parseFloat(getComputedStyle(ch).fontSize) || r.height
    setCaret({
      x: r.right - b.left,
      y: r.top - b.top + Math.round(fs * 0.245),
      h: Math.round(fs * 0.76),
      w: Math.max(3, Math.round(fs * 0.05)),
    })
    if (typed >= TYPED_TOTAL) {
      const t = setTimeout(() => setCaret(null), 650)
      return () => clearTimeout(t)
    }
  }, [typed])

  // "N points" ticks up with the pen as anchors get committed
  useEffect(() => {
    if (!ready || entered) return
    const start = performance.now()
    const id = setInterval(() => {
      const p = Math.max(0, Math.min(1, (performance.now() - start - 400) / 1300))
      setPts(SILO_ANCHORS.filter((a) => a.t <= p).length)
    }, 90)
    return () => clearInterval(id)
  }, [ready, entered])

  return (
    <div
      className={`silo ${ready ? 'ready' : ''} ${entered ? 'entered' : ''}`}
      ref={rootRef}
      style={{ '--silo': 'url("/mypic-mask.png")' }}
    >
      <h1 className="silo-type back">
        <span className="silo-in" ref={inRef}>
          <span className="silo-line"><span className="silo-im">{IM.map((c, i) => <span key={i} className={`silo-ch ${i < typed ? 'on' : ''}`}>{c}</span>)}</span>{FIRST.map((c, i) => <span key={i} className={`silo-ch ${IM.length + i < typed ? 'on' : ''}`}>{c}</span>)}</span>
          <br />
          <span className="silo-line">{LAST.map((c, i) => <span key={i} className={`silo-ch ${IM.length + FIRST.length + i < typed ? 'on' : ''}`}>{c}</span>)}<span className={`silo-ch dot ${typed >= TYPED_TOTAL ? 'on' : ''}`}>.</span></span>
        </span>
      </h1>
      <div className="silo-fig">
        <img className="silo-photo" src="/mypic.jpg" alt="" aria-hidden draggable="false" />
        <img className="silo-black" src="/mypic.jpg" alt="Aditya Saxena" draggable="false" />
        {ready && (
          <svg className="silo-trace" viewBox="0 0 808 744" aria-hidden="true">
            <path id="trace-line" className="trace-line" d={SILO_PATH} pathLength="1" />
            {SILO_ANCHORS.map((a, i) => (
              <rect
                key={i}
                className="t-anchor"
                x={a.x - 3.5}
                y={a.y - 3.5}
                width="7"
                height="7"
                style={{ animationDelay: `${(0.4 + a.t * 1.3).toFixed(2)}s` }}
              />
            ))}
            <g className="t-chip">
              <g transform="translate(9, 20)">
                <rect width="66" height="28" rx="6" fill="#121116" />
                <text x="9" y="19" fontSize="14" fontWeight="700" fontFamily="'JetBrains Mono', monospace" fill="#fff">Pen P</text>
              </g>
              <animateMotion dur="1.3s" begin="0.4s" fill="freeze">
                <mpath xlinkHref="#trace-line" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1" dur="0.08s" begin="0.4s" fill="freeze" />
              <animate attributeName="opacity" to="0" dur="0.6s" begin="2.2s" fill="freeze" />
            </g>
            <g className="t-pen">
              <g transform="scale(1.25)">
                <path d="M0 0 L-13 8 L-24 0 L-13 -8 Z" fill="#f4f2ef" stroke="#121116" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M-4 0 H-19" stroke="#121116" strokeWidth="1.2" />
                <circle cx="-17" cy="0" r="2.1" fill="#121116" />
              </g>
              <animateMotion dur="1.3s" begin="0.4s" fill="freeze" rotate="auto">
                <mpath xlinkHref="#trace-line" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1" dur="0.08s" begin="0.4s" fill="freeze" />
              <animate attributeName="opacity" to="0" dur="0.6s" begin="2.2s" fill="freeze" />
            </g>
          </svg>
        )}
        <span className="silo-hit" data-cursor-text="that's me — hi!" aria-hidden="true" />
      </div>
      <h1 className="silo-type front" aria-hidden="true">
        {FIRST.map((c, i) => <span key={i} className={`silo-ch ${IM.length + i < typed ? 'on' : ''}`}>{c}</span>)}<br />
        {LAST.map((c, i) => <span key={i} className={`silo-ch ${IM.length + FIRST.length + i < typed ? 'on' : ''}`}>{c}</span>)}<span className={`silo-ch dot ${typed >= TYPED_TOTAL ? 'on' : ''}`}>.</span>
      </h1>
      {ready && (
        <div className="silo-vec" aria-hidden="true">
          <span className="chip chip--violet">Vector · aditya.svg</span>
          <span className="mono-label">{pts} point{pts === 1 ? '' : 's'}</span>
        </div>
      )}
      {caret && <i className="silo-caret" style={{ left: caret.x, top: caret.y, height: caret.h, width: caret.w }} aria-hidden="true" />}
    </div>
  )
}
