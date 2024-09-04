/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], theme: {
    extend: {
      colors: {
        "palette-green": "#28574E",
        "palette-blue": "#1E232F",
        "palette-white": "#FFFFFF",
        "palette-sucess": "#4AC97E",
      },
    },
  },
  plugins: [],
}

