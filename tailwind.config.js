/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4880FF",      // Biru utama DashStack
        background: "#F5F6FA",   // Background abu-abu terang
        surface: "#FFFFFF",      // Putih untuk Card/Sidebar
        textMain: "#202224",     // Warna teks judul (Hitam pekat)
        textMuted: "#828282",    // Warna teks abu-abu
        border: "#D5D5D5",       // Warna garis tepi
        success: "#00B69B",
        danger: "#EF3826",
        warning: "#FF8A4C"
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'], // Font khas DashStack
      },
    },
  },
  plugins: [],
}