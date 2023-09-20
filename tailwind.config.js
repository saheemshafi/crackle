/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "work-sans": "var(--font-worksans)",
        inter: "var(--font-inter)",
      },
      colors: {
        brand: "#eb4f2d",
        blue: "#007cfa",
        dark: "#0e0f10",
        "gray-dark": "#181a1d",
        "gray-md": "#4f4f4f",
        "gray-light": "#828282",
        "tmdb-blue":"#01b4e4",
        "tmdb-teal":"#90cea1"
      },
    },
  },
  plugins: [],
};
