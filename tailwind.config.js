
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        bone: "var(--mv-bone)",
        ink: "var(--mv-ink)",
        brass: "var(--mv-brass)",
        pine: "var(--mv-pine)",
        fog: "var(--mv-fog)",
        stone: "var(--mv-stone)",
        cloud: "var(--mv-cloud)",
        night: "var(--mv-night)",
      },

      fontFamily: {
        display: ["Mona Sans", "sans-serif"],
        sans: ["Mona Sans", "sans-serif"],
        mono: ["Chivo Mono", "monospace"],
      },

      maxWidth: {
        site: "1520px",
      },

      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },

  plugins: [],
};
