module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        fade: "fadeOut 3s ease-out",
        ohNo: "ohNo 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },

      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        ohNo: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
      }),
    },
  },
  plugins: [],
};
