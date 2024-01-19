/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs-max' : {'max': '480px'},
        'sm-max' : {'max': '640px'},
        'md-max' : {'max': '768px'},
        'lg-max': {'max': '1024px'}, 
        'xss-max': {'max': '1280px'}, 
        
       
        
      }
    },
  },
  plugins: [],
}