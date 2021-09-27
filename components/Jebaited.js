import dynamic from 'next/dynamic'
import styled from 'styled-components'

export default function Jebaited() {
  return (
    <Wrapper>
      <div className="video-background">
        <iframe
          width={window.innerWidth}
          height={window.innerHeight}
          src="https://www.youtube.com/embed/AGvrDe3rKxA?autoplay=1&controls=0&mute=0&loop=1&modestbranding=1&showinfo=0&enablejsapi=1&&widgetid=3"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  --video-width: 100vw;
  --video-height: 100vh;

  @media (min-aspect-ratio: 16/9) {
    --video-height: 56.25vw;
  }

  @media (max-aspect-ratio: 16/9) {
    --video-width: 177.78vh;
  }

  .video-background {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

  .video-background iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--video-width);
    height: var(--video-height);
    transform: translate(-50%, -50%);
  }
`
