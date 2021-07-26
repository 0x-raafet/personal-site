import Container from 'components/Container'
import Head from 'next/head'
import MetadataHead from 'views/HomePage/MetadataHead'
import OpenGraphHead from 'views/HomePage/OpenGraphHead'

export default function Home() {
  return (
    <>
      <OpenGraphHead />
      <MetadataHead />
      <Container>
        <p>Hello World</p>
      </Container>
    </>
  )
}
