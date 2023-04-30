import metadataScraper from 'metadata-scraper'

export default async function handler(req, res) {
  const { title, description, image } = await metadataScraper(req.query.url)
  res.send({ title, description, image })
}
