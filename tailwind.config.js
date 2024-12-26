/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    container: {
      center: true, // Adds margin auto
      padding: "1rem", // Optional padding
    },
  },
  screens: {
    sm: "600px",
    md: "750px",
    lg: "1000px",
    xl: "1200px",
  },

  plugins: [require("flowbite/plugin")],
};
