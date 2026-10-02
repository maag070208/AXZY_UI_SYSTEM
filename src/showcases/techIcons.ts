/**
 * Local SVG icons for the portfolio tech grids.
 *
 * Every icon lives in `public/tech-icons/` (fetched from the Devicon set) so
 * the page never depends on third-party CDNs at runtime. Reference icons
 * through {@link techIcon} instead of hardcoding URLs, so a missing asset is a
 * type error rather than a broken image.
 *
 * @example
 * ```tsx
 * const icon = techIcon("typescript");
 * <img src={icon.src} alt="TypeScript" className={icon.mono ? "dark:invert" : ""} />
 * ```
 */

/** A tech icon: its public URL plus presentation hints. */
export interface TechIconEntry {
  /** Public path of the SVG asset. */
  src: string;
  /**
   * True for monochrome marks (GitHub, Express). The showcase inverts them in
   * dark mode, where a black glyph would disappear on the dark card.
   */
  mono?: boolean;
}

const ICONS = {
  // Languages
  typescript: { src: "/tech-icons/typescript.svg" },
  javascript: { src: "/tech-icons/javascript.svg" },
  csharp: { src: "/tech-icons/csharp.svg" },
  python: { src: "/tech-icons/python.svg" },
  kotlin: { src: "/tech-icons/kotlin.svg" },
  dart: { src: "/tech-icons/dart.svg" },
  // Frameworks & runtimes
  angular: { src: "/tech-icons/angular.svg" },
  react: { src: "/tech-icons/react.svg" },
  ionic: { src: "/tech-icons/ionic.svg" },
  dotnet: { src: "/tech-icons/dotnet.svg" },
  nodejs: { src: "/tech-icons/nodejs.svg" },
  flutter: { src: "/tech-icons/flutter.svg" },
  express: { src: "/tech-icons/express.svg", mono: true },
  electron: { src: "/tech-icons/electron.svg" },
  redux: { src: "/tech-icons/redux.svg" },
  // Markup, styles & data
  html5: { src: "/tech-icons/html5.svg" },
  css3: { src: "/tech-icons/css3.svg" },
  sass: { src: "/tech-icons/sass.svg" },
  mongodb: { src: "/tech-icons/mongodb.svg" },
  mysql: { src: "/tech-icons/mysql.svg" },
  // Mobile & platform
  android: { src: "/tech-icons/android.svg" },
  // Tooling & DevOps
  docker: { src: "/tech-icons/docker.svg" },
  git: { src: "/tech-icons/git.svg" },
  github: { src: "/tech-icons/github.svg", mono: true },
  gitlab: { src: "/tech-icons/gitlab.svg" },
  npm: { src: "/tech-icons/npm.svg" },
  visualstudio: { src: "/tech-icons/visualstudio.svg" },
  jest: { src: "/tech-icons/jest.svg" },
} as const satisfies Record<string, TechIconEntry>;

/** Name of an available local tech icon. */
export type TechIconName = keyof typeof ICONS;

/** Resolves a tech icon name to its local asset descriptor. */
export const techIcon = (name: TechIconName): TechIconEntry => ICONS[name];
