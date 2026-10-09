import { useEffect, useState } from 'react'
import { PROFILE } from '../data'

// Outro typewriter: "Let's build something users love." with a violet caret.
export default function Typewriter({ started }) {
  const [phrase, setPhrase] = useState(0)
  const [len, setLen] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    if (!started) return
    const full = PROFILE.typewriter[phrase]
    if (!del && len === full.length) {
      const t = setTimeout(() => setDel(true), 1900)
      return () => clearTimeout(t)
    }
    if (del && len === 0) {
      setDel(false)
      setPhrase((p) => (p + 1) % PROFILE.typewriter.length)
      return
    }
    const t = setTimeout(() => setLen((l) => l + (del ? -1 : 1)), del ? 22 : 50)
    return () => clearTimeout(t)
  }, [started, len, del, phrase])

  const full = PROFILE.typewriter[phrase]

  return (
    <p className="typewriter" aria-label={PROFILE.typewriter[0]}>
      <span aria-hidden="true">{full.slice(0, len)}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  )
}
