import { useEffect, useRef, useState } from 'react'

// Design-tool pointer: small dark arrow + violet name chip. Default label
// signs the whole site.
export default function Cursor() {
  const ref = useRef(null)
  const [text, setText] = useState('Aditya')
  const [down, setDown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      x += (tx - x) * 0.24
      y += (ty - y) * 0.24
      el.style.transform = `translate(${x}px,${y}px)`
    }
    loop()
    const move = (e) => { tx = e.clientX; ty = e.clientY }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor-text]')
      setText(t ? t.getAttribute('data-cursor-text') : 'Aditya')
    }
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('pointerdown', d)
    window.addEventListener('pointerup', u)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('pointerdown', d)
      window.removeEventListener('pointerup', u)
    }
  }, [])

  return (
    <div ref={ref} className={`fcursor ${down ? 'down' : ''}`} aria-hidden>
      <svg width="19" height="23" viewBox="0 0 19 23" fill="none">
        <path
          d="M3 2.2 V 19.6 L 8.1 15.1 L 11.3 21.7 L 14.7 20.1 L 11.5 13.7 L 18.4 13.5 Z"
          fill="#121116"
          stroke="#edeceb"
          strokeWidth="1.4"
        />
      </svg>
      <span className="fcursor-chip">{text}</span>
    </div>
  )
}
