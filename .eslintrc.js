module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'jsx-a11y/alt-text': 'off',  // Since we're using icon components
    'react/no-unescaped-entities': 'off',  // We've already escaped entities where needed
    '@next/next/no-img-element': 'off'  // We've replaced img with next/image where appropriate
  }
};
