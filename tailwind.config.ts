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
        // Brand Colors
        'primary-blue': '#35627A',
        'primary-purple': '#A6A9D0',
        'primary-pink': '#E5AEA9',
        'neutral-light': '#F5F5F5',
        'neutral-dark': '#8E9A98',

        // Semantic Colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(53, 98, 122, 0.05)',
        'md': '0 4px 12px rgba(53, 98, 122, 0.08)',
        'lg': '0 10px 30px rgba(53, 98, 122, 0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
