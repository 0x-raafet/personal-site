import styled from 'styled-components'
import Container from 'components/Container'
import Link from 'components/Link'
import Head from 'next/head'
import { getAllPosts } from 'utils/postsFetcher'
import MetadataHead from 'views/HomePage/MetadataHead'
import OpenGraphHead from 'views/HomePage/OpenGraphHead'
import MidDot from 'components/MidDot'
import { formatDate } from 'utils/formatDate'

export default function Home({ posts }) {
  return (
    <>
      <OpenGraphHead />
      <MetadataHead />
      <HomeContainer>
        <Title>Posts</Title>
        <List>
          {posts.map((singlePost) => {
            const formattedDate = formatDate(new Date(singlePost.date))
            return (
              <ListItem key={singlePost.slug}>
                <Link href={'/' + singlePost.slug}>{singlePost.title}</Link>
                <ListItemDetails>
                  <time dateTime={singlePost.date}>{formattedDate}</time> <MidDot /> 9 min
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

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes['4xl']}px;
  }
`

const HomeContainer = styled(Container)`
  align-items: flex-start;
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

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    float: none;
  }
`

export async function getStaticProps() {
  const fetchedPosts = await getAllPosts()
  const posts = fetchedPosts.map((singlePost) => ({ ...singlePost.meta, slug: singlePost.slug }))

  return {
    props: { posts: sortDescByDate(posts) },
  }

  function sortDescByDate(array) {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}
