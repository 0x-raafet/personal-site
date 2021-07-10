import styled, { css } from 'styled-components'
import React, { useState } from 'react'
import MoonIcon from './icons/MoonIcon'
import SunIcon from './icons/SunIcon'
import { useBoolean } from 'hooks/useBoolean'
import { darken } from 'polished'

export default function ColorSwitcher(props) {
  const [isLightMode, { toggle }] = useBoolean(true)

  return (
    <ColorSwitcherContainer isLightMode={isLightMode}>
      <MoonIcon className="moon-icon" onClick={toggle} />
      <SunIcon className="sun-icon" onClick={toggle} />
    </ColorSwitcherContainer>
  )
}

const ColorSwitcherContainer = styled.div`
  display: flex;
  user-select: none;
  padding: ${(p) => p.theme.spacings['2xs']}px;
  border-radius: 8px;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${(p) => darken(0.05, p.theme.colors.primary)};
  }

  & > * {
    cursor: pointer;
    line-height: 1;
    transition: all 0.4s;
  }

  .moon-icon {
    visibility: ${(p) => (p.isLightMode ? 'visible' : 'hidden')};
    opacity: ${(p) => (p.isLightMode ? 1 : 0)};
    pointer-events: ${(p) => (p.isLightMode ? 'auto' : 'none')};
    width: ${(p) => (p.isLightMode ? '40px' : 0)};
    height: ${(p) => (p.isLightMode ? '40px' : 0)};

    ${(p) =>
      !p.isLightMode &&
      css`
        padding: 0;
      `}
  }

  .sun-icon {
    visibility: ${(p) => (p.isLightMode ? 'hidden' : 'visible')};
    opacity: ${(p) => (p.isLightMode ? 0 : 1)};
    pointer-events: ${(p) => (p.isLightMode ? 'none' : 'auto')};
    width: ${(p) => (p.isLightMode ? 0 : '40px')};
    height: ${(p) => (p.isLightMode ? 0 : '40px')};

    ${(p) =>
      p.isLightMode &&
      css`
        padding: 0;
      `}
  }
`
