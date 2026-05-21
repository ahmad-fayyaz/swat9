import { useState } from 'react'
import Layout from '../Layout'

const DATES = [
  { value: 'june-29', label: 'June 29' },
  { value: 'june-30', label: 'June 30' },
  { value: 'july-1',  label: 'July 1' },
  { value: 'july-2',  label: 'July 2' },
]

export default function Action({ dark, setDark }) {
  const [selected, setSelected] = useState([])
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function toggle(value) {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!selected.length || !email) return

    const body = new URLSearchParams({
      'form-name': 'court-support',
      email,
      dates: selected.join(', '),
    })

    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true))
  }

  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="masthead-wrap">
        <h1 className="masthead">
          Court Support
          <span className="masthead-sub">SUPPORT THE SWARTHMORE 9 AT TRIAL</span>
        </h1>
        <div className="masthead-rule" />
      </div>

      <div className="prose">
        <p>
          The Swarthmore 9 will begin trial at the Delaware County Courthouse in Media, Pennsylvania
          starting June 29th. Trial will begin at 9am and the courthouse is located at 201 W Front St, Media, PA 19063. Select the days you can attend and we'll send you a reminder with details.
        </p>
      </div>

      {submitted ? (
        <div className="court-thanks">
          <p>You're signed up — we'll be in touch with details closer to the trial.</p>
        </div>
      ) : (
        <form
          className="court-form"
          onSubmit={handleSubmit}
          netlify="true"
          name="court-support"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="court-support" />

          <p className="court-form-label">Select the days you can attend:</p>
          <div className="court-dates">
            {DATES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`court-date-btn ${selected.includes(value) ? 'court-date-btn--selected' : ''}`}
                onClick={() => toggle(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <input type="hidden" name="dates" value={selected.join(', ')} />

          <p className="court-form-label">Your email:</p>
          <div className="court-email-row">
            <input
              className="court-email-input"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              className="court-submit-btn"
              type="submit"
              disabled={!selected.length || !email}
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </Layout>
  )
}
