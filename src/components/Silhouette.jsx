import { PROFILE } from '../data'

// Giant type with a solid silhouette standing in front —
// where the figure overlaps the letters they knock out to white. Hover the
// figure and the black shape melts into the real photo.
export default function Silhouette({ ready }) {
  return (
    <div
      className={`silo ${ready ? 'ready' : ''}`}
      style={{ '--silo': 'url("/mypic-mask.png")' }}
    >
      <h1 className="silo-type back">{PROFILE.firstName}<br />{PROFILE.lastName}<span className="dot">.</span></h1>
      <div className="silo-fig">
        <img className="silo-photo" src="/mypic.jpg" alt="" aria-hidden draggable="false" />
        <span className="silo-hit" data-cursor-text="that's me — hi!" aria-hidden="true" />
        <img className="silo-black" src="/mypic.jpg" alt="Aditya Saxena" draggable="false" />
      </div>
      <h1 className="silo-type front" aria-hidden="true">
        {PROFILE.firstName}<br />{PROFILE.lastName}<span className="dot">.</span>
      </h1>
    </div>
  )
}
