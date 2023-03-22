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

    const { searchParams } = new URL(req.url)

    const title = searchParams.has('title') ? searchParams.get('title').slice(0, 100) : 'My default title'
    const image = 'https://avatars.githubusercontent.com/u/28964599?v=4'
    const date = searchParams.get('date')
    const dateDistance = searchParams.get('dateDistance')

    return new ImageResponse(
      (
        <div tw="pos-relative h-full w-full flex items-start justify-start p-20" style={{ background: '#0E141B' }}>
          <div tw="flex h-full items-center w-full">
            <div tw="flex-1 flex flex-col mr-20 text-lg">
              <p tw="mb-4 " style={{ color: '#9eaab7' }}>
                <strong tw="text-white text-lg font-normal mr-2">{date} </strong> {dateDistance ? `(${dateDistance})` : null}
              </p>
              <h1 tw="text-6xl leading-none text-white">{title}</h1>
            </div>
            {image ? (
              <div tw="flex relative">
                <svg
                  tw="absolute top-[-300px] left-[-100px] opacity-90"
                  id="visual"
                  viewBox="0 0 900 600"
                  width="900"
                  height="600"
                  version="1.1"
                >
                  <g transform="translate(444.3593826782917 273.8643784322123)">
                    <path
                      fill="#e60067"
                      d="M186.1 -166.4C230.8 -141.4 249.4 -70.7 237.7 -11.7C226 47.4 184.1 94.8 139.4 139.9C94.8 185.1 47.4 228 -2.2 230.3C-51.9 232.5 -103.7 194 -149.2 148.9C-194.7 103.7 -233.9 51.9 -229.5 4.4C-225.1 -43.1 -177.3 -86.3 -131.8 -111.3C-86.3 -136.3 -43.1 -143.1 13.8 -156.9C70.7 -170.7 141.4 -191.4 186.1 -166.4"
                    ></path>
                  </g>
                </svg>
                <img
                  style={{
                    objectFit: 'cover',
                    borderColor: '#1E262F',
                  }}
                  tw="mx-auto border-8 w-[300px] h-[300px] rounded-full"
                  src={image}
                />
              </div>
            ) : null}
          </div>
          <h2 tw="text-2xl font-normal text-white mt-auto" style={{ position: 'absolute', bottom: 40, left: 70 }}>
            ✌ bstefanski.com/blog
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
