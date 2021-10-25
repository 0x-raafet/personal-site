import Head from 'next/head'
import React from 'react'

export default function OpenGraphHead(props) {
  return (
    <Head>
      <meta property="og:type" content="video.other" />
      <meta property="og:url" content="https://media.giphy.com/media/7f8tVWxSu4BTnEOd7o/source.gif" />
      <meta property="og:image" content="https://media.giphy.com/media/7f8tVWxSu4BTnEOd7o/source.gif" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="855" />
      <meta property="og:type" content="video" />
      <meta property="og:image" content="https://media.giphy.com/media/7f8tVWxSu4BTnEOd7o/giphy-facebook_s.jpg" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="855" />
      <meta
        property="og:video"
        content="http://giphygifs.s3.amazonaws.com/swiphy20141103.swf?api_hostname=&gif_url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F7f8tVWxSu4BTnEOd7o%2Fgiphy.gif&giphy_height=855&video_url=&giphyWidth=1200&path=/gifs/7f8tVWxSu4BTnEOd7o&destination_url=https://giphy.com/gifs/7f8tVWxSu4BTnEOd7o&giphyHeight=855&gif_id=7f8tVWxSu4BTnEOd7o&mode=embed&giphy_width=1200"
      />
      <meta
        property="og:video:secure_url"
        content="https://giphygifs.s3.amazonaws.com/swiphy20141103.swf?api_hostname=&gif_url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F7f8tVWxSu4BTnEOd7o%2Fgiphy.gif&giphy_height=855&video_url=&giphyWidth=1200&path=/gifs/7f8tVWxSu4BTnEOd7o&destination_url=https://giphy.com/gifs/7f8tVWxSu4BTnEOd7o&giphyHeight=855&gif_id=7f8tVWxSu4BTnEOd7o&mode=embed&giphy_width=1200"
      />
      <meta property="og:video:type" content="application/x-shockwave-flash" />
      <meta property="og:video:width" content="1280" />
      <meta property="og:video:height" content="855" />
      <meta name="twitter:card" content="player" />
      <meta name="twitter:image:src" content="https://media0.giphy.com/media/7f8tVWxSu4BTnEOd7o/giphy-facebook_s.jpg?t=1" />
      <meta name="twitter:image" content="https://media0.giphy.com/media/7f8tVWxSu4BTnEOd7o/giphy-facebook_s.jpg?t=1" />
      <meta name="twitter:player" content="https://giphy.com/embed/7f8tVWxSu4BTnEOd7o/twitter/iframe" />
      <meta name="twitter:player:width" content="1280" />
      <meta name="twitter:player:height" content="855" />
    </Head>
  )
}
