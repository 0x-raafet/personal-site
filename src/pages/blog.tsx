import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import ArticlesList from '../components/articles-list'
import { graphql } from 'gatsby'

interface BlogPageProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          excerpt: string
          frontmatter: {
            title: string
            date: string
            description: string
          }
          fields: { slug: string }
        }
      }[]
    }
  }
}

const BlogPage: React.FC<BlogPageProps> = ({
  data: {
    allMarkdownRemark: { edges: articles },
  },
}) => {
  return (
    <Layout title="Blog">
      <Seo title="Blog" />
      <ArticlesList articles={articles} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogQuery {
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

export default BlogPage
