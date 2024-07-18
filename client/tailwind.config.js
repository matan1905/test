module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      maxWidth: {
        '2xl': '42rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
