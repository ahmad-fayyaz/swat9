import { useState, useEffect } from 'react'
import Layout from '../Layout'
import alumThumb from '../assets/alumThumb.png'

const PRESS = [
  {
    category: 'News',
    items: [
      {
        label: 'Swarthmore students suspended after pro-Palestinian encampment swept',
        outlet: 'The Guardian',
        url: 'https://www.theguardian.com/us-news/2025/may/02/swarthmore-students-suspended-pro-palestinian-camp',
      },
      {
        label: 'Swarthmore 9 defendant Jace Boland speaks out',
        outlet: 'DelCo Rising',
        url: 'https://delcorising.substack.com/p/swarthmore-9-defendant-jace-boland',
      },
    ],
  },
  {
    category: 'Campus Voice',
    items: [
      {
        label: 'Swarthmore called the police on our protest. Now I\'m preparing for trial.',
        outlet: 'The Swarthmore Phoenix',
        url: 'https://swarthmorephoenix.com/2026/04/16/swarthmore-called-the-police-on-our-protest-now-im-preparing-for-trial/',
      },
      {
        label: 'SGO resolution urging the dismissal of trespassing charges',
        outlet: 'The Swarthmore Phoenix',
        url: 'https://swarthmorephoenix.com/2026/04/23/sgo-resolution-urging-the-dismissal-of-trespassing-charges/',
      },
      {
        label: 'Faculty and alum on the erosion of free protest at Swarthmore',
        outlet: 'The Swarthmore Phoenix',
        url: 'https://swarthmorephoenix.com/2026/04/30/faculty-and-alum-on-the-erosion-of-free-protest-at-swarthmore/',
      },
      {
        label: 'Campus organizations in support of the Swarthmore 9',
        outlet: 'Swarthmore Voices',
        url: 'https://swarthmorevoices.com/content-1/2026/5/7/b4qfc4egf429ww89yh4ldz881yqqul',
      },
    ],
  },
  {
    category: 'Video & Audio',
    items: [
      {
        label: 'Interview with the Swarthmore 9',
        outlet: 'Millennials Are Killing Capitalism',
        url: 'https://www.youtube.com/live/eAPF_Q12mZE?si=rd_LwKEH1JyVK_ri',
        thumbnail: 'https://img.youtube.com/vi/eAPF_Q12mZE/maxresdefault.jpg',
      },
    ],
  },
  {
    category: 'Alumni Support',
    items: [
      {
        label: 'Letter to the Editor: Swarthmore Should At Least Be Honest About Its Values',
        outlet: 'Michael Weithorn \'78',
        url: 'https://swarthmorephoenix.com/2026/04/16/letter-to-the-editor-swarthmore-should-at-least-be-honest-about-their-values/',
      },
      {
        label: 'Letter of Support for Swarthmore Pro-Palestinian Protesters',
        outlet: 'Rev. Jim Colvin \'71',
        url: 'https://swarthmorevoices.com/content-1/2026/4/16/ibu4ua399q42rikwjqufb37ygzko6q',
      },
{
        label: 'May 4th, 2025, Alumni Statement on Encampment Arrests',
        outlet: 'Swat Alumni for Palestine',
        url: 'https://docs.google.com/document/d/10AnexbqHL1qDQOirZRH6xsX4ZsytUGNFpe4zgLfwuNk/edit?usp=drivesdk',
        thumbnail: alumThumb,
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
          Press
          <span className="masthead-sub">COVERAGE &amp; MEDIA</span>
        </h1>
        <div className="masthead-rule" />
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
