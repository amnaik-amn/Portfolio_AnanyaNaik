import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Backwards-compatible base tokens used across existing code
        dark: "#080708",
        light: "#E6E8E6",
        blue: "#3772FF",
        red: "#DF2935",
        yellow: "#FDCA40",

        // New design tokens: paper (light) and ink (dark)
        paper: {
          bg: "#FAFAF9",
          surface: "#FFFFFF",
          text: "#1A1A1A",
          "text-muted": "#6B6B6B",
          accent: "#D97706",
          "accent-soft": "#F59E0B",
          line: "#E5E5E5",
          "line-accent": "#C2410C",
          DEFAULT: "#FAFAF9"
        },
        ink: {
          bg: "#0A0A0A",
          surface: "#1A1A1A",
          text: "#F5F5F5",
          "text-muted": "#A3A3A3",
          accent: "#60A5FA",
          "accent-soft": "#93C5FD",
          line: "#2A2A2A",
          "line-accent": "#3B82F6",
          DEFAULT: "#0A0A0A"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-inter)"]
      },
      animation: {
        "draw-line": "drawLine 2s ease-out forwards",
        "slide-left": "slideLeft 20s linear infinite",
        "slide-right": "slideRight 20s linear infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards"
      },
      keyframes: {
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" }
        },
        slideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        slideRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;

