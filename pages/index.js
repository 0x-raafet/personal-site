import fetch from 'isomorphic-fetch'
import groupBy from 'lodash/groupBy'
import styled from 'styled-components'
import AutofitGrid from 'components/AutofitGrid'
import Link from 'components/Link'
import MidDot from 'components/MidDot'
import OpenSourceCard from 'components/OpenSourceCard'
import Page from 'components/Page'
import { formatDate } from 'utils/formatDate'
import { getReadTime } from 'utils/getReadTime'
import { makeApiUrl } from 'utils/makeApiUrl'
import { getAllPosts } from 'utils/postsFetcher'
import MetadataHead from 'views/HomePage/MetadataHead'
import OpenGraphHead from 'views/HomePage/OpenGraphHead'
import StructuredDataHead from 'views/HomePage/StructuredDataHead'
import Symbols from 'views/HomePage/Symbols'

export default function Home({ yearGroupedPosts, monthlyContributions, pinnedItems, bookTitle, bookAuthor }) {
  return (
    <>
      <OpenGraphHead />
      <MetadataHead />
      <StructuredDataHead />
      <Symbols />
      <Page title="Hello world">
        <Description>
          <strong>I am Bart</strong>, a self-taught full-stack software engineer based in Poland, working in React.js & Nest.js stack.
          Passionate about Clean Code, Object-Oriented Architecture, and fast web. This month I made{' '}
          <strong>
            <Link href="https://github.com/bmstefanski">{monthlyContributions} contributions</Link>
          </strong>
          . Currently, I am reading <Link href="https://www.goodreads.com/user/show/125029202-bart-omiej-stefa-ski">{bookTitle}</Link> by{' '}
          {bookAuthor}.
        </Description>
      </Page>
      <Page title="Open source" description="Pinned open source projects">
        <AutofitGrid>
          {pinnedItems.map((singleItem) => (
            <OpenSourceCard key={singleItem.id} {...singleItem} />
          ))}
        </AutofitGrid>
      </Page>
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

const Description = styled.div`
  font-size: ${(p) => p.theme.fontSizes['4xl']}px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-top: -${(p) => p.theme.spacings.sm}px;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes['3xl']}px;
  }
`

const LATEST_POSTS_COUNT = 5

export async function getStaticProps() {
  const fetchedPosts = await getAllPosts()
  const viewsData = await fetch(makeApiUrl('/api/views'))
    .then((r) => r.json())
    .then((r) => r.posts)

  const transformedPosts = fetchedPosts.map((singlePost) => ({
    ...singlePost.meta,
    slug: singlePost.slug,
    readTime: getReadTime(singlePost.content),
    views: viewsData.find((item) => item.slug === singlePost.slug)?.views || 'N/A',
  }))

  const yearGroupedPosts = groupBy(sortDescByDate(transformedPosts.reverse().slice(0, LATEST_POSTS_COUNT)), (post) =>
    new Date(post.date).getFullYear(),
  )

  const githubData = await fetch(makeApiUrl('/api/github-contributions')).then((r) => r.json())
  const goodreadsData = await fetch(makeApiUrl('/api/last-read')).then((r) => r.json())

  return {
    props: { yearGroupedPosts: Object.entries(yearGroupedPosts).reverse(), ...githubData, ...goodreadsData },
    revalidate: 60 * 10 * 6,
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
