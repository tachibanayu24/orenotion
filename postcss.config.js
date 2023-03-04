// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, './src/config/theme/tailwind.config.js'),
    },
    autoprefixer: {},
  },
}
