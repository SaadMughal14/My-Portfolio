
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants.ts"
  ],
  theme: {
    extend: {
      colors: {
        volt: '#a3ff00',
      }
    },
  },
  plugins: [],
}
