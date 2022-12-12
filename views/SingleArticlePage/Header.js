import { styled } from '@linaria/react'
import formatDistance from 'date-fns/formatDistance'
import parse from 'date-fns/parse'
import React from 'react'
import { withTheme } from 'theme'

export default function Header({ title, description, formattedDate, readTime }) {
  const hasNoDateNorReadtime = !formattedDate && !readTime

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Line />
      {hasNoDateNorReadtime ? null : <DetailsContainer datetime={formattedDate}>{formattedDate}</DetailsContainer>}
      <TimeDistance>
        {formatDistance(new Date(parse(formattedDate, 'do MMMM yyyy', Date.now())), Date.now(), { addSuffix: true })}
      </TimeDistance>
    </HeaderContainer>
  )
}

const TimeDistance = styled.p`
  font-size: 14px;
  margin-left: auto;
  color: var(--text-ligher);
`

const Description = styled.h2`
  color: var(--text-ligher);
  font-size: 24px;
  line-height: 1.5;
  font-weight: normal;
  margin: 16px 0;

  @media (max-width: 30em) {
    font-size: 20px;
    line-height: 1.5;
  }
`

const HeaderContainer = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`)

const Line = styled.hr`
  border: none;
  height: 1px;
  background: #181c24;
  margin: 25px 0;
`

const Title = withTheme(styled.h1`
  font-weight: bold;
  font-size: 64px;
  line-height: 1.33333;

  & + div {
    margin-top: 28px;
  }

  @media (max-width: 30em) {
    font-size: 38px;
  }
`)

const DetailsContainer = withTheme(styled.time`
  font-size: 18px;
  margin-bottom: 5px;
  margin-left: auto;
`)
