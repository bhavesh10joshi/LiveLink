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
        500 : "#3b82f6" ,
        400 : "#5170ff" ,
        200 : "#93c5fd"
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
        200 : "#c1ff72" , 
        400 : "#22c55e"
      } , 
      purple :
      {
        400 : "#4f46e5"
      }
    }
  },
  plugins: [],
}
