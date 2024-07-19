/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        screens: {
          'Sm': '300px',
          'sm': '600px',
          'md': '800px',
          'lg': '1224px',
          'xl': '1524px',
        },
      },
    },
    plugins: [],
  };
  