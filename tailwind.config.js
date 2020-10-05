const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

// parse npm config argumans
const argv = JSON.parse(process.env.npm_config_argv);

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
    enabled: argv.original.indexOf('--purge') > -1,
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

      minWidth: (theme) => ({
        ...theme('spacing'),
      }),
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
