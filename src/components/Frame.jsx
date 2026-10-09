import { useEffect, useState } from 'react'
import { PROFILE } from '../data'

// Fixed HUD: name top-left, role top-right, running time
// bottom-left, portfolio tag bottom-right. Difference blend keeps it legible
// over both the light canvas and the dark scenes.
export default function Frame({ ready }) {
  const [t, setT] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const mm = String(Math.floor(t / 60)).padStart(2, '0')
  const ss = String(t % 60).padStart(2, '0')

  return (
    <div className="hud" style={{ opacity: ready ? 1 : 0 }}>
      <a className="hud-tl" href="#top" data-cursor-text="Back to top">{PROFILE.hudName}</a>
      <span className="hud-tr">{PROFILE.hudRole}</span>
      <div className="hud-bl">
        <span className="hud-time">00:{mm}:{ss}</span>
        <span className="hud-bar"><i style={{ width: `${progress * 100}%` }} /></span>
      </div>
      <span className="hud-br">{PROFILE.hudPortfolio}</span>
    </div>
  )
}
