/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nyu-purple': '#57068c',
        'nyu-purple-light': '#8900e1',
        'nyu-purple-dark': '#330662',
      },
    },
  },
  plugins: [],
}
