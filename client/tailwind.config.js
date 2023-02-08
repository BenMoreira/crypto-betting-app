/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'blue': {
          50: '#F1F8FE',
          100: '#E2F1FC',
          200: '#BEE2F9',
          300: '#84CAF5',
          400: '#43B0ED',
          500: '#1B98E0',
          600: '#0D76BC',
          700: '#0C5E98',
          800: '#0E517E',
          900: '#124468',
        },
        'coal':{
          50: '#EDEDED',
          100: '#DBDBDB',
          200: '#BABABA',
          300: '#969696',
          400: '#737373',
          500: '#515151',
          600: '#404040',
          700: '#303030',
          800: '#212121',
          900: '#161616',
        }
      }
    },
  },
  plugins: [],
}
