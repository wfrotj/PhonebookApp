/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      mobile: "320px",
      // => @media (min-width: 640px) { ... }

      tablet: "768px",
      // => @media (min-width: 1024px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
