import { useState } from 'react'
import { Squiggle } from './Doodles'

// Dark "Toggle / Design mode" scene for the About section: OFF is
// "just pretty", ON is design that does the job.
export default function Toggle() {
  const [on, setOn] = useState(false)

  return (
    <div className={`dmode ${on ? 'on' : ''}`}>
      <span className="mono-label dmode-label">Toggle / Design mode</span>
      <div className="dmode-row">
        <span className="dmode-side mono-label">OFF</span>
        <button
          className="dmode-switch"
          role="switch"
          aria-checked={on}
          aria-label="Toggle design mode"
          onClick={() => setOn((v) => !v)}
          data-cursor-text={on ? 'Switch off' : 'Switch on'}
        >
          <span className="dmode-knob" />
        </button>
        <span className="dmode-side mono-label">ON</span>
      </div>
      <div className="dmode-caption">
        <span className="off">Just pretty.</span>
        <span className="on">Pretty that works.</span>
        <Squiggle className="dmode-squig" width={320} />
      </div>
      <span className={`chip chip--violet dmode-state`}>STATE: {on ? 'ON' : 'OFF'}</span>
    </div>
  )
}
