import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_JOTFORM_API_KEY
const BASE = 'https://api.jotform.com'

function formatAnswer(value) {
  if (value === null || value === undefined) return ''
  if (typeof value !== 'object') return String(value).trim()
  if ('first' in value || 'last' in value)
    return [value.first, value.last].filter(Boolean).join(' ')
  return Object.values(value).filter(Boolean).join(', ')
}

function Signatures({ formId }) {
  const [signatures, setSignatures] = useState([])
  const [loading, setLoading] = useState(true)

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

        const subs = (subJson.content || []).map(sub => ({
          id: sub.id,
          name: nameQ ? formatAnswer(sub.answers?.[nameQ.qid]?.answer) : '',
          position: positionQ ? formatAnswer(sub.answers?.[positionQ.qid]?.answer) : '',
          org: orgQ ? formatAnswer(sub.answers?.[orgQ.qid]?.answer) : '',
        })).filter(s => s.name)

        setSignatures(subs)
      } catch {
        // silently fail — show empty state
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [formId])

  if (loading) return <p className="sig-status">Loading signatures…</p>
  if (!signatures.length) return <p className="sig-status">No signatures yet.</p>

  return (
    <div className="signatures">
      <h2 className="sig-heading">Signatories <span className="sig-count">({signatures.length})</span></h2>
      <ol className="sig-list">
        {signatures.map(s => (
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${BASE}/user/forms?apiKey=${API_KEY}&limit=20&orderby=updated_at`)
      .then(r => r.json())
      .then(json => {
        if (json.responseCode !== 200) throw new Error(json.message)
        const forms = json.content || []
        if (forms.length) setFormId(forms[0].id)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null
  if (error) return <p className="sig-status">Error: {error}</p>
  if (!formId) return null

  return <Signatures formId={formId} />
}
