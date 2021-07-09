import styled from 'styled-components'
import { formatDate } from 'utils/formatDate'
import RichText from 'components/RichText'
import * as path from 'path'
import * as fs from 'fs'

import matter from 'gray-matter'

const DOCS_DIRECTORY = path.join(process.cwd(), 'posts')

export default function SingleArticlePage(props) {
  const {
    slug,
    content,
    meta: { title, date },
  } = props

  const formattedDate = formatDate(new Date(date))
  const readTime = `9 min read`

  return (
    <Container>
      <HeaderContainer>
        <Title>{title}</Title>
        <DetailsContainer>
          {formattedDate} <MidDot /> {readTime}
        </DetailsContainer>
      </HeaderContainer>
      <RichText {...content} />
    </Container>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  return {
    paths: posts.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const singlePost = await getSinglePost(params.slug)
  return {
    props: singlePost,
  }
}

export function getAllPosts() {
  return fs.readdirSync(DOCS_DIRECTORY).map(normalizePostName)
}

export async function getSinglePost(slug) {
  const filePath = path.join(DOCS_DIRECTORY, slug + '.mdx')
  const contents = fs.readFileSync(filePath, 'utf8')
  const { data: meta, content } = matter(contents)
  const serializedContent = await serializeContent(content, meta)
  return { slug, content: serializedContent, meta }
}

async function serializeContent(content, meta) {
  const { serialize } = require('next-mdx-remote/serialize')
  return serialize(content, { scope: meta })
}

function normalizePostName(postName) {
  return postName.replace('.mdx', '')
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${(p) => p.theme.spacings.mediumContainer}px;
  padding: 0 ${(p) => p.theme.spacings.xs}px;
  margin: 0 auto;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${(p) => p.theme.spacings.smallContainer}px;
  grid-gap: ${(p) => p.theme.spacings.sm}px;
`

const Title = styled.h1`
  font-size: ${(p) => p.theme.fontSizes['4xl']}px;
  font-weight: 600;
`

const DetailsContainer = styled.div`
  font-size: ${(p) => p.theme.fontSizes['md']}px;
  color: ${(p) => p.theme.colors.textLighter};
`

const MidDot = styled.span`
  &::before {
    display: inline-block;
    content: '\x000B7';
    margin: 0 ${(p) => p.theme.spacings['2xs']}px;
  }
`
