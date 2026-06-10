/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a6e4f",
        gold: "#f5a623",
        teal: "#00d4aa",
        bg: "#0a0f1a",
        surface: "#111827",
        surface2: "#1f2937",
        text: "#f0f4f8",
        muted: "#9ca3af",
        danger: "#ef4444",
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(10,14,26,0.85) 0%, rgba(10,110,79,0.4) 100%)',
      },
      boxShadow: {
        'glow': '0 0 24px rgba(0,212,170,0.3)',
      }
    },
  },
  plugins: [],
}
