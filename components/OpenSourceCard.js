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
          <svg aria-label="stars" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="octicon octicon-star">
            <path
              fillRule="evenodd"
              fill="currentColor"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            ></path>
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
