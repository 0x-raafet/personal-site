import React from 'react'
import styled from 'styled-components'
import Link from './Link'

export default function OpenSourceCard({
  name,
  descriptionHTML,
  owner: { login: ownerLogin, url: ownerUrl },
  url,
  stargazers: { totalCount: stars },
  primaryLanguage: { color: languageColor, name: languageName },
}) {
  return (
    <Wrapper>
      <Link href={url}>
        <Title>
          {ownerLogin}/{name}
        </Title>
      </Link>
      <Description dangerouslySetInnerHTML={{ __html: descriptionHTML }} />

      <LanguageWrapper>
        <LanguageColor circleColor={languageColor} />
        <p>{languageName}</p>
        <StarsWrapper>
          <svg aria-label="stars" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <use href="#star" />
          </svg>
          <span>{stars}</span>
        </StarsWrapper>
      </LanguageWrapper>
    </Wrapper>
  )
}

const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`

const Title = styled.p`
  font-size: ${(p) => p.theme.fontSizes['lg']}px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-end;
  margin-top: auto;

  & > *:not(:first-child):not(:last-child) {
    margin-left: ${(p) => p.theme.spacings['2xs']}px;
  }
`

const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;

  & > *:not(:first-child) {
    margin-left: ${(p) => p.theme.spacings['2xs']}px;
  }
`

const LanguageColor = styled.span`
  display: flex;
  border-radius: 100px;
  width: 18px;
  height: 18px;
  background-color: ${(p) => p.circleColor};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    height: 100%;
  }

  & > *:not(:last-child) {
    margin-bottom: ${(p) => p.theme.spacings.xs}px;
  }
`
