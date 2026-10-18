import { useEffect, useRef, useState } from 'react'
import { CASES, PROFILE } from '../data'
import Chapters from './Chapters'

// Editorial work list: numbered rows, huge titles, and (on desktop) a floating
// project preview that trails the pointer.
export default function Work() {
  const listRef = useRef(null)
  const previewRef = useRef(null)
  const fine = useRef(false)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    fine.current = window.matchMedia('(pointer: fine)').matches
    const el = previewRef.current
    const list = listRef.current
    if (!el || !list || !fine.current) return
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      x += (tx - x) * 0.15
      y += (ty - y) * 0.15
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    loop()
    const move = (e) => {
      const r = list.getBoundingClientRect()
      tx = e.clientX - r.left + 30
      ty = e.clientY - r.top - 110
    }
    list.addEventListener('pointermove', move, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      list.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <div className="work-wrap">
      <Chapters />
      <ul className="work-list" ref={listRef}>
        {CASES.map((c, i) => {
          // Cases that ship with links (repo / live demo) render as a plain
          // row with action pills — nested anchors are invalid HTML, so the
          // whole-row mailto link is reserved for unlinked cases.
          const linked = Boolean(c.repo || c.live)
          const Row = linked ? 'div' : 'a'
          const rowProps = linked
            ? {}
            : {
                href: `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Case: ${c.title}`)}`,
                'data-cursor-text': `${c.title} ↗`,
              }
          return (
          <li
            key={c.title}
            className={`work-row ${active === i ? 'hot' : ''}`}
            onPointerEnter={() => fine.current && setActive(i)}
            onPointerLeave={() => setActive(-1)}
          >
            <Row className="work-link" {...rowProps}>
              <span className="work-idx mono-label">{String(i + 1).padStart(2, '0')}</span>
              <img className="work-thumb" src={c.img} alt="" loading="lazy" />
              <div className="work-main">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                {linked && (
                  <div className="work-actions">
                    {c.live && (
                      <a
                        className="pill pill--mini pill--solid"
                        href={c.live}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-text="Visit live site"
                      >
                        LIVE SITE ↗
                      </a>
                    )}
                    {c.repo && (
                      <a
                        className="pill pill--mini"
                        href={c.repo}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-text="View source"
                      >
                        SOURCE CODE ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
              <span className="work-meta mono-label">{c.tags.join(' · ')}</span>
            </Row>
          </li>
          )
        })}
      </ul>
      <div className="work-cta">
        <a
          className="pill pill--solid"
          href={`mailto:${PROFILE.email}?subject=${encodeURIComponent('Portfolio request')}`}
          data-cursor-text="Request cases"
        >
          MORE CASES ON REQUEST ↗
        </a>
      </div>
      <div className="work-preview" ref={previewRef} data-on={active >= 0 ? '1' : '0'}>
        {CASES.map((c, i) => (
          <img key={c.title} src={c.img} alt="" style={{ opacity: active === i ? 1 : 0 }} loading="lazy" />
        ))}
      </div>
    </div>
  )
}
