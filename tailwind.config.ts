import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem",
        md: ".375rem",
        sm: ".1875rem",
      },

      colors: {
        background: "hsl(var(--background, 0 0% 100%) / <alpha-value>)",
        foreground: "hsl(var(--foreground, 210 15% 15%) / <alpha-value>)",

        border: "hsl(var(--border, 210 15% 85%) / <alpha-value>)",
        input: "hsl(var(--input, 210 15% 85%) / <alpha-value>)",

        card: {
          DEFAULT: "hsl(var(--card, 0 0% 100%) / <alpha-value>)",
          foreground:
            "hsl(var(--card-foreground, 210 15% 15%) / <alpha-value>)",
          border: "hsl(var(--card-border, 210 15% 85%) / <alpha-value>)",
        },

        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%) / <alpha-value>)",
          foreground:
            "hsl(var(--popover-foreground, 210 15% 15%) / <alpha-value>)",
          border: "hsl(var(--popover-border, 210 15% 85%) / <alpha-value>)",
        },

        primary: {
          DEFAULT: "hsl(var(--primary, 210 70% 30%) / <alpha-value>)",
          foreground:
            "hsl(var(--primary-foreground, 0 0% 100%) / <alpha-value>)",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary, 210 20% 90%) / <alpha-value>)",
          foreground:
            "hsl(var(--secondary-foreground, 210 15% 20%) / <alpha-value>)",
        },

        muted: {
          DEFAULT: "hsl(var(--muted, 210 20% 95%) / <alpha-value>)",
          foreground:
            "hsl(var(--muted-foreground, 210 10% 35%) / <alpha-value>)",
        },

        accent: {
          DEFAULT: "hsl(var(--accent, 210 40% 92%) / <alpha-value>)",
          foreground:
            "hsl(var(--accent-foreground, 210 20% 20%) / <alpha-value>)",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 75% 50%) / <alpha-value>)",
          foreground:
            "hsl(var(--destructive-foreground, 0 0% 100%) / <alpha-value>)",
        },

        ring: "hsl(var(--ring, 210 70% 30%) / <alpha-value>)",

        "text-safe": "hsl(210 10% 30%)",
        "text-soft": "hsl(210 10% 45%)",

        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },

      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [tailwindcssAnimate, typography],
} satisfies Config;