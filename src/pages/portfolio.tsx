/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import Layout, { SingleTheme } from '../components/layout'
import Seo from '../components/seo'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'
import Masonry from 'react-masonry-css'
import { useTheme } from 'emotion-theming'

interface PortfolioPageProps {
  data: {
    allPortfolioItem: {
      edges: {
        node: {
          id: string
          link: string
          name: string
          image: {
            childImageSharp: {
              fixed: FixedObject
            }
          }
        }
      }[]
    }
  }
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  data: {
    allPortfolioItem: { edges: items },
  },
}) => {
  return (
    <Layout title="Portfolio">
      <Seo title="Portfolio" />
      <PortfolioItemsContainer>
        <Masonry
          breakpointCols={{ default: 2, 765: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {items.map(({ node: singleItem }) => (
            <PortfolioItem key={singleItem.id}>
              <a href={singleItem.link}>
                <Img fixed={singleItem.image.childImageSharp.fixed} alt={singleItem.name} />
              </a>
            </PortfolioItem>
          ))}
        </Masonry>
      </PortfolioItemsContainer>
    </Layout>
  )
}

const PortfolioItemsContainer = styled.div`
  margin-top: 40px;
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

const PortfolioItem = (props) => {
  const theme: SingleTheme = useTheme()
  return (
    <div
      css={css`
        width: 278px;
        margin-bottom: 30px;
        box-shadow: ${theme.portfolioItemShadow};
        a,
        a:hover {
          text-decoration: none;
          color: transparent;
          box-shadow: none;
        }

        @media (max-width: 800px) {
          margin: auto;
        }
      `}
      {...props}
    />
  )
}
export const pageQuery = graphql`
  query PortfolioQuery {
    allPortfolioItem {
      edges {
        node {
          id
          link
          name
          image {
            childImageSharp {
              fixed(width: 278) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`

export default PortfolioPage
