import Layout from '../Layout'

export default function Home({ dark, setDark }) {
  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="masthead-wrap">
        <h1 className="masthead">
          The Swat IX
          <span className="masthead-sub">Stand in Solidarity with the Swarthmore 9</span>
        </h1>
        <div className="masthead-rule" />
      </div>
    </Layout>
  )
}
