/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": "'Roboto', sans-serif",
        "inconsolata": "'Inconsolata', monospace"
      },
      colors: {
        "darkRaspberry": "#952D3E",
        "greyerBlue": "#343642",
        "warmGreyLight": "#979B9B",
        "lightBeige": "#F1EAC6",
        "bluey": "#348798"
      },
      screens: {
        'xs': '340px'
      }
    },
  },
  plugins: [],
}

