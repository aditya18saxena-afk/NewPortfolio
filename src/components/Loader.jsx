import { useEffect, useRef, useState } from 'react'

// Intro: dark canvas, guides drawn, "Hello" is typed letter by letter while a
// width measure hugs the last letter — then a Figma-style selection frame is
// drawn around the word (handles pop in, chips label the frame) and the
// curtain lifts to the light hero.
const WORD = ['H', 'E', 'L', 'L', 'O']

export default function Loader({ onDone }) {
  const [step, setStep] = useState(0)
  const [measure, setMeasure] = useState(null)
  const [framed, setFramed] = useState(false)
  const [size, setSize] = useState('')
  const [lift, setLift] = useState(false)
  const [pct, setPct] = useState(0)
  const stageRef = useRef(null)

  useEffect(() => {
    const timers = []
    WORD.forEach((_, i) => timers.push(setTimeout(() => setStep(i + 1), 220 + i * 140)))
    timers.push(setTimeout(() => setFramed(true), 1000))
    timers.push(
      setTimeout(() => {
        const sel = stageRef.current && stageRef.current.querySelector('.loader-sel')
        if (sel) setSize(`${Math.round(sel.offsetWidth)} × ${Math.round(sel.offsetHeight)}`)
      }, 1580)
    )
    timers.push(setTimeout(() => setLift(true), 1850))
    timers.push(setTimeout(() => onDone && onDone(), 1850 + 600))
    let v = 0
    const id = setInterval(() => {
      v = Math.min(100, v + 2.3 + Math.random() * 0.7)
      setPct(Math.floor(v))
    }, 42)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(id)
    }
  }, [onDone])

  // the width measure tracks the right edge of the last typed letter
  useEffect(() => {
    if (!step) return
    const stage = stageRef.current
    if (!stage) return
    const active = stage.querySelectorAll('.lw-l')[step - 1]
    if (active) setMeasure({ x: Math.round(active.offsetLeft + active.offsetWidth), w: Math.round(active.offsetWidth) })
  }, [step])

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
        <div className={`loader-stage ${framed ? 'framed' : ''}`} ref={stageRef}>
          <span className="loader-word">
            {WORD.map((ch, i) => (
              <span key={i} className={`lw-l ${i < step ? 'on' : ''}`}>{ch}</span>
            ))}
          </span>
          {measure !== null && (
            <span className="loader-measure" style={{ left: measure.x }}>
              <i className="chip chip--violet">{measure.w} px</i>
            </span>
          )}
          <i className="loader-sel" aria-hidden>
            <i className="lsh lsh--tl" />
            <i className="lsh lsh--tc" />
            <i className="lsh lsh--tr" />
            <i className="lsh lsh--ml" />
            <i className="lsh lsh--mr" />
            <i className="lsh lsh--bl" />
            <i className="lsh lsh--bc" />
            <i className="lsh lsh--br" />
          </i>
          <span className="chip chip--violet loader-tag">Frame: Hello</span>
          <span className="chip chip--violet loader-size">{size}</span>
        </div>
      </div>
      <div className="loader-foot">
        <div className="loader-line"><span style={{ width: `${pct}%` }} /></div>
        <span className="mono-label">{pct}%</span>
      </div>
    </div>
  )
}
