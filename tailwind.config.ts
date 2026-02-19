import { theme as appTheme } from "./src/theme/theme.ts";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /col-span-(1|2|3|4|6|8|12)/,
      variants: ["sm", "md", "lg"],
    },
    {
      pattern: /^(border|text|bg)-(primary|secondary|success|danger|warning|purple|info)-(700|50|600|900|800|300|400|500)$/,
    },
    {
      pattern: /^(hover:bg|focus:ring)-(primary|secondary|success|danger|warning|purple|info)-(50|300|700|800|900|500)$/,
    },
    {
      pattern: /^hover:underline$/,
    },
    {
      pattern: /^bg-opacity-10$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: appTheme.colors.primary,
        secondary: appTheme.colors.secondary,
        success: appTheme.colors.success,
        danger: appTheme.colors.danger,
        warning: appTheme.colors.warning,
        purple: appTheme.colors.purple,
        info: appTheme.colors.info,
      },
    },
  },
  plugins: [],
};