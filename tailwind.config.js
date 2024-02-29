/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        header:'560px',
        rate:'400px'
      },
      fontSize:{
        h1:'2.6rem'
      },
      screens:{
        xs:'475px'
      },
      colors:{
        main:'#101010',
        subMain:'#F20000',
        dry:'#191919',
        start:'#FFB000',
        text:'#C0C0C0',
        border:'#4B5563',
        dryGray:'#FFFFFF'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
