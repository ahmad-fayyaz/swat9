import Layout from '../Layout'

export default function Cisco({ dark, setDark }) {
  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="masthead-wrap">
        <h1 className="masthead">
          Drop Cisco
          <span className="masthead-sub">Collected information on Cisco's involvement in Gaza</span>
        </h1>
        <div className="masthead-rule" />
      </div>
    </Layout>
  )
}
