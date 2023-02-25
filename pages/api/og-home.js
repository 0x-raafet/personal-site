/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ImageResponse } from '@vercel/og'
import React from 'react'

export const config = {
  runtime: 'experimental-edge',
}

const rubikRegularFontP = fetch(new URL('../../public/fonts/Rubik-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer())

const rubikBoldFontP = fetch(new URL('../../public/fonts/Rubik-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer())

export default async function handler(req) {
  try {
    const [rubikRegularFont, rubikBoldFont] = await Promise.all([rubikRegularFontP, rubikBoldFontP])

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '-.02em',
            fontWeight: 700,
            background: '#0F141B',
          }}
        >
          <div
            style={{
              left: 42,
              top: 42,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                background: '#E50066',
              }}
            />
            <span
              style={{
                marginLeft: 8,
                fontSize: 20,
                color: 'white',
              }}
            >
              bstefanski.com
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '20px 50px',
              margin: '0 42px',
              fontSize: 40,
              width: 'auto',
              maxWidth: 550,
              textAlign: 'center',
              backgroundColor: '#E50066',
              color: 'white',
              lineHeight: 1.4,
            }}
          >
            Making the Web. Faster.
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 627,
        fonts: [
          {
            name: 'Rubik',
            data: rubikRegularFont,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Rubik',
            data: rubikBoldFont,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    )
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
