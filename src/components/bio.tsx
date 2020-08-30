import React from 'react'
import styled from '@emotion/styled'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'
import { rhythm } from '../utils/typography'

const BioContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  @media (max-width: 32.5625em) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div`
  display: block;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  overflow: hidden;

  @media (max-width: 32.5625em) {
    margin-top: 28px;
  }
`

const BioBrief = styled.p`
  padding: 0 ${rhythm(1)};
  max-width: 80%;
  margin: auto 0;

  @media (max-width: 32.5625em) {
    max-width: 100%;
    padding: ${rhythm(1)} 0;
    margin: 0 auto;
  }
`

interface BioData {
  avatar: {
    childImageSharp: {
      fixed: FixedObject
    }
  }
}

const Bio: React.FC = () => {
  const {
    avatar: {
      childImageSharp: { fixed: fixedAvatar },
    },
  }: BioData = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(relativePath: { eq: "profile-pic.jpg" }) {
        childImageSharp {
          fixed(width: 56, height: 56, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  console.log(fixedAvatar)

  return (
    <BioContainer>
      <ImageContainer>
        <Img fixed={fixedAvatar} />
      </ImageContainer>
      <BioBrief>
        Passionate self-taught full-stack software engineer with a thing for clean code & architecture. Enjoys TypeScript, NestJS and React
        stack.
      </BioBrief>
    </BioContainer>
  )
}

export default Bio
