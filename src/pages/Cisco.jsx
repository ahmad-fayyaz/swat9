import Layout from '../Layout'
import { useState, useEffect } from 'react'

const CISCO = [
  {
    category: 'News',
    items: [
      {
        label: 'Leaked Documents Show Cisco Systems’ Deep Relationship with Israeli Security State',
        outlet: 'Drop Site News',
        url: 'https://www.dropsitenews.com/p/cisco-systems-israel-genocide-gaza',
      },
      {
        label: 'Investigative Report on Cisco\'s Implication in War Crimes',
        outlet: 'American Friends Service Committee',
        url: 'https://investigate.afsc.org/company/cisco-systems',
      },
      {
        label: 'Cisco\'s involvement in the Israeli Occupation',
        outlet: 'Business and Human Rights Center',
        url: 'https://media.business-humanrights.org/media/documents/files/documents/CISCOfinal-web.pdf',
      },
      {
        label: 'Cisco\'s Violation of BDS',
        outlet: 'BDS Movement',
        url: 'https://bdsmovement.net/cisco',
      },
      {
        label: 'Workers at the tech giant Cisco say they’ve been harassed and silenced for fighting the company’s ties to Israel and advocating for Palestinian rights.',
        outlet: 'Al Jazeera',
        url: 'https://www.instagram.com/reels/DG35nj8MVtM/',
      },
    ],
  },
]

const ALL_ITEMS = CISCO.flatMap(s => s.items)
const ARTICLE_URLS = ALL_ITEMS.filter(i => !i.thumbnail).map(i => i.url)

export default function Cisco({ dark, setDark }) {
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
          Drop Cisco
          <span className="masthead-sub">The Swarthmore 9 were arrested for <a href="https://www.instagram.com/p/DJE_mhtutSq/">demanding</a> Swarthmore College divest from Cisco. Learn here about Cisco's complicity in genocide. </span>
        </h1>
        <div className="masthead-rule" />
      </div>

             <div className="press-list">
         {CISCO.map(({ category, items }) => (
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

