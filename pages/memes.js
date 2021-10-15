import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

export default function MemesPage(props) {
  useEffect(() => {
    const youtubePlayerEl = document.getElementById('youtube-player')
    youtubePlayerEl.onload = () => {
      document.getElementById('canvas').remove()
      youtubePlayerEl.style.position = 'relative'
      youtubePlayerEl.style.marginLeft = 'unset'
    }

    let canvas = document.getElementById('canvas')
    let imgData
    let pix
    let WIDTH
    let ctx
    let HEIGHT
    let flickerInterval
    let isOn

    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = WIDTH = 854
    canvas.height = HEIGHT = 480

    isOn = true
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    ctx.fill()
    imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
    pix = imgData.data
    flickerInterval = setInterval(flickering, 50)

    function flickering() {
      for (let i = 0; i < pix.length; i += 4) {
        let color = Math.random() * 255 + 50
        pix[i] = color
        pix[i + 1] = color
        pix[i + 2] = color
      }
      ctx.putImageData(imgData, 0, 0)
    }

    function toggleScreen() {
      if (isOn) {
        clearInterval(flickerInterval)
        document.body.classList.add('screenOff')
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
        ctx.fill()
      } else {
        document.body.classList.remove('screenOff')
        flickerInterval = setInterval(flickering, 50)
      }
      isOn = !isOn
    }
  }, [])

  return (
    <Container>
      <PepeImage src="/pepes/420-pepe.png" animation={vibrate} style={{ top: '5%', left: '8%' }} />
      <PepeImage src="/pepes/monkas-pepe.png" animation={vibrate} style={{ top: '40%', left: '3%' }} />
      <PepeImage src="/pepes/ez-pepe.png" animation={vibrate} style={{ top: '31%', right: '2%' }} />
      <PepeImage src="/pepes/laughing-pepe.png" animation={vibrate} style={{ top: '4%', right: '50%' }} />
      <PepeImage src="/pepes/popcorn-pepe.png" animation={vibrate} style={{ top: '7%', right: '5%' }} />
      <PepeImage src="/pepes/sheeesh-pepe.png" animation={vibrate} style={{ top: '49%', right: '4%' }} />
      <PepeImage src="/pepes/wicked-pepe.png" animation={wobble} style={{ top: '90%', left: '4%' }} />
      <Screen>
        <canvas id="canvas"></canvas>
        <iframe
          id="youtube-player"
          width="854"
          height="480"
          src="https://www.youtube.com/embed/videoseries?list=PLBCENMDh5QEHPu4r-3gbmioiad04v2_v5&autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
          style={{ position: 'absolute', marginLeft: '-999999px' }}
        ></iframe>
      </Screen>
      <div id="lights">
        <LightBulb animationTime="5s" widthPercentage={100} fromColor="#473c78" toColor="#f72a3b">
          <LightBulb animationTime="4s" widthPercentage={90} fromColor="#18c499" toColor="#d8f05e">
            <LightBulb animationTime="3s" widthPercentage={80} fromColor="#ffdd00" toColor="#3e33ff">
              <LightBulb animationTime="2s" widthPercentage={70} fromColor="#781848" toColor="#f2bbe9" />
            </LightBulb>
          </LightBulb>
        </LightBulb>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;

  #lights {
    position: absolute;
    bottom: -20px;
    width: 100%;
  }
`
const lightBulbAnimation = (props) => keyframes`
  from {
    box-shadow: 0 0 250px 20px ${props.fromColor};
  }
  
  to {
    box-shadow: 0 0 100px 15px ${props.toColor};
  }
`

const LightBulb = styled.div`
  width: ${(p) => p.widthPercentage}%;
  animation: ${lightBulbAnimation} ${(p) => p.animationTime} ease-in-out infinite alternate;
  border-radius: 50%;
  height: 20px;
  width: 100%;
  position: relative;
  margin: auto;
`

const PepeImage = styled.img`
  position: absolute;
  width: 64px;
  animation: ${(p) => p.animation} 5s ease-out 0s infinite normal forwards;
  will-change: transform;
`

const Screen = styled.div``

const wobble = keyframes`
  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }

  15% {
    transform: translateX(-30px) rotate(-6deg);
  }

  30% {
    transform: translateX(15px) rotate(6deg);
  }

  45% {
    transform: translateX(-15px) rotate(-3.6deg);
  }

  60% {
    transform: translateX(9px) rotate(2.4deg);
  }

  75% {
    transform: translateX(-6px) rotate(-1.2deg);
  }
`

const vibrate = keyframes`
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(-2px, 2px);
  }

  40% {
    transform: translate(-2px, -2px);
  }

  60% {
    transform: translate(2px, 2px);
  }

  80% {
    transform: translate(2px, -2px);
  }

  100% {
    transform: translate(0);
  }
`
