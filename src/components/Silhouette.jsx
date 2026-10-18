import { useEffect, useState } from 'react'
import { PROFILE } from '../data'
import { SILO_PATH, SILO_ANCHORS } from '../siloPath'

// Giant type with a solid silhouette standing in front —
// where the figure overlaps the letters they knock out to white. Matched to
// the reel: a violet outline is traced on by the pen (anchor points popping
// in), the shape dissolves into its black fill, an "I'M" flashes on the head,
// then the name focuses in; hover melts the shape back to the photo.
export default function Silhouette({ ready }) {
  const [filled, setFilled] = useState(false)
  const [pts, setPts] = useState(0)

  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setFilled(true)
      return
    }
    // the outline finishes ~1.85s after the curtain lifts; the fill, the
    // "I'M" flash and the name are then cascaded by CSS from .filled
    const t = setTimeout(() => setFilled(true), 1850)
    return () => clearTimeout(t)
  }, [ready])

  // "N points" ticks up with the pen as anchors get committed
  useEffect(() => {
    if (!ready || filled) return
    const start = performance.now()
    const id = setInterval(() => {
      const p = Math.max(0, Math.min(1, (performance.now() - start - 500) / 1300))
      setPts(SILO_ANCHORS.filter((a) => a.t <= p).length)
    }, 70)
    return () => clearInterval(id)
  }, [ready, filled])

  return (
    <div
      className={`silo ${ready ? 'ready' : ''} ${filled ? 'filled' : ''}`}
      style={{ '--silo': 'url("/mypic-mask.png")' }}
    >
      <h1 className="silo-type back"><span className="silo-in"><span className="silo-line">{PROFILE.firstName}</span><br /><span className="silo-line">{PROFILE.lastName}<span className="dot">.</span></span></span></h1>
      <div className="silo-fig">
        <img className="silo-photo" src="/mypic.jpg" alt="" aria-hidden draggable="false" />
        <img className="silo-black" src="/mypic.jpg" alt="Aditya Saxena" draggable="false" />
        <span className="silo-imwrap" aria-hidden="true"><span className="silo-im">I'M</span></span>
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
                style={{ animationDelay: `${(0.5 + a.t * 1.3).toFixed(2)}s` }}
              />
            ))}
            <g className="t-chip">
              <g transform="translate(9, 20)">
                <rect width="66" height="28" rx="6" fill="#121116" />
                <text x="9" y="19" fontSize="14" fontWeight="700" fontFamily="'JetBrains Mono', monospace" fill="#fff">Pen P</text>
              </g>
              <animateMotion dur="1.3s" begin="0.5s" fill="freeze">
                <mpath xlinkHref="#trace-line" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1" dur="0.08s" begin="0.5s" fill="freeze" />
              <animate attributeName="opacity" to="0" dur="0.4s" begin="2.15s" fill="freeze" />
            </g>
            <g className="t-pen">
              <g transform="scale(1.25)">
                <path d="M0 0 L-13 8 L-24 0 L-13 -8 Z" fill="#f4f2ef" stroke="#121116" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M-4 0 H-19" stroke="#121116" strokeWidth="1.2" />
                <circle cx="-17" cy="0" r="2.1" fill="#121116" />
              </g>
              <animateMotion dur="1.3s" begin="0.5s" fill="freeze" rotate="auto">
                <mpath xlinkHref="#trace-line" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1" dur="0.08s" begin="0.5s" fill="freeze" />
              <animate attributeName="opacity" to="0" dur="0.4s" begin="2.15s" fill="freeze" />
            </g>
          </svg>
        )}
        <span className="silo-hit" data-cursor-text="that's me — hi!" aria-hidden="true" />
      </div>
      <h1 className="silo-type front" aria-hidden="true">
        {PROFILE.firstName}<br />{PROFILE.lastName}<span className="dot">.</span>
      </h1>
      {ready && (
        <div className={`silo-vec ${filled ? 'off' : ''}`} aria-hidden="true">
          <span className="chip chip--violet">Vector · aditya.svg</span>
          <span className="mono-label">{pts} point{pts === 1 ? '' : 's'}</span>
        </div>
      )}
    </div>
  )
}
