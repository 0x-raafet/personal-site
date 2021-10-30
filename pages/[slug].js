import dynamic from 'next/dynamic'
import Head from 'next/head'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import AuthorInfo from 'components/AuthorInfo'
import RichText from 'components/RichText'
import Spacer from 'components/Spacer'
import { formatDate } from 'utils/formatDate'
import { getReadTime } from 'utils/getReadTime'
import { getAllPostsSlugs, getSinglePost } from 'utils/postsFetcher'
import Header from 'views/SingleArticlePage/Header'
import MetadataHead from 'views/SingleArticlePage/MetadataHead'
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead'
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead'

const Comments = dynamic(() => import('views/SingleArticlePage/Comments'), { ssr: false })
const ReactionsWidget = dynamic(() => import('components/ReactionsWidget'), { ssr: false })

export default function SingleArticlePage(props) {
  const { slug, content, meta, readTime } = props
  const { title, description, date } = meta

  const formattedDate = formatDate(new Date(date))

  useEffect(() => {
    const prismThemeLinkEl = document.querySelector('link[data-id="prism-theme"]')

    if (!prismThemeLinkEl) {
      const headEl = document.querySelector('head')
      const newEl = document.createElement('link')
      newEl.setAttribute('data-id', 'prism-theme')
      newEl.setAttribute('rel', 'stylesheet')
      newEl.setAttribute('href', '/prism-theme.css')
      newEl.setAttribute('media', 'print')
      newEl.setAttribute('onload', "this.media='all'; this.onload=null;")
      headEl.appendChild(newEl)
    }
  }, [])

  return (
    <>
      <Head>
        <noscript>
          <link rel="stylesheet" href="/prism-theme.css" />
        </noscript>
      </Head>
      <OpenGraphHead slug={slug} {...meta} />
      <StructuredDataHead slug={slug} {...meta} />
      <MetadataHead {...meta} />
      <Container id="content">
        <ReactionsWidget />
        <Header title={title} formattedDate={formattedDate} readTime={readTime} />
        <RichText {...content} />
        <AuthorInfo />
        <Comments />
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
  return { props: { slug, content: serializedContent, meta, readTime: getReadTime(content) } }

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
  position: relative;
  flex-direction: column;
  align-items: center;
  max-width: ${(p) => p.theme.spacings.mediumContainer}px;
  padding: 0 ${(p) => p.theme.spacings.xs}px;
  margin: 0 auto;
  margin-bottom: 38px;
`
