import groupBy from 'lodash/groupBy'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'components/Link'
import MidDot from 'components/MidDot'
import Page from 'components/Page'
import { formatDate } from 'utils/formatDate'
import { getReadTime } from 'utils/getReadTime'
import { getAllPosts } from 'utils/postsFetcher'
import MetadataHead from 'views/HomePage/MetadataHead'
import OpenGraphHead from 'views/HomePage/OpenGraphHead'
import StructuredDataHead from 'views/HomePage/StructuredDataHead'

export default function Home({ yearGroupedPosts }) {
  return (
    <>
      <OpenGraphHead />
      <MetadataHead />
      <StructuredDataHead />
      <Page title="Blog posts" description="My latest blog posts">
        <List>
          {yearGroupedPosts.map(([year, posts]) => (
            <YearSection key={year}>
              <Year>{year}</Year>
              <Posts>
                {posts.map((singlePost) => {
                  const formattedDate = formatDate(new Date(singlePost.date))

                  return (
                    <ListItem key={singlePost.slug}>
                      <Link href={'/' + singlePost.slug}>{singlePost.title}</Link>
                      <Details>
                        <time dateTime={singlePost.date}>{formattedDate}</time> <MidDot /> {singlePost.readTime} <MidDot />{' '}
                        {singlePost.views || 'N/A'} views
                      </Details>
                      <p>{singlePost.description}</p>
                    </ListItem>
                  )
                })}
              </Posts>
            </YearSection>
          ))}
        </List>
      </Page>
    </>
  )
}

export async function getStaticProps() {
  const fetchedPosts = await getAllPosts()
  const transformedPosts = fetchedPosts.map((singlePost) => ({
    ...singlePost.meta,
    slug: singlePost.slug,
    readTime: getReadTime(singlePost.content),
  }))
  const yearGroupedPosts = groupBy(sortDescByDate(transformedPosts), (post) => new Date(post.date).getFullYear())

  return {
    props: { yearGroupedPosts: Object.entries(yearGroupedPosts) },
  }

  function sortDescByDate(array) {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}

const YearSection = styled.div`
  display: flex;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const Year = styled.p`
  font-size: ${(p) => p.theme.fontSizes['3xl']}px;
  font-weight: bold;
  flex: 2;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    flex: 1;
    margin-bottom: ${(p) => p.theme.spacings.sm}px;
    text-align: center;
  }
`

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  flex: 8;

  & > *:not(:first-child) {
    margin-top: ${(p) => p.theme.spacings.md}px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    flex: 1;
    margin: auto;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:first-child) {
    margin-top: ${(p) => p.theme.spacings.lg}px;
  }
`

const ListItem = styled.div`
  font-size: ${(p) => p.theme.fontSizes['2xl']}px;
  max-width: ${(p) => p.theme.spacings.smallContainer}px;

  p {
    margin-top: ${(p) => p.theme.spacings['2xs']}px;
    font-size: ${(p) => p.theme.fontSizes.lg}px;
  }
`

const Details = styled.div`
  font-size: ${(p) => p.theme.fontSizes.md}px;
  opacity: 0.8;
`
