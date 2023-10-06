/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': 'url(assets/images/background.jpg)'
      },
      colors: {
        ada: '#181c23'
      }
    },
  },
  plugins: [],
}