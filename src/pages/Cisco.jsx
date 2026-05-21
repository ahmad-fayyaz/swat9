import Layout from '../Layout'
import { useState, useEffect, useRef } from 'react'
import ciscoKills from '../assets/cisco_kills.png'
import ciscoBanner from '../assets/cisco_banner.png'



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
  const headlineRef = useRef(null)
  const [headlineWidth, setHeadlineWidth] = useState(null)

  useEffect(() => {
    const prev = dark
    setDark(true)
    return () => setDark(prev)
  }, [])

  useEffect(() => {
    if (!headlineRef.current) return
    const measure = () => {
      if (headlineRef.current) setHeadlineWidth(headlineRef.current.offsetWidth)
    }
    document.fonts.ready.then(measure)
    const obs = new ResizeObserver(measure)
    obs.observe(headlineRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!ARTICLE_URLS.length) return
    fetch(`/.netlify/functions/og-images?urls=${ARTICLE_URLS.map(encodeURIComponent).join(',')}`)
      .then(r => r.json())
      .then(setOgImages)
      .catch(() => {})
  }, [])

  function thumbFor(item) {
    return item.thumbnail || ogImages[item.url] || ciscoKills
  }

  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="masthead-wrap">
        <h1 ref={headlineRef} className="masthead" style={{ fontSize: 'clamp(2rem, 9vw, 7rem)' }}>
          The Swarthmore 9 Were Arrested
        </h1>
        <div className="masthead-rule masthead-rule--single" />
        <p className="masthead-sub" style={{ fontSize: 'clamp(1.2rem, 4vw, 3rem)', width: '100%', textAlign: 'justify', textAlignLast: 'justify' }}>FOR <a href="https://www.instagram.com/p/DJE_mhtutSq/">DEMANDING</a> SWARTHMORE COLLEGE TO DIVEST FROM CISCO.</p>
        <img src={ciscoBanner} alt="" style={{ display: 'block', width: headlineWidth ? `${headlineWidth}px` : 0, marginTop: '2rem' }} />
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

