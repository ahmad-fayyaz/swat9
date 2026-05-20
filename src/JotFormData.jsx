import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_JOTFORM_API_KEY
const BASE = 'https://api.jotform.com'

const SEED_SIGNATURES = [
  { name: 'Aida Kasieva', position: 'Professor', org: 'Kyrgyz-Turkish Manas University' },
  { name: 'Alice Wujciak', position: 'Adjunct Professor', org: 'Broward College' },
  { name: 'Sherene Seikaly', position: 'Associate Professor of History', org: 'University of California Santa Barbara' },
  { name: 'Geo Maher', position: 'Coordinator', org: 'W.E.B. Du Bois Movement School for Abolition & Reconstruction' },
  { name: 'Kevin Unhammer', position: '', org: 'Free Software Foundation Europe' },
  { name: 'Howard Winant', position: 'Distinguished Professor', org: 'University of California Santa Barbara' },
  { name: 'Patricia Keeton', position: 'Emerita Prof of Communication Arts', org: 'Ramapo College of New Jersey' },
  { name: 'Tabassum Ruby', position: 'Assistant Professor', org: 'West Chester University' },
  { name: 'Nehal Naser', position: 'PhD Candidate', org: 'Rutgers University' },
  { name: 'Cynthia Gao', position: 'Assistant Professor', org: 'Middlebury College' },
  { name: 'Adam Miyashiro', position: 'Professor of Literature', org: 'Stockton University' },
  { name: 'Ricardo Gabriel', position: 'Assistant Professor of Sociology', org: 'Stockton University' },
  { name: 'Sukaina Hirji', position: 'Associate Professor', org: 'University of Pennsylvania' },
  { name: 'Donna Murch', position: 'Associate Professor', org: 'Rutgers University' },
  { name: 'Tricia Gallagher-Geurtsen', position: 'Lecturer', org: 'University of California Santa Cruz' },
  { name: 'Matthew Vargas', position: 'Staff', org: 'Florida Agricultural and Mechanical University' },
  { name: 'Charlotte Jacobs', position: 'Adjunct Associate Professor', org: 'University of Pennsylvania' },
  { name: 'Michael Weithorn', position: 'Adjunct Professor, MFA Screenwriting', org: 'Columbia University' },
  { name: 'Danielle Bobker', position: 'Professor', org: 'Concordia University' },
  { name: 'Anne Norton', position: 'Professor Emerita', org: 'University of Pennsylvania' },
  { name: 'Denis Tokmashev', position: 'Independent Researcher', org: '' },
  { name: 'Furkan Akkurt', position: 'Teaching Assistant', org: 'Boğaziçi University' },
  { name: 'Andrew Lamont', position: 'Lecturer', org: 'University College London' },
  { name: 'David Palumbo-Liu', position: 'Louise Hewlett Nixon Professor and Professor of Comparative Literature', org: 'Stanford University' },
  { name: 'Hossep Dolatian', position: 'Scholar', org: 'Stony Brook University' },
  { name: 'Thomas Griffin', position: 'MSW/MPH Student', org: 'University at Buffalo (SUNY)' },
  { name: 'Kathryn DePaolis', position: 'Associate Professor', org: 'Eastern Washington University' },
  { name: 'Stanley Broadnax', position: 'Professor of Journalism + Design', org: 'The New School' },
  { name: 'Maryam Mushtaq', position: 'PhD Student, Teaching Fellow', org: 'The New School for Social Research' },
  { name: 'Chris Stone', position: 'Associate Professor of Arabic', org: 'Hunter College (CUNY)' },
  { name: 'Dawn Weleski', position: 'Adjunct Instructor', org: 'SUNY Morrisville' },
  { name: 'Peggy Gould', position: 'Faculty', org: 'Sarah Lawrence College' },
  { name: 'Anna Badkhen', position: 'Artist-in-Residence', org: 'University of Pennsylvania' },
  { name: 'Pauline Lipman', position: 'Professor', org: 'University of Illinois at Chicago' },
  { name: 'Jennifer Queenan', position: 'PhD Candidate', org: 'City University of New York Graduate Center' },
  { name: 'Kori Goldberg', position: 'Educator', org: 'United Federation of Teachers' },
  { name: 'Qrescent Mason', position: 'Associate Professor of Philosophy', org: 'Haverford College' },
  { name: 'Lindsay Reckson', position: 'Professor and Chair of English', org: 'Haverford College' },
  { name: 'John King', position: 'Associate Adjunct Professor', org: 'New York University' },
  { name: 'Laura Liu', position: 'Associate Prof of Global Studies and Geography', org: 'The New School' },
  { name: 'Danielle Twiss', position: 'PhD Student, SENS-UAW Unit Chair', org: 'The New School' },
  { name: 'Thomas Pedroni', position: 'Associate Professor', org: 'Wayne State University' },
  { name: 'Ashley Minihan', position: 'Writing Center Staff Member', org: 'John Jay College, CUNY' },
  { name: 'Davarian Baldwin', position: 'Distinguished Professor', org: 'Trinity College' },
  { name: 'Ujju Aggarwal', position: 'Assistant Professor', org: 'The New School' },
  { name: 'Robert Sember', position: 'Faculty', org: 'The New School' },
  { name: 'Michelle Fine', position: 'Distinguished Professor', org: 'The Graduate Center CUNY' },
  { name: 'Ariek Norford', position: 'PhD Candidate', org: 'Stony Brook University' },
  { name: 'Maureen Milligan', position: 'Staff', org: 'University at Buffalo (SUNY)' },
  { name: 'Owain Lawson', position: 'Assistant Professor', org: 'Lehigh University' },
  { name: 'Mary Coffey', position: 'Professor of Art History and Latin American, Latino, and Caribbean Studies', org: 'Dartmouth College' },
  { name: 'Elena Razlogova', position: 'Associate Professor', org: 'Concordia University' },
  { name: 'Deborah Armintor', position: 'Principal Lecturer of English', org: 'University of North Texas' },
  { name: 'Eli Meyerhoff', position: 'Visiting Scholar, Staff', org: 'Duke University' },
  { name: 'Judah Adashi', position: 'Faculty', org: 'Johns Hopkins University' },
  { name: 'Laura McTighe', position: 'Associate Professor of Religion', org: 'Florida State University' },
  { name: 'Photini Sinnis', position: 'Professor', org: 'Johns Hopkins University' },
  { name: 'Mark Levine', position: 'Professor of History', org: 'UC Irvine' },
  { name: 'Ethel Brooks', position: "Chair, Department of Women's, Gender and Sexuality Studies", org: 'Rutgers University' },
  { name: 'Tarik Aougab', position: 'Associate Professor of Mathematics', org: 'Haverford College' },
  { name: 'Catey Boyle', position: 'Postdoctoral Fellow', org: 'Middlebury College' },
  { name: 'Sharika Thiranagama', position: 'Associate Professor of Anthropology', org: 'Stanford University' },
  { name: 'Claire Begbie', position: 'Graduate Student', org: 'Concordia University' },
  { name: 'Usha Iyer', position: 'Faculty Member', org: 'Stanford University' },
  { name: 'Tom Alter', position: 'Independent Scholar', org: '' },
  { name: 'Caitie Moore', position: 'Librarian', org: 'School of Visual Arts' },
  { name: 'Benjamin Robinson', position: 'Associate Professor', org: 'Indiana University Bloomington' },
  { name: 'Theodora Dryer', position: 'Professor', org: 'New York University' },
  { name: 'Joan Flores-Villalobos', position: 'Associate Professor of History', org: 'University of Southern California' },
  { name: 'Naoko Shibusawa', position: 'Associate Professor of History', org: 'Brown University' },
  { name: 'Judith Plaskow', position: 'Professor Emerita', org: 'Manhattan University' },
  { name: 'Sigwan Thivierge', position: 'Assistant Professor', org: 'Concordia University' },
  { name: 'Lisa Hajjar', position: 'Professor of Sociology', org: 'University of California Santa Barbara' },
  { name: 'Claudio Fogu', position: 'Professor', org: 'University of California Santa Barbara' },
  { name: 'Dana Kornberg', position: 'Assistant Professor of Sociology', org: 'University of California Santa Barbara' },
  { name: 'Theodore Khoury', position: 'Professor', org: 'Portland State University' },
  { name: 'Victor Silverman', position: 'Professor Emeritus', org: 'Pomona College' },
  { name: 'Mita Banerjee', position: 'Professor of Psychology', org: 'Pitzer University' },
  { name: 'Huda Fakhreddine', position: 'Associate Professor', org: 'University of Pennsylvania' },
  { name: 'Linda Luu', position: 'PhD Candidate', org: 'New York University' },
  { name: 'Malek Abisaab', position: 'Associate Professor', org: 'McGill University' },
  { name: 'Nic Francisco', position: 'Independent Scholar', org: '' },
  { name: 'Lisa Rofel', position: 'Professor Emerita', org: 'University of California Santa Cruz' },
  { name: 'Nicole Morse', position: 'Associate Professor', org: 'University of Maryland, Baltimore County' },
  { name: 'Mark Taylor', position: 'Maxwell M Upson Professor Emeritus of Theology and Culture', org: 'Princeton Theological Seminary' },
  { name: 'Laura Levitt', position: 'Professor of Religion, Jewish Studies, and Gender', org: 'Temple University' },
  { name: 'Sang Kil', position: 'Professor', org: 'Independent' },
  { name: 'Sailaja Krishnamurti', position: 'Associate Professor', org: "Queen's University" },
  { name: 'Barry Trachtenberg', position: 'Professor', org: 'Wake Forest University' },
  { name: 'Caroline Udell', position: 'Design Arts Annex Manager', org: 'Drexel University' },
  { name: 'K. Christine Pae', position: 'Professor of Religion', org: 'Denison University' },
  { name: 'Anna Bigelow', position: 'Faculty', org: 'Stanford University' },
  { name: 'Treasure Tinsley', position: 'Doctoral Student', org: 'University of Minnesota' },
  { name: 'Terri Ginsberg', position: 'Assistant Teaching Professor', org: 'Rutgers University' },
  { name: 'Rebecca Alpert', position: 'Professor Emeritus', org: 'Temple University' },
  { name: 'Daniel Segal', position: 'Jean M. Pitzer Professor Emeritus', org: 'Pitzer College' },
  { name: 'Paula Casal', position: 'Professor', org: 'Pompeu Fabra University' },
  { name: 'Anitta Santiago', position: 'Faculty', org: 'Houston Community College (CUNY)' },
  { name: 'Zein Hassanein', position: 'Adjunct Professor', org: 'Drexel University' },
  { name: 'Lucien Baskin', position: 'Doctoral Student', org: 'City University of New York' },
  { name: 'Gray Tuttle', position: 'Professor', org: 'Columbia University' },
  { name: 'Marybeth Tamborra', position: 'Doctoral Student', org: 'City University of New York' },
  { name: 'Travis Vidic', position: 'Administrative Director and Graduate Student', org: 'Columbia University' },
  { name: 'Christopher Santiago', position: 'Lecturer', org: 'College of Staten Island (CUNY)' },
  { name: 'Saadia Toor', position: 'Professor', org: 'College of Staten Island (CUNY)' },
  { name: 'Nada Matta', position: 'Assistant Professor', org: 'Drexel University' },
  { name: 'Sarah Logan', position: 'Lecturer', org: 'Chestnut Hill College' },
  { name: 'Anthony Alessandrini', position: 'Professor of English & Middle Eastern Studies', org: 'City University of New York' },
  { name: 'David Arnow', position: 'Professor', org: 'Brooklyn College (CUNY)' },
  { name: 'Kevin Winkler', position: 'Developer', org: 'City University of New York' },
  { name: 'Jessica Hardie', position: 'Professor', org: 'Hunter College (CUNY)' },
  { name: 'Stuart Chen-Hayes', position: 'Professor', org: 'Lehman College (CUNY)' },
  { name: 'Maya Shankar', position: 'Law Student', org: 'Temple University' },
  { name: 'Sudip Bhattacharya', position: 'Lecturer', org: 'Rutgers University' },
  { name: 'Laura Martin', position: 'Lecturer', org: 'Rutgers University' },
  { name: 'Cooper Schwartz', position: 'Resident Physician', org: 'University of Pennsylvania' },
  { name: 'Audrey Hausig', position: 'Adjunct Faculty', org: 'Drexel University' },
  { name: 'Shenid Bhayroo', position: 'Assistant Professor', org: 'Saint Joseph\'s University' },
  { name: 'Christopher Rogers', position: 'Visiting Assistant Professor', org: 'Haverford College' },
].map((s, i) => ({ ...s, id: `seed-${i}` }))

