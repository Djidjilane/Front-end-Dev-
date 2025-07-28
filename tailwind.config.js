/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 33s linear infinite',
        fadeIn: 'fadeIn 1s ease-out' 
      },
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(100%)', // Commence à droite
          },
          '100%': {
            transform: 'translateX(-100%)', // Termine à gauche
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
      opacity: ['group-hover'],
    },
  },
  plugins: [],
};






 
        
