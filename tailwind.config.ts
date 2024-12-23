import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  // added second path for design system class mappings
  content: ["./src/**/*.tsx", "./src/app/_components/design-system/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        aquire: ["Aquire", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
