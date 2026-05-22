import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ITCard, ITButton, ITInput, ITSlideToggle, ITText, ITNavbar } from "../index";
import { ShowcaseLayout, CodeViewer } from "./ShowcaseLayout";

// 1. ITCard Showcase
export const CardShowcase = () => {
  const [title, setTitle] = useState("Registro de Logs del Sistema");
  const [showActions, setShowActions] = useState(true);

  const code = `<ITCard\n  title="${title}"\n  actions={${showActions ? "<ITButton label='Exportar' />" : "undefined"}}\n>\n  <p>Contenido interno de la tarjeta.</p>\n</ITCard>`;

  return (
    <ShowcaseLayout
      title="ITCard"
      description="Tarjetas de contenedor multipropósito con cabecera y espacio para acciones."
      code={code}
      demo={
        <div className="w-full max-w-md">
          <ITCard
            title={title}
            actions={showActions ? <ITButton label="Exportar" color="primary" size="small" variant="outlined" /> : undefined}
          >
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Esta es una tarjeta administrativa estándar AXZY. Es ideal para agrupar paneles de control, tablas y formularios.
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500" />
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">Estado de servidor: Conectado</span>
              </div>
            </div>
          </ITCard>
        </div>
      }
      controls={
        <>
          <ITInput name="title_ctrl" label="Título de Tarjeta" value={title} onChange={(e: any) => setTitle(e.target.value)} onBlur={() => { }} />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Mostrar Botón de Acción</span>
            <ITSlideToggle isOn={showActions} onToggle={setShowActions} size="sm" />
          </div>
        </>
      }
    />
  );
};

// 2. ITText Showcase
export const TextShowcase = () => {
  const [bold, setBold] = useState(false);
  const [size, setSize] = useState("text-base");

  const code = `<ITText className="${bold ? "font-bold" : ""} ${size}">\n  Texto tipográfico estándar AXZY\n</ITText>`;

  return (
    <ShowcaseLayout
      title="ITText"
      description="Contenedor tipográfico básico alineado con las tipografías globales del tema."
      code={code}
      demo={
        <ITText className={`${bold ? "font-bold" : ""} ${size} text-slate-800 dark:text-white`}>
          Diseñado para inyectar consistencia tipográfica sobre las variables globales de Outfit/Inter.
        </ITText>
      }
      controls={
        <>
          <ITSelectStub
            name="sz_ctrl"
            label="Tamaño de Fuente"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Chico (text-xs)", value: "text-xs" },
              { label: "Estándar (text-base)", value: "text-base" },
              { label: "Grande (text-xl)", value: "text-xl" },
              { label: "Título (text-3xl)", value: "text-3xl" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Negrita (Bold)</span>
            <ITSlideToggle isOn={bold} onToggle={setBold} size="sm" />
          </div>
        </>
      }
    />
  );
};

// Temporary helper helper to render ITSelect inside showcases
const ITSelectStub = ({ name, label, value, onChange, options }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-800 dark:text-slate-100 outline-none"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// 3. ITLayout & ITNavbar Showcase
export const LayoutShowcase = () => {
  const code = `<ITLayout\n  topBar={topBarProps}\n  sidebar={sidebarProps}\n>\n  {/* Tu Contenido aquí */}\n</ITLayout>`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">ITLayout & ITNavbar</h1>
        <p className="text-slate-500 mt-1.5 text-sm md:text-base">El chasis estructural del portal administrativo con control responsivo y colapso de sidebar.</p>
      </div>

      <ITCard title="Layout Estructural">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Este componente es el contenedor raíz de toda la suite que estás navegando en este momento. Proporciona:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Menú superior (Navbar) con avatar del usuario, correo y menú desplegable.</li>
            <li>Barra de navegación lateral interactiva (Sidebar) colapsable con sub-ítems y badges.</li>
            <li>Fondo dinámico adaptado a presets claros y oscuros.</li>
          </ul>
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl">
            <h5 className="font-bold text-xs uppercase text-slate-400 mb-2">Simulación de Barra de Navegación Horizontal (ITNavbar)</h5>
            <ITNavbar
              logoText="PREVIEW NAVBAR"
              navigationItems={[
                { id: "1", label: "Inicio", isActive: true },
                { id: "2", label: "Auditoría" }
              ]}
              userMenu={{
                userName: "Auditor AXZY",
                userEmail: "auditor@axzy.dev",
                menuItems: [{ label: "Ajustes", onClick: () => { } }]
              }}
            />
          </div>
          <CodeViewer code={code} />
        </div>
      </ITCard>
    </div>
  );
};
