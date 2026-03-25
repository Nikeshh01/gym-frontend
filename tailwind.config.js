/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#39FF14',
          dark: '#0a0a0a',
          gray: '#1a1a1a',
        }
      },
      fontFamily: {
        'heading': ['Bebas Neue', 'cursive', 'sans-serif'],
        'body': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}