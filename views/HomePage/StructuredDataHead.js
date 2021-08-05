import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'

export default function StructuredDataHead(props) {
  return (
    <Head>
      <script
        {...jsonLdScriptProps({
          '@context': 'https://schema.org',
          '@type': 'Person',
          email: 'mailto:contact@bstefanski.com',
          image: 'janedoe.jpg',
          jobTitle: 'Software Engineer',
          name: 'Bart Stefański',
          additionalName: 'Mateusz',
          birthDate: new Date(2001, 9, 18).toISOString(),
          url: 'https://bstefanski.com/',
          familyName: 'Stefański',
          gender: {
            '@type': 'GenderType',
            name: 'Male',
          },
          givenName: 'Bartłomiej',
        })}
      />
    </Head>
  )
}
