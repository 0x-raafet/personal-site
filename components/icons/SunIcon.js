import React from 'react'
import Icon from './Icon'

export default function SunIcon(props) {
  return (
    <Icon width="100%" {...props}>
      <svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2"></path>
          <path d="M12 21v2"></path>
          <path d="M4.22 4.22l1.42 1.42"></path>
          <path d="M18.36 18.36l1.42 1.42"></path>
          <path d="M1 12h2"></path>
          <path d="M21 12h2"></path>
          <path d="M4.22 19.78l1.42-1.42"></path>
          <path d="M18.36 5.64l1.42-1.42"></path>
        </g>
      </svg>
    </Icon>
  )
}
