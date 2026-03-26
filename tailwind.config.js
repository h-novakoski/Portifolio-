/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06060a",
        glowV: "#8c5aff",
        glowB: "#46a0ff",
      },
    },
  },
  plugins: [],
};