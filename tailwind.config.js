/** @type {import('tailwindcss').Config} */
const tailwindcss = require('tailwindcss');
module.exports = {
  darkMode: 'selector',
  content: ['./dist/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss
  ],
}

