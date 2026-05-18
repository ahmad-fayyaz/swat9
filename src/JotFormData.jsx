import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_JOTFORM_API_KEY
const BASE = 'https://api.jotform.com'

function formatAnswer(value) {
  if (value === null || value === undefined) return '—'
  if (typeof value !== 'object') return String(value)
  // Name field: {first, last}
  if ('first' in value || 'last' in value)
    return [value.first, value.last].filter(Boolean).join(' ')
  // Address, date, or any other compound field
  return Object.values(value).filter(Boolean).join(', ')
}

function FormSubmissions({ formId }) {
  const [submissions, setSubmissions] = useState([])
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [subRes, qRes] = await Promise.all([
        fetch(`${BASE}/form/${formId}/submissions?apiKey=${API_KEY}&limit=50&orderby=created_at`),
        fetch(`${BASE}/form/${formId}/questions?apiKey=${API_KEY}`),
      ])
      const subJson = await subRes.json()
      const qJson = await qRes.json()

      const questions = Object.values(qJson.content || {})
        .filter(q => q.type !== 'control_head' && q.type !== 'control_button')
        .sort((a, b) => a.order - b.order)

      setFields(questions)
      setSubmissions(subJson.content || [])
      setLoading(false)
    }
    load()
  }, [formId])

  if (loading) return <p className="jf-loading">Loading submissions…</p>
  if (!submissions.length) return <p className="jf-empty">No submissions yet.</p>

  return (
    <div className="jf-table-wrap">
      <table className="jf-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            {fields.map(f => <th key={f.qid}>{f.text || f.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub, i) => (
            <tr key={sub.id}>
              <td>{i + 1}</td>
              <td>{new Date(sub.created_at).toLocaleDateString()}</td>
              {fields.map(f => (
                <td key={f.qid}>
                  {formatAnswer(sub.answers?.[f.qid]?.answer)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function JotFormData() {
  const [forms, setForms] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${BASE}/user/forms?apiKey=${API_KEY}&limit=20&orderby=updated_at`)
      .then(r => r.json())
      .then(json => {
        if (json.responseCode !== 200) throw new Error(json.message)
        const list = json.content || []
        setForms(list)
        if (list.length === 1) setSelected(list[0].id)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="jf-loading">Connecting to JotForm…</p>
  if (error) return <p className="jf-error">JotForm error: {error}</p>

  return (
    <div className="jf-root">
      {forms.length > 1 && (
        <div className="jf-form-picker">
          {forms.map(f => (
            <button
              key={f.id}
              className={`jf-form-btn ${selected === f.id ? 'active' : ''}`}
              onClick={() => setSelected(f.id)}
            >
              {f.title}
              <span className="jf-count">{f.count}</span>
            </button>
          ))}
        </div>
      )}
      {selected && <FormSubmissions formId={selected} />}
      {!selected && forms.length > 1 && (
        <p className="jf-empty">Select a form above to view submissions.</p>
      )}
    </div>
  )
}
