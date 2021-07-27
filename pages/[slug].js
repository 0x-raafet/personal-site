import styled from 'styled-components'
import { formatDate } from 'utils/formatDate'
import RichText from 'components/RichText'

import matter from 'gray-matter'
import Head from 'next/head'
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead'
import MetadataHead from 'views/SingleArticlePage/MetadataHead'
import Header from 'views/SingleArticlePage/Header'
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead'
import { getAllPostsSlugs, getSinglePost } from 'utils/postsFetcher'

export default function SingleArticlePage(props) {
  const { slug, content, meta } = props
  const { title, description, date } = meta

  const formattedDate = formatDate(new Date(date))
  const readTime = `9 min read`

  return (
    <>
      <Head>
        <link href="/prism-theme.css" rel="stylesheet" />
      </Head>
      <OpenGraphHead slug={slug} {...meta} />
      <StructuredDataHead slug={slug} {...meta} />
      <MetadataHead {...meta} />
      <Container id="content">
        <Header title={title} formattedDate={formattedDate} readTime={readTime} />
        <RichText {...content} />
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const posts = getAllPostsSlugs()
  return {
    paths: posts.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug, content, meta } = await getSinglePost(params.slug)
  const serializedContent = await serializeContent(content, meta)
  return { props: { slug, content: serializedContent, meta } }

  async function serializeContent(content, meta) {
    const { serialize } = require('next-mdx-remote/serialize')
    return serialize(content, {
      scope: meta,
      mdxOptions: {
        remarkPlugins: [
          require('@fec/remark-a11y-emoji'),
          require('remark-breaks'),
          require('remark-gfm'),
          require('remark-footnotes'),
          require('remark-external-links'),
          [require('remark-toc'), { ordered: true, tight: true, maxDepth: 3 }],
          require('remark-slug'),
          require('remark-sectionize'),
        ],
        rehypePlugins: [],
      },
    })
  }
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${(p) => p.theme.spacings.mediumContainer}px;
  padding: 0 ${(p) => p.theme.spacings.xs}px;
  margin: 0 auto;
`
