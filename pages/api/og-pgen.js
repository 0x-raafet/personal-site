/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ImageResponse } from '@vercel/og'
import React from 'react'

export const config = {
  runtime: 'edge',
}

const rubikRegularFontP = fetch(new URL('../../public/fonts/Rubik-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer())

const rubikBoldFontP = fetch(new URL('../../public/fonts/Rubik-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer())

export default async function handler(req) {
  try {
    const [rubikRegularFont, rubikBoldFont] = await Promise.all([rubikRegularFontP, rubikBoldFontP])

    const { searchParams } = new URL(req.url)

    const title = decodeURIComponent(searchParams.has('title') ? searchParams.get('title').slice(0, 140) : 'My default title')

    return new ImageResponse(
      (
        <div
          tw="w-full h-full flex"
          style={{
            background: `linear-gradient(60deg,#f79533,#f37055,#E60067,#a166ab,#5073b8,#1098ad,#07b39b,#6fba82)`,
          }}
        >
          <div tw="relative h-[95%] w-[97%] m-auto flex items-center justify-center p-20" style={{ background: '#0E141B' }}>
            <div tw="flex h-full items-center w-full">
              <div tw="flex-1 flex flex-col">
                <h1 tw="text-[50px] text-center m-auto leading-none text-white drop-shadow-2xl">{title}</h1>
              </div>
            </div>
          </div>
          <h2 tw="text-2xl font-normal text-white mt-auto" style={{ position: 'absolute', bottom: 40, left: 70 }}>
            ✌ pgen.bstefanski.com
          </h2>
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