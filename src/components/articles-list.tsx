/** @jsx jsx */
import React from 'react'
import { rhythm } from '../utils/typography'
import { css, jsx } from '@emotion/core'
import { Link } from 'gatsby'

interface ArticlesListProps {
  articles: {
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

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  return (
    <React.Fragment>
      {' '}
      {articles.map(({ node: singlePost }) => {
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
    </React.Fragment>
  )
}

export default ArticlesList
