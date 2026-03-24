import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f8fafc",
        ink: "#0f172a",
        brand: {
          DEFAULT: "#2563eb",
          soft: "#dbeafe",
          deep: "#1d4ed8"
        },
        accent: {
          DEFAULT: "#f97316",
          soft: "#ffedd5"
        }
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "serif"],
        body: ["var(--font-roboto)", "sans-serif"]
      },
      boxShadow: {
        panel: "0 24px 60px -28px rgba(15, 23, 42, 0.24)",
        soft: "0 18px 38px -28px rgba(15, 23, 42, 0.28)"
      },
      backgroundImage: {
        editorial:
          "radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 30%), radial-gradient(circle at right 10%, rgba(249, 115, 22, 0.14), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
