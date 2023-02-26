/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter"],
      },
      colors: {
        primary: "#1F8A70",
      },
    },
  },
  plugins: [],
};
