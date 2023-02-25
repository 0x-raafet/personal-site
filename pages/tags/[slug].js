import { styled } from '@linaria/react'
import groupBy from 'lodash/groupBy'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'components/Link'
import MidDot from 'components/MidDot'
import Page from 'components/Page'
import TagsSection from 'components/TagsSection'
import { withTheme } from 'theme'
import { formatDate } from 'utils/formatDate'
import { getReadTime } from 'utils/getReadTime'
import { makeApiUrl } from 'utils/makeApiUrl'
import { getAllPostsByTag, getAllTags } from 'utils/postsFetcher'

export default function Blog({ yearGroupedPosts, allTags }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Blog | bstefanski.com</title>
      </Head>
      <Page>
        <TagsSection items={allTags} selected={router.query.slug} />

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
                        <time dateTime={singlePost.date}>{formattedDate}</time>
                        {singlePost.views < 100 ? null : (
                          <>
                            <MidDot /> {singlePost.views} views
                          </>
                        )}
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

const YearSection = withTheme(styled.div`
  display: flex;

  @media (max-width: 48em) {
    flex-direction: column;
  }
`)

const Year = withTheme(styled.p`
  font-size: 28px;
  font-weight: bold;
  flex: 2;

  @media (max-width: 48em) {
    flex: 1;
    margin-bottom: 24px;
    text-align: center;
  }
`)

const Posts = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  flex: 8;

  & > *:not(:first-child) {
    margin-top: 48px;
  }

  @media (max-width: 48em) {
    flex: 1;
    margin: auto;
  }
`)

const List = withTheme(styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:first-child) {
    margin-top: 96px;
  }
`)

const ListItem = withTheme(styled.div`
  font-size: 22px;
  max-width: 700px;

  p {
    margin-top: 6px;
    font-size: 16px;
  }
`)

const Details = withTheme(styled.div`
  font-size: 14px;
  opacity: 0.8;
`)

export async function getStaticPaths() {
  const tags = await getAllTags()
  return {
    paths: tags.map((singleTag) => ({ params: { slug: singleTag } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const fetchedPosts = await getAllPostsByTag(params.slug)
  const allTags = await getAllTags()
  const viewsData = await fetch(makeApiUrl('/api/views'))
    .then((r) => r.json())
    .then((r) => r.posts)

  const transformedPosts = fetchedPosts.map((singlePost) => ({
    ...singlePost.meta,
    slug: singlePost.slug,
    readTime: getReadTime(singlePost.content),
    views: viewsData.find((item) => item.slug === singlePost.slug)?.views || 0,
  }))
  const yearGroupedPosts = groupBy(sortDescByDate(transformedPosts), (post) => new Date(post.date).getFullYear())

  return {
    props: { yearGroupedPosts: Object.entries(yearGroupedPosts).reverse(), allTags },
    revalidate: 60,
  }

  function sortDescByDate(array) {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}
