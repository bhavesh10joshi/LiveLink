/** type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
            black:{
              800 : "#0a0c10" , 
              500 : "#11141b"
            },
            blue:
            {
              800 : "#0d59f2"
            }
          },
          fontFamily: {
              "sans": ["Inter", "sans-serif"]
          },
          borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px" },
      },
  },
  plugins: [],
}