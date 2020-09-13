/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Bio from '../components/bio'
import { rhythm } from '../utils/typography'

const AboutPage: React.FC = () => {
  return (
    <Layout title="Bart Stefanski">
      <Seo title="Bart Stefanski" />
      <Bio />
      <p style={{ marginTop: rhythm(0.5) }}>
        On the frontend side, I particularly enjoy working with <Technology>TypeScript</Technology>,{' '}
        <Technology>JavaScript</Technology> using <Technology>React</Technology>, <Technology>Next.js</Technology>,{' '}
        <Technology>Gatsby</Technology>, <Technology>Hooks</Technology>, <Technology>Redux</Technology>, and the whole
        ecosystem. On the backend side, I get a charge out of <Technology>TypeScript</Technology> with{' '}
        <Technology bold>Strictly OO Architecture</Technology>. I usually use <Technology>Nest.js</Technology> with
        Express.js ecosystem and NoSQL databases such as <Technology>Mongo</Technology> or/and{' '}
        <Technology>Redis</Technology> and when I feel like using SQL - <Technology>Postgres</Technology>.
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

const Technology = (props) => {
  return (
    <div
      css={{
        display: 'inline-block',
        color: 'var(--primary)',
        fontWeight: props.bold ? '900' : '500',
      }}
      {...props}
    />
  )
}

export default AboutPage
