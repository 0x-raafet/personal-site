import { styled } from '@linaria/react'
import fetch from 'isomorphic-fetch'
import groupBy from 'lodash/groupBy'
import withHydrationOnDemand from 'react-hydration-on-demand'
import AutofitGrid from 'components/AutofitGrid'
import Link from 'components/Link'
import MidDot from 'components/MidDot'
import OpenSourceCard from 'components/OpenSourceCard'
import Page from 'components/Page'
import { withTheme } from 'theme'
import { formatDate } from 'utils/formatDate'
import { getReadTime } from 'utils/getReadTime'
import { makeApiUrl } from 'utils/makeApiUrl'
import { getAllPosts } from 'utils/postsFetcher'
import MetadataHead from 'views/HomePage/MetadataHead'
import OpenGraphHead from 'views/HomePage/OpenGraphHead'
import StructuredDataHead from 'views/HomePage/StructuredDataHead'
import Symbols from 'views/HomePage/Symbols'

export default function Home({ yearGroupedPosts, monthlyContributions, pinnedItems }) {
  return (
    <>
      <OpenGraphHead />
      <MetadataHead />
      <StructuredDataHead />
      <Symbols />
      <Page title="Hello world">
        <Description>
          <strong>I am Bart</strong>, a self-taught full-stack software engineer based in Poland, working in Next.js & Nest.js stack.
          Passionate about Clean Code, Object-Oriented Architecture, and fast web.
        </Description>
      </Page>
      <HyratedOpenSourceSection pinnedItems={pinnedItems} />
      <HydratedBlogPostsSection yearGroupedPosts={yearGroupedPosts} />
    </>
  )
}

const OpenSourceSection = ({ pinnedItems }) => {
  return (
    <Page title="Open source" description="Pinned open source projects">
      <AutofitGrid>
        {pinnedItems.map((singleItem) => (
          <OpenSourceCard key={singleItem.id} {...singleItem} />
        ))}
      </AutofitGrid>
    </Page>
  )
}

const HyratedOpenSourceSection = withHydrationOnDemand({ on: ['visible'] })(OpenSourceSection)

const BlogPostsSection = ({ yearGroupedPosts }) => {
  return (
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
                      <time dateTime={singlePost.date}>{formattedDate}</time>
                      <MidDot /> {singlePost.views < 100 ? '< 100' : singlePost.views} views
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
  )
}

const HydratedBlogPostsSection = withHydrationOnDemand({ on: ['visible'] })(BlogPostsSection)

const Description = withTheme(styled.div`
  font-size: 32px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-top: -24px;

  @media (max-width: 30em) {
    font-size: 28px;
  }
`)

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
    views: viewsData.find((item) => item.slug === singlePost.slug)?.views || '< 100',
  }))

  const yearGroupedPosts = groupBy(sortDescByDate(transformedPosts.reverse()).slice(0, LATEST_POSTS_COUNT), (post) =>
    new Date(post.date).getFullYear(),
  )

  const githubData = await fetch(makeApiUrl('/api/github-contributions')).then((r) => r.json())

  return {
    props: { yearGroupedPosts: Object.entries(yearGroupedPosts).reverse(), ...githubData },
    revalidate: 60,
  }

  function sortDescByDate(array) {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
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
