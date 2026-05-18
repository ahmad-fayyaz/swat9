import { useState } from 'react'
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

const NAV_LINKS = [
  { to: '/pledge', label: 'Pledge' },
]

export default function Layout({ children }) {
  const [dark, setDark] = useState(false)

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
        <span className="site-name">The Swat IX</span>
        <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          {dark ? <MoonIcon /> : <SunIcon />}
        </button>
      </header>

      <div className="nav-rule" />
      <nav className="site-nav">
        {NAV_LINKS.map(({ to, label }) => (
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
    </div>
  )
}
