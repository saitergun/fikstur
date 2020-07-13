const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

const utilities = ({ addUtilities }) => {
  addUtilities({
    '.no-scrollbar': {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  });
};

module.exports = {
  purge: {
    enabled: true,
    content: [
      './public/*.html',
      './src/**/*.jsx'
    ],
  },

  theme: {
    extend: {
      fontFamily: {
        'didact-gothic': ['Didact Gothic', ...defaultTheme.fontFamily.sans],
      },

      spacing: {
        7: '1.75rem',
      },
    },
  },

  variants: {
    backgroundColor: ['hover', 'active', 'focus'], // ['responsive', 'hover', 'focus']
    borderColor: ['hover', 'active', 'focus'], // ['responsive', 'hover', 'focus']
  },

  plugins: [
    plugin(utilities),
  ],

  corePlugins: {
    container: false,
  }
}
