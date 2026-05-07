/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink-green': '#2D5A27',
        'mist-grey': '#F2F2F2',
        'earth-brown': '#8C7355',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
