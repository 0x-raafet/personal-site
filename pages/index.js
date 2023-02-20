import { styled } from '@linaria/react'
import format from 'date-fns/format'
import fetch from 'isomorphic-fetch'
import groupBy from 'lodash/groupBy'
import withHydrationOnDemand from 'react-hydration-on-demand'
import AutofitGrid from 'components/AutofitGrid'
import Container from 'components/Container'
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
      <Container>
        <BigTitle>
          Howdy, I am Bart <Wave>👋</Wave>
        </BigTitle>
        <Description>
          I am a highly-motivated software developer with experience in frontend and backend. I like to ship things fast and good.
          <br />
          Currently, my focus is on <strong>Next.js</strong>, and <strong>Web Performance</strong>, and I am a big fan of streamlining{' '}
          <strong>Developer Experience</strong>.
          <br />
          <br />
          In <strong>{format(Date.now(), 'MMMM yyyy')}</strong>, I&apos;ve made <strong>{monthlyContributions}</strong> commits on GitHub.
        </Description>
      </Container>
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

const Wave = styled.div`
  display: inline-flex;
  transition: transform 0.2s;
  cursor: grabbing;
  user-select: none;

  &:hover {
    transform: scale(1.05) rotate(25deg);
  }

  &:active {
    transform: perspective(800px) rotateY(-15deg) translateY(-50px) rotateX(10deg) scale(1);
    transform-style: preserve-3d;
  }
`

const BigTitle = withTheme(styled.div`
  font-size: 72px;
  color: var(--text);
  font-weight: bold;
  align-self: flex-start;
  width: 100%;

  @media (max-width: 48em) {
    font-size: 48px;
  }
`)

const Description = withTheme(styled.div`
  font-size: 22px;
  line-height: 1.5;
  color: var(--text-ligher);
  max-width: 70%;
  align-self: flex-start;
  margin-bottom: 100px;

  @media (max-width: 48em) {
    font-size: 20px;
    max-width: 100%;
  }

  strong {
    color: var(--text);
  }
`)

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
