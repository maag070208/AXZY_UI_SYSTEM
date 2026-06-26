import React, { useState } from "react";
import {
  FaCheckCircle,
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaBoxOpen,
  FaChartLine,
  FaFileAlt,
  FaBell,
} from "react-icons/fa";
import {
  ITCard,
  ITButton,
  ITInput,
  ITSlideToggle,
  ITText,
  ITNavbar,
  ITLayout,
  ITStack,
  ITStatCard,
  ITGrid,
  ITPageHeader,
  ITPage,
} from "../index";
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
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");

  const topBar = {
    logo: <div className="w-9 h-9 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold">A</div>,
    logoText: "AXZY Console",
    navItems: [
      { id: "home", label: "Inicio", icon: <FaHome />, action: () => setActiveId("home") },
      { id: "docs", label: "Documentos", icon: <FaFileAlt />, action: () => setActiveId("docs") },
      { id: "alerts", label: "Alertas", icon: <FaBell />, action: () => setActiveId("alerts") },
    ],
    onNavItemClick: (id: string) => setActiveId(id),
    userMenu: {
      userName: "Auditor AXZY",
      userEmail: "auditor@axzy.dev",
      menuItems: [
        { label: "Ajustes", onClick: () => {} },
        { label: "Cerrar sesión", onClick: () => {} },
      ],
    },
  };

  const sidebar = {
    navigationItems: [
      { id: "dashboard", label: "Dashboard", icon: <FaChartLine />, isActive: activeId === "dashboard", action: () => setActiveId("dashboard") },
      { id: "users", label: "Usuarios", icon: <FaUsers />, isActive: activeId === "users", action: () => setActiveId("users") },
      {
        id: "sales",
        label: "Ventas",
        icon: <FaShoppingCart />,
        isActive: activeId === "sales" || activeId === "orders",
        subitems: [
          { id: "orders", label: "Órdenes", action: () => setActiveId("orders") },
          { id: "invoices", label: "Facturas", action: () => setActiveId("invoices") },
        ],
      },
      { id: "products", label: "Productos", icon: <FaBoxOpen />, isActive: activeId === "products", action: () => setActiveId("products"), badge: "3" },
      { id: "settings", label: "Configuración", icon: <FaCog />, isActive: activeId === "settings", action: () => setActiveId("settings") },
    ],
    isCollapsed: collapsed,
    onToggleCollapse: () => setCollapsed(v => !v),
  };

  const code = `<ITLayout
  topBar={{
    logo: <Logo />,
    logoText: "AXZY Console",
    userMenu: { userName, userEmail, menuItems }
  }}
  sidebar={{
    navigationItems: [...],
    isCollapsed: false,
    onToggleCollapse: () => {}
  }}
>
  {/* Tu contenido */}
</ITLayout>`;

  const navbarCode = `<ITNavbar
  logoText="AXZY"
  navigationItems={[
    { id: "1", label: "Inicio", icon: <FaHome />, isActive: true },
    { id: "2", label: "Auditoría" }
  ]}
  userMenu={{
    userName: "Auditor AXZY",
    userEmail: "auditor@axzy.dev",
    menuItems: [{ label: "Ajustes", onClick: () => {} }]
  }}
/>`;

  return (
    <ShowcaseLayout
      title="ITLayout & ITNavbar"
      description="Chasis estructural del portal con barra superior y lateral colapsable. Totalmente responsivo con drawer móvil."
      code={code}
      demo={
        <div className="w-full h-[640px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
          <ITLayout topBar={topBar} sidebar={sidebar}>
            <ITStack spacing={5}>
              <ITPageHeader
                title="Dashboard"
                description="Resumen general del sistema"
                icon={<FaChartLine size={20} />}
                iconColor="#6366f1"
              />
              <ITGrid container spacing={3}>
                <ITGrid item xs={12} sm={6} lg={3}>
                  <ITStatCard label="Usuarios" value="1,245" trend="+12%" trendDirection="up" />
                </ITGrid>
                <ITGrid item xs={12} sm={6} lg={3}>
                  <ITStatCard label="Ventas Hoy" value="$4,320" trend="+5.4%" trendDirection="up" color="bg-blue-50 dark:bg-blue-950/20" />
                </ITGrid>
                <ITGrid item xs={12} sm={6} lg={3}>
                  <ITStatCard label="Órdenes" value="89" trend="-2.1%" trendDirection="down" color="bg-amber-50 dark:bg-amber-950/20" />
                </ITGrid>
                <ITGrid item xs={12} sm={6} lg={3}>
                  <ITStatCard label="Tickets" value="12" trend="-8%" trendDirection="down" color="bg-rose-50 dark:bg-rose-950/20" />
                </ITGrid>
              </ITGrid>
              <ITCard title="Actividad reciente">
                <ITText className="text-sm text-slate-600 dark:text-slate-300">
                  El layout se adapta al colapsar/expandir el sidebar y muestra un drawer en móvil.
                </ITText>
              </ITCard>
            </ITStack>
          </ITLayout>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sidebar colapsado</span>
            <ITSlideToggle isOn={collapsed} onToggle={setCollapsed} size="sm" />
          </div>
          <div className="text-xs text-slate-500">
            En móvil (&lt;lg) el sidebar se abre como drawer con un fondo oscuro. Usa el botón ☰ del topbar.
          </div>
        </ITStack>
      }
      gallery={
        <ITStack spacing={6}>
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">ITNavbar (standalone)</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden h-[420px]">
              <ITNavbar
                logoText="AXZY"
                navigationItems={[
                  { id: "1", label: "Inicio", icon: <FaHome />, isActive: true },
                  { id: "2", label: "Documentos", icon: <FaFileAlt /> },
                  { id: "3", label: "Alertas", icon: <FaBell /> },
                ]}
                userMenu={{
                  userName: "Auditor AXZY",
                  userEmail: "auditor@axzy.dev",
                  menuItems: [
                    { label: "Ajustes", onClick: () => {} },
                    { label: "Cerrar sesión", onClick: () => {} },
                  ],
                }}
              >
                <div className="p-8 text-center text-slate-500 text-sm">
                  Contenido principal (children)
                </div>
              </ITNavbar>
            </div>
            <div className="mt-3">
              <CodeViewer code={navbarCode} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">ITNavbar con submenús</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden h-[420px]">
              <ITNavbar
                logoText="Admin"
                navigationItems={[
                  { id: "u", label: "Usuarios", icon: <FaUsers /> },
                  {
                    id: "s",
                    label: "Ventas",
                    icon: <FaShoppingCart />,
                    subitems: [
                      { id: "o", label: "Órdenes", action: () => {} },
                      { id: "i", label: "Facturas", action: () => {} },
                    ],
                  },
                  { id: "c", label: "Configuración", icon: <FaCog /> },
                ]}
                userMenu={{
                  userName: "Admin",
                  userEmail: "admin@axzy.dev",
                  menuItems: [{ label: "Salir", onClick: () => {} }],
                }}
              >
                <div className="p-8 text-center text-slate-500 text-sm">
                  Click en "Ventas" para expandir el submenú
                </div>
              </ITNavbar>
            </div>
          </div>
        </ITStack>
      }
    />
  );
};
