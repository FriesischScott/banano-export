const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ["./public/index.html", "./src/**/*.svelte"],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // custom
      "banano-green": {
        DEFAULT: "#4CBF4B",
      },
      "banano-yellow": {
        DEFAULT: "#FBDD11",
      },
      "banano-gray": {
        DEFAULT: "#2A2A2E",
      },
      "banano-dark-gray": {
        DEFAULT: "#212124",
      },
      // default
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
