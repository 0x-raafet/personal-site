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
      <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />

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

const Title = styled.p`
  font-size: ${(p) => p.theme.fontSizes['lg']}px;
`

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;

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

  & > *:not(:first-child) {
    margin-top: ${(p) => p.theme.spacings.xs}px;
  }
`
