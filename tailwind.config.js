/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables dark mode using class
  theme: {
    extend: {
      colors: {
        bgDefault: {
          800: "rgb(var(--default-bg-900))",
          900: "rgb(var(--default-bg-800))",
          black: "rgb(var(--default-bg-black))",
        },
        primary: {
          DEFAULT: "rgb(var(--primary-color))", // Base background color
          hover: "rgb(var(--primary-hover-color))", // Background color for hover
          foreground: "rgb(var(--primary-foreground))", // Text color
          "hover-foreground": "rgb(var(--primary-hover-foreground))", // Text color for hover
        },
        selectedNavLink: {
          DEFAULT: "rgb(var(--selected-nav-link-bg))", // Background color
          text: "rgb(var(--selected-nav-link-text))", // Text color
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-rtl")],
};
