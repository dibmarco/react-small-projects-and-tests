/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sevillana: "Nunito, sans-serif",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};