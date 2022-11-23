import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="dark-theme">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
