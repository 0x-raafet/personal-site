/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components'
import { useSound } from 'hooks/useSound'

export default function Jebaited() {
  useSound('/jebaited-song.mp3', {
    volume: 0.4,
    interrupt: true,
    autoplay: true,
    loop: true,
  })

  return (
    <Wrapper>
      <img src="/you-mad.gif" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #ffffff;
  height: 100vh;
  display: flex;
  align-items: center;
  user-select: none;
  pointer-events: none;

  img {
    width: 35vw;
    margin: auto;
  }
`
