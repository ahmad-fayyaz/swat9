const API_KEY = process.env.JOTFORM_API_KEY
const BASE = 'https://api.jotform.com'

const EXCLUDE_TYPES = ['control_head', 'control_text', 'control_button']

function formatAnswer(value) {
  if (value === null || value === undefined) return ''
  if (typeof value !== 'object') return String(value).trim()
  if ('first' in value || 'last' in value)
    return [value.first, value.last].filter(Boolean).join(' ').trim()
  return Object.values(value).filter(Boolean).join(', ').trim()
}

function isEncrypted(str) {
  if (typeof str !== 'string') return false
  return str.split(/\s+/).some(word => word.length > 15 && /^[A-Za-z0-9+/]+=*$/.test(word))
}

export default async function handler() {
  try {
    const formsRes = await fetch(`${BASE}/user/forms?apiKey=${API_KEY}&limit=20&orderby=updated_at`)
    const formsJson = await formsRes.json()
    if (formsJson.responseCode !== 200) throw new Error(formsJson.message)

    const formId = formsJson.content?.[0]?.id
    if (!formId) throw new Error('No forms found')

    const [subRes, qRes] = await Promise.all([
      fetch(`${BASE}/form/${formId}/submissions?apiKey=${API_KEY}&limit=1000&orderby=created_at`),
      fetch(`${BASE}/form/${formId}/questions?apiKey=${API_KEY}`),
    ])
    const subJson = await subRes.json()
    const qJson = await qRes.json()

    const questions = Object.values(qJson.content || {})
    const find = (keywords) => questions.find(q =>
      !EXCLUDE_TYPES.includes(q.type) &&
      keywords.some(k => (q.text || q.name || '').toLowerCase().includes(k))
    )

    const nameQ = questions.find(q => q.type === 'control_fullname') || find(['full name', 'name'])
    const positionQ = find(['position', 'affiliation', 'occupation', 'title'])
    const orgQ = find(['institution', 'organization'])

    const signatures = (subJson.content || [])
      .filter(sub => sub.status !== 'DELETED')
      .map(sub => ({
        id: sub.id,
        name: nameQ ? formatAnswer(sub.answers?.[nameQ.qid]?.answer) : '',
        position: positionQ ? formatAnswer(sub.answers?.[positionQ.qid]?.answer) : '',
        org: orgQ ? formatAnswer(sub.answers?.[orgQ.qid]?.answer) : '',
      }))
      .filter(s => s.name && !isEncrypted(s.name) && !isEncrypted(s.position) && !isEncrypted(s.org))

    return Response.json({ signatures })
  } catch (err) {
    return Response.json({ signatures: [], error: err.message }, { status: 500 })
  }
}
