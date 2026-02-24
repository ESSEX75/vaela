/** @type {import("prettier").Config} */
const config = {
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
