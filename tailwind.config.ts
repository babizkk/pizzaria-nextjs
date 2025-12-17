import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4444",
        secondary: "#FFA500",
      },
      fontFamily: {
        sans: ["Fira Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
