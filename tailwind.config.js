// tailwind.config.js
module.exports = {
    content: [],
    theme: {
      extend: {},
    },
    plugins: [],
    corePlugins: require('tailwindcss/defaultConfig').corePlugins.filter(
      (plugin) => !['preflight'].includes(plugin)
    ),
  }