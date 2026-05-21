export default function Contact() { return null }
export default function Contact() { return null }
import { useState, useEffect } from 'react'
import Layout from '../Layout'

const PRESS = [
  {
    category: 'Additional Resources',
    items: [
      {
        label: 'Alumni Call / Email Script',
        outlet: 'note: this script can be adapted for any sympathetic supporter to call and email the college',
        url: 'https://docs.google.com/document/d/1gHlb6XwRz0TDxGSDaFEK561RLsul1ExQ-vGTPyP0hHU/edit?usp=drivesdk',
      },
      {
        label: 'Timeline of repression at Swarthmore',
        outlet: 'Swat Alumni for Palestine',
        url: 'https://docs.google.com/document/d/1KdIhC_vsSkmaDob8UNJHtpBd3r-vXpTu9R0GTghPL4A/edit?usp=drivesdk',
      },
    ],
  },
]

const ALL_ITEMS = PRESS.flatMap(s => s.items)
const ARTICLE_URLS = ALL_ITEMS.filter(i => !i.thumbnail).map(i => i.url)

export default function Press({ dark, setDark }) {
  const [ogImages, setOgImages] = useState({})

  useEffect(() => {
    if (!ARTICLE_URLS.length) return
    fetch(`/.netlify/functions/og-images?urls=${ARTICLE_URLS.map(encodeURIComponent).join(',')}`)
      .then(r => r.json())
      .then(setOgImages)
      .catch(() => {})
  }, [])

  function thumbFor(item) {
    return item.thumbnail || ogImages[item.url] || null
  }

  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="masthead-wrap">
        <h1 className="masthead">
          RESOURCES
          <span className="masthead-sub">Various Contact Information and Helpful Resources</span>
        </h1>
        <div className="masthead-rule" />
      </div>

      <div className="contact-info">
        <h4>District Attorney Tanner Rause — Phone: 610-891-4168 Email: rouset@co.delaware.pa.us</h4>
        <h4>President Valerie Smith — Phone: 610-328-8314 Email: president@swarthmore.edu</h4>
        <h4>Vice President of Student Affairs Stephanie Ives — Phone: 610-328-83654 Email: sives1@swarthmore.edu</h4>
      </div>

      <div className="press-list">
        {PRESS.map(({ category, items }) => (
          <div key={category} className="press-section">
            <h2 className="press-category">{category}</h2>
            <ul className="press-items">
              {items.map((item) => (
                <li key={item.url} className="press-item">
                  <a className="press-link" href={item.url} target="_blank" rel="noopener noreferrer">
                    {thumbFor(item)
                      ? <img className="press-thumb" src={thumbFor(item)} alt="" loading="lazy" />
                      : <div className="press-thumb press-thumb--empty" />
                    }
                    <div className="press-text">
                      <span className="press-title">{item.label}</span>
                      <span className="press-outlet">{item.outlet}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  )
}
