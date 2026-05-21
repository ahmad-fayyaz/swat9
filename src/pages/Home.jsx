import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Layout'
import homeBanner from '../assets/home_banner.png'

function TimelineItem({ entry }) {
  const boxRef = useRef(null)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`timeline-item timeline-item--${entry.side}${entry.future ? ' timeline-item--future' : ''}`}>
      <div className="timeline-dot-col"><div className="timeline-dot" /></div>
      <div ref={boxRef} className="timeline-content">
        <p className="timeline-date">{entry.date}</p>
        <p className="timeline-text">{entry.text}</p>
      </div>
    </div>
  )
}

const ACTIONS = [
  {
    text: 'Tell Swarthmore and DA Tanner Rouse to drop the charges',
    to: '/resources',
  },
  {
    text: 'For employees of an academic institution, sign the international pledge to boycott Swarthmore College',
    to: '/pledge',
  },
  {
    text: 'Stay informed about the case and larger state of repression at Swarthmore',
    to: '/press',
  },
  {
    text: "Join Swarthmore SJP's call for Swarthmore to Drop Cisco",
    to: '/cisco',
  },
  {
    text: "Sign up to show up in court and support the Swarthmore 9",
    to: '/court-support',
  },
]

const TIMELINE = [
  {
    date: 'March 24, 2025',
    text: 'Palestinian journalist Hossam Shabat is assassinated by an Israeli airstrike, martyred in Beit Lahia at the age of 23.',
  },
  {
    date: 'April 30, 2025',
    text: 'Swarthmore SJP alongside community allies launch the Hossam Shabat Liberated Zone in honor of the slain journalist, the second pro-Palestine encampment calling on Swarthmore to divest from genocide.',
  },
  {
    date: 'May 3, 2025',
    text: 'After interim suspending 9 Swarthmore students and refusing to negotiate with SJP, President Valerie Smith calls over 30 police officers from 8 different police departments to violently sweep the encampment and arrest the remaining 9 protestors, bringing cops to campus for the first time since the 1960s.',
  },
  {
    date: 'June 11, 2025',
    text: 'The "Swarthmore 9" have their preliminary hearing at the Delaware County Courthouse in Media, Pennsylvania. Director of Public Safety Colin Quinn testifies against the arrested protestors on the stand. Judge Elizabeth Gallard binds the charges, confirming their pursuit.',
  },
  {
    date: 'Sept 29, 2025',
    text: 'Charged activists return to court for a pre-trial conference. Judge Pileggi takes over presiding.',
  },
  {
    date: 'October 27, 2025',
    text: 'The Swarthmore 9 have their arraignment and third-degree misdemeanor charges formally confirmed. Those present plead not-guilty, affirming that it is right to protest genocide.',
  },
  { marker: true },
  {
    date: 'June 29, 2026',
    text: 'If the charges are not dropped, the Swarthmore 9 will begin trial. If convicted, those charged face up to a year in prison.',
    future: true,
  },
]

let sideCounter = 0
const TIMELINE_WITH_SIDES = TIMELINE.map(entry => {
  if (entry.marker) return entry
  return { ...entry, side: sideCounter++ % 2 === 0 ? 'left' : 'right' }
})

export default function Home({ dark, setDark }) {
  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="home-split">


        <div className="home-lede">
          <h1 className="masthead home-lede-heading">On June 29,</h1>
          <p>The "Swarthmore 9" are slated to begin trial for third-degree misdemeanor trespassing charges initiated by Swarthmore College and pursued by Delaware County DA Tanner Rouse. After being violently arrested by over 30 police officers at a pro-Palestine encampment launched by Swarthmore SJP, the 9 protestors are facing criminal charges which carry a maximum sentence of up to a year in prison. The Hossam Shabat Liberated Zone was launched in honor of martyred Palestinian journalist Hossam Shabbat, who was assassinated by Israel on March 24, 2025. It called on Swarthmore to drop all ties with Cisco Systems, a primary BDS target for their complicity in the ongoing genocide in Gaza. Instead of negotiating with protestors, President Valerie Smith and Swarthmore college chose brute force. Now, we need your help to free the Swarthmore 9.</p>
        </div>
        <div className="home-actions">
          <h2 className="masthead home-lede-heading"><span className="masthead-sub">WHAT TO DO?</span></h2>
          <p className="home-actions-hint">Click any item to learn more</p>
          <ol className="home-action-list">
            {ACTIONS.map(({ text, to }) => (
              <li key={to} className="home-action-item">
                <Link to={to} className="home-action-link">{text}</Link>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="home-banner-wrap">
        <img src={homeBanner} alt="" className="home-banner" />
      </div>

      <div className="home-timeline">
        <h2 className="masthead"><span className="masthead-sub">Timeline</span></h2>
        <div className="timeline-track">
          {TIMELINE_WITH_SIDES.map((entry, i) =>
            entry.marker ? (
              <div key={i} className="timeline-now-wrap">
                <span className="timeline-now">WE ARE HERE</span>
              </div>
            ) : (
              <TimelineItem key={i} entry={entry} />
            )
          )}
        </div>
      </div>
    </Layout>
  )
}
