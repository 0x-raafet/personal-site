/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { graphql, Link, PageProps } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import ArticlesList from '../components/articles-list'

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
          date: string
          title: string
          description: string
        }
      }
    }[]
  }
}

const BlogIndex: React.FC<PageProps<BlogIndexData, any, any>> = ({ data, location }) => {
  const { title, subtitle } = data.site.siteMetadata
  return (
    <Layout title={title} subtitle={subtitle}>
      <SEO title="All posts" />
      <Bio />
      <ArticlesList articles={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 3) {
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
