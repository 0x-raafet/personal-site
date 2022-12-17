import { styled } from '@linaria/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import withHydrationOnDemand from 'react-hydration-on-demand'
import AuthorInfo from 'components/AuthorInfo'
import RichText from 'components/RichText'
import { useLazyLoadCss } from 'hooks/useLazyLoadCss'
import { withTheme } from 'theme'
import { formatDate } from 'utils/formatDate'
import { getReadTime } from 'utils/getReadTime'
import { getAllPostsSlugs, getSinglePost } from 'utils/postsFetcher'
import { serializeMdxContent } from 'utils/serializeMdxContent'
import Header from 'views/SingleArticlePage/Header'
import MetadataHead from 'views/SingleArticlePage/MetadataHead'
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead'
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead'

const Comments = dynamic(() => import('views/SingleArticlePage/Comments'), { ssr: false })
const ReactionsWidget = dynamic(() => import('components/ReactionsWidget'), { ssr: false })

export default function SingleArticlePage(props) {
  const { slug, content, meta, readTime } = props
  const { title, date } = meta

  const [noJavaScriptMarkup] = useLazyLoadCss('prism-theme.css')

  const formattedDate = formatDate(new Date(date))

  return (
    <>
      <Head>{noJavaScriptMarkup}</Head>
      <OpenGraphHead slug={slug} {...meta} />
      <StructuredDataHead slug={slug} {...meta} />
      <MetadataHead {...meta} />
      <Container id="content">
        <ReactionsWrapper>
          <CustomReactionsWidget />
        </ReactionsWrapper>
        <Header title={title} description={meta.description} formattedDate={formattedDate} readTime={readTime} />
        <CustomRichText {...content} />
        <AuthorInfo />
        <Comments />
      </Container>
    </>
  )
}

const CustomReactionsWidget = withHydrationOnDemand({ on: ['idle'] })(ReactionsWidget)

const CustomRichText = withHydrationOnDemand({ on: ['idle', 'viewport'] })(RichText)

export async function getStaticPaths() {
  const posts = getAllPostsSlugs()
  return {
    paths: posts.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug, content, meta } = await getSinglePost(params.slug)
  const serializedContent = await serializeMdxContent(content, meta)
  return { props: { slug, content: serializedContent, meta, readTime: getReadTime(content) } }
}

const Container = withTheme(styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  padding: 0 12px;
  margin: 0 auto;
  margin-bottom: 38px;
`)

const ReactionsWrapper = withTheme(styled.div`
  position: sticky;
  z-index: 999;
  width: 96px;
  height: 110px;
  cursor: pointer;
  user-select: none;

  margin-top: -110px;
  margin-left: -192px;
  margin-right: auto;
  top: 600px;
  transition: transform 0.3s;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.15);
  }

  @media (max-width: 80em) {
    display: none;
  }
`)
