/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      gridTemplateRows:{
        '30': 'repeat(30, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}