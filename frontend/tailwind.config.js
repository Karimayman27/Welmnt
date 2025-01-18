/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Include all React files in the src directory
  theme: {
    extend: {
      colors: {
        'dark-blue-900': '#0a2540', // Custom dark blue color for your header
      },
    },
  },
  plugins: [],
};
