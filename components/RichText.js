import { MDXRemote } from 'next-mdx-remote'
import TestComponent from './TestComponent'

const components = {
  TestComponent,
  // h1: Heading.H1,
  // h2: Heading.H2,
  // p: Text,
  // code: Pre,
  // inlineCode: Code,
}

export default function RichText(props) {
  return <MDXRemote {...props} components={components} />
}
