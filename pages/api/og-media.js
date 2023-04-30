/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ImageResponse } from '@vercel/og'
import React from 'react'
import { makeApiUrl } from 'utils/makeApiUrl'

export const config = {
  runtime: 'edge',
}

const rubikRegularFontP = fetch(new URL('../../public/fonts/Rubik-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer())

const rubikBoldFontP = fetch(new URL('../../public/fonts/Rubik-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer())

export default async function handler(req) {
  try {
    const [rubikRegularFont, rubikBoldFont] = await Promise.all([rubikRegularFontP, rubikBoldFontP])

    const { searchParams } = new URL(req.url)

    const metadata = await fetch(makeApiUrl('/api/metadata?url=' + searchParams.get('url'))).then((res) => res.json())
    console.log(metadata)
    const image = metadata.image
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
              <div tw="flex-1 flex flex-col text-lg">
                <h1 tw="leading-none text-white text-center m-auto mb-10" style={{ fontSize: !!image ? '28px' : '48px' }}>
                  {metadata?.title?.length <= 10 && metadata?.description ? metadata?.description || metadata?.title : metadata?.title}
                </h1>
                {image ? (
                  <img
                    style={{
                      objectFit: 'contain',
                    }}
                    tw="mx-auto w-full max-h-[250px] mb-20"
                    src={image}
                  />
                ) : null}
              </div>
            </div>
            <h2 tw="text-2xl font-normal text-white mt-20" style={{ position: 'absolute', bottom: 40, left: 70 }}>
              ✌ bstefanski.com/blog
            </h2>
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
