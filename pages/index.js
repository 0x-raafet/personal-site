import Head from 'next/head'
import styled from 'styled-components'
import Link from 'components/Link'
import MidDot from 'components/MidDot'
import { formatDate } from 'utils/formatDate'
import { getReadTime } from 'utils/getReadTime'
import { getAllPosts } from 'utils/postsFetcher'
import MetadataHead from 'views/HomePage/MetadataHead'
import OpenGraphHead from 'views/HomePage/OpenGraphHead'
import StructuredDataHead from 'views/HomePage/StructuredDataHead'

export default function Home({ posts }) {
  return (
    <>
      <OpenGraphHead />
      <MetadataHead />
      <StructuredDataHead />
      <HomeContainer>
        <Title>Posts</Title>
        <List>
          {posts.map((singlePost) => {
            const formattedDate = formatDate(new Date(singlePost.date))
            return (
              <ListItem key={singlePost.slug}>
                <Link href={'/' + singlePost.slug}>{singlePost.title}</Link>
                <ListItemDetails>
                  <time dateTime={singlePost.date}>{formattedDate}</time> <MidDot /> {singlePost.readTime}
                </ListItemDetails>
              </ListItem>
            )
          })}
        </List>
      </HomeContainer>
    </>
  )
}

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.theme.fontSizes['4xl']}px;
  line-height: 40px;
  margin-bottom: 20px;
  margin-right: 20px;
  overflow-wrap: normal;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    font-size: ${(p) => p.theme.fontSizes['3xl']}px;
  }
`

const HomeContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 0 ${(p) => p.theme.spacings.xs}px;
  margin: 0 auto;
  max-width: ${(p) => p.theme.spacings.largeContainer}px;
`

const List = styled.ol`
  font-size: ${(p) => p.theme.fontSizes.xl}px;
  line-height: 34px;
  width: 100%;
  margin: 0;
`

const ListItem = styled.li`
  display: list-item;
  margin-bottom: 8.5px;
`

const ListItemDetails = styled.div`
  float: right;

  @media (max-width: ${(p) => p.theme.breakpoints.lg}) {
    float: none;
  }
`

export async function getStaticProps() {
  const fetchedPosts = await getAllPosts()
  const posts = fetchedPosts.map((singlePost) => ({ ...singlePost.meta, slug: singlePost.slug, readTime: getReadTime(singlePost.content) }))

  return {
    props: { posts: sortDescByDate(posts) },
  }

  function sortDescByDate(array) {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}
