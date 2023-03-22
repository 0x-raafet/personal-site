import { styled } from '@linaria/react'
import { withTheme } from 'theme'
import Container from './Container'
import Link from './Link'

export default function Footer() {
  return (
    <>
      <Wrapper>
        <FooterContainer>
          <Section>
            <SectionTitle>Pages</SectionTitle>
            {/* <Link href="/colophon">Colophon</Link> */}
            <Link href="/resume" target="_blank">
              Resume
            </Link>
            <Link href="/rss" target="_blank">
              RSS
            </Link>
          </Section>
          <Section>
            <SectionTitle>Socials</SectionTitle>
            <Link target="_blank" href="https://github.com/bmstefanski">
              GitHub
            </Link>
            <Link target="_blank" href="https://twitter.com/bmstefanski">
              Twitter
            </Link>
            <Link target="_blank" href="https://www.goodreads.com/user/show/125029202-bart-omiej-stefa-ski">
              Goodreads
            </Link>
            <Link target="_blank" href="https://www.linkedin.com/in/bart-stefanski/">
              LinkedIn
            </Link>
            <Link target="_blank" href="https://www.instagram.com/bmstefanski/">
              Instagram
            </Link>
          </Section>
          <Author>
            Made with ❤️ by Bart Stefański <br /> &copy; {new Date().getFullYear()} Bart Stefański. All Rights Reserved.
          </Author>
        </FooterContainer>
      </Wrapper>
      <DecorativeBar />
    </>
  )
}

const Wrapper = withTheme(styled.footer`
  background: var(--navbar);
  padding: 96px 0;
`)

const FooterContainer = withTheme(styled(Container)`
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`)

const DecorativeBar = withTheme(styled.div`
  width: 100%;
  height: 6px;
  background: var(--primary);
`)
const Author = withTheme(styled.div`
  margin-top: auto;
  margin-left: auto;

  @media (max-width: 30em) {
    margin: auto;
    margin-top: 48px;
  }
`)

const Section = withTheme(styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-left: 96px;
  }

  & > *:not(:first-child) {
    margin-top: 6px;
  }

  a {
    font-size: 18px;
  }

  @media (max-width: 48em) {
    flex: 1;
    &:not(:first-child) {
      margin-left: 48px;
    }
  }
`)

const SectionTitle = withTheme(styled.h1`
  font-size: 12px;
  font-weight: bold;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.8;
  margin-bottom: 6px;

  @media (max-width: 30em) {
    line-height: 2;
  }
`)
