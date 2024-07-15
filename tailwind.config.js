/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        screens: {
          'Sm': '300px',
          'sm': '550px',
          'md': '800px',
          'lg': '1024px',
          'xl': '1524px',
        },
      },
    },
    plugins: [],
  };
  