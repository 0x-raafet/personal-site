const fs = require('fs')

const ignoredSortingDirectories = ['.git', '.next', '.vscode', 'node_modules']

module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app', 'prettier', 'plugin:react/recommended', 'next/core-web-vitals'],
  env: {
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'no-unused-vars': 1,
    'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    'import/order': [
      1,
      {
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
        pathGroups: [
          ...getDirectoriesToSort().map((singleDir) => ({ pattern: `${singleDir}/**`, group: 'internal' })),
          { pattern: 'env', group: 'internal' },
          { pattern: 'theme', group: 'internal' },
          { pattern: 'public/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}

function getDirectoriesToSort() {
  return getDirectories(process.cwd()).filter((f) => !ignoredSortingDirectories.includes(f))
}

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory()
  })
}
