import groupBy from 'lodash/groupBy'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'components/Link'
import Page from 'components/Page'
import { makeApiUrl } from 'utils/makeApiUrl'
import { getAllSnippets } from 'utils/snippetsFetcher'

export default function SnippetsPage({ yearGroupedSnippets }) {
  return (
    <>
      <Head>
        <title>Snippets | bstefanski.com</title>
      </Head>
      <Page title="Snippets" description="Useful snippets">
        <List>
          {yearGroupedSnippets.map(([year, snippets]) => (
            <YearSection key={year}>
              <Year>{year}</Year>
              <Snippets>
                {snippets.map((singleSnippet) => {
                  return (
                    <ListItem key={singleSnippet.slug}>
                      <Link href={'/snippets/' + singleSnippet.slug}>{singleSnippet.title}</Link>
                      <Details>{singleSnippet.views || 'N/A'} views</Details>
                    </ListItem>
                  )
                })}
              </Snippets>
            </YearSection>
          ))}
        </List>
      </Page>
    </>
  )
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

const Snippets = styled.div`
  display: flex;
  flex-direction: column;
  flex: 8;

  & > *:not(:first-child) {
    margin-top: ${(p) => p.theme.spacings.sm}px;
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
    margin-top: ${(p) => p.theme.spacings.md}px;
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

export async function getStaticProps() {
  const fetchedSnippets = await getAllSnippets()
  const viewsData = await fetch(makeApiUrl('/api/views'))
    .then((r) => r.json())
    .then((r) => r.snippets)

  const transformedSnippets = fetchedSnippets.map((singleSnippet) => ({
    ...singleSnippet.meta,
    slug: singleSnippet.slug,
    views: viewsData.find((item) => item.slug === singleSnippet.slug)?.views || 'N/A',
  }))
  const yearGroupedSnippets = groupBy(sortDescByDate(transformedSnippets), (snippet) => new Date(snippet.date).getFullYear())

  return {
    props: { yearGroupedSnippets: Object.entries(yearGroupedSnippets) },
    revalidate: 60 * 10 * 6,
  }

  function sortDescByDate(array) {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}
