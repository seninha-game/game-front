import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)",
        ],
        "glow-2": "0 0 10px #ffde4e",
      },
      animation: {
        "spin-fast": "spin 0.55s linear infinite",
      },
      fontFamily: {
        tilting: ["Tilting", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "1rem",
          xl: "1rem",
          "2xl": "4rem",
        },
      },

      colors: {
        white: "#FFFFFF",
        brand: {
          "yellow-100": "#e3bc3f",
          "blue-100": "#01162f",
          "bg-100": "#150e01",
          "theme-100": "#e3bc3f",
          "coringa-blue-80": "#00032e",
          "coringa-yellow-60": "#875101",
          "coringa-yellow-40": "#C29561",
          "yellow-100-design": "#fed74e", //rgb(249 115 22)
        },
        grey: {
          0: "#0B0D0D",
          100: "#212529",
          200: "#495057",
          300: "#868E96",
          400: "#ADB5BD",
          500: "#CED4DA",
          600: "#DEE2E6",
          700: "#E9ECEF",
        },
        feedBack: {
          alert: {
            100: "#CD2B31",
            200: "#FDD8D8",
            300: "#FFE5E5",
          },
          success: {
            100: "#18794E",
            200: "#CCEBD7",
            300: "#DDF3E4",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("daisyui")],
};
export default config;
