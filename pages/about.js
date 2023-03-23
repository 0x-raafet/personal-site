import { styled } from '@linaria/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import GithubIcon from 'components/icons/GithubIcon'
import GoodreadsIcon from 'components/icons/GoodreadsIcon'
import InstagramIcon from 'components/icons/InstagramIcon'
import LinkedInIcon from 'components/icons/LinkedInIcon'
import TwitterIcon from 'components/icons/TwitterIcon'
import Link from 'components/Link'
import Page from 'components/Page'
import useDeviceType from 'hooks/useDeviceType'
import { withTheme } from 'theme'

const Tilt = dynamic(() => import('react-parallax-tilt'))

export default function UsesPage({ latestGames }) {
  const { isMobile } = useDeviceType()

  return (
    <>
      <Head>
        <title>About | bstefanski.com</title>
      </Head>
      <Page description="About">
        <Container>
          <TextColumn>
            <Description>
              <p>
                Hey there! I&apos;m <b>Bart Stefanski</b>, a frontend-focused software developer with a knack for shipping good and fast
                solutions. My coding adventure began at the age of 12, and I&apos;ve since grown passionate about React, Next.js,
                TypeScript, Web Performance and Vercel. Currently, I&apos;m working as a Software Developer at{' '}
                <Link target="_blank" href="https://blazity.com/">
                  <b>Blazity</b>
                </Link>
                , where I collaborate with amazing teammates and contribute to impactful projects. 🚀
              </p>
              <br />
              <p>
                In the past, I worked with Java & Spring Framework, but a couple of years ago, I made the switch to embrace the world of{' '}
                <b>frontend development</b>.
              </p>
              <br />
              <p>
                Outside of coding, I love boxing, and I&apos;m currently learning the Mike Tyson Peek-a-Boo style. 🥊 When I&apos;m not
                throwing punches, you can find me recruiting developers, writing (hopefully) helpful blog posts ✍️, having a blast watching
                movies at the cinema 🍿, or walking my lovely dog, Ruby. 🐶❤️
              </p>
              <br />
              <p>
                Continuous learning and growth are important to me, so I&apos;m always looking to expand my skillset and stay up-to-date
                with the latest industry trends. 📚
              </p>
              <br />
              <p>
                Interested in discussing a project or just talking tech? Don&apos;t hesitate to reach out – I&apos;d love to hear from you!
                Drop me a line at <Link href="mailto:contact@bstefanski.com">contact@bstefanski.com</Link> or connect with me on{' '}
                <Link target="_blank" href="https://www.linkedin.com/in/bart-stefanski/">
                  LinkedIn
                </Link>
                . 😄
              </p>
            </Description>
          </TextColumn>
          <ImageColumn>
            <Tilt>
              <ImageWrapper className="gradient-border">
                <Image className="li-profile-image" width={800} height={800} src="/li-photo.jpeg" alt="My photo" priority={!isMobile} />
              </ImageWrapper>
            </Tilt>

            <SocialButtonsGrid>
              <NextLink passHref href="https://github.com/bmstefanski" prefetch={false} legacyBehavior>
                <a target="_blank">
                  <SocialButton>
                    <GithubIcon />
                  </SocialButton>
                </a>
              </NextLink>

              <NextLink passHref href="https://www.linkedin.com/in/bart-stefanski/" prefetch={false} legacyBehavior>
                <a target="_blank">
                  <SocialButton>
                    <LinkedInIcon />
                  </SocialButton>
                </a>
              </NextLink>

              <NextLink passHref href="https://www.instagram.com/bartekstefanski/" prefetch={false} legacyBehavior>
                <a target="_blank">
                  <SocialButton>
                    <InstagramIcon />
                  </SocialButton>
                </a>
              </NextLink>

              <NextLink passHref href="https://twitter.com/bmstefanski" prefetch={false} legacyBehavior>
                <a target="_blank">
                  <SocialButton>
                    <TwitterIcon />
                  </SocialButton>
                </a>
              </NextLink>

              <NextLink passHref href="https://www.goodreads.com/user/show/125029202-bart-omiej-stefa-ski" prefetch={false} legacyBehavior>
                <a target="_blank">
                  <SocialButton>
                    <GoodreadsIcon />
                  </SocialButton>
                </a>
              </NextLink>
            </SocialButtonsGrid>
          </ImageColumn>
        </Container>
      </Page>
    </>
  )
}

const SocialButton = styled.div`
  width: 32px;
  height: 32px;
  transition: 0.2 filter;

  &:hover {
    filter: brightness(0.7);
  }
`

const SocialButtonsGrid = styled.div`
  --autofit-grid-item-size: 32px;

  padding: 30px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(var(--autofit-grid-item-size), 1fr));
  margin: 0 auto;
`

const Description = withTheme(styled.div`
  font-size: 22px;
  line-height: 1.5;
  color: var(--text);
  align-self: flex-start;

  @media (max-width: 48em) {
    font-size: 20px;
    max-width: 100%;
  }

  strong,
  b {
    color: var(--primary);
  }

  a {
    b {
      &:hover {
        color: var(--text);
      }
    }
  }
`)

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TextColumn = styled.div`
  flex-basis: 70%;
  padding-right: 1rem;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    flex-basis: 100%;
    padding-right: 0;
  }
`

const ImageColumn = styled.div`
  flex-basis: 30%;
  padding: 1rem;
  position: relative;
  align-self: flex-start;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`

const ImageWrapper = styled.div`
  position: relative;

  .li-profile-image {
    max-height: 320px;
    max-width: 100%;
    object-fit: cover;
    transition: filter 0.45s ease-in-out;

    &:hover {
      filter: brightness(125%) contrast(20) hue-rotate(30deg);
    }
  }

  @media (max-width: 768px) {
    max-width: 320px;
    max-height: 320px;
  }
`
