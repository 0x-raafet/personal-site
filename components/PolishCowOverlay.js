import useEscClose from 'hooks/useEscClose'
import { useSound } from 'hooks/useSound'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { randomRange } from 'utils/randomRange'

export default function PolishCowOverlay({ onClose }) {
  const [numberOfCows, setNumberOfCows] = useState(8)
  useEscClose(onClose)
  const [playSong, { stop: stopSong }] = useSound('/polish-cow-song.mp4', {
    volume: 0.4,
    interrupt: true,
    loop: true,
  })

  function handleScreenClick() {
    setNumberOfCows((prev) => prev + 1)
  }

  useEffect(() => {
    playSong()

    const interval = setInterval(() => {
      setNumberOfCows(randomRange(6, 12))
    }, 1000 * 2)

    function handleMouseMove(e) {
      const pointerElement = document.querySelector('.pointer')
      pointerElement.setAttribute('style', `left: ${e.pageX}px; top: ${e.pageY}px;`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
      stopSong()
    }
  }, [playSong, stopSong])

  const cowsMarkup = Array.from({ length: numberOfCows }, (_, idx) => {
    const padding = 256
    const left = randomRange(0, window.innerWidth - padding)
    const top = randomRange(0, window.innerHeight - padding)
    const style = { position: 'absolute', width: 256, pointerEvents: 'none', userSelect: 'none', left, top }

    return <img key={idx} src="polish-cow.gif" style={style} alt="" />
  })

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Container onClick={handleScreenClick}>
        {cowsMarkup}
        <Pointer className="pointer">
          <img src="polish-cow.gif" alt="" />
        </Pointer>
        <Captions>
          Tylko jedno w głowie mam
          <br />
          Koksu pięć gram odlecieć sam
          <br />
          W krainę za zapomnienia
          <br />
          W głowie myśli mam
          <br />
          Kiedy skończy się ten stan
          <br />
          Gdy już nie będę sam
          <br />
          Bo wjedzie biały węgorz
        </Captions>
      </Container>
    </div>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  cursor: none;
  perspective: -500px;

  background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
  background-size: 1800% 1800%;
  animation: rainbow 18s ease infinite, perspectiveAnim 3s infinite;

  @keyframes rainbow {
    0% {
      background-position: 0% 82%;
    }
    50% {
      background-position: 100% 19%;
    }
    100% {
      background-position: 0% 82%;
    }
  }

  @keyframes perspectiveAnim {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.05);
    }

    100% {
      transform: scale(1);
    }
  }
`

const Captions = styled.div`
  color: black;
  width: 65%;
  height: 250px;
  font-size: 4em;
  font-weight: bold;
  white-space: nowrap;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  pointer-events: none;
  user-select: none;

  position: absolute;
  text-align: center;
  left: 50%;
  top: 20%;

  animation: anim 3s, scrollTextAnim 15s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @keyframes scrollTextAnim {
    from {
      transform: rotateX(25deg) rotateY(20deg) rotateZ(-3deg) translateX(-50%) translateY(0%);
    }

    to {
      transform: rotateX(25deg) rotateY(20deg) rotateZ(-3deg) translateX(-50%) translateY(-100%);
    }
  }

  @keyframes anim {
    0% {
      text-shadow: -6px 4px 0px red;
    }
    10% {
      text-shadow: 4px -6px 0px green;
    }
    20% {
      text-shadow: -9px 4px 0px blue;
    }
    30% {
      text-shadow: 4px -6px 0px yellow;
    }
    40% {
      text-shadow: -8px 4px 0px orange;
    }
    50% {
      text-shadow: 4px 5px 0px purple;
    }
    60% {
      text-shadow: -6px 4px 0px brown;
    }
    70% {
      text-shadow: 4px 7px 0px pink;
    }
    80% {
      text-shadow: -9px -4px 0px lime;
    }
    90% {
      text-shadow: 4px -6px 0px cyan;
    }
    100% {
      text-shadow: -9px 4px 0px teal;
    }
  }
`

const Pointer = styled.div`
  position: absolute;
  top: 100px;
  width: fit-content;
  left: 50%;
  pointer-events: none;
  user-select: none;
`
