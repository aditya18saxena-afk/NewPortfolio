import { useEffect, useState } from 'react'

// Intro: dark canvas, guides drawn, the letter settles inside the frame,
// counter counts up, then the curtain lifts to the light hero.
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [lift, setLift] = useState(false)

  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v += 3.6 + Math.random() * 6.8
      if (v >= 100) {
        v = 100
        clearInterval(id)
        setTimeout(() => setLift(true), 320)
        setTimeout(() => onDone && onDone(), 320 + 780)
      }
      setPct(Math.min(100, Math.floor(v)))
    }, 46)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <div className={`loader ${lift ? 'lift' : ''}`} aria-hidden>
      <div className="loader-guides">
        <span className="lg-v" style={{ left: '35%' }} />
        <span className="lg-v" style={{ left: '65%' }} />
        <span className="lg-h" style={{ top: '30%' }} />
        <span className="lg-h" style={{ top: '70%' }} />
        <span className="lg-px mono-label" style={{ top: '30%', left: '35%' }}>194 px</span>
        <span className="lg-px mono-label" style={{ top: '70%', left: '65%' }}>192 px</span>
      </div>
      <div className="loader-frame">
        <span className="chip chip--violet">Frame: Intro</span>
        <span className="loader-a">A</span>
        <span className="loader-measure"><i className="chip chip--violet">78 px</i></span>
      </div>
      <div className="loader-foot">
        <div className="loader-line"><span style={{ width: `${pct}%` }} /></div>
        <span className="mono-label">{pct}%</span>
      </div>
    </div>
  )
}
