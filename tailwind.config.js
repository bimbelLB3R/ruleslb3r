/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", " sans-serif"],
        cinzel: ["Cinzel Decorative", "cursive"],
        gasok: ["Gasoek One", "sans-serif"],
        architects: ['"Architects Daughter"', 'cursive'],
      },
      maxWidth: {
        "1/2": "50%",
      },
      maxWidth: {
        "1/2": "50%",
      },
      // fontFamily: {
      //   montserrat: ['var(--font-montserrat)', 'sans-serif'],
      // },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
