import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

const TRIAL_DATE = new Date('2026-06-29T09:00:00')

function getTimeLeft() {
  const diff = TRIAL_DATE - Date.now()
  if (diff <= 0) return null
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

function pad(n) { return String(n).padStart(2, '0') }

function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return <span className="header-countdown">Trial begins today</span>

  return (
    <div className="header-countdown">
      <span className="header-countdown-label">Time till Trial</span>
      <span className="header-countdown-time">
        {time.d}d {pad(time.h)}h {pad(time.m)}m
      </span>
    </div>
  )
}

const NAV_LINKS = [
  { to: '/pledge', label: 'Pledge' },
  { to: '/court-support', label: 'Court Support' },
  { to: '/press', label: 'Press' },
  { to: '/cisco', label: 'Cisco' },
  { to: '/resources', label: 'Resources' },
]

function MailingListForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    const body = new URLSearchParams({ 'form-name': 'mailing-list', email })
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      .then(() => setDone(true))
      .catch(() => setDone(true))
  }

  if (done) return <span className="footer-mailing-done">You're on the list.</span>

  return (
    <form className="footer-mailing-form" onSubmit={handleSubmit} netlify="true" name="mailing-list" data-netlify="true">
      <input type="hidden" name="form-name" value="mailing-list" />
      <input
        className="footer-mailing-input"
        type="email"
        name="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button className="footer-mailing-btn" type="submit">Join Mailing List</button>
    </form>
  )
}

export default function Layout({ children, showPopup: enablePopup = false, dark, setDark }) {
  const [showTop, setShowTop] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const formUrl = 'https://form.jotform.com/261336169617058'

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || !href.startsWith('http') || href.startsWith(window.location.origin)) return
      e.preventDefault()
      window.open(href, '_blank', 'noopener,noreferrer')
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (!enablePopup) return
    const timer = setTimeout(() => setShowPopup(true), 7000)
    return () => clearTimeout(timer)
  }, [enablePopup])

  return (
    <div className={`app ${dark ? 'theme-dark' : 'theme-light'}`}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="newsprint-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <header className="site-header">
        <NavLink to="/" className="site-name" style={{ textDecoration: 'none' }}>The Swat IX</NavLink>
        <div className="header-actions">
          <Countdown />
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </header>

      <div className="nav-rule" />
      <nav className="site-nav">
        {NAV_LINKS.filter(l => !l.hidden).map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="nav-rule" />

      {children}

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close">✕</button>
            <p className="popup-text">Add your name to the list:</p>
            <a
              className="popup-btn"
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowPopup(false)}
            >
              Sign the Pledge
            </a>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <a className="footer-email" href="mailto:contact@swarthmore9.com">contactus@swarthmore9.com</a>
        <a className="footer-petition" href="https://actionnetwork.org/petitions/demand-swarthmore-drop-all-charges-for-student-protestors" target="_blank" rel="noopener noreferrer">Sign the Petition</a>
        <MailingListForm />
      </footer>

      {showTop && (
        <button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </div>
  )
}
