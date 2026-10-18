import { useEffect } from 'react'

const U = '/campuscare/ui/'
const R = '/campuscare/refs/'
const W = '/campuscare/wireframes/'
const EMAIL = 'aditya18.saxena@gmail.com'

const META = [
  ['ROLE', 'UI/UX Design — research, flows, UI, prototype'],
  ['PLATFORM', 'iOS app — 18 screens, light theme'],
  ['TOOLS', 'Figma — wireframes, UI, wired prototype'],
  ['TIMELINE', '2026 — personal campus project'],
]

const STEPS = [
  ['01', 'REFERENCES', '#references'],
  ['02', 'WIREFRAMES', '#wireframes'],
  ['03', 'UI DESIGN', '#ui-design'],
  ['04', 'PROTOTYPE', '#prototype'],
]

const PROBLEMS = [
  [
    'SCATTERED REPORTS',
    'There is no single place to report an issue — it depends on who you know and which group you are in.',
  ],
  [
    'NO TRACKING',
    'Once a complaint is sent, it disappears. Nobody knows if it was seen, assigned or fixed.',
  ],
  [
    'NO CONTEXT',
    '“The light near the library” is not a location. Without a photo and a pin, every fix starts with a hunt.',
  ],
]

const WIREFRAMES = [
  [W + 'welcome.svg', 'WELCOME', '402 × 874'],
  [W + 'sign-in.svg', 'SIGN IN', '402 × 874'],
  [W + 'create-account.svg', 'CREATE ACCOUNT', '440 × 956'],
  [W + 'home.svg', 'DASHBOARD', '402 × 874'],
  [W + 'map.svg', 'CAMPUS MAP', '402 × 874'],
  [W + 'history.svg', 'ISSUE HISTORY', '402 × 874'],
]

const WIREFRAMES_TALL = [
  [W + 'report-create.svg', 'REPORT — DETAILS', '402 × 1814'],
  [W + 'report-review.svg', 'REPORT — REVIEW', '402 × 1347'],
]

const UI_BLOCKS = [
  {
    chip: 'A · WELCOME & ACCOUNT',
    meta: '3 SCREENS',
    caption:
      'A hero welcome sets the expectation; one sign-up page carries everything — personal details, hostel, role and room number.',
    shots: [
      ['01-welcome.jpg', 'CampusCare welcome screen', 'WELCOME'],
      ['02-create-account.jpg', 'Create your account screen', 'SIGN UP'],
      ['03-sign-in.jpg', 'Sign in screen', 'SIGN IN'],
    ],
  },
  {
    chip: 'B · PASSWORD RECOVERY',
    meta: '4 STEPS',
    caption:
      'A forgotten password is where apps lose users. Four short steps — request, verify, reset, confirm — and the account is back.',
    small: true,
    shots: [
      ['04-forgot-password.jpg', 'Forgot password screen', '01 · REQUEST'],
      ['05-verify-identity.jpg', 'Verify identity screen', '02 · VERIFY'],
      ['06-reset-password.jpg', 'Reset password screen', '03 · RESET'],
      ['07-password-updated.jpg', 'Password updated screen', '04 · CONFIRM'],
    ],
  },
  {
    chip: 'C · DASHBOARD',
    meta: '2 SCREENS',
    caption:
      'Open requests, resolved count and average resolution time up top; recent updates below. One tap opens the active-reports modal with live ETAs.',
    shots: [
      ['11-home.jpg', 'CampusCare dashboard', 'HOME'],
      ['12-home-reports-modal.jpg', 'Active reports modal', 'MODAL'],
    ],
  },
  {
    chip: 'D · REPORTING',
    meta: '3 STEPS',
    caption:
      'Details — photos, description, category and a location picked on the map. Review — everything in one glance. Submit — a report ID lands in the facilities queue.',
    shots: [
      ['13-report-create.jpg', 'Report form — full page', 'STEP 1 · DETAILS', 'tall'],
      ['14-report-review.jpg', 'Review report — full page', 'STEP 2 · REVIEW', 'tall'],
      ['15-report-confirmed.jpg', 'Report submitted screen', 'STEP 3 · SUBMIT'],
    ],
  },
  {
    chip: 'E · CAMPUS MAP',
    meta: '3 SCREENS',
    caption:
      'Issues pinned on the campus you recognise. Search drops suggestions as you type; tapping a place opens its sheet with a direct “Report an issue” action.',
    shots: [
      ['16-map.jpg', 'Campus map', 'MAP'],
      ['17-map-search.jpg', 'Search with suggestions', 'SEARCH'],
      ['18-map-location.jpg', 'Location bottom sheet', 'LOCATION'],
    ],
  },
  {
    chip: 'F · TRACKING',
    meta: '1 SCREEN',
    caption:
      'Every report becomes a tracked object — All · New · In Progress · Resolved · Closed — with full details one tap away.',
    shots: [['19-history.jpg', 'Issue history screen', 'HISTORY']],
  },
]

