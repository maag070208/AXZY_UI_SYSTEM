/**
 * Productos propios que se muestran en «Mis Productos» del portafolio
 * (`HomeShowcase`), con su pantalla de detalle (`ProductoDetalle`).
 *
 * La tarjeta muestra solo lo esencial (portada, nombre, una descripción corta y
 * el stack); lo demás vive en el detalle. Los productos con `capturas` abren
 * esa pantalla y las imágenes salen de `public/productos/`, tomadas de las apps
 * reales (ver `scripts/capturas/README.md`).
 */

/** Una pantalla del producto, con el texto que la describe. */
export interface CapturaProducto {
  /** Ruta pública de la imagen. */
  src: string;
  /** Qué muestra esa pantalla (se usa como pie en la pantalla de detalle). */
  titulo: string;
}

/** Fila de la ficha técnica: etiqueta y valor. */
export interface DatoTecnico {
  /** Nombre del dato (p. ej. «Plataformas»). */
  etiqueta: string;
  /** Valor del dato. */
  valor: string;
}

/** Producto del portafolio. */
export interface Producto {
  /** Identificador estable (clave de React y ancla). */
  id: string;
  /** Nombre del producto. */
  nombre: string;
  /** Etiqueta corta: tipo de producto. */
  tipo: string;
  /** Descripción corta, para la tarjeta. */
  descripcion: string;
  /** Descripción larga, para la pantalla de detalle. */
  detalle?: string;
  /** Qué resuelve, en puntos (solo en el detalle). */
  caracteristicas?: string[];
  /** Tecnologías principales (se muestran en la tarjeta). */
  stack: string[];
  /** Datos técnicos, solo en el detalle. */
  ficha?: DatoTecnico[];
  /** Enlace público. Se omite en productos cuyo repositorio no es público. */
  enlace?: string;
  /** Texto del enlace. */
  enlaceTexto?: string;
  /** Nota al pie del detalle (p. ej. de dónde salen las capturas). */
  nota?: string;
  /** Clases Tailwind del degradado (literales, para que Tailwind las vea). */
  gradiente: string;
  /** Ícono del producto. */
  icono: "desktop" | "terminal" | "layers" | "check";
  /** Capturas de la app real. Sin capturas no hay pantalla de detalle. */
  capturas?: CapturaProducto[];
}

