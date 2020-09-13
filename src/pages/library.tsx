/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import styled from '@emotion/styled'
import Masonry from 'react-masonry-css'
import Seo from '../components/seo'
import Layout, { SingleTheme } from '../components/layout'
import { graphql } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'
import { rhythm } from '../utils/typography'
import { useTheme } from 'emotion-theming'

interface LibraryProps {
  data: {
    allBook: {
      group: {
        totalCount: number
        year: string
        edges: {
          node: {
            id: string
            author: string
            link: string
            pages: string
            title: string
            image: {
              childImageSharp: {
                fixed: FixedObject
              }
            }
          }
        }[]
      }[]
    }
  }
}

const LibraryPage: React.FC<LibraryProps> = ({ data }) => {
  return (
    <Layout title="Library">
      <Seo title="Library" />
      <LibraryItemsContainer>
        {Array.from(data.allBook.group)
          .reverse()
          .map((group) => (
            <div key={group.year} style={{ display: 'flex', width: '100%', flexDirection: 'column', flex: '1' }}>
              <YearSeparator data-total-count={group.totalCount}>{group.year}</YearSeparator>
              <Masonry
                breakpointCols={{ default: 2, 765: 1 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {Array.from(group.edges)
                  .reverse()
                  .map(({ node: singleBook }) => (
                    <BookItem key={singleBook.id}>
                      <Img fixed={singleBook.image.childImageSharp.fixed} alt={`Cover of ${singleBook.title}`} />
                      <p className="book-title">{singleBook.title}</p>
                      <p>Pages: {singleBook.pages}</p>
                      <p>Author: {singleBook.author}</p>
                    </BookItem>
                  ))}
              </Masonry>
            </div>
          ))}
      </LibraryItemsContainer>
    </Layout>
  )
}

const LibraryItemsContainer = styled.div`
  .my-masonry-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 auto;
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 30px;
    background-clip: padding-box;
  }

  .my-masonry-grid_column > div {
    margin-bottom: 30px;
  }

  @media (max-width: 800px) {
    .my-masonry-grid_column {
      padding-left: 15px;
    }
    .my-masonry-grid_column > div {
      margin-bottom: 15px;
    }
  }

  @media (max-width: 579px) {
    .my-masonry-grid_column {
      padding-left: 0px;
    }
    .my-masonry-grid_column > div {
      margin-bottom: 0px;
    }
  }
`

const YearSeparator = (props) => {
  const theme: SingleTheme = useTheme()
  return (
    <div
      css={css`
        display: inline-flex;
        position: relative;
        font-size: ${rhythm(1.5)};
        color: var(--primary);
        font-weight: bold;
        overflow: hidden;
        margin: ${rhythm(0.5)} 0;

        &::before {
          position: absolute;
          content: 'Total count: ' attr(data-total-count);
          font-size: 25px;
          line-height: 2;
          right: 0;
          bottom: 30px;
          font-weight: 900;
          font-family: 'Montserrat', sans-serif;
          @media (max-width: 32.5625em) {
            font-size: 15px;
            bottom: 32.5px;
          }
        }

        &::after {
          position: relative;
          content: '';
          background: var(--primary);
          height: 1px;
          width: 100%;
          left: 25px;
          margin: auto 0;
        }
      `}
      {...props}
    />
  )
}

const BookItem = (props) => {
  const theme: SingleTheme = useTheme()
  return (
    <div
      css={css`
        display: flex;
        padding: 30px;
        width: 325px;
        flex-direction: column;
        background-color: var(--bookCard);
        border-radius: 4.8px;
        margin-bottom: ${rhythm(1)};

        @media (max-width: 32.5625em) {
          width: 100%;
        }

        .gatsby-image-wrapper {
          align-self: center;
          margin: 20px 0;
          border: 1px solid var(--primary);
        }

        .book-title,
        p {
          font-size: 14px;
          margin-bottom: 15px;
        }

        p {
          margin: 2.5px 0;
        }
      `}
      {...props}
    />
  )
}

export const pageQuery = graphql`
  query BooksPageQuery {
    allBook {
      group(field: year) {
        totalCount
        year: fieldValue
        edges {
          node {
            author
            id
            link
            pages
            title
            image {
              childImageSharp {
                fixed(width: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

export default LibraryPage
