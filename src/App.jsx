import { useState } from 'react'
import JotFormData from './JotFormData'

function MoonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

function App() {
  const [dark, setDark] = useState(true)

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
      <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
        {dark ? <MoonIcon /> : <SunIcon />}
      </button>
      <div className="masthead-wrap">
        <h1 className="masthead">The Swarthmore Nine</h1>
        <div className="masthead-rule" />
        <p className="subheading"> On May 3rd, 2025, Swarthmore College called over thirty police officers onto campus to <a href = "https://www.theguardian.com/us-news/2025/may/02/swarthmore-students-suspended-pro-palestinian-camp">sweep</a> a Pro-Palestinian encampment, brutally arresting 9 peaceful protestors. The police severely injured several students in the process, as documented in contemporaneous reporting, <a href = "https://swarthmorephoenix.com/2025/05/07/the-encampment-in-photos/">here.</a> Campus administrators at Swarthmore facilitated this assault <a href= "https://swarthmorephoenix.com/2026/04/16/swarthmore-called-the-police-on-our-protest-now-im-preparing-for-trial/"> against their students </a> and community members directly outside of an academic building. Such violence against students is unacceptable and stands in direct contradiction to the principles that make learning on a college campus possible. Swarthmore College initiated and sustained third-degree misdemeanor trespassing charges against the arrested protestors, and now over a year later they each face a potential sentence of up to one year in prison. The American Association of University Professors has long affirmed that freedom of expression, including political protest, is essential to the academic mission. Swarthmore's facilitation of criminal charges against student protesters places it in direct violation of these foundational principles.
On June 29th, the "Swarthmore 9” will begin trial at the Delaware County Courthouse in Media, Pennsylvania. Though the charges are being carried through by District Attorney Tanner Rouse, Swarthmore College is in direct communication with the prosecution; maintaining the influence to drop these charges against peaceful protestors. Instead, Swarthmore College, a historically Quaker institution is exposing students and community members to the unpredictable vicissitudes of legal prosecution merely for exercising their right to advocate for divestment from genocide. Acquiescing to the federal government, these charges expose students to a far-right administration that has announced its intentions to arrest, detain, and deport student protestors, eroding 
We recognize that academic institutions today face significant federal pressure to restrict campus activism. This context makes the courage to protect students all the more necessary, and its absence all the more consequential. 
Recently, faculty members at Swarthmore published an <a href = "https://swarthmorephoenix.com/2026/04/30/faculty-and-alum-on-the-erosion-of-free-protest-at-swarthmore/"> open letter </a> decrying the chilling of free expression on their campus. Student organizations published their own <a href =" https://swarthmorevoices.com/content-1/2026/5/7/b4qfc4egf429ww89yh4ldz881yqqul">letter</a>, declaring support for the nine protesters and calling on the College to drop the charges. The College has yet to act on the needed change urged by its own faculty and students. As scholars of conscience, we will not engage with Swarthmore College while they criminalize student protest—a cornerstone of intellectual life at any academic institution
 We stand in solidarity with the nine student protestors and affirm the call progressed by Swarthmore students and faculty, including Swarthmore SJP, for an academic boycott of Swarthmore College. 
As such, we will not accept or seek engagement with Swarthmore College — including invitations to speak, fellowships, professorships, and all other academic appointments and opportunities — until the College moves to <a href="https://swarthmorephoenix.com/2026/04/23/sgo-resolution-urging-the-dismissal-of-trespassing-charges/">drop the charges</a> brought against the Swarthmore 9, and reestablishes itself as an institution of learning committed to freedom of expression, including the right to protest. President Valerie Smith must send a letter to District Attorney Tanner Rouse clearly articulating a firm request that the charges be immediately dropped, and affirming Swarthmore's commitment to free expression.
This pledge is not a condemnation of Swarthmore's faculty, students, or staff, many of whom have themselves spoken out against the College's actions. It is, instead, a refusal to lend  legitimacy to an administration that has chosen criminalization over the protection of its own community. In these moments of crisis, our academic institutions must reaffirm their commitment to the principles of free expression and academic freedom that sustain the honest and robust pursuit of knowledge to which we have devoted ourselves and our careers. We sign this pledge in affirmation of that commitment.
 </p>
      </div>
      <JotFormData />
    </div>
  )
}

export default App
