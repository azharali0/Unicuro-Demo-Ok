import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#22C55E",
          dark: "#111827",
          bg: "#F8FAFC",
          blue: "#38BDF8",
          purple: "#A78BFA",
          orange: "#F97316"
        }
      },
      borderRadius: {
        card: "22px"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: [],
};

export default config;
