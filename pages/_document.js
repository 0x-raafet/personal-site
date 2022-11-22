import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="dark-theme">
          <noscript>
            <iframe
              title="gtag ns"
              src={`https://www.googletagmanager.com/ns.html?id=GTM-5877HF4`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
