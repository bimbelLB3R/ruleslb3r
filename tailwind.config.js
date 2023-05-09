/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%',
      },
      // fontFamily: {
      //   montserrat: ['var(--font-montserrat)', 'sans-serif'],
      // },
    },
  },
  plugins: [require('flowbite/plugin')],
};
