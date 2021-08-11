import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

export default function MemesPage(props) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => setHasMounted(true), [])

  return (
    <Container>
      {hasMounted && (
        <div id="lights">
          <LightBulb animationTime="5s" widthPercentage={100} fromColor="#473c78" toColor="#f72a3b">
            <LightBulb animationTime="4s" widthPercentage={90} fromColor="#18c499" toColor="#d8f05e">
              <LightBulb animationTime="3s" widthPercentage={80} fromColor="#ffdd00" toColor="#3e33ff">
                <LightBulb animationTime="2s" widthPercentage={70} fromColor="#781848" toColor="#f2bbe9">
                  <LightBulb animationTime="1s" widthPercentage={60} fromColor="#42f2a1" toColor="#f4f6ad" />
                </LightBulb>
              </LightBulb>
            </LightBulb>
          </LightBulb>
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: black;

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
