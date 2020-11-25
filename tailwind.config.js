module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ssblue: '#004d91',
        ssorange: 'rgb(239, 70, 36)',
      },
      fontFamily: {
        sans: ['Roboto'],
        serif: ['Roboto'],
        mono: ['Roboto'],
        display: ['Roboto'],
        body: ['Roboto']
      },
    },
  },
  variants: {},
  plugins: [],
}