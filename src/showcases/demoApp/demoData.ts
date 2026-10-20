/**
 * Datos simulados del dashboard de demostración.
 *
 * Hace el papel del backend: el motor **nunca** hace red, así que el host expone
 * un `fetcher` por nombre de fuente (`usuarios`, `pedidos`) y el esquema solo
 * escribe `{ "$source": "usuarios" }`. Es exactamente el contrato de la fase 4:
 * el esquema nombra, el host resuelve.
 */

import type { ITDataTableFetchParams, ITDataTableResponse } from "../../index";

/** Un usuario del sistema. */
export interface DemoUsuario extends Record<string, unknown> {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
  alta: string;
  edad: number;
  empresa: string;
  turno: string;
}

/** Un pedido del sistema. */
export interface DemoPedido extends Record<string, unknown> {
  folio: string;
  cliente: string;
  total: number;
  estado: string;
  fecha: string;
}

/** Fuentes disponibles, por nombre. */
export type DemoSource = "usuarios" | "pedidos" | "productos";

/** Usuarios de ejemplo. */
export const USUARIOS: DemoUsuario[] = [
  "Ana Ruiz", "Luis Paredes", "Marcela Ortiz", "Jorge Cano", "Sofía Lara",
  "Diego Núñez", "Paula Ferrer", "Iván Robles", "Nora Salas", "Emilio Tapia",
  "Clara Vidal", "Hugo Medina", "Rita Campos", "Abel Cordero", "Lucía Ponce",
  "Mateo Barrios", "Elena Ríos", "Tomás Ávila", "Inés Lozano", "Bruno Cárdenas",
  "Alba Solís", "Ciro Mena", "Dora Ibáñez", "Fabián Correa", "Gala Nieves",
].map((nombre, index) => ({
  id: index + 1,
  nombre,
  correo: `${nombre.toLowerCase().replace(/[^a-z]+/g, ".")}@axzy.dev`,
  rol: ["Admin", "Operador", "Auditor", "Soporte"][index % 4],
  estado: index % 7 === 0 ? "Inactivo" : "Activo",
  alta: `2026-0${(index % 9) + 1}-${String((index % 27) + 1).padStart(2, "0")}`,
  edad: 22 + (index % 30),
  empresa: ["CYC ERP", "Puerto Nuevo", "CheckApp", "Grupo Delta", "Nova Salud"][index % 5],
  turno: ["08:00", "09:30", "14:00", "22:00"][index % 4],
}));

const CLIENTES = ["CYC ERP", "Puerto Nuevo", "CheckApp", "Grupo Delta", "Nova Salud", "Ferretería Sur"];
const ESTADOS = ["Pagado", "Pendiente", "Enviado", "Cancelado"];

/** Pedidos de ejemplo. */
export const PEDIDOS: DemoPedido[] = Array.from({ length: 42 }, (_, index) => ({
  folio: `PED-${String(1042 + index).padStart(4, "0")}`,
  cliente: CLIENTES[index % CLIENTES.length],
  total: Math.round((180 + ((index * 137) % 2400)) * 100) / 100,
  estado: ESTADOS[index % ESTADOS.length],
  fecha: `2026-${String((index % 9) + 1).padStart(2, "0")}-${String((index % 27) + 1).padStart(2, "0")}`,
}));

/** Borrador de usuario que envía el formulario del host. */
export interface DemoUsuarioInput {
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
  edad: number;
  empresa: string;
  turno: string;
  alta: string;
}

/** Crea un usuario y devuelve su id. */
export function crearUsuario(input: DemoUsuarioInput): number {
  const id = USUARIOS.reduce((max, usuario) => Math.max(max, usuario.id), 0) + 1;
  USUARIOS.unshift({ id, ...input, alta: new Date().toISOString().slice(0, 10) });
  return id;
}

/** Actualiza un usuario por id. */
export function actualizarUsuario(id: number, input: DemoUsuarioInput): void {
  const indice = USUARIOS.findIndex((usuario) => usuario.id === id);
  if (indice >= 0) USUARIOS[indice] = { ...USUARIOS[indice], ...input };
}

