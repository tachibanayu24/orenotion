module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    // themingしたい
    // color theme
    // font-theme
    extend: {
      zIndex: {
        background: -1000,
        main: 0,
        floating: 1000,
        front: 1100,
        overlay: 1200,
        modal: 1300,
        snackbar: 1400,
        popup: 1500,
      },
      animation: {
        fade: 'fadeOut 3s ease-out',
        ohNo: 'ohNo 0.82s cubic-bezier(.36,.07,.19,.97) both',
        progress: 'progress 1s linear forwards',
        pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: (_theme) => ({
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        ohNo: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        progress: {
          '100%': {
            width: '100%',
          },
        },
        pulse: {
          '50%': {
            opacity: 0.5,
          },
        },
      }),
    },
  },
  plugins: [],
}
