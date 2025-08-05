/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#f7f7f8',
        'chat-dark': '#2f2f2f',
        'sidebar-bg': '#ffffff',
        'sidebar-dark': '#171717',
        'message-user': '#f7f7f8',
        'message-ai': '#ffffff',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}