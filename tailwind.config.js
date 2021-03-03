module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ssblue: '#004d91',
        ssorange: 'rgb(239, 70, 36)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            figure: {
              display: 'flex',
              justifyContent: 'center',
            },
            img: {
              padding: '16px',
              border: '2px solid',
              borderColor: '#4B5563',
              borderRadius: '5px',
            },
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
