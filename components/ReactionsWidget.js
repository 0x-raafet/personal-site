import { styled } from '@linaria/react'
import NextImage from "next/legacy/image";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { withTheme } from 'theme'
import FadeIn from './FadeIn'

const MAX_REACTIONS_PER_USER = 5

export default function ReactionsWidget() {
  const [fetchedReactionsData, setFetchedReactionsData] = useState()
  const [reactions, setReactions] = useState(0)
  const router = useRouter()

  const sendReactionsToApi = useDebouncedCallback(() => {
    fetch(`/api/posts/${router.query.slug}/give-heart`, { method: 'POST', body: JSON.stringify({ count: reactions }) })
  }, 1000)

  useEffect(() => {
    fetch(`/api/posts/${router.query.slug}`)
      .then((res) => res.json())
      .then((res) => setFetchedReactionsData(res))
  }, [router.query.slug])

  if (!fetchedReactionsData) {
    return null
  }

  function handleOnClick() {
    if (reactions < MAX_REACTIONS_PER_USER && !fetchedReactionsData.hasAlreadyVoted) {
      setReactions((prev) => prev + 1)
      sendReactionsToApi()
    }
  }

  const { heartReactions } = fetchedReactionsData

  return (
    <Wrapper>
      <FadeIn delay={1000}>
        <NextImage onClick={handleOnClick} unoptimized src="/heart.png" width={96} height={64} alt="Heart" objectFit="contain" />
        <ReactionsCount>{heartReactions + reactions}</ReactionsCount>
      </FadeIn>
    </Wrapper>
  )
}

const Wrapper = withTheme(styled.div`
  position: sticky;
  z-index: 999;
  width: 96px;
  height: 110px;
  cursor: pointer;
  user-select: none;

  margin-top: -110px;
  margin-left: -192px;
  margin-right: auto;
  top: 550px;
  transition: transform 0.3s;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.15);
  }

  @media (max-width: 80em) {
    display: none;
  }
`)

const ReactionsCount = withTheme(styled.div`
  margin: auto;
  background: var(--overlay);
  opacity: 0.5;
  margin-top: 6px;
  border-radius: 10px;
  width: fit-content;
  padding: 5px 10px;
`)
