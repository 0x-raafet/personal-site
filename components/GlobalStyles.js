import { css } from 'linaria'

export const GlobalStyle = css`
  :global() {
    .light-theme {
      --background: hsl(228, 100%, 99%);
      --text: hsl(0deg, 0%, 100%);
      --text-lighter: var(--gray-700);
      --heading: var(--gray-900);
      --tint-primary: var(--tint-blue);
      --navbar: var(--gray-50);
      --overlay: var(--gray-400);
      --overlay-lighter: var(--gray-300);
      --primary: #c08b30;

      --navbar-item-hover: var(--gray-200);
      --navbar-item-focus: var(--gray-300);
      --text-highlight: var(--gray-200);
    }

    .dark-theme {
      --background: hsl(220, 26%, 14%);
      --text: var(--gray-100);
      --text-ligher: var(--gray-300);
      --heading: var(--gray-50);
      --tint-primary: var(--tint-blue);
      --navbar: hsl(218, 23%, 23%);
      --overlay: var(--gray-800);
      --overlay-lighter: var(--gray-700);
      --primary: #81a1c1;

      --navbar-item-hover: #313d4f;
      --navbar-item-focus: #1b2331;
      --text-highlight: #313d4f;
    }

    :root {
      --border: rgb(234, 234, 234);
      --bg-primary: white;
      --text-primary: rgb(35 35 35);
      --text-secondary: rgb(31, 155, 240);

      --gray-900: hsl(230, 60%, 16%);
      --gray-800: hsl(228, 18%, 34%);
      --gray-700: hsl(230, 14%, 48%);
      --gray-600: hsl(230, 19%, 63%);
      --gray-500: hsl(231, 20%, 80%);
      --gray-400: hsl(231, 20%, 87%);
      --gray-300: hsl(228, 25%, 92%);
      --gray-200: hsl(225, 29%, 95%);
      --gray-100: hsl(228, 29%, 97%);
      --gray-50: hsl(220, 37%, 97%);

      --blue-900: hsl(225, 67%, 12%);
      --blue-800: hsl(225, 67%, 24%);
      --blue-700: hsl(225, 66%, 36%);
      --blue-600: hsl(225, 67%, 48%);
      --blue-500: hsl(225, 100%, 60%);
      --blue-400: hsl(225, 100%, 68%);
      --blue-300: hsl(225, 100%, 76%);
      --blue-200: hsl(225, 100%, 84%);
      --blue-100: hsl(225, 100%, 92%);
      --blue-50: hsl(225, 100%, 96%);

      --red-900: hsl(0, 52%, 32%);
      --red-800: hsl(0, 51%, 43%);
      --red-700: hsl(0, 61%, 54%);
      --red-600: hsl(0, 73%, 75%);
      --red-500: hsl(0, 72%, 92%);
      --red-400: hsl(0, 69%, 97%);

      --green-900: hsl(158, 41%, 11%);
      --green-800: hsl(158, 39%, 21%);
      --green-700: hsl(158, 40%, 32%);
      --green-600: hsl(157, 39%, 43%);
      --green-500: hsl(158, 45%, 53%);
      --green-400: hsl(157, 45%, 63%);
      --green-300: hsl(158, 44%, 72%);
      --green-200: hsl(158, 45%, 81%);
      --green-100: hsl(158, 46%, 91%);
      --green-50: hsl(150, 43%, 97%);

      --tint-blue: hsl(225, 100%, 98%);
      --tint-green: hsl(150, 43%, 97%);
    }

    /* Box sizing rules */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    /* Remove default margin */
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
      margin: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: var(--heading);
    }

    /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
    ul[role='list'],
    ol[role='list'] {
      list-style: none;
    }

    ul,
    ol {
      padding-left: 20px;
    }

    /* Set core root defaults */
    html:focus-within {
      scroll-behavior: smooth;
    }

    html {
      -webkit-font-smoothing: antialiased;
      touch-action: manipulation;
      text-rendering: optimizelegibility;
      text-size-adjust: 100%;
      font-family: 'Rubik', -apple-system, sans-serif;
    }

    /* Set core body defaults */
    body {
      min-height: 100vh;
      text-rendering: optimizeSpeed;
      line-height: 1.5;
      font-family: 'Rubik', -apple-system, sans-serif;
      color: var(--text);
      background: var(--background);
      font-feature-settings: 'kern';
    }

    svg {
      color: var(--text);
    }

    /* A elements that don't have a class get default styles */
    a:not([class]) {
      text-decoration-skip-ink: auto;
    }

    /* Make images easier to work with */
    img,
    picture {
      max-width: 100%;
      display: block;
    }

    /* Inherit fonts for inputs and buttons */
    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    .tweet-info {
      margin-top: 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      display: flex;
      align-items: center;
      color: rgb(148, 163, 184);
    }

    .tweet-info-favourite {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.5rem;
    }

    .tweet-info-date {
      margin-left: 1rem;
    }

    .tweet-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tweet-author-image {
      width: 48px;
      height: 48px;
      border-radius: 9999px;
    }
    .tweet-author-info {
      margin-left: 1rem;
    }
    .tweet-author-name {
      line-height: 1rem;
      font-weight: 500;
    }
    .tweet-author-handler {
      line-height: 1.8rem;
      color: var(--text-secondary);
    }

    .tweet-content {
      margin-top: 1rem;
    }
    .tweet-content a {
      color: var(--text-secondary);
    }
    .tweet-content .emoji {
      display: inline-block;
      height: 1.2em;
      width: 1.2em;
      margin: 0 0.05em 0 0.1em;
      vertical-align: -0.1em;
    }

    .tweet-media {
      margin-top: 1rem;
      border: 1px solid var(--border);
      border-radius: 1rem;
      overflow: hidden;
    }
    .tweet-summary-card-text {
      border-top: 1px solid var(--border);
      padding: 0.75rem;
      font-size: 0.95rem;
      color: var(--subtext-primary);
    }
    .tweet-summary-card-text span {
      font-size: 0.9rem;
    }
    .tweet-summary-card-text h2 {
      color: var(--text-primary);
    }
    .tweet-summary {
      display: flex;
    }
    .tweet-summary img {
      width: 130px;
      height: 130px;
    }
    .tweet-summary > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-left: 1px solid var(--border);
      border-top: 0px !important;
    }

    .tweet-image {
      width: 100%;
    }
    .tweet-quoted .tweet {
      margin-top: 1rem;
      width: 100%;
    }

    .tweet {
      max-width: 515px;
      padding: 2rem;
      color: var(--text-primary);
      border: 1px solid var(--border);
      border-radius: 1rem;
      background: var(--bg-primary);
      overflow: auto;
    }
    .tweet-author {
      display: flex;
      align-items: center;
    }
    .tweet-author-title {
      display: flex;
      align-items: center;
    }
    .tweet-author-verified {
      width: 1.25rem;
      height: 1.25rem;
      margin-left: 0.25rem;
      color: var(--text-secondary);
    }
    .tweet-logo {
      color: var(--text-secondary);
    }

    /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
    @media (prefers-reduced-motion: reduce) {
      html:focus-within {
        scroll-behavior: auto;
      }

      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  }
`
