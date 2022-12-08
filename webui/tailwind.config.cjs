const daisyui = require('daisyui');
const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: ['dark'],
  },
  plugins: [daisyui],
};

module.exports = config;
