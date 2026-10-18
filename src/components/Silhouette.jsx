import { useEffect, useState } from 'react'
import { PROFILE } from '../data'
import { SILO_PATH, SILO_ANCHORS } from '../siloPath'

// Giant type with a solid silhouette standing in front —
// where the figure overlaps the letters they knock out to white. When the
// intro lifts, a violet vector outline is traced on by the pen (anchor
// points popping in), then the shape fills in; hover melts it to the photo.
export default function Silhouette({ ready }) {
  const [entered, setEntered] = useState(false)
  const [pts, setPts] = useState(0)

  useEffect(() => {
    if (!ready) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setEntered(true), reduce ? 0 : 3000)
    return () => clearTimeout(t)
  }, [ready])

  // "N points" ticks up with the pen as anchors get committed
  useEffect(() => {
    if (!ready || entered) return
    const start = performance.now()
    const id = setInterval(() => {
      const p = Math.max(0, Math.min(1, (performance.now() - start - 500) / 2200))
      setPts(SILO_ANCHORS.filter((a) => a.t <= p).length)
    }, 90)
    return () => clearInterval(id)
  }, [ready, entered])

  return (
    <div
      className={`silo ${ready ? 'ready' : ''} ${entered ? 'entered' : ''}`}
      style={{ '--silo': 'url("/mypic-mask.png")' }}
    >
      <h1 className="silo-type back">{PROFILE.firstName}<br />{PROFILE.lastName}<span className="dot">.</span></h1>
      <div className="silo-fig">
        <img className="silo-photo" src="/mypic.jpg" alt="" aria-hidden draggable="false" />
        <img className="silo-black" src="/mypic.jpg" alt="Aditya Saxena" draggable="false" />
        {ready && (
          <svg className="silo-trace" viewBox="0 0 808 1412" aria-hidden="true">
            <path id="trace-line" className="trace-line" d={SILO_PATH} pathLength="1" />
            {SILO_ANCHORS.map((a, i) => (
              <rect
                key={i}
                className="t-anchor"
                x={a.x - 6.5}
                y={a.y - 6.5}
                width="13"
                height="13"
                style={{ animationDelay: `${(0.5 + a.t * 2.2).toFixed(2)}s` }}
              />
            ))}
            <g className="t-chip">
              <g transform="translate(16, 36)">
                <rect width="130" height="54" rx="11" fill="#121116" />
                <text x="17" y="35" fontSize="27" fontWeight="700" fontFamily="'JetBrains Mono', monospace" fill="#fff">Pen P</text>
              </g>
              <animateMotion dur="2.2s" begin="0.5s" fill="freeze">
                <mpath xlinkHref="#trace-line" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1" dur="0.08s" begin="0.5s" fill="freeze" />
              <animate attributeName="opacity" to="0" dur="0.4s" begin="2.9s" fill="freeze" />
            </g>
            <g className="t-pen">
              <g transform="scale(2.4)">
                <path d="M0 0 L-13 8 L-24 0 L-13 -8 Z" fill="#f4f2ef" stroke="#121116" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M-4 0 H-19" stroke="#121116" strokeWidth="1.2" />
                <circle cx="-17" cy="0" r="2.1" fill="#121116" />
              </g>
              <animateMotion dur="2.2s" begin="0.5s" fill="freeze" rotate="auto">
                <mpath xlinkHref="#trace-line" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1" dur="0.08s" begin="0.5s" fill="freeze" />
              <animate attributeName="opacity" to="0" dur="0.4s" begin="2.9s" fill="freeze" />
            </g>
          </svg>
        )}
        <span className="silo-hit" data-cursor-text="that's me — hi!" aria-hidden="true" />
      </div>
      <h1 className="silo-type front" aria-hidden="true">
        {PROFILE.firstName}<br />{PROFILE.lastName}<span className="dot">.</span>
      </h1>
      {ready && (
        <div className={`silo-vec ${entered ? 'off' : ''}`} aria-hidden="true">
          <span className="chip chip--violet">Vector · aditya.svg</span>
          <span className="mono-label">{pts} point{pts === 1 ? '' : 's'}</span>
        </div>
      )}
    </div>
  )
}
