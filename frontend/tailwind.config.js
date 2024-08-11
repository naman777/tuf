/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",              // Include your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS, TS, JSX, TSX files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        first: '#14213d', // Add a custom blue color
        second: '#caf0f8', // Add a custom green color
        third: '#e0aaff', // Add a custom red color
      },
    },
  },
  variants: {},
  plugins: [],                     // This is where you can add Tailwind plugins if needed
}
