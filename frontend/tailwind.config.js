/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : 
    {
      blue : {
        800 : "#1800ad" ,
        600 : "#004aad" ,
        400 : "#5170ff" 
      } , 
      red : 
      {
        800 : "#de0000",
      } ,
      grey :
      {
        200 : "#d9d9d9"
      }, 
      green : 
      {
        200 : "#c1ff72"
      } , 
      purple :
      {
        200 : "#bab2e6"
      }
    }
  },
  plugins: [],
}
