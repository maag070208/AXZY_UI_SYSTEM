import { jsx as c, jsxs as D, Fragment as jt } from "react/jsx-runtime";
import Se, { useState as ae, useEffect as ye, useMemo as Me, useRef as Ne, useCallback as De, createContext as qa, useContext as Va, memo as Ha, useReducer as Ya, forwardRef as Ba, useImperativeHandle as Ua, Fragment as Ga } from "react";
const Xa = {
  filled: "border-transparent shadow-sm",
  outlined: "bg-transparent border-2",
  raised: "border-transparent shadow-md",
  rounded: "border-transparent shadow-sm rounded-full",
  text: "bg-transparent border-transparent shadow-none hover:bg-opacity-10",
  "raised-text": "bg-white border border-gray-200 shadow-sm hover:shadow-md",
  "icon-only": "p-2 aspect-square flex items-center justify-center border-transparent shadow-sm",
  link: "bg-transparent border-transparent shadow-none hover:underline px-0"
}, Ka = {
  small: "text-xs px-3 py-1.5",
  medium: "text-sm px-5 py-2.5",
  large: "text-lg px-6 py-3"
};
function Un(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = Un(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function te() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = Un(e)) && (n && (n += " "), n += t);
  return n;
}
function rr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var sr = {}, lr = {}, Pt = { exports: {} }, Yr;
function Qa() {
  if (Yr) return Pt.exports;
  Yr = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Pt.exports = t(), Pt.exports.createColors = t, Pt.exports;
}
var Br;
function Za() {
  return Br || (Br = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(l, u) {
      for (var d in u) Object.defineProperty(l, d, {
        enumerable: !0,
        get: u[d]
      });
    }
    t(e, {
      dim: function() {
        return o;
      },
      default: function() {
        return s;
      }
    });
    const r = /* @__PURE__ */ n(/* @__PURE__ */ Qa());
    function n(l) {
      return l && l.__esModule ? l : {
        default: l
      };
    }
    let a = /* @__PURE__ */ new Set();
    function i(l, u, d) {
      typeof process < "u" && process.env.JEST_WORKER_ID || d && a.has(d) || (d && a.add(d), console.warn(""), u.forEach((p) => console.warn(l, "-", p)));
    }
    function o(l) {
      return r.default.dim(l);
    }
    const s = {
      info(l, u) {
        i(r.default.bold(r.default.cyan("info")), ...Array.isArray(l) ? [
          l
        ] : [
          u,
          l
        ]);
      },
      warn(l, u) {
        i(r.default.bold(r.default.yellow("warn")), ...Array.isArray(l) ? [
          l
        ] : [
          u,
          l
        ]);
      },
      risk(l, u) {
        i(r.default.bold(r.default.magenta("risk")), ...Array.isArray(l) ? [
          l
        ] : [
          u,
          l
        ]);
      }
    };
  }(lr)), lr;
}
var Ur;
function Ja() {
  return Ur || (Ur = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return a;
      }
    });
    const t = /* @__PURE__ */ r(Za());
    function r(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    function n({ version: i, from: o, to: s }) {
      t.default.warn(`${o}-color-renamed`, [
        `As of Tailwind CSS ${i}, \`${o}\` has been renamed to \`${s}\`.`,
        "Update your configuration file to silence this warning."
      ]);
    }
    const a = {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617"
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712"
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b"
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a"
      },
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09"
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a"
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
        950: "#431407"
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03"
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
        950: "#422006"
      },
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
        950: "#1a2e05"
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
        950: "#052e16"
      },
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22"
      },
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
        950: "#042f2e"
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344"
      },
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49"
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554"
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
        950: "#1e1b4b"
      },
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
        950: "#2e1065"
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764"
      },
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
        950: "#4a044e"
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
        950: "#500724"
      },
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
        950: "#4c0519"
      },
      get lightBlue() {
        return n({
          version: "v2.2",
          from: "lightBlue",
          to: "sky"
        }), this.sky;
      },
      get warmGray() {
        return n({
          version: "v3.0",
          from: "warmGray",
          to: "stone"
        }), this.stone;
      },
      get trueGray() {
        return n({
          version: "v3.0",
          from: "trueGray",
          to: "neutral"
        }), this.neutral;
      },
      get coolGray() {
        return n({
          version: "v3.0",
          from: "coolGray",
          to: "gray"
        }), this.gray;
      },
      get blueGray() {
        return n({
          version: "v3.0",
          from: "blueGray",
          to: "slate"
        }), this.slate;
      }
    };
  }(sr)), sr;
}
var cr, Gr;
function ei() {
  if (Gr) return cr;
  Gr = 1;
  let e = Ja();
  return cr = (e.__esModule ? e : { default: e }).default, cr;
}
var ti = ei();
const Ct = /* @__PURE__ */ rr(ti), Ye = {
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  // Mantenemos los colores de estado pero actualizamos a tonos más suaves
  success: Ct.emerald,
  danger: Ct.rose,
  warning: Ct.amber,
  purple: Ct.violet,
  info: Ct.sky
}, F = {
  primary: Ye.blue,
  secondary: Ye.gray,
  success: Ye.success,
  danger: Ye.danger,
  warning: Ye.warning,
  info: Ye.cyan,
  // Usamos cyan para info en lugar de sky
  purple: Ye.purple,
  error: Ye.danger,
  gray: Ye.gray
}, ri = {
  layout: {
    backgroundColor: F.gray[50],
    // Very light gray background for the main content area
    contentPadding: "1.5rem"
    // p-6
  },
  topbar: {
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    // Glassmorphism base
    borderColor: F.gray[200],
    iconColor: F.gray[500],
    iconHoverColor: F.gray[700],
    shadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.025)",
    textColor: F.gray[700],
    textHoverColor: F.gray[900],
    userMenu: {
      backgroundColor: F.gray[50],
      hoverBackground: F.gray[100],
      textColor: F.gray[900],
      subtitleColor: F.gray[500],
      dropdown: {
        backgroundColor: "#ffffff",
        borderColor: F.gray[200],
        itemHoverBackground: F.gray[50]
      }
    }
  },
  sidebar: {
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    // Glassmorphism base like topbar
    borderColor: F.gray[200],
    label: {
      color: F.gray[700],
      size: "0.9rem",
      weight: "500"
    },
    icon: {
      color: F.gray[500],
      size: "1.25rem"
    },
    hover: {
      backgroundColor: F.gray[100]
    },
    active: {
      backgroundColor: F.gray[50],
      // Very subtle active bg in light mode
      color: F.gray[900],
      iconColor: "#10b981"
      // Emerald green
    },
    badge: {
      backgroundColor: "#10b981",
      color: "#ffffff"
    }
  },
  button: {
    primary: {
      backgroundColor: "#06b6d4",
      // Cyan-500
      color: "#ffffff",
      hover: "#0891b2",
      // Cyan-600
      active: "#0e7490",
      // Cyan-700
      focus: "0 0 0 2px #a5f3fc",
      // Cyan-200
      borderRadius: "0.375rem",
      // 6px - rounded-md
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      transition: "all 150ms ease-in-out"
    },
    secondary: {
      backgroundColor: "#64748b",
      // Slate-500
      color: "#ffffff",
      // Text white for filled secondary per screenshot
      hover: "#475569",
      // Slate-600
      focus: "0 0 0 2px #e2e8f0",
      borderRadius: "0.375rem",
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      fontWeight: "600"
    },
    success: {
      backgroundColor: "#22c55e",
      // Green-500
      color: "#ffffff",
      hover: "#16a34a",
      // Green-600
      focus: `0 0 0 2px ${F.success[200]}`,
      borderRadius: "0.375rem"
    },
    danger: {
      backgroundColor: "#ef4444",
      // Red-500
      color: "#ffffff",
      hover: "#dc2626",
      // Red-600
      focus: `0 0 0 2px ${F.danger[200]}`,
      borderRadius: "0.375rem"
    },
    error: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
      hover: "#dc2626",
      borderRadius: "0.375rem"
    },
    warning: {
      backgroundColor: "#f97316",
      // Orange-500
      color: "#ffffff",
      hover: "#ea580c",
      // Orange-600
      focus: `0 0 0 2px ${F.warning[200]}`,
      borderRadius: "0.375rem"
    },
    info: {
      backgroundColor: "#0ea5e9",
      // Sky-500
      color: "#ffffff",
      hover: "#0284c7",
      // Sky-600
      focus: `0 0 0 2px ${F.info[200]}`,
      borderRadius: "0.375rem"
    },
    purple: {
      backgroundColor: "#8b5cf6",
      // Violet-500
      color: "#ffffff",
      hover: "#7c3aed",
      // Violet-600
      focus: `0 0 0 2px ${F.purple[200]}`,
      borderRadius: "0.375rem"
    },
    outline: {
      backgroundColor: "transparent",
      color: F.primary[600],
      borderColor: F.primary[600],
      borderWidth: "2px",
      // Slightly thicker for modern look
      hover: F.primary[50],
      borderRadius: "0.375rem"
    }
  },
  badge: {
    primary: {
      backgroundColor: F.primary[100],
      color: F.primary[800],
      borderColor: F.primary[200],
      borderRadius: "9999px",
      padding: "0.25rem 0.75rem",
      fontSize: "0.75rem",
      fontWeight: "500"
    },
    secondary: {
      backgroundColor: F.secondary[100],
      color: F.secondary[800],
      borderColor: F.secondary[200],
      borderRadius: "9999px"
    },
    success: {
      backgroundColor: F.success[100],
      color: F.success[800],
      borderColor: F.success[200],
      borderRadius: "9999px"
    },
    danger: {
      backgroundColor: F.danger[100],
      color: F.danger[800],
      borderColor: F.danger[200],
      borderRadius: "9999px"
    },
    warning: {
      backgroundColor: F.warning[100],
      color: F.warning[800],
      borderColor: F.warning[200],
      borderRadius: "9999px"
    },
    info: {
      backgroundColor: F.info[100],
      color: F.info[800],
      borderColor: F.info[200],
      borderRadius: "9999px"
    },
    purple: {
      backgroundColor: F.purple[100],
      color: F.purple[800],
      borderColor: F.purple[200],
      borderRadius: "9999px"
    },
    error: {
      backgroundColor: F.danger[100],
      color: F.danger[800],
      borderColor: F.danger[200],
      borderRadius: "9999px"
    }
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    // 16px - más moderno
    borderColor: F.gray[200],
    borderWidth: "1px",
    shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    hover: {
      shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
    },
    header: {
      backgroundColor: F.gray[50],
      borderBottom: `1px solid ${F.gray[200]}`,
      padding: "1rem 1.5rem",
      borderTopLeftRadius: "1rem",
      borderTopRightRadius: "1rem"
    },
    body: {
      padding: "1.5rem"
    }
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: F.gray[300],
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    focus: {
      borderColor: F.primary[500],
      ring: `0 0 0 3px ${F.primary[100]}`
    },
    placeholder: F.gray[400],
    disabled: {
      backgroundColor: F.gray[100],
      borderColor: F.gray[200]
    },
    error: {
      borderColor: F.danger[500],
      ring: `0 0 0 3px ${F.danger[100]}`
    }
  },
  table: {
    header: {
      backgroundColor: F.gray[50],
      color: F.gray[700],
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    },
    row: {
      hover: F.primary[50],
      borderBottom: `1px solid ${F.gray[200]}`
    },
    cell: {
      padding: "1rem 1.5rem"
    }
  },
  alert: {
    info: {
      backgroundColor: F.info[50],
      borderColor: F.info[200],
      color: F.info[800],
      icon: F.info[500]
    },
    success: {
      backgroundColor: F.success[50],
      borderColor: F.success[200],
      color: F.success[800],
      icon: F.success[500]
    },
    warning: {
      backgroundColor: F.warning[50],
      borderColor: F.warning[200],
      color: F.warning[800],
      icon: F.warning[500]
    },
    error: {
      backgroundColor: F.danger[50],
      borderColor: F.danger[200],
      color: F.danger[800],
      icon: F.danger[500]
    }
  },
  modal: {
    overlay: {
      backgroundColor: "rgba(15, 23, 42, 0.75)"
      // gray[900] con opacidad
    },
    content: {
      backgroundColor: "#ffffff",
      borderRadius: "1rem",
      shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
    },
    header: {
      padding: "1.5rem 1.5rem 0.5rem 1.5rem",
      borderBottom: `1px solid ${F.gray[200]}`
    },
    body: {
      padding: "1.5rem"
    },
    footer: {
      padding: "1rem 1.5rem",
      borderTop: `1px solid ${F.gray[200]}`,
      backgroundColor: F.gray[50]
    }
  }
}, z = {
  colors: F,
  ...ri
};
function Sr({
  children: e,
  label: t,
  onClick: r,
  type: n = "button",
  color: a = "primary",
  size: i = "medium",
  disabled: o = !1,
  className: s,
  variant: l = "filled",
  ariaLabel: u,
  title: d
}) {
  const [p, b] = ae(!1), [v, E] = ae(!1), y = z.button, M = y[a] || y.primary, w = ["filled", "raised", "rounded", "icon-only"].includes(l || "filled"), k = l === "outlined", C = l === "text" || l === "link", _ = l === "raised-text", x = () => {
    const h = M.backgroundColor, P = M.color;
    let g = {
      // fontSize: themeConfig.fontSize, // Removed to allow size prop to control font size
      fontWeight: M.fontWeight,
      // padding: themeConfig.padding, // Removed to allow size prop to control padding
      borderRadius: M.borderRadius,
      // Default from theme
      transition: M.transition || "all 0.2s"
    };
    return l === "rounded" && (g.borderRadius = "9999px"), l === "icon-only" && (g.padding = "0.5rem"), w ? (g.backgroundColor = p && !o ? M.hover : h, g.color = P) : k ? (g.backgroundColor = "transparent", g.color = h, g.borderColor = h, p && !o && (g.backgroundColor = `${h}10`)) : C ? (g.backgroundColor = p && !o ? `${h}10` : "transparent", g.color = h) : _ && (g.backgroundColor = "#ffffff", g.color = h, p && !o && (g.backgroundColor = "#f8fafc")), v && M.focus && !o && (g.boxShadow = M.focus), g;
  };
  return /* @__PURE__ */ c(
    "button",
    {
      type: n,
      className: te(
        "focus:outline-none",
        // Removed focus:ring-2 focus:ring-offset-2 to use theme style
        // Apply variant base styles (border, shadow, rounded-full)
        Xa[l || "filled"],
        // Apply size classes (padding/font-size)
        Ka[i],
        s,
        { "opacity-50 cursor-not-allowed": o }
      ),
      style: x(),
      onMouseEnter: () => b(!0),
      onMouseLeave: () => b(!1),
      onFocus: () => E(!0),
      onBlur: () => E(!1),
      onClick: r,
      disabled: o,
      "aria-label": u || t,
      title: d || u || t,
      children: e || /* @__PURE__ */ c("span", { className: te("font-semibold", { "opacity-50": o }), children: t })
    }
  );
}
const Gn = 6048e5, ni = 864e5, nr = 6e4, Xn = 36e5, Xr = Symbol.for("constructDateFrom");
function Oe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Xr in e ? e[Xr](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function be(e, t) {
  return Oe(t || e, e);
}
function $t(e, t, r) {
  const n = be(e, r == null ? void 0 : r.in);
  return isNaN(t) ? Oe(e, NaN) : (t && n.setDate(n.getDate() + t), n);
}
function Kr(e, t, r) {
  const n = be(e, r == null ? void 0 : r.in);
  if (isNaN(t)) return Oe(e, NaN);
  if (!t)
    return n;
  const a = n.getDate(), i = Oe(e, n.getTime());
  i.setMonth(n.getMonth() + t + 1, 0);
  const o = i.getDate();
  return a >= o ? i : (n.setFullYear(
    i.getFullYear(),
    i.getMonth(),
    a
  ), n);
}
let ai = {};
function Mt() {
  return ai;
}
function ot(e, t) {
  var s, l, u, d;
  const r = Mt(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : l.weekStartsOn) ?? r.weekStartsOn ?? ((d = (u = r.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, a = be(e, t == null ? void 0 : t.in), i = a.getDay(), o = (i < n ? 7 : 0) + i - n;
  return a.setDate(a.getDate() - o), a.setHours(0, 0, 0, 0), a;
}
function Ut(e, t) {
  return ot(e, { ...t, weekStartsOn: 1 });
}
function Kn(e, t) {
  const r = be(e, t == null ? void 0 : t.in), n = r.getFullYear(), a = Oe(r, 0);
  a.setFullYear(n + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Ut(a), o = Oe(r, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Ut(o);
  return r.getTime() >= i.getTime() ? n + 1 : r.getTime() >= s.getTime() ? n : n - 1;
}
function Qr(e) {
  const t = be(e), r = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return r.setUTCFullYear(t.getFullYear()), +e - +r;
}
function ar(e, ...t) {
  const r = Oe.bind(
    null,
    t.find((n) => typeof n == "object")
  );
  return t.map(r);
}
function vt(e, t) {
  const r = be(e, t == null ? void 0 : t.in);
  return r.setHours(0, 0, 0, 0), r;
}
function ii(e, t, r) {
  const [n, a] = ar(
    r == null ? void 0 : r.in,
    e,
    t
  ), i = vt(n), o = vt(a), s = +i - Qr(i), l = +o - Qr(o);
  return Math.round((s - l) / ni);
}
function oi(e, t) {
  const r = Kn(e, t), n = Oe(e, 0);
  return n.setFullYear(r, 0, 4), n.setHours(0, 0, 0, 0), Ut(n);
}
function Zr(e, t, r) {
  const n = be(e, r == null ? void 0 : r.in);
  return n.setTime(n.getTime() + t * nr), n;
}
function si(e) {
  return Oe(e, Date.now());
}
function ht(e, t, r) {
  const [n, a] = ar(
    r == null ? void 0 : r.in,
    e,
    t
  );
  return +vt(n) == +vt(a);
}
function li(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function ci(e) {
  return !(!li(e) && typeof e != "number" || isNaN(+be(e)));
}
function di(e) {
  return (t) => {
    const n = (e ? Math[e] : Math.trunc)(t);
    return n === 0 ? 0 : n;
  };
}
function ui(e, t) {
  return +be(e) - +be(t);
}
function dr(e, t, r) {
  const n = ui(e, t) / nr;
  return di(r == null ? void 0 : r.roundingMethod)(n);
}
function pi(e, t) {
  const r = be(e, t == null ? void 0 : t.in), n = r.getMonth();
  return r.setFullYear(r.getFullYear(), n + 1, 0), r.setHours(23, 59, 59, 999), r;
}
function fi(e, t) {
  const [r, n] = ar(e, t.start, t.end);
  return { start: r, end: n };
}
function Jr(e, t) {
  const { start: r, end: n } = fi(t == null ? void 0 : t.in, e);
  let a = +r > +n;
  const i = a ? +r : +n, o = a ? n : r;
  o.setHours(0, 0, 0, 0);
  let s = 1;
  const l = [];
  for (; +o <= i; )
    l.push(Oe(r, o)), o.setDate(o.getDate() + s), o.setHours(0, 0, 0, 0);
  return a ? l.reverse() : l;
}
function mi(e, t) {
  const r = be(e, t == null ? void 0 : t.in);
  return r.setDate(1), r.setHours(0, 0, 0, 0), r;
}
function hi(e, t) {
  const r = be(e, t == null ? void 0 : t.in);
  return r.setFullYear(r.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r;
}
function en(e, t) {
  var s, l, u, d;
  const r = Mt(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : l.weekStartsOn) ?? r.weekStartsOn ?? ((d = (u = r.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, a = be(e, t == null ? void 0 : t.in), i = a.getDay(), o = (i < n ? -7 : 0) + 6 - (i - n);
  return a.setDate(a.getDate() + o), a.setHours(23, 59, 59, 999), a;
}
const gi = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, bi = (e, t, r) => {
  let n;
  const a = gi[e];
  return typeof a == "string" ? n = a : t === 1 ? n = a.one : n = a.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
};
function bt(e) {
  return (t = {}) => {
    const r = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[r] || e.formats[e.defaultWidth];
  };
}
const vi = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, xi = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, yi = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, wi = {
  date: bt({
    formats: vi,
    defaultWidth: "full"
  }),
  time: bt({
    formats: xi,
    defaultWidth: "full"
  }),
  dateTime: bt({
    formats: yi,
    defaultWidth: "full"
  })
}, ki = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Ci = (e, t, r, n) => ki[e];
function Ie(e) {
  return (t, r) => {
    const n = r != null && r.context ? String(r.context) : "standalone";
    let a;
    if (n === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, s = r != null && r.width ? String(r.width) : o;
      a = e.formattingValues[s] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, s = r != null && r.width ? String(r.width) : e.defaultWidth;
      a = e.values[s] || e.values[o];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[i];
  };
}
const Ni = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Ti = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Ei = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Si = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Oi = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, ji = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Di = (e, t) => {
  const r = Number(e), n = r % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return r + "st";
      case 2:
        return r + "nd";
      case 3:
        return r + "rd";
    }
  return r + "th";
}, Mi = {
  ordinalNumber: Di,
  era: Ie({
    values: Ni,
    defaultWidth: "wide"
  }),
  quarter: Ie({
    values: Ti,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ie({
    values: Ei,
    defaultWidth: "wide"
  }),
  day: Ie({
    values: Si,
    defaultWidth: "wide"
  }),
  dayPeriod: Ie({
    values: Oi,
    defaultWidth: "wide",
    formattingValues: ji,
    defaultFormattingWidth: "wide"
  })
};
function Fe(e) {
  return (t, r = {}) => {
    const n = r.width, a = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], i = t.match(a);
    if (!i)
      return null;
    const o = i[0], s = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(s) ? Pi(s, (p) => p.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      _i(s, (p) => p.test(o))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(l) : l, u = r.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      r.valueCallback(u)
    ) : u;
    const d = t.slice(o.length);
    return { value: u, rest: d };
  };
}
function _i(e, t) {
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r) && t(e[r]))
      return r;
}
function Pi(e, t) {
  for (let r = 0; r < e.length; r++)
    if (t(e[r]))
      return r;
}
function Qn(e) {
  return (t, r = {}) => {
    const n = t.match(e.matchPattern);
    if (!n) return null;
    const a = n[0], i = t.match(e.parsePattern);
    if (!i) return null;
    let o = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    o = r.valueCallback ? r.valueCallback(o) : o;
    const s = t.slice(a.length);
    return { value: o, rest: s };
  };
}
const $i = /^(\d+)(th|st|nd|rd)?/i, zi = /\d+/i, Ai = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ri = {
  any: [/^b/i, /^(a|c)/i]
}, Ii = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Fi = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Li = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Wi = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, qi = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Vi = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Hi = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Yi = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Bi = {
  ordinalNumber: Qn({
    matchPattern: $i,
    parsePattern: zi,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Fe({
    matchPatterns: Ai,
    defaultMatchWidth: "wide",
    parsePatterns: Ri,
    defaultParseWidth: "any"
  }),
  quarter: Fe({
    matchPatterns: Ii,
    defaultMatchWidth: "wide",
    parsePatterns: Fi,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Fe({
    matchPatterns: Li,
    defaultMatchWidth: "wide",
    parsePatterns: Wi,
    defaultParseWidth: "any"
  }),
  day: Fe({
    matchPatterns: qi,
    defaultMatchWidth: "wide",
    parsePatterns: Vi,
    defaultParseWidth: "any"
  }),
  dayPeriod: Fe({
    matchPatterns: Hi,
    defaultMatchWidth: "any",
    parsePatterns: Yi,
    defaultParseWidth: "any"
  })
}, Ui = {
  code: "en-US",
  formatDistance: bi,
  formatLong: wi,
  formatRelative: Ci,
  localize: Mi,
  match: Bi,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Gi(e, t) {
  const r = be(e, t == null ? void 0 : t.in);
  return ii(r, hi(r)) + 1;
}
function Xi(e, t) {
  const r = be(e, t == null ? void 0 : t.in), n = +Ut(r) - +oi(r);
  return Math.round(n / Gn) + 1;
}
function Zn(e, t) {
  var d, p, b, v;
  const r = be(e, t == null ? void 0 : t.in), n = r.getFullYear(), a = Mt(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((p = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((v = (b = a.locale) == null ? void 0 : b.options) == null ? void 0 : v.firstWeekContainsDate) ?? 1, o = Oe((t == null ? void 0 : t.in) || e, 0);
  o.setFullYear(n + 1, 0, i), o.setHours(0, 0, 0, 0);
  const s = ot(o, t), l = Oe((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(n, 0, i), l.setHours(0, 0, 0, 0);
  const u = ot(l, t);
  return +r >= +s ? n + 1 : +r >= +u ? n : n - 1;
}
function Ki(e, t) {
  var s, l, u, d;
  const r = Mt(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : l.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((d = (u = r.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, a = Zn(e, t), i = Oe((t == null ? void 0 : t.in) || e, 0);
  return i.setFullYear(a, 0, n), i.setHours(0, 0, 0, 0), ot(i, t);
}
function Qi(e, t) {
  const r = be(e, t == null ? void 0 : t.in), n = +ot(r, t) - +Ki(r, t);
  return Math.round(n / Gn) + 1;
}
function pe(e, t) {
  const r = e < 0 ? "-" : "", n = Math.abs(e).toString().padStart(t, "0");
  return r + n;
}
const Ke = {
  // Year
  y(e, t) {
    const r = e.getFullYear(), n = r > 0 ? r : 1 - r;
    return pe(t === "yy" ? n % 100 : n, t.length);
  },
  // Month
  M(e, t) {
    const r = e.getMonth();
    return t === "M" ? String(r + 1) : pe(r + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return pe(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return r.toUpperCase();
      case "aaa":
        return r;
      case "aaaaa":
        return r[0];
      case "aaaa":
      default:
        return r === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return pe(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return pe(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return pe(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return pe(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const r = t.length, n = e.getMilliseconds(), a = Math.trunc(
      n * Math.pow(10, r - 3)
    );
    return pe(a, t.length);
  }
}, ut = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, tn = {
  // Era
  G: function(e, t, r) {
    const n = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return r.era(n, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return r.era(n, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return r.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, r) {
    if (t === "yo") {
      const n = e.getFullYear(), a = n > 0 ? n : 1 - n;
      return r.ordinalNumber(a, { unit: "year" });
    }
    return Ke.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, r, n) {
    const a = Zn(e, n), i = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const o = i % 100;
      return pe(o, 2);
    }
    return t === "Yo" ? r.ordinalNumber(i, { unit: "year" }) : pe(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const r = Kn(e);
    return pe(r, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const r = e.getFullYear();
    return pe(r, t.length);
  },
  // Quarter
  Q: function(e, t, r) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(n);
      // 01, 02, 03, 04
      case "QQ":
        return pe(n, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return r.ordinalNumber(n, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return r.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return r.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return r.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, r) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(n);
      // 01, 02, 03, 04
      case "qq":
        return pe(n, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return r.ordinalNumber(n, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return r.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return r.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return r.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, r) {
    const n = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Ke.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return r.ordinalNumber(n + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return r.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return r.month(n, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return r.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, r) {
    const n = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(n + 1);
      // 01, 02, ..., 12
      case "LL":
        return pe(n + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return r.ordinalNumber(n + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return r.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return r.month(n, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return r.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, r, n) {
    const a = Qi(e, n);
    return t === "wo" ? r.ordinalNumber(a, { unit: "week" }) : pe(a, t.length);
  },
  // ISO week of year
  I: function(e, t, r) {
    const n = Xi(e);
    return t === "Io" ? r.ordinalNumber(n, { unit: "week" }) : pe(n, t.length);
  },
  // Day of the month
  d: function(e, t, r) {
    return t === "do" ? r.ordinalNumber(e.getDate(), { unit: "date" }) : Ke.d(e, t);
  },
  // Day of year
  D: function(e, t, r) {
    const n = Gi(e);
    return t === "Do" ? r.ordinalNumber(n, { unit: "dayOfYear" }) : pe(n, t.length);
  },
  // Day of week
  E: function(e, t, r) {
    const n = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return r.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return r.day(n, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return r.day(n, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return r.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, r, n) {
    const a = e.getDay(), i = (a - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(i);
      // Padded numerical value
      case "ee":
        return pe(i, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return r.ordinalNumber(i, { unit: "day" });
      case "eee":
        return r.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return r.day(a, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return r.day(a, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return r.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, r, n) {
    const a = e.getDay(), i = (a - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(i);
      // Padded numerical value
      case "cc":
        return pe(i, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return r.ordinalNumber(i, { unit: "day" });
      case "ccc":
        return r.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return r.day(a, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return r.day(a, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return r.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, r) {
    const n = e.getDay(), a = n === 0 ? 7 : n;
    switch (t) {
      // 2
      case "i":
        return String(a);
      // 02
      case "ii":
        return pe(a, t.length);
      // 2nd
      case "io":
        return r.ordinalNumber(a, { unit: "day" });
      // Tue
      case "iii":
        return r.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return r.day(n, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return r.day(n, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return r.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, r) {
    const a = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return r.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, r) {
    const n = e.getHours();
    let a;
    switch (n === 12 ? a = ut.noon : n === 0 ? a = ut.midnight : a = n / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return r.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, r) {
    const n = e.getHours();
    let a;
    switch (n >= 17 ? a = ut.evening : n >= 12 ? a = ut.afternoon : n >= 4 ? a = ut.morning : a = ut.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, r) {
    if (t === "ho") {
      let n = e.getHours() % 12;
      return n === 0 && (n = 12), r.ordinalNumber(n, { unit: "hour" });
    }
    return Ke.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, r) {
    return t === "Ho" ? r.ordinalNumber(e.getHours(), { unit: "hour" }) : Ke.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, r) {
    const n = e.getHours() % 12;
    return t === "Ko" ? r.ordinalNumber(n, { unit: "hour" }) : pe(n, t.length);
  },
  // Hour [1-24]
  k: function(e, t, r) {
    let n = e.getHours();
    return n === 0 && (n = 24), t === "ko" ? r.ordinalNumber(n, { unit: "hour" }) : pe(n, t.length);
  },
  // Minute
  m: function(e, t, r) {
    return t === "mo" ? r.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ke.m(e, t);
  },
  // Second
  s: function(e, t, r) {
    return t === "so" ? r.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ke.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Ke.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, r) {
    const n = e.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return nn(n);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return nt(n);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return nt(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return nn(n);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return nt(n);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return nt(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + rn(n, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + nt(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + rn(n, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + nt(n, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, r) {
    const n = Math.trunc(+e / 1e3);
    return pe(n, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, r) {
    return pe(+e, t.length);
  }
};
function rn(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), a = Math.trunc(n / 60), i = n % 60;
  return i === 0 ? r + String(a) : r + String(a) + t + pe(i, 2);
}
function nn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + pe(Math.abs(e) / 60, 2) : nt(e, t);
}
function nt(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), a = pe(Math.trunc(n / 60), 2), i = pe(n % 60, 2);
  return r + a + t + i;
}
const an = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, Jn = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Zi = (e, t) => {
  const r = e.match(/(P+)(p+)?/) || [], n = r[1], a = r[2];
  if (!a)
    return an(e, t);
  let i;
  switch (n) {
    case "P":
      i = t.dateTime({ width: "short" });
      break;
    case "PP":
      i = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = t.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", an(n, t)).replace("{{time}}", Jn(a, t));
}, Ji = {
  p: Jn,
  P: Zi
}, eo = /^D+$/, to = /^Y+$/, ro = ["D", "DD", "YY", "YYYY"];
function no(e) {
  return eo.test(e);
}
function ao(e) {
  return to.test(e);
}
function io(e, t, r) {
  const n = oo(e, t, r);
  if (console.warn(n), ro.includes(e)) throw new RangeError(n);
}
function oo(e, t, r) {
  const n = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${n} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const so = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, lo = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, co = /^'([^]*?)'?$/, uo = /''/g, po = /[a-zA-Z]/;
function tt(e, t, r) {
  var d, p, b, v, E, y, M, w;
  const n = Mt(), a = (r == null ? void 0 : r.locale) ?? n.locale ?? Ui, i = (r == null ? void 0 : r.firstWeekContainsDate) ?? ((p = (d = r == null ? void 0 : r.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((v = (b = n.locale) == null ? void 0 : b.options) == null ? void 0 : v.firstWeekContainsDate) ?? 1, o = (r == null ? void 0 : r.weekStartsOn) ?? ((y = (E = r == null ? void 0 : r.locale) == null ? void 0 : E.options) == null ? void 0 : y.weekStartsOn) ?? n.weekStartsOn ?? ((w = (M = n.locale) == null ? void 0 : M.options) == null ? void 0 : w.weekStartsOn) ?? 0, s = be(e, r == null ? void 0 : r.in);
  if (!ci(s))
    throw new RangeError("Invalid time value");
  let l = t.match(lo).map((k) => {
    const C = k[0];
    if (C === "p" || C === "P") {
      const _ = Ji[C];
      return _(k, a.formatLong);
    }
    return k;
  }).join("").match(so).map((k) => {
    if (k === "''")
      return { isToken: !1, value: "'" };
    const C = k[0];
    if (C === "'")
      return { isToken: !1, value: fo(k) };
    if (tn[C])
      return { isToken: !0, value: k };
    if (C.match(po))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + C + "`"
      );
    return { isToken: !1, value: k };
  });
  a.localize.preprocessor && (l = a.localize.preprocessor(s, l));
  const u = {
    firstWeekContainsDate: i,
    weekStartsOn: o,
    locale: a
  };
  return l.map((k) => {
    if (!k.isToken) return k.value;
    const C = k.value;
    (!(r != null && r.useAdditionalWeekYearTokens) && ao(C) || !(r != null && r.useAdditionalDayOfYearTokens) && no(C)) && io(C, t, String(e));
    const _ = tn[C[0]];
    return _(s, C, a.localize, u);
  }).join("");
}
function fo(e) {
  const t = e.match(co);
  return t ? t[1].replace(uo, "'") : e;
}
function mo(e, t) {
  return +be(e) > +be(t);
}
function ur(e, t) {
  return +be(e) < +be(t);
}
function ho(e, t, r) {
  const [n, a] = ar(
    r == null ? void 0 : r.in,
    e,
    t
  );
  return n.getFullYear() === a.getFullYear() && n.getMonth() === a.getMonth();
}
function Nt(e, t) {
  return ht(
    Oe(e, e),
    si(e)
  );
}
function pt(e, t) {
  const r = () => Oe(t == null ? void 0 : t.in, NaN), a = xo(e);
  let i;
  if (a.date) {
    const u = yo(a.date, 2);
    i = wo(u.restDateString, u.year);
  }
  if (!i || isNaN(+i)) return r();
  const o = +i;
  let s = 0, l;
  if (a.time && (s = ko(a.time), isNaN(s)))
    return r();
  if (a.timezone) {
    if (l = Co(a.timezone), isNaN(l)) return r();
  } else {
    const u = new Date(o + s), d = be(0, t == null ? void 0 : t.in);
    return d.setFullYear(
      u.getUTCFullYear(),
      u.getUTCMonth(),
      u.getUTCDate()
    ), d.setHours(
      u.getUTCHours(),
      u.getUTCMinutes(),
      u.getUTCSeconds(),
      u.getUTCMilliseconds()
    ), d;
  }
  return be(o + s + l, t == null ? void 0 : t.in);
}
const zt = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, go = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, bo = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, vo = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function xo(e) {
  const t = {}, r = e.split(zt.dateTimeDelimiter);
  let n;
  if (r.length > 2)
    return t;
  if (/:/.test(r[0]) ? n = r[0] : (t.date = r[0], n = r[1], zt.timeZoneDelimiter.test(t.date) && (t.date = e.split(zt.timeZoneDelimiter)[0], n = e.substr(
    t.date.length,
    e.length
  ))), n) {
    const a = zt.timezone.exec(n);
    a ? (t.time = n.replace(a[1], ""), t.timezone = a[1]) : t.time = n;
  }
  return t;
}
function yo(e, t) {
  const r = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), n = e.match(r);
  if (!n) return { year: NaN, restDateString: "" };
  const a = n[1] ? parseInt(n[1]) : null, i = n[2] ? parseInt(n[2]) : null;
  return {
    year: i === null ? a : i * 100,
    restDateString: e.slice((n[1] || n[2]).length)
  };
}
function wo(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const r = e.match(go);
  if (!r) return /* @__PURE__ */ new Date(NaN);
  const n = !!r[4], a = Tt(r[1]), i = Tt(r[2]) - 1, o = Tt(r[3]), s = Tt(r[4]), l = Tt(r[5]) - 1;
  if (n)
    return Oo(t, s, l) ? No(t, s, l) : /* @__PURE__ */ new Date(NaN);
  {
    const u = /* @__PURE__ */ new Date(0);
    return !Eo(t, i, o) || !So(t, a) ? /* @__PURE__ */ new Date(NaN) : (u.setUTCFullYear(t, i, Math.max(a, o)), u);
  }
}
function Tt(e) {
  return e ? parseInt(e) : 1;
}
function ko(e) {
  const t = e.match(bo);
  if (!t) return NaN;
  const r = pr(t[1]), n = pr(t[2]), a = pr(t[3]);
  return jo(r, n, a) ? r * Xn + n * nr + a * 1e3 : NaN;
}
function pr(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function Co(e) {
  if (e === "Z") return 0;
  const t = e.match(vo);
  if (!t) return 0;
  const r = t[1] === "+" ? -1 : 1, n = parseInt(t[2]), a = t[3] && parseInt(t[3]) || 0;
  return Do(n, a) ? r * (n * Xn + a * nr) : NaN;
}
function No(e, t, r) {
  const n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(e, 0, 4);
  const a = n.getUTCDay() || 7, i = (t - 1) * 7 + r + 1 - a;
  return n.setUTCDate(n.getUTCDate() + i), n;
}
const To = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ea(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Eo(e, t, r) {
  return t >= 0 && t <= 11 && r >= 1 && r <= (To[t] || (ea(e) ? 29 : 28));
}
function So(e, t) {
  return t >= 1 && t <= (ea(e) ? 366 : 365);
}
function Oo(e, t, r) {
  return t >= 1 && t <= 53 && r >= 0 && r <= 6;
}
function jo(e, t, r) {
  return e === 24 ? t === 0 && r === 0 : r >= 0 && r < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function Do(e, t) {
  return t >= 0 && t <= 59;
}
const Mo = {
  lessThanXSeconds: {
    one: "menos de un segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "medio minuto",
  lessThanXMinutes: {
    one: "menos de un minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "alrededor de 1 hora",
    other: "alrededor de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 día",
    other: "{{count}} días"
  },
  aboutXWeeks: {
    one: "alrededor de 1 semana",
    other: "alrededor de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "alrededor de 1 mes",
    other: "alrededor de {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "alrededor de 1 año",
    other: "alrededor de {{count}} años"
  },
  xYears: {
    one: "1 año",
    other: "{{count}} años"
  },
  overXYears: {
    one: "más de 1 año",
    other: "más de {{count}} años"
  },
  almostXYears: {
    one: "casi 1 año",
    other: "casi {{count}} años"
  }
}, _o = (e, t, r) => {
  let n;
  const a = Mo[e];
  return typeof a == "string" ? n = a : t === 1 ? n = a.one : n = a.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "en " + n : "hace " + n : n;
}, Po = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, $o = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, zo = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Ao = {
  date: bt({
    formats: Po,
    defaultWidth: "full"
  }),
  time: bt({
    formats: $o,
    defaultWidth: "full"
  }),
  dateTime: bt({
    formats: zo,
    defaultWidth: "full"
  })
}, Ro = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Io = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, Fo = (e, t, r, n) => t.getHours() !== 1 ? Io[e] : Ro[e], Lo = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, Wo = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, qo = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
  ],
  wide: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ]
}, Vo = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  abbreviated: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  wide: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
  ]
}, Ho = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  }
}, Yo = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  }
}, Bo = (e, t) => Number(e) + "º", Uo = {
  ordinalNumber: Bo,
  era: Ie({
    values: Lo,
    defaultWidth: "wide"
  }),
  quarter: Ie({
    values: Wo,
    defaultWidth: "wide",
    argumentCallback: (e) => Number(e) - 1
  }),
  month: Ie({
    values: qo,
    defaultWidth: "wide"
  }),
  day: Ie({
    values: Vo,
    defaultWidth: "wide"
  }),
  dayPeriod: Ie({
    values: Ho,
    defaultWidth: "wide",
    formattingValues: Yo,
    defaultFormattingWidth: "wide"
  })
}, Go = /^(\d+)(º)?/i, Xo = /\d+/i, Ko = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, Qo = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, Zo = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Jo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, es = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, ts = {
  narrow: [
    /^e/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^en/i,
    /^feb/i,
    /^mar/i,
    /^abr/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^ago/i,
    /^sep/i,
    /^oct/i,
    /^nov/i,
    /^dic/i
  ]
}, rs = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, ns = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, as = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, is = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañana/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noche/i
  }
}, os = {
  ordinalNumber: Qn({
    matchPattern: Go,
    parsePattern: Xo,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: Fe({
    matchPatterns: Ko,
    defaultMatchWidth: "wide",
    parsePatterns: Qo,
    defaultParseWidth: "any"
  }),
  quarter: Fe({
    matchPatterns: Zo,
    defaultMatchWidth: "wide",
    parsePatterns: Jo,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Fe({
    matchPatterns: es,
    defaultMatchWidth: "wide",
    parsePatterns: ts,
    defaultParseWidth: "any"
  }),
  day: Fe({
    matchPatterns: rs,
    defaultMatchWidth: "wide",
    parsePatterns: ns,
    defaultParseWidth: "any"
  }),
  dayPeriod: Fe({
    matchPatterns: as,
    defaultMatchWidth: "any",
    parsePatterns: is,
    defaultParseWidth: "any"
  })
}, on = {
  code: "es",
  formatDistance: _o,
  formatLong: Ao,
  formatRelative: Fo,
  localize: Uo,
  match: os,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, ss = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, ls = (e, t) => ({
  classGroupId: e,
  validator: t
}), ta = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), Gt = "-", sn = [], cs = "arbitrary..", ds = (e) => {
  const t = ps(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (o) => {
      if (o.startsWith("[") && o.endsWith("]"))
        return us(o);
      const s = o.split(Gt), l = s[0] === "" && s.length > 1 ? 1 : 0;
      return ra(s, l, t);
    },
    getConflictingClassGroupIds: (o, s) => {
      if (s) {
        const l = n[o], u = r[o];
        return l ? u ? ss(u, l) : l : u || sn;
      }
      return r[o] || sn;
    }
  };
}, ra = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const a = e[t], i = r.nextPart.get(a);
  if (i) {
    const u = ra(e, t + 1, i);
    if (u) return u;
  }
  const o = r.validators;
  if (o === null)
    return;
  const s = t === 0 ? e.join(Gt) : e.slice(t).join(Gt), l = o.length;
  for (let u = 0; u < l; u++) {
    const d = o[u];
    if (d.validator(s))
      return d.classGroupId;
  }
}, us = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? cs + n : void 0;
})(), ps = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return fs(r, t);
}, fs = (e, t) => {
  const r = ta();
  for (const n in e) {
    const a = e[n];
    Ir(a, r, n, t);
  }
  return r;
}, Ir = (e, t, r, n) => {
  const a = e.length;
  for (let i = 0; i < a; i++) {
    const o = e[i];
    ms(o, t, r, n);
  }
}, ms = (e, t, r, n) => {
  if (typeof e == "string") {
    hs(e, t, r);
    return;
  }
  if (typeof e == "function") {
    gs(e, t, r, n);
    return;
  }
  bs(e, t, r, n);
}, hs = (e, t, r) => {
  const n = e === "" ? t : na(t, e);
  n.classGroupId = r;
}, gs = (e, t, r, n) => {
  if (vs(e)) {
    Ir(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(ls(r, e));
}, bs = (e, t, r, n) => {
  const a = Object.entries(e), i = a.length;
  for (let o = 0; o < i; o++) {
    const [s, l] = a[o];
    Ir(l, na(t, s), r, n);
  }
}, na = (e, t) => {
  let r = e;
  const n = t.split(Gt), a = n.length;
  for (let i = 0; i < a; i++) {
    const o = n[i];
    let s = r.nextPart.get(o);
    s || (s = ta(), r.nextPart.set(o, s)), r = s;
  }
  return r;
}, vs = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, xs = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
  const a = (i, o) => {
    r[i] = o, t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(i) {
      let o = r[i];
      if (o !== void 0)
        return o;
      if ((o = n[i]) !== void 0)
        return a(i, o), o;
    },
    set(i, o) {
      i in r ? r[i] = o : a(i, o);
    }
  };
}, Or = "!", ln = ":", ys = [], cn = (e, t, r, n, a) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: a
}), ws = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (a) => {
    const i = [];
    let o = 0, s = 0, l = 0, u;
    const d = a.length;
    for (let y = 0; y < d; y++) {
      const M = a[y];
      if (o === 0 && s === 0) {
        if (M === ln) {
          i.push(a.slice(l, y)), l = y + 1;
          continue;
        }
        if (M === "/") {
          u = y;
          continue;
        }
      }
      M === "[" ? o++ : M === "]" ? o-- : M === "(" ? s++ : M === ")" && s--;
    }
    const p = i.length === 0 ? a : a.slice(l);
    let b = p, v = !1;
    p.endsWith(Or) ? (b = p.slice(0, -1), v = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      p.startsWith(Or) && (b = p.slice(1), v = !0)
    );
    const E = u && u > l ? u - l : void 0;
    return cn(i, v, b, E);
  };
  if (t) {
    const a = t + ln, i = n;
    n = (o) => o.startsWith(a) ? i(o.slice(a.length)) : cn(ys, !1, o, void 0, !0);
  }
  if (r) {
    const a = n;
    n = (i) => r({
      className: i,
      parseClassName: a
    });
  }
  return n;
}, ks = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, n) => {
    t.set(r, 1e6 + n);
  }), (r) => {
    const n = [];
    let a = [];
    for (let i = 0; i < r.length; i++) {
      const o = r[i], s = o[0] === "[", l = t.has(o);
      s || l ? (a.length > 0 && (a.sort(), n.push(...a), a = []), n.push(o)) : a.push(o);
    }
    return a.length > 0 && (a.sort(), n.push(...a)), n;
  };
}, Cs = (e) => ({
  cache: xs(e.cacheSize),
  parseClassName: ws(e),
  sortModifiers: ks(e),
  ...ds(e)
}), Ns = /\s+/, Ts = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: a,
    sortModifiers: i
  } = t, o = [], s = e.trim().split(Ns);
  let l = "";
  for (let u = s.length - 1; u >= 0; u -= 1) {
    const d = s[u], {
      isExternal: p,
      modifiers: b,
      hasImportantModifier: v,
      baseClassName: E,
      maybePostfixModifierPosition: y
    } = r(d);
    if (p) {
      l = d + (l.length > 0 ? " " + l : l);
      continue;
    }
    let M = !!y, w = n(M ? E.substring(0, y) : E);
    if (!w) {
      if (!M) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (w = n(E), !w) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      M = !1;
    }
    const k = b.length === 0 ? "" : b.length === 1 ? b[0] : i(b).join(":"), C = v ? k + Or : k, _ = C + w;
    if (o.indexOf(_) > -1)
      continue;
    o.push(_);
    const x = a(w, M);
    for (let h = 0; h < x.length; ++h) {
      const P = x[h];
      o.push(C + P);
    }
    l = d + (l.length > 0 ? " " + l : l);
  }
  return l;
}, Es = (...e) => {
  let t = 0, r, n, a = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = aa(r)) && (a && (a += " "), a += n);
  return a;
}, aa = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = aa(e[n])) && (r && (r += " "), r += t);
  return r;
}, Ss = (e, ...t) => {
  let r, n, a, i;
  const o = (l) => {
    const u = t.reduce((d, p) => p(d), e());
    return r = Cs(u), n = r.cache.get, a = r.cache.set, i = s, s(l);
  }, s = (l) => {
    const u = n(l);
    if (u)
      return u;
    const d = Ts(l, r);
    return a(l, d), d;
  };
  return i = o, (...l) => i(Es(...l));
}, Os = [], Ce = (e) => {
  const t = (r) => r[e] || Os;
  return t.isThemeGetter = !0, t;
}, ia = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, oa = /^\((?:(\w[\w-]*):)?(.+)\)$/i, js = /^\d+\/\d+$/, Ds = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ms = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, _s = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ps = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, $s = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ft = (e) => js.test(e), se = (e) => !!e && !Number.isNaN(Number(e)), Qe = (e) => !!e && Number.isInteger(Number(e)), fr = (e) => e.endsWith("%") && se(e.slice(0, -1)), Be = (e) => Ds.test(e), zs = () => !0, As = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ms.test(e) && !_s.test(e)
), sa = () => !1, Rs = (e) => Ps.test(e), Is = (e) => $s.test(e), Fs = (e) => !U(e) && !G(e), Ls = (e) => wt(e, da, sa), U = (e) => ia.test(e), rt = (e) => wt(e, ua, As), mr = (e) => wt(e, Ys, se), dn = (e) => wt(e, la, sa), Ws = (e) => wt(e, ca, Is), At = (e) => wt(e, pa, Rs), G = (e) => oa.test(e), Et = (e) => kt(e, ua), qs = (e) => kt(e, Bs), un = (e) => kt(e, la), Vs = (e) => kt(e, da), Hs = (e) => kt(e, ca), Rt = (e) => kt(e, pa, !0), wt = (e, t, r) => {
  const n = ia.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, kt = (e, t, r = !1) => {
  const n = oa.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, la = (e) => e === "position" || e === "percentage", ca = (e) => e === "image" || e === "url", da = (e) => e === "length" || e === "size" || e === "bg-size", ua = (e) => e === "length", Ys = (e) => e === "number", Bs = (e) => e === "family-name", pa = (e) => e === "shadow", Us = () => {
  const e = Ce("color"), t = Ce("font"), r = Ce("text"), n = Ce("font-weight"), a = Ce("tracking"), i = Ce("leading"), o = Ce("breakpoint"), s = Ce("container"), l = Ce("spacing"), u = Ce("radius"), d = Ce("shadow"), p = Ce("inset-shadow"), b = Ce("text-shadow"), v = Ce("drop-shadow"), E = Ce("blur"), y = Ce("perspective"), M = Ce("aspect"), w = Ce("ease"), k = Ce("animate"), C = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], _ = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], x = () => [..._(), G, U], h = () => ["auto", "hidden", "clip", "visible", "scroll"], P = () => ["auto", "contain", "none"], g = () => [G, U, l], q = () => [ft, "full", "auto", ...g()], J = () => [Qe, "none", "subgrid", G, U], T = () => ["auto", {
    span: ["full", Qe, G, U]
  }, Qe, G, U], A = () => [Qe, "auto", G, U], V = () => ["auto", "min", "max", "fr", G, U], $ = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], X = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...g()], K = () => [ft, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...g()], m = () => [e, G, U], N = () => [..._(), un, dn, {
    position: [G, U]
  }], f = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], S = () => ["auto", "cover", "contain", Vs, Ls, {
    size: [G, U]
  }], L = () => [fr, Et, rt], O = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    G,
    U
  ], j = () => ["", se, Et, rt], R = () => ["solid", "dashed", "dotted", "double"], B = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => [se, fr, un, dn], re = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    E,
    G,
    U
  ], ne = () => ["none", se, G, U], ee = () => ["none", se, G, U], fe = () => [se, G, U], I = () => [ft, "full", ...g()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Be],
      breakpoint: [Be],
      color: [zs],
      container: [Be],
      "drop-shadow": [Be],
      ease: ["in", "out", "in-out"],
      font: [Fs],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Be],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Be],
      shadow: [Be],
      spacing: ["px", se],
      text: [Be],
      "text-shadow": [Be],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ft, U, G, M]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [se, U, G, s]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": C()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": C()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: x()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: h()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": h()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": h()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: P()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": P()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": P()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: q()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": q()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": q()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: q()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: q()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: q()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: q()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: q()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: q()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Qe, "auto", G, U]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ft, "full", "auto", s, ...g()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [se, ft, "auto", "initial", "none", U]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", se, G, U]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", se, G, U]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Qe, "first", "last", "none", G, U]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": J()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: T()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": A()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": A()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": J()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: T()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": A()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": A()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": V()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": V()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: g()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": g()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": g()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...$(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...X(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...X()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...$()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...X(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...X(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": $()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...X(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...X()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: g()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: g()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: g()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: g()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: g()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: g()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: g()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: g()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: g()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: W()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: W()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: W()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: W()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: W()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: W()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: W()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: W()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: W()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": g()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": g()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: K()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...K()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          s,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...K()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          s,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [o]
          },
          ...K()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...K()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...K()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...K()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Et, rt]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [n, G, mr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", fr, U]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [qs, U, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [a, G, U]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [se, "none", G, mr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...g()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", G, U]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", G, U]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: m()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: m()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...R(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [se, "from-font", "auto", G, rt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: m()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [se, "auto", G, U]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: g()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", G, U]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", G, U]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: N()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: f()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: S()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Qe, G, U],
          radial: ["", G, U],
          conic: [Qe, G, U]
        }, Hs, Ws]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: m()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: L()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: L()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: L()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: m()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: m()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: m()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: O()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": O()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": O()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": O()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": O()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": O()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": O()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": O()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": O()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": O()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": O()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": O()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": O()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": O()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": O()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: j()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": j()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": j()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": j()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": j()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": j()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": j()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": j()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": j()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": j()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": j()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...R(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...R(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: m()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": m()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": m()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": m()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": m()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": m()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": m()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": m()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": m()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: m()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...R(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [se, G, U]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", se, Et, rt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: m()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          d,
          Rt,
          At
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: m()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", p, Rt, At]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": m()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: j()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: m()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [se, rt]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": m()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": j()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": m()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", b, Rt, At]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": m()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [se, G, U]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...B(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": B()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [se]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Y()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Y()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": m()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": m()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Y()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Y()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": m()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": m()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Y()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Y()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": m()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": m()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Y()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Y()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": m()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": m()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Y()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Y()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": m()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": m()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Y()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Y()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": m()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": m()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Y()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Y()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": m()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": m()
      }],
      "mask-image-radial": [{
        "mask-radial": [G, U]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Y()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Y()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": m()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": m()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": _()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [se]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Y()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Y()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": m()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": m()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: N()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: f()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: S()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", G, U]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          G,
          U
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: re()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [se, G, U]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [se, G, U]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          v,
          Rt,
          At
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": m()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", se, G, U]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [se, G, U]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", se, G, U]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [se, G, U]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", se, G, U]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          G,
          U
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": re()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [se, G, U]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [se, G, U]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", se, G, U]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [se, G, U]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", se, G, U]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [se, G, U]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [se, G, U]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", se, G, U]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": g()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": g()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": g()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", G, U]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [se, "initial", G, U]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, G, U]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [se, G, U]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", k, G, U]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [y, G, U]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": x()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ne()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ne()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ne()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ne()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ee()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ee()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ee()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ee()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: fe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": fe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": fe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [G, U, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: x()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: I()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": I()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": I()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": I()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: m()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: m()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", G, U]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": g()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": g()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": g()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": g()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": g()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": g()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": g()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": g()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": g()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": g()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": g()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": g()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": g()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": g()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": g()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": g()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": g()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": g()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", G, U]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...m()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [se, Et, rt, mr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...m()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Gs = /* @__PURE__ */ Ss(Us);
var fa = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, pn = Se.createContext && /* @__PURE__ */ Se.createContext(fa), Xs = ["attr", "size", "title"];
function Ks(e, t) {
  if (e == null) return {};
  var r = Qs(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function Qs(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue;
      r[n] = e[n];
    }
  return r;
}
function Xt() {
  return Xt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xt.apply(this, arguments);
}
function fn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fn(Object(r), !0).forEach(function(n) {
      Zs(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fn(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Zs(e, t, r) {
  return t = Js(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Js(e) {
  var t = el(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function el(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ma(e) {
  return e && e.map((t, r) => /* @__PURE__ */ Se.createElement(t.tag, Kt({
    key: r
  }, t.attr), ma(t.child)));
}
function Ee(e) {
  return (t) => /* @__PURE__ */ Se.createElement(tl, Xt({
    attr: Kt({}, e.attr)
  }, t), ma(e.child));
}
function tl(e) {
  var t = (r) => {
    var {
      attr: n,
      size: a,
      title: i
    } = e, o = Ks(e, Xs), s = a || r.size || "1em", l;
    return r.className && (l = r.className), e.className && (l = (l ? l + " " : "") + e.className), /* @__PURE__ */ Se.createElement("svg", Xt({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, n, o, {
      className: l,
      style: Kt(Kt({
        color: e.color || r.color
      }, r.style), e.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), i && /* @__PURE__ */ Se.createElement("title", null, i), e.children);
  };
  return pn !== void 0 ? /* @__PURE__ */ Se.createElement(pn.Consumer, null, (r) => t(r)) : t(fa);
}
function rl(e) {
  return Ee({ attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" }, child: [] }] })(e);
}
function nl(e) {
  return Ee({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" }, child: [] }] })(e);
}
function al(e) {
  return Ee({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z" }, child: [] }] })(e);
}
function il(e) {
  return Ee({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" }, child: [] }] })(e);
}
function jr(e) {
  return Ee({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" }, child: [] }] })(e);
}
function ha(e) {
  return Ee({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" }, child: [] }] })(e);
}
function ir(e) {
  return Ee({ attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" }, child: [] }] })(e);
}
function xt(e) {
  return Ee({ attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" }, child: [] }] })(e);
}
function ol(e) {
  return Ee({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z" }, child: [] }] })(e);
}
function sl(e) {
  return Ee({ attr: { viewBox: "0 0 576 512" }, child: [{ tag: "path", attr: { d: "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" }, child: [] }] })(e);
}
function ll(e) {
  return Ee({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" }, child: [] }] })(e);
}
function cl(e) {
  return Ee({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" }, child: [] }] })(e);
}
function dl(e) {
  return Ee({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" }, child: [] }] })(e);
}
function Fr(e) {
  return Ee({ attr: { viewBox: "0 0 352 512" }, child: [{ tag: "path", attr: { d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" }, child: [] }] })(e);
}
function Dr(e) {
  return Ee({ attr: { viewBox: "0 0 496 512" }, child: [{ tag: "path", attr: { d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" }, child: [] }] })(e);
}
function ul(e) {
  return Ee({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" }, child: [] }] })(e);
}
function Ze(...e) {
  return Gs(te(e));
}
const Ot = 6, Mr = 22, pl = Mr - Ot, mn = Array.from({ length: pl + 1 }, (e, t) => Ot + t), fl = ({
  events: e = [],
  mode: t,
  onEventClick: r,
  onSlotClick: n,
  onSlotHover: a,
  onSelectRange: i,
  value: o,
  onChange: s,
  minDate: l,
  maxDate: u,
  className: d
}) => {
  const p = t || (s ? "month" : "week"), [b, v] = ae(o || /* @__PURE__ */ new Date()), [E, y] = ae("calendar");
  ye(() => {
    o && v(o);
  }, [o]);
  const M = () => {
    v(E === "years" ? (m) => {
      const N = new Date(m);
      return N.setFullYear(m.getFullYear() + 12), N;
    } : p === "month" ? (m) => Kr(m, 1) : p === "day" ? (m) => $t(m, 1) : (m) => $t(m, 7));
  }, w = () => {
    v(E === "years" ? (m) => {
      const N = new Date(m);
      return N.setFullYear(m.getFullYear() - 12), N;
    } : p === "month" ? (m) => Kr(m, -1) : p === "day" ? (m) => $t(m, -1) : (m) => $t(m, -7));
  }, k = () => {
    v(/* @__PURE__ */ new Date()), y("calendar");
  }, C = Me(() => {
    if (p === "day")
      return [b];
    const m = ot(b, { weekStartsOn: 1 }), N = en(b, { weekStartsOn: 1 });
    return Jr({ start: m, end: N });
  }, [b, p]), _ = (m) => {
    const N = typeof m.start == "string" ? pt(m.start) : m.start, f = typeof m.end == "string" ? pt(m.end) : m.end, S = N.getHours() * 60 + N.getMinutes(), L = Ot * 60, O = dr(f, N);
    return {
      top: `${(S - L) / 60 * 80}px`,
      height: `${O / 60 * 80}px`
    };
  }, x = Me(() => e.filter((m) => {
    const N = typeof m.start == "string" ? pt(m.start) : m.start;
    return C.some((f) => ht(f, N));
  }), [e, C]), h = Me(() => {
    const m = ot(mi(b), { weekStartsOn: 1 }), N = en(pi(b), { weekStartsOn: 1 });
    return Jr({ start: m, end: N });
  }, [b]), P = (m) => !!(l && ur(m, vt(l)) || u && mo(m, vt(u))), [g, q] = ae(null), [J, T] = ae(null), A = Se.useRef(!1), V = (m, N) => {
    i && (N.stopPropagation(), N.preventDefault(), A.current = !1, q(m), T(m));
  }, $ = (m) => {
    a && a(m), g && (A.current = !0, T(m));
  }, X = () => {
    if (g && J && i && A.current) {
      let m = g, N = J;
      ur(N, m) && ([m, N] = [N, m]);
      const f = Zr(N, 30);
      !ht(m, f) && dr(f, m) > 0, i(m, f);
    }
    q(null), T(null);
  }, W = b.getFullYear() - 6, K = Array.from({ length: 12 }, (m, N) => W + N);
  return /* @__PURE__ */ D(
    "div",
    {
      className: Ze("flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden select-none", d),
      onMouseUp: X,
      onMouseLeave: () => {
        q(null), T(null);
      },
      children: [
        /* @__PURE__ */ D("div", { className: "flex items-center justify-between px-2 py-2 border-b border-gray-200 bg-white", children: [
          /* @__PURE__ */ c(
            "h2",
            {
              className: "text-sm font-bold text-gray-800 capitalize cursor-pointer hover:text-primary-600 transition-colors select-none px-2 py-1 rounded hover:bg-gray-50 bg-transparent",
              onClick: () => y(E === "calendar" ? "years" : "calendar"),
              children: E === "years" ? `${K[0]} - ${K[K.length - 1]}` : tt(b, "MMMM yyyy", { locale: on })
            }
          ),
          /* @__PURE__ */ D("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ c("button", { onClick: w, type: "button", className: "p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600", children: /* @__PURE__ */ c(ir, { size: 14 }) }),
            /* @__PURE__ */ c("button", { onClick: k, type: "button", className: "text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors", children: "Hoy" }),
            /* @__PURE__ */ c("button", { onClick: M, type: "button", className: "p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600", children: /* @__PURE__ */ c(xt, { size: 14 }) })
          ] })
        ] }),
        /* @__PURE__ */ c("div", { className: "flex-1 overflow-auto relative bg-white", children: E === "years" ? /* @__PURE__ */ c("div", { className: "p-4 grid grid-cols-4 gap-2", children: K.map((m) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: Ze(
              "h-10 rounded-md text-sm font-medium transition-colors border border-transparent",
              m === b.getFullYear() ? "bg-primary-600 text-white" : "hover:bg-primary-50 text-gray-700 hover:text-primary-700"
            ),
            onClick: () => {
              v((N) => {
                const f = new Date(N);
                return f.setFullYear(m), f;
              }), y("calendar");
            },
            children: m
          },
          m
        )) }) : p === "month" ? /* @__PURE__ */ D("div", { className: "p-4", children: [
          /* @__PURE__ */ c("div", { className: "grid grid-cols-7 mb-2", children: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((m) => /* @__PURE__ */ c("div", { className: "text-center text-xs font-semibold text-gray-400 uppercase py-1", children: m }, m)) }),
          /* @__PURE__ */ c("div", { className: "grid grid-cols-7 gap-1", children: h.map((m) => {
            const N = P(m), f = o && ht(m, o), S = ho(m, b);
            return /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                disabled: N,
                onClick: () => s && s(m),
                className: Ze(
                  "h-10 w-full flex items-center justify-center rounded-md text-sm transition-colors relative",
                  !S && "text-gray-300",
                  N && "opacity-50 cursor-not-allowed",
                  f ? "bg-primary-600 text-white font-medium hover:bg-primary-700" : "hover:bg-gray-100 text-gray-700",
                  Nt(m) && !f && "text-primary-600 font-bold bg-primary-50"
                ),
                children: tt(m, "d")
              },
              m.toISOString()
            );
          }) })
        ] }) : (
          /* Week/Day View (Scheduler) */
          /* @__PURE__ */ D("div", { className: Ze("flex h-full", p === "week" ? "min-w-[800px]" : "w-full"), children: [
            /* @__PURE__ */ c("div", { className: "flex-none w-16 border-r border-gray-100 bg-gray-50 pt-10 select-none", children: mn.map((m) => m < Mr && /* @__PURE__ */ c("div", { className: "h-20 relative text-right pr-2", children: /* @__PURE__ */ c("span", { className: "text-xs text-gray-400 -mt-2 inline-block transform -translate-y-1/2", children: tt((/* @__PURE__ */ new Date()).setHours(m, 0), "HH:mm") }) }, m)) }),
            /* @__PURE__ */ c("div", { className: "flex flex-1", children: C.map((m) => /* @__PURE__ */ D("div", { className: "flex-1 border-r border-gray-100 min-w-[120px] relative", children: [
              /* @__PURE__ */ D("div", { className: Ze(
                "h-10 border-b border-gray-200 flex flex-col items-center justify-center sticky top-0 bg-white z-10",
                Nt(m) && "bg-primary-50"
              ), children: [
                /* @__PURE__ */ c("span", { className: Ze("text-xs font-semibold uppercase", Nt(m) ? "text-primary-600" : "text-gray-500"), children: tt(m, "EEE", { locale: on }) }),
                /* @__PURE__ */ c("span", { className: Ze(
                  "text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full mt-0.5",
                  Nt(m) ? "bg-primary-600 text-white" : "text-gray-800"
                ), children: tt(m, "d") })
              ] }),
              /* @__PURE__ */ D("div", { className: "relative", children: [
                mn.map((N) => N < Mr && /* @__PURE__ */ D(
                  "div",
                  {
                    className: "h-20 border-b border-gray-100 border-dashed relative group",
                    children: [
                      /* @__PURE__ */ c(
                        "div",
                        {
                          className: "absolute inset-x-0 top-0 h-10 border-b border-transparent hover:border-primary-100 hover:bg-primary-50/30 transition-colors cursor-pointer z-0",
                          onMouseDown: (f) => {
                            const S = new Date(m);
                            S.setHours(N, 0, 0, 0), V(S, f);
                          },
                          onMouseEnter: () => {
                            const f = new Date(m);
                            f.setHours(N, 0, 0, 0), $(f);
                          },
                          onClick: () => {
                            if (!A.current) {
                              const f = new Date(m);
                              f.setHours(N, 0, 0, 0), n && n(f);
                            }
                          }
                        }
                      ),
                      /* @__PURE__ */ c(
                        "div",
                        {
                          className: "absolute inset-x-0 bottom-0 h-10 hover:border-primary-100 hover:bg-primary-50/30 transition-colors cursor-pointer z-0",
                          onMouseDown: (f) => {
                            const S = new Date(m);
                            S.setHours(N, 30, 0, 0), V(S, f);
                          },
                          onMouseEnter: () => {
                            const f = new Date(m);
                            f.setHours(N, 30, 0, 0), $(f);
                          },
                          onClick: () => {
                            if (!A.current) {
                              const f = new Date(m);
                              f.setHours(N, 30, 0, 0), n && n(f);
                            }
                          }
                        }
                      )
                    ]
                  },
                  N
                )),
                g && J && ht(g, m) && (() => {
                  let N = g, f = J;
                  ur(f, N) && ([N, f] = [f, N]);
                  const S = Zr(f, 30), L = N.getHours() * 60 + N.getMinutes(), O = Ot * 60, j = dr(S, N), R = (L - O) / 60 * 80, B = j / 60 * 80;
                  return /* @__PURE__ */ c(
                    "div",
                    {
                      className: "absolute left-1 right-1 bg-primary-500/30 border border-primary-500 rounded z-10 pointer-events-none",
                      style: { top: `${R}px`, height: `${B}px` }
                    }
                  );
                })(),
                x.filter((N) => ht(typeof N.start == "string" ? pt(N.start) : N.start, m)).map((N) => {
                  const f = _(N);
                  return /* @__PURE__ */ D(
                    "div",
                    {
                      className: Ze(
                        "absolute left-1 right-1 rounded px-2 py-1 text-xs cursor-pointer hover:brightness-95 transition-all shadow-sm overflow-hidden z-20 border-l-4",
                        !N.color && "bg-primary-100 text-primary-700 border-primary-500"
                      ),
                      style: {
                        top: f.top,
                        height: f.height,
                        backgroundColor: N.color ? `${N.color}20` : void 0,
                        borderColor: N.color,
                        color: N.color ? N.color : void 0
                      },
                      onClick: (S) => {
                        S.stopPropagation(), r && r(N);
                      },
                      children: [
                        /* @__PURE__ */ c("div", { className: "font-semibold truncate", children: N.title }),
                        /* @__PURE__ */ D("div", { className: "opacity-80 truncate", children: [
                          tt(typeof N.start == "string" ? pt(N.start) : N.start, "HH:mm"),
                          " -",
                          tt(typeof N.end == "string" ? pt(N.end) : N.end, "HH:mm")
                        ] })
                      ]
                    },
                    N.id
                  );
                })
              ] }),
              Nt(m) && /* @__PURE__ */ c(
                "div",
                {
                  className: "absolute left-0 right-0 border-t-2 border-danger-500 z-30 pointer-events-none",
                  style: {
                    top: `${((/* @__PURE__ */ new Date()).getHours() * 60 + (/* @__PURE__ */ new Date()).getMinutes() - Ot * 60) / 60 * 80}px`
                  },
                  children: /* @__PURE__ */ c("div", { className: "absolute -left-1.5 -top-1.5 w-3 h-3 bg-danger-500 rounded-full" })
                }
              )
            ] }, m.toISOString())) })
          ] })
        ) })
      ]
    }
  );
};
function ud({
  title: e,
  image: t,
  alt: r = "Card Image",
  children: n,
  actions: a,
  className: i,
  imageClassName: o,
  titleClassName: s,
  contentClassName: l,
  actionClassName: u,
  onClick: d
}) {
  const [p, b] = ae(!1), v = z.card, E = {
    backgroundColor: v.backgroundColor,
    borderColor: v.borderColor,
    borderWidth: v.borderWidth,
    borderRadius: v.borderRadius,
    boxShadow: d ? p ? v.hover.shadow : v.shadow : "none",
    transition: d ? "all 0.2s ease-in-out" : "none",
    cursor: d ? "pointer" : "default"
  }, y = {
    padding: v.body.padding
  };
  return /* @__PURE__ */ D(
    "div",
    {
      onClick: d,
      onMouseEnter: () => d && b(!0),
      onMouseLeave: () => d && b(!1),
      className: te(
        "overflow-hidden flex flex-col",
        i
      ),
      style: E,
      children: [
        t && /* @__PURE__ */ c(
          "img",
          {
            src: t,
            alt: r,
            className: te("w-full h-48 object-cover", o)
          }
        ),
        /* @__PURE__ */ D("div", { className: te(l), style: y, children: [
          e && /* @__PURE__ */ c(
            "h3",
            {
              className: te(
                "text-xl font-semibold mb-2 text-gray-800",
                s
              ),
              children: e
            }
          ),
          /* @__PURE__ */ c("div", { className: "text-gray-600", children: n })
        ] }),
        a && /* @__PURE__ */ c("div", { className: te("p-4 border-t border-gray-100 mt-auto", u), children: a })
      ]
    }
  );
}
function _t({
  name: e,
  type: t = "text",
  label: r,
  placeholder: n,
  value: a,
  onChange: i,
  onBlur: o,
  disabled: s = !1,
  className: l,
  containerClassName: u,
  labelClassName: d,
  touched: p,
  error: b,
  formatNumber: v = !0,
  required: E = !1,
  autoFocus: y = !1,
  onClick: M,
  iconLeft: w,
  iconRight: k,
  maxLength: C,
  minLength: _,
  checked: x,
  showHintLength: h = !1,
  currencyFormat: P = !1,
  rows: g = 4,
  min: q,
  max: J,
  readOnly: T = !1,
  focusContent: A
}) {
  const V = t === "checkbox" || t === "radio", $ = t === "number", X = t === "textarea", [W, K] = ae(""), [m, N] = ae(!1), [f, S] = ae(!1), [L, O] = ae(!1), j = Ne(null), R = z.input || {}, B = () => {
    var ie, le, me, ve, we;
    const Q = {
      backgroundColor: R.backgroundColor,
      borderColor: R.borderColor,
      borderRadius: R.borderRadius,
      padding: R.padding,
      fontSize: R.fontSize,
      borderWidth: "1px",
      borderStyle: "solid",
      transition: "all 0.2s",
      color: z.colors.gray[900]
      // Default text color
    };
    return s && (Q.backgroundColor = ((ie = R.disabled) == null ? void 0 : ie.backgroundColor) || Q.backgroundColor, Q.borderColor = ((le = R.disabled) == null ? void 0 : le.borderColor) || Q.borderColor, Q.opacity = 0.7), Y ? (Q.borderColor = ((me = R.error) == null ? void 0 : me.borderColor) || "red", m && (Q.boxShadow = (ve = R.error) == null ? void 0 : ve.ring)) : m && !T && (Q.boxShadow = (we = R.focus) == null ? void 0 : we.ring), w && (Q.paddingLeft = "2.5rem"), k && (Q.paddingRight = "2.5rem"), Q;
  }, Y = p && b, re = (Q) => {
    M && M(), !T && !f && (Q.currentTarget.select(), S(!0));
  }, ne = De(
    (Q) => {
      const ie = typeof Q == "string" ? parseFloat(Q.replace(/,/g, "")) : Q;
      return ie == null || isNaN(ie) ? "" : P ? ie.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) : ie.toString();
    },
    [P]
  ), ee = De(
    (Q) => Q == null ? "" : String(Q).replace(/,/g, ""),
    []
  );
  ye(() => {
    m || K($ && v ? ne(a) : String(a ?? ""));
  }, [a, m, $, ne, v]);
  const fe = (Q) => {
    if (T || !$) return;
    const { key: ie, ctrlKey: le, metaKey: me } = Q, {
      value: ve,
      selectionStart: we,
      selectionEnd: Te
    } = Q.currentTarget;
    if ([
      "Backspace",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Home",
      "End",
      "Unidentified"
      // mobile keyboards
    ].includes(ie) || le || me)
      return;
    if (!P && (ie === "." || ie === ",")) {
      Q.preventDefault();
      return;
    }
    if (P && (ie === "." || ie === ",") && ve.includes(".")) {
      const ue = ve.indexOf(".");
      if (!(we !== null && Te !== null && we <= ue && ue < Te)) {
        Q.preventDefault();
        return;
      }
    }
    if (ie !== "Unidentified" && !(P ? /^[0-9.,]$/ : /^[0-9]$/).test(ie)) {
      Q.preventDefault();
      return;
    }
    if (J !== void 0 && /^[0-9]$/.test(ie) && we !== null && Te !== null) {
      const ue = ee(ve), oe = ue.slice(0, we) + ie + ue.slice(Te), ge = parseFloat(oe);
      !isNaN(ge) && ge > J && Q.preventDefault();
    }
  }, I = (Q) => {
    if (T) return;
    let ie = Q.target.value, le = "";
    if (P) {
      ie.includes(",") && ie.includes(".") ? ie = ie.replace(/,/g, "") : ie.includes(",") && (ie = ie.replace(/,/g, ".")), le = ie.replace(/[^0-9.]/g, "");
      const me = le.split(".");
      if (me.length > 1) {
        const ve = me.slice(1).join("").substring(0, 2);
        le = me[0] + "." + ve;
      }
    } else
      le = ie.replace(/[^0-9]/g, "");
    if (K(le), i) {
      let me = le;
      if (!v)
        me = le;
      else if (le !== "")
        if (P) {
          const we = parseFloat(le);
          isNaN(we) || (me = le);
        } else {
          const we = parseInt(le, 10);
          isNaN(we) || (me = le);
        }
      const ve = {
        ...Q,
        target: {
          ...Q.target,
          name: e,
          value: me.toString()
        }
      };
      i(ve);
    }
  }, ke = (Q) => {
    if (T) return;
    const ie = Q.target.value;
    if (!(C && ie.length > C) && i) {
      const le = {
        ...Q,
        target: {
          ...Q.target,
          name: e,
          value: ie
        }
      };
      i(le);
    }
  }, Pe = (Q) => {
    N(!0), S(!1), !(T || !$) && (K(ee(a)), Q.currentTarget.select());
  }, ze = (Q) => {
    if (S(!1), N(!1), T) {
      o == null || o(Q);
      return;
    }
    if ($) {
      const ie = W;
      if (!v) {
        if (i && String(a) !== ie) {
          const Te = {
            ...Q,
            target: {
              ...Q.target,
              name: e,
              value: ie
              // Mantener como string
            }
          };
          i(Te);
        }
        o == null || o(Q);
        return;
      }
      let le, me, ve = "";
      if (P) {
        ve = ie.replace(/[^0-9.]/g, "");
        const Te = ve.split(".");
        Te.length > 2 && (ve = Te[0] + "." + Te.slice(1).join("")), ve === "." && (ve = "");
      } else
        ve = ie.replace(/[^0-9]/g, "");
      const we = P ? parseFloat(ve) : parseInt(ve, 10);
      if (isNaN(we) ? (K(""), me = void 0) : (le = we, q !== void 0 && le < q && (le = q), J !== void 0 && le > J && (le = J), me = le, K(ne(le))), i && String(a) !== String(me)) {
        const Te = {
          ...Q,
          target: {
            ...Q.target,
            name: e,
            value: me
          }
        };
        i(Te);
      } else String(a) === String(me) && W !== ne(a) && !isNaN(we) ? K(ne(a)) : isNaN(we) && K("");
    }
    o == null || o(Q);
  }, et = $ ? (P ? W.replace(/[.,]/g, "") : W).length : typeof a == "string" ? a.length : String(a ?? "").length;
  return /* @__PURE__ */ D("div", { className: te("w-full", u), children: [
    V ? (
      // CHECKBOX / RADIO LAYOUT (Row)
      /* @__PURE__ */ D("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ c(
          "input",
          {
            ref: j,
            name: e,
            id: e,
            type: t,
            checked: x,
            onChange: ke,
            disabled: s,
            required: E,
            className: te(
              "peer",
              "form-radio h-4 w-4 text-slate-600 focus:ring-slate-500 transition-all duration-200",
              t === "checkbox" && "form-checkbox rounded",
              l,
              { "opacity-50 cursor-not-allowed": s },
              { "border-red-500": p && b }
            )
          }
        ),
        r && /* @__PURE__ */ D("label", { htmlFor: e, className: "text-sm text-gray-700 select-none", children: [
          r,
          " ",
          E && /* @__PURE__ */ c("span", { className: "text-red-500", children: "*" })
        ] })
      ] })
    ) : (
      // TEXT / NUMBER / TEXTAREA LAYOUT (Column)
      /* @__PURE__ */ D("div", { className: "flex flex-col gap-1.5", children: [
        r && /* @__PURE__ */ D(
          "label",
          {
            htmlFor: e,
            className: te(
              "text-sm font-medium text-gray-700",
              { "text-red-500": p && b },
              d
            ),
            children: [
              r,
              E && /* @__PURE__ */ c("span", { className: "text-red-500 ml-1", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ D("div", { className: "relative w-full", children: [
          w && /* @__PURE__ */ c("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 z-10", children: w }),
          X ? /* @__PURE__ */ c(
            "textarea",
            {
              name: e,
              id: e,
              placeholder: n,
              value: a ?? "",
              onChange: T ? void 0 : i,
              onBlur: T ? void 0 : o,
              readOnly: T,
              maxLength: C,
              minLength: _,
              disabled: s,
              required: E,
              autoFocus: y,
              onClick: M,
              rows: g,
              className: te(
                "peer",
                "focus:outline-none w-full resize-none",
                l,
                { "cursor-not-allowed": s }
              ),
              style: B()
            }
          ) : /* @__PURE__ */ D(jt, { children: [
            /* @__PURE__ */ c(
              "input",
              {
                ref: j,
                name: e,
                id: e,
                type: $ ? "text" : t === "password" ? L ? "text" : "password" : t,
                inputMode: $ ? P ? "decimal" : "numeric" : void 0,
                placeholder: n,
                value: $ ? W : String(a ?? ""),
                onChange: $ ? I : ke,
                onFocus: $ ? Pe : () => N(!0),
                onBlur: $ ? ze : (Q) => {
                  N(!1), o == null || o(Q);
                },
                onKeyDown: $ ? fe : void 0,
                readOnly: T,
                maxLength: $ && !P ? C : void 0,
                minLength: _,
                min: q,
                max: J,
                disabled: s,
                required: E,
                autoFocus: y,
                onClick: A ? re : M,
                className: te(
                  "peer",
                  "focus:outline-none w-full",
                  l,
                  { "cursor-not-allowed": s },
                  { "pl-10": w },
                  { "pr-10": k || t === "password" }
                ),
                style: B()
              }
            ),
            t === "password" && /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: "absolute inset-y-0 right-0 flex items-center pr-3 z-10 text-gray-400 hover:text-gray-600 focus:outline-none",
                onClick: () => O(!L),
                tabIndex: -1,
                children: L ? /* @__PURE__ */ D("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ c("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }),
                  /* @__PURE__ */ c("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }),
                  /* @__PURE__ */ c("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }),
                  /* @__PURE__ */ c("line", { x1: "2", x2: "22", y1: "2", y2: "22" })
                ] }) : /* @__PURE__ */ D("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ c("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }),
                  /* @__PURE__ */ c("circle", { cx: "12", cy: "12", r: "3" })
                ] })
              }
            )
          ] }),
          k && t !== "password" && /* @__PURE__ */ c("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 z-10", children: k })
        ] })
      ] })
    ),
    p && b && !V && /* @__PURE__ */ c("div", { className: "flex-shrink-0 min-w-[140px] flex items-center pt-3", children: /* @__PURE__ */ c("p", { className: "text-red-500 text-xs", children: b }) }),
    h && (_ || C) && !V && /* @__PURE__ */ c("div", { className: "mt-1 text-xs", children: /* @__PURE__ */ D("p", { className: "text-gray-500", children: [
      et,
      C && `/${C}`
    ] }) }),
    V && p && b && /* @__PURE__ */ c("div", { className: "mt-1 text-xs", children: /* @__PURE__ */ c("p", { className: "text-red-500", children: b }) })
  ] });
}
function ga({
  name: e,
  value: t,
  onChange: r,
  onBlur: n,
  variant: a = "primary",
  size: i = "medium",
  className: o,
  calendarClassName: s,
  disabled: l = !1,
  label: u,
  touched: d,
  error: p,
  required: b,
  placeholder: v,
  minDate: E,
  maxDate: y
}) {
  const [M, w] = ae(!1), [k, C] = ae(""), [_, x] = ae(!0), [h, P] = ae(new Date(t)), g = Ne(null), [q, J] = ae({ top: 0, left: 0 }), T = Se.useMemo(
    () => typeof t == "string" ? new Date(t) : t,
    [t]
  );
  ye(() => {
    T instanceof Date && !isNaN(T.getTime()) ? (C(X(T)), P(T)) : C("");
  }, [T]), ye(() => {
    const N = (f) => {
      g.current && !g.current.contains(f.target) && w(!1);
    };
    return document.addEventListener("mousedown", N), () => document.removeEventListener("mousedown", N);
  }, []);
  const A = () => {
    if (g.current) {
      const N = g.current.getBoundingClientRect(), f = 300, S = window.innerHeight;
      let L = N.bottom + 4;
      N.bottom + f > S && (L = N.top - f - 4), J({
        top: L,
        left: N.left
      });
    }
  }, V = (N) => {
    r({
      target: {
        name: e,
        value: N
      }
    }), P(N), C(X(N)), w(!1);
  }, $ = () => {
    l || (A(), w(!M));
  }, X = (N) => N.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).replace(/\//g, "/"), W = (N) => {
    const f = /^(\d{2})\/(\d{2})\/(\d{4})$/, S = N.match(f);
    if (!S) return !1;
    const L = parseInt(S[1], 10), O = parseInt(S[2], 10), j = parseInt(S[3], 10), R = new Date(j, O - 1, L);
    return R.getFullYear() === j && R.getMonth() === O - 1 && R.getDate() === L;
  }, K = (N) => {
    let f = N.target.value.replace(/\D/g, "");
    if (f.length > 8 && (f = f.slice(0, 8)), f.length > 4 ? f = `${f.slice(0, 2)}/${f.slice(2, 4)}/${f.slice(4)}` : f.length > 2 && (f = `${f.slice(0, 2)}/${f.slice(2)}`), C(f), f.length === 10 && W(f)) {
      const [S, L, O] = f.split("/").map(Number), j = new Date(O, L - 1, S);
      r({
        target: {
          name: e,
          value: j
        }
      }), P(j), x(!0);
    } else
      x(!1);
  }, m = () => {
    if (W(k)) {
      const [N, f, S] = k.split("/").map(Number), L = new Date(S, f - 1, N);
      if (!isNaN(L.getTime()))
        n({ target: { name: e, value: L } });
      else {
        const O = /* @__PURE__ */ new Date();
        C(X(O)), r({ target: { name: e, value: O } });
      }
    } else {
      const N = /* @__PURE__ */ new Date();
      C(X(N)), r({
        target: {
          name: e,
          value: N
        }
      }), x(!0);
    }
  };
  return /* @__PURE__ */ D("div", { ref: g, className: te("relative w-full", o), children: [
    /* @__PURE__ */ c(
      _t,
      {
        name: e,
        type: "text",
        label: u,
        placeholder: v,
        value: k,
        onChange: K,
        onBlur: m,
        maxLength: 10,
        iconRight: /* @__PURE__ */ c("span", { children: /* @__PURE__ */ c(
          al,
          {
            onClick: $,
            className: "text-slate-900 cursor-pointer"
          }
        ) }),
        variant: a,
        size: i,
        disabled: l,
        required: b,
        touched: d,
        error: _ ? p : "Fecha inválida",
        onClick: $
      }
    ),
    M && /* @__PURE__ */ c(
      "div",
      {
        className: te(
          "fixed z-[9999]",
          s
        ),
        style: {
          top: `${q.top}px`,
          left: `${q.left}px`,
          backgroundColor: z.card.backgroundColor,
          borderColor: z.card.borderColor,
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: z.card.borderRadius,
          boxShadow: z.card.shadow,
          padding: "0.5rem"
          // Added a bit of padding for the calendar inside
        },
        children: /* @__PURE__ */ c(
          fl,
          {
            value: T,
            onChange: V,
            minDate: E,
            maxDate: y,
            className: "h-auto border-none shadow-none w-full"
          }
        )
      }
    )
  ] });
}
const Lr = (e, t) => {
  ye(() => {
    const r = (n) => {
      e.current && !e.current.contains(n.target) && t();
    };
    return document.addEventListener("mousedown", r), () => {
      document.removeEventListener("mousedown", r);
    };
  }, [e, t]);
};
function ml({
  title: e,
  onClose: t,
  className: r = ""
}) {
  return /* @__PURE__ */ D("div", { className: `bg-primary-500 text-white px-6 py-4 rounded-t-lg flex justify-center items-center relative ${r}`, children: [
    /* @__PURE__ */ c("h2", { className: "text-lg font-semibold text-center", children: e }),
    t && /* @__PURE__ */ c(
      "button",
      {
        onClick: t,
        className: "absolute right-4 text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-full hover:bg-primary-600",
        "aria-label": "Cerrar",
        children: /* @__PURE__ */ c(Fr, { className: "w-4 h-4" })
      }
    )
  ] });
}
function pd({
  isOpen: e,
  onClose: t,
  children: r,
  className: n,
  title: a,
  useFormHeader: i = !1
}) {
  const o = Ne(null);
  return Lr(o, t), ye(() => {
    const s = (l) => {
      l.key === "Escape" && t();
    };
    return e && document.addEventListener("keydown", s), () => {
      document.removeEventListener("keydown", s);
    };
  }, [e, t]), e ? /* @__PURE__ */ c("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: /* @__PURE__ */ c(
    "div",
    {
      ref: o,
      className: `overflow-hidden relative ${n} ${i ? "p-0" : "p-6"}`,
      style: {
        backgroundColor: z.card.backgroundColor,
        borderRadius: z.card.borderRadius,
        boxShadow: z.card.shadow,
        // Border? theme.card.borderWidth?
        borderWidth: z.card.borderWidth,
        borderColor: z.card.borderColor,
        borderStyle: "solid"
      },
      children: i && a ? /* @__PURE__ */ D(jt, { children: [
        /* @__PURE__ */ c(ml, { title: a, onClose: t }),
        /* @__PURE__ */ c("div", { className: "p-6", children: r })
      ] }) : /* @__PURE__ */ D(jt, { children: [
        /* @__PURE__ */ c(
          "button",
          {
            className: "absolute top-2 right-2 text-gray-600 hover:text-gray-900",
            onClick: t,
            children: /* @__PURE__ */ c(ul, {})
          }
        ),
        a && /* @__PURE__ */ c("h2", { className: "text-xl font-semibold mb-4", children: a }),
        /* @__PURE__ */ c("div", { children: r })
      ] })
    }
  ) }) : null;
}
function or({
  name: e,
  options: t,
  label: r,
  placeholder: n,
  valueField: a = "value",
  labelField: i = "label",
  value: o,
  onChange: s,
  onBlur: l,
  disabled: u = !1,
  className: d,
  touched: p,
  required: b,
  error: v,
  readOnly: E = !1
}) {
  var C;
  const [y, M] = ae(!1), w = z.input || {}, k = () => {
    var x, h, P, g, q;
    const _ = {
      backgroundColor: w.backgroundColor,
      borderColor: w.borderColor,
      borderRadius: w.borderRadius,
      padding: w.padding,
      fontSize: w.fontSize,
      borderWidth: "1px",
      borderStyle: "solid",
      transition: "all 0.2s",
      color: z.colors.gray[900],
      appearance: "none"
      // Important for custom styling
    };
    return u && (_.backgroundColor = ((x = w.disabled) == null ? void 0 : x.backgroundColor) || _.backgroundColor, _.borderColor = ((h = w.disabled) == null ? void 0 : h.borderColor) || _.borderColor, _.opacity = 0.7), p && v ? (_.borderColor = ((P = w.error) == null ? void 0 : P.borderColor) || "red", y && (_.boxShadow = (g = w.error) == null ? void 0 : g.ring)) : y && !E && (_.boxShadow = (q = w.focus) == null ? void 0 : q.ring), _;
  };
  return /* @__PURE__ */ c("div", { className: "w-full", children: /* @__PURE__ */ D("div", { className: te("relative", {
    "flex flex-col gap-1.5": r
  }), children: [
    r && /* @__PURE__ */ D(
      "label",
      {
        htmlFor: e,
        className: te(
          "text-sm font-medium text-gray-700 pt-0",
          { "text-red-500": p && v }
        ),
        children: [
          r,
          b && /* @__PURE__ */ c("span", { className: "text-red-500 ml-1", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ D("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ D("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ D(
          "select",
          {
            name: e,
            id: e,
            value: o,
            onChange: E ? void 0 : s,
            onBlur: (_) => {
              M(!1), E || l == null || l(_);
            },
            onFocus: () => M(!0),
            disabled: u,
            className: te(
              "w-full focus:outline-none",
              // Core structure only
              d,
              { "cursor-not-allowed": u }
            ),
            style: k(),
            children: [
              /* @__PURE__ */ c("option", { value: "", children: n || "Selecciona una opción" }),
              E ? /* @__PURE__ */ c("option", { value: o, disabled: !0, children: (C = t.find((_) => _[a] === o)) == null ? void 0 : C[i] }) : t.map((_) => /* @__PURE__ */ c(
                "option",
                {
                  value: _[a],
                  title: _[i],
                  children: _[i]
                },
                _[a]
              ))
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500", children: /* @__PURE__ */ c(rl, {}) })
      ] }),
      p && v && /* @__PURE__ */ c("div", { className: "flex-shrink-0 min-w-[140px] flex items-center pt-3", children: /* @__PURE__ */ c("p", { className: "text-red-500 text-xs", children: v }) })
    ] })
  ] }) });
}
const ba = qa(void 0), hl = ({
  children: e,
  value: t
}) => {
  const [r, n] = ae({}), a = Se.useCallback((l, u) => {
    n((d) => ({ ...d, [l]: u }));
  }, []), i = Se.useCallback((l) => {
    n((u) => {
      const d = { ...u };
      return delete d[l], d;
    });
  }, []), o = Se.useCallback((l) => r[l], [r]), s = Se.useMemo(
    () => ({
      ...t,
      registerField: a,
      unregisterField: i,
      getFieldConfig: o
    }),
    [t, a, i, o]
  );
  return /* @__PURE__ */ c(ba.Provider, { value: s, children: e });
}, va = () => {
  const e = Va(ba);
  if (!e)
    throw new Error("useITFormBuilderContext must be used within an ITFormBuilderProvider");
  return e;
};
function gl({
  name: e,
  value: t,
  label: r,
  placeholder: n = "HH:MM",
  onChange: a,
  onBlur: i,
  required: o,
  touched: s,
  error: l,
  disabled: u,
  className: d,
  size: p = "medium",
  variant: b = "primary",
  color: v = "primary"
}) {
  const [E, y] = ae(!1), [M, w] = ae(t || ""), [k, C] = ae(!0), [_, x] = ae({ top: 0, left: 0 }), h = Ne(null), P = Ne(null), g = Ne(null), q = v in z.colors, J = q ? z.colors[v][50] : "#f3f4f6", T = q ? z.colors[v][100] : "#e5e7eb";
  ye(() => {
    w(t || "");
  }, [t]), ye(() => {
    const O = (R) => {
      const B = R.target.closest(".it-timepicker-dropdown");
      h.current && !h.current.contains(R.target) && !B && y(!1);
    };
    document.addEventListener("mousedown", O);
    const j = () => y(!1);
    return window.addEventListener("scroll", j, !0), () => {
      document.removeEventListener("mousedown", O), window.removeEventListener("scroll", j, !0);
    };
  }, []);
  const A = () => {
    if (h.current) {
      const O = h.current.getBoundingClientRect(), j = 280, R = window.innerHeight;
      let B = O.bottom + 4;
      O.bottom + j > R && (B = O.top - j - 4), x({
        top: B,
        left: O.left
      });
    }
  }, V = (O) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(O), $ = V(M) ? M.split(":")[0] : null, X = V(M) ? M.split(":")[1] : null;
  ye(() => {
    E && setTimeout(() => {
      if (P.current && $) {
        const O = P.current.querySelector(
          `[data-value="${$}"]`
        );
        O && (P.current.scrollTop = O.offsetTop - P.current.clientHeight / 2 + O.clientHeight / 2);
      }
      if (g.current && X) {
        const O = g.current.querySelector(
          `[data-value="${X}"]`
        );
        O && (g.current.scrollTop = O.offsetTop - g.current.clientHeight / 2 + O.clientHeight / 2);
      }
    }, 50);
  }, [E, $, X]);
  const W = (O) => {
    let j = O.target.value.replace(/\D/g, "");
    j.length > 4 && (j = j.slice(0, 4)), j.length >= 3 && (j = `${j.slice(0, 2)}:${j.slice(2)}`), w(j), V(j) ? (C(!0), a({ target: { name: e, value: j } })) : C(!1);
  }, K = () => {
    if (!V(M)) {
      C(!1), i({ target: { name: e, value: t } });
      return;
    }
    C(!0), i({ target: { name: e, value: M } });
  }, m = (O) => {
    const R = `${O}:${X || "00"}`;
    w(R), a({ target: { name: e, value: R } }), C(!0);
  }, N = (O) => {
    const R = `${$ || "00"}:${O}`;
    w(R), a({ target: { name: e, value: R } }), C(!0);
  }, f = () => {
    y(!1);
  }, S = Array.from(
    { length: 24 },
    (O, j) => j.toString().padStart(2, "0")
  ), L = Array.from(
    { length: 60 },
    (O, j) => j.toString().padStart(2, "0")
  );
  return /* @__PURE__ */ D("div", { ref: h, className: te("relative w-full", d), children: [
    /* @__PURE__ */ c(
      _t,
      {
        name: e,
        label: r,
        placeholder: n,
        type: "text",
        value: M,
        onChange: W,
        onBlur: K,
        maxLength: 5,
        required: o,
        disabled: u,
        variant: b,
        size: p,
        touched: s,
        error: k ? typeof l == "string" ? l : void 0 : "Hora inválida",
        iconRight: /* @__PURE__ */ c(
          ol,
          {
            onClick: () => {
              u || (A(), y(!E));
            },
            className: te(
              "cursor-pointer transition-colors",
              u ? "text-slate-400 cursor-not-allowed" : "text-slate-900 hover:text-slate-600"
            )
          }
        )
      }
    ),
    E && !u && /* @__PURE__ */ D(
      "div",
      {
        className: "fixed z-[9999] bg-white border border-gray-100 shadow-xl rounded-xl w-64 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 origin-top it-timepicker-dropdown",
        style: {
          top: `${_.top}px`,
          left: `${_.left}px`
        },
        children: [
          /* @__PURE__ */ D("div", { className: "flex bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: [
            /* @__PURE__ */ c("div", { className: "flex-1 text-center py-2 border-r border-gray-100", children: "Horas" }),
            /* @__PURE__ */ c("div", { className: "flex-1 text-center py-2", children: "Minutos" })
          ] }),
          /* @__PURE__ */ D("div", { className: "flex h-56 relative bg-white", children: [
            /* @__PURE__ */ c(
              "div",
              {
                ref: P,
                className: "flex-1 overflow-y-auto no-scrollbar border-r border-gray-50 scroll-smooth relative",
                children: /* @__PURE__ */ c("div", { className: "py-2", children: S.map((O) => {
                  const j = $ === O;
                  return /* @__PURE__ */ c(
                    "div",
                    {
                      "data-value": O,
                      className: te(
                        "text-center py-2 cursor-pointer transition-all duration-200 text-sm font-medium mx-2 rounded-lg my-1",
                        j ? "text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                      ),
                      style: {
                        backgroundColor: j ? T : void 0
                      },
                      onMouseEnter: (R) => {
                        j || (R.currentTarget.style.backgroundColor = J);
                      },
                      onMouseLeave: (R) => {
                        j || (R.currentTarget.style.backgroundColor = "transparent");
                      },
                      onClick: () => m(O),
                      children: O
                    },
                    O
                  );
                }) })
              }
            ),
            /* @__PURE__ */ c(
              "div",
              {
                ref: g,
                className: "flex-1 overflow-y-auto no-scrollbar scroll-smooth relative",
                children: /* @__PURE__ */ c("div", { className: "py-2", children: L.map((O) => {
                  const j = X === O;
                  return /* @__PURE__ */ c(
                    "div",
                    {
                      "data-value": O,
                      className: te(
                        "text-center py-2 cursor-pointer transition-all duration-200 text-sm font-medium mx-2 rounded-lg my-1",
                        j ? "text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                      ),
                      style: {
                        backgroundColor: j ? T : void 0
                      },
                      onMouseEnter: (R) => {
                        j || (R.currentTarget.style.backgroundColor = J);
                      },
                      onMouseLeave: (R) => {
                        j || (R.currentTarget.style.backgroundColor = "transparent");
                      },
                      onClick: () => N(O),
                      children: O
                    },
                    O
                  );
                }) })
              }
            ),
            /* @__PURE__ */ c("div", { className: "absolute top-1/2 left-0 right-0 h-10 -mt-5 bg-black/5 pointer-events-none border-y border-black/10 z-10" })
          ] }),
          /* @__PURE__ */ c("div", { className: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end", children: /* @__PURE__ */ c(
            Sr,
            {
              variant: "solid",
              color: v,
              size: "small",
              onClick: f,
              children: "Aceptar"
            }
          ) })
        ]
      }
    )
  ] });
}
const bl = (e, t) => {
  const { values: r, getFieldConfig: n } = va(), a = n(e), i = Me(() => a != null && a.renderWhen ? a.renderWhen(r) : !0, [a, r]), o = Me(() => a != null && a.dynamicProps ? a.dynamicProps(r) : {}, [a, r]), s = Me(() => typeof (a == null ? void 0 : a.required) == "function" ? a.required(r) : (a == null ? void 0 : a.required) || !1, [a, r, o]), l = Me(() => typeof (a == null ? void 0 : a.disabled) == "function" ? a.disabled(r) : (a == null ? void 0 : a.disabled) || !1, [a, r, o]);
  return {
    isVisible: i,
    dynamicProps: o,
    isRequired: o.required !== void 0 ? o.required : s,
    isDisabled: o.disabled !== void 0 ? o.disabled : l
  };
}, vl = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  8: "grid-cols-8",
  12: "grid-cols-12"
}, xl = (e) => vl[e] || "grid-cols-12", yl = (e = 12, t) => {
  if (typeof e == "object") {
    const r = [];
    return e.sm && r.push(`col-span-${Math.min(e.sm, t)}`), e.md && r.push(`md:col-span-${Math.min(e.md, t)}`), e.lg && r.push(`lg:col-span-${Math.min(e.lg, t)}`), e.xl && r.push(`xl:col-span-${Math.min(e.xl, t)}`), r.join(" ") || `col-span-${t}`;
  }
  return `col-span-${Math.min(e, t)}`;
}, xa = ({ config: e, columns: t = 12 }) => {
  const r = va(), { isVisible: n, isRequired: a, isDisabled: i, dynamicProps: o } = bl(
    e.name,
    e.dependsOn
  );
  if (ye(() => (r.registerField(e.name, e), () => {
    r.unregisterField(e.name);
  }), [e.name]), !n) return null;
  const s = {
    ...e,
    ...o,
    required: a,
    disabled: i
  }, {
    name: l,
    label: u,
    type: d,
    placeholder: p,
    options: b,
    valueField: v,
    labelField: E,
    formatNumber: y,
    showHintLength: M,
    leftIcon: w,
    rightIcon: k
  } = s, C = r.values[l], _ = r.errors[l], x = r.touched[l], h = async (g) => {
    const q = g != null && g.target ? g.target.value : g;
    await r.setFieldValue(l, q), s.onChangeAction && await s.onChangeAction(q, r);
  }, P = () => {
    var g;
    switch (d) {
      case "text":
      case "password":
      case "number":
      case "email":
        return /* @__PURE__ */ c(
          _t,
          {
            type: d === "email" ? "text" : d,
            name: l,
            label: u || "",
            placeholder: p,
            disabled: i,
            value: C !== void 0 ? C : s.defaultValue || "",
            onChange: h,
            onBlur: r.handleBlur,
            currencyFormat: s.currencyFormat,
            touched: x,
            error: _,
            required: a,
            iconRight: k,
            iconLeft: w,
            showHintLength: M,
            maxLength: s.maxLength,
            minLength: s.minLength,
            rows: s.rows,
            formatNumber: y
          }
        );
      case "select":
        return /* @__PURE__ */ c(
          or,
          {
            options: Array.isArray(b) ? b : [],
            name: l,
            disabled: i,
            label: u || "",
            placeholder: p,
            value: C !== void 0 ? C : s.defaultValue || "",
            valueField: v,
            labelField: E,
            onChange: h,
            onBlur: r.handleBlur,
            touched: x,
            error: _,
            required: a
          }
        );
      case "date":
        return /* @__PURE__ */ c(
          ga,
          {
            name: l,
            disabled: i,
            label: u || "",
            value: C,
            onChange: h,
            placeholder: p,
            onBlur: r.handleBlur,
            touched: x,
            error: _,
            required: a
          }
        );
      case "time":
        return /* @__PURE__ */ c(
          gl,
          {
            name: l,
            disabled: i,
            label: u || "",
            value: C,
            onChange: h,
            placeholder: p,
            onBlur: r.handleBlur,
            touched: x,
            error: _,
            required: a
          }
        );
      case "custom":
        if (s.component) {
          const q = s.component;
          return /* @__PURE__ */ c(
            q,
            {
              ...s,
              value: C,
              onChange: h,
              onBlur: r.handleBlur,
              error: _,
              touched: x,
              context: r
            }
          );
        }
        return null;
      case "section":
        return /* @__PURE__ */ D(
          "div",
          {
            className: te(
              "w-full col-span-full",
              s.className
            ),
            children: [
              u && /* @__PURE__ */ c("h4", { className: "text-lg font-semibold text-gray-800 mb-4", children: u }),
              /* @__PURE__ */ c(
                "div",
                {
                  className: te(
                    "grid gap-y-6 gap-x-5",
                    xl(t)
                  ),
                  children: (g = s.fields) == null ? void 0 : g.map((q) => /* @__PURE__ */ c(
                    xa,
                    {
                      config: q,
                      columns: t
                    },
                    q.name
                  ))
                }
              )
            ]
          }
        );
      case "array":
        return /* @__PURE__ */ c("div", { className: "p-4 border-2 border-dashed border-gray-200 rounded-xl", children: /* @__PURE__ */ D("p", { className: "text-sm text-gray-500 text-center", children: [
          "Array Field: ",
          u
        ] }) });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: te(
        yl(s.column, t),
        s.className
      ),
      children: P()
    }
  );
}, wl = Ha(xa), kl = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  8: "grid-cols-8",
  12: "grid-cols-12"
}, hn = (e) => kl[e] || "grid-cols-12", Cl = (e, t) => {
  if (Array.isArray(e)) {
    const [r, n, a] = e;
    return `col-span-${Math.min(r, t)} md:col-span-${Math.min(
      n,
      t
    )} lg:col-span-${Math.min(a, t)}`;
  } else
    return `col-span-${Math.min(e, t)}`;
};
function fd({
  fields: e,
  config: t,
  columns: r = 12,
  values: n,
  handleChange: a,
  handleBlur: i,
  touched: o,
  errors: s,
  setFieldValue: l = () => Promise.resolve(),
  setFieldTouched: u = () => Promise.resolve(),
  setFieldError: d = () => {
  },
  isSubmitting: p = !1
}) {
  const [b, v] = ae(!1);
  ye(() => {
    v(!0);
  }, []);
  const E = Me(() => ({
    config: t || [],
    values: n || {},
    errors: s || {},
    touched: o || {},
    handleChange: a,
    handleBlur: i,
    setFieldValue: l,
    setFieldTouched: u,
    setFieldError: d,
    initialValues: {},
    // Can be expanded later if Formik exposes it
    isSubmitting: p,
    isValidating: !1,
    submitCount: 0
  }), [t, n, s, o, a, i, l, u, d, p]);
  return t ? /* @__PURE__ */ c(hl, { value: E, children: /* @__PURE__ */ c("div", { className: te("grid gap-y-6 gap-x-5", hn(r)), children: t.map((y) => /* @__PURE__ */ c(wl, { config: y, columns: r }, y.name)) }) }) : /* @__PURE__ */ c(
    "div",
    {
      className: te(
        "grid gap-y-6 gap-x-5",
        hn(r)
      ),
      children: e == null ? void 0 : e.map(
        ({
          name: y,
          label: M,
          type: w = "text",
          placeholder: k,
          required: C,
          column: _ = 12,
          options: x,
          valueField: h,
          disabled: P = !1,
          labelField: g,
          showHintLength: q,
          formatNumber: J = !0,
          onChangeAction: T,
          ...A
        }, V) => /* @__PURE__ */ c(
          "div",
          {
            className: Cl(_, r),
            children: (() => {
              switch (w) {
                case "text":
                case "number":
                case "password":
                  return /* @__PURE__ */ c(
                    _t,
                    {
                      type: w,
                      name: y,
                      label: M,
                      placeholder: k,
                      disabled: P,
                      value: n[y],
                      onChange: ($) => {
                        a($), T && l && T($.target.value, l);
                      },
                      onBlur: i,
                      currencyFormat: A.currencyFormat,
                      touched: o[y],
                      error: s[y],
                      required: C,
                      iconRight: A.rightIcon,
                      iconLeft: A.leftIcon,
                      showHintLength: q,
                      maxLength: A.maxLength,
                      minLength: A.minLength,
                      rows: A.rows,
                      formatNumber: J
                    }
                  );
                case "select":
                  return /* @__PURE__ */ c(
                    or,
                    {
                      options: x || [],
                      name: y,
                      disabled: P,
                      label: M,
                      placeholder: k,
                      value: n[y],
                      valueField: h,
                      labelField: g,
                      onChange: ($) => {
                        a($), T && l && T($.target.value, l);
                      },
                      onBlur: i,
                      touched: o[y],
                      error: s[y],
                      required: C
                    }
                  );
                case "date":
                  return /* @__PURE__ */ c(
                    ga,
                    {
                      name: y,
                      disabled: P,
                      label: M,
                      value: n[y],
                      onChange: ($) => {
                        a($), T && l && T($.target.value, l);
                      },
                      placeholder: k,
                      onBlur: i,
                      touched: o[y],
                      error: s[y],
                      required: C
                    }
                  );
                default:
                  return null;
              }
            })()
          },
          y
        )
      )
    }
  );
}
function md({
  onToggle: e,
  isOn: t,
  initialState: r = !1,
  activeColor: n = "success",
  inactiveColor: a = "#9ca3af",
  // default gray-400
  disabled: i = !1,
  size: o = "md",
  className: s = ""
}) {
  const l = t !== void 0, [u, d] = ae(r);
  ye(() => {
    l && d(t);
  }, [t, l]);
  const p = l ? t : u, b = () => {
    if (i) return;
    const h = !p;
    l || d(h), e && e(h);
  }, E = n in z.colors ? z.colors[n][500] : n, M = a in z.colors ? z.colors[a][400] : a, w = p ? E : M, k = {
    sm: {
      container: "w-10 h-5",
      knob: "w-3.5 h-3.5",
      translate: "translate-x-5"
    },
    md: {
      container: "w-14 h-7",
      knob: "w-5 h-5",
      translate: "translate-x-7"
    },
    lg: {
      container: "w-16 h-8",
      knob: "w-6 h-6",
      translate: "translate-x-8"
    }
  }, { container: C, knob: _, translate: x } = k[o];
  return /* @__PURE__ */ c(
    "div",
    {
      onClick: b,
      className: te(
        "flex items-center rounded-full p-1 transition-colors duration-300",
        C,
        i ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        s
      ),
      style: { backgroundColor: w },
      role: "switch",
      "aria-checked": p,
      tabIndex: i ? -1 : 0,
      onKeyDown: (h) => {
        (h.key === "Enter" || h.key === " ") && (h.preventDefault(), b());
      },
      children: /* @__PURE__ */ c(
        "div",
        {
          className: te(
            "bg-white rounded-full shadow-md transform transition-transform duration-300 pointer-events-none",
            _,
            p ? x : "translate-x-0"
          )
        }
      )
    }
  );
}
const Nl = {
  default: "",
  striped: "divide-y divide-gray-200",
  bordered: "border border-gray-200"
}, Tl = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg"
};
function El(e) {
  return Ee({ attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", d: "M0 0h24v24H0V0z" }, child: [] }, { tag: "path", attr: { d: "M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3 5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3 5 6.99h3V14h2V6.99h3L9 3z" }, child: [] }] })(e);
}
const St = "...", Sl = ({
  totalPages: e,
  currentPage: t,
  siblingCount: r = 1
}) => Se.useMemo(() => {
  if (r + 5 >= e)
    return Array.from({ length: e }, (d, p) => p + 1);
  const a = Math.max(t - r, 1), i = Math.min(t + r, e), o = a > 2, s = i < e - 2, l = 1, u = e;
  if (!o && s) {
    let d = 3 + 2 * r;
    return [...Array.from({ length: d }, (b, v) => v + 1), St, e];
  }
  if (o && !s) {
    let d = 3 + 2 * r, p = Array.from(
      { length: d },
      (b, v) => e - d + v + 1
    );
    return [l, St, ...p];
  }
  if (o && s) {
    let d = Array.from(
      { length: i - a + 1 },
      (p, b) => a + b
    );
    return [l, St, ...d, St, u];
  }
}, [e, t, r]);
function Ol({
  currentPage: e,
  totalPages: t,
  onPageChange: r,
  siblingCount: n = 1,
  color: a = "primary",
  className: i = "",
  itemsPerPageOptions: o,
  itemsPerPage: s,
  onItemsPerPageChange: l,
  totalItems: u
}) {
  const d = Sl({
    currentPage: e,
    totalPages: t,
    siblingCount: n
  });
  if (e === 0 || d && d.length < 2)
    return null;
  const p = a in z.colors, b = p ? z.colors[a][500] : a, v = p ? z.colors[a][50] : "#f3f4f6", E = () => {
    e < t && r(e + 1);
  }, y = () => {
    e > 1 && r(e - 1);
  }, M = "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors cursor-pointer select-none", w = () => /* @__PURE__ */ D("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: te(
          M,
          e === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100"
        ),
        onClick: y,
        "aria-disabled": e === 1,
        children: /* @__PURE__ */ c(ir, { size: 12 })
      }
    ),
    d == null ? void 0 : d.map((k, C) => {
      if (k === St)
        return /* @__PURE__ */ c(
          "div",
          {
            className: "flex items-center justify-center w-8 h-8 select-none text-gray-400",
            children: "…"
          },
          `dots-${C}`
        );
      const _ = k === e;
      return /* @__PURE__ */ c(
        "div",
        {
          className: te(
            M,
            _ ? "text-white" : "text-gray-600 hover:bg-gray-100"
          ),
          style: {
            backgroundColor: _ ? b : void 0,
            ..._ ? {} : { "--hover-bg": v }
          },
          onClick: () => r(k),
          title: `Page ${k}`,
          children: k
        },
        k
      );
    }),
    /* @__PURE__ */ c(
      "div",
      {
        className: te(
          M,
          e === t ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100"
        ),
        onClick: E,
        "aria-disabled": e === t,
        children: /* @__PURE__ */ c(xt, { size: 12 })
      }
    )
  ] });
  if (o && s && l) {
    const k = Math.min((e - 1) * s + 1, u || 0), C = Math.min(e * s, u || 0);
    return /* @__PURE__ */ D("div", { className: te("flex flex-col sm:flex-row justify-between items-center gap-4 w-full", i), children: [
      /* @__PURE__ */ D("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: [
        /* @__PURE__ */ D("div", { className: "flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ c("span", { className: "text-xs font-medium", children: "Mostrar" }),
          /* @__PURE__ */ c(
            or,
            {
              name: "itemsPerPage",
              options: o.map((_) => ({
                value: String(_),
                label: String(_)
              })),
              value: String(s),
              onChange: (_) => l(Number(_.target.value)),
              onBlur: () => {
              },
              size: "small",
              className: "!w-14 !h-6 !text-xs !py-0 !px-1! !border-none !bg-transparent !ring-0 focus:!ring-0 cursor-pointer font-bold text-gray-700",
              placeholder: ""
            }
          )
        ] }),
        u !== void 0 && /* @__PURE__ */ D(jt, { children: [
          /* @__PURE__ */ c("span", { className: "text-gray-300", children: "|" }),
          /* @__PURE__ */ D("span", { className: "text-xs", children: [
            /* @__PURE__ */ c("span", { className: "font-semibold text-gray-700", children: k }),
            " - ",
            /* @__PURE__ */ c("span", { className: "font-semibold text-gray-700", children: C }),
            " de ",
            /* @__PURE__ */ c("span", { className: "font-semibold text-gray-900", children: u })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c("nav", { "aria-label": "Pagination", children: w() })
    ] });
  }
  return /* @__PURE__ */ c("nav", { "aria-label": "Pagination", className: te("inline-flex", i), children: w() });
}
const It = (e, t) => t.split(".").reduce((r, n) => r && r[n], e), jl = (e) => e.toLocaleString("es-MX", {
  style: "currency",
  currency: "MXN"
});
function hd({
  columns: e,
  data: t,
  containerClassName: r,
  className: n,
  variant: a = "default",
  size: i = "md",
  itemsPerPageOptions: o = [5, 10, 20],
  defaultItemsPerPage: s = 10,
  title: l
}) {
  const [u, d] = ae(1), [p, b] = ae(s), [v, E] = ae({}), [y, M] = ae(null), k = Se.useMemo(() => y ? [...t].sort((T, A) => {
    var K, m;
    const V = It(T, y.key), $ = It(A, y.key);
    if (V == null || $ == null) return 0;
    let X = 0;
    const W = e.find((N) => N.key === y.key);
    if (!W || !W.sortable) return 0;
    switch (W.type) {
      case "number":
        X = V - $;
        break;
      case "date":
        X = new Date(V).getTime() - new Date($).getTime();
        break;
      case "boolean":
        X = V === $ ? 0 : V ? 1 : -1;
        break;
      case "catalog": {
        const N = (K = W.catalogOptions) == null ? void 0 : K.data.find(
          (S) => S.id === V
        ), f = (m = W.catalogOptions) == null ? void 0 : m.data.find(
          (S) => S.id === $
        );
        X = String((N == null ? void 0 : N.name) || V).localeCompare(
          String((f == null ? void 0 : f.name) || $)
        );
        break;
      }
      case "string":
      default:
        X = V.localeCompare($);
        break;
    }
    return y.direction === "asc" ? X : -X;
  }) : t, [t, y, e]).filter(
    (T) => e.every((A) => {
      if (!A.filter || v[A.key] === void 0 || v[A.key] === "")
        return !0;
      const V = It(T, A.key), $ = String(v[A.key]).toLowerCase();
      switch (A.type) {
        case "number":
          return String(V).includes($);
        case "boolean":
          return V === v[A.key];
        case "catalog": {
          if (!A.catalogOptions) return !0;
          const X = A.catalogOptions.data.find(
            (W) => String(W.id).toLowerCase().includes($) || W.name.toLowerCase().includes($)
          );
          return X ? V === X.id : !1;
        }
        case "string":
        default:
          return String(V).toLowerCase().includes($);
      }
    })
  ), C = Math.ceil(k.length / p), _ = k.slice(
    (u - 1) * p,
    u * p
  ), x = (T) => {
    T >= 1 && T <= C && d(T);
  }, h = (T) => {
    b(T), d(1);
  }, P = (T, A) => {
    E((V) => {
      if (A == null || A === "") {
        const $ = { ...V };
        return delete $[T], $;
      }
      return { ...V, [T]: A };
    }), d(1);
  }, g = (T) => {
    const A = e.find(($) => $.key === T);
    if (!A || !A.sortable) return;
    let V = "asc";
    (y == null ? void 0 : y.key) === T && y.direction === "asc" && (V = "desc"), M({ key: T, direction: V });
  }, q = (T) => {
    if (!T.filter) return null;
    if (T.type === "boolean") {
      const A = v[T.key], V = A === void 0 ? !0 : A === !0 ? !1 : void 0, $ = () => A === void 0 ? "Mostrar todos" : A === !0 ? "Filtrar solo verdaderos" : "Filtrar solo falsos";
      return /* @__PURE__ */ c(
        "button",
        {
          className: "flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-full p-1 transition-all duration-200",
          onClick: () => P(T.key, V),
          "aria-label": `${$()} para ${T.label}`,
          title: `${$()} para ${T.label}`,
          children: /* @__PURE__ */ c("div", { className: "relative w-10 h-5 bg-gray-300 rounded-full", children: /* @__PURE__ */ c(
            "div",
            {
              className: te(
                "absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 shadow-sm",
                {
                  "left-0.5 bg-gray-400": A === void 0,
                  "left-5 bg-slate-500": A === !0,
                  "left-0.5 bg-gray-500": A === !1
                }
              )
            }
          ) })
        }
      );
    }
    return T.filter === "catalog" && T.catalogOptions ? T.catalogOptions.loading ? /* @__PURE__ */ c(
      cl,
      {
        className: "animate-spin",
        "aria-label": "Cargando opciones",
        title: "Cargando opciones"
      }
    ) : T.catalogOptions.error ? /* @__PURE__ */ c("span", { className: "text-red-500 text-xs", children: "Error cargando" }) : /* @__PURE__ */ c(
      or,
      {
        name: `filter-${T.key}`,
        options: [
          { value: "", label: "Todos" },
          ...T.catalogOptions.data.map((A) => ({
            value: String(A.id),
            label: A.name
          }))
        ],
        value: String(v[T.key] || ""),
        onChange: (A) => {
          const V = A.target.value === "" ? void 0 : A.target.value;
          P(T.key, V);
        },
        onBlur: () => {
        },
        className: "w-full text-xs"
      }
    ) : /* @__PURE__ */ c(
      _t,
      {
        name: `filter-${T.key}`,
        className: "w-full text-xs",
        placeholder: "Buscar...",
        value: String(v[T.key] || ""),
        onChange: (A) => P(T.key, A.target.value),
        onBlur: () => {
        }
      }
    );
  }, J = (T, A) => {
    const V = It(A, T.key);
    if (T.render)
      return T.render(A);
    switch (T.type) {
      case "number":
        return typeof V == "number" && T.currencyMX ? jl(V) : V;
      case "boolean":
        return V ? /* @__PURE__ */ c(
          jr,
          {
            className: "text-green-500",
            "aria-label": "Verdadero",
            title: "Verdadero"
          }
        ) : /* @__PURE__ */ c(
          Fr,
          {
            className: "text-red-500",
            "aria-label": "Falso",
            title: "Falso"
          }
        );
      case "actions":
        return T.actions ? T.actions(A) : null;
      case "catalog":
        if (T.catalogOptions) {
          const $ = T.catalogOptions.data.find(
            (X) => X.id === V
          );
          return ($ == null ? void 0 : $.name) || V;
        }
        return V;
      default:
        return V;
    }
  };
  return /* @__PURE__ */ D("div", { className: te("space-y-4 w-full", r), children: [
    /* @__PURE__ */ D("div", { className: "bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden", children: [
      l && /* @__PURE__ */ c("div", { className: "bg-white px-6 py-5 border-b border-secondary-100", children: /* @__PURE__ */ c("h2", { className: "text-xl font-bold text-secondary-900 leading-tight", children: l }) }),
      /* @__PURE__ */ c("div", { className: "overflow-x-auto", children: /* @__PURE__ */ D(
        "table",
        {
          className: te(
            "min-w-max w-full text-sm text-left text-secondary-600",
            Nl[a],
            Tl[i]
          ),
          children: [
            /* @__PURE__ */ c("thead", { children: /* @__PURE__ */ c("tr", { className: "bg-secondary-50 border-b border-secondary-200 text-xs uppercase tracking-wider font-semibold text-secondary-500", children: e.map((T) => /* @__PURE__ */ c(
              "th",
              {
                scope: "col",
                className: te("px-4 py-4 align-top", T.className),
                children: /* @__PURE__ */ D("div", { className: "flex flex-col gap-3 min-w-[150px]", children: [
                  /* @__PURE__ */ D("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ c("span", { className: "text-secondary-700 font-bold", children: T.label }),
                    T.sortable && T.type !== "actions" && /* @__PURE__ */ c(
                      "button",
                      {
                        onClick: () => g(T.key),
                        className: `p-1 rounded-md transition-colors ${(y == null ? void 0 : y.key) === T.key ? "bg-secondary-200 text-secondary-900" : "hover:bg-secondary-200 text-secondary-400 hover:text-secondary-700"}`,
                        title: `Ordenar por ${T.label}`,
                        children: /* @__PURE__ */ c(El, { className: "w-4 h-4", "aria-hidden": "true" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c("div", { className: "w-full", children: T.filter ? q(T) : null })
                ] })
              },
              T.key
            )) }) }),
            /* @__PURE__ */ c("tbody", { className: "divide-y divide-secondary-100", children: _.length > 0 ? _.map((T, A) => /* @__PURE__ */ c(
              "tr",
              {
                className: "hover:bg-secondary-50/50 transition-colors duration-150 group",
                children: e.map((V) => /* @__PURE__ */ c(
                  "td",
                  {
                    className: te("px-4 py-3 align-middle", V.className),
                    children: V.type === "actions" ? /* @__PURE__ */ c("div", { className: "flex items-center justify-center gap-2", children: J(V, T) }) : /* @__PURE__ */ c("div", { className: "text-secondary-700 font-medium", children: J(V, T) })
                  },
                  `${A}-${V.key}`
                ))
              },
              A
            )) : /* @__PURE__ */ c("tr", { children: /* @__PURE__ */ c("td", { colSpan: e.length, className: "px-6 py-12 text-center", children: /* @__PURE__ */ D("div", { className: "flex flex-col items-center justify-center text-secondary-400", children: [
              /* @__PURE__ */ c("span", { className: "text-lg", children: "No se encontraron resultados" }),
              /* @__PURE__ */ c("span", { className: "text-sm mt-1", children: "Intenta ajustar los filtros" })
            ] }) }) }) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ c("div", { className: "bg-white rounded-b-xl border-t border-secondary-200 px-6 py-4", children: /* @__PURE__ */ c(
      Ol,
      {
        currentPage: u,
        totalPages: C || 1,
        onPageChange: x,
        color: "primary",
        itemsPerPageOptions: o,
        itemsPerPage: p,
        onItemsPerPageChange: h,
        totalItems: k.length
      }
    ) })
  ] });
}
const Dl = {
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 transform -translate-x-1/2",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  "bottom-left": "bottom-4 left-4"
};
function gd({
  message: e,
  type: t = "info",
  duration: r = 1500,
  position: n = "top-right",
  onClose: a
}) {
  const [i, o] = ae(!0);
  ye(() => {
    const p = setTimeout(() => {
      o(!1), setTimeout(() => {
        a && a();
      }, 300);
    }, r);
    return () => clearTimeout(p);
  }, [r, a]);
  const s = () => {
    o(!1), setTimeout(() => {
      a && a();
    }, 300);
  }, u = t in z.colors ? z.colors[t][500] : z.colors.primary[500], d = () => {
    switch (t) {
      case "success":
        return /* @__PURE__ */ c(il, { className: "w-5 h-5 flex-shrink-0" });
      case "error":
      case "danger":
        return /* @__PURE__ */ c(dl, { className: "w-5 h-5 flex-shrink-0" });
      case "warning":
        return /* @__PURE__ */ c(sl, { className: "w-5 h-5 flex-shrink-0" });
      case "info":
      default:
        return /* @__PURE__ */ c(ll, { className: "w-5 h-5 flex-shrink-0" });
    }
  };
  return /* @__PURE__ */ D(
    "div",
    {
      className: te(
        "fixed z-50 p-4 rounded-xl shadow-xl flex items-center justify-between gap-4 transition-all duration-300 text-white min-w-[300px]",
        Dl[n],
        {
          "opacity-100 translate-y-0 scale-100": i,
          "opacity-0 scale-95": !i,
          "-translate-y-4": !i && n.startsWith("top"),
          "translate-y-4": !i && n.startsWith("bottom")
        }
      ),
      style: { backgroundColor: u },
      role: "alert",
      children: [
        /* @__PURE__ */ D("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ c(d, {}),
          /* @__PURE__ */ c("span", { className: "font-medium text-sm sm:text-base leading-snug", children: e })
        ] }),
        /* @__PURE__ */ c(
          "button",
          {
            onClick: s,
            className: "p-1.5 rounded-full hover:bg-black/15 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50",
            "aria-label": "Close notification",
            children: /* @__PURE__ */ c(Fr, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
function bd({
  logo: e,
  logoText: t,
  navigationItems: r = [],
  userMenu: n,
  children: a,
  // Legacy props for backward compatibility
  navItems: i,
  showSidebar: o = !1,
  showSidebarOnMobile: s = !1,
  sidebarItems: l
}) {
  const [u, d] = ae(!1), [p, b] = ae(/* @__PURE__ */ new Set()), v = Ne(null);
  Lr(v, () => d(!1));
  const E = () => {
    d(!u);
  }, y = (k) => {
    const C = new Set(p);
    C.has(k) ? C.delete(k) : C.add(k), b(C);
  }, M = (k) => {
    k.subitems && k.subitems.length > 0 ? y(k.id) : k.action && k.action();
  };
  return !r.length && (i || l) ? /* @__PURE__ */ D("div", { className: "flex flex-col h-screen", children: [
    /* @__PURE__ */ c("nav", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ D("div", { className: "flex items-center justify-between mx-auto p-4", children: [
      /* @__PURE__ */ D("div", { className: "flex items-center space-x-3 rtl:space-x-reverse", children: [
        e && /* @__PURE__ */ c("div", { className: "h-8", children: e }),
        t && /* @__PURE__ */ c("span", { className: "self-center text-2xl font-semibold whitespace-nowrap text-gray-900", children: t })
      ] }),
      /* @__PURE__ */ c("div", { className: "flex items-center justify-end w-full md:w-auto md:order-2", children: /* @__PURE__ */ D("div", { className: "flex items-center space-x-4 md:order-2", children: [
        /* @__PURE__ */ c("ul", { className: "hidden md:flex space-x-4", children: i }),
        n && /* @__PURE__ */ D("div", { className: "relative", children: [
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: "flex text-sm bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300",
              onClick: E,
              children: n.userImage ? /* @__PURE__ */ c(
                "img",
                {
                  className: "w-8 h-8 rounded-full",
                  src: n.userImage,
                  alt: "user photo"
                }
              ) : /* @__PURE__ */ c(Dr, { className: "w-8 h-8 text-gray-500" })
            }
          ),
          u && /* @__PURE__ */ D(
            "div",
            {
              ref: v,
              className: "z-50 absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm",
              children: [
                /* @__PURE__ */ D("div", { className: "px-4 py-3", children: [
                  /* @__PURE__ */ c("span", { className: "block text-sm text-gray-900", children: n.userName }),
                  /* @__PURE__ */ c("span", { className: "block text-sm text-gray-500 truncate", children: n.userEmail })
                ] }),
                /* @__PURE__ */ c("ul", { className: "py-2", children: n.menuItems.map((k, C) => /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(
                  "button",
                  {
                    onClick: () => {
                      k.onClick(), d(!1);
                    },
                    className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left",
                    children: k.label
                  }
                ) }, C)) })
              ]
            }
          )
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ D("div", { className: "flex-1 flex overflow-hidden relative", children: [
      (o || s) && /* @__PURE__ */ c("aside", { className: "fixed inset-y-0 left-0 w-64 bg-gray-50 transform transition-transform duration-300 ease-in-out z-50 shadow-lg md:static md:transform-none md:shadow-none md:border-r md:border-gray-200", children: /* @__PURE__ */ c("div", { className: "h-full overflow-y-auto py-4 px-3", children: /* @__PURE__ */ c("ul", { className: "space-y-2 font-medium", children: l }) }) }),
      /* @__PURE__ */ c("main", { className: "flex-1 bg-gray-100 overflow-y-auto", children: a })
    ] })
  ] }) : /* @__PURE__ */ D("div", { className: "flex h-screen bg-gray-50 font-sans", children: [
    /* @__PURE__ */ D("aside", { className: "w-72 bg-secondary-900 shadow-xl flex flex-col transition-all duration-300 ease-in-out", children: [
      /* @__PURE__ */ D("div", { className: "p-6 border-b border-secondary-800/50 flex items-center gap-3", children: [
        e && /* @__PURE__ */ c("div", { className: "h-8 w-auto object-contain transition-transform hover:scale-105", children: e }),
        t && /* @__PURE__ */ c("span", { className: "text-lg font-bold text-white tracking-wide", children: t })
      ] }),
      /* @__PURE__ */ c("nav", { className: "flex-1 px-4 py-6 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ c("ul", { className: "space-y-1.5", children: r.map((k) => /* @__PURE__ */ D("li", { children: [
        /* @__PURE__ */ D(
          "div",
          {
            className: `group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${k.isActive ? "bg-secondary-800/60 border-primary-500 text-white shadow-sm" : "border-transparent text-secondary-400 hover:bg-secondary-800 hover:text-white"}`,
            onClick: () => M(k),
            children: [
              /* @__PURE__ */ D("div", { className: "flex items-center gap-3", children: [
                k.icon && /* @__PURE__ */ c("div", { className: `text-xl transition-colors ${k.isActive ? "text-primary-400" : "text-secondary-500 group-hover:text-white"}`, children: k.icon }),
                /* @__PURE__ */ c("span", { className: `font-medium text-sm ${k.isActive ? "font-semibold" : ""}`, children: k.label })
              ] }),
              k.subitems && k.subitems.length > 0 && /* @__PURE__ */ c("div", { className: "text-secondary-500 group-hover:text-white transition-transform", children: p.has(k.id) ? /* @__PURE__ */ c(ha, { className: "w-3 h-3" }) : /* @__PURE__ */ c(xt, { className: "w-3 h-3" }) })
            ]
          }
        ),
        k.subitems && k.subitems.length > 0 && p.has(k.id) && /* @__PURE__ */ c("ul", { className: "mt-1 ml-4 pl-4 border-l border-secondary-800 space-y-1", children: k.subitems.map((C) => /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(
          "button",
          {
            onClick: C.action,
            className: `block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${C.isActive ? "text-primary-400 font-medium bg-secondary-800/30" : "text-secondary-400 hover:text-white hover:bg-secondary-800/30"}`,
            children: C.label
          }
        ) }, C.id)) })
      ] }, k.id)) }) }),
      n && /* @__PURE__ */ c("div", { className: "p-4 border-t border-secondary-800", children: /* @__PURE__ */ D("div", { className: "relative", children: [
        /* @__PURE__ */ D(
          "button",
          {
            type: "button",
            className: "flex items-center gap-3 w-full p-3 rounded-xl hover:bg-secondary-800 transition-colors duration-200 group",
            onClick: E,
            children: [
              n.userImage ? /* @__PURE__ */ c(
                "img",
                {
                  className: "w-10 h-10 rounded-full border-2 border-secondary-700 group-hover:border-primary-500 transition-colors",
                  src: n.userImage,
                  alt: "user photo"
                }
              ) : /* @__PURE__ */ c("div", { className: "w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center text-secondary-400 group-hover:text-white group-hover:bg-secondary-700 transition-colors", children: /* @__PURE__ */ c(Dr, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ D("div", { className: "flex-1 text-left overflow-hidden", children: [
                /* @__PURE__ */ c("div", { className: "text-white font-medium text-sm truncate group-hover:text-primary-400 transition-colors", children: n.userName }),
                /* @__PURE__ */ c("div", { className: "text-secondary-500 text-xs truncate", children: n.userEmail })
              ] }),
              /* @__PURE__ */ c(xt, { className: "text-secondary-600 w-3 h-3 group-hover:text-white transition-colors" })
            ]
          }
        ),
        u && /* @__PURE__ */ D(
          "div",
          {
            ref: v,
            className: "absolute bottom-full left-0 mb-3 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-200 origin-bottom",
            children: [
              /* @__PURE__ */ D("div", { className: "bg-gray-50 px-4 py-3 border-b border-gray-100", children: [
                /* @__PURE__ */ c("span", { className: "block text-sm font-semibold text-gray-800", children: n.userName }),
                /* @__PURE__ */ c("span", { className: "block text-xs text-gray-500 truncate", children: n.userEmail })
              ] }),
              /* @__PURE__ */ c("ul", { className: "py-1", children: n.menuItems.map((k, C) => /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(
                "button",
                {
                  onClick: () => {
                    k.onClick(), d(!1);
                  },
                  className: "flex items-center w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors",
                  children: k.label
                }
              ) }, C)) })
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ c("main", { className: "flex-1 overflow-y-auto bg-gray-50/50 relative", children: a })
  ] });
}
function vd({ children: e, className: t = "" }) {
  return /* @__PURE__ */ c("p", { className: `${t} text-gray-900 `, children: e });
}
const xd = ({
  src: e,
  alt: t,
  className: r = "",
  fallbackSrc: n = ""
}) => {
  const [a, i] = ae(!1), o = () => {
    i(!0);
  };
  return /* @__PURE__ */ c(
    "div",
    {
      className: `${r} flex items-center justify-center bg-transparent`,
      children: a ? /* @__PURE__ */ c(
        "img",
        {
          src: n,
          alt: "Fallback",
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ c(
        "img",
        {
          src: e,
          alt: t,
          onError: o,
          className: "w-full h-full object-cover"
        }
      )
    }
  );
}, Ml = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-1.5",
  large: "text-base px-4 py-2"
};
function yd({
  children: e,
  label: t,
  color: r = "primary",
  size: n = "medium",
  variant: a = "filled",
  className: i
}) {
  const o = z.badge || {}, s = o[r] || o.primary || {}, l = () => {
    const u = {
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      padding: s.padding,
      borderRadius: s.borderRadius,
      // '9999px' in theme
      borderWidth: "1px",
      // Default border width for consistency
      borderStyle: "solid",
      borderColor: "transparent",
      // Default transparent
      transition: "all 0.2s"
    };
    return a === "filled" ? (u.backgroundColor = s.backgroundColor, u.color = s.color, u.borderColor = s.borderColor || "transparent") : a === "outlined" && (u.backgroundColor = "transparent", u.color = s.color, u.borderColor = s.color), u;
  };
  return /* @__PURE__ */ c(
    "span",
    {
      className: te(
        "inline-flex items-center justify-center",
        // Fallback size if theme doesn't have it (though theme does have it for primary)
        s.padding ? "" : Ml[n],
        i
      ),
      style: l(),
      children: e || /* @__PURE__ */ c("span", { className: te("font-semibold"), children: t })
    }
  );
}
var hr, gn;
function _l() {
  if (gn) return hr;
  gn = 1;
  function e(w) {
    this._maxSize = w, this.clear();
  }
  e.prototype.clear = function() {
    this._size = 0, this._values = /* @__PURE__ */ Object.create(null);
  }, e.prototype.get = function(w) {
    return this._values[w];
  }, e.prototype.set = function(w, k) {
    return this._size >= this._maxSize && this.clear(), w in this._values || this._size++, this._values[w] = k;
  };
  var t = /[^.^\]^[]+|(?=\[\]|\.\.)/g, r = /^\d+$/, n = /^\d/, a = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g, i = /^\s*(['"]?)(.*?)(\1)\s*$/, o = 512, s = new e(o), l = new e(o), u = new e(o);
  hr = {
    Cache: e,
    split: p,
    normalizePath: d,
    setter: function(w) {
      var k = d(w);
      return l.get(w) || l.set(w, function(_, x) {
        for (var h = 0, P = k.length, g = _; h < P - 1; ) {
          var q = k[h];
          if (q === "__proto__" || q === "constructor" || q === "prototype")
            return _;
          g = g[k[h++]];
        }
        g[k[h]] = x;
      });
    },
    getter: function(w, k) {
      var C = d(w);
      return u.get(w) || u.set(w, function(x) {
        for (var h = 0, P = C.length; h < P; )
          if (x != null || !k) x = x[C[h++]];
          else return;
        return x;
      });
    },
    join: function(w) {
      return w.reduce(function(k, C) {
        return k + (v(C) || r.test(C) ? "[" + C + "]" : (k ? "." : "") + C);
      }, "");
    },
    forEach: function(w, k, C) {
      b(Array.isArray(w) ? w : p(w), k, C);
    }
  };
  function d(w) {
    return s.get(w) || s.set(
      w,
      p(w).map(function(k) {
        return k.replace(i, "$2");
      })
    );
  }
  function p(w) {
    return w.match(t) || [""];
  }
  function b(w, k, C) {
    var _ = w.length, x, h, P, g;
    for (h = 0; h < _; h++)
      x = w[h], x && (M(x) && (x = '"' + x + '"'), g = v(x), P = !g && /^\d+$/.test(x), k.call(C, x, g, P, h, w));
  }
  function v(w) {
    return typeof w == "string" && w && ["'", '"'].indexOf(w.charAt(0)) !== -1;
  }
  function E(w) {
    return w.match(n) && !w.match(r);
  }
  function y(w) {
    return a.test(w);
  }
  function M(w) {
    return !v(w) && (E(w) || y(w));
  }
  return hr;
}
var it = _l(), gr, bn;
function Pl() {
  if (bn) return gr;
  bn = 1;
  const e = /[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['’](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['’](?:D|LL|M|RE|S|T|VE))?|\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])|\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g, t = (d) => d.match(e) || [], r = (d) => d[0].toUpperCase() + d.slice(1), n = (d, p) => t(d).join(p).toLowerCase(), a = (d) => t(d).reduce(
    (p, b) => `${p}${p ? b[0].toUpperCase() + b.slice(1).toLowerCase() : b.toLowerCase()}`,
    ""
  );
  return gr = {
    words: t,
    upperFirst: r,
    camelCase: a,
    pascalCase: (d) => r(a(d)),
    snakeCase: (d) => n(d, "_"),
    kebabCase: (d) => n(d, "-"),
    sentenceCase: (d) => r(n(d, " ")),
    titleCase: (d) => t(d).map(r).join(" ")
  }, gr;
}
var br = Pl(), Ft = { exports: {} }, vn;
function $l() {
  if (vn) return Ft.exports;
  vn = 1, Ft.exports = function(a) {
    return e(t(a), a);
  }, Ft.exports.array = e;
  function e(a, i) {
    var o = a.length, s = new Array(o), l = {}, u = o, d = r(i), p = n(a);
    for (i.forEach(function(v) {
      if (!p.has(v[0]) || !p.has(v[1]))
        throw new Error("Unknown node. There is an unknown node in the supplied edges.");
    }); u--; )
      l[u] || b(a[u], u, /* @__PURE__ */ new Set());
    return s;
    function b(v, E, y) {
      if (y.has(v)) {
        var M;
        try {
          M = ", node was:" + JSON.stringify(v);
        } catch {
          M = "";
        }
        throw new Error("Cyclic dependency" + M);
      }
      if (!p.has(v))
        throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(v));
      if (!l[E]) {
        l[E] = !0;
        var w = d.get(v) || /* @__PURE__ */ new Set();
        if (w = Array.from(w), E = w.length) {
          y.add(v);
          do {
            var k = w[--E];
            b(k, p.get(k), y);
          } while (E);
          y.delete(v);
        }
        s[--o] = v;
      }
    }
  }
  function t(a) {
    for (var i = /* @__PURE__ */ new Set(), o = 0, s = a.length; o < s; o++) {
      var l = a[o];
      i.add(l[0]), i.add(l[1]);
    }
    return Array.from(i);
  }
  function r(a) {
    for (var i = /* @__PURE__ */ new Map(), o = 0, s = a.length; o < s; o++) {
      var l = a[o];
      i.has(l[0]) || i.set(l[0], /* @__PURE__ */ new Set()), i.has(l[1]) || i.set(l[1], /* @__PURE__ */ new Set()), i.get(l[0]).add(l[1]);
    }
    return i;
  }
  function n(a) {
    for (var i = /* @__PURE__ */ new Map(), o = 0, s = a.length; o < s; o++)
      i.set(a[o], o);
    return i;
  }
  return Ft.exports;
}
var zl = $l();
const Al = /* @__PURE__ */ rr(zl), Rl = Object.prototype.toString, Il = Error.prototype.toString, Fl = RegExp.prototype.toString, Ll = typeof Symbol < "u" ? Symbol.prototype.toString : () => "", Wl = /^Symbol\((.*)\)(.*)$/;
function ql(e) {
  return e != +e ? "NaN" : e === 0 && 1 / e < 0 ? "-0" : "" + e;
}
function xn(e, t = !1) {
  if (e == null || e === !0 || e === !1) return "" + e;
  const r = typeof e;
  if (r === "number") return ql(e);
  if (r === "string") return t ? `"${e}"` : e;
  if (r === "function") return "[Function " + (e.name || "anonymous") + "]";
  if (r === "symbol") return Ll.call(e).replace(Wl, "Symbol($1)");
  const n = Rl.call(e).slice(8, -1);
  return n === "Date" ? isNaN(e.getTime()) ? "" + e : e.toISOString(e) : n === "Error" || e instanceof Error ? "[" + Il.call(e) + "]" : n === "RegExp" ? Fl.call(e) : null;
}
function Je(e, t) {
  let r = xn(e, t);
  return r !== null ? r : JSON.stringify(e, function(n, a) {
    let i = xn(this[n], t);
    return i !== null ? i : a;
  }, 2);
}
function ya(e) {
  return e == null ? [] : [].concat(e);
}
let wa, ka, Ca, Vl = /\$\{\s*(\w+)\s*\}/g;
wa = Symbol.toStringTag;
class yn {
  constructor(t, r, n, a) {
    this.name = void 0, this.message = void 0, this.value = void 0, this.path = void 0, this.type = void 0, this.params = void 0, this.errors = void 0, this.inner = void 0, this[wa] = "Error", this.name = "ValidationError", this.value = r, this.path = n, this.type = a, this.errors = [], this.inner = [], ya(t).forEach((i) => {
      if (_e.isError(i)) {
        this.errors.push(...i.errors);
        const o = i.inner.length ? i.inner : [i];
        this.inner.push(...o);
      } else
        this.errors.push(i);
    }), this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
  }
}
ka = Symbol.hasInstance;
Ca = Symbol.toStringTag;
class _e extends Error {
  static formatError(t, r) {
    const n = r.label || r.path || "this";
    return r = Object.assign({}, r, {
      path: n,
      originalPath: r.path
    }), typeof t == "string" ? t.replace(Vl, (a, i) => Je(r[i])) : typeof t == "function" ? t(r) : t;
  }
  static isError(t) {
    return t && t.name === "ValidationError";
  }
  constructor(t, r, n, a, i) {
    const o = new yn(t, r, n, a);
    if (i)
      return o;
    super(), this.value = void 0, this.path = void 0, this.type = void 0, this.params = void 0, this.errors = [], this.inner = [], this[Ca] = "Error", this.name = o.name, this.message = o.message, this.type = o.type, this.value = o.value, this.path = o.path, this.errors = o.errors, this.inner = o.inner, Error.captureStackTrace && Error.captureStackTrace(this, _e);
  }
  static [ka](t) {
    return yn[Symbol.hasInstance](t) || super[Symbol.hasInstance](t);
  }
}
let Ge = {
  default: "${path} is invalid",
  required: "${path} is a required field",
  defined: "${path} must be defined",
  notNull: "${path} cannot be null",
  oneOf: "${path} must be one of the following values: ${values}",
  notOneOf: "${path} must not be one of the following values: ${values}",
  notType: ({
    path: e,
    type: t,
    value: r,
    originalValue: n
  }) => {
    const a = n != null && n !== r ? ` (cast from the value \`${Je(n, !0)}\`).` : ".";
    return t !== "mixed" ? `${e} must be a \`${t}\` type, but the final value was: \`${Je(r, !0)}\`` + a : `${e} must match the configured type. The validated value was: \`${Je(r, !0)}\`` + a;
  }
}, Hl = {
  length: "${path} must be exactly ${length} characters",
  min: "${path} must be at least ${min} characters",
  max: "${path} must be at most ${max} characters",
  matches: '${path} must match the following: "${regex}"',
  email: "${path} must be a valid email",
  url: "${path} must be a valid URL",
  uuid: "${path} must be a valid UUID",
  datetime: "${path} must be a valid ISO date-time",
  datetime_precision: "${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits",
  datetime_offset: '${path} must be a valid ISO date-time with UTC "Z" timezone',
  trim: "${path} must be a trimmed string",
  lowercase: "${path} must be a lowercase string",
  uppercase: "${path} must be a upper case string"
}, Yl = {
  min: "${path} must be greater than or equal to ${min}",
  max: "${path} must be less than or equal to ${max}",
  lessThan: "${path} must be less than ${less}",
  moreThan: "${path} must be greater than ${more}",
  positive: "${path} must be a positive number",
  negative: "${path} must be a negative number",
  integer: "${path} must be an integer"
}, _r = {
  min: "${path} field must be later than ${min}",
  max: "${path} field must be at earlier than ${max}"
}, Bl = {
  isValue: "${path} field must be ${value}"
}, Yt = {
  noUnknown: "${path} field has unspecified keys: ${unknown}",
  exact: "${path} object contains unknown properties: ${properties}"
}, Ul = {
  min: "${path} field must have at least ${min} items",
  max: "${path} field must have less than or equal to ${max} items",
  length: "${path} must have ${length} items"
}, Gl = {
  notType: (e) => {
    const {
      path: t,
      value: r,
      spec: n
    } = e, a = n.types.length;
    if (Array.isArray(r)) {
      if (r.length < a) return `${t} tuple value has too few items, expected a length of ${a} but got ${r.length} for value: \`${Je(r, !0)}\``;
      if (r.length > a) return `${t} tuple value has too many items, expected a length of ${a} but got ${r.length} for value: \`${Je(r, !0)}\``;
    }
    return _e.formatError(Ge.notType, e);
  }
};
Object.assign(/* @__PURE__ */ Object.create(null), {
  mixed: Ge,
  string: Hl,
  number: Yl,
  date: _r,
  object: Yt,
  array: Ul,
  boolean: Bl,
  tuple: Gl
});
const Wr = (e) => e && e.__isYupSchema__;
class Qt {
  static fromOptions(t, r) {
    if (!r.then && !r.otherwise) throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");
    let {
      is: n,
      then: a,
      otherwise: i
    } = r, o = typeof n == "function" ? n : (...s) => s.every((l) => l === n);
    return new Qt(t, (s, l) => {
      var u;
      let d = o(...s) ? a : i;
      return (u = d == null ? void 0 : d(l)) != null ? u : l;
    });
  }
  constructor(t, r) {
    this.fn = void 0, this.refs = t, this.refs = t, this.fn = r;
  }
  resolve(t, r) {
    let n = this.refs.map((i) => (
      // TODO: ? operator here?
      i.getValue(r == null ? void 0 : r.value, r == null ? void 0 : r.parent, r == null ? void 0 : r.context)
    )), a = this.fn(n, t, r);
    if (a === void 0 || // @ts-ignore this can be base
    a === t)
      return t;
    if (!Wr(a)) throw new TypeError("conditions must return a schema object");
    return a.resolve(r);
  }
}
const Lt = {
  context: "$",
  value: "."
};
class st {
  constructor(t, r = {}) {
    if (this.key = void 0, this.isContext = void 0, this.isValue = void 0, this.isSibling = void 0, this.path = void 0, this.getter = void 0, this.map = void 0, typeof t != "string") throw new TypeError("ref must be a string, got: " + t);
    if (this.key = t.trim(), t === "") throw new TypeError("ref must be a non-empty string");
    this.isContext = this.key[0] === Lt.context, this.isValue = this.key[0] === Lt.value, this.isSibling = !this.isContext && !this.isValue;
    let n = this.isContext ? Lt.context : this.isValue ? Lt.value : "";
    this.path = this.key.slice(n.length), this.getter = this.path && it.getter(this.path, !0), this.map = r.map;
  }
  getValue(t, r, n) {
    let a = this.isContext ? n : this.isValue ? t : r;
    return this.getter && (a = this.getter(a || {})), this.map && (a = this.map(a)), a;
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {Object=} options.context
   * @param {Object=} options.parent
   */
  cast(t, r) {
    return this.getValue(t, r == null ? void 0 : r.parent, r == null ? void 0 : r.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: "ref",
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(t) {
    return t && t.__isYupRef;
  }
}
st.prototype.__isYupRef = !0;
const Na = (e) => e == null;
function mt(e) {
  function t({
    value: r,
    path: n = "",
    options: a,
    originalValue: i,
    schema: o
  }, s, l) {
    const {
      name: u,
      test: d,
      params: p,
      message: b,
      skipAbsent: v
    } = e;
    let {
      parent: E,
      context: y,
      abortEarly: M = o.spec.abortEarly,
      disableStackTrace: w = o.spec.disableStackTrace
    } = a;
    function k(T) {
      return st.isRef(T) ? T.getValue(r, E, y) : T;
    }
    function C(T = {}) {
      const A = Object.assign({
        value: r,
        originalValue: i,
        label: o.spec.label,
        path: T.path || n,
        spec: o.spec,
        disableStackTrace: T.disableStackTrace || w
      }, p, T.params);
      for (const $ of Object.keys(A)) A[$] = k(A[$]);
      const V = new _e(_e.formatError(T.message || b, A), r, A.path, T.type || u, A.disableStackTrace);
      return V.params = A, V;
    }
    const _ = M ? s : l;
    let x = {
      path: n,
      parent: E,
      type: u,
      from: a.from,
      createError: C,
      resolve: k,
      options: a,
      originalValue: i,
      schema: o
    };
    const h = (T) => {
      _e.isError(T) ? _(T) : T ? l(null) : _(C());
    }, P = (T) => {
      _e.isError(T) ? _(T) : s(T);
    };
    if (v && Na(r))
      return h(!0);
    let q;
    try {
      var J;
      if (q = d.call(x, r, x), typeof ((J = q) == null ? void 0 : J.then) == "function") {
        if (a.sync)
          throw new Error(`Validation test of type: "${x.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);
        return Promise.resolve(q).then(h, P);
      }
    } catch (T) {
      P(T);
      return;
    }
    h(q);
  }
  return t.OPTIONS = e, t;
}
function Xl(e, t, r, n = r) {
  let a, i, o;
  return t ? (it.forEach(t, (s, l, u) => {
    let d = l ? s.slice(1, s.length - 1) : s;
    e = e.resolve({
      context: n,
      parent: a,
      value: r
    });
    let p = e.type === "tuple", b = u ? parseInt(d, 10) : 0;
    if (e.innerType || p) {
      if (p && !u) throw new Error(`Yup.reach cannot implicitly index into a tuple type. the path part "${o}" must contain an index to the tuple element, e.g. "${o}[0]"`);
      if (r && b >= r.length)
        throw new Error(`Yup.reach cannot resolve an array item at index: ${s}, in the path: ${t}. because there is no value at that index. `);
      a = r, r = r && r[b], e = p ? e.spec.types[b] : e.innerType;
    }
    if (!u) {
      if (!e.fields || !e.fields[d]) throw new Error(`The schema does not contain the path: ${t}. (failed at: ${o} which is a type: "${e.type}")`);
      a = r, r = r && r[d], e = e.fields[d];
    }
    i = d, o = l ? "[" + s + "]" : "." + s;
  }), {
    schema: e,
    parent: a,
    parentPath: i
  }) : {
    parent: a,
    parentPath: t,
    schema: e
  };
}
class Zt extends Set {
  describe() {
    const t = [];
    for (const r of this.values())
      t.push(st.isRef(r) ? r.describe() : r);
    return t;
  }
  resolveAll(t) {
    let r = [];
    for (const n of this.values())
      r.push(t(n));
    return r;
  }
  clone() {
    return new Zt(this.values());
  }
  merge(t, r) {
    const n = this.clone();
    return t.forEach((a) => n.add(a)), r.forEach((a) => n.delete(a)), n;
  }
}
function gt(e, t = /* @__PURE__ */ new Map()) {
  if (Wr(e) || !e || typeof e != "object") return e;
  if (t.has(e)) return t.get(e);
  let r;
  if (e instanceof Date)
    r = new Date(e.getTime()), t.set(e, r);
  else if (e instanceof RegExp)
    r = new RegExp(e), t.set(e, r);
  else if (Array.isArray(e)) {
    r = new Array(e.length), t.set(e, r);
    for (let n = 0; n < e.length; n++) r[n] = gt(e[n], t);
  } else if (e instanceof Map) {
    r = /* @__PURE__ */ new Map(), t.set(e, r);
    for (const [n, a] of e.entries()) r.set(n, gt(a, t));
  } else if (e instanceof Set) {
    r = /* @__PURE__ */ new Set(), t.set(e, r);
    for (const n of e) r.add(gt(n, t));
  } else if (e instanceof Object) {
    r = {}, t.set(e, r);
    for (const [n, a] of Object.entries(e)) r[n] = gt(a, t);
  } else
    throw Error(`Unable to clone ${e}`);
  return r;
}
class Xe {
  constructor(t) {
    this.type = void 0, this.deps = [], this.tests = void 0, this.transforms = void 0, this.conditions = [], this._mutate = void 0, this.internalTests = {}, this._whitelist = new Zt(), this._blacklist = new Zt(), this.exclusiveTests = /* @__PURE__ */ Object.create(null), this._typeCheck = void 0, this.spec = void 0, this.tests = [], this.transforms = [], this.withMutation(() => {
      this.typeError(Ge.notType);
    }), this.type = t.type, this._typeCheck = t.check, this.spec = Object.assign({
      strip: !1,
      strict: !1,
      abortEarly: !0,
      recursive: !0,
      disableStackTrace: !1,
      nullable: !1,
      optional: !0,
      coerce: !0
    }, t == null ? void 0 : t.spec), this.withMutation((r) => {
      r.nonNullable();
    });
  }
  // TODO: remove
  get _type() {
    return this.type;
  }
  clone(t) {
    if (this._mutate)
      return t && Object.assign(this.spec, t), this;
    const r = Object.create(Object.getPrototypeOf(this));
    return r.type = this.type, r._typeCheck = this._typeCheck, r._whitelist = this._whitelist.clone(), r._blacklist = this._blacklist.clone(), r.internalTests = Object.assign({}, this.internalTests), r.exclusiveTests = Object.assign({}, this.exclusiveTests), r.deps = [...this.deps], r.conditions = [...this.conditions], r.tests = [...this.tests], r.transforms = [...this.transforms], r.spec = gt(Object.assign({}, this.spec, t)), r;
  }
  label(t) {
    let r = this.clone();
    return r.spec.label = t, r;
  }
  meta(...t) {
    if (t.length === 0) return this.spec.meta;
    let r = this.clone();
    return r.spec.meta = Object.assign(r.spec.meta || {}, t[0]), r;
  }
  withMutation(t) {
    let r = this._mutate;
    this._mutate = !0;
    let n = t(this);
    return this._mutate = r, n;
  }
  concat(t) {
    if (!t || t === this) return this;
    if (t.type !== this.type && this.type !== "mixed") throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${t.type}`);
    let r = this, n = t.clone();
    const a = Object.assign({}, r.spec, n.spec);
    return n.spec = a, n.internalTests = Object.assign({}, r.internalTests, n.internalTests), n._whitelist = r._whitelist.merge(t._whitelist, t._blacklist), n._blacklist = r._blacklist.merge(t._blacklist, t._whitelist), n.tests = r.tests, n.exclusiveTests = r.exclusiveTests, n.withMutation((i) => {
      t.tests.forEach((o) => {
        i.test(o.OPTIONS);
      });
    }), n.transforms = [...r.transforms, ...n.transforms], n;
  }
  isType(t) {
    return t == null ? !!(this.spec.nullable && t === null || this.spec.optional && t === void 0) : this._typeCheck(t);
  }
  resolve(t) {
    let r = this;
    if (r.conditions.length) {
      let n = r.conditions;
      r = r.clone(), r.conditions = [], r = n.reduce((a, i) => i.resolve(a, t), r), r = r.resolve(t);
    }
    return r;
  }
  resolveOptions(t) {
    var r, n, a, i;
    return Object.assign({}, t, {
      from: t.from || [],
      strict: (r = t.strict) != null ? r : this.spec.strict,
      abortEarly: (n = t.abortEarly) != null ? n : this.spec.abortEarly,
      recursive: (a = t.recursive) != null ? a : this.spec.recursive,
      disableStackTrace: (i = t.disableStackTrace) != null ? i : this.spec.disableStackTrace
    });
  }
  /**
   * Run the configured transform pipeline over an input value.
   */
  cast(t, r = {}) {
    let n = this.resolve(Object.assign({
      value: t
    }, r)), a = r.assert === "ignore-optionality", i = n._cast(t, r);
    if (r.assert !== !1 && !n.isType(i)) {
      if (a && Na(i))
        return i;
      let o = Je(t), s = Je(i);
      throw new TypeError(`The value of ${r.path || "field"} could not be cast to a value that satisfies the schema type: "${n.type}". 

attempted value: ${o} 
` + (s !== o ? `result of cast: ${s}` : ""));
    }
    return i;
  }
  _cast(t, r) {
    let n = t === void 0 ? t : this.transforms.reduce((a, i) => i.call(this, a, t, this), t);
    return n === void 0 && (n = this.getDefault(r)), n;
  }
  _validate(t, r = {}, n, a) {
    let {
      path: i,
      originalValue: o = t,
      strict: s = this.spec.strict
    } = r, l = t;
    s || (l = this._cast(l, Object.assign({
      assert: !1
    }, r)));
    let u = [];
    for (let d of Object.values(this.internalTests))
      d && u.push(d);
    this.runTests({
      path: i,
      value: l,
      originalValue: o,
      options: r,
      tests: u
    }, n, (d) => {
      if (d.length)
        return a(d, l);
      this.runTests({
        path: i,
        value: l,
        originalValue: o,
        options: r,
        tests: this.tests
      }, n, a);
    });
  }
  /**
   * Executes a set of validations, either schema, produced Tests or a nested
   * schema validate result.
   */
  runTests(t, r, n) {
    let a = !1, {
      tests: i,
      value: o,
      originalValue: s,
      path: l,
      options: u
    } = t, d = (y) => {
      a || (a = !0, r(y, o));
    }, p = (y) => {
      a || (a = !0, n(y, o));
    }, b = i.length, v = [];
    if (!b) return p([]);
    let E = {
      value: o,
      originalValue: s,
      path: l,
      options: u,
      schema: this
    };
    for (let y = 0; y < i.length; y++) {
      const M = i[y];
      M(E, d, function(k) {
        k && (Array.isArray(k) ? v.push(...k) : v.push(k)), --b <= 0 && p(v);
      });
    }
  }
  asNestedTest({
    key: t,
    index: r,
    parent: n,
    parentPath: a,
    originalParent: i,
    options: o
  }) {
    const s = t ?? r;
    if (s == null)
      throw TypeError("Must include `key` or `index` for nested validations");
    const l = typeof s == "number";
    let u = n[s];
    const d = Object.assign({}, o, {
      // Nested validations fields are always strict:
      //    1. parent isn't strict so the casting will also have cast inner values
      //    2. parent is strict in which case the nested values weren't cast either
      strict: !0,
      parent: n,
      value: u,
      originalValue: i[s],
      // FIXME: tests depend on `index` being passed around deeply,
      //   we should not let the options.key/index bleed through
      key: void 0,
      // index: undefined,
      [l ? "index" : "key"]: s,
      path: l || s.includes(".") ? `${a || ""}[${l ? s : `"${s}"`}]` : (a ? `${a}.` : "") + t
    });
    return (p, b, v) => this.resolve(d)._validate(u, d, b, v);
  }
  validate(t, r) {
    var n;
    let a = this.resolve(Object.assign({}, r, {
      value: t
    })), i = (n = r == null ? void 0 : r.disableStackTrace) != null ? n : a.spec.disableStackTrace;
    return new Promise((o, s) => a._validate(t, r, (l, u) => {
      _e.isError(l) && (l.value = u), s(l);
    }, (l, u) => {
      l.length ? s(new _e(l, u, void 0, void 0, i)) : o(u);
    }));
  }
  validateSync(t, r) {
    var n;
    let a = this.resolve(Object.assign({}, r, {
      value: t
    })), i, o = (n = r == null ? void 0 : r.disableStackTrace) != null ? n : a.spec.disableStackTrace;
    return a._validate(t, Object.assign({}, r, {
      sync: !0
    }), (s, l) => {
      throw _e.isError(s) && (s.value = l), s;
    }, (s, l) => {
      if (s.length) throw new _e(s, t, void 0, void 0, o);
      i = l;
    }), i;
  }
  isValid(t, r) {
    return this.validate(t, r).then(() => !0, (n) => {
      if (_e.isError(n)) return !1;
      throw n;
    });
  }
  isValidSync(t, r) {
    try {
      return this.validateSync(t, r), !0;
    } catch (n) {
      if (_e.isError(n)) return !1;
      throw n;
    }
  }
  _getDefault(t) {
    let r = this.spec.default;
    return r == null ? r : typeof r == "function" ? r.call(this, t) : gt(r);
  }
  getDefault(t) {
    return this.resolve(t || {})._getDefault(t);
  }
  default(t) {
    return arguments.length === 0 ? this._getDefault() : this.clone({
      default: t
    });
  }
  strict(t = !0) {
    return this.clone({
      strict: t
    });
  }
  nullability(t, r) {
    const n = this.clone({
      nullable: t
    });
    return n.internalTests.nullable = mt({
      message: r,
      name: "nullable",
      test(a) {
        return a === null ? this.schema.spec.nullable : !0;
      }
    }), n;
  }
  optionality(t, r) {
    const n = this.clone({
      optional: t
    });
    return n.internalTests.optionality = mt({
      message: r,
      name: "optionality",
      test(a) {
        return a === void 0 ? this.schema.spec.optional : !0;
      }
    }), n;
  }
  optional() {
    return this.optionality(!0);
  }
  defined(t = Ge.defined) {
    return this.optionality(!1, t);
  }
  nullable() {
    return this.nullability(!0);
  }
  nonNullable(t = Ge.notNull) {
    return this.nullability(!1, t);
  }
  required(t = Ge.required) {
    return this.clone().withMutation((r) => r.nonNullable(t).defined(t));
  }
  notRequired() {
    return this.clone().withMutation((t) => t.nullable().optional());
  }
  transform(t) {
    let r = this.clone();
    return r.transforms.push(t), r;
  }
  /**
   * Adds a test function to the schema's queue of tests.
   * tests can be exclusive or non-exclusive.
   *
   * - exclusive tests, will replace any existing tests of the same name.
   * - non-exclusive: can be stacked
   *
   * If a non-exclusive test is added to a schema with an exclusive test of the same name
   * the exclusive test is removed and further tests of the same name will be stacked.
   *
   * If an exclusive test is added to a schema with non-exclusive tests of the same name
   * the previous tests are removed and further tests of the same name will replace each other.
   */
  test(...t) {
    let r;
    if (t.length === 1 ? typeof t[0] == "function" ? r = {
      test: t[0]
    } : r = t[0] : t.length === 2 ? r = {
      name: t[0],
      test: t[1]
    } : r = {
      name: t[0],
      message: t[1],
      test: t[2]
    }, r.message === void 0 && (r.message = Ge.default), typeof r.test != "function") throw new TypeError("`test` is a required parameters");
    let n = this.clone(), a = mt(r), i = r.exclusive || r.name && n.exclusiveTests[r.name] === !0;
    if (r.exclusive && !r.name)
      throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");
    return r.name && (n.exclusiveTests[r.name] = !!r.exclusive), n.tests = n.tests.filter((o) => !(o.OPTIONS.name === r.name && (i || o.OPTIONS.test === a.OPTIONS.test))), n.tests.push(a), n;
  }
  when(t, r) {
    !Array.isArray(t) && typeof t != "string" && (r = t, t = ".");
    let n = this.clone(), a = ya(t).map((i) => new st(i));
    return a.forEach((i) => {
      i.isSibling && n.deps.push(i.key);
    }), n.conditions.push(typeof r == "function" ? new Qt(a, r) : Qt.fromOptions(a, r)), n;
  }
  typeError(t) {
    let r = this.clone();
    return r.internalTests.typeError = mt({
      message: t,
      name: "typeError",
      skipAbsent: !0,
      test(n) {
        return this.schema._typeCheck(n) ? !0 : this.createError({
          params: {
            type: this.schema.type
          }
        });
      }
    }), r;
  }
  oneOf(t, r = Ge.oneOf) {
    let n = this.clone();
    return t.forEach((a) => {
      n._whitelist.add(a), n._blacklist.delete(a);
    }), n.internalTests.whiteList = mt({
      message: r,
      name: "oneOf",
      skipAbsent: !0,
      test(a) {
        let i = this.schema._whitelist, o = i.resolveAll(this.resolve);
        return o.includes(a) ? !0 : this.createError({
          params: {
            values: Array.from(i).join(", "),
            resolved: o
          }
        });
      }
    }), n;
  }
  notOneOf(t, r = Ge.notOneOf) {
    let n = this.clone();
    return t.forEach((a) => {
      n._blacklist.add(a), n._whitelist.delete(a);
    }), n.internalTests.blacklist = mt({
      message: r,
      name: "notOneOf",
      test(a) {
        let i = this.schema._blacklist, o = i.resolveAll(this.resolve);
        return o.includes(a) ? this.createError({
          params: {
            values: Array.from(i).join(", "),
            resolved: o
          }
        }) : !0;
      }
    }), n;
  }
  strip(t = !0) {
    let r = this.clone();
    return r.spec.strip = t, r;
  }
  /**
   * Return a serialized description of the schema including validations, flags, types etc.
   *
   * @param options Provide any needed context for resolving runtime schema alterations (lazy, when conditions, etc).
   */
  describe(t) {
    const r = (t ? this.resolve(t) : this).clone(), {
      label: n,
      meta: a,
      optional: i,
      nullable: o
    } = r.spec;
    return {
      meta: a,
      label: n,
      optional: i,
      nullable: o,
      default: r.getDefault(t),
      type: r.type,
      oneOf: r._whitelist.describe(),
      notOneOf: r._blacklist.describe(),
      tests: r.tests.map((l) => ({
        name: l.OPTIONS.name,
        params: l.OPTIONS.params
      })).filter((l, u, d) => d.findIndex((p) => p.name === l.name) === u)
    };
  }
}
Xe.prototype.__isYupSchema__ = !0;
for (const e of ["validate", "validateSync"]) Xe.prototype[`${e}At`] = function(t, r, n = {}) {
  const {
    parent: a,
    parentPath: i,
    schema: o
  } = Xl(this, t, r, n.context);
  return o[e](a && a[i], Object.assign({}, n, {
    parent: a,
    path: t
  }));
};
for (const e of ["equals", "is"]) Xe.prototype[e] = Xe.prototype.oneOf;
for (const e of ["not", "nope"]) Xe.prototype[e] = Xe.prototype.notOneOf;
const Kl = /^(\d{4}|[+-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,.](\d{1,}))?)?(?:(Z)|([+-])(\d{2})(?::?(\d{2}))?)?)?$/;
function Ql(e) {
  const t = Zl(e);
  if (!t) return Date.parse ? Date.parse(e) : Number.NaN;
  if (t.z === void 0 && t.plusMinus === void 0)
    return new Date(t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond).valueOf();
  let r = 0;
  return t.z !== "Z" && t.plusMinus !== void 0 && (r = t.hourOffset * 60 + t.minuteOffset, t.plusMinus === "+" && (r = 0 - r)), Date.UTC(t.year, t.month, t.day, t.hour, t.minute + r, t.second, t.millisecond);
}
function Zl(e) {
  var t, r;
  const n = Kl.exec(e);
  return n ? {
    year: Ue(n[1]),
    month: Ue(n[2], 1) - 1,
    day: Ue(n[3], 1),
    hour: Ue(n[4]),
    minute: Ue(n[5]),
    second: Ue(n[6]),
    millisecond: n[7] ? (
      // allow arbitrary sub-second precision beyond milliseconds
      Ue(n[7].substring(0, 3))
    ) : 0,
    precision: (t = (r = n[7]) == null ? void 0 : r.length) != null ? t : void 0,
    z: n[8] || void 0,
    plusMinus: n[9] || void 0,
    hourOffset: Ue(n[10]),
    minuteOffset: Ue(n[11])
  } : null;
}
function Ue(e, t = 0) {
  return Number(e) || t;
}
let Jl = /* @__PURE__ */ new Date(""), ec = (e) => Object.prototype.toString.call(e) === "[object Date]";
class qr extends Xe {
  constructor() {
    super({
      type: "date",
      check(t) {
        return ec(t) && !isNaN(t.getTime());
      }
    }), this.withMutation(() => {
      this.transform((t, r, n) => !n.spec.coerce || n.isType(t) || t === null ? t : (t = Ql(t), isNaN(t) ? qr.INVALID_DATE : new Date(t)));
    });
  }
  prepareParam(t, r) {
    let n;
    if (st.isRef(t))
      n = t;
    else {
      let a = this.cast(t);
      if (!this._typeCheck(a)) throw new TypeError(`\`${r}\` must be a Date or a value that can be \`cast()\` to a Date`);
      n = a;
    }
    return n;
  }
  min(t, r = _r.min) {
    let n = this.prepareParam(t, "min");
    return this.test({
      message: r,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      skipAbsent: !0,
      test(a) {
        return a >= this.resolve(n);
      }
    });
  }
  max(t, r = _r.max) {
    let n = this.prepareParam(t, "max");
    return this.test({
      message: r,
      name: "max",
      exclusive: !0,
      params: {
        max: t
      },
      skipAbsent: !0,
      test(a) {
        return a <= this.resolve(n);
      }
    });
  }
}
qr.INVALID_DATE = Jl;
function tc(e, t = []) {
  let r = [], n = /* @__PURE__ */ new Set(), a = new Set(t.map(([o, s]) => `${o}-${s}`));
  function i(o, s) {
    let l = it.split(o)[0];
    n.add(l), a.has(`${s}-${l}`) || r.push([s, l]);
  }
  for (const o of Object.keys(e)) {
    let s = e[o];
    n.add(o), st.isRef(s) && s.isSibling ? i(s.path, o) : Wr(s) && "deps" in s && s.deps.forEach((l) => i(l, o));
  }
  return Al.array(Array.from(n), r).reverse();
}
function wn(e, t) {
  let r = 1 / 0;
  return e.some((n, a) => {
    var i;
    if ((i = t.path) != null && i.includes(n))
      return r = a, !0;
  }), r;
}
function Ta(e) {
  return (t, r) => wn(e, t) - wn(e, r);
}
const rc = (e, t, r) => {
  if (typeof e != "string")
    return e;
  let n = e;
  try {
    n = JSON.parse(e);
  } catch {
  }
  return r.isType(n) ? n : e;
};
function Bt(e) {
  if ("fields" in e) {
    const t = {};
    for (const [r, n] of Object.entries(e.fields))
      t[r] = Bt(n);
    return e.setFields(t);
  }
  if (e.type === "array") {
    const t = e.optional();
    return t.innerType && (t.innerType = Bt(t.innerType)), t;
  }
  return e.type === "tuple" ? e.optional().clone({
    types: e.spec.types.map(Bt)
  }) : "optional" in e ? e.optional() : e;
}
const nc = (e, t) => {
  const r = [...it.normalizePath(t)];
  if (r.length === 1) return r[0] in e;
  let n = r.pop(), a = it.getter(it.join(r), !0)(e);
  return !!(a && n in a);
};
let kn = (e) => Object.prototype.toString.call(e) === "[object Object]";
function Cn(e, t) {
  let r = Object.keys(e.fields);
  return Object.keys(t).filter((n) => r.indexOf(n) === -1);
}
const ac = Ta([]);
function Ea(e) {
  return new Sa(e);
}
class Sa extends Xe {
  constructor(t) {
    super({
      type: "object",
      check(r) {
        return kn(r) || typeof r == "function";
      }
    }), this.fields = /* @__PURE__ */ Object.create(null), this._sortErrors = ac, this._nodes = [], this._excludedEdges = [], this.withMutation(() => {
      t && this.shape(t);
    });
  }
  _cast(t, r = {}) {
    var n;
    let a = super._cast(t, r);
    if (a === void 0) return this.getDefault(r);
    if (!this._typeCheck(a)) return a;
    let i = this.fields, o = (n = r.stripUnknown) != null ? n : this.spec.noUnknown, s = [].concat(this._nodes, Object.keys(a).filter((p) => !this._nodes.includes(p))), l = {}, u = Object.assign({}, r, {
      parent: l,
      __validating: r.__validating || !1
    }), d = !1;
    for (const p of s) {
      let b = i[p], v = p in a;
      if (b) {
        let E, y = a[p];
        u.path = (r.path ? `${r.path}.` : "") + p, b = b.resolve({
          value: y,
          context: r.context,
          parent: l
        });
        let M = b instanceof Xe ? b.spec : void 0, w = M == null ? void 0 : M.strict;
        if (M != null && M.strip) {
          d = d || p in a;
          continue;
        }
        E = !r.__validating || !w ? (
          // TODO: use _cast, this is double resolving
          b.cast(a[p], u)
        ) : a[p], E !== void 0 && (l[p] = E);
      } else v && !o && (l[p] = a[p]);
      (v !== p in l || l[p] !== a[p]) && (d = !0);
    }
    return d ? l : a;
  }
  _validate(t, r = {}, n, a) {
    let {
      from: i = [],
      originalValue: o = t,
      recursive: s = this.spec.recursive
    } = r;
    r.from = [{
      schema: this,
      value: o
    }, ...i], r.__validating = !0, r.originalValue = o, super._validate(t, r, n, (l, u) => {
      if (!s || !kn(u)) {
        a(l, u);
        return;
      }
      o = o || u;
      let d = [];
      for (let p of this._nodes) {
        let b = this.fields[p];
        !b || st.isRef(b) || d.push(b.asNestedTest({
          options: r,
          key: p,
          parent: u,
          parentPath: r.path,
          originalParent: o
        }));
      }
      this.runTests({
        tests: d,
        value: u,
        originalValue: o,
        options: r
      }, n, (p) => {
        a(p.sort(this._sortErrors).concat(l), u);
      });
    });
  }
  clone(t) {
    const r = super.clone(t);
    return r.fields = Object.assign({}, this.fields), r._nodes = this._nodes, r._excludedEdges = this._excludedEdges, r._sortErrors = this._sortErrors, r;
  }
  concat(t) {
    let r = super.concat(t), n = r.fields;
    for (let [a, i] of Object.entries(this.fields)) {
      const o = n[a];
      n[a] = o === void 0 ? i : o;
    }
    return r.withMutation((a) => (
      // XXX: excludes here is wrong
      a.setFields(n, [...this._excludedEdges, ...t._excludedEdges])
    ));
  }
  _getDefault(t) {
    if ("default" in this.spec)
      return super._getDefault(t);
    if (!this._nodes.length)
      return;
    let r = {};
    return this._nodes.forEach((n) => {
      var a;
      const i = this.fields[n];
      let o = t;
      (a = o) != null && a.value && (o = Object.assign({}, o, {
        parent: o.value,
        value: o.value[n]
      })), r[n] = i && "getDefault" in i ? i.getDefault(o) : void 0;
    }), r;
  }
  setFields(t, r) {
    let n = this.clone();
    return n.fields = t, n._nodes = tc(t, r), n._sortErrors = Ta(Object.keys(t)), r && (n._excludedEdges = r), n;
  }
  shape(t, r = []) {
    return this.clone().withMutation((n) => {
      let a = n._excludedEdges;
      return r.length && (Array.isArray(r[0]) || (r = [r]), a = [...n._excludedEdges, ...r]), n.setFields(Object.assign(n.fields, t), a);
    });
  }
  partial() {
    const t = {};
    for (const [r, n] of Object.entries(this.fields))
      t[r] = "optional" in n && n.optional instanceof Function ? n.optional() : n;
    return this.setFields(t);
  }
  deepPartial() {
    return Bt(this);
  }
  pick(t) {
    const r = {};
    for (const n of t)
      this.fields[n] && (r[n] = this.fields[n]);
    return this.setFields(r, this._excludedEdges.filter(([n, a]) => t.includes(n) && t.includes(a)));
  }
  omit(t) {
    const r = [];
    for (const n of Object.keys(this.fields))
      t.includes(n) || r.push(n);
    return this.pick(r);
  }
  from(t, r, n) {
    let a = it.getter(t, !0);
    return this.transform((i) => {
      if (!i) return i;
      let o = i;
      return nc(i, t) && (o = Object.assign({}, i), n || delete o[t], o[r] = a(i)), o;
    });
  }
  /** Parse an input JSON string to an object */
  json() {
    return this.transform(rc);
  }
  /**
   * Similar to `noUnknown` but only validates that an object is the right shape without stripping the unknown keys
   */
  exact(t) {
    return this.test({
      name: "exact",
      exclusive: !0,
      message: t || Yt.exact,
      test(r) {
        if (r == null) return !0;
        const n = Cn(this.schema, r);
        return n.length === 0 || this.createError({
          params: {
            properties: n.join(", ")
          }
        });
      }
    });
  }
  stripUnknown() {
    return this.clone({
      noUnknown: !0
    });
  }
  noUnknown(t = !0, r = Yt.noUnknown) {
    typeof t != "boolean" && (r = t, t = !0);
    let n = this.test({
      name: "noUnknown",
      exclusive: !0,
      message: r,
      test(a) {
        if (a == null) return !0;
        const i = Cn(this.schema, a);
        return !t || i.length === 0 || this.createError({
          params: {
            unknown: i.join(", ")
          }
        });
      }
    });
    return n.spec.noUnknown = t, n;
  }
  unknown(t = !0, r = Yt.noUnknown) {
    return this.noUnknown(!t, r);
  }
  transformKeys(t) {
    return this.transform((r) => {
      if (!r) return r;
      const n = {};
      for (const a of Object.keys(r)) n[t(a)] = r[a];
      return n;
    });
  }
  camelCase() {
    return this.transformKeys(br.camelCase);
  }
  snakeCase() {
    return this.transformKeys(br.snakeCase);
  }
  constantCase() {
    return this.transformKeys((t) => br.snakeCase(t).toUpperCase());
  }
  describe(t) {
    const r = (t ? this.resolve(t) : this).clone(), n = super.describe(t);
    n.fields = {};
    for (const [i, o] of Object.entries(r.fields)) {
      var a;
      let s = t;
      (a = s) != null && a.value && (s = Object.assign({}, s, {
        parent: s.value,
        value: s.value[i]
      })), n.fields[i] = o.describe(s);
    }
    return n;
  }
}
Ea.prototype = Sa.prototype;
const wd = (e) => Ea().shape(
  e.reduce((t, r) => (r.validation && (t[r.name] = r.validation), t), {})
), vr = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16"
};
function kd({
  size: e = "md",
  variant: t = "spinner",
  color: r = "primary",
  // Default to semantic primary
  className: n = ""
}) {
  const a = r in z.colors, i = a ? z.colors[r][500] : r, o = a || r.startsWith("#") || r.startsWith("rgb"), s = o ? { color: i } : {}, l = o ? { backgroundColor: i } : {}, u = o ? "" : r;
  return t === "spinner" ? /* @__PURE__ */ c(
    "div",
    {
      className: `inline-block ${vr[e]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${u} ${n}`,
      role: "status",
      style: s,
      children: /* @__PURE__ */ c("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]", children: "Loading..." })
    }
  ) : t === "dots" ? /* @__PURE__ */ c(
    "div",
    {
      className: `flex items-center justify-center space-x-2 ${n}`,
      children: [...Array(3)].map((d, p) => /* @__PURE__ */ c(
        "div",
        {
          className: `${vr[e.replace(/l|g/, "")]} animate-bounce rounded-full ${u}`,
          style: {
            ...l,
            animationDelay: `${p * 0.1}s`
          }
        },
        p
      ))
    }
  ) : t === "bar" ? /* @__PURE__ */ c(
    "div",
    {
      className: `w-full ${e === "sm" ? "h-1" : e === "md" ? "h-1.5" : e === "lg" ? "h-2" : "h-2.5"} bg-gray-200 rounded-full overflow-hidden ${n}`,
      children: /* @__PURE__ */ c(
        "div",
        {
          className: `h-full animate-progress ${u}`,
          style: {
            backgroundColor: i,
            // Simplified gradient for modern look, or keep it solid
            backgroundImage: o ? `linear-gradient(to right, ${i}DD, ${i})` : void 0,
            animation: "progress 1.5s ease-in-out infinite"
          }
        }
      )
    }
  ) : t === "pulse" ? /* @__PURE__ */ c(
    "div",
    {
      className: `rounded-full ${vr[e]} animate-pulse ${u} ${n}`,
      style: l
    }
  ) : null;
}
function ic({
  logo: e,
  logoText: t,
  userMenu: r,
  showMobileMenuButton: n,
  onToggleMobileMenu: a,
  navItems: i,
  onNavItemClick: o
}) {
  var d, p, b, v, E, y, M, w, k, C, _, x, h, P, g, q, J, T, A, V, $, X, W, K, m, N;
  const [s, l] = ae(!1), u = Ne(null);
  return Lr(u, () => l(!1)), /* @__PURE__ */ c(
    "header",
    {
      className: "sticky top-0 z-40 backdrop-blur-md transition-all duration-300",
      style: {
        backgroundColor: ((d = z.topbar) == null ? void 0 : d.backgroundColor) || "rgba(255, 255, 255, 0.9)",
        borderBottom: `1px solid ${((p = z.topbar) == null ? void 0 : p.borderColor) || "#e2e8f0"}`,
        boxShadow: ((b = z.topbar) == null ? void 0 : b.shadow) || "none"
      },
      children: /* @__PURE__ */ D("div", { className: "flex items-center justify-between h-[72px] px-6 lg:px-8", children: [
        /* @__PURE__ */ D("div", { className: "flex items-center gap-5", children: [
          n && /* @__PURE__ */ c(
            "button",
            {
              className: "lg:hidden p-2.5 rounded-xl transition-colors duration-200",
              style: {
                color: ((v = z.topbar) == null ? void 0 : v.iconColor) || "#64748b"
              },
              onMouseEnter: (f) => {
                var S, L;
                return f.currentTarget.style.backgroundColor = ((L = (S = z.topbar) == null ? void 0 : S.userMenu) == null ? void 0 : L.hoverBackground) || "#f1f5f9";
              },
              onMouseLeave: (f) => f.currentTarget.style.backgroundColor = "transparent",
              onClick: a,
              children: /* @__PURE__ */ c(nl, { className: "w-[1.125rem] h-[1.125rem]" })
            }
          ),
          /* @__PURE__ */ D("div", { className: "flex items-center gap-3", children: [
            e && /* @__PURE__ */ c("div", { className: "flex-shrink-0 drop-shadow-sm", children: e }),
            t && /* @__PURE__ */ c(
              "span",
              {
                className: "text-[1.15rem] font-bold tracking-tight",
                style: { color: ((E = z.topbar) == null ? void 0 : E.textHoverColor) || "#0f172a" },
                children: t
              }
            )
          ] }),
          i && i.length > 0 && /* @__PURE__ */ c("nav", { className: "hidden md:flex ml-8 space-x-1 border-l pl-8", style: { borderColor: ((y = z.topbar) == null ? void 0 : y.borderColor) || "#e2e8f0" }, children: i.map((f) => {
            var S;
            return /* @__PURE__ */ c(
              "button",
              {
                onClick: () => o == null ? void 0 : o(f.id),
                className: "px-4 py-2 rounded-lg font-medium text-[0.9rem] transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
                style: { color: ((S = z.topbar) == null ? void 0 : S.textColor) || "#475569" },
                onMouseEnter: (L) => {
                  var O, j, R;
                  L.currentTarget.style.color = ((O = z.topbar) == null ? void 0 : O.textHoverColor) || "#0f172a", L.currentTarget.style.backgroundColor = ((R = (j = z.topbar) == null ? void 0 : j.userMenu) == null ? void 0 : R.hoverBackground) || "#f1f5f9";
                },
                onMouseLeave: (L) => {
                  var O;
                  L.currentTarget.style.color = ((O = z.topbar) == null ? void 0 : O.textColor) || "#475569", L.currentTarget.style.backgroundColor = "transparent";
                },
                children: /* @__PURE__ */ D("div", { className: "flex items-center gap-2", children: [
                  f.icon && /* @__PURE__ */ c("span", { className: "opacity-70", children: f.icon }),
                  f.label
                ] })
              },
              f.id
            );
          }) })
        ] }),
        r && /* @__PURE__ */ D("div", { className: "relative", children: [
          /* @__PURE__ */ D(
            "button",
            {
              type: "button",
              className: "flex items-center gap-3 rounded-full pl-2 pr-4 py-1.5 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] border border-transparent hover:border-gray-200",
              style: {
                backgroundColor: s ? ((w = (M = z.topbar) == null ? void 0 : M.userMenu) == null ? void 0 : w.hoverBackground) || "#f1f5f9" : "transparent"
              },
              onMouseEnter: (f) => {
                var S, L;
                s || (f.currentTarget.style.backgroundColor = ((L = (S = z.topbar) == null ? void 0 : S.userMenu) == null ? void 0 : L.hoverBackground) || "#f1f5f9");
              },
              onMouseLeave: (f) => {
                s || (f.currentTarget.style.backgroundColor = "transparent");
              },
              onClick: () => l(!s),
              children: [
                /* @__PURE__ */ D("div", { className: "relative", children: [
                  r.userImage ? /* @__PURE__ */ c(
                    "img",
                    {
                      className: "w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm",
                      src: r.userImage,
                      alt: "Current user"
                    }
                  ) : /* @__PURE__ */ c("div", { className: "w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center ring-2 ring-white shadow-sm", children: /* @__PURE__ */ c(Dr, { className: "w-6 h-6", style: { color: ((k = z.topbar) == null ? void 0 : k.iconColor) || "#94a3b8" } }) }),
                  /* @__PURE__ */ c("div", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" })
                ] }),
                /* @__PURE__ */ D("div", { className: "hidden sm:flex flex-col text-left py-0.5", children: [
                  /* @__PURE__ */ c(
                    "span",
                    {
                      className: "font-semibold text-[0.85rem] leading-tight",
                      style: { color: ((_ = (C = z.topbar) == null ? void 0 : C.userMenu) == null ? void 0 : _.textColor) || "#0f172a" },
                      children: r.userName
                    }
                  ),
                  /* @__PURE__ */ c(
                    "span",
                    {
                      className: "text-[0.7rem] font-medium",
                      style: { color: ((h = (x = z.topbar) == null ? void 0 : x.userMenu) == null ? void 0 : h.subtitleColor) || "#64748b" },
                      children: r.userEmail
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ D(
            "div",
            {
              ref: u,
              className: `
                absolute right-0 mt-3 w-64 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-50 overflow-hidden transform origin-top-right transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]
                ${s ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-2 pointer-events-none"}
              `,
              style: {
                backgroundColor: ((q = (g = (P = z.topbar) == null ? void 0 : P.userMenu) == null ? void 0 : g.dropdown) == null ? void 0 : q.backgroundColor) || "#ffffff",
                border: `1px solid ${((A = (T = (J = z.topbar) == null ? void 0 : J.userMenu) == null ? void 0 : T.dropdown) == null ? void 0 : A.borderColor) || "#f1f5f9"}`
              },
              children: [
                /* @__PURE__ */ D("div", { className: "px-5 py-4 border-b bg-slate-50/50", style: { borderColor: ((X = ($ = (V = z.topbar) == null ? void 0 : V.userMenu) == null ? void 0 : $.dropdown) == null ? void 0 : X.borderColor) || "#f1f5f9" }, children: [
                  /* @__PURE__ */ c("span", { className: "block font-bold text-[0.9rem]", style: { color: ((K = (W = z.topbar) == null ? void 0 : W.userMenu) == null ? void 0 : K.textColor) || "#0f172a" }, children: r.userName }),
                  /* @__PURE__ */ c("span", { className: "block text-xs font-medium truncate mt-0.5", style: { color: ((N = (m = z.topbar) == null ? void 0 : m.userMenu) == null ? void 0 : N.subtitleColor) || "#64748b" }, children: r.userEmail })
                ] }),
                /* @__PURE__ */ c("ul", { className: "py-2", children: r.menuItems.map((f, S) => {
                  var O, j;
                  const L = f.label.toLowerCase().includes("salir") || f.label.toLowerCase().includes("cerrar") || f.label.toLowerCase().includes("logout");
                  return /* @__PURE__ */ D("li", { className: "px-2", children: [
                    S === r.menuItems.length - 1 && L && S > 0 && /* @__PURE__ */ c("div", { className: "h-px bg-slate-100 my-1 mx-2" }),
                    /* @__PURE__ */ c(
                      "button",
                      {
                        onClick: (R) => {
                          f.onClick(), l(!1);
                        },
                        className: "block w-full text-left px-3 py-2.5 rounded-xl text-[0.875rem] font-medium transition-colors duration-150",
                        style: { color: L ? "#ef4444" : ((j = (O = z.topbar) == null ? void 0 : O.userMenu) == null ? void 0 : j.textColor) || "#334155" },
                        onMouseEnter: (R) => {
                          var B, Y, re;
                          R.currentTarget.style.backgroundColor = L ? "#fef2f2" : ((re = (Y = (B = z.topbar) == null ? void 0 : B.userMenu) == null ? void 0 : Y.dropdown) == null ? void 0 : re.itemHoverBackground) || "#f8fafc";
                        },
                        onMouseLeave: (R) => {
                          R.currentTarget.style.backgroundColor = "transparent";
                        },
                        children: f.label
                      }
                    )
                  ] }, S);
                }) })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function Nn({
  navigationItems: e = [],
  isCollapsed: t = !1,
  onToggleCollapse: r,
  className: n = "",
  visibleOnMobile: a = !1
}) {
  var M, w, k, C, _, x;
  const [i, o] = ae(/* @__PURE__ */ new Set()), [s, l] = ae(!1), u = Ne(null), d = Ne(null), p = Ne(null);
  ye(() => {
    const h = () => {
      d.current && clearTimeout(d.current), p.current && clearTimeout(p.current), l(!0);
    }, P = () => {
      p.current = setTimeout(() => {
        l(!1);
      }, 300);
    }, g = u.current;
    return g && (g.addEventListener("mouseenter", h), g.addEventListener("mouseleave", P)), () => {
      g && (g.removeEventListener("mouseenter", h), g.removeEventListener("mouseleave", P)), d.current && clearTimeout(d.current), p.current && clearTimeout(p.current);
    };
  }, [t]);
  const b = (h) => {
    const P = new Set(i);
    P.has(h) ? P.delete(h) : P.add(h), o(P);
  }, v = (h) => {
    h.subitems && h.subitems.length > 0 ? b(h.id) : h.action && h.action();
  }, E = a ? !1 : !s && t;
  return /* @__PURE__ */ D(
    "aside",
    {
      ref: u,
      className: `
        relative flex flex-col 
        transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)]
        ${E ? "w-[88px]" : "w-[280px]"}
        ${n}
        ${a ? "flex" : "hidden lg:flex"}
        shadow-[4px_0_24px_rgba(0,0,0,0.02)]
      `,
      style: {
        zIndex: 50,
        backgroundColor: ((M = z.sidebar) == null ? void 0 : M.backgroundColor) || "rgba(255, 255, 255, 0.90)",
        borderRight: `1px solid ${((w = z.sidebar) == null ? void 0 : w.borderColor) || "#e2e8f0"}`,
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)"
      },
      children: [
        /* @__PURE__ */ c("div", { className: `p-6 flex items-center ${E ? "justify-center px-4" : "justify-end px-6"} relative h-[72px]`, style: { borderBottom: `1px solid ${((k = z.sidebar) == null ? void 0 : k.borderColor) || "#e2e8f0"}` }, children: /* @__PURE__ */ c(
          "button",
          {
            onClick: r,
            className: `
              flex items-center justify-center
              w-8 h-8 rounded-full 
              border shadow-sm
              transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
              group relative z-10
            `,
            style: {
              color: ((_ = (C = z.sidebar) == null ? void 0 : C.icon) == null ? void 0 : _.color) || "#64748b",
              backgroundColor: "#ffffff",
              borderColor: ((x = z.sidebar) == null ? void 0 : x.borderColor) || "#e2e8f0"
            },
            onMouseEnter: (h) => {
              var P, g, q, J;
              h.currentTarget.style.backgroundColor = ((g = (P = z.sidebar) == null ? void 0 : P.hover) == null ? void 0 : g.backgroundColor) || "#f1f5f9", h.currentTarget.style.color = ((J = (q = z.sidebar) == null ? void 0 : q.active) == null ? void 0 : J.color) || "#0f172a";
            },
            onMouseLeave: (h) => {
              var P, g;
              h.currentTarget.style.backgroundColor = "#ffffff", h.currentTarget.style.color = ((g = (P = z.sidebar) == null ? void 0 : P.icon) == null ? void 0 : g.color) || "#64748b";
            },
            title: t ? "Fijar panel" : "Ocultar panel",
            children: t ? /* @__PURE__ */ c(xt, { className: "w-3.5 h-3.5 translate-x-0.5" }) : /* @__PURE__ */ c(ir, { className: "w-3.5 h-3.5 -translate-x-0.5" })
          }
        ) }),
        /* @__PURE__ */ c("nav", { className: "flex-1 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar px-4", children: /* @__PURE__ */ c("ul", { className: "space-y-2", children: e.map((h) => {
          var P, g, q, J, T, A, V, $, X, W, K, m, N, f, S, L, O, j, R, B, Y, re, ne, ee, fe, I, ke, Pe, ze, et, Q, ie, le, me, ve, we, Te, H, Z, ue;
          return /* @__PURE__ */ D("li", { className: "relative group/navitem", children: [
            /* @__PURE__ */ D(
              "div",
              {
                className: `flex items-center cursor-pointer 
                  transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                  rounded-xl relative overflow-visible
                  ${E ? "justify-center p-2.5 mb-2" : "justify-between px-3.5 py-3 mb-1"}
                `,
                style: {
                  backgroundColor: h.isActive ? ((g = (P = z.sidebar) == null ? void 0 : P.active) == null ? void 0 : g.backgroundColor) || "#f8fafc" : "transparent",
                  boxShadow: h.isActive ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none",
                  border: h.isActive ? `1px solid ${((q = z.sidebar) == null ? void 0 : q.borderColor) || "#e2e8f0"}` : "1px solid transparent"
                },
                onMouseEnter: (oe) => {
                  var ge, je;
                  h.isActive || (oe.currentTarget.style.backgroundColor = ((je = (ge = z.sidebar) == null ? void 0 : ge.hover) == null ? void 0 : je.backgroundColor) || "#f1f5f9");
                },
                onMouseLeave: (oe) => {
                  h.isActive || (oe.currentTarget.style.backgroundColor = "transparent");
                },
                onClick: () => v(h),
                children: [
                  h.isActive && !E && /* @__PURE__ */ c(
                    "div",
                    {
                      className: "absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-full transition-all",
                      style: { backgroundColor: ((T = (J = z.sidebar) == null ? void 0 : J.active) == null ? void 0 : T.iconColor) || "#10b981", boxShadow: `0 0 10px ${((V = (A = z.sidebar) == null ? void 0 : A.active) == null ? void 0 : V.iconColor) || "#10b981"}` }
                    }
                  ),
                  /* @__PURE__ */ D("div", { className: `flex items-center ${E ? "" : "gap-3.5"} relative z-10 w-full`, children: [
                    h.icon && /* @__PURE__ */ c(
                      "div",
                      {
                        className: "transition-all duration-300 flex-shrink-0 flex items-center justify-center",
                        style: {
                          color: h.isActive ? ((X = ($ = z.sidebar) == null ? void 0 : $.active) == null ? void 0 : X.iconColor) || "#10b981" : ((K = (W = z.sidebar) == null ? void 0 : W.icon) == null ? void 0 : K.color) || "#9ca3af",
                          opacity: h.isActive ? 1 : 0.8,
                          fontSize: h.isActive ? "1.35rem" : ((N = (m = z.sidebar) == null ? void 0 : m.icon) == null ? void 0 : N.size) || "1.25rem",
                          filter: h.isActive ? "drop-shadow(0 0 8px rgba(255,255,255,0.2))" : "none"
                        },
                        children: h.icon
                      }
                    ),
                    !E && /* @__PURE__ */ c(
                      "span",
                      {
                        className: "transition-all duration-300 truncate tracking-wide",
                        style: {
                          color: h.isActive ? ((S = (f = z.sidebar) == null ? void 0 : f.active) == null ? void 0 : S.color) || "#ffffff" : ((O = (L = z.sidebar) == null ? void 0 : L.label) == null ? void 0 : O.color) || "#d1d5db",
                          fontSize: ((R = (j = z.sidebar) == null ? void 0 : j.label) == null ? void 0 : R.size) || "0.9rem",
                          fontWeight: h.isActive ? "600" : ((Y = (B = z.sidebar) == null ? void 0 : B.label) == null ? void 0 : Y.weight) || "500"
                        },
                        children: h.label
                      }
                    )
                  ] }),
                  !E && h.subitems && h.subitems.length > 0 && /* @__PURE__ */ c(
                    "div",
                    {
                      className: `flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${i.has(h.id) ? "rotate-180" : ""}`,
                      style: { color: h.isActive ? ((ne = (re = z.sidebar) == null ? void 0 : re.active) == null ? void 0 : ne.color) || "#0f172a" : ((fe = (ee = z.sidebar) == null ? void 0 : ee.icon) == null ? void 0 : fe.color) || "#64748b", opacity: 0.7 },
                      children: /* @__PURE__ */ c(ha, { className: "w-3 h-3" })
                    }
                  ),
                  h.badge && /* @__PURE__ */ c(
                    "span",
                    {
                      className: `
                      absolute flex items-center justify-center font-bold shadow-md
                      ${E ? "top-1 right-1 w-2.5 h-2.5 rounded-full ring-2" : "right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-[10px] rounded-full backdrop-blur-sm"}
                    `,
                      style: {
                        backgroundColor: ((ke = (I = z.sidebar) == null ? void 0 : I.badge) == null ? void 0 : ke.backgroundColor) || ((ze = (Pe = z.sidebar) == null ? void 0 : Pe.active) == null ? void 0 : ze.iconColor) || "#10b981",
                        color: ((Q = (et = z.sidebar) == null ? void 0 : et.badge) == null ? void 0 : Q.color) || "#ffffff",
                        boxShadow: E ? `0 0 0 2px ${((ie = z.sidebar) == null ? void 0 : ie.backgroundColor) || "#111827"}` : "none"
                      },
                      children: E ? "" : h.badge
                    }
                  )
                ]
              }
            ),
            E && /* @__PURE__ */ D(
              "div",
              {
                className: "absolute left-full top-0 ml-4 rounded-2xl opacity-0 invisible group-hover/navitem:opacity-100 group-hover/navitem:visible transition-all duration-300 pointer-events-none z-50 min-w-[220px] overflow-hidden -translate-x-2 group-hover/navitem:translate-x-0 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]",
                style: {
                  backgroundColor: ((le = z.sidebar) == null ? void 0 : le.backgroundColor) || "#ffffff",
                  border: `1px solid ${((me = z.sidebar) == null ? void 0 : me.borderColor) || "#e2e8f0"}`,
                  WebkitBackdropFilter: "blur(16px)",
                  backdropFilter: "blur(16px)"
                },
                children: [
                  /* @__PURE__ */ D("div", { className: "px-5 py-4 flex items-center gap-3 font-semibold border-b", style: { borderColor: ((ve = z.sidebar) == null ? void 0 : ve.borderColor) || "#e2e8f0", color: ((Te = (we = z.sidebar) == null ? void 0 : we.active) == null ? void 0 : Te.color) || "#0f172a" }, children: [
                    h.icon && /* @__PURE__ */ c("span", { style: { color: ((Z = (H = z.sidebar) == null ? void 0 : H.active) == null ? void 0 : Z.iconColor) || "#10b981" }, className: "text-xl drop-shadow-sm", children: h.icon }),
                    /* @__PURE__ */ c("span", { className: "tracking-wide text-[15px]", children: h.label })
                  ] }),
                  h.subitems && h.subitems.length > 0 ? /* @__PURE__ */ c("div", { className: "py-2", children: h.subitems.map((oe) => {
                    var ge, je, $e, Le, We, qe, Ae, Ve;
                    return /* @__PURE__ */ D(
                      "div",
                      {
                        className: "px-5 py-2.5 text-sm flex items-center gap-3 transition-colors",
                        children: [
                          /* @__PURE__ */ c("span", { className: `w-1.5 h-1.5 rounded-full transition-all ${oe.isActive ? "scale-125" : ""}`, style: { backgroundColor: oe.isActive ? ((je = (ge = z.sidebar) == null ? void 0 : ge.active) == null ? void 0 : je.iconColor) || "#10b981" : ((Le = ($e = z.sidebar) == null ? void 0 : $e.icon) == null ? void 0 : Le.color) || "#94a3b8" } }),
                          /* @__PURE__ */ c("span", { style: { color: oe.isActive ? ((qe = (We = z.sidebar) == null ? void 0 : We.active) == null ? void 0 : qe.color) || "#0f172a" : ((Ve = (Ae = z.sidebar) == null ? void 0 : Ae.label) == null ? void 0 : Ve.color) || "#475569", fontWeight: oe.isActive ? 600 : 500 }, children: oe.label })
                        ]
                      },
                      oe.id
                    );
                  }) }) : /* @__PURE__ */ c("div", { className: "px-5 py-3 text-sm text-zinc-500 italic", children: "No hay submenú" })
                ]
              }
            ),
            !E && h.subitems && h.subitems.length > 0 && /* @__PURE__ */ c("div", { className: `overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] ${i.has(h.id) ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`, children: /* @__PURE__ */ c("ul", { className: "ml-5 pl-4 space-y-1 py-1", style: { borderLeft: `2px solid ${((ue = z.sidebar) == null ? void 0 : ue.borderColor) || "#e2e8f0"}` }, children: h.subitems.map((oe) => {
              var ge, je, $e, Le, We, qe, Ae, Ve;
              return /* @__PURE__ */ D("li", { className: "relative", children: [
                oe.isActive && /* @__PURE__ */ c("div", { className: "absolute -left-[18px] top-1/2 -translate-y-1/2 w-4 h-[2px] rounded-r-full", style: { backgroundColor: ((je = (ge = z.sidebar) == null ? void 0 : ge.active) == null ? void 0 : je.iconColor) || "#10b981" } }),
                /* @__PURE__ */ c(
                  "button",
                  {
                    onClick: oe.action,
                    className: "block w-full text-left px-4 py-2 rounded-xl transition-all duration-300",
                    style: {
                      color: oe.isActive ? ((Le = ($e = z.sidebar) == null ? void 0 : $e.active) == null ? void 0 : Le.color) || "#0f172a" : ((qe = (We = z.sidebar) == null ? void 0 : We.label) == null ? void 0 : qe.color) || "#475569",
                      backgroundColor: oe.isActive ? ((Ve = (Ae = z.sidebar) == null ? void 0 : Ae.active) == null ? void 0 : Ve.backgroundColor) || "#f8fafc" : "transparent",
                      fontSize: "0.85rem",
                      fontWeight: oe.isActive ? 600 : 500,
                      letterSpacing: "0.01em"
                    },
                    onMouseEnter: (He) => {
                      var ct, dt;
                      oe.isActive || (He.currentTarget.style.backgroundColor = ((dt = (ct = z.sidebar) == null ? void 0 : ct.hover) == null ? void 0 : dt.backgroundColor) || "#f1f5f9", He.currentTarget.style.transform = "translateX(4px)");
                    },
                    onMouseLeave: (He) => {
                      oe.isActive || (He.currentTarget.style.backgroundColor = "transparent", He.currentTarget.style.transform = "translateX(0)");
                    },
                    children: oe.label
                  }
                )
              ] }, oe.id);
            }) }) })
          ] }, h.id);
        }) }) })
      ]
    }
  );
}
function Cd({
  topBar: e,
  sidebar: t,
  children: r,
  className: n = ""
}) {
  var l, u;
  const [a, i] = ae(!0), [o, s] = ae(!1);
  return /* @__PURE__ */ D("div", { className: `flex flex-col h-screen overflow-hidden w-full ${n}`, children: [
    /* @__PURE__ */ c(
      ic,
      {
        ...e,
        showMobileMenuButton: !0,
        onToggleMobileMenu: () => s((d) => !d)
      }
    ),
    /* @__PURE__ */ D("div", { className: "flex flex-1 overflow-hidden relative", style: { backgroundColor: ((l = z.layout) == null ? void 0 : l.backgroundColor) || "#f8fafc" }, children: [
      /* @__PURE__ */ D("div", { className: "hidden lg:block relative z-40 h-full", children: [
        /* @__PURE__ */ c("div", { className: "w-[88px] h-full flex-shrink-0" }),
        /* @__PURE__ */ c("div", { className: "absolute top-0 left-0 h-full", children: /* @__PURE__ */ c(
          Nn,
          {
            ...t,
            isCollapsed: a,
            onToggleCollapse: () => i((d) => !d),
            visibleOnMobile: !1,
            className: "h-full drop-shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.2,0,0,1)] flex-shrink-0"
          }
        ) })
      ] }),
      o && /* @__PURE__ */ c(
        "div",
        {
          className: "lg:hidden fixed inset-0 z-50 transition-opacity duration-300 backdrop-blur-sm bg-black/40",
          onClick: () => s(!1),
          children: /* @__PURE__ */ c(
            "div",
            {
              className: "h-full w-auto transform transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
              onClick: (d) => d.stopPropagation(),
              children: /* @__PURE__ */ c(
                Nn,
                {
                  ...t,
                  isCollapsed: !1,
                  visibleOnMobile: !0,
                  className: "h-full shadow-2xl",
                  onToggleCollapse: () => s(!1)
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ c("main", { className: "flex-1 overflow-y-auto w-full custom-scrollbar relative z-0", children: /* @__PURE__ */ c(
        "div",
        {
          className: "mx-auto w-full h-full",
          style: { padding: ((u = z.layout) == null ? void 0 : u.contentPadding) || "1.5rem" },
          children: r
        }
      ) })
    ] })
  ] });
}
var Wt = { exports: {} }, qt = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tn;
function oc() {
  if (Tn) return ce;
  Tn = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, y = e ? Symbol.for("react.block") : 60121, M = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function C(x) {
    if (typeof x == "object" && x !== null) {
      var h = x.$$typeof;
      switch (h) {
        case t:
          switch (x = x.type, x) {
            case l:
            case u:
            case n:
            case i:
            case a:
            case p:
              return x;
            default:
              switch (x = x && x.$$typeof, x) {
                case s:
                case d:
                case E:
                case v:
                case o:
                  return x;
                default:
                  return h;
              }
          }
        case r:
          return h;
      }
    }
  }
  function _(x) {
    return C(x) === u;
  }
  return ce.AsyncMode = l, ce.ConcurrentMode = u, ce.ContextConsumer = s, ce.ContextProvider = o, ce.Element = t, ce.ForwardRef = d, ce.Fragment = n, ce.Lazy = E, ce.Memo = v, ce.Portal = r, ce.Profiler = i, ce.StrictMode = a, ce.Suspense = p, ce.isAsyncMode = function(x) {
    return _(x) || C(x) === l;
  }, ce.isConcurrentMode = _, ce.isContextConsumer = function(x) {
    return C(x) === s;
  }, ce.isContextProvider = function(x) {
    return C(x) === o;
  }, ce.isElement = function(x) {
    return typeof x == "object" && x !== null && x.$$typeof === t;
  }, ce.isForwardRef = function(x) {
    return C(x) === d;
  }, ce.isFragment = function(x) {
    return C(x) === n;
  }, ce.isLazy = function(x) {
    return C(x) === E;
  }, ce.isMemo = function(x) {
    return C(x) === v;
  }, ce.isPortal = function(x) {
    return C(x) === r;
  }, ce.isProfiler = function(x) {
    return C(x) === i;
  }, ce.isStrictMode = function(x) {
    return C(x) === a;
  }, ce.isSuspense = function(x) {
    return C(x) === p;
  }, ce.isValidElementType = function(x) {
    return typeof x == "string" || typeof x == "function" || x === n || x === u || x === i || x === a || x === p || x === b || typeof x == "object" && x !== null && (x.$$typeof === E || x.$$typeof === v || x.$$typeof === o || x.$$typeof === s || x.$$typeof === d || x.$$typeof === M || x.$$typeof === w || x.$$typeof === k || x.$$typeof === y);
  }, ce.typeOf = C, ce;
}
var de = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var En;
function sc() {
  return En || (En = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, y = e ? Symbol.for("react.block") : 60121, M = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function C(I) {
      return typeof I == "string" || typeof I == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      I === n || I === u || I === i || I === a || I === p || I === b || typeof I == "object" && I !== null && (I.$$typeof === E || I.$$typeof === v || I.$$typeof === o || I.$$typeof === s || I.$$typeof === d || I.$$typeof === M || I.$$typeof === w || I.$$typeof === k || I.$$typeof === y);
    }
    function _(I) {
      if (typeof I == "object" && I !== null) {
        var ke = I.$$typeof;
        switch (ke) {
          case t:
            var Pe = I.type;
            switch (Pe) {
              case l:
              case u:
              case n:
              case i:
              case a:
              case p:
                return Pe;
              default:
                var ze = Pe && Pe.$$typeof;
                switch (ze) {
                  case s:
                  case d:
                  case E:
                  case v:
                  case o:
                    return ze;
                  default:
                    return ke;
                }
            }
          case r:
            return ke;
        }
      }
    }
    var x = l, h = u, P = s, g = o, q = t, J = d, T = n, A = E, V = v, $ = r, X = i, W = a, K = p, m = !1;
    function N(I) {
      return m || (m = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), f(I) || _(I) === l;
    }
    function f(I) {
      return _(I) === u;
    }
    function S(I) {
      return _(I) === s;
    }
    function L(I) {
      return _(I) === o;
    }
    function O(I) {
      return typeof I == "object" && I !== null && I.$$typeof === t;
    }
    function j(I) {
      return _(I) === d;
    }
    function R(I) {
      return _(I) === n;
    }
    function B(I) {
      return _(I) === E;
    }
    function Y(I) {
      return _(I) === v;
    }
    function re(I) {
      return _(I) === r;
    }
    function ne(I) {
      return _(I) === i;
    }
    function ee(I) {
      return _(I) === a;
    }
    function fe(I) {
      return _(I) === p;
    }
    de.AsyncMode = x, de.ConcurrentMode = h, de.ContextConsumer = P, de.ContextProvider = g, de.Element = q, de.ForwardRef = J, de.Fragment = T, de.Lazy = A, de.Memo = V, de.Portal = $, de.Profiler = X, de.StrictMode = W, de.Suspense = K, de.isAsyncMode = N, de.isConcurrentMode = f, de.isContextConsumer = S, de.isContextProvider = L, de.isElement = O, de.isForwardRef = j, de.isFragment = R, de.isLazy = B, de.isMemo = Y, de.isPortal = re, de.isProfiler = ne, de.isStrictMode = ee, de.isSuspense = fe, de.isValidElementType = C, de.typeOf = _;
  }()), de;
}
var Sn;
function Oa() {
  return Sn || (Sn = 1, process.env.NODE_ENV === "production" ? qt.exports = oc() : qt.exports = sc()), qt.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var xr, On;
function lc() {
  if (On) return xr;
  On = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var o = {}, s = 0; s < 10; s++)
        o["_" + String.fromCharCode(s)] = s;
      var l = Object.getOwnPropertyNames(o).map(function(d) {
        return o[d];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        u[d] = d;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return xr = a() ? Object.assign : function(i, o) {
    for (var s, l = n(i), u, d = 1; d < arguments.length; d++) {
      s = Object(arguments[d]);
      for (var p in s)
        t.call(s, p) && (l[p] = s[p]);
      if (e) {
        u = e(s);
        for (var b = 0; b < u.length; b++)
          r.call(s, u[b]) && (l[u[b]] = s[u[b]]);
      }
    }
    return l;
  }, xr;
}
var yr, jn;
function Vr() {
  if (jn) return yr;
  jn = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return yr = e, yr;
}
var wr, Dn;
function ja() {
  return Dn || (Dn = 1, wr = Function.call.bind(Object.prototype.hasOwnProperty)), wr;
}
var kr, Mn;
function cc() {
  if (Mn) return kr;
  Mn = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = /* @__PURE__ */ Vr(), r = {}, n = /* @__PURE__ */ ja();
    e = function(i) {
      var o = "Warning: " + i;
      typeof console < "u" && console.error(o);
      try {
        throw new Error(o);
      } catch {
      }
    };
  }
  function a(i, o, s, l, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in i)
        if (n(i, d)) {
          var p;
          try {
            if (typeof i[d] != "function") {
              var b = Error(
                (l || "React class") + ": " + s + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw b.name = "Invariant Violation", b;
            }
            p = i[d](o, d, l, s, null, t);
          } catch (E) {
            p = E;
          }
          if (p && !(p instanceof Error) && e(
            (l || "React class") + ": type specification of " + s + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in r)) {
            r[p.message] = !0;
            var v = u ? u() : "";
            e(
              "Failed " + s + " type: " + p.message + (v ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, kr = a, kr;
}
var Cr, _n;
function dc() {
  if (_n) return Cr;
  _n = 1;
  var e = Oa(), t = lc(), r = /* @__PURE__ */ Vr(), n = /* @__PURE__ */ ja(), a = /* @__PURE__ */ cc(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(s) {
    var l = "Warning: " + s;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function o() {
    return null;
  }
  return Cr = function(s, l) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function p(f) {
      var S = f && (u && f[u] || f[d]);
      if (typeof S == "function")
        return S;
    }
    var b = "<<anonymous>>", v = {
      array: w("array"),
      bigint: w("bigint"),
      bool: w("boolean"),
      func: w("function"),
      number: w("number"),
      object: w("object"),
      string: w("string"),
      symbol: w("symbol"),
      any: k(),
      arrayOf: C,
      element: _(),
      elementType: x(),
      instanceOf: h,
      node: J(),
      objectOf: g,
      oneOf: P,
      oneOfType: q,
      shape: A,
      exact: V
    };
    function E(f, S) {
      return f === S ? f !== 0 || 1 / f === 1 / S : f !== f && S !== S;
    }
    function y(f, S) {
      this.message = f, this.data = S && typeof S == "object" ? S : {}, this.stack = "";
    }
    y.prototype = Error.prototype;
    function M(f) {
      if (process.env.NODE_ENV !== "production")
        var S = {}, L = 0;
      function O(R, B, Y, re, ne, ee, fe) {
        if (re = re || b, ee = ee || Y, fe !== r) {
          if (l) {
            var I = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw I.name = "Invariant Violation", I;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ke = re + ":" + Y;
            !S[ke] && // Avoid spamming the console because they are often not actionable except for lib authors
            L < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + re + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), S[ke] = !0, L++);
          }
        }
        return B[Y] == null ? R ? B[Y] === null ? new y("The " + ne + " `" + ee + "` is marked as required " + ("in `" + re + "`, but its value is `null`.")) : new y("The " + ne + " `" + ee + "` is marked as required in " + ("`" + re + "`, but its value is `undefined`.")) : null : f(B, Y, re, ne, ee);
      }
      var j = O.bind(null, !1);
      return j.isRequired = O.bind(null, !0), j;
    }
    function w(f) {
      function S(L, O, j, R, B, Y) {
        var re = L[O], ne = W(re);
        if (ne !== f) {
          var ee = K(re);
          return new y(
            "Invalid " + R + " `" + B + "` of type " + ("`" + ee + "` supplied to `" + j + "`, expected ") + ("`" + f + "`."),
            { expectedType: f }
          );
        }
        return null;
      }
      return M(S);
    }
    function k() {
      return M(o);
    }
    function C(f) {
      function S(L, O, j, R, B) {
        if (typeof f != "function")
          return new y("Property `" + B + "` of component `" + j + "` has invalid PropType notation inside arrayOf.");
        var Y = L[O];
        if (!Array.isArray(Y)) {
          var re = W(Y);
          return new y("Invalid " + R + " `" + B + "` of type " + ("`" + re + "` supplied to `" + j + "`, expected an array."));
        }
        for (var ne = 0; ne < Y.length; ne++) {
          var ee = f(Y, ne, j, R, B + "[" + ne + "]", r);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return M(S);
    }
    function _() {
      function f(S, L, O, j, R) {
        var B = S[L];
        if (!s(B)) {
          var Y = W(B);
          return new y("Invalid " + j + " `" + R + "` of type " + ("`" + Y + "` supplied to `" + O + "`, expected a single ReactElement."));
        }
        return null;
      }
      return M(f);
    }
    function x() {
      function f(S, L, O, j, R) {
        var B = S[L];
        if (!e.isValidElementType(B)) {
          var Y = W(B);
          return new y("Invalid " + j + " `" + R + "` of type " + ("`" + Y + "` supplied to `" + O + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return M(f);
    }
    function h(f) {
      function S(L, O, j, R, B) {
        if (!(L[O] instanceof f)) {
          var Y = f.name || b, re = N(L[O]);
          return new y("Invalid " + R + " `" + B + "` of type " + ("`" + re + "` supplied to `" + j + "`, expected ") + ("instance of `" + Y + "`."));
        }
        return null;
      }
      return M(S);
    }
    function P(f) {
      if (!Array.isArray(f))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), o;
      function S(L, O, j, R, B) {
        for (var Y = L[O], re = 0; re < f.length; re++)
          if (E(Y, f[re]))
            return null;
        var ne = JSON.stringify(f, function(fe, I) {
          var ke = K(I);
          return ke === "symbol" ? String(I) : I;
        });
        return new y("Invalid " + R + " `" + B + "` of value `" + String(Y) + "` " + ("supplied to `" + j + "`, expected one of " + ne + "."));
      }
      return M(S);
    }
    function g(f) {
      function S(L, O, j, R, B) {
        if (typeof f != "function")
          return new y("Property `" + B + "` of component `" + j + "` has invalid PropType notation inside objectOf.");
        var Y = L[O], re = W(Y);
        if (re !== "object")
          return new y("Invalid " + R + " `" + B + "` of type " + ("`" + re + "` supplied to `" + j + "`, expected an object."));
        for (var ne in Y)
          if (n(Y, ne)) {
            var ee = f(Y, ne, j, R, B + "." + ne, r);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return M(S);
    }
    function q(f) {
      if (!Array.isArray(f))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), o;
      for (var S = 0; S < f.length; S++) {
        var L = f[S];
        if (typeof L != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + m(L) + " at index " + S + "."
          ), o;
      }
      function O(j, R, B, Y, re) {
        for (var ne = [], ee = 0; ee < f.length; ee++) {
          var fe = f[ee], I = fe(j, R, B, Y, re, r);
          if (I == null)
            return null;
          I.data && n(I.data, "expectedType") && ne.push(I.data.expectedType);
        }
        var ke = ne.length > 0 ? ", expected one of type [" + ne.join(", ") + "]" : "";
        return new y("Invalid " + Y + " `" + re + "` supplied to " + ("`" + B + "`" + ke + "."));
      }
      return M(O);
    }
    function J() {
      function f(S, L, O, j, R) {
        return $(S[L]) ? null : new y("Invalid " + j + " `" + R + "` supplied to " + ("`" + O + "`, expected a ReactNode."));
      }
      return M(f);
    }
    function T(f, S, L, O, j) {
      return new y(
        (f || "React class") + ": " + S + " type `" + L + "." + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + j + "`."
      );
    }
    function A(f) {
      function S(L, O, j, R, B) {
        var Y = L[O], re = W(Y);
        if (re !== "object")
          return new y("Invalid " + R + " `" + B + "` of type `" + re + "` " + ("supplied to `" + j + "`, expected `object`."));
        for (var ne in f) {
          var ee = f[ne];
          if (typeof ee != "function")
            return T(j, R, B, ne, K(ee));
          var fe = ee(Y, ne, j, R, B + "." + ne, r);
          if (fe)
            return fe;
        }
        return null;
      }
      return M(S);
    }
    function V(f) {
      function S(L, O, j, R, B) {
        var Y = L[O], re = W(Y);
        if (re !== "object")
          return new y("Invalid " + R + " `" + B + "` of type `" + re + "` " + ("supplied to `" + j + "`, expected `object`."));
        var ne = t({}, L[O], f);
        for (var ee in ne) {
          var fe = f[ee];
          if (n(f, ee) && typeof fe != "function")
            return T(j, R, B, ee, K(fe));
          if (!fe)
            return new y(
              "Invalid " + R + " `" + B + "` key `" + ee + "` supplied to `" + j + "`.\nBad object: " + JSON.stringify(L[O], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(f), null, "  ")
            );
          var I = fe(Y, ee, j, R, B + "." + ee, r);
          if (I)
            return I;
        }
        return null;
      }
      return M(S);
    }
    function $(f) {
      switch (typeof f) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !f;
        case "object":
          if (Array.isArray(f))
            return f.every($);
          if (f === null || s(f))
            return !0;
          var S = p(f);
          if (S) {
            var L = S.call(f), O;
            if (S !== f.entries) {
              for (; !(O = L.next()).done; )
                if (!$(O.value))
                  return !1;
            } else
              for (; !(O = L.next()).done; ) {
                var j = O.value;
                if (j && !$(j[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function X(f, S) {
      return f === "symbol" ? !0 : S ? S["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && S instanceof Symbol : !1;
    }
    function W(f) {
      var S = typeof f;
      return Array.isArray(f) ? "array" : f instanceof RegExp ? "object" : X(S, f) ? "symbol" : S;
    }
    function K(f) {
      if (typeof f > "u" || f === null)
        return "" + f;
      var S = W(f);
      if (S === "object") {
        if (f instanceof Date)
          return "date";
        if (f instanceof RegExp)
          return "regexp";
      }
      return S;
    }
    function m(f) {
      var S = K(f);
      switch (S) {
        case "array":
        case "object":
          return "an " + S;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + S;
        default:
          return S;
      }
    }
    function N(f) {
      return !f.constructor || !f.constructor.name ? b : f.constructor.name;
    }
    return v.checkPropTypes = a, v.resetWarningCache = a.resetWarningCache, v.PropTypes = v, v;
  }, Cr;
}
var Nr, Pn;
function uc() {
  if (Pn) return Nr;
  Pn = 1;
  var e = /* @__PURE__ */ Vr();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Nr = function() {
    function n(o, s, l, u, d, p) {
      if (p !== e) {
        var b = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw b.name = "Invariant Violation", b;
      }
    }
    n.isRequired = n;
    function a() {
      return n;
    }
    var i = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: a,
      element: n,
      elementType: n,
      instanceOf: a,
      node: n,
      objectOf: a,
      oneOf: a,
      oneOfType: a,
      shape: a,
      exact: a,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, Nr;
}
var $n;
function pc() {
  if ($n) return Wt.exports;
  if ($n = 1, process.env.NODE_ENV !== "production") {
    var e = Oa(), t = !0;
    Wt.exports = /* @__PURE__ */ dc()(e.isElement, t);
  } else
    Wt.exports = /* @__PURE__ */ uc()();
  return Wt.exports;
}
var fc = /* @__PURE__ */ pc();
const he = /* @__PURE__ */ rr(fc);
function lt(e, t, r, n) {
  function a(i) {
    return i instanceof r ? i : new r(function(o) {
      o(i);
    });
  }
  return new (r || (r = Promise))(function(i, o) {
    function s(d) {
      try {
        u(n.next(d));
      } catch (p) {
        o(p);
      }
    }
    function l(d) {
      try {
        u(n.throw(d));
      } catch (p) {
        o(p);
      }
    }
    function u(d) {
      d.done ? i(d.value) : a(d.value).then(s, l);
    }
    u((n = n.apply(e, t || [])).next());
  });
}
const mc = /* @__PURE__ */ new Map([
  // https://github.com/guzzle/psr7/blob/2d9260799e713f1c475d3c5fdc3d6561ff7441b2/src/MimeType.php
  ["1km", "application/vnd.1000minds.decision-model+xml"],
  ["3dml", "text/vnd.in3d.3dml"],
  ["3ds", "image/x-3ds"],
  ["3g2", "video/3gpp2"],
  ["3gp", "video/3gp"],
  ["3gpp", "video/3gpp"],
  ["3mf", "model/3mf"],
  ["7z", "application/x-7z-compressed"],
  ["7zip", "application/x-7z-compressed"],
  ["123", "application/vnd.lotus-1-2-3"],
  ["aab", "application/x-authorware-bin"],
  ["aac", "audio/x-acc"],
  ["aam", "application/x-authorware-map"],
  ["aas", "application/x-authorware-seg"],
  ["abw", "application/x-abiword"],
  ["ac", "application/vnd.nokia.n-gage.ac+xml"],
  ["ac3", "audio/ac3"],
  ["acc", "application/vnd.americandynamics.acc"],
  ["ace", "application/x-ace-compressed"],
  ["acu", "application/vnd.acucobol"],
  ["acutc", "application/vnd.acucorp"],
  ["adp", "audio/adpcm"],
  ["aep", "application/vnd.audiograph"],
  ["afm", "application/x-font-type1"],
  ["afp", "application/vnd.ibm.modcap"],
  ["ahead", "application/vnd.ahead.space"],
  ["ai", "application/pdf"],
  ["aif", "audio/x-aiff"],
  ["aifc", "audio/x-aiff"],
  ["aiff", "audio/x-aiff"],
  ["air", "application/vnd.adobe.air-application-installer-package+zip"],
  ["ait", "application/vnd.dvb.ait"],
  ["ami", "application/vnd.amiga.ami"],
  ["amr", "audio/amr"],
  ["apk", "application/vnd.android.package-archive"],
  ["apng", "image/apng"],
  ["appcache", "text/cache-manifest"],
  ["application", "application/x-ms-application"],
  ["apr", "application/vnd.lotus-approach"],
  ["arc", "application/x-freearc"],
  ["arj", "application/x-arj"],
  ["asc", "application/pgp-signature"],
  ["asf", "video/x-ms-asf"],
  ["asm", "text/x-asm"],
  ["aso", "application/vnd.accpac.simply.aso"],
  ["asx", "video/x-ms-asf"],
  ["atc", "application/vnd.acucorp"],
  ["atom", "application/atom+xml"],
  ["atomcat", "application/atomcat+xml"],
  ["atomdeleted", "application/atomdeleted+xml"],
  ["atomsvc", "application/atomsvc+xml"],
  ["atx", "application/vnd.antix.game-component"],
  ["au", "audio/x-au"],
  ["avi", "video/x-msvideo"],
  ["avif", "image/avif"],
  ["aw", "application/applixware"],
  ["azf", "application/vnd.airzip.filesecure.azf"],
  ["azs", "application/vnd.airzip.filesecure.azs"],
  ["azv", "image/vnd.airzip.accelerator.azv"],
  ["azw", "application/vnd.amazon.ebook"],
  ["b16", "image/vnd.pco.b16"],
  ["bat", "application/x-msdownload"],
  ["bcpio", "application/x-bcpio"],
  ["bdf", "application/x-font-bdf"],
  ["bdm", "application/vnd.syncml.dm+wbxml"],
  ["bdoc", "application/x-bdoc"],
  ["bed", "application/vnd.realvnc.bed"],
  ["bh2", "application/vnd.fujitsu.oasysprs"],
  ["bin", "application/octet-stream"],
  ["blb", "application/x-blorb"],
  ["blorb", "application/x-blorb"],
  ["bmi", "application/vnd.bmi"],
  ["bmml", "application/vnd.balsamiq.bmml+xml"],
  ["bmp", "image/bmp"],
  ["book", "application/vnd.framemaker"],
  ["box", "application/vnd.previewsystems.box"],
  ["boz", "application/x-bzip2"],
  ["bpk", "application/octet-stream"],
  ["bpmn", "application/octet-stream"],
  ["bsp", "model/vnd.valve.source.compiled-map"],
  ["btif", "image/prs.btif"],
  ["buffer", "application/octet-stream"],
  ["bz", "application/x-bzip"],
  ["bz2", "application/x-bzip2"],
  ["c", "text/x-c"],
  ["c4d", "application/vnd.clonk.c4group"],
  ["c4f", "application/vnd.clonk.c4group"],
  ["c4g", "application/vnd.clonk.c4group"],
  ["c4p", "application/vnd.clonk.c4group"],
  ["c4u", "application/vnd.clonk.c4group"],
  ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
  ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
  ["cab", "application/vnd.ms-cab-compressed"],
  ["caf", "audio/x-caf"],
  ["cap", "application/vnd.tcpdump.pcap"],
  ["car", "application/vnd.curl.car"],
  ["cat", "application/vnd.ms-pki.seccat"],
  ["cb7", "application/x-cbr"],
  ["cba", "application/x-cbr"],
  ["cbr", "application/x-cbr"],
  ["cbt", "application/x-cbr"],
  ["cbz", "application/x-cbr"],
  ["cc", "text/x-c"],
  ["cco", "application/x-cocoa"],
  ["cct", "application/x-director"],
  ["ccxml", "application/ccxml+xml"],
  ["cdbcmsg", "application/vnd.contact.cmsg"],
  ["cda", "application/x-cdf"],
  ["cdf", "application/x-netcdf"],
  ["cdfx", "application/cdfx+xml"],
  ["cdkey", "application/vnd.mediastation.cdkey"],
  ["cdmia", "application/cdmi-capability"],
  ["cdmic", "application/cdmi-container"],
  ["cdmid", "application/cdmi-domain"],
  ["cdmio", "application/cdmi-object"],
  ["cdmiq", "application/cdmi-queue"],
  ["cdr", "application/cdr"],
  ["cdx", "chemical/x-cdx"],
  ["cdxml", "application/vnd.chemdraw+xml"],
  ["cdy", "application/vnd.cinderella"],
  ["cer", "application/pkix-cert"],
  ["cfs", "application/x-cfs-compressed"],
  ["cgm", "image/cgm"],
  ["chat", "application/x-chat"],
  ["chm", "application/vnd.ms-htmlhelp"],
  ["chrt", "application/vnd.kde.kchart"],
  ["cif", "chemical/x-cif"],
  ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
  ["cil", "application/vnd.ms-artgalry"],
  ["cjs", "application/node"],
  ["cla", "application/vnd.claymore"],
  ["class", "application/octet-stream"],
  ["clkk", "application/vnd.crick.clicker.keyboard"],
  ["clkp", "application/vnd.crick.clicker.palette"],
  ["clkt", "application/vnd.crick.clicker.template"],
  ["clkw", "application/vnd.crick.clicker.wordbank"],
  ["clkx", "application/vnd.crick.clicker"],
  ["clp", "application/x-msclip"],
  ["cmc", "application/vnd.cosmocaller"],
  ["cmdf", "chemical/x-cmdf"],
  ["cml", "chemical/x-cml"],
  ["cmp", "application/vnd.yellowriver-custom-menu"],
  ["cmx", "image/x-cmx"],
  ["cod", "application/vnd.rim.cod"],
  ["coffee", "text/coffeescript"],
  ["com", "application/x-msdownload"],
  ["conf", "text/plain"],
  ["cpio", "application/x-cpio"],
  ["cpp", "text/x-c"],
  ["cpt", "application/mac-compactpro"],
  ["crd", "application/x-mscardfile"],
  ["crl", "application/pkix-crl"],
  ["crt", "application/x-x509-ca-cert"],
  ["crx", "application/x-chrome-extension"],
  ["cryptonote", "application/vnd.rig.cryptonote"],
  ["csh", "application/x-csh"],
  ["csl", "application/vnd.citationstyles.style+xml"],
  ["csml", "chemical/x-csml"],
  ["csp", "application/vnd.commonspace"],
  ["csr", "application/octet-stream"],
  ["css", "text/css"],
  ["cst", "application/x-director"],
  ["csv", "text/csv"],
  ["cu", "application/cu-seeme"],
  ["curl", "text/vnd.curl"],
  ["cww", "application/prs.cww"],
  ["cxt", "application/x-director"],
  ["cxx", "text/x-c"],
  ["dae", "model/vnd.collada+xml"],
  ["daf", "application/vnd.mobius.daf"],
  ["dart", "application/vnd.dart"],
  ["dataless", "application/vnd.fdsn.seed"],
  ["davmount", "application/davmount+xml"],
  ["dbf", "application/vnd.dbf"],
  ["dbk", "application/docbook+xml"],
  ["dcr", "application/x-director"],
  ["dcurl", "text/vnd.curl.dcurl"],
  ["dd2", "application/vnd.oma.dd2+xml"],
  ["ddd", "application/vnd.fujixerox.ddd"],
  ["ddf", "application/vnd.syncml.dmddf+xml"],
  ["dds", "image/vnd.ms-dds"],
  ["deb", "application/x-debian-package"],
  ["def", "text/plain"],
  ["deploy", "application/octet-stream"],
  ["der", "application/x-x509-ca-cert"],
  ["dfac", "application/vnd.dreamfactory"],
  ["dgc", "application/x-dgc-compressed"],
  ["dic", "text/x-c"],
  ["dir", "application/x-director"],
  ["dis", "application/vnd.mobius.dis"],
  ["disposition-notification", "message/disposition-notification"],
  ["dist", "application/octet-stream"],
  ["distz", "application/octet-stream"],
  ["djv", "image/vnd.djvu"],
  ["djvu", "image/vnd.djvu"],
  ["dll", "application/octet-stream"],
  ["dmg", "application/x-apple-diskimage"],
  ["dmn", "application/octet-stream"],
  ["dmp", "application/vnd.tcpdump.pcap"],
  ["dms", "application/octet-stream"],
  ["dna", "application/vnd.dna"],
  ["doc", "application/msword"],
  ["docm", "application/vnd.ms-word.template.macroEnabled.12"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["dot", "application/msword"],
  ["dotm", "application/vnd.ms-word.template.macroEnabled.12"],
  ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"],
  ["dp", "application/vnd.osgi.dp"],
  ["dpg", "application/vnd.dpgraph"],
  ["dra", "audio/vnd.dra"],
  ["drle", "image/dicom-rle"],
  ["dsc", "text/prs.lines.tag"],
  ["dssc", "application/dssc+der"],
  ["dtb", "application/x-dtbook+xml"],
  ["dtd", "application/xml-dtd"],
  ["dts", "audio/vnd.dts"],
  ["dtshd", "audio/vnd.dts.hd"],
  ["dump", "application/octet-stream"],
  ["dvb", "video/vnd.dvb.file"],
  ["dvi", "application/x-dvi"],
  ["dwd", "application/atsc-dwd+xml"],
  ["dwf", "model/vnd.dwf"],
  ["dwg", "image/vnd.dwg"],
  ["dxf", "image/vnd.dxf"],
  ["dxp", "application/vnd.spotfire.dxp"],
  ["dxr", "application/x-director"],
  ["ear", "application/java-archive"],
  ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
  ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
  ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
  ["ecma", "application/ecmascript"],
  ["edm", "application/vnd.novadigm.edm"],
  ["edx", "application/vnd.novadigm.edx"],
  ["efif", "application/vnd.picsel"],
  ["ei6", "application/vnd.pg.osasli"],
  ["elc", "application/octet-stream"],
  ["emf", "image/emf"],
  ["eml", "message/rfc822"],
  ["emma", "application/emma+xml"],
  ["emotionml", "application/emotionml+xml"],
  ["emz", "application/x-msmetafile"],
  ["eol", "audio/vnd.digital-winds"],
  ["eot", "application/vnd.ms-fontobject"],
  ["eps", "application/postscript"],
  ["epub", "application/epub+zip"],
  ["es", "application/ecmascript"],
  ["es3", "application/vnd.eszigno3+xml"],
  ["esa", "application/vnd.osgi.subsystem"],
  ["esf", "application/vnd.epson.esf"],
  ["et3", "application/vnd.eszigno3+xml"],
  ["etx", "text/x-setext"],
  ["eva", "application/x-eva"],
  ["evy", "application/x-envoy"],
  ["exe", "application/octet-stream"],
  ["exi", "application/exi"],
  ["exp", "application/express"],
  ["exr", "image/aces"],
  ["ext", "application/vnd.novadigm.ext"],
  ["ez", "application/andrew-inset"],
  ["ez2", "application/vnd.ezpix-album"],
  ["ez3", "application/vnd.ezpix-package"],
  ["f", "text/x-fortran"],
  ["f4v", "video/mp4"],
  ["f77", "text/x-fortran"],
  ["f90", "text/x-fortran"],
  ["fbs", "image/vnd.fastbidsheet"],
  ["fcdt", "application/vnd.adobe.formscentral.fcdt"],
  ["fcs", "application/vnd.isac.fcs"],
  ["fdf", "application/vnd.fdf"],
  ["fdt", "application/fdt+xml"],
  ["fe_launch", "application/vnd.denovo.fcselayout-link"],
  ["fg5", "application/vnd.fujitsu.oasysgp"],
  ["fgd", "application/x-director"],
  ["fh", "image/x-freehand"],
  ["fh4", "image/x-freehand"],
  ["fh5", "image/x-freehand"],
  ["fh7", "image/x-freehand"],
  ["fhc", "image/x-freehand"],
  ["fig", "application/x-xfig"],
  ["fits", "image/fits"],
  ["flac", "audio/x-flac"],
  ["fli", "video/x-fli"],
  ["flo", "application/vnd.micrografx.flo"],
  ["flv", "video/x-flv"],
  ["flw", "application/vnd.kde.kivio"],
  ["flx", "text/vnd.fmi.flexstor"],
  ["fly", "text/vnd.fly"],
  ["fm", "application/vnd.framemaker"],
  ["fnc", "application/vnd.frogans.fnc"],
  ["fo", "application/vnd.software602.filler.form+xml"],
  ["for", "text/x-fortran"],
  ["fpx", "image/vnd.fpx"],
  ["frame", "application/vnd.framemaker"],
  ["fsc", "application/vnd.fsc.weblaunch"],
  ["fst", "image/vnd.fst"],
  ["ftc", "application/vnd.fluxtime.clip"],
  ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
  ["fvt", "video/vnd.fvt"],
  ["fxp", "application/vnd.adobe.fxp"],
  ["fxpl", "application/vnd.adobe.fxp"],
  ["fzs", "application/vnd.fuzzysheet"],
  ["g2w", "application/vnd.geoplan"],
  ["g3", "image/g3fax"],
  ["g3w", "application/vnd.geospace"],
  ["gac", "application/vnd.groove-account"],
  ["gam", "application/x-tads"],
  ["gbr", "application/rpki-ghostbusters"],
  ["gca", "application/x-gca-compressed"],
  ["gdl", "model/vnd.gdl"],
  ["gdoc", "application/vnd.google-apps.document"],
  ["geo", "application/vnd.dynageo"],
  ["geojson", "application/geo+json"],
  ["gex", "application/vnd.geometry-explorer"],
  ["ggb", "application/vnd.geogebra.file"],
  ["ggt", "application/vnd.geogebra.tool"],
  ["ghf", "application/vnd.groove-help"],
  ["gif", "image/gif"],
  ["gim", "application/vnd.groove-identity-message"],
  ["glb", "model/gltf-binary"],
  ["gltf", "model/gltf+json"],
  ["gml", "application/gml+xml"],
  ["gmx", "application/vnd.gmx"],
  ["gnumeric", "application/x-gnumeric"],
  ["gpg", "application/gpg-keys"],
  ["gph", "application/vnd.flographit"],
  ["gpx", "application/gpx+xml"],
  ["gqf", "application/vnd.grafeq"],
  ["gqs", "application/vnd.grafeq"],
  ["gram", "application/srgs"],
  ["gramps", "application/x-gramps-xml"],
  ["gre", "application/vnd.geometry-explorer"],
  ["grv", "application/vnd.groove-injector"],
  ["grxml", "application/srgs+xml"],
  ["gsf", "application/x-font-ghostscript"],
  ["gsheet", "application/vnd.google-apps.spreadsheet"],
  ["gslides", "application/vnd.google-apps.presentation"],
  ["gtar", "application/x-gtar"],
  ["gtm", "application/vnd.groove-tool-message"],
  ["gtw", "model/vnd.gtw"],
  ["gv", "text/vnd.graphviz"],
  ["gxf", "application/gxf"],
  ["gxt", "application/vnd.geonext"],
  ["gz", "application/gzip"],
  ["gzip", "application/gzip"],
  ["h", "text/x-c"],
  ["h261", "video/h261"],
  ["h263", "video/h263"],
  ["h264", "video/h264"],
  ["hal", "application/vnd.hal+xml"],
  ["hbci", "application/vnd.hbci"],
  ["hbs", "text/x-handlebars-template"],
  ["hdd", "application/x-virtualbox-hdd"],
  ["hdf", "application/x-hdf"],
  ["heic", "image/heic"],
  ["heics", "image/heic-sequence"],
  ["heif", "image/heif"],
  ["heifs", "image/heif-sequence"],
  ["hej2", "image/hej2k"],
  ["held", "application/atsc-held+xml"],
  ["hh", "text/x-c"],
  ["hjson", "application/hjson"],
  ["hlp", "application/winhlp"],
  ["hpgl", "application/vnd.hp-hpgl"],
  ["hpid", "application/vnd.hp-hpid"],
  ["hps", "application/vnd.hp-hps"],
  ["hqx", "application/mac-binhex40"],
  ["hsj2", "image/hsj2"],
  ["htc", "text/x-component"],
  ["htke", "application/vnd.kenameaapp"],
  ["htm", "text/html"],
  ["html", "text/html"],
  ["hvd", "application/vnd.yamaha.hv-dic"],
  ["hvp", "application/vnd.yamaha.hv-voice"],
  ["hvs", "application/vnd.yamaha.hv-script"],
  ["i2g", "application/vnd.intergeo"],
  ["icc", "application/vnd.iccprofile"],
  ["ice", "x-conference/x-cooltalk"],
  ["icm", "application/vnd.iccprofile"],
  ["ico", "image/x-icon"],
  ["ics", "text/calendar"],
  ["ief", "image/ief"],
  ["ifb", "text/calendar"],
  ["ifm", "application/vnd.shana.informed.formdata"],
  ["iges", "model/iges"],
  ["igl", "application/vnd.igloader"],
  ["igm", "application/vnd.insors.igm"],
  ["igs", "model/iges"],
  ["igx", "application/vnd.micrografx.igx"],
  ["iif", "application/vnd.shana.informed.interchange"],
  ["img", "application/octet-stream"],
  ["imp", "application/vnd.accpac.simply.imp"],
  ["ims", "application/vnd.ms-ims"],
  ["in", "text/plain"],
  ["ini", "text/plain"],
  ["ink", "application/inkml+xml"],
  ["inkml", "application/inkml+xml"],
  ["install", "application/x-install-instructions"],
  ["iota", "application/vnd.astraea-software.iota"],
  ["ipfix", "application/ipfix"],
  ["ipk", "application/vnd.shana.informed.package"],
  ["irm", "application/vnd.ibm.rights-management"],
  ["irp", "application/vnd.irepository.package+xml"],
  ["iso", "application/x-iso9660-image"],
  ["itp", "application/vnd.shana.informed.formtemplate"],
  ["its", "application/its+xml"],
  ["ivp", "application/vnd.immervision-ivp"],
  ["ivu", "application/vnd.immervision-ivu"],
  ["jad", "text/vnd.sun.j2me.app-descriptor"],
  ["jade", "text/jade"],
  ["jam", "application/vnd.jam"],
  ["jar", "application/java-archive"],
  ["jardiff", "application/x-java-archive-diff"],
  ["java", "text/x-java-source"],
  ["jhc", "image/jphc"],
  ["jisp", "application/vnd.jisp"],
  ["jls", "image/jls"],
  ["jlt", "application/vnd.hp-jlyt"],
  ["jng", "image/x-jng"],
  ["jnlp", "application/x-java-jnlp-file"],
  ["joda", "application/vnd.joost.joda-archive"],
  ["jp2", "image/jp2"],
  ["jpe", "image/jpeg"],
  ["jpeg", "image/jpeg"],
  ["jpf", "image/jpx"],
  ["jpg", "image/jpeg"],
  ["jpg2", "image/jp2"],
  ["jpgm", "video/jpm"],
  ["jpgv", "video/jpeg"],
  ["jph", "image/jph"],
  ["jpm", "video/jpm"],
  ["jpx", "image/jpx"],
  ["js", "application/javascript"],
  ["json", "application/json"],
  ["json5", "application/json5"],
  ["jsonld", "application/ld+json"],
  // https://jsonlines.org/
  ["jsonl", "application/jsonl"],
  ["jsonml", "application/jsonml+json"],
  ["jsx", "text/jsx"],
  ["jxr", "image/jxr"],
  ["jxra", "image/jxra"],
  ["jxrs", "image/jxrs"],
  ["jxs", "image/jxs"],
  ["jxsc", "image/jxsc"],
  ["jxsi", "image/jxsi"],
  ["jxss", "image/jxss"],
  ["kar", "audio/midi"],
  ["karbon", "application/vnd.kde.karbon"],
  ["kdb", "application/octet-stream"],
  ["kdbx", "application/x-keepass2"],
  ["key", "application/x-iwork-keynote-sffkey"],
  ["kfo", "application/vnd.kde.kformula"],
  ["kia", "application/vnd.kidspiration"],
  ["kml", "application/vnd.google-earth.kml+xml"],
  ["kmz", "application/vnd.google-earth.kmz"],
  ["kne", "application/vnd.kinar"],
  ["knp", "application/vnd.kinar"],
  ["kon", "application/vnd.kde.kontour"],
  ["kpr", "application/vnd.kde.kpresenter"],
  ["kpt", "application/vnd.kde.kpresenter"],
  ["kpxx", "application/vnd.ds-keypoint"],
  ["ksp", "application/vnd.kde.kspread"],
  ["ktr", "application/vnd.kahootz"],
  ["ktx", "image/ktx"],
  ["ktx2", "image/ktx2"],
  ["ktz", "application/vnd.kahootz"],
  ["kwd", "application/vnd.kde.kword"],
  ["kwt", "application/vnd.kde.kword"],
  ["lasxml", "application/vnd.las.las+xml"],
  ["latex", "application/x-latex"],
  ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
  ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
  ["les", "application/vnd.hhe.lesson-player"],
  ["less", "text/less"],
  ["lgr", "application/lgr+xml"],
  ["lha", "application/octet-stream"],
  ["link66", "application/vnd.route66.link66+xml"],
  ["list", "text/plain"],
  ["list3820", "application/vnd.ibm.modcap"],
  ["listafp", "application/vnd.ibm.modcap"],
  ["litcoffee", "text/coffeescript"],
  ["lnk", "application/x-ms-shortcut"],
  ["log", "text/plain"],
  ["lostxml", "application/lost+xml"],
  ["lrf", "application/octet-stream"],
  ["lrm", "application/vnd.ms-lrm"],
  ["ltf", "application/vnd.frogans.ltf"],
  ["lua", "text/x-lua"],
  ["luac", "application/x-lua-bytecode"],
  ["lvp", "audio/vnd.lucent.voice"],
  ["lwp", "application/vnd.lotus-wordpro"],
  ["lzh", "application/octet-stream"],
  ["m1v", "video/mpeg"],
  ["m2a", "audio/mpeg"],
  ["m2v", "video/mpeg"],
  ["m3a", "audio/mpeg"],
  ["m3u", "text/plain"],
  ["m3u8", "application/vnd.apple.mpegurl"],
  ["m4a", "audio/x-m4a"],
  ["m4p", "application/mp4"],
  ["m4s", "video/iso.segment"],
  ["m4u", "application/vnd.mpegurl"],
  ["m4v", "video/x-m4v"],
  ["m13", "application/x-msmediaview"],
  ["m14", "application/x-msmediaview"],
  ["m21", "application/mp21"],
  ["ma", "application/mathematica"],
  ["mads", "application/mads+xml"],
  ["maei", "application/mmt-aei+xml"],
  ["mag", "application/vnd.ecowin.chart"],
  ["maker", "application/vnd.framemaker"],
  ["man", "text/troff"],
  ["manifest", "text/cache-manifest"],
  ["map", "application/json"],
  ["mar", "application/octet-stream"],
  ["markdown", "text/markdown"],
  ["mathml", "application/mathml+xml"],
  ["mb", "application/mathematica"],
  ["mbk", "application/vnd.mobius.mbk"],
  ["mbox", "application/mbox"],
  ["mc1", "application/vnd.medcalcdata"],
  ["mcd", "application/vnd.mcd"],
  ["mcurl", "text/vnd.curl.mcurl"],
  ["md", "text/markdown"],
  ["mdb", "application/x-msaccess"],
  ["mdi", "image/vnd.ms-modi"],
  ["mdx", "text/mdx"],
  ["me", "text/troff"],
  ["mesh", "model/mesh"],
  ["meta4", "application/metalink4+xml"],
  ["metalink", "application/metalink+xml"],
  ["mets", "application/mets+xml"],
  ["mfm", "application/vnd.mfmp"],
  ["mft", "application/rpki-manifest"],
  ["mgp", "application/vnd.osgeo.mapguide.package"],
  ["mgz", "application/vnd.proteus.magazine"],
  ["mid", "audio/midi"],
  ["midi", "audio/midi"],
  ["mie", "application/x-mie"],
  ["mif", "application/vnd.mif"],
  ["mime", "message/rfc822"],
  ["mj2", "video/mj2"],
  ["mjp2", "video/mj2"],
  ["mjs", "application/javascript"],
  ["mk3d", "video/x-matroska"],
  ["mka", "audio/x-matroska"],
  ["mkd", "text/x-markdown"],
  ["mks", "video/x-matroska"],
  ["mkv", "video/x-matroska"],
  ["mlp", "application/vnd.dolby.mlp"],
  ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
  ["mmf", "application/vnd.smaf"],
  ["mml", "text/mathml"],
  ["mmr", "image/vnd.fujixerox.edmics-mmr"],
  ["mng", "video/x-mng"],
  ["mny", "application/x-msmoney"],
  ["mobi", "application/x-mobipocket-ebook"],
  ["mods", "application/mods+xml"],
  ["mov", "video/quicktime"],
  ["movie", "video/x-sgi-movie"],
  ["mp2", "audio/mpeg"],
  ["mp2a", "audio/mpeg"],
  ["mp3", "audio/mpeg"],
  ["mp4", "video/mp4"],
  ["mp4a", "audio/mp4"],
  ["mp4s", "application/mp4"],
  ["mp4v", "video/mp4"],
  ["mp21", "application/mp21"],
  ["mpc", "application/vnd.mophun.certificate"],
  ["mpd", "application/dash+xml"],
  ["mpe", "video/mpeg"],
  ["mpeg", "video/mpeg"],
  ["mpg", "video/mpeg"],
  ["mpg4", "video/mp4"],
  ["mpga", "audio/mpeg"],
  ["mpkg", "application/vnd.apple.installer+xml"],
  ["mpm", "application/vnd.blueice.multipass"],
  ["mpn", "application/vnd.mophun.application"],
  ["mpp", "application/vnd.ms-project"],
  ["mpt", "application/vnd.ms-project"],
  ["mpy", "application/vnd.ibm.minipay"],
  ["mqy", "application/vnd.mobius.mqy"],
  ["mrc", "application/marc"],
  ["mrcx", "application/marcxml+xml"],
  ["ms", "text/troff"],
  ["mscml", "application/mediaservercontrol+xml"],
  ["mseed", "application/vnd.fdsn.mseed"],
  ["mseq", "application/vnd.mseq"],
  ["msf", "application/vnd.epson.msf"],
  ["msg", "application/vnd.ms-outlook"],
  ["msh", "model/mesh"],
  ["msi", "application/x-msdownload"],
  ["msl", "application/vnd.mobius.msl"],
  ["msm", "application/octet-stream"],
  ["msp", "application/octet-stream"],
  ["msty", "application/vnd.muvee.style"],
  ["mtl", "model/mtl"],
  ["mts", "model/vnd.mts"],
  ["mus", "application/vnd.musician"],
  ["musd", "application/mmt-usd+xml"],
  ["musicxml", "application/vnd.recordare.musicxml+xml"],
  ["mvb", "application/x-msmediaview"],
  ["mvt", "application/vnd.mapbox-vector-tile"],
  ["mwf", "application/vnd.mfer"],
  ["mxf", "application/mxf"],
  ["mxl", "application/vnd.recordare.musicxml"],
  ["mxmf", "audio/mobile-xmf"],
  ["mxml", "application/xv+xml"],
  ["mxs", "application/vnd.triscape.mxs"],
  ["mxu", "video/vnd.mpegurl"],
  ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
  ["n3", "text/n3"],
  ["nb", "application/mathematica"],
  ["nbp", "application/vnd.wolfram.player"],
  ["nc", "application/x-netcdf"],
  ["ncx", "application/x-dtbncx+xml"],
  ["nfo", "text/x-nfo"],
  ["ngdat", "application/vnd.nokia.n-gage.data"],
  ["nitf", "application/vnd.nitf"],
  ["nlu", "application/vnd.neurolanguage.nlu"],
  ["nml", "application/vnd.enliven"],
  ["nnd", "application/vnd.noblenet-directory"],
  ["nns", "application/vnd.noblenet-sealer"],
  ["nnw", "application/vnd.noblenet-web"],
  ["npx", "image/vnd.net-fpx"],
  ["nq", "application/n-quads"],
  ["nsc", "application/x-conference"],
  ["nsf", "application/vnd.lotus-notes"],
  ["nt", "application/n-triples"],
  ["ntf", "application/vnd.nitf"],
  ["numbers", "application/x-iwork-numbers-sffnumbers"],
  ["nzb", "application/x-nzb"],
  ["oa2", "application/vnd.fujitsu.oasys2"],
  ["oa3", "application/vnd.fujitsu.oasys3"],
  ["oas", "application/vnd.fujitsu.oasys"],
  ["obd", "application/x-msbinder"],
  ["obgx", "application/vnd.openblox.game+xml"],
  ["obj", "model/obj"],
  ["oda", "application/oda"],
  ["odb", "application/vnd.oasis.opendocument.database"],
  ["odc", "application/vnd.oasis.opendocument.chart"],
  ["odf", "application/vnd.oasis.opendocument.formula"],
  ["odft", "application/vnd.oasis.opendocument.formula-template"],
  ["odg", "application/vnd.oasis.opendocument.graphics"],
  ["odi", "application/vnd.oasis.opendocument.image"],
  ["odm", "application/vnd.oasis.opendocument.text-master"],
  ["odp", "application/vnd.oasis.opendocument.presentation"],
  ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
  ["odt", "application/vnd.oasis.opendocument.text"],
  ["oga", "audio/ogg"],
  ["ogex", "model/vnd.opengex"],
  ["ogg", "audio/ogg"],
  ["ogv", "video/ogg"],
  ["ogx", "application/ogg"],
  ["omdoc", "application/omdoc+xml"],
  ["onepkg", "application/onenote"],
  ["onetmp", "application/onenote"],
  ["onetoc", "application/onenote"],
  ["onetoc2", "application/onenote"],
  ["opf", "application/oebps-package+xml"],
  ["opml", "text/x-opml"],
  ["oprc", "application/vnd.palm"],
  ["opus", "audio/ogg"],
  ["org", "text/x-org"],
  ["osf", "application/vnd.yamaha.openscoreformat"],
  ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
  ["osm", "application/vnd.openstreetmap.data+xml"],
  ["otc", "application/vnd.oasis.opendocument.chart-template"],
  ["otf", "font/otf"],
  ["otg", "application/vnd.oasis.opendocument.graphics-template"],
  ["oth", "application/vnd.oasis.opendocument.text-web"],
  ["oti", "application/vnd.oasis.opendocument.image-template"],
  ["otp", "application/vnd.oasis.opendocument.presentation-template"],
  ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
  ["ott", "application/vnd.oasis.opendocument.text-template"],
  ["ova", "application/x-virtualbox-ova"],
  ["ovf", "application/x-virtualbox-ovf"],
  ["owl", "application/rdf+xml"],
  ["oxps", "application/oxps"],
  ["oxt", "application/vnd.openofficeorg.extension"],
  ["p", "text/x-pascal"],
  ["p7a", "application/x-pkcs7-signature"],
  ["p7b", "application/x-pkcs7-certificates"],
  ["p7c", "application/pkcs7-mime"],
  ["p7m", "application/pkcs7-mime"],
  ["p7r", "application/x-pkcs7-certreqresp"],
  ["p7s", "application/pkcs7-signature"],
  ["p8", "application/pkcs8"],
  ["p10", "application/x-pkcs10"],
  ["p12", "application/x-pkcs12"],
  ["pac", "application/x-ns-proxy-autoconfig"],
  ["pages", "application/x-iwork-pages-sffpages"],
  ["pas", "text/x-pascal"],
  ["paw", "application/vnd.pawaafile"],
  ["pbd", "application/vnd.powerbuilder6"],
  ["pbm", "image/x-portable-bitmap"],
  ["pcap", "application/vnd.tcpdump.pcap"],
  ["pcf", "application/x-font-pcf"],
  ["pcl", "application/vnd.hp-pcl"],
  ["pclxl", "application/vnd.hp-pclxl"],
  ["pct", "image/x-pict"],
  ["pcurl", "application/vnd.curl.pcurl"],
  ["pcx", "image/x-pcx"],
  ["pdb", "application/x-pilot"],
  ["pde", "text/x-processing"],
  ["pdf", "application/pdf"],
  ["pem", "application/x-x509-user-cert"],
  ["pfa", "application/x-font-type1"],
  ["pfb", "application/x-font-type1"],
  ["pfm", "application/x-font-type1"],
  ["pfr", "application/font-tdpfr"],
  ["pfx", "application/x-pkcs12"],
  ["pgm", "image/x-portable-graymap"],
  ["pgn", "application/x-chess-pgn"],
  ["pgp", "application/pgp"],
  ["php", "application/x-httpd-php"],
  ["php3", "application/x-httpd-php"],
  ["php4", "application/x-httpd-php"],
  ["phps", "application/x-httpd-php-source"],
  ["phtml", "application/x-httpd-php"],
  ["pic", "image/x-pict"],
  ["pkg", "application/octet-stream"],
  ["pki", "application/pkixcmp"],
  ["pkipath", "application/pkix-pkipath"],
  ["pkpass", "application/vnd.apple.pkpass"],
  ["pl", "application/x-perl"],
  ["plb", "application/vnd.3gpp.pic-bw-large"],
  ["plc", "application/vnd.mobius.plc"],
  ["plf", "application/vnd.pocketlearn"],
  ["pls", "application/pls+xml"],
  ["pm", "application/x-perl"],
  ["pml", "application/vnd.ctc-posml"],
  ["png", "image/png"],
  ["pnm", "image/x-portable-anymap"],
  ["portpkg", "application/vnd.macports.portpkg"],
  ["pot", "application/vnd.ms-powerpoint"],
  ["potm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12"],
  ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"],
  ["ppa", "application/vnd.ms-powerpoint"],
  ["ppam", "application/vnd.ms-powerpoint.addin.macroEnabled.12"],
  ["ppd", "application/vnd.cups-ppd"],
  ["ppm", "image/x-portable-pixmap"],
  ["pps", "application/vnd.ms-powerpoint"],
  ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"],
  ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"],
  ["ppt", "application/powerpoint"],
  ["pptm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12"],
  ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  ["pqa", "application/vnd.palm"],
  ["prc", "application/x-pilot"],
  ["pre", "application/vnd.lotus-freelance"],
  ["prf", "application/pics-rules"],
  ["provx", "application/provenance+xml"],
  ["ps", "application/postscript"],
  ["psb", "application/vnd.3gpp.pic-bw-small"],
  ["psd", "application/x-photoshop"],
  ["psf", "application/x-font-linux-psf"],
  ["pskcxml", "application/pskc+xml"],
  ["pti", "image/prs.pti"],
  ["ptid", "application/vnd.pvi.ptid1"],
  ["pub", "application/x-mspublisher"],
  ["pvb", "application/vnd.3gpp.pic-bw-var"],
  ["pwn", "application/vnd.3m.post-it-notes"],
  ["pya", "audio/vnd.ms-playready.media.pya"],
  ["pyv", "video/vnd.ms-playready.media.pyv"],
  ["qam", "application/vnd.epson.quickanime"],
  ["qbo", "application/vnd.intu.qbo"],
  ["qfx", "application/vnd.intu.qfx"],
  ["qps", "application/vnd.publishare-delta-tree"],
  ["qt", "video/quicktime"],
  ["qwd", "application/vnd.quark.quarkxpress"],
  ["qwt", "application/vnd.quark.quarkxpress"],
  ["qxb", "application/vnd.quark.quarkxpress"],
  ["qxd", "application/vnd.quark.quarkxpress"],
  ["qxl", "application/vnd.quark.quarkxpress"],
  ["qxt", "application/vnd.quark.quarkxpress"],
  ["ra", "audio/x-realaudio"],
  ["ram", "audio/x-pn-realaudio"],
  ["raml", "application/raml+yaml"],
  ["rapd", "application/route-apd+xml"],
  ["rar", "application/x-rar"],
  ["ras", "image/x-cmu-raster"],
  ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
  ["rdf", "application/rdf+xml"],
  ["rdz", "application/vnd.data-vision.rdz"],
  ["relo", "application/p2p-overlay+xml"],
  ["rep", "application/vnd.businessobjects"],
  ["res", "application/x-dtbresource+xml"],
  ["rgb", "image/x-rgb"],
  ["rif", "application/reginfo+xml"],
  ["rip", "audio/vnd.rip"],
  ["ris", "application/x-research-info-systems"],
  ["rl", "application/resource-lists+xml"],
  ["rlc", "image/vnd.fujixerox.edmics-rlc"],
  ["rld", "application/resource-lists-diff+xml"],
  ["rm", "audio/x-pn-realaudio"],
  ["rmi", "audio/midi"],
  ["rmp", "audio/x-pn-realaudio-plugin"],
  ["rms", "application/vnd.jcp.javame.midlet-rms"],
  ["rmvb", "application/vnd.rn-realmedia-vbr"],
  ["rnc", "application/relax-ng-compact-syntax"],
  ["rng", "application/xml"],
  ["roa", "application/rpki-roa"],
  ["roff", "text/troff"],
  ["rp9", "application/vnd.cloanto.rp9"],
  ["rpm", "audio/x-pn-realaudio-plugin"],
  ["rpss", "application/vnd.nokia.radio-presets"],
  ["rpst", "application/vnd.nokia.radio-preset"],
  ["rq", "application/sparql-query"],
  ["rs", "application/rls-services+xml"],
  ["rsa", "application/x-pkcs7"],
  ["rsat", "application/atsc-rsat+xml"],
  ["rsd", "application/rsd+xml"],
  ["rsheet", "application/urc-ressheet+xml"],
  ["rss", "application/rss+xml"],
  ["rtf", "text/rtf"],
  ["rtx", "text/richtext"],
  ["run", "application/x-makeself"],
  ["rusd", "application/route-usd+xml"],
  ["rv", "video/vnd.rn-realvideo"],
  ["s", "text/x-asm"],
  ["s3m", "audio/s3m"],
  ["saf", "application/vnd.yamaha.smaf-audio"],
  ["sass", "text/x-sass"],
  ["sbml", "application/sbml+xml"],
  ["sc", "application/vnd.ibm.secure-container"],
  ["scd", "application/x-msschedule"],
  ["scm", "application/vnd.lotus-screencam"],
  ["scq", "application/scvp-cv-request"],
  ["scs", "application/scvp-cv-response"],
  ["scss", "text/x-scss"],
  ["scurl", "text/vnd.curl.scurl"],
  ["sda", "application/vnd.stardivision.draw"],
  ["sdc", "application/vnd.stardivision.calc"],
  ["sdd", "application/vnd.stardivision.impress"],
  ["sdkd", "application/vnd.solent.sdkm+xml"],
  ["sdkm", "application/vnd.solent.sdkm+xml"],
  ["sdp", "application/sdp"],
  ["sdw", "application/vnd.stardivision.writer"],
  ["sea", "application/octet-stream"],
  ["see", "application/vnd.seemail"],
  ["seed", "application/vnd.fdsn.seed"],
  ["sema", "application/vnd.sema"],
  ["semd", "application/vnd.semd"],
  ["semf", "application/vnd.semf"],
  ["senmlx", "application/senml+xml"],
  ["sensmlx", "application/sensml+xml"],
  ["ser", "application/java-serialized-object"],
  ["setpay", "application/set-payment-initiation"],
  ["setreg", "application/set-registration-initiation"],
  ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
  ["sfs", "application/vnd.spotfire.sfs"],
  ["sfv", "text/x-sfv"],
  ["sgi", "image/sgi"],
  ["sgl", "application/vnd.stardivision.writer-global"],
  ["sgm", "text/sgml"],
  ["sgml", "text/sgml"],
  ["sh", "application/x-sh"],
  ["shar", "application/x-shar"],
  ["shex", "text/shex"],
  ["shf", "application/shf+xml"],
  ["shtml", "text/html"],
  ["sid", "image/x-mrsid-image"],
  ["sieve", "application/sieve"],
  ["sig", "application/pgp-signature"],
  ["sil", "audio/silk"],
  ["silo", "model/mesh"],
  ["sis", "application/vnd.symbian.install"],
  ["sisx", "application/vnd.symbian.install"],
  ["sit", "application/x-stuffit"],
  ["sitx", "application/x-stuffitx"],
  ["siv", "application/sieve"],
  ["skd", "application/vnd.koan"],
  ["skm", "application/vnd.koan"],
  ["skp", "application/vnd.koan"],
  ["skt", "application/vnd.koan"],
  ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
  ["sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"],
  ["slim", "text/slim"],
  ["slm", "text/slim"],
  ["sls", "application/route-s-tsid+xml"],
  ["slt", "application/vnd.epson.salt"],
  ["sm", "application/vnd.stepmania.stepchart"],
  ["smf", "application/vnd.stardivision.math"],
  ["smi", "application/smil"],
  ["smil", "application/smil"],
  ["smv", "video/x-smv"],
  ["smzip", "application/vnd.stepmania.package"],
  ["snd", "audio/basic"],
  ["snf", "application/x-font-snf"],
  ["so", "application/octet-stream"],
  ["spc", "application/x-pkcs7-certificates"],
  ["spdx", "text/spdx"],
  ["spf", "application/vnd.yamaha.smaf-phrase"],
  ["spl", "application/x-futuresplash"],
  ["spot", "text/vnd.in3d.spot"],
  ["spp", "application/scvp-vp-response"],
  ["spq", "application/scvp-vp-request"],
  ["spx", "audio/ogg"],
  ["sql", "application/x-sql"],
  ["src", "application/x-wais-source"],
  ["srt", "application/x-subrip"],
  ["sru", "application/sru+xml"],
  ["srx", "application/sparql-results+xml"],
  ["ssdl", "application/ssdl+xml"],
  ["sse", "application/vnd.kodak-descriptor"],
  ["ssf", "application/vnd.epson.ssf"],
  ["ssml", "application/ssml+xml"],
  ["sst", "application/octet-stream"],
  ["st", "application/vnd.sailingtracker.track"],
  ["stc", "application/vnd.sun.xml.calc.template"],
  ["std", "application/vnd.sun.xml.draw.template"],
  ["stf", "application/vnd.wt.stf"],
  ["sti", "application/vnd.sun.xml.impress.template"],
  ["stk", "application/hyperstudio"],
  ["stl", "model/stl"],
  ["stpx", "model/step+xml"],
  ["stpxz", "model/step-xml+zip"],
  ["stpz", "model/step+zip"],
  ["str", "application/vnd.pg.format"],
  ["stw", "application/vnd.sun.xml.writer.template"],
  ["styl", "text/stylus"],
  ["stylus", "text/stylus"],
  ["sub", "text/vnd.dvb.subtitle"],
  ["sus", "application/vnd.sus-calendar"],
  ["susp", "application/vnd.sus-calendar"],
  ["sv4cpio", "application/x-sv4cpio"],
  ["sv4crc", "application/x-sv4crc"],
  ["svc", "application/vnd.dvb.service"],
  ["svd", "application/vnd.svd"],
  ["svg", "image/svg+xml"],
  ["svgz", "image/svg+xml"],
  ["swa", "application/x-director"],
  ["swf", "application/x-shockwave-flash"],
  ["swi", "application/vnd.aristanetworks.swi"],
  ["swidtag", "application/swid+xml"],
  ["sxc", "application/vnd.sun.xml.calc"],
  ["sxd", "application/vnd.sun.xml.draw"],
  ["sxg", "application/vnd.sun.xml.writer.global"],
  ["sxi", "application/vnd.sun.xml.impress"],
  ["sxm", "application/vnd.sun.xml.math"],
  ["sxw", "application/vnd.sun.xml.writer"],
  ["t", "text/troff"],
  ["t3", "application/x-t3vm-image"],
  ["t38", "image/t38"],
  ["taglet", "application/vnd.mynfc"],
  ["tao", "application/vnd.tao.intent-module-archive"],
  ["tap", "image/vnd.tencent.tap"],
  ["tar", "application/x-tar"],
  ["tcap", "application/vnd.3gpp2.tcap"],
  ["tcl", "application/x-tcl"],
  ["td", "application/urc-targetdesc+xml"],
  ["teacher", "application/vnd.smart.teacher"],
  ["tei", "application/tei+xml"],
  ["teicorpus", "application/tei+xml"],
  ["tex", "application/x-tex"],
  ["texi", "application/x-texinfo"],
  ["texinfo", "application/x-texinfo"],
  ["text", "text/plain"],
  ["tfi", "application/thraud+xml"],
  ["tfm", "application/x-tex-tfm"],
  ["tfx", "image/tiff-fx"],
  ["tga", "image/x-tga"],
  ["tgz", "application/x-tar"],
  ["thmx", "application/vnd.ms-officetheme"],
  ["tif", "image/tiff"],
  ["tiff", "image/tiff"],
  ["tk", "application/x-tcl"],
  ["tmo", "application/vnd.tmobile-livetv"],
  ["toml", "application/toml"],
  ["torrent", "application/x-bittorrent"],
  ["tpl", "application/vnd.groove-tool-template"],
  ["tpt", "application/vnd.trid.tpt"],
  ["tr", "text/troff"],
  ["tra", "application/vnd.trueapp"],
  ["trig", "application/trig"],
  ["trm", "application/x-msterminal"],
  ["ts", "video/mp2t"],
  ["tsd", "application/timestamped-data"],
  ["tsv", "text/tab-separated-values"],
  ["ttc", "font/collection"],
  ["ttf", "font/ttf"],
  ["ttl", "text/turtle"],
  ["ttml", "application/ttml+xml"],
  ["twd", "application/vnd.simtech-mindmapper"],
  ["twds", "application/vnd.simtech-mindmapper"],
  ["txd", "application/vnd.genomatix.tuxedo"],
  ["txf", "application/vnd.mobius.txf"],
  ["txt", "text/plain"],
  ["u8dsn", "message/global-delivery-status"],
  ["u8hdr", "message/global-headers"],
  ["u8mdn", "message/global-disposition-notification"],
  ["u8msg", "message/global"],
  ["u32", "application/x-authorware-bin"],
  ["ubj", "application/ubjson"],
  ["udeb", "application/x-debian-package"],
  ["ufd", "application/vnd.ufdl"],
  ["ufdl", "application/vnd.ufdl"],
  ["ulx", "application/x-glulx"],
  ["umj", "application/vnd.umajin"],
  ["unityweb", "application/vnd.unity"],
  ["uoml", "application/vnd.uoml+xml"],
  ["uri", "text/uri-list"],
  ["uris", "text/uri-list"],
  ["urls", "text/uri-list"],
  ["usdz", "model/vnd.usdz+zip"],
  ["ustar", "application/x-ustar"],
  ["utz", "application/vnd.uiq.theme"],
  ["uu", "text/x-uuencode"],
  ["uva", "audio/vnd.dece.audio"],
  ["uvd", "application/vnd.dece.data"],
  ["uvf", "application/vnd.dece.data"],
  ["uvg", "image/vnd.dece.graphic"],
  ["uvh", "video/vnd.dece.hd"],
  ["uvi", "image/vnd.dece.graphic"],
  ["uvm", "video/vnd.dece.mobile"],
  ["uvp", "video/vnd.dece.pd"],
  ["uvs", "video/vnd.dece.sd"],
  ["uvt", "application/vnd.dece.ttml+xml"],
  ["uvu", "video/vnd.uvvu.mp4"],
  ["uvv", "video/vnd.dece.video"],
  ["uvva", "audio/vnd.dece.audio"],
  ["uvvd", "application/vnd.dece.data"],
  ["uvvf", "application/vnd.dece.data"],
  ["uvvg", "image/vnd.dece.graphic"],
  ["uvvh", "video/vnd.dece.hd"],
  ["uvvi", "image/vnd.dece.graphic"],
  ["uvvm", "video/vnd.dece.mobile"],
  ["uvvp", "video/vnd.dece.pd"],
  ["uvvs", "video/vnd.dece.sd"],
  ["uvvt", "application/vnd.dece.ttml+xml"],
  ["uvvu", "video/vnd.uvvu.mp4"],
  ["uvvv", "video/vnd.dece.video"],
  ["uvvx", "application/vnd.dece.unspecified"],
  ["uvvz", "application/vnd.dece.zip"],
  ["uvx", "application/vnd.dece.unspecified"],
  ["uvz", "application/vnd.dece.zip"],
  ["vbox", "application/x-virtualbox-vbox"],
  ["vbox-extpack", "application/x-virtualbox-vbox-extpack"],
  ["vcard", "text/vcard"],
  ["vcd", "application/x-cdlink"],
  ["vcf", "text/x-vcard"],
  ["vcg", "application/vnd.groove-vcard"],
  ["vcs", "text/x-vcalendar"],
  ["vcx", "application/vnd.vcx"],
  ["vdi", "application/x-virtualbox-vdi"],
  ["vds", "model/vnd.sap.vds"],
  ["vhd", "application/x-virtualbox-vhd"],
  ["vis", "application/vnd.visionary"],
  ["viv", "video/vnd.vivo"],
  ["vlc", "application/videolan"],
  ["vmdk", "application/x-virtualbox-vmdk"],
  ["vob", "video/x-ms-vob"],
  ["vor", "application/vnd.stardivision.writer"],
  ["vox", "application/x-authorware-bin"],
  ["vrml", "model/vrml"],
  ["vsd", "application/vnd.visio"],
  ["vsf", "application/vnd.vsf"],
  ["vss", "application/vnd.visio"],
  ["vst", "application/vnd.visio"],
  ["vsw", "application/vnd.visio"],
  ["vtf", "image/vnd.valve.source.texture"],
  ["vtt", "text/vtt"],
  ["vtu", "model/vnd.vtu"],
  ["vxml", "application/voicexml+xml"],
  ["w3d", "application/x-director"],
  ["wad", "application/x-doom"],
  ["wadl", "application/vnd.sun.wadl+xml"],
  ["war", "application/java-archive"],
  ["wasm", "application/wasm"],
  ["wav", "audio/x-wav"],
  ["wax", "audio/x-ms-wax"],
  ["wbmp", "image/vnd.wap.wbmp"],
  ["wbs", "application/vnd.criticaltools.wbs+xml"],
  ["wbxml", "application/wbxml"],
  ["wcm", "application/vnd.ms-works"],
  ["wdb", "application/vnd.ms-works"],
  ["wdp", "image/vnd.ms-photo"],
  ["weba", "audio/webm"],
  ["webapp", "application/x-web-app-manifest+json"],
  ["webm", "video/webm"],
  ["webmanifest", "application/manifest+json"],
  ["webp", "image/webp"],
  ["wg", "application/vnd.pmi.widget"],
  ["wgt", "application/widget"],
  ["wks", "application/vnd.ms-works"],
  ["wm", "video/x-ms-wm"],
  ["wma", "audio/x-ms-wma"],
  ["wmd", "application/x-ms-wmd"],
  ["wmf", "image/wmf"],
  ["wml", "text/vnd.wap.wml"],
  ["wmlc", "application/wmlc"],
  ["wmls", "text/vnd.wap.wmlscript"],
  ["wmlsc", "application/vnd.wap.wmlscriptc"],
  ["wmv", "video/x-ms-wmv"],
  ["wmx", "video/x-ms-wmx"],
  ["wmz", "application/x-msmetafile"],
  ["woff", "font/woff"],
  ["woff2", "font/woff2"],
  ["word", "application/msword"],
  ["wpd", "application/vnd.wordperfect"],
  ["wpl", "application/vnd.ms-wpl"],
  ["wps", "application/vnd.ms-works"],
  ["wqd", "application/vnd.wqd"],
  ["wri", "application/x-mswrite"],
  ["wrl", "model/vrml"],
  ["wsc", "message/vnd.wfa.wsc"],
  ["wsdl", "application/wsdl+xml"],
  ["wspolicy", "application/wspolicy+xml"],
  ["wtb", "application/vnd.webturbo"],
  ["wvx", "video/x-ms-wvx"],
  ["x3d", "model/x3d+xml"],
  ["x3db", "model/x3d+fastinfoset"],
  ["x3dbz", "model/x3d+binary"],
  ["x3dv", "model/x3d-vrml"],
  ["x3dvz", "model/x3d+vrml"],
  ["x3dz", "model/x3d+xml"],
  ["x32", "application/x-authorware-bin"],
  ["x_b", "model/vnd.parasolid.transmit.binary"],
  ["x_t", "model/vnd.parasolid.transmit.text"],
  ["xaml", "application/xaml+xml"],
  ["xap", "application/x-silverlight-app"],
  ["xar", "application/vnd.xara"],
  ["xav", "application/xcap-att+xml"],
  ["xbap", "application/x-ms-xbap"],
  ["xbd", "application/vnd.fujixerox.docuworks.binder"],
  ["xbm", "image/x-xbitmap"],
  ["xca", "application/xcap-caps+xml"],
  ["xcs", "application/calendar+xml"],
  ["xdf", "application/xcap-diff+xml"],
  ["xdm", "application/vnd.syncml.dm+xml"],
  ["xdp", "application/vnd.adobe.xdp+xml"],
  ["xdssc", "application/dssc+xml"],
  ["xdw", "application/vnd.fujixerox.docuworks"],
  ["xel", "application/xcap-el+xml"],
  ["xenc", "application/xenc+xml"],
  ["xer", "application/patch-ops-error+xml"],
  ["xfdf", "application/vnd.adobe.xfdf"],
  ["xfdl", "application/vnd.xfdl"],
  ["xht", "application/xhtml+xml"],
  ["xhtml", "application/xhtml+xml"],
  ["xhvml", "application/xv+xml"],
  ["xif", "image/vnd.xiff"],
  ["xl", "application/excel"],
  ["xla", "application/vnd.ms-excel"],
  ["xlam", "application/vnd.ms-excel.addin.macroEnabled.12"],
  ["xlc", "application/vnd.ms-excel"],
  ["xlf", "application/xliff+xml"],
  ["xlm", "application/vnd.ms-excel"],
  ["xls", "application/vnd.ms-excel"],
  ["xlsb", "application/vnd.ms-excel.sheet.binary.macroEnabled.12"],
  ["xlsm", "application/vnd.ms-excel.sheet.macroEnabled.12"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ["xlt", "application/vnd.ms-excel"],
  ["xltm", "application/vnd.ms-excel.template.macroEnabled.12"],
  ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"],
  ["xlw", "application/vnd.ms-excel"],
  ["xm", "audio/xm"],
  ["xml", "application/xml"],
  ["xns", "application/xcap-ns+xml"],
  ["xo", "application/vnd.olpc-sugar"],
  ["xop", "application/xop+xml"],
  ["xpi", "application/x-xpinstall"],
  ["xpl", "application/xproc+xml"],
  ["xpm", "image/x-xpixmap"],
  ["xpr", "application/vnd.is-xpr"],
  ["xps", "application/vnd.ms-xpsdocument"],
  ["xpw", "application/vnd.intercon.formnet"],
  ["xpx", "application/vnd.intercon.formnet"],
  ["xsd", "application/xml"],
  ["xsl", "application/xml"],
  ["xslt", "application/xslt+xml"],
  ["xsm", "application/vnd.syncml+xml"],
  ["xspf", "application/xspf+xml"],
  ["xul", "application/vnd.mozilla.xul+xml"],
  ["xvm", "application/xv+xml"],
  ["xvml", "application/xv+xml"],
  ["xwd", "image/x-xwindowdump"],
  ["xyz", "chemical/x-xyz"],
  ["xz", "application/x-xz"],
  ["yaml", "text/yaml"],
  ["yang", "application/yang"],
  ["yin", "application/yin+xml"],
  ["yml", "text/yaml"],
  ["ymp", "text/x-suse-ymp"],
  ["z", "application/x-compress"],
  ["z1", "application/x-zmachine"],
  ["z2", "application/x-zmachine"],
  ["z3", "application/x-zmachine"],
  ["z4", "application/x-zmachine"],
  ["z5", "application/x-zmachine"],
  ["z6", "application/x-zmachine"],
  ["z7", "application/x-zmachine"],
  ["z8", "application/x-zmachine"],
  ["zaz", "application/vnd.zzazz.deck+xml"],
  ["zip", "application/zip"],
  ["zir", "application/vnd.zul"],
  ["zirz", "application/vnd.zul"],
  ["zmm", "application/vnd.handheld-entertainment+xml"],
  ["zsh", "text/x-scriptzsh"]
]);
function yt(e, t, r) {
  const n = hc(e), { webkitRelativePath: a } = e, i = typeof t == "string" ? t : typeof a == "string" && a.length > 0 ? a : `./${e.name}`;
  return typeof n.path != "string" && zn(n, "path", i), zn(n, "relativePath", i), n;
}
function hc(e) {
  const { name: t } = e;
  if (t && t.lastIndexOf(".") !== -1 && !e.type) {
    const n = t.split(".").pop().toLowerCase(), a = mc.get(n);
    a && Object.defineProperty(e, "type", {
      value: a,
      writable: !1,
      configurable: !1,
      enumerable: !0
    });
  }
  return e;
}
function zn(e, t, r) {
  Object.defineProperty(e, t, {
    value: r,
    writable: !1,
    configurable: !1,
    enumerable: !0
  });
}
const gc = [
  // Thumbnail cache files for macOS and Windows
  ".DS_Store",
  // macOs
  "Thumbs.db"
  // Windows
];
function bc(e) {
  return lt(this, void 0, void 0, function* () {
    return Jt(e) && vc(e.dataTransfer) ? kc(e.dataTransfer, e.type) : xc(e) ? yc(e) : Array.isArray(e) && e.every((t) => "getFile" in t && typeof t.getFile == "function") ? wc(e) : [];
  });
}
function vc(e) {
  return Jt(e);
}
function xc(e) {
  return Jt(e) && Jt(e.target);
}
function Jt(e) {
  return typeof e == "object" && e !== null;
}
function yc(e) {
  return Pr(e.target.files).map((t) => yt(t));
}
function wc(e) {
  return lt(this, void 0, void 0, function* () {
    return (yield Promise.all(e.map((r) => r.getFile()))).map((r) => yt(r));
  });
}
function kc(e, t) {
  return lt(this, void 0, void 0, function* () {
    if (e.items) {
      const r = Pr(e.items).filter((a) => a.kind === "file");
      if (t !== "drop")
        return r;
      const n = yield Promise.all(r.map(Cc));
      return An(Da(n));
    }
    return An(Pr(e.files).map((r) => yt(r)));
  });
}
function An(e) {
  return e.filter((t) => gc.indexOf(t.name) === -1);
}
function Pr(e) {
  if (e === null)
    return [];
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    t.push(n);
  }
  return t;
}
function Cc(e) {
  if (typeof e.webkitGetAsEntry != "function")
    return Rn(e);
  const t = e.webkitGetAsEntry();
  return t && t.isDirectory ? Ma(t) : Rn(e, t);
}
function Da(e) {
  return e.reduce((t, r) => [
    ...t,
    ...Array.isArray(r) ? Da(r) : [r]
  ], []);
}
function Rn(e, t) {
  return lt(this, void 0, void 0, function* () {
    var r;
    if (globalThis.isSecureContext && typeof e.getAsFileSystemHandle == "function") {
      const i = yield e.getAsFileSystemHandle();
      if (i === null)
        throw new Error(`${e} is not a File`);
      if (i !== void 0) {
        const o = yield i.getFile();
        return o.handle = i, yt(o);
      }
    }
    const n = e.getAsFile();
    if (!n)
      throw new Error(`${e} is not a File`);
    return yt(n, (r = t == null ? void 0 : t.fullPath) !== null && r !== void 0 ? r : void 0);
  });
}
function Nc(e) {
  return lt(this, void 0, void 0, function* () {
    return e.isDirectory ? Ma(e) : Tc(e);
  });
}
function Ma(e) {
  const t = e.createReader();
  return new Promise((r, n) => {
    const a = [];
    function i() {
      t.readEntries((o) => lt(this, void 0, void 0, function* () {
        if (o.length) {
          const s = Promise.all(o.map(Nc));
          a.push(s), i();
        } else
          try {
            const s = yield Promise.all(a);
            r(s);
          } catch (s) {
            n(s);
          }
      }), (o) => {
        n(o);
      });
    }
    i();
  });
}
function Tc(e) {
  return lt(this, void 0, void 0, function* () {
    return new Promise((t, r) => {
      e.file((n) => {
        const a = yt(n, e.fullPath);
        t(a);
      }, (n) => {
        r(n);
      });
    });
  });
}
var Vt = {}, In;
function Ec() {
  return In || (In = 1, Vt.__esModule = !0, Vt.default = function(e, t) {
    if (e && t) {
      var r = Array.isArray(t) ? t : t.split(",");
      if (r.length === 0)
        return !0;
      var n = e.name || "", a = (e.type || "").toLowerCase(), i = a.replace(/\/.*$/, "");
      return r.some(function(o) {
        var s = o.trim().toLowerCase();
        return s.charAt(0) === "." ? n.toLowerCase().endsWith(s) : s.endsWith("/*") ? i === s.replace(/\/.*$/, "") : a === s;
      });
    }
    return !0;
  }), Vt;
}
var Sc = Ec();
const Tr = /* @__PURE__ */ rr(Sc);
function Fn(e) {
  return Dc(e) || jc(e) || Pa(e) || Oc();
}
function Oc() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function jc(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Dc(e) {
  if (Array.isArray(e)) return $r(e);
}
function Ln(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ln(Object(r), !0).forEach(function(n) {
      _a(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ln(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _a(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Dt(e, t) {
  return Pc(e) || _c(e, t) || Pa(e, t) || Mc();
}
function Mc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Pa(e, t) {
  if (e) {
    if (typeof e == "string") return $r(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return $r(e, t);
  }
}
function $r(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function _c(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n = [], a = !0, i = !1, o, s;
    try {
      for (r = r.call(e); !(a = (o = r.next()).done) && (n.push(o.value), !(t && n.length === t)); a = !0)
        ;
    } catch (l) {
      i = !0, s = l;
    } finally {
      try {
        !a && r.return != null && r.return();
      } finally {
        if (i) throw s;
      }
    }
    return n;
  }
}
function Pc(e) {
  if (Array.isArray(e)) return e;
}
var $c = typeof Tr == "function" ? Tr : Tr.default, zc = "file-invalid-type", Ac = "file-too-large", Rc = "file-too-small", Ic = "too-many-files", Fc = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", r = t.split(","), n = r.length > 1 ? "one of ".concat(r.join(", ")) : r[0];
  return {
    code: zc,
    message: "File type must be ".concat(n)
  };
}, qn = function(t) {
  return {
    code: Ac,
    message: "File is larger than ".concat(t, " ").concat(t === 1 ? "byte" : "bytes")
  };
}, Vn = function(t) {
  return {
    code: Rc,
    message: "File is smaller than ".concat(t, " ").concat(t === 1 ? "byte" : "bytes")
  };
}, Lc = {
  code: Ic,
  message: "Too many files"
};
function $a(e, t) {
  var r = e.type === "application/x-moz-file" || $c(e, t);
  return [r, r ? null : Fc(t)];
}
function za(e, t, r) {
  if (at(e.size))
    if (at(t) && at(r)) {
      if (e.size > r) return [!1, qn(r)];
      if (e.size < t) return [!1, Vn(t)];
    } else {
      if (at(t) && e.size < t) return [!1, Vn(t)];
      if (at(r) && e.size > r) return [!1, qn(r)];
    }
  return [!0, null];
}
function at(e) {
  return e != null;
}
function Wc(e) {
  var t = e.files, r = e.accept, n = e.minSize, a = e.maxSize, i = e.multiple, o = e.maxFiles, s = e.validator;
  return !i && t.length > 1 || i && o >= 1 && t.length > o ? !1 : t.every(function(l) {
    var u = $a(l, r), d = Dt(u, 1), p = d[0], b = za(l, n, a), v = Dt(b, 1), E = v[0], y = s ? s(l) : null;
    return p && E && !y;
  });
}
function er(e) {
  return typeof e.isPropagationStopped == "function" ? e.isPropagationStopped() : typeof e.cancelBubble < "u" ? e.cancelBubble : !1;
}
function Ht(e) {
  return e.dataTransfer ? Array.prototype.some.call(e.dataTransfer.types, function(t) {
    return t === "Files" || t === "application/x-moz-file";
  }) : !!e.target && !!e.target.files;
}
function Hn(e) {
  e.preventDefault();
}
function qc(e) {
  return e.indexOf("MSIE") !== -1 || e.indexOf("Trident/") !== -1;
}
function Vc(e) {
  return e.indexOf("Edge/") !== -1;
}
function Hc() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.navigator.userAgent;
  return qc(e) || Vc(e);
}
function Re() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    for (var a = arguments.length, i = new Array(a > 1 ? a - 1 : 0), o = 1; o < a; o++)
      i[o - 1] = arguments[o];
    return t.some(function(s) {
      return !er(n) && s && s.apply(void 0, [n].concat(i)), er(n);
    });
  };
}
function Yc() {
  return "showOpenFilePicker" in window;
}
function Bc(e) {
  if (at(e)) {
    var t = Object.entries(e).filter(function(r) {
      var n = Dt(r, 2), a = n[0], i = n[1], o = !0;
      return Aa(a) || (console.warn('Skipped "'.concat(a, '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')), o = !1), (!Array.isArray(i) || !i.every(Ra)) && (console.warn('Skipped "'.concat(a, '" because an invalid file extension was provided.')), o = !1), o;
    }).reduce(function(r, n) {
      var a = Dt(n, 2), i = a[0], o = a[1];
      return Wn(Wn({}, r), {}, _a({}, i, o));
    }, {});
    return [{
      // description is required due to https://crbug.com/1264708
      description: "Files",
      accept: t
    }];
  }
  return e;
}
function Uc(e) {
  if (at(e))
    return Object.entries(e).reduce(function(t, r) {
      var n = Dt(r, 2), a = n[0], i = n[1];
      return [].concat(Fn(t), [a], Fn(i));
    }, []).filter(function(t) {
      return Aa(t) || Ra(t);
    }).join(",");
}
function Gc(e) {
  return e instanceof DOMException && (e.name === "AbortError" || e.code === e.ABORT_ERR);
}
function Xc(e) {
  return e instanceof DOMException && (e.name === "SecurityError" || e.code === e.SECURITY_ERR);
}
function Aa(e) {
  return e === "audio/*" || e === "video/*" || e === "image/*" || e === "text/*" || e === "application/*" || /\w+\/[-+.\w]+/g.test(e);
}
function Ra(e) {
  return /^.*\.[\w]+$/.test(e);
}
var Kc = ["children"], Qc = ["open"], Zc = ["refKey", "role", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"], Jc = ["refKey", "onChange", "onClick"];
function ed(e) {
  return nd(e) || rd(e) || Ia(e) || td();
}
function td() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rd(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function nd(e) {
  if (Array.isArray(e)) return zr(e);
}
function Er(e, t) {
  return od(e) || id(e, t) || Ia(e, t) || ad();
}
function ad() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ia(e, t) {
  if (e) {
    if (typeof e == "string") return zr(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return zr(e, t);
  }
}
function zr(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function id(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n = [], a = !0, i = !1, o, s;
    try {
      for (r = r.call(e); !(a = (o = r.next()).done) && (n.push(o.value), !(t && n.length === t)); a = !0)
        ;
    } catch (l) {
      i = !0, s = l;
    } finally {
      try {
        !a && r.return != null && r.return();
      } finally {
        if (i) throw s;
      }
    }
    return n;
  }
}
function od(e) {
  if (Array.isArray(e)) return e;
}
function Yn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yn(Object(r), !0).forEach(function(n) {
      Ar(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Yn(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ar(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tr(e, t) {
  if (e == null) return {};
  var r = sd(e, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function sd(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
var Hr = /* @__PURE__ */ Ba(function(e, t) {
  var r = e.children, n = tr(e, Kc), a = La(n), i = a.open, o = tr(a, Qc);
  return Ua(t, function() {
    return {
      open: i
    };
  }, [i]), /* @__PURE__ */ Se.createElement(Ga, null, r(xe(xe({}, o), {}, {
    open: i
  })));
});
Hr.displayName = "Dropzone";
var Fa = {
  disabled: !1,
  getFilesFromEvent: bc,
  maxSize: 1 / 0,
  minSize: 0,
  multiple: !0,
  maxFiles: 0,
  preventDropOnDocument: !0,
  noClick: !1,
  noKeyboard: !1,
  noDrag: !1,
  noDragEventsBubbling: !1,
  validator: null,
  useFsAccessApi: !1,
  autoFocus: !1
};
Hr.defaultProps = Fa;
Hr.propTypes = {
  /**
   * Render function that exposes the dropzone state and prop getter fns
   *
   * @param {object} params
   * @param {Function} params.getRootProps Returns the props you should apply to the root drop container you render
   * @param {Function} params.getInputProps Returns the props you should apply to hidden file input you render
   * @param {Function} params.open Open the native file selection dialog
   * @param {boolean} params.isFocused Dropzone area is in focus
   * @param {boolean} params.isFileDialogActive File dialog is opened
   * @param {boolean} params.isDragActive Active drag is in progress
   * @param {boolean} params.isDragAccept Dragged files are accepted
   * @param {boolean} params.isDragReject Some dragged files are rejected
   * @param {File[]} params.acceptedFiles Accepted files
   * @param {FileRejection[]} params.fileRejections Rejected files and why they were rejected
   */
  children: he.func,
  /**
   * Set accepted file types.
   * Checkout https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker types option for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all (https://github.com/react-dropzone/react-dropzone/issues/276).
   */
  accept: he.objectOf(he.arrayOf(he.string)),
  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files
   */
  multiple: he.bool,
  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: he.bool,
  /**
   * If true, disables click to open the native file selection dialog
   */
  noClick: he.bool,
  /**
   * If true, disables SPACE/ENTER to open the native file selection dialog.
   * Note that it also stops tracking the focus state.
   */
  noKeyboard: he.bool,
  /**
   * If true, disables drag 'n' drop
   */
  noDrag: he.bool,
  /**
   * If true, stops drag event propagation to parents
   */
  noDragEventsBubbling: he.bool,
  /**
   * Minimum file size (in bytes)
   */
  minSize: he.number,
  /**
   * Maximum file size (in bytes)
   */
  maxSize: he.number,
  /**
   * Maximum accepted number of files
   * The default value is 0 which means there is no limitation to how many files are accepted.
   */
  maxFiles: he.number,
  /**
   * Enable/disable the dropzone
   */
  disabled: he.bool,
  /**
   * Use this to provide a custom file aggregator
   *
   * @param {(DragEvent|Event|Array<FileSystemFileHandle>)} event A drag event or input change event (if files were selected via the file dialog)
   */
  getFilesFromEvent: he.func,
  /**
   * Cb for when closing the file dialog with no selection
   */
  onFileDialogCancel: he.func,
  /**
   * Cb for when opening the file dialog
   */
  onFileDialogOpen: he.func,
  /**
   * Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
   * to open the file picker instead of using an `<input type="file">` click event.
   */
  useFsAccessApi: he.bool,
  /**
   * Set to true to focus the root element on render
   */
  autoFocus: he.bool,
  /**
   * Cb for when the `dragenter` event occurs.
   *
   * @param {DragEvent} event
   */
  onDragEnter: he.func,
  /**
   * Cb for when the `dragleave` event occurs
   *
   * @param {DragEvent} event
   */
  onDragLeave: he.func,
  /**
   * Cb for when the `dragover` event occurs
   *
   * @param {DragEvent} event
   */
  onDragOver: he.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
   *
   * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
   * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
   * If `multiple` is set to false and additional files are dropped,
   * all files besides the first will be rejected.
   * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
   *
   * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
   * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
   *
   * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
   * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
   *
   * ```js
   * function onDrop(acceptedFiles) {
   *   const req = request.post('/upload')
   *   acceptedFiles.forEach(file => {
   *     req.attach(file.name, file)
   *   })
   *   req.end(callback)
   * }
   * ```
   *
   * @param {File[]} acceptedFiles
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  onDrop: he.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are accepted, this callback is not invoked.
   *
   * @param {File[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropAccepted: he.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are rejected, this callback is not invoked.
   *
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event
   */
  onDropRejected: he.func,
  /**
   * Cb for when there's some error from any of the promises.
   *
   * @param {Error} error
   */
  onError: he.func,
  /**
   * Custom validation function. It must return null if there's no errors.
   * @param {File} file
   * @returns {FileError|FileError[]|null}
   */
  validator: he.func
};
var Rr = {
  isFocused: !1,
  isFileDialogActive: !1,
  isDragActive: !1,
  isDragAccept: !1,
  isDragReject: !1,
  acceptedFiles: [],
  fileRejections: []
};
function La() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = xe(xe({}, Fa), e), r = t.accept, n = t.disabled, a = t.getFilesFromEvent, i = t.maxSize, o = t.minSize, s = t.multiple, l = t.maxFiles, u = t.onDragEnter, d = t.onDragLeave, p = t.onDragOver, b = t.onDrop, v = t.onDropAccepted, E = t.onDropRejected, y = t.onFileDialogCancel, M = t.onFileDialogOpen, w = t.useFsAccessApi, k = t.autoFocus, C = t.preventDropOnDocument, _ = t.noClick, x = t.noKeyboard, h = t.noDrag, P = t.noDragEventsBubbling, g = t.onError, q = t.validator, J = Me(function() {
    return Uc(r);
  }, [r]), T = Me(function() {
    return Bc(r);
  }, [r]), A = Me(function() {
    return typeof M == "function" ? M : Bn;
  }, [M]), V = Me(function() {
    return typeof y == "function" ? y : Bn;
  }, [y]), $ = Ne(null), X = Ne(null), W = Ya(ld, Rr), K = Er(W, 2), m = K[0], N = K[1], f = m.isFocused, S = m.isFileDialogActive, L = Ne(typeof window < "u" && window.isSecureContext && w && Yc()), O = function() {
    !L.current && S && setTimeout(function() {
      if (X.current) {
        var Z = X.current.files;
        Z.length || (N({
          type: "closeDialog"
        }), V());
      }
    }, 300);
  };
  ye(function() {
    return window.addEventListener("focus", O, !1), function() {
      window.removeEventListener("focus", O, !1);
    };
  }, [X, S, V, L]);
  var j = Ne([]), R = function(Z) {
    $.current && $.current.contains(Z.target) || (Z.preventDefault(), j.current = []);
  };
  ye(function() {
    return C && (document.addEventListener("dragover", Hn, !1), document.addEventListener("drop", R, !1)), function() {
      C && (document.removeEventListener("dragover", Hn), document.removeEventListener("drop", R));
    };
  }, [$, C]), ye(function() {
    return !n && k && $.current && $.current.focus(), function() {
    };
  }, [$, k, n]);
  var B = De(function(H) {
    g ? g(H) : console.error(H);
  }, [g]), Y = De(function(H) {
    H.preventDefault(), H.persist(), me(H), j.current = [].concat(ed(j.current), [H.target]), Ht(H) && Promise.resolve(a(H)).then(function(Z) {
      if (!(er(H) && !P)) {
        var ue = Z.length, oe = ue > 0 && Wc({
          files: Z,
          accept: J,
          minSize: o,
          maxSize: i,
          multiple: s,
          maxFiles: l,
          validator: q
        }), ge = ue > 0 && !oe;
        N({
          isDragAccept: oe,
          isDragReject: ge,
          isDragActive: !0,
          type: "setDraggedFiles"
        }), u && u(H);
      }
    }).catch(function(Z) {
      return B(Z);
    });
  }, [a, u, B, P, J, o, i, s, l, q]), re = De(function(H) {
    H.preventDefault(), H.persist(), me(H);
    var Z = Ht(H);
    if (Z && H.dataTransfer)
      try {
        H.dataTransfer.dropEffect = "copy";
      } catch {
      }
    return Z && p && p(H), !1;
  }, [p, P]), ne = De(function(H) {
    H.preventDefault(), H.persist(), me(H);
    var Z = j.current.filter(function(oe) {
      return $.current && $.current.contains(oe);
    }), ue = Z.indexOf(H.target);
    ue !== -1 && Z.splice(ue, 1), j.current = Z, !(Z.length > 0) && (N({
      type: "setDraggedFiles",
      isDragActive: !1,
      isDragAccept: !1,
      isDragReject: !1
    }), Ht(H) && d && d(H));
  }, [$, d, P]), ee = De(function(H, Z) {
    var ue = [], oe = [];
    H.forEach(function(ge) {
      var je = $a(ge, J), $e = Er(je, 2), Le = $e[0], We = $e[1], qe = za(ge, o, i), Ae = Er(qe, 2), Ve = Ae[0], He = Ae[1], ct = q ? q(ge) : null;
      if (Le && Ve && !ct)
        ue.push(ge);
      else {
        var dt = [We, He];
        ct && (dt = dt.concat(ct)), oe.push({
          file: ge,
          errors: dt.filter(function(Wa) {
            return Wa;
          })
        });
      }
    }), (!s && ue.length > 1 || s && l >= 1 && ue.length > l) && (ue.forEach(function(ge) {
      oe.push({
        file: ge,
        errors: [Lc]
      });
    }), ue.splice(0)), N({
      acceptedFiles: ue,
      fileRejections: oe,
      isDragReject: oe.length > 0,
      type: "setFiles"
    }), b && b(ue, oe, Z), oe.length > 0 && E && E(oe, Z), ue.length > 0 && v && v(ue, Z);
  }, [N, s, J, o, i, l, b, v, E, q]), fe = De(function(H) {
    H.preventDefault(), H.persist(), me(H), j.current = [], Ht(H) && Promise.resolve(a(H)).then(function(Z) {
      er(H) && !P || ee(Z, H);
    }).catch(function(Z) {
      return B(Z);
    }), N({
      type: "reset"
    });
  }, [a, ee, B, P]), I = De(function() {
    if (L.current) {
      N({
        type: "openDialog"
      }), A();
      var H = {
        multiple: s,
        types: T
      };
      window.showOpenFilePicker(H).then(function(Z) {
        return a(Z);
      }).then(function(Z) {
        ee(Z, null), N({
          type: "closeDialog"
        });
      }).catch(function(Z) {
        Gc(Z) ? (V(Z), N({
          type: "closeDialog"
        })) : Xc(Z) ? (L.current = !1, X.current ? (X.current.value = null, X.current.click()) : B(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))) : B(Z);
      });
      return;
    }
    X.current && (N({
      type: "openDialog"
    }), A(), X.current.value = null, X.current.click());
  }, [N, A, V, w, ee, B, T, s]), ke = De(function(H) {
    !$.current || !$.current.isEqualNode(H.target) || (H.key === " " || H.key === "Enter" || H.keyCode === 32 || H.keyCode === 13) && (H.preventDefault(), I());
  }, [$, I]), Pe = De(function() {
    N({
      type: "focus"
    });
  }, []), ze = De(function() {
    N({
      type: "blur"
    });
  }, []), et = De(function() {
    _ || (Hc() ? setTimeout(I, 0) : I());
  }, [_, I]), Q = function(Z) {
    return n ? null : Z;
  }, ie = function(Z) {
    return x ? null : Q(Z);
  }, le = function(Z) {
    return h ? null : Q(Z);
  }, me = function(Z) {
    P && Z.stopPropagation();
  }, ve = Me(function() {
    return function() {
      var H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, Z = H.refKey, ue = Z === void 0 ? "ref" : Z, oe = H.role, ge = H.onKeyDown, je = H.onFocus, $e = H.onBlur, Le = H.onClick, We = H.onDragEnter, qe = H.onDragOver, Ae = H.onDragLeave, Ve = H.onDrop, He = tr(H, Zc);
      return xe(xe(Ar({
        onKeyDown: ie(Re(ge, ke)),
        onFocus: ie(Re(je, Pe)),
        onBlur: ie(Re($e, ze)),
        onClick: Q(Re(Le, et)),
        onDragEnter: le(Re(We, Y)),
        onDragOver: le(Re(qe, re)),
        onDragLeave: le(Re(Ae, ne)),
        onDrop: le(Re(Ve, fe)),
        role: typeof oe == "string" && oe !== "" ? oe : "presentation"
      }, ue, $), !n && !x ? {
        tabIndex: 0
      } : {}), He);
    };
  }, [$, ke, Pe, ze, et, Y, re, ne, fe, x, h, n]), we = De(function(H) {
    H.stopPropagation();
  }, []), Te = Me(function() {
    return function() {
      var H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, Z = H.refKey, ue = Z === void 0 ? "ref" : Z, oe = H.onChange, ge = H.onClick, je = tr(H, Jc), $e = Ar({
        accept: J,
        multiple: s,
        type: "file",
        style: {
          border: 0,
          clip: "rect(0, 0, 0, 0)",
          clipPath: "inset(50%)",
          height: "1px",
          margin: "0 -1px -1px 0",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          width: "1px",
          whiteSpace: "nowrap"
        },
        onChange: Q(Re(oe, fe)),
        onClick: Q(Re(ge, we)),
        tabIndex: -1
      }, ue, X);
      return xe(xe({}, $e), je);
    };
  }, [X, r, s, fe, n]);
  return xe(xe({}, m), {}, {
    isFocused: f && !n,
    getRootProps: ve,
    getInputProps: Te,
    rootRef: $,
    inputRef: X,
    open: Q(I)
  });
}
function ld(e, t) {
  switch (t.type) {
    case "focus":
      return xe(xe({}, e), {}, {
        isFocused: !0
      });
    case "blur":
      return xe(xe({}, e), {}, {
        isFocused: !1
      });
    case "openDialog":
      return xe(xe({}, Rr), {}, {
        isFileDialogActive: !0
      });
    case "closeDialog":
      return xe(xe({}, e), {}, {
        isFileDialogActive: !1
      });
    case "setDraggedFiles":
      return xe(xe({}, e), {}, {
        isDragActive: t.isDragActive,
        isDragAccept: t.isDragAccept,
        isDragReject: t.isDragReject
      });
    case "setFiles":
      return xe(xe({}, e), {}, {
        acceptedFiles: t.acceptedFiles,
        fileRejections: t.fileRejections,
        isDragReject: t.isDragReject
      });
    case "reset":
      return xe({}, Rr);
    default:
      return e;
  }
}
function Bn() {
}
const Nd = ({
  onFileSelect: e,
  onCancel: t,
  onSubmit: r,
  contentClassName: n,
  containerClassName: a,
  acceptedFileTypes: i = [
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpg",
    "image/png",
    "image/jpeg"
    /* JPEG */
  ],
  showStatusBadge: o = !0,
  uploadStatus: s,
  onStatusChange: l,
  initialPreviewUrl: u
}) => {
  const [d, p] = ae(null), [b, v] = ae(null), [E, y] = ae(u || null), [M, w] = ae(!1), [k, C] = ae(
    u ? "subido" : "pendiente"
    /* PENDING */
  );
  Ne(null), ye(() => {
    u && !d && (y(u), s === void 0 && C(
      "subido"
      /* UPLOADED */
    ));
  }, [u, d, s]);
  const _ = s || k, x = (W) => {
    s === void 0 && C(W), l == null || l(W);
  }, h = () => {
    const W = {};
    return i.forEach((K) => {
      switch (K) {
        case "application/pdf":
          W[
            "application/pdf"
            /* PDF */
          ] = [".pdf"];
          break;
        case "application/vnd.ms-excel":
          W[
            "application/vnd.ms-excel"
            /* XLS */
          ] = [".xls"];
          break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          W[
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            /* XLSX */
          ] = [".xlsx"];
          break;
        case "text/csv":
          W[
            "text/csv"
            /* CSV */
          ] = [".csv"];
          break;
        case "image/png":
          W[
            "image/png"
            /* PNG */
          ] = [".png"];
          break;
        case "image/jpg":
          W[
            "image/jpg"
            /* JPG */
          ] = [".jpg", ".jpeg"];
          break;
        case "image/jpeg":
          W[
            "image/jpeg"
            /* JPEG */
          ] = [".jpeg", ".jpg"];
          break;
      }
    }), W;
  }, P = () => {
    const W = [];
    return i.forEach((K) => {
      switch (K) {
        case "application/pdf":
          W.includes("PDF") || W.push("PDF");
          break;
        case "application/vnd.ms-excel":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          W.includes("EXCEL") || W.push("EXCEL");
          break;
        case "text/csv":
          W.includes("CSV") || W.push("CSV");
          break;
        case "image/png":
        case "image/jpg":
        case "image/jpeg":
          W.includes("IMAGEN") || W.push("IMAGEN");
          break;
      }
    }), W.join(", ");
  }, g = ({ status: W }) => {
    const K = {
      pendiente: {
        label: "Pendiente",
        color: "bg-warning-100 text-warning-800 border-warning-200",
        dotColor: "bg-warning-400"
      },
      subiendo: {
        label: "Subiendo...",
        color: "bg-primary-100 text-primary-800 border-primary-200",
        dotColor: "bg-primary-400 animate-pulse"
      },
      subido: {
        label: "Subido",
        color: "bg-success-100 text-success-800 border-success-200",
        dotColor: "bg-success-400"
      },
      error: {
        label: "Error",
        color: "bg-danger-100 text-danger-800 border-danger-200",
        dotColor: "bg-danger-400"
      }
    }, { label: m, color: N, dotColor: f } = K[W];
    return /* @__PURE__ */ D("div", { className: `inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${N}`, children: [
      /* @__PURE__ */ c("div", { className: `w-2 h-2 rounded-full ${f}` }),
      /* @__PURE__ */ c("span", { className: "text-xs font-medium flex items-center gap-1.5", children: m })
    ] });
  }, q = (W) => {
    const K = W[0];
    if (K)
      if (i.includes(K.type)) {
        if (p(K), v(K.type), x(
          "pendiente"
          /* PENDING */
        ), E && (URL.revokeObjectURL(E), y(null)), K.type.startsWith("image/")) {
          const m = URL.createObjectURL(K);
          y(m);
        }
      } else
        alert("Tipo de archivo no permitido."), p(null), v(null), y(null), x(
          "pendiente"
          /* PENDING */
        );
  }, { getRootProps: J, getInputProps: T, isDragActive: A } = La({
    onDrop: q,
    accept: h(),
    maxFiles: 1
  });
  ye(() => {
    (async () => {
    })();
  }, [d, b]), ye(() => () => {
    E && URL.revokeObjectURL(E);
  }, [E]);
  const V = async () => {
    if (d) {
      w(!0), x(
        "subiendo"
        /* UPLOADING */
      );
      try {
        await new Promise((W) => setTimeout(W, 1500)), e(d), r == null || r(d), x(
          "subido"
          /* UPLOADED */
        );
      } catch (W) {
        x(
          "error"
          /* ERROR */
        ), console.error("Error al subir archivo:", W);
      }
    }
  }, $ = () => {
    p(null), v(null), w(!1), x(
      "pendiente"
      /* PENDING */
    ), E && (URL.revokeObjectURL(E), y(null)), e(null), t == null || t();
  }, X = () => {
    $();
  };
  return b && b.startsWith("image/"), /* @__PURE__ */ D("div", { className: te("w-full transition-all duration-300", a), children: [
    /* @__PURE__ */ D("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ D("label", { className: "block text-sm font-semibold text-gray-700", children: [
        "Subir archivo ",
        /* @__PURE__ */ D("span", { className: "text-gray-400 font-normal text-xs", children: [
          "(",
          P(),
          ")"
        ] })
      ] }),
      o && d && /* @__PURE__ */ c(g, { status: _ })
    ] }),
    !d && !E ? /* @__PURE__ */ D(
      "div",
      {
        ...J(),
        className: `
            relative group flex flex-col items-center justify-center w-full p-6 
            border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out
            ${A ? "border-primary-500 bg-primary-50 scale-[1.01]" : "border-gray-300 bg-white hover:border-primary-400 hover:bg-gray-50"}
          `,
        children: [
          /* @__PURE__ */ c("input", { ...T() }),
          /* @__PURE__ */ c("div", { className: `mb-3 p-3 rounded-full transition-colors duration-300 ${A ? "bg-primary-100" : "bg-gray-100 group-hover:bg-primary-50"}`, children: /* @__PURE__ */ c(
            "svg",
            {
              className: `w-6 h-6 transition-colors duration-300 ${A ? "text-primary-600" : "text-gray-400 group-hover:text-primary-500"}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ c("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" })
            }
          ) }),
          /* @__PURE__ */ c("div", { className: "text-center space-y-1", children: /* @__PURE__ */ c("p", { className: `text-sm font-medium transition-colors duration-300 ${A ? "text-primary-700" : "text-gray-700"}`, children: A ? "¡Suelta aquí!" : "Haz clic o arrastra" }) })
        ]
      }
    ) : /* @__PURE__ */ D("div", { className: "w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-fade-in", children: [
      /* @__PURE__ */ c("div", { className: "flex items-center justify-between p-3 bg-gray-50 border-b border-gray-100", children: /* @__PURE__ */ D("div", { className: "flex items-center gap-3 overflow-hidden", children: [
        /* @__PURE__ */ c("div", { className: "flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600", children: d && (b != null && b.startsWith("image/")) || !d && E ? /* @__PURE__ */ c("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ c("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) : /* @__PURE__ */ c("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ c("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
        /* @__PURE__ */ D("div", { className: "min-w-0", children: [
          /* @__PURE__ */ c("p", { className: "text-xs font-medium text-gray-900 truncate", title: (d == null ? void 0 : d.name) || "Imagen cargada", children: (d == null ? void 0 : d.name) || "Imagen cargada" }),
          /* @__PURE__ */ c("p", { className: "text-[10px] text-gray-500", children: d ? (d.size / 1024 / 1024).toFixed(2) + " MB" : "" })
        ] })
      ] }) }),
      /* @__PURE__ */ c("div", { className: te("relative bg-gray-100 flex items-center justify-center", n || "max-h-[200px] min-h-[100px] overflow-auto"), children: d && (b != null && b.startsWith("image/")) || !d && E ? /* @__PURE__ */ c(
        "img",
        {
          src: E,
          alt: "Vista previa",
          className: "w-full h-full object-contain max-h-[200px]"
        }
      ) : /* @__PURE__ */ D("div", { className: "py-8 flex flex-col items-center text-gray-400", children: [
        /* @__PURE__ */ c("svg", { className: "w-10 h-10 mb-2 opacity-50", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ c("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }) }),
        /* @__PURE__ */ c("span", { className: "text-xs", children: "Sin vista previa" })
      ] }) }),
      /* @__PURE__ */ c("div", { className: "px-3 py-2 bg-white border-t border-gray-100 flex justify-end gap-2", children: M ? /* @__PURE__ */ D(
        "button",
        {
          type: "button",
          onClick: X,
          className: "px-3 py-1.5 text-xs font-medium text-danger-600 bg-danger-50 border border-danger-100 rounded-lg hover:bg-danger-100 transition-colors flex items-center gap-1",
          children: [
            /* @__PURE__ */ c("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ c("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }),
            /* @__PURE__ */ c("span", { children: "Eliminar" })
          ]
        }
      ) : /* @__PURE__ */ D(jt, { children: [
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: $,
            className: "px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ D(
          "button",
          {
            type: "button",
            onClick: V,
            className: "px-3 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm transition-colors flex items-center gap-1",
            children: [
              /* @__PURE__ */ c("span", { children: "Confirmar" }),
              /* @__PURE__ */ c("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ c("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) })
            ]
          }
        )
      ] }) }),
      _ === "subiendo" && /* @__PURE__ */ c("div", { className: "px-4 pb-2", children: /* @__PURE__ */ c("div", { className: "w-full bg-gray-200 rounded-full h-1.5", children: /* @__PURE__ */ c(
        "div",
        {
          className: "bg-primary-600 h-1.5 rounded-full transition-all duration-1000 ease-out",
          style: {
            width: "100%",
            animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }
        }
      ) }) })
    ] })
  ] });
};
function Td({
  steps: e,
  currentStep: t,
  onFinish: r,
  onStepChange: n,
  allowClickToJump: a = !0,
  useIcons: i = !1,
  disableNext: o = !1,
  containerClassName: s,
  stepClassName: l,
  scrollableContent: u = !1,
  maxContentHeight: d = "400px",
  color: p = "primary"
}) {
  const [b, v] = ae("next"), E = Ne(null), y = Ne(null), w = p in z.colors ? z.colors[p][500] : p;
  ye(() => {
    n == null || n(t);
  }, [t, n]), ye(() => {
    var P;
    const h = t / Math.max(1, e.length - 1) * 100;
    y.current && (y.current.style.width = `${h}%`, y.current.style.backgroundColor = w), E.current && (E.current.classList.remove(
      "animate-slide-in-left",
      "animate-slide-in-right"
    ), requestAnimationFrame(() => {
      var g;
      (g = E.current) == null || g.classList.add(
        b === "next" ? "animate-slide-in-right" : "animate-slide-in-left"
      );
    })), (P = E.current) == null || P.focus();
  }, [t, b, e.length, w]);
  const k = () => {
    o || (t < e.length - 1 ? (v("next"), n == null || n(t + 1)) : r == null || r());
  }, C = () => {
    t > 0 && (v("prev"), n == null || n(t - 1));
  }, _ = (h) => {
    a && h <= t && (v(h > t ? "next" : "prev"), n == null || n(h));
  }, x = (h, P, g) => {
    const q = e[h];
    return P ? /* @__PURE__ */ c(jr, { className: "w-4 h-4" }) : q.icon && i ? /* @__PURE__ */ c("div", { className: "flex items-center justify-center w-5 h-5", children: q.icon }) : /* @__PURE__ */ c("span", { className: "text-sm font-semibold", children: h + 1 });
  };
  return /* @__PURE__ */ D("div", { className: te("w-full max-w-5xl mx-auto px-4", s), children: [
    /* @__PURE__ */ D("div", { className: "relative mb-8", children: [
      /* @__PURE__ */ c(
        "div",
        {
          className: "absolute left-6 right-6 top-5 h-1 bg-gray-200 rounded-full z-0",
          "aria-hidden": !0
        }
      ),
      /* @__PURE__ */ c(
        "div",
        {
          ref: y,
          className: "absolute left-6 top-5 h-1 rounded-full z-10 transition-all duration-500 ease-in-out",
          "aria-hidden": !0
        }
      ),
      /* @__PURE__ */ c("div", { className: "flex items-start justify-between space-x-2 relative z-20", children: e.map((h, P) => {
        const g = P === t, q = P < t, J = h.icon && i;
        return /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => _(P),
            disabled: !a && P !== t,
            "aria-current": g ? "step" : void 0,
            "aria-label": `Paso ${P + 1} ${h.label}`,
            className: "flex-1 group",
            title: h.label,
            children: /* @__PURE__ */ D("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ c(
                "div",
                {
                  className: te(
                    "flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 transform",
                    J && "p-2",
                    q && "bg-slate-400 border-slate-400 text-white scale-100 shadow",
                    g && "text-white scale-110 shadow-lg",
                    !g && !q && "bg-white border-gray-300 text-gray-400"
                  ),
                  style: g ? { backgroundColor: w, borderColor: w } : void 0,
                  children: x(P, q)
                }
              ),
              /* @__PURE__ */ c(
                "span",
                {
                  className: te(
                    "mt-2 text-xs sm:text-sm font-medium transition-colors text-center",
                    q ? "text-slate-400" : !g && "text-gray-400"
                  ),
                  style: g ? { color: w } : void 0,
                  children: h.label
                }
              )
            ] })
          },
          P
        );
      }) })
    ] }),
    /* @__PURE__ */ c(
      "div",
      {
        ref: E,
        tabIndex: -1,
        role: "region",
        "aria-labelledby": `step-${t}`,
        className: te(
          l,
          "bg-white border border-gray-100 rounded-2xl shadow-lg min-h-[280px] transition-transform duration-400 no-scrollbar p-6",
          u && "overflow-y-auto hide-scrollbar"
        ),
        style: u && d ? { maxHeight: d } : void 0,
        children: e[t].content
      }
    ),
    /* @__PURE__ */ D("div", { className: "flex justify-between items-center mt-6", children: [
      /* @__PURE__ */ c(
        Sr,
        {
          variant: "outlined",
          color: "secondary",
          disabled: t === 0,
          onClick: C,
          children: /* @__PURE__ */ D("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ c(ir, {}),
            "Atrás"
          ] })
        }
      ),
      /* @__PURE__ */ D("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ D("div", { className: "text-sm text-gray-500 mr-2 hidden sm:block", children: [
          "Paso ",
          t + 1,
          " de ",
          e.length
        ] }),
        /* @__PURE__ */ c(
          Sr,
          {
            variant: "solid",
            color: p,
            disabled: o,
            onClick: k,
            children: /* @__PURE__ */ D("div", { className: "flex items-center gap-2", children: [
              t === e.length - 1 ? "Finalizar" : "Siguiente",
              t === e.length - 1 ? /* @__PURE__ */ c(jr, {}) : /* @__PURE__ */ c(xt, {})
            ] })
          }
        )
      ] })
    ] })
  ] });
}
export {
  yd as ITBadget,
  Sr as ITButton,
  fl as ITCalendar,
  ud as ITCard,
  ga as ITDatePicker,
  pd as ITDialog,
  Nd as ITDropfile,
  fd as ITFormBuilder,
  xd as ITImage,
  _t as ITInput,
  Cd as ITLayout,
  kd as ITLoader,
  bd as ITNavbar,
  Ol as ITPagination,
  or as ITSelect,
  md as ITSlideToggle,
  Td as ITStepper,
  hd as ITTable,
  vd as ITText,
  gl as ITTimePicker,
  gd as ITToast,
  wd as createValidationSchema
};
//# sourceMappingURL=index.es.js.map
