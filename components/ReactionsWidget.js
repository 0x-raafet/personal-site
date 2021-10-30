import NextImage from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

const MAX_REACTIONS_PER_USER = 5

export default function ReactionsWidget() {
  const [fetchedReactionsData, setFetchedReactionsData] = useState()
  const [reactions, setReactions] = useState(0)
  const router = useRouter()

  const sendReactionsToApi = useDebouncedCallback(() => {
    fetch(`/api/posts/${router.query.slug}/give-heart`, { method: 'POST', body: JSON.stringify({ count: reactions }) }).then((res) =>
      res.json(),
    )
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
      <NextImage onClick={handleOnClick} unoptimized src="/heart.png" width={96} height={64} alt="Heart" objectFit="contain" />
      <ReactionsCount>{heartReactions + reactions}</ReactionsCount>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: sticky;
  z-index: ${(p) => p.theme.zIndexes.reactionsWidget};
  width: ${(p) => p.theme.spacings.lg}px;
  height: 110px;
  cursor: pointer;
  user-select: none;

  margin-top: -110px;
  margin-left: -${(p) => p.theme.spacings.xl}px;
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

  @media (max-width: ${(p) => p.theme.breakpoints.xl}) {
    display: none;
  }
`

const ReactionsCount = styled.div`
  margin: auto;
  background: var(--overlay);
  opacity: 0.5;
  margin-top: ${(p) => p.theme.spacings['2xs']}px;
  border-radius: 10px;
  width: fit-content;
  padding: 5px 10px;
`
