import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import JotFormData from './JotFormData'
import Home from './pages/Home'
import Action from './pages/Action'
import Cisco from './pages/Cisco'
import Press from './pages/Press'

function Pledge() {
  return (
    <Layout>
      <div className="masthead-wrap">
        <h1 className="masthead">
          In Defense of the Swat 9:
          <span className="masthead-sub">CALL FOR AN ACADEMIC BOYCOTT OF SWARTHMORE COLLEGE</span>
        </h1>
        <div className="masthead-rule" />
      </div>
      <div className="prose">
        <p>On May 3rd, 2025, Swarthmore College called over thirty police officers onto campus to <a href="https://www.theguardian.com/us-news/2025/may/02/swarthmore-students-suspended-pro-palestinian-camp">sweep</a> a Pro-Palestinian encampment, brutally arresting 9 peaceful protestors. The police severely injured several students in the process, as documented in contemporaneous reporting, <a href="https://swarthmorephoenix.com/2025/05/07/the-encampment-in-photos/">here.</a> Campus administrators at Swarthmore facilitated this assault <a href="https://swarthmorephoenix.com/2026/04/16/swarthmore-called-the-police-on-our-protest-now-im-preparing-for-trial/">against their students</a> and community members directly outside of an academic building. Such violence against students is unacceptable and stands in direct contradiction to the principles that make learning on a college campus possible. Swarthmore College initiated and sustained third-degree misdemeanor trespassing charges against the arrested protestors, and now over a year later they each face a potential sentence of up to one year in prison. The American Association of University Professors has long affirmed that freedom of expression, including political protest, is essential to the academic mission. Swarthmore's facilitation of criminal charges against student protesters places it in direct violation of these foundational principles.</p>
        <p>On June 29th, the "Swarthmore 9” will begin trial at the Delaware County Courthouse in Media, Pennsylvania. Though the charges are being carried through by District Attorney Tanner Rouse, Swarthmore College is in direct communication with the prosecution; maintaining the influence to drop these charges against peaceful protestors. Instead, Swarthmore College, a historically Quaker institution is exposing students and community members to the unpredictable vicissitudes of legal prosecution merely for exercising their right to advocate for divestment from genocide. Acquiescing to the federal government, these charges expose students to a far-right administration that has announced its intentions to arrest, detain, and deport student protestors.</p>
        <p>We recognize that academic institutions today face significant federal pressure to restrict campus activism. This context makes the courage to protect students all the more necessary, and its absence all the more consequential.</p>
        <p>Recently, faculty members at Swarthmore published an <a href="https://swarthmorephoenix.com/2026/04/30/faculty-and-alum-on-the-erosion-of-free-protest-at-swarthmore/">open letter</a> decrying the chilling of free expression on their campus. Student organizations published their own <a href="https://swarthmorevoices.com/content-1/2026/5/7/b4qfc4egf429ww89yh4ldz881yqqul">letter</a>, declaring support for the nine protesters and calling on the College to drop the charges. The College has yet to act on the needed change urged by its own faculty and students. As scholars of conscience, we will not engage with Swarthmore College while they criminalize student protest—a cornerstone of intellectual life at any academic institution.</p>
        <p>We stand in solidarity with the nine student protestors and affirm the call progressed by Swarthmore students and faculty, including Swarthmore SJP, for an academic boycott of Swarthmore College.</p>
        <p>As such, we will not accept or seek engagement with Swarthmore College — including invitations to speak, fellowships, professorships, and all other academic appointments and opportunities — until the College moves to <a href="https://swarthmorephoenix.com/2026/04/23/sgo-resolution-urging-the-dismissal-of-trespassing-charges/">drop the charges</a> brought against the Swarthmore 9, and reestablishes itself as an institution of learning committed to freedom of expression, including the right to protest. President Valerie Smith must send a letter to District Attorney Tanner Rouse clearly articulating a firm request that the charges be immediately dropped, and affirming Swarthmore's commitment to free expression.</p>
        <p>This pledge is not a condemnation of Swarthmore's faculty, students, or staff, many of whom have themselves spoken out against the College's actions. It is, instead, a refusal to lend legitimacy to an administration that has chosen criminalization over the protection of its own community. In these moments of crisis, our academic institutions must reaffirm their commitment to the principles of free expression and academic freedom that sustain the honest and robust pursuit of knowledge to which we have devoted ourselves and our careers. We sign this pledge in affirmation of that commitment.</p>
      </div>
      <JotFormData />
    </Layout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pledge" element={<Pledge />} />
      <Route path="/court-support" element={<Action />} />
      <Route path="/cisco" element={<Cisco />} />
      <Route path="/press" element={<Press />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
