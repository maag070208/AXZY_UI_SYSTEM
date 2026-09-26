import React, { useState, useMemo, useCallback } from "react";
import {
  ITTable,
  ITDataTable,
  ITBadget,
  ITAvatar,
  ITImage,
  ITInput,
  ITSelect,
  ITSlideToggle,
  ITChip,
  ITDataTableFetchParams,
  ITDataTableResponse
} from "../index";
import { ShowcaseLayout } from "./ShowcaseLayout";

const TABLE_DATA: Record<string, unknown>[] = [
  { id: 1, name: "Sofía Castillo", email: "sofia@axzy.dev", role: "Admin", status: "active", lastLogin: "2026-07-18T09:30:00", sales: 28400 },
  { id: 2, name: "Daniela Klein", email: "daniela@axzy.dev", role: "Editor", status: "active", lastLogin: "2026-07-17T14:22:00", sales: 15200 },
  { id: 3, name: "Mariana Reyes", email: "mariana@axzy.dev", role: "Viewer", status: "inactive", lastLogin: "2026-07-10T11:00:00", sales: 3200 },
  { id: 4, name: "Camila Torres", email: "camila@axzy.dev", role: "Admin", status: "active", lastLogin: "2026-07-18T08:15:00", sales: 42100 },
  { id: 5, name: "Valentina Méndez", email: "valentina@axzy.dev", role: "Editor", status: "active", lastLogin: "2026-07-16T19:45:00", sales: 9800 },
  { id: 6, name: "Luciana Rivas", email: "luciana@axzy.dev", role: "Viewer", status: "inactive", lastLogin: "2026-06-28T16:30:00", sales: 1500 },
  { id: 7, name: "Isabella Cruz", email: "isabella@axzy.dev", role: "Editor", status: "active", lastLogin: "2026-07-18T10:05:00", sales: 20300 },
  { id: 8, name: "Gabriela Vargas", email: "gabriela@axzy.dev", role: "Admin", status: "active", lastLogin: "2026-07-15T22:10:00", sales: 35600 },
  { id: 9, name: "Ana López", email: "ana@axzy.dev", role: "Editor", status: "pending", lastLogin: "2026-07-14T11:20:00", sales: 7500 },
  { id: 10, name: "Carla Jiménez", email: "carla@axzy.dev", role: "Viewer", status: "active", lastLogin: "2026-07-13T16:45:00", sales: 4100 },
  { id: 11, name: "Luisa Fernández", email: "luisa@axzy.dev", role: "Admin", status: "active", lastLogin: "2026-07-12T08:00:00", sales: 51200 },
  { id: 12, name: "Renata Morales", email: "renata@axzy.dev", role: "Editor", status: "inactive", lastLogin: "2026-06-30T12:15:00", sales: 6800 },
  { id: 13, name: "Paola Herrera", email: "paola@axzy.dev", role: "Viewer", status: "pending", lastLogin: "2026-07-11T09:30:00", sales: 900 },
  { id: 14, name: "Ximena Ríos", email: "ximena@axzy.dev", role: "Editor", status: "active", lastLogin: "2026-07-17T15:50:00", sales: 16700 },
  { id: 15, name: "Florencia Díaz", email: "florencia@axzy.dev", role: "Admin", status: "active", lastLogin: "2026-07-18T07:15:00", sales: 48900 },
];

const VIRTUAL_USERS = Array.from({ length: 240 }, (_, i) => ({
  id: i + 1,
  name: `User ${String(i + 1).padStart(3, "0")}`,
  email: `user${i + 1}@axzy.dev`,
  role: (["Admin", "Editor", "Viewer"] as const)[i % 3],
  active: i % 2 === 0,
}));
const virtualUserColumns: any = [
  { key: "id", label: "ID", type: "number", width: 64 },
  { key: "name", label: "Name", type: "string", width: "26%", truncate: true },
  { key: "email", label: "Email", type: "string", width: "28%", truncate: true },
  { key: "role", label: "Role", type: "string", width: "16%" },
  { key: "active", label: "Active", type: "boolean", width: "12%" },
];

const nameColumn = {
  key: "name",
  label: "Name",
  type: "string" as const,
  sortable: true,
  filter: true,
  render: (row: Record<string, unknown>) => {
    const initials = (row.name as string).split(" ").map((w: string) => w[0]).join("");
    return (
      <div className="flex items-center gap-2.5">
        <ITAvatar initials={initials} size="sm" />
        <div>
          <p className="font-semibold text-slate-800 dark:text-white text-sm leading-tight">{row.name as string}</p>
          <p className="text-[10px] text-slate-400">{row.email as string}</p>
        </div>
      </div>
    );
  },
};

const statusColor = (s: string) =>
  s === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" :
  s === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300" :
  "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

const roleColor = (r: string) =>
  r === "Admin" ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" :
  r === "Editor" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" :
  "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

