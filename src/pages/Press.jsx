import Layout from '../Layout'

export default function Press({ dark, setDark }) {
  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="masthead-wrap">
        <h1 className="masthead">
          Press
          <span className="masthead-sub">Media coverage and press inquiries</span>
        </h1>
        <div className="masthead-rule" />
      </div>
    </Layout>
  )
}
