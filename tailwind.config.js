/** @type {import('tailwindcss').Config} */
const tailwindcss = require('tailwindcss');
module.exports = {
  content: ['./dist/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss
  ],
}