const FLOW = [
  {
    label: 'ONBOARDING',
    chain: [
      ['n', 'WELCOME'],
      ['c', 'GET STARTED'],
      ['n', 'SIGN IN'],
      ['c', 'FOCUS · TYPING · VISIBILITY'],
      ['h', 'DASHBOARD'],
    ],
  },
  {
    label: 'REPORTING',
    chain: [
      ['h', 'DASHBOARD'],
      ['c', 'QUICK ACTION'],
      ['n', 'NEW REPORT'],
      ['c', 'REVIEW REPORT'],
      ['n', 'REVIEW & SUBMIT'],
      ['c', 'SUBMIT'],
      ['n', 'SUBMITTED'],
      ['c', 'BACK TO DASHBOARD · HISTORY · MAP'],
    ],
  },
  {
    label: 'TRACKING',
    chain: [
      ['h', 'DASHBOARD'],
      ['c', 'HISTORY TAB'],
      ['n', 'ISSUE HISTORY'],
      ['c', 'STATUS VIEWS — ALL · NEW · IN PROGRESS · RESOLVED · CLOSED'],
    ],
  },
  {
    label: 'MAP',
    chain: [
      ['h', 'DASHBOARD'],
      ['c', 'MAP TAB'],
      ['n', 'CAMPUS MAP'],
      ['c', 'SEARCH BAR'],
      ['n', 'SEARCH SUGGESTIONS'],
      ['c', 'PICK A PLACE'],
      ['n', 'LOCATION SHEET'],
    ],
  },
  {
    label: 'QUICK OVERVIEW',
    chain: [
      ['h', 'DASHBOARD'],
      ['c', 'SUMMARY CARD'],
      ['n', 'ACTIVE REPORTS MODAL'],
      ['c', 'VIEW ALL → HISTORY · CLOSE → DASHBOARD'],
    ],
  },
]

const STATES = [
  [U + '08-typing-email.jpg', 'FOCUS · EMAIL'],
  [U + '09-typing-password.jpg', 'FOCUS · PASSWORD'],
  [U + '10-typing-filled.jpg', 'PASSWORD VISIBLE'],
]

const OUTCOME = [
  [
    'ONE LANGUAGE',
    'Auth, dashboard, map and forms — 18 screens built one after another, yet they all read as one app: same header, same cards, same violet action, same rhythm.',
  ],
  [
    'STATUS IS THE FEATURE',
    'For a reporting app the value is not the form — it is knowing where your issue stands. Statuses, ETAs and the history list got first-class treatment.',
  ],
  [
    'ASK LESS, TELL CLEARLY',
    'The form asks only what facilities needs — photo, description, category, location — and answers back with a report ID you can point to.',
  ],
]

function FigHandles() {
  return (
    <>
      <span className="fh tl" />
      <span className="fh tr" />
      <span className="fh bl" />
      <span className="fh br" />
    </>
  )
}

