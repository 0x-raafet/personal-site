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

export default function Home({ posts }) {
  return (
    <>
      <OpenGraphHead />
      <MetadataHead />
      <StructuredDataHead />
      <Page title="Blog posts" description="My latest blog posts">
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
      </Page>
    </>
  )
}

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
