/** @jsx jsx */
import React from 'react'
import { Link, graphql, PageProps } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import { css, jsx } from '@emotion/core'

interface BlogIndexData {
  site: {
    siteMetadata: {
      title: string
      subtitle: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        fields: {
          slug: string
        }
        frontmatter: {
          date: Date
          title: string
          description: string
        }
      }
    }[]
  }
}

const BlogIndex: React.FC<PageProps<BlogIndexData, any, any>> = ({ data, location }) => {
  const { title, subtitle } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={title} subtitle={subtitle}>
      <SEO title="All posts" />
      {posts.map(({ node: singlePost }) => {
        const title = singlePost.frontmatter.title || singlePost.fields.slug
        return (
          <article key={singlePost.fields.slug}>
            <header>
              <h3
                css={css`
                  font-family: 'Montserrat', sans-serif;
                  font-size: ${rhythm(1)};
                  margin-bottom: ${rhythm(0.5)};
                `}
              >
                <Link style={{ boxShadow: `none` }} to={singlePost.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{singlePost.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: singlePost.frontmatter.description || singlePost.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
