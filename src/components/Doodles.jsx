// Hand-drawn bits: violet squiggle underlines and the wavy connector arrow
// between process steps.

export function Squiggle({ className = '', width = 260, strokeWidth = 3.4 }) {
  return (
    <svg
      className={`squiggle ${className}`}
      viewBox="0 0 260 14"
      width={width}
      height={14}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M4 9 C 30 3, 58 12, 88 7 C 118 2.5, 148 11, 178 6.5 C 200 3.4, 224 8.6, 256 5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength="100"
      />
    </svg>
  )
}

export function WavyArrow({ className = '' }) {
  return (
    <svg
      className={`wavy ${className}`}
      viewBox="0 0 122 40"
      width="122"
      height="40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 27 C 26 8, 46 35, 66 25 C 80 18, 92 18.5, 103 23"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M97 13.5 L 114 23.5 L 96 32"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="7" cy="27" r="4.4" fill="var(--bg)" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  )
}
