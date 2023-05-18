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
        "work-sans": ["__Work_Sans_b188ac", "sans-serif"],
        inter: ["__Inter_0ec1f4", "sans-serif"],
      },
    },
  },
  plugins: [],
};