const SEED_NAMES = new Set(SEED_SIGNATURES.map(s => s.name.trim().toLowerCase()))

const BLACKLIST = new Set(['robin kelcy'])


function isEncrypted(str) {
  if (typeof str !== 'string') return false
  // name fields join first+last with a space, so check each word individually
  return str.split(/\s+/).some(word => word.length > 15 && /^[A-Za-z0-9+/]+=*$/.test(word))
}

function formatAnswer(value) {
  if (value === null || value === undefined) return ''
  if (typeof value !== 'object') return String(value).trim()
  if ('first' in value || 'last' in value)
    return [value.first, value.last].filter(Boolean).join(' ').trim()
  return Object.values(value).filter(Boolean).join(', ').trim()
}

function Signatures({ formId }) {
  const [liveSignatures, setLiveSignatures] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const [subRes, qRes] = await Promise.all([
          fetch(`${BASE}/form/${formId}/submissions?apiKey=${API_KEY}&limit=1000&orderby=created_at`),
          fetch(`${BASE}/form/${formId}/questions?apiKey=${API_KEY}`),
        ])
        const subJson = await subRes.json()
        const qJson = await qRes.json()

        const questions = Object.values(qJson.content || {})
        const EXCLUDE_TYPES = ['control_head', 'control_text', 'control_button']
        const find = (keywords) => questions.find(q =>
          !EXCLUDE_TYPES.includes(q.type) &&
          keywords.some(k => (q.text || q.name || '').toLowerCase().includes(k))
        )

        const nameQ = questions.find(q => q.type === 'control_fullname') || find(['full name', 'name'])
        const positionQ = find(['position', 'affiliation', 'occupation', 'title'])
        const orgQ = find(['institution', 'organization'])

        const live = (subJson.content || [])
          .filter(sub => sub.status !== 'DELETED')
          .map(sub => ({
            id: sub.id,
            name: nameQ ? formatAnswer(sub.answers?.[nameQ.qid]?.answer) : '',
            position: positionQ ? formatAnswer(sub.answers?.[positionQ.qid]?.answer) : '',
            org: orgQ ? formatAnswer(sub.answers?.[orgQ.qid]?.answer) : '',
          }))
          .filter(s =>
            s.name &&
            !isEncrypted(s.name) &&
            !isEncrypted(s.position) &&
            !isEncrypted(s.org) &&
            !SEED_NAMES.has(s.name.trim().toLowerCase()) &&
            !BLACKLIST.has(s.name.trim().toLowerCase())
          )

        setLiveSignatures(live)
      } catch {
        // silently fail — seed data still shows
      }
    }
    load()
  }, [formId])

  const lastName = name => name.trim().split(/\s+/).at(-1).toLowerCase()
  const all = [...SEED_SIGNATURES, ...liveSignatures]
    .sort((a, b) => lastName(a.name).localeCompare(lastName(b.name)))

  return (
    <div className="signatures">
      <h2 className="sig-heading">Signatories <span className="sig-count">({all.length})</span></h2>
      <ol className="sig-list">
        {all.map(s => (
          <li key={s.id} className="sig-item">
            <span className="sig-name">{s.name}</span>
            {(s.position || s.org) && (
              <span className="sig-meta">
                {[s.position, s.org].filter(Boolean).join(', ')}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function JotFormData() {
  const [formId, setFormId] = useState(null)

  useEffect(() => {
    fetch(`${BASE}/user/forms?apiKey=${API_KEY}&limit=20&orderby=updated_at`)
      .then(r => r.json())
      .then(json => {
        if (json.responseCode !== 200) throw new Error(json.message)
        const forms = json.content || []
        if (forms.length) setFormId(forms[0].id)
      })
      .catch(() => {})
  }, [])

  return <Signatures formId={formId} />
}
