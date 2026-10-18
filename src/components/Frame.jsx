import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '../data'

// Fixed HUD, as in the reel: name top-left, role top-right, a running
// mm:ss:ff timecode bottom-left, portfolio tag bottom-right. Difference
// blend keeps it legible over both the light canvas and the dark scenes.
export default function Frame({ ready }) {
  const [ms, setMs] = useState(0)
  const startRef = useRef(0)

  useEffect(() => {
    startRef.current = performance.now()
    const id = setInterval(() => setMs(performance.now() - startRef.current), 33)
    return () => clearInterval(id)
  }, [])

  const total = Math.floor(ms / 1000)
  const mm = String(Math.floor(total / 60)).padStart(2, '0')
  const ss = String(total % 60).padStart(2, '0')
  const ff = String(Math.floor(ms / (1000 / 30)) % 30).padStart(2, '0')

  return (
    <div className="hud" style={{ opacity: ready ? 1 : 0 }}>
      <a className="hud-tl" href="#top" data-cursor-text="Back to top">{PROFILE.hudName}</a>
      <span className="hud-tr">{PROFILE.hudRole}</span>
      <span className="hud-bl"><span className="hud-time">{mm}:{ss}:{ff}</span></span>
      <span className="hud-br">{PROFILE.hudPortfolio}</span>
    </div>
  )
}
