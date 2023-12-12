/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [require("flowbite/plugin")],
theme: {
    extend: {
      fontFamily: {
        'mi-fuente': ['Anton', 'sans-serif'],
      },
    },
  },
};