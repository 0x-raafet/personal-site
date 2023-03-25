import { styled } from '@linaria/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import withHydrationOnDemand from 'react-hydration-on-demand'
import AuthorInfo from 'components/AuthorInfo'
import Link from 'components/Link'
import MidDot from 'components/MidDot'
import RichText from 'components/RichText'
import { useLazyLoadCss } from 'hooks/useLazyLoadCss'
import { withTheme } from 'theme'
import { formatDate } from 'utils/formatDate'
import { getReadTime } from 'utils/getReadTime'
import { getAllPostsSlugs, getSimilarPosts, getSinglePost } from 'utils/postsFetcher'
import { serializeMdxContent } from 'utils/serializeMdxContent'
import Header from 'views/SingleArticlePage/Header'
import MetadataHead from 'views/SingleArticlePage/MetadataHead'
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead'
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead'

const Comments = dynamic(() => import('views/SingleArticlePage/Comments'), { ssr: false })
const ReactionsWidget = dynamic(() => import('components/ReactionsWidget'), { ssr: false })

export default function SingleArticlePage(props) {
  const { slug, content, meta, readTime, similarPosts } = props
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
        <RichTextWraper>
          <CustomRichText {...content} />
        </RichTextWraper>

        <SimilarSectionContainer>
          <SectionTitle>Similar blog posts</SectionTitle>

          {similarPosts.map((singlePost) => {
            const date = formatDate(new Date(singlePost.meta.date))
            return (
              <ListItem key={singlePost.slug}>
                <Link href={'/' + singlePost.slug}>{singlePost.meta.title}</Link>
                <Details>
                  <time dateTime={singlePost.meta.date}>{date}</time> <strong>({singlePost.readTime})</strong>
                </Details>
              </ListItem>
            )
          })}
        </SimilarSectionContainer>

        <Line />
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
  const similarPosts = await getSimilarPosts(slug)
  const serializedContent = await serializeMdxContent(content, meta)
  return { props: { slug, content: serializedContent, meta, readTime: getReadTime(content), similarPosts } }
}

const SimilarSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: none;
  align-self: flex-start;
  width: 100%;
`

const ListItem = withTheme(styled.div`
  font-size: 22px;
  margin: 8px 0;

  p {
    margin-top: 6px;
    font-size: 16px;
  }
`)

const SectionTitle = withTheme(styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 25px;
  margin-top: 45px;

  @media (max-width: 30em) {
    font-size: 28px;
    margin-bottom: 15px;
    margin-bottom: 35px;
  }
`)

const Line = styled.hr`
  border: none;
  height: 1px;
  background: #181c24;
  width: 100%;
  margin: 40px 0;
`

const Details = withTheme(styled.div`
  font-size: 14px;
  opacity: 0.8;
`)

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

const RichTextWraper = styled.div`
  width: 100%;
`

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
  top: 500px;
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
