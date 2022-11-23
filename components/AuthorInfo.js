import { styled } from '@linaria/react'
import NextImage from "next/legacy/image";
import { withTheme } from 'theme'
import Link from './Link'

export default function AuthorInfo(props) {
  return (
    <Container>
      <AvatarContainer>
        <NextImage src="/avatar.png" width={96} height={96} />
      </AvatarContainer>
      <Content>
        <AuthorTitle>Bart Stefański</AuthorTitle>
        <p>
          A self-taught full-stack software engineer based in Poland, working in React.js & Nest.js Stack. Passionate about Clean Code,
          Object-Oriented Architecture and fast web.{' '}
        </p>
        <Links>
          <Link href="https://github.com/bmstefanski">Github</Link>
          <Link href="https://www.goodreads.com/user/show/125029202-bart-omiej-stefa-ski">Goodreads</Link>
          <Link href="https://twitter.com/bmstefanski">Twitter</Link>
        </Links>
      </Content>
    </Container>
  )
}

const Container = withTheme(styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  flex-wrap: wrap;

  & > *:not(:first-child) {
    margin-top: 24px;
  }

  @media (max-width: 30em) {
    flex-flow: column;
  }
`)

const AvatarContainer = withTheme(styled.div`
  display: flex;
  width: 96px;
  height: 100%;
  overflow: hidden;
  border-radius: 100px;
  margin: auto 0;
  margin-right: 24px;

  @media (max-width: 30em) {
    margin-right: 0;
  }
`)

const Content = withTheme(styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  & > *:not(:first-child) {
    margin-top: 6px;
  }
`)

const Links = withTheme(styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: 12px;
  }
`)

const AuthorTitle = withTheme(styled.div`
  font-size: 16px;
  font-weight: bold;
`)
