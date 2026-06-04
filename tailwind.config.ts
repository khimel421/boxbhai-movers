import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1a3faf",
          navy: "#0f2980",
          light: "#2563eb",
          accent: "#facc15",
        },
      },
      fontFamily: {
        sans: ["var(--font-hind-siliguri)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
