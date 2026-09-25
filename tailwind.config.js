/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#FDFBF7",
        card: "#FFFFFF",
        terracotta: "#E06D53",
        sage: "#768A75",
        charcoal: "#2C2A29",
        "warm-gray": "#8A8680",
        "linen-edge": "#ECE8E1",
        amber: "#D4930A",
        "terracotta-light": "#FDF0ED",
        "sage-light": "#E8EDE8",
        "amber-light": "#FFF8E8",
      },
      fontFamily: {
        display: ["'Zen Maru Gothic'", "sans-serif"],
        body: ["'Zen Kaku Gothic New'", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn: "10px",
        pill: "999px",
        input: "10px",
      },
    },
  },
  plugins: [],
};
