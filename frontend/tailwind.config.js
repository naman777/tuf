/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",              // Include your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS, TS, JSX, TSX files in the src directory
  ],
  theme: {
    extend: {},                    // This is where you can extend the default Tailwind theme
  },
  plugins: [],                     // This is where you can add Tailwind plugins if needed
}
