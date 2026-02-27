export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      stankyGreen: '#10B981',
      dankPurple: '#6D28D9',
    },
    boxShadow: {
      stanky: '0 0 10px rgba(16,185,129,0.4)',
    },
  },
},
  plugins: [],
}