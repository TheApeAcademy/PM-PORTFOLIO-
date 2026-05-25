/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-primary': '#0071E3',
        'blue-dim': '#003D7A',
        'surface': '#0A0A0A',
        'surface-2': '#111111',
        'surface-3': '#1A1A1A',
        'text-primary': '#F5F5F7',
        'muted': '#86868B',
        'muted-2': '#6E6E73',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Helvetica Neue"', 'sans-serif'],
        body: ['"DM Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
