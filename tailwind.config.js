/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter',
        cabin: ['Cabin', 'sans-serif'],
      },
      colors: {
        bgMain: '#ececec',
        accent: '#11E496',
        accentSecondary: '#b8f7e0',
        main: '#1E234F',
        mainSecondary: '#4b4f72',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
