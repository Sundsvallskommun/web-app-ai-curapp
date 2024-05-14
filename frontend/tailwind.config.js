require('dotenv').config({ path: `.env.local` });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/services/**/*.{js,ts,jsx,tsx}',
    './node_modules/@sk-web-gui/*/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // brand: process.env.NEXT_PUBLIC_BRAND_COLOR,
        brand: 'var(--sk-colors-brand)',
      },
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  presets: [require('@sk-web-gui/core').preset()],
  // plugins: [require('@tailwindcss/forms'), require('@sk-web-gui/core')],
};
