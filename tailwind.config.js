const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      primary: colors.emerald,
      secondary: colors.orange,
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
    },
    extend: {
      lineHeight: {
        16: '4rem'
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
