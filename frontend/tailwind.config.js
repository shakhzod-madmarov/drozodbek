/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DF301C",
        "primary-hover": "#C52412",
        "primary-light": "#FDEAE8",
        brandRed: "#DF301C",
        brandOrange: "#FF9100",
        "brandOrange-hover": "#E58200",
        "brandOrange-light": "#FFF4E5",
        brandCream: "#FFF1D1",
        "brandCream-dark": "#F3DFC0",
        brandCyan: "#00B7CD",
        "brandCyan-hover": "#009FB2",
        "brandCyan-light": "#E0F8FB",
        surface: "#FFFDF9",
        "surface-soft": "#FFF8EE",
        dark: "#1A202C",
        "dark-soft": "#2D3748",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(220px, 1fr))",
      },
      boxShadow: {
        luxury: "0 12px 32px -10px rgba(223, 48, 28, 0.08)",
        "luxury-lg": "0 20px 44px -12px rgba(223, 48, 28, 0.14)",
        cyan: "0 12px 32px -10px rgba(0, 183, 205, 0.16)",
        orange: "0 12px 32px -10px rgba(255, 145, 0, 0.18)",
      },
    },
  },
  plugins: [],
};
