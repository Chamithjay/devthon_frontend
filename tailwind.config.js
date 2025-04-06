/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'brown': '#C14600',
        'brown-dark': '#690B22',
        'cream-dark':'#E5D0AC',
        'cream': '#FEF9E1',
        'yellow': '#FF9D23',
      },
      fontFamily: {
        
      },
    },
  },
  plugins: [],
}