// 1. ITTable Showcase
export const TableShowcase = () => {
  const [variant, setVariant] = useState<any>("default");
  const [size, setSize] = useState<any>("sm");
  const [useCustomCard, setUseCustomCard] = useState(true);
  const [selectedRow, setSelectedRow] = useState<Record<string, unknown> | null>(null);

  const customCard = (row: Record<string, unknown>) => {
    const initials = (row.name as string).split(" ").map((w: string) => w[0]).join("");
    const status = row.status as string;
    const role = row.role as string;
    const date = new Date(row.lastLogin as string);
    return (
      <div className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <ITAvatar initials={initials} size="md" />
            <div>
              <p className="font-bold text-slate-800 dark:text-white text-sm">{row.name as string}</p>
              <p className="text-xs text-slate-400">{row.email as string}</p>
            </div>
          </div>
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${statusColor(status)}`}>
            {status}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className={`px-2 py-0.5 rounded-md font-semibold ${roleColor(role)}`}>{role}</span>
          <span>Last login: {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <span className="text-xs text-slate-400">Sales: <strong className="text-slate-700 dark:text-slate-200">${(row.sales as number).toLocaleString()}</strong></span>
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary-600 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const columns: any = [
    nameColumn,
    { key: "email", label: "Email", type: "string", sortable: true, filter: true, className: "hidden lg:table-cell" },
    {
      key: "role",
      label: "Role",
      type: "string",
      sortable: true,
      filter: true,
      render: (row: any) => (
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${roleColor(row.role)}`}>
          {row.role}
        </span>
      )
    },
    {
      key: "status",
      label: "Status",
      type: "string",
      sortable: true,
      filter: true,
      render: (row: any) => (
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${statusColor(row.status)}`}>
          {row.status}
        </span>
      )
    },
    {
      key: "sales",
      label: "Sales",
      type: "number",
      sortable: true,
      render: (row: any) => <span className="font-mono font-semibold text-slate-800 dark:text-white">${(row.sales as number).toLocaleString()}</span>
    },
    {
      key: "actions",
      label: "",
      type: "actions",
      actions: () => (
        <div className="flex gap-1">
          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary-600 transition-colors" title="View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        </div>
      )
    }
  ];

  const fixedColumns: any = columns.map((col: any, i: number) => ({
    ...col,
    width: [64, "18%", "18%", "14%", "20%", "10%"][i],
    truncate: col.key === "email" || col.key === "name",
  }));

  // Single-line columns for virtualization: no avatar, no actions, no custom
  // render, so every row is a deterministic one-line box.
  const virtualColumns: any = [
    { key: "id", label: "ID", type: "number", width: 64 },
    { key: "name", label: "Name", type: "string", width: "28%", truncate: true },
    { key: "email", label: "Email", type: "string", width: "28%", truncate: true },
    { key: "role", label: "Role", type: "string", width: "16%" },
    { key: "sales", label: "Sales", type: "number", width: "18%" },
  ];

  const virtualData = useMemo(
    () =>
      Array.from({ length: 300 }, (_, i) => ({
        ...TABLE_DATA[i % TABLE_DATA.length],
        id: i + 1,
      })),
    []
  );

  const code = `<ITTable
  columns={columns}
  data={data}
  title="Team members"
  variant="${variant}"
  size="${size}"
  defaultItemsPerPage={5}
  renderCard={(row) => <CustomCard row={row} />}
/>`;

  return (
    <ShowcaseLayout
      title="ITTable"
      description="Tabla con vista responsive Table / Cards, paginación, filtros y template de card personalizable."
      code={code}
      demo={
        <div className="w-full space-y-2">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1">
            {selectedRow
              ? `Selected: ${selectedRow.name as string}`
              : "Click a row/card or press Enter/Space to select"}
          </div>
          <div className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm">
            <ITTable
              columns={columns}
              data={TABLE_DATA}
              title="Team members"
              variant={variant}
              size={size}
              defaultItemsPerPage={5}
              renderCard={useCustomCard ? customCard : undefined}
              onRowClick={(row) => setSelectedRow(row)}
            />
          </div>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="var_ctrl"
            label="Table variant"
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Default", value: "default" },
              { label: "Striped", value: "striped" },
              { label: "Bordered", value: "bordered" }
            ]}
          />
          <ITSelect
            name="sz_ctrl"
            label="Row size"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small (sm)", value: "sm" },
              { label: "Medium (md)", value: "md" },
              { label: "Large (lg)", value: "lg" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Custom card template</span>
            <ITSlideToggle isOn={useCustomCard} onToggle={setUseCustomCard} size="sm" />
          </div>
          {!useCustomCard && (
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-500">
              Default card active — shows all columns as label-value pairs
            </div>
          )}
        </>
      }
      doc={{
        summary: "Tabla de datos con vistas Table/Cards, paginación, filtros, ordenamiento y activación de fila.",
        examples: [
          '<ITTable columns={columns} data={data} title="Users" />',
          '<ITTable columns={columns} data={data} defaultView="cards" onRowClick={(row) => open(row)} />',
          '<ITTable columns={fixedColumns} data={data} layout="fixed" density="compact" />',
          '<ITTable columns={cols} data={rows} virtualized stickyHeader layout="fixed" density="compact" defaultItemsPerPage={300} itemsPerPageOptions={[50, 100, 300]} />',
        ],
        props: [
          { name: "columns", type: "Column<T>[]", description: "Definiciones de columna: key, label, type, sortable, filter, render, actions." },
          { name: "data", type: "T[]", default: "[]", description: "Arreglo de filas a renderizar." },
          { name: "containerClassName", type: "string", description: "Clases del contenedor externo." },
          { name: "className", type: "string", description: "Declarado por compatibilidad, pero ITTable no lo aplica; usar containerClassName." },
          { name: "variant", type: '"default" | "striped" | "bordered"', default: '"default"', description: "Variante visual." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamaño de fuente; no cambia padding (usar density)." },
          { name: "itemsPerPageOptions", type: "number[]", default: "[5, 10, 20]", description: "Opciones del selector de filas por página." },
          { name: "defaultItemsPerPage", type: "number", default: "10", description: "Filas por página iniciales." },
          { name: "title", type: "string", description: "Título opcional sobre la tabla." },
          { name: "renderCard", type: "(row: T) => ReactNode", description: "Renderer custom de card para la vista cards." },
          { name: "defaultView", type: '"table" | "cards"', default: '"table"', description: "Vista inicial." },
          { name: "showVerticalBorder", type: "boolean", default: "true", description: "Bordes verticales entre columnas." },
          { name: "verticalBorderClassname", type: "string", description: "Clases custom de los bordes verticales." },
          { name: "onRowClick", type: "(row: T, event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void", description: "Activa fila/card. MouseEvent en puntero, KeyboardEvent en Enter/Space. Se ignora si la interacción inicia en un hijo interactivo." },
          { name: "layout", type: '"auto" | "fixed"', default: '"auto"', description: "fixed respeta width de columna y elimina min-w, evitando scroll horizontal." },
          { name: "density", type: '"compact" | "normal" | "comfortable"', default: '"normal"', description: "Padding / alto de fila (independiente de size, que solo cambia font-size)." },
          { name: "autoCardBreakpoint", type: "number", default: "0", description: "Ancho de contenedor (px) bajo el cual cae a la vista cards. 0 desactiva." },
          { name: "virtualized", type: "boolean", default: "false", description: "Vista tabla: renderiza solo la ventana visible con spacer rows. Cards nunca virtualiza." },
          { name: "virtualizedMaxHeight", type: "number", default: "400", description: "Alto máx (px) del contenedor con scroll virtual." },
          { name: "rowHeight", type: "number", default: "getRowHeight(size, density)", description: "Alto de fila asumido (px). Size-aware: baseline size=\"md\" = 33/45/53 según densidad; size lo desplaza por el line box (sm 16 / md 20 / lg 28 px)." },
          { name: "overscan", type: "number", default: "5", description: "Filas extra renderizadas arriba/abajo del viewport." },
          { name: "stickyHeader", type: "boolean", default: "false", description: "Header sticky mientras scrollea el cuerpo virtualizado." },
        ],
        notes: [
          "onRowClick funciona en ambas vistas (tabla y cards).",
          "Cuando se omite no se agrega cursor-pointer, foco, tabIndex ni role.",
          "Column acepta width (number=px | string CSS), minWidth (px), align (left/center/right) y truncate (ellipsis + title nativo).",
          "Anti scroll horizontal: layout=\"fixed\" + width por columna + truncate + density.",
          "Virtualización: solo vista tabla; rinde con page size grande; filas de alto uniforme; el scroll no se reinicia al cambiar filtros.",
          "Virtualización exige alto de fila uniforme. El default es size-aware (getRowHeight(size, density)): con size=\"md\" el baseline es compact 33 / normal 45 / comfortable 53 (padding de celda + line box text-sm de 20px + 1px del divide-y); size lo desplaza por el line box (sm 16 / md 20 / lg 28 px, es decir −4 / 0 / +8 px). Una celda de dos líneas (avatar + texto) mide ~50px real, distinto de ese alto asumido, así que los spacers se desalinean: usar celdas de una sola línea o pasar un rowHeight explícito.",
          "ITSearchTable no soporta layout/density/autoCardBreakpoint/virtualized/width — no asumir paridad.",
        ],
      }}
      gallery={
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Custom cards with hover</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TABLE_DATA.slice(0, 4).map((row, i) => {
                const initials = (row.name as string).split(" ").map((w: string) => w[0]).join("");
                const status = row.status as string;
                const role = row.role as string;
                const date = new Date(row.lastLogin as string);
                return (
                  <div key={i} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <ITAvatar initials={initials} size="md" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white text-sm">{row.name as string}</p>
                          <p className="text-xs text-slate-400">{row.email as string}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${statusColor(status)}`}>{status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className={`px-2 py-0.5 rounded-md font-semibold ${roleColor(role)}`}>{role}</span>
                      <span>Login: {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                      <span className="text-xs text-slate-400">Sales: <strong className="text-slate-700 dark:text-slate-200">${(row.sales as number).toLocaleString()}</strong></span>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary-600"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                        <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">ITTable with default cards</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITTable
                columns={columns}
                data={TABLE_DATA.slice(0, 6)}
                size="sm"
                defaultItemsPerPage={6}
                defaultView="cards"
                onRowClick={(row) => setSelectedRow(row)}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">ITTable with custom cards + pagination</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITTable
                columns={columns}
                data={TABLE_DATA}
                size="sm"
                title="All members"
                defaultItemsPerPage={4}
                renderCard={(row: any) => {
                  const initials = (row.name as string).split(" ").map((w: string) => w[0]).join("");
                  return (
                    <div className="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <ITAvatar initials={initials} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">{row.name as string}</p>
                          <p className="text-[11px] text-slate-400 truncate">{row.email as string}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md ${statusColor(row.status as string)}`}>{row.status as string}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className={`px-1.5 py-0.5 rounded font-semibold ${roleColor(row.role as string)}`}>{row.role as string}</span>
                        <span>${(row.sales as number).toLocaleString()}</span>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Compact fixed layout — no horizontal scroll</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden" style={{ maxWidth: 560 }}>
              <ITTable
                columns={fixedColumns}
                data={TABLE_DATA}
                title="Fixed layout"
                layout="fixed"
                density="compact"
                defaultItemsPerPage={5}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Auto cards fallback (&lt; 640px container)</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden" style={{ maxWidth: 420 }}>
              <ITTable
                columns={columns}
                data={TABLE_DATA.slice(0, 6)}
                title="Narrow container"
                autoCardBreakpoint={640}
                defaultItemsPerPage={6}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Virtualized table — 300 rows (only visible window mounted)</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITTable
                columns={virtualColumns}
                data={virtualData}
                title="Virtualized · 300 rows"
                virtualized
                stickyHeader
                layout="fixed"
                density="compact"
                virtualizedMaxHeight={360}
                defaultItemsPerPage={300}
                itemsPerPageOptions={[50, 100, 300]}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

// 2. ITDataTable Showcase
export const DataTableShowcase = () => {
  const [useCustomCard, setUseCustomCard] = useState(true);
  const [apiState, setApiState] = useState<"normal" | "loading" | "empty" | "error">("normal");
  const [reloadKey, setReloadKey] = useState(0);
  const [showVBorder, setShowVBorder] = useState(true);
  const [borderStyle, setBorderStyle] = useState<"default" | "blue" | "rose" | "none">("default");
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [dtSize, setDtSize] = useState<"sm" | "md" | "lg">("md");
  const [dtDensity, setDtDensity] = useState<"compact" | "normal" | "comfortable">("normal");
  const [dtLayout, setDtLayout] = useState<"auto" | "fixed">("auto");
  const [dtAutoCardBreakpoint, setDtAutoCardBreakpoint] = useState(0);
  const [dtVirtualized, setDtVirtualized] = useState(true);
  const [dtStickyHeader, setDtStickyHeader] = useState(false);

  const userColumns = useMemo(() => [
    { key: "id", label: "ID", type: "number" as const },
    { key: "name", label: "Name", type: "string" as const, filter: true, sortable: true,
      render: (row: any) => (
        <div className="flex items-center gap-2.5">
          <ITAvatar initials={(row.name as string).split(" ").map((w: string) => w[0]).join("")} size="sm" />
          <span className="font-semibold text-slate-800 dark:text-white">{row.name}</span>
        </div>
      )
    },
    {
      key: "role",
      label: "Role",
      type: "string" as const,
      filter: true,
      sortable: true,
      render: (row: any) => (
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${
          row.role === "Admin" ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" :
          row.role === "Editor" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" :
          "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        }`}>{row.role}</span>
      )
    },
    { key: "active", label: "Active", type: "boolean" as const, filter: true }
  ], []);

  const MOCK_USERS = useMemo(() => [
    { id: 1, name: "Sofía Castillo", role: "Admin", active: true },
    { id: 2, name: "Daniela Klein", role: "Editor", active: true },
    { id: 3, name: "Mariana Reyes", role: "Viewer", active: false },
    { id: 4, name: "Camila Torres", role: "Admin", active: true },
    { id: 5, name: "Valentina Méndez", role: "Editor", active: true },
    { id: 6, name: "Luciana Rivas", role: "Viewer", active: false },
    { id: 7, name: "Isabella Cruz", role: "Editor", active: true },
    { id: 8, name: "Gabriela Vargas", role: "Admin", active: true },
    { id: 9, name: "Ana López", role: "Editor", active: false },
    { id: 10, name: "Carla Jiménez", role: "Viewer", active: true },
    { id: 11, name: "Luisa Fernández", role: "Admin", active: true },
    { id: 12, name: "Renata Morales", role: "Viewer", active: false },
  ], []);

  const fetchData = useCallback(async (params: ITDataTableFetchParams): Promise<ITDataTableResponse<any>> => {
    const delay = apiState === "loading" ? 8000 : 400;
    await new Promise(resolve => setTimeout(resolve, delay));

    if (apiState === "error") {
      throw new Error("Connection lost — server is not responding");
    }

    if (apiState === "empty") {
      return { data: [], total: 0 };
    }

    let mockData = [...MOCK_USERS];

    if (params.filters) {
      Object.keys(params.filters).forEach(key => {
        const filterVal = params.filters[key];
        if (filterVal) {
          mockData = mockData.filter(item =>
            String((item as any)[key]).toLowerCase().includes(String(filterVal).toLowerCase())
          );
        }
      });
    }

    if (params.sort) {
      const { key, direction } = params.sort;
      mockData.sort((a: any, b: any) => {
        const av = a[key], bv = b[key];
        if (typeof av === "string") return direction === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
        return direction === "asc" ? av - bv : bv - av;
      });
    }

    const start = (params.page - 1) * params.limit;
    const paged = mockData.slice(start, start + params.limit);

    return {
      data: paged,
      total: mockData.length
    };
  }, [apiState, MOCK_USERS]);

  const virtualFetchData = useCallback(async (params: ITDataTableFetchParams): Promise<ITDataTableResponse<any>> => {
    await new Promise((r) => setTimeout(r, 150));
    const start = (params.page - 1) * params.limit;
    return { data: VIRTUAL_USERS.slice(start, start + params.limit), total: VIRTUAL_USERS.length };
  }, []);

  const handleStateChange = (s: typeof apiState) => {
    setApiState(s);
    setReloadKey(k => k + 1);
  };

  const code = `<ITDataTable
  columns={columns}
  fetchData={api.fetchUsers}
  title="Users"
  defaultItemsPerPage={4}
  size="${dtSize}"
  layout="${dtLayout}"
  density="${dtDensity}"${dtAutoCardBreakpoint > 0 ? `\n  autoCardBreakpoint={${dtAutoCardBreakpoint}}` : ""}
  showVerticalBorder={${showVBorder}}${borderStyle !== "default" ? `\n  verticalBorderClassname="${borderStyle === "blue" ? "[&_th]:border-blue-200 [&_td]:border-blue-100" : "[&_th]:border-rose-200 [&_td]:border-rose-100"}"` : ""}
  renderCard={(row) => <CustomCard row={row} />}
/>`;

  const borderClass = borderStyle === "default" ? undefined : borderStyle === "blue" ? "[&_th]:border-blue-200 dark:[&_th]:border-blue-800/30 [&_td]:border-blue-100 dark:[&_td]:border-blue-800/20" : borderStyle === "rose" ? "[&_th]:border-rose-200 dark:[&_th]:border-rose-800/30 [&_td]:border-rose-100 dark:[&_td]:border-rose-800/20" : undefined;

  return (
    <ShowcaseLayout
      title="ITDataTable"
      description="Tabla auto-suficiente con carga dinámica, filtros, paginación y vista responsive Cards/Table."
      code={code}
      demo={
        <div className="w-full space-y-2">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1">
            {selectedRow
              ? `Selected: ${selectedRow.name as string} (id ${selectedRow.id as number})`
              : "Click a row/card or press Enter/Space to select"}
          </div>
          <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-md">
            <ITDataTable
              key={reloadKey}
              columns={userColumns}
              fetchData={fetchData}
              title={apiState === "error" ? "Connection error" : apiState === "empty" ? "No data" : "Users"}
              defaultItemsPerPage={4}
              size={dtSize}
              layout={dtLayout}
              density={dtDensity}
              autoCardBreakpoint={dtAutoCardBreakpoint}
              showVerticalBorder={showVBorder}
              verticalBorderClassname={borderClass}
              onRowClick={(row) => setSelectedRow(row)}
              renderCard={useCustomCard ? (row: any) => {
              const initials = (row.name as string).split(" ").map((w: string) => w[0]).join("");
              return (
                <div className="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600">
                  <div className="flex items-center gap-3 mb-2">
                    <ITAvatar initials={initials} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">{row.name}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md ${
                      row.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}>{row.active ? "Active" : "Inactive"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                      row.role === "Admin" ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" :
                      row.role === "Editor" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" :
                      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}>{row.role}</span>
                    <span className="text-[10px] text-slate-400">ID: #{row.id}</span>
                  </div>
                </div>
              );
            } : undefined}
            />
          </div>
        </div>
      }
      controls={
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">API state</p>
            <div className="flex flex-wrap gap-2">
              {(["normal", "loading", "empty", "error"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStateChange(s)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    apiState === s
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {s === "normal" ? "✅ Normal" : s === "loading" ? "⏳ Loading" : s === "empty" ? "📭 Empty" : "💥 Error"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Custom card template</span>
            <ITSlideToggle isOn={useCustomCard} onToggle={setUseCustomCard} size="sm" />
          </div>
          {!useCustomCard && (
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-500">
              Default card active — shows all columns as label-value pairs
            </div>
          )}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Borders</p>
            <div className="flex flex-wrap gap-2">
              {(["default", "blue", "rose", "none"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setBorderStyle(s);
                    setShowVBorder(s !== "none");
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    borderStyle === s
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {s === "default" ? "Gray" : s === "blue" ? "Blue" : s === "rose" ? "Rose" : "None"}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Table capabilities</p>
            <ITSelect
              name="dt_size"
              label="Size"
              value={dtSize}
              onChange={(e: any) => setDtSize(e.target.value as "sm" | "md" | "lg")}
              options={[
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
              ]}
            />
            <ITSelect
              name="dt_density"
              label="Density"
              value={dtDensity}
              onChange={(e: any) => setDtDensity(e.target.value as "compact" | "normal" | "comfortable")}
              options={[
                { label: "Compact", value: "compact" },
                { label: "Normal", value: "normal" },
                { label: "Comfortable", value: "comfortable" },
              ]}
            />
            <ITSelect
              name="dt_layout"
              label="Layout"
              value={dtLayout}
              onChange={(e: any) => setDtLayout(e.target.value as "auto" | "fixed")}
              options={[
                { label: "Auto", value: "auto" },
                { label: "Fixed", value: "fixed" },
              ]}
            />
            <ITSelect
              name="dt_autocards"
              label="Auto cards below (px)"
              value={String(dtAutoCardBreakpoint)}
              onChange={(e: any) => setDtAutoCardBreakpoint(Number(e.target.value))}
              options={[
                { label: "Off", value: "0" },
                { label: "640px", value: "640" },
                { label: "900px", value: "900" },
                { label: "1200px", value: "1200" },
              ]}
            />
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Virtualized (gallery)</span>
              <ITSlideToggle isOn={dtVirtualized} onToggle={setDtVirtualized} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Sticky header</span>
              <ITSlideToggle isOn={dtStickyHeader} onToggle={setDtStickyHeader} size="sm" disabled={!dtVirtualized} />
            </div>
            {dtVirtualized && (
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-500">
                size, density, layout y auto-cards aplican al demo principal; virtualized y sticky header solo al bloque "Server-side virtualization" de la galería. Ese bloque no recibe autoCardBreakpoint: las cards nunca se virtualizan y el fallback de auto-cards desactivaría la virtualización en silencio.
              </div>
            )}
          </div>
        </div>
      }
      doc={{
        summary: "Tabla server-side con fetch, filtros, ordenamiento, paginación y activación de fila/card.",
        examples: [
          '<ITDataTable columns={columns} fetchData={api.fetchUsers} />',
          '<ITDataTable columns={columns} fetchData={api.fetchUsers} onRowClick={(row) => open(row)} />',
          '<ITDataTable columns={fixedColumns} fetchData={api.fetchUsers} layout="fixed" density="compact" />',
          '<ITDataTable columns={cols} fetchData={api.page} virtualized stickyHeader defaultItemsPerPage={200} itemsPerPageOptions={[50, 100, 200]} debounceMs={0} />',
          '<ITDataTable columns={cols} fetchData={api.page} layout="fixed" density="compact" autoCardBreakpoint={640} />',
        ],
        props: [
          { name: "columns", type: "Column<T>[]", description: "Definiciones de columna." },
          { name: "fetchData", type: "(params: ITDataTableFetchParams) => Promise<ITDataTableResponse<T>>", required: true, description: "Callback asíncrono disparado al cambiar página, filtros u orden. Retorna { data, total }." },
          { name: "debounceMs", type: "number", default: "500", description: "Espera antes de refetch tras cambiar filtros." },
          { name: "externalFilters", type: "Record<string, string | number | boolean | Date>", default: "{}", description: "Filtros externos fusionados con los internos." },
          { name: "loadingIndicator", type: "ReactNode", description: "Elemento custom mostrado mientras carga." },
          { name: "fetchOnMount", type: "boolean", default: "true", description: "Dispara fetch al montar." },
          { name: "reloadTrigger", type: "number | string | boolean", description: "Cambiar su valor fuerza un refetch." },
          { name: "containerClassName", type: "string", description: "Clases del contenedor externo." },
          { name: "className", type: "string", description: "Clases aplicadas al elemento <table>." },
          { name: "variant", type: '"default" | "striped" | "bordered" | "minimal"', default: '"default"', description: "Variante visual. minimal no tiene estilos (igual que default)." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamaño de fuente; no cambia padding (usar density)." },
          { name: "itemsPerPageOptions", type: "number[]", default: "[5, 10, 20]", description: "Opciones del selector de filas por página." },
          { name: "defaultItemsPerPage", type: "number", default: "10", description: "Filas por página iniciales." },
          { name: "title", type: "string | ReactNode", description: "Título sobre la tabla." },
          { name: "renderCard", type: "(row: T) => ReactNode", description: "Renderer custom de card." },
          { name: "defaultView", type: '"table" | "cards"', default: '"table"', description: "Vista inicial." },
          { name: "showVerticalBorder", type: "boolean", default: "true", description: "Bordes verticales entre columnas." },
          { name: "verticalBorderClassname", type: "string", description: "Clases custom de los bordes verticales." },
          { name: "onRowClick", type: "(row: T, event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void", description: "Activa fila/card. MouseEvent en puntero, KeyboardEvent en Enter/Space. No se dispara mientras carga y se ignora en hijos interactivos." },
          { name: "layout", type: '"auto" | "fixed"', default: '"auto"', description: "fixed respeta width de columna y elimina min-w, evitando scroll horizontal." },
          { name: "density", type: '"compact" | "normal" | "comfortable"', default: '"normal"', description: "Padding / alto de fila (independiente de size, que solo cambia font-size)." },
          { name: "autoCardBreakpoint", type: "number", default: "0", description: "Ancho de contenedor (px) bajo el cual cae a la vista cards. 0 desactiva." },
          { name: "virtualized", type: "boolean", default: "false", description: "Vista tabla: renderiza solo la ventana visible con spacer rows. Cards nunca virtualiza." },
          { name: "virtualizedMaxHeight", type: "number", default: "400", description: "Alto máx (px) del contenedor con scroll virtual." },
          { name: "rowHeight", type: "number", default: "getRowHeight(size, density)", description: "Alto de fila asumido (px). Size-aware: baseline size=\"md\" = 33/45/53 según densidad; size lo desplaza por el line box (sm 16 / md 20 / lg 28 px)." },
          { name: "overscan", type: "number", default: "5", description: "Filas extra renderizadas arriba/abajo del viewport." },
          { name: "stickyHeader", type: "boolean", default: "false", description: "Header sticky mientras scrollea el cuerpo virtualizado." },
        ],
        notes: [
          "onRowClick funciona en ambas vistas (tabla y cards).",
          "Interacciones que inician en botones, links o inputs no disparan onRowClick.",
          "Column acepta width (number=px | string CSS), minWidth (px), align (left/center/right) y truncate (ellipsis + title nativo).",
          "Anti scroll horizontal: layout=\"fixed\" + width por columna + truncate + density.",
          "Virtualización: solo vista tabla; rinde con page size grande; filas de alto uniforme; el scroll no se reinicia al cambiar filtros.",
          "La virtualización server-side hace ventana sobre la PÁGINA ACTUAL (data.length), no sobre total: usar un defaultItemsPerPage grande (p. ej. 200) con itemsPerPageOptions que lo incluya, o el efecto es invisible.",
          "Virtualización exige alto de fila uniforme. El default es size-aware (getRowHeight(size, density)): con size=\"md\" el baseline es compact 33 / normal 45 / comfortable 53 (padding de celda + line box text-sm de 20px + 1px del divide-y); size lo desplaza por el line box (sm 16 / md 20 / lg 28 px, es decir −4 / 0 / +8 px). Una celda de dos líneas (avatar + texto) mide ~50px real y desalinea los spacers: usar celdas de una sola línea o pasar un rowHeight explícito.",
          "autoCardBreakpoint fuerza la vista cards bajo el ancho dado, y la virtualización se desactiva en silencio al pasar a cards: no combinar virtualized + autoCardBreakpoint.",
          "El toggle interno Table/Cards también desactiva la virtualización; las cards nunca se virtualizan.",
          "debounceMs={0} evita el retardo de refetch en demos.",
          "variant=\"minimal\" se acepta por tipo pero no tiene estilos (igual que default). ITSearchTable no soporta layout/density/autoCardBreakpoint/virtualized/width.",
        ],
      }}
      gallery={
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Custom cards with hover</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <GalleryDataTable
                title="Team members"
                defaultItemsPerPage={4}
                renderCard={(row: any) => {
                  const initials = (row.name as string).split(" ").map((w: string) => w[0]).join("");
                  return (
                    <div className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <ITAvatar initials={initials} size="md" />
                          <div>
                            <p className="font-bold text-slate-800 dark:text-white text-sm">{row.name as string}</p>
                            <p className="text-xs text-slate-400">{row.email as string}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                          row.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}>{row.active ? "Active" : "Inactive"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <span className={`px-2 py-0.5 rounded-md font-semibold ${
                          row.role === "Admin" ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" :
                          row.role === "Editor" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" :
                          "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}>{row.role as string}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                        <span className="text-xs text-slate-400">ID: <strong className="text-slate-700 dark:text-slate-200">#{row.id}</strong></span>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary-600"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Default cards with pagination</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <GalleryDataTable
                size="sm"
                defaultItemsPerPage={3}
                defaultView="cards"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Server-side virtualization — 240 rows {dtVirtualized ? "(page 200)" : "(page 10)"}</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITDataTable
                key={dtVirtualized ? "dt-virt-on" : "dt-virt-off"}
                columns={virtualUserColumns}
                fetchData={virtualFetchData}
                title="Virtualized users"
                defaultItemsPerPage={dtVirtualized ? 200 : 10}
                itemsPerPageOptions={dtVirtualized ? [50, 100, 200] : [5, 10, 20]}
                size={dtSize}
                virtualized={dtVirtualized}
                virtualizedMaxHeight={360}
                stickyHeader={dtStickyHeader}
                layout={dtLayout}
                density={dtDensity}
                debounceMs={0}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

function GalleryDataTable({ title, size, defaultItemsPerPage, defaultView, renderCard }: {
  title?: string;
  size?: string;
  defaultItemsPerPage?: number;
  defaultView?: "table" | "cards";
  renderCard?: (row: any) => React.ReactNode;
}) {
  const columns = useMemo(() => [
    { key: "id", label: "ID", type: "number" as const },
    { key: "name", label: "Name", type: "string" as const, filter: true, sortable: true,
      render: (row: any) => (
        <div className="flex items-center gap-2.5">
          <ITAvatar initials={(row.name as string).split(" ").map((w: string) => w[0]).join("")} size="sm" />
          <span className="font-semibold text-slate-800 dark:text-white">{row.name}</span>
        </div>
      )
    },
    {
      key: "role", label: "Role", type: "string" as const, filter: true, sortable: true,
      render: (row: any) => (
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${
          row.role === "Admin" ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" :
          row.role === "Editor" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" :
          "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        }`}>{row.role}</span>
      )
    },
    { key: "active", label: "Active", type: "boolean" as const, filter: true }
  ], []);

  const fetchData = useCallback(async (params: ITDataTableFetchParams) => {
    const all = [
      { id: 1, name: "Sofía Castillo", email: "sofia@axzy.dev", role: "Admin", active: true },
      { id: 2, name: "Daniela Klein", email: "daniela@axzy.dev", role: "Editor", active: true },
      { id: 3, name: "Mariana Reyes", email: "mariana@axzy.dev", role: "Viewer", active: false },
      { id: 4, name: "Camila Torres", email: "camila@axzy.dev", role: "Admin", active: true },
      { id: 5, name: "Valentina Méndez", email: "valentina@axzy.dev", role: "Editor", active: true },
      { id: 6, name: "Luciana Rivas", email: "luciana@axzy.dev", role: "Viewer", active: false },
      { id: 7, name: "Isabella Cruz", email: "isabella@axzy.dev", role: "Editor", active: true },
      { id: 8, name: "Gabriela Vargas", email: "gabriela@axzy.dev", role: "Admin", active: true },
    ];
    await new Promise(r => setTimeout(r, 200));
    const start = (params.page - 1) * params.limit;
    return { data: all.slice(start, start + params.limit), total: all.length };
  }, []);

  return (
    <ITDataTable
      columns={columns}
      fetchData={fetchData}
      title={title}
      size={size as any}
      defaultItemsPerPage={defaultItemsPerPage}
      defaultView={defaultView}
      renderCard={renderCard}
    />
  );
}

// 3. ITBadget Showcase
export const BadgetShowcase = () => {
  const [color, setColor] = useState<any>("success");
  const [size, setSize] = useState<any>("medium");
  const [labelText, setLabelText] = useState("Activo");

  const code = `<ITBadget\n  label="${labelText}"\n  color="${color}"\n  size="${size}"\n/>`;

  return (
    <ShowcaseLayout
      title="ITBadget"
      description="Badges (etiquetas) estilizados para representar estados o categorías de items."
      code={code}
      demo={
        <ITBadget label={labelText} color={color} size={size} />
      }
      controls={
        <>
          <ITInput
            name="label"
            label="Texto"
            value={labelText}
            onChange={(e: any) => setLabelText(e.target.value)}
            onBlur={() => { }}
          />
          <ITSelect
            name="color"
            label="Color"
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
          <ITSelect
            name="size"
            label="Tamaño"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" }
            ]}
          />
        </>
      }
      gallery={
        <div className="flex flex-wrap items-center gap-4">
          <ITBadget label="Primary" color="primary" />
          <ITBadget label="Secondary" color="secondary" />
          <ITBadget label="Success" color="success" />
          <ITBadget label="Danger" color="danger" />
          <ITBadget label="Warning" color="warning" />
          <ITBadget label="Info" color="info" />
          <span className="mx-4 text-slate-300">|</span>
          <ITBadget label="Small" color="primary" size="sm" />
          <ITBadget label="Medium" color="primary" size="md" />
          <ITBadget label="Large" color="primary" size="lg" />
        </div>
      }
    />
  );
};

// 4. ITImage Showcase
export const ImageShowcase = () => {
  const [broken, setBroken] = useState(false);
  const src = broken ? "https://nonexistent.image.site/broken.jpg" : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80";

  const code = `<ITImage\n  src="${src}"\n  alt="Imagen Abstracta"\n  fallback="https://placehold.co/400x200?text=No+Preview"\n  className="rounded-xl object-cover h-40"\n/>`;

  return (
    <ShowcaseLayout
      title="ITImage"
      description="Componente de renderizado de imágenes inteligente con cargador interno y fallback automático ante fallas de red."
      code={code}
      demo={
        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <ITImage
            src={src}
            alt="Demo abstracta"
            fallback="https://placehold.co/400x200?text=Error+Carga+Imagen"
            className="rounded-xl object-cover h-40 w-full shadow-md"
          />
          <span className="text-xs text-slate-500 font-mono">
            {broken ? "Cargando URL Rota (Fallback Activo)" : "Cargando URL Correcta"}
          </span>
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Forzar Error de Carga (URL rota)</span>
            <ITSlideToggle isOn={broken} onToggle={setBroken} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// ITChip Showcase
export const ChipShowcase = () => {
  const [active, setActive] = useState<string[]>(["mx"]);

  const toggle = (id: string) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const filters = [
    { id: "mx", label: "México" },
    { id: "es", label: "España" },
    { id: "co", label: "Colombia" },
  ];

  const code = `<ITChip\n  label="React"\n  color="primary"\n  variant="soft"\n  removable\n  onRemove={() => remove()}\n/>`;

  return (
    <ShowcaseLayout
      title="ITChip"
      description="Etiqueta compacta (tag / pill) para labels, filtros activos y selecciones múltiples. Variantes soft, filled y outlined, icono, botón de quitar (X) y estado seleccionado."
      code={code}
      demo={
        <div className="w-full max-w-lg space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <ITChip label="Soft" variant="soft" color="primary" />
            <ITChip label="Filled" variant="filled" color="success" />
            <ITChip label="Outlined" variant="outlined" color="purple" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <ITChip
                key={f.id}
                label={f.label}
                color="primary"
                selected={active.includes(f.id)}
                onClick={() => toggle(f.id)}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ITChip label="México" color="danger" variant="outlined" removable onRemove={() => {}} />
            <ITChip label="Deshabilitado" color="secondary" disabled />
          </div>
        </div>
      }
      controls={
        <p className="text-xs text-slate-500">
          Los chips con onClick son toggles de filtro (role=button, Enter/Space). Los chips removibles muestran una X.
        </p>
      }
      doc={{
        summary: "Etiqueta/pill para labels, filtros y multi-valor, con variantes y estados.",
        examples: [
          '<ITChip label="React" color="primary" />',
          '<ITChip label="México" color="success" variant="outlined" removable onRemove={remove} />',
          '<ITChip label="Activos" selected onClick={toggle} />',
        ],
        props: [
          { name: "label", type: "string", description: "Texto del chip." },
          { name: "children", type: "ReactNode", description: "Contenido custom (sobreescribe label)." },
          { name: "color", type: "ColorsTypes", default: '"secondary"', description: "Color de la paleta." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamaño." },
          { name: "variant", type: '"soft" | "filled" | "outlined"', default: '"soft"', description: "Estilo visual." },
          { name: "icon", type: "ReactNode", description: "Icono a la izquierda." },
          { name: "removable", type: "boolean", default: "false", description: "Muestra botón (X)." },
          { name: "onRemove", type: "() => void", description: "Se dispara al quitar." },
          { name: "onClick", type: "() => void", description: "Hace el chip clickeable." },
          { name: "selected", type: "boolean", default: "false", description: "Estado seleccionado." },
          { name: "disabled", type: "boolean", default: "false", description: "Deshabilitado." },
        ],
        notes: ["Colores desde theme.colors: respetan tema y modo oscuro."],
      }}
    />
  );
};
