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
            <Link href="/uses">Uses</Link>
            {/* <Link href="/colophon">Colophon</Link> */}
            <Link href="/resume">Resume</Link>
            <Link href="/rss">RSS</Link>
          </Section>
          <Section>
            <SectionTitle>Socials</SectionTitle>
            <Link href="https://github.com/bmstefanski">GitHub</Link>
            <Link href="https://twitter.com/bmstefanski">Twitter</Link>
            <Link href="https://www.goodreads.com/user/show/125029202-bart-omiej-stefa-ski">Goodreads</Link>
            <Link href="https://www.linkedin.com/in/bmstefanski">LinkedIn</Link>
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
  padding: ${(p) => p.theme.spacings.lg}px 0;
`)

const FooterContainer = withTheme(styled(Container)`
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`)

const DecorativeBar = withTheme(styled.div`
  width: 100%;
  height: ${(p) => p.theme.spacings['2xs']}px;
  background: var(--primary);
`)
const Author = withTheme(styled.div`
  margin-top: auto;
  margin-left: auto;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    margin: auto;
    margin-top: ${(p) => p.theme.spacings.md}px;
  }
`)

const Section = withTheme(styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-left: ${(p) => p.theme.spacings['lg']}px;
  }

  & > *:not(:first-child) {
    margin-top: ${(p) => p.theme.spacings['2xs']}px;
  }

  a {
    font-size: ${(p) => p.theme.fontSizes['lg']}px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    flex: 1;
    &:not(:first-child) {
      margin-left: ${(p) => p.theme.spacings.md}px;
    }
  }
`)

const SectionTitle = withTheme(styled.h1`
  font-size: ${(p) => p.theme.fontSizes.sm}px;
  font-weight: bold;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.8;
  margin-bottom: ${(p) => p.theme.spacings['2xs']}px;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    line-height: 2;
  }
`)
