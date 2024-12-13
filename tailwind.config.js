/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables dark mode using class
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryHover: "var(--color-primaryHover)",
        dataSections: "var(--color-dataSections)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        background: "var(--color-background)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
