/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Это самая важная строка!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}