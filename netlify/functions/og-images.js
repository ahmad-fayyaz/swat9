export default async function handler(req) {
  const { searchParams } = new URL(req.url)
  const urls = searchParams.get('urls')?.split(',').filter(Boolean) || []

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
          signal: AbortSignal.timeout(5000),
        })
        const html = await res.text()
        const match =
          html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
          html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
        return [url, match?.[1] || null]
      } catch {
        return [url, null]
      }
    })
  )

  return Response.json(Object.fromEntries(results))
}
