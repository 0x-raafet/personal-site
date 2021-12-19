import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import AuthorInfo from 'components/AuthorInfo'
import RichText from 'components/RichText'
import { serializeMdxContent } from 'utils/serializeMdxContent'
import { getAllSnippetsSlugs, getSingleSnippet } from 'utils/snippetsFetcher'
import Header from 'views/SingleArticlePage/Header'
import MetadataHead from 'views/SingleArticlePage/MetadataHead'
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead'
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead'

const Comments = dynamic(() => import('views/SingleArticlePage/Comments'), { ssr: false })
const ReactionsWidget = dynamic(() => import('components/ReactionsWidget'), { ssr: false })

export default function SingleSnippetPage(props) {
  const { slug, content, meta } = props
  const { title } = meta

  return (
    <>
      <Head>
        <link rel="stylesheet" href={`/prism-theme.css`} />
      </Head>
      <OpenGraphHead slug={slug} {...meta} />
      <StructuredDataHead slug={slug} {...meta} />
      <MetadataHead {...meta} />
      <Container id="content">
        <ReactionsWidget />
        <Header title={title} />
        <RichText {...content} />
        <AuthorInfo />
        <Comments />
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const posts = getAllSnippetsSlugs()
  return {
    paths: posts.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug, content, meta } = await getSingleSnippet(params.slug)
  const serializedContent = await serializeMdxContent(content, meta)
  return { props: { slug, content: serializedContent, meta } }
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
