/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],



}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amharic-font': ['Noto Sans Ethiopic', 'sans-serif'],
      },
      colors: {
        primary: '#2E7D32', // Ethiopian green
        accent: '#795548',
        header: '#1B5E20',
        error: '#B71C1C',
        'cta-btn': '#FFD54F',
        warning: '#F9A825',
        text: '#212121',
        success: '#689F38',
        background: '#F5F5F5',
      },
      
    },
  },
  plugins: [],
};