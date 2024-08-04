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
      //     'Sm': '640px',  // Small devices (phones, 640px and up)
      // 'md': '768px',  // Medium devices (tablets, 768px and up)
      // 'lg': '1024px', // Large devices (desktops, 1024px and up)
      // 'xl': '1280px', // Extra large devices (large desktops, 1280px and up)
      // '2xl': '1536px'
        },

      
          fontFamily: {
            custom: [ 'Nunito Sans'], // Use your custom font here
          },
        
    
      },
    },
    plugins: [],
  };
  