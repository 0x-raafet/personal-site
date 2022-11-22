import { styled } from '@linaria/react'
import NextLink from 'next/link'
import React from 'react'
import { withTheme } from 'theme'

export default function Link(props) {
  const { className, children, href } = props
  return (
    <NextLink href={href} passHref>
      <Anchor className={className}>{children}</Anchor>
    </NextLink>
  )
}

const Anchor = withTheme(styled.a`
  display: inline;
  width: fit-content;
  text-decoration: none;

  background: linear-gradient(var(--primary), var(--primary));
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 100% 1px;
  transition: 100ms;
  transition-property: background-size, text-decoration, color;
  color: var(--text);

  &:hover {
    background-size: 100% 100%;
    text-decoration: none;
    color: var(--tint-primary);
  }

  &:active {
    color: var(--tint-primary);
    background-size: 100% 100%;
  }
`)
