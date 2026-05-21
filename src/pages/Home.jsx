import { Link } from 'react-router-dom'
import Layout from '../Layout'

const ACTIONS = [
  {
    text: 'Tell Swarthmore and DA Tanner Rouse to drop the charges',
    to: '/court-support',
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
]

export default function Home({ dark, setDark }) {
  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="home-split">
        <div className="home-lede">
          <h1 className="masthead home-lede-heading">On June 29,</h1>
          <p>The "Swarthmore 9" are slated to begin trial for third-degree misdemeanor trespassing charges initiated by Swarthmore College and pursued by Delaware County DA Tanner Rouse. After being violently arrested by over 30 police officers at a pro-Palestine encampment launched by Swarthmore SJP, the 9 protestors are facing criminal charges which carry a maximum sentence of up to a year in prison. The Hossam Shabat Liberated Zone was launched in honor of martyred Palestinian journalist Hossam Shabbat, who was assassinated by Israel on March 24, 2025. It called on Swarthmore to drop all ties with Cisco Systems, a primary BDS target for their complicity in the ongoing genocide in Gaza. Instead of negotiating with protestors, President Valerie Smith and Swarthmore college chose brute force. Now, we need your help to free the Swarthmore 9.</p>
        </div>
        <div className="home-actions">
          <h2 className="masthead home-lede-heading"><span className="masthead-sub">What to do?</span></h2>
          <ol className="home-action-list">
            {ACTIONS.map(({ text, to }) => (
              <li key={to} className="home-action-item">
                <Link to={to} className="home-action-link">{text}</Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}