/** Elimina un usuario por id. */
export function eliminarUsuario(id: number): void {
  const indice = USUARIOS.findIndex((usuario) => usuario.id === id);
  if (indice >= 0) USUARIOS.splice(indice, 1);
}

/** Busca un usuario por id. */
export function obtenerUsuario(id: number): DemoUsuario | undefined {
  return USUARIOS.find((usuario) => usuario.id === id);
}

/** Productos de ejemplo. */
export const PRODUCTOS_DEMO = [
  ["AX-1001", "Teclado mecánico", 1290, 24, "Periféricos"],
  ["AX-1002", "Monitor 27\"", 6890, 8, "Pantallas"],
  ["AX-1003", "Mouse inalámbrico", 590, 61, "Periféricos"],
  ["AX-1004", "Docking station", 2450, 12, "Conectividad"],
  ["AX-1005", "Webcam 4K", 1890, 0, "Video"],
  ["AX-1006", "Audífonos", 990, 37, "Audio"],
  ["AX-1007", "Hub USB-C", 790, 44, "Conectividad"],
  ["AX-1008", "Silla ergonómica", 5490, 5, "Mobiliario"],
  ["AX-1009", "Escritorio eléctrico", 8990, 3, "Mobiliario"],
  ["AX-1010", "Lámpara de escritorio", 690, 28, "Iluminación"],
  ["AX-1011", "Base para laptop", 450, 52, "Accesorios"],
  ["AX-1012", "Cable HDMI 2.1", 320, 90, "Cables"],
].map(([sku, nombre, precio, stock, categoria]) => ({ sku, nombre, precio, stock, categoria }));

/** Colecciones por fuente. */
const COLECCIONES: Record<DemoSource, Record<string, unknown>[]> = {
  usuarios: USUARIOS as unknown as Record<string, unknown>[],
  pedidos: PEDIDOS as unknown as Record<string, unknown>[],
  productos: PRODUCTOS_DEMO as unknown as Record<string, unknown>[],
};

/** `true` cuando el nombre es una fuente registrada. */
export function isDemoSource(name: string): name is DemoSource {
  return name in COLECCIONES;
}

/** Filtro de estado activo (lo escribe el host). */
let estadoFiltro: string | null = null;

/** Fija el filtro de estado global; `null`/`Todos` lo desactiva. */
export function setEstadoFiltro(estado: string | null): void {
  estadoFiltro = estado && estado !== "Todos" ? estado : null;
}

/** Compara dos valores para ordenar. */
function compare(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), "es");
}

/**
 * Crea el `fetchData` de una fuente: aplica filtros, orden y paginación.
 *
 * El retardo simula la red para que se vean los estados de carga del motor.
 *
 * @example
 * const fetcher = createDemoFetcher("usuarios");
 * await fetcher({ page: 1, limit: 5, filters: {} });
 */
export function createDemoFetcher(source: DemoSource) {
  return async (params: ITDataTableFetchParams): Promise<ITDataTableResponse<Record<string, unknown>>> => {
    // Latencia simulada: hace visible el estado de carga de la tabla.
    await new Promise((resolve) => setTimeout(resolve, 260));

    let rows = [...COLECCIONES[source]];

    // Filtros por columna: igualdad para catálogo, subcadena para texto.
    for (const [key, value] of Object.entries(params.filters ?? {})) {
      if (value === undefined || value === null || value === "") continue;
      const needle = String(value).toLowerCase();
      rows = rows.filter((row) => String(row[key] ?? "").toLowerCase().includes(needle));
    }

    // Filtro triple del host (persistido en la URL).
    if (estadoFiltro) rows = rows.filter((row) => String(row.estado ?? "") === estadoFiltro);

    if (params.sort) {
      const { key, direction } = params.sort;
      rows.sort((a, b) => (direction === "asc" ? compare(a[key], b[key]) : compare(b[key], a[key])));
    }

    const total = rows.length;
    const start = (params.page - 1) * params.limit;
    return { data: rows.slice(start, start + params.limit), total };
  };
}
