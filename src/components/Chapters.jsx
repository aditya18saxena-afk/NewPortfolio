import { useEffect, useState } from 'react'
import { CHAPTERS } from '../data'
import { Squiggle } from './Doodles'

// "Designing Dashboards 01 / 05" chapter pager — auto-advances, pauses on
// hover, click to jump.
export default function Chapters() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((v) => (v + 1) % CHAPTERS.length), 3400)
    return () => clearInterval(id)
  }, [paused])

  const c = CHAPTERS[i]

  return (
    <div
      className="chapters"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        className="chapters-hit"
        onClick={() => setI((v) => (v + 1) % CHAPTERS.length)}
        aria-label="Next chapter"
        tabIndex={-1}
      />
      <span className="mono-label chapters-pager">
        {String(i + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
      </span>
      <div className="chapters-line" key={i}>
        <span className="thin">
          {c.thin}
          <Squiggle className="chapters-squig" width={220} />
        </span>
        <b className="bold">{c.bold}</b>
      </div>
      <p className="chapters-note" key={`n${i}`}>{c.note}</p>
      <div className="chapters-dots">
        {CHAPTERS.map((_, k) => (
          <button
            key={k}
            className={k === i ? 'on' : ''}
            onClick={() => setI(k)}
            aria-label={`Chapter ${k + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
