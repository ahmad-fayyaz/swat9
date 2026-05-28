import Layout from '../Layout'

const CONTACTS = [
  {
    name: 'District Attorney Tanner Rouse',
    phone: '610-891-4168',
    email: 'rouset@co.delaware.pa.us',
  },
  {
    name: 'President Valerie Smith',
    phone: '610-328-8314',
    email: 'president@swarthmore.edu',
  },
  {
    name: 'VP of Student Affairs Stephanie Ives',
    phone: '610-328-8365',
    email: 'sives1@swarthmore.edu',
  },
]

const RESOURCES = [
  {
    label: 'Alumni Call / Email Script',
    note: 'Can be adapted for any sympathetic supporter to call and email the college',
    url: 'https://docs.google.com/document/d/1gHlb6XwRz0TDxGSDaFEK561RLsul1ExQ-vGTPyP0hHU/edit?usp=drivesdk',
  },
  {
    label: 'Timeline of repression at Swarthmore',
    note: 'Swat Alumni for Palestine',
    url: 'https://docs.google.com/document/d/1KdIhC_vsSkmaDob8UNJHtpBd3r-vXpTu9R0GTghPL4A/edit?usp=drivesdk',
  },
]

export default function Resources({ dark, setDark }) {
  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="masthead-wrap">
        <h1 className="masthead">
          Resources
          <span className="masthead-sub">Contact Information &amp; Helpful Resources</span>
        </h1>
        <div className="masthead-rule" />
      </div>

      <div className="resources-wrap">
        <section className="resources-section">
          <h2 className="press-category">Contact</h2>
          <ul className="contact-list">
            {CONTACTS.map(({ name, phone, email }) => (
              <li key={email} className="contact-item">
                <span className="contact-name">{name}</span>
                <span className="contact-details">
                  <a className="contact-link" href={`tel:${phone}`}>{phone}</a>
                  <span className="contact-sep">·</span>
                  <a className="contact-link" href={`mailto:${email}`}>{email}</a>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="resources-section">
          <h2 className="press-category">Additional Resources</h2>
          <ul className="resource-list">
            {RESOURCES.map(({ label, note, url }) => (
              <li key={url} className="resource-item">
                <a className="resource-link" href={url} target="_blank" rel="noopener noreferrer">
                  <span className="resource-title">{label}</span>
                  {note && <span className="resource-note">{note}</span>}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}