export default function CaseStudy() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="noise" />

      <header className="cs-top">
        <a className="cs-back mono-label" href="/">
          ← ADITYA SAXENA — PORTFOLIO
        </a>
        <span className="mono-label">CAMPUSCARE · CASE STUDY · 2026</span>
      </header>

      <section className="cs-hero">
        <div className="container">
          <p className="kicker">
            <span className="kicker-dot" />
            CASE STUDY — MOBILE APP
          </p>
          <h1 className="cs-title">CampusCare</h1>
          <p className="cs-sub">
            A campus maintenance app that turns <em>“the light in the library is broken”</em> into a report that
            gets seen, tracked and fixed — from the first reference board to the last wired connection.
          </p>
          <div className="cs-meta">
            {META.map(([k, v]) => (
              <div key={k}>
                <span className="mono-label">{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <div className="cs-phones">
            <img className="ptilt-l" src={U + '01-welcome.jpg'} alt="CampusCare welcome screen" />
            <img className="mid" src={U + '11-home.jpg'} alt="CampusCare dashboard" />
            <img className="ptilt-r" src={U + '16-map.jpg'} alt="CampusCare campus map" />
          </div>
          <div className="cs-heropills">
            <a className="pill pill--solid" href="#problem">
              FOLLOW THE PROCESS ↓
            </a>
            <a className="pill" href="/">
              BACK TO PORTFOLIO
            </a>
          </div>
        </div>
      </section>

      <nav className="cs-process" aria-label="Case study steps">
        {STEPS.map(([n, label, href]) => (
          <a className="cs-step" href={href} key={n}>
            <i>{n}</i>
            {label}
          </a>
        ))}
      </nav>

      <section className="section" id="problem">
        <div className="container">
          <div className="sec-head">
            <span className="mono-label">00 · THE PROBLEM</span>
            <span className="sec-line" />
          </div>
          <div className="cs-2col" data-reveal>
            <p className="cs-lead">
              A broken light, a leaking tap, a sparking socket. Every campus has them — and every campus loses
              them in the same place: scattered chats, corridors and memory.
            </p>
            <div>
              <ul className="cs-points">
                {PROBLEMS.map(([t, d], i) => (
                  <li key={t}>
                    <span className="mono-label">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <b>{t}</b>
                      <p>{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="cs-note">
                CampusCare replaces all of it with one trackable flow: <em>report it, review it, follow it</em>{' '}
                until it is resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="references">
        <div className="container">
          <div className="sec-head">
            <span className="mono-label">01 · REFERENCES &amp; DIRECTION</span>
            <span className="sec-line" />
          </div>
          <p className="cs-lead" data-reveal>
            Before any screens, a direction. Three boards set the vocabulary — a design system to study, an AI
            concept to stretch the mood, and an early sign-up take to learn what not to keep.
          </p>
          <div className="refs-grid">
            <figure className="figframe figframe--img refs-wide" data-reveal>
              <FigHandles />
              <span className="chip chip--violet figframe-tag">REF · DESIGN SYSTEM</span>
              <img src={R + 'design-system.jpg'} alt="Design system reference board" loading="lazy" />
              <figcaption className="refs-cap">
                Typography scale, color roles and component rhythm. The lesson: a small, strict kit of styles is
                what makes an app feel like one app.
              </figcaption>
              <span className="mono-label figframe-size">TYPE · COLOR · COMPONENTS</span>
            </figure>
            <figure className="figframe figframe--img" data-reveal>
              <FigHandles />
              <span className="chip chip--violet figframe-tag">REF · AI CONCEPT</span>
              <img src={R + 'ai-concept.jpg'} alt="AI-generated concept for CampusCare" loading="lazy" />
              <figcaption className="refs-cap">
                AI-assisted concept art for the sign-up moment — dark, editorial, dramatic. Kept for its clear
                hierarchy; traded for a lighter, friendlier palette.
              </figcaption>
              <span className="mono-label figframe-size">CONCEPT BOARD</span>
            </figure>
            <figure className="figframe figframe--img" data-reveal>
              <FigHandles />
              <span className="chip chip--violet figframe-tag">REF · EARLIER TAKE</span>
              <img src={R + 'early-signup.jpg'} alt="Early sign-up exploration" loading="lazy" />
              <figcaption className="refs-cap">
                An early sign-up pass. Bright, loud, heavy — it proved the fields (hostel, role, room) and showed
                exactly what to calm down.
              </figcaption>
              <span className="mono-label figframe-size">FIRST SIGN-UP EXPLORATION</span>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" id="wireframes">
        <div className="container">
          <div className="sec-head">
            <span className="mono-label">02 · WIREFRAMES</span>
            <span className="sec-line" />
          </div>
          <p className="cs-lead" data-reveal>
            Structure before pixels. Every screen is a stack of functional blocks — and these diagrams are
            generated from the actual layer structure of the finished screens, so the blocks carry exactly the
            names that shipped.
          </p>
          <div className="wf-grid">
            {WIREFRAMES.map(([src, name, size]) => (
              <figure className="wf-cell" data-reveal key={name}>
                <img src={src} alt={`${name} wireframe`} loading="lazy" />
                <figcaption className="mono-label">
                  {name} — {size}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="wf-tallrow">
            {WIREFRAMES_TALL.map(([src, name, size]) => (
              <figure className="wf-cell wf-cell--scroll" data-reveal key={name}>
                <div className="wf-scroll">
                  <img src={src} alt={`${name} wireframe`} loading="lazy" />
                </div>
                <figcaption className="mono-label">
                  {name} — {size} · SCROLL ↕
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="cs-note" data-reveal>
            The two long report pages are full-length scrolls — generated whole, so nothing about the structure
            is hidden.
          </p>
        </div>
      </section>

      <section className="section" id="ui-design">
        <div className="container">
          <div className="sec-head">
            <span className="mono-label">03 · UI DESIGN</span>
            <span className="sec-line" />
          </div>
          <p className="cs-lead" data-reveal>
            Then the pixels. The same structures dressed in a light, calm system — one violet action color, soft
            surfaces, and cards that always look tappable.
          </p>
          {UI_BLOCKS.map((b) => (
            <div className="ui-block" key={b.chip} data-reveal>
              <div className="ui-head">
                <span className="chip chip--violet">{b.chip}</span>
                <span className="mono-label">{b.meta}</span>
              </div>
              <p className="ui-cap">{b.caption}</p>
              <div className={`ui-row${b.small ? ' ui-row--small' : ''}`}>
                {b.shots.map(([file, alt, label, kind]) =>
                  kind === 'tall' ? (
                    <figure className="ui-shot ui-shot--tall" key={file}>
                      <div className="ui-scroll">
                        <img src={U + file} alt={alt} loading="lazy" />
                      </div>
                      <figcaption className="mono-label">
                        {label} <span className="ui-hint">SCROLL ↕</span>
                      </figcaption>
                    </figure>
                  ) : (
                    <figure className={`ui-shot${b.small ? ' ui-shot--sm' : ''}`} key={file}>
                      <img src={U + file} alt={alt} loading="lazy" />
                      <figcaption className="mono-label">{label}</figcaption>
                    </figure>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--dark" id="prototype">
        <div className="container">
          <div className="sec-head">
            <span className="mono-label">04 · PROTOTYPING</span>
            <span className="sec-line" />
          </div>
          <p className="cs-lead" data-reveal>
            Then it started moving. The screens were wired into one continuous prototype — every tab, link and
            button connected, 38 click-through links in total.
          </p>
          <div className="flow" data-reveal>
            {FLOW.map((row) => {
              const items = []
              row.chain.forEach(([kind, text], i) => {
                if (i > 0) items.push(<span className="farrow" key={'a' + i}>→</span>)
                if (kind === 'c') {
                  items.push(<span className="fchip" key={i}>{text}</span>)
                } else {
                  items.push(
                    <span className={`fnode${kind === 'h' ? ' fnode--hub' : ''}`} key={i}>
                      {text}
                    </span>,
                  )
                }
              })
              return (
                <div className="flow-row" key={row.label}>
                  <span className="mono-label flow-label">{row.label}</span>
                  <div className="flow-chain">{items}</div>
                </div>
              )
            })}
          </div>
          <p className="flow-note mono-label" data-reveal>
            ON_CLICK LINKS · WIRED IN FIGMA · EVERY CORE JOURNEY RUNS END-TO-END
          </p>
          <div className="states" data-reveal>
            <p className="cs-sub2">
              Interaction was not an afterthought — focus, typing and visibility states were designed as screens
              of their own.
            </p>
            <div className="states-row">
              {STATES.map(([src, label]) => (
                <figure className="ui-shot ui-shot--state" key={label}>
                  <img src={src} alt={label} loading="lazy" />
                  <figcaption className="mono-label">{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="outcome">
        <div className="container">
          <div className="sec-head">
            <span className="mono-label">05 · OUTCOME &amp; LEARNINGS</span>
            <span className="sec-line" />
          </div>
          <p className="cs-lead" data-reveal>
            Three things this project changed in how I design.
          </p>
          <ul className="cs-points cs-points--out" data-reveal>
            {OUTCOME.map(([t, d], i) => (
              <li key={t}>
                <span className="mono-label">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <b>{t}</b>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cs-next" data-reveal>
            <span className="chip chip--violet">IF I KEPT GOING</span>
            <p>
              Dark mode, push notifications when a report changes status, a facilities-side view for the people
              who fix things, and voice notes for descriptions.
            </p>
          </div>
        </div>
      </section>

      <section className="section cs-end">
        <div className="container">
          <h2 data-reveal>
            That is the process —
            <br />
            from first reference to wired prototype.
          </h2>
          <p className="cs-sub" data-reveal>
            Thanks for reading. CampusCare is one of several flows I have designed — the rest live back on the
            portfolio.
          </p>
          <div className="cs-endpills" data-reveal>
            <a className="pill pill--solid" href="/">
              BACK TO PORTFOLIO
            </a>
            <a
              className="pill"
              href={`mailto:${EMAIL}?subject=${encodeURIComponent('CampusCare case study')}`}
            >
              EMAIL ME
            </a>
          </div>
        </div>
      </section>

      <footer className="foot">
        <span>CAMPUSCARE — CASE STUDY</span>
        <span>FIGMA · WIREFRAMES · UI · PROTOTYPE</span>
        <span>© 2026 ADITYA SAXENA</span>
      </footer>
    </>
  )
}
