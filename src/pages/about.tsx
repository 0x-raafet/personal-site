import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Bio from '../components/bio'
import styled from '@emotion/styled'
import { rhythm } from '../utils/typography'

const AboutPage: React.FC = () => {
  return (
    <Layout title="About">
      <Seo title="About" />
      <Bio />
      <p style={{ marginTop: rhythm(0.5) }}>
        I particularly enjoy working with:
        <br />- on the frontend side: <Technology>React</Technology>, <Technology>JavaScript</Technology>,{' '}
        <Technology>TypeScript</Technology>, <Technology>Next.js</Technology>, <Technology>Redux</Technology>,{' '}
        <Technology>Hooks</Technology>
        <br />- on the backend side: <Technology bold>Strictly OO Architecture</Technology>,{' '}
        <Technology>TypeScript</Technology>, <Technology>Nest.js with Express.js ecosystem</Technology>,{' '}
        <Technology>Mongo</Technology>, <Technology>Redis</Technology>, <Technology>Postgres</Technology>
      </p>
      <p>
        I can comfortably write unit and integration tests in <Technology>Jest</Technology>, end-to-end with{' '}
        <Technology>TestCafe</Technology>. <br /> I have a background in <Technology>Java</Technology>, mainly writing
        game addons and developing web apps with <Technology>Spring</Technology> and{' '}
        <Technology>Vue.js (v2)</Technology> ecosystem.
      </p>
      <p>
        Extremely <span style={{ fontStyle: 'italic' }}>stanning</span> SpaceX.
      </p>
      <img src="https://ghchart.rshah.org/222831/bmstefanski" alt="bmstefanski's Github chart" />
    </Layout>
  )
}

const Technology = styled.span`
  color: ${(props: any) => props.theme.primary};
  font-weight: ${(props: any) => (props.bold ? '900' : '500')};
`

export default AboutPage
