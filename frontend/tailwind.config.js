/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        softblack: "#121212",
        softgold: "#FFD700",
      },
      boxShadow: {
        gold: "0 0 10px 2px rgba(255, 215, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