export const PRODUCTOS: Producto[] = [
  {
    id: "axzy-ui-system",
    nombre: "AXZY UI System",
    tipo: "Librería",
    descripcion:
      "Librería de componentes React con Tailwind CSS v4. Más de 50 componentes enterprise con theming en runtime, TypeScript nativo y accesibilidad.",
    stack: ["React", "TypeScript", "Tailwind CSS v4", "npm"],
    enlace: "#ui-system",
    enlaceTexto: "Ver proyecto",
    gradiente: "from-primary-500 to-purple-500",
    icono: "layers",
  },
  {
    id: "checkapp",
    nombre: "CheckApp",
    tipo: "App web",
    descripcion:
      "Aplicación web para consultar información de manera rápida y sencilla. Desplegada y disponible en línea.",
    stack: ["Node.js", "React", "Deploy"],
    enlace: "https://checkapp.axzy.dev/",
    enlaceTexto: "Abrir CheckApp",
    gradiente: "from-emerald-500 to-cyan-500",
    icono: "check",
  },
  {
    id: "agente-puerto-nuevo",
    nombre: "Agente Puerto Nuevo",
    tipo: "App de escritorio",
    descripcion:
      "App de escritorio que instala, actualiza y respalda Puerto Nuevo con clics: revisa Git y Docker, arma el .env y vigila el sistema desde la bandeja.",
    detalle:
      "Acompaña al sistema Puerto Nuevo en la computadora del cliente. En la primera ejecución revisa que estén Git, Docker, Docker Compose y curl (y WSL en Windows), avisa qué descargar si falta algo, baja el repositorio, genera el .env con las claves y corre la instalación mostrando el avance paso a paso. Después queda en la bandeja del sistema: si el API deja de responder avisa, y si el equipo arrancó con la sesión lo reinicia solo. Está pensada para gente que no usa la terminal.",
    caracteristicas: [
      "Asistente de 4 pasos: herramientas, descarga, configuración e instalación.",
      "Panel con actualizar, abrir la web, direcciones de red con QR y espacio en disco.",
      "Bandeja del sistema con el estado en vivo (/api/v1/health cada 15 s) y arranque con la sesión.",
      "Respaldos de la base de datos y paquete de soporte en un .zip.",
      "Instaladores .exe, .dmg y .AppImage; los pasos viven en los scripts del repo, así que un git pull los actualiza sin reinstalar la app.",
    ],
    stack: ["Electron", "React", "TypeScript", "Tailwind CSS v4", "AXZY UI System"],
    ficha: [
      { etiqueta: "Plataformas", valor: "Windows, macOS y Linux" },
      { etiqueta: "Instaladores", valor: ".exe (NSIS x64), .dmg (arm64 y x64) y .AppImage (x64)" },
      { etiqueta: "Versión", valor: "1.1.0" },
      { etiqueta: "Base", valor: "Electron + React 19 + Tailwind CSS v4" },
      { etiqueta: "Interfaz", valor: "Componentes de AXZY UI System" },
      { etiqueta: "Monitoreo", valor: "Consulta /api/v1/health cada 15 s desde la bandeja" },
      { etiqueta: "Lógica", valor: "Scripts del repo (actualizar.sh, respaldar.sh, operar.sh): un git pull actualiza los pasos" },
      { etiqueta: "Alcance", valor: "Instalación, actualización, respaldos, relojes checadores y soporte" },
    ],
    nota: "Capturas de la aplicación en ejecución: el asistente de instalación, el panel de inicio y los ajustes.",
    gradiente: "from-primary-500 to-cyan-500",
    icono: "desktop",
    capturas: [
      { src: "/productos/agente-asistente.webp", titulo: "Asistente: revisa las herramientas y dice qué falta" },
      { src: "/productos/agente-inicio.webp", titulo: "Inicio: actualizar, abrir la web y direcciones de red" },
      { src: "/productos/agente-ajustes.webp", titulo: "Ajustes: herramientas, configuración y soporte" },
    ],
  },
  {
    id: "axzy-http-cli",
    nombre: "axzy",
    tipo: "CLI + TUI",
    descripcion:
      "Cliente HTTP para la terminal: una alternativa a Postman que guarda los requests como YAML versionable. Un binario en Rust con TUI y comandos para CI.",
    detalle:
      "Pensado para vivir en la terminal, al lado del código. Cada request es un archivo YAML dentro de .http/, así que se versiona en git y se revisa como cualquier otro archivo; la TUI de tres paneles sirve para explorar, editar y ejecutar, y los mismos comandos funcionan en CI: si un assert falla, el proceso termina con exit code 1. Es un único binario en Rust, sin runtime ni dependencias extra.",
    caracteristicas: [
      "Requests en YAML dentro de .http/, uno por archivo y organizados en carpetas: se revisan en git como cualquier código.",
      "Ambientes con variables {{var}} y secretos guardados en el keychain del sistema.",
      "Asserts, capturas con JSONPath y runner de carpetas; exit code 1 si algo falla, ideal para CI.",
      "Import desde Swagger/OpenAPI (incluso desde la página de Swagger UI), Postman, Insomnia y curl.",
      "TUI de tres paneles (Collections · Request · Response) con navegación estilo vim y 9 temas.",
    ],
    stack: ["Rust", "ratatui", "crossterm", "reqwest", "GitHub Actions"],
    ficha: [
      { etiqueta: "Binario", valor: "Único, en Rust (rust-version 1.88)" },
      { etiqueta: "Instalación", valor: "curl | sh, PowerShell o cargo install" },
      { etiqueta: "Requests", valor: "YAML en .http/, uno por archivo" },
      { etiqueta: "Ambientes", valor: "Variables {{var}} y secretos en el keychain del sistema" },
      { etiqueta: "TUI", valor: "ratatui + crossterm: 3 paneles, comandos estilo vim y 9 temas" },
      { etiqueta: "CI", valor: "Runner de carpetas con exit code 1 si un assert falla" },
      { etiqueta: "Import", valor: "Swagger/OpenAPI, Postman, Insomnia y curl" },
      { etiqueta: "Licencia", valor: "MIT" },
    ],
    nota: "Capturas de la TUI y la CLI reales, ejecutando un request contra una API local.",
    enlace: "https://github.com/maag070208/AXZY_HTTP_CLIENT_TERMINAL",
    enlaceTexto: "Ver el repositorio",
    gradiente: "from-purple-500 to-fuchsia-500",
    icono: "terminal",
    capturas: [
      { src: "/productos/axzy-tui.webp", titulo: "TUI: colección, request y respuesta JSON en tres paneles" },
      { src: "/productos/axzy-auth.webp", titulo: "Auth y respuesta en la misma pantalla" },
      { src: "/productos/axzy-cli.webp", titulo: "CLI: corre el request y reporta cada assert" },
    ],
  },
];
