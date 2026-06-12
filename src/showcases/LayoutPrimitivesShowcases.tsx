import React, { useState, ReactNode } from "react";
import ITStack from "../components/stack/stack";
import ITFlex from "../components/flex/flex";
import ITGrid from "../components/grid/grid";
import ITCard from "../components/card/card";
import ITButton from "../components/button/button";
import ITStatCard from "../components/stat-card/stat-card";
import ITAvatar from "../components/avatar/avatar";
import ITSlider from "../components/slider/slider";
import ITSegmentedControl from "../components/segmented-control/segmented-control";
import ITSlideToggle from "../components/slide/slide";
import { ShowcaseLayout, CodeViewer } from "./ShowcaseLayout";

const DemoBox = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg p-3 text-center text-sm font-medium ${className}`}>
    {children}
  </div>
);

const DemoCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm ${className}`}>
    <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-900/50 mb-3" />
    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{children}</p>
    <p className="text-xs text-slate-400 mt-1">Descripción del item</p>
  </div>
);

// ─────────────────────────────────────────
// 1. ITStack Showcase
// ─────────────────────────────────────────
export const StackShowcase = () => {
  const [direction, setDirection] = useState<"row" | "column">("column");
  const [spacing, setSpacing] = useState(3);
  const [withDivider, setWithDivider] = useState(false);

  const code = `<ITStack direction="${direction}" spacing={${spacing}}${withDivider ? '\n  divider={<div className="w-px h-8 bg-slate-200" />}' : ""}>\n  <Demo>Item 1</Demo>\n  <Demo>Item 2</Demo>\n  <Demo>Item 3</Demo>\n</ITStack>`;

  return (
    <ShowcaseLayout
      title="ITStack"
      description="Layout basado en flexbox con dirección y spacing uniforme. Ideal para secciones verticales, toolbars horizontales, y listas de items."
      code={code}
      demo={
        <div className="w-full max-w-lg">
          <ITStack direction={direction} spacing={spacing} className="w-full" divider={withDivider ? <div className={`${direction === "row" ? "w-px h-8" : "h-px w-8"} bg-slate-200 dark:bg-slate-600 self-center`} /> : undefined}>
            <DemoBox>Item 1</DemoBox>
            <DemoBox>Item 2</DemoBox>
            <DemoBox>Item 3</DemoBox>
          </ITStack>
        </div>
      }
      controls={
        <>
          <ITSegmentedControl
            options={[
              { value: "column", label: "Column" },
              { value: "row", label: "Row" },
            ]}
            value={direction}
            onChange={(v) => setDirection(v as "row" | "column")}
          />
          <ITSlider label="Spacing" value={spacing} onChange={setSpacing} min={0} max={10} />
          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Con Divisor</span>
            <ITSlideToggle isOn={withDivider} onToggle={setWithDivider} size="sm" />
          </ITFlex>
        </>
      }
      gallery={
        <ITStack spacing={4}>
          {/* Row examples */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Horizontal — spacing=2</p>
            <ITStack direction="row" spacing={2}>
              <DemoBox>Uno</DemoBox><DemoBox>Dos</DemoBox><DemoBox>Tres</DemoBox>
            </ITStack>
          </div>
          {/* Center aligned row */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Row + center alignment</p>
            <ITStack direction="row" spacing={4} alignItems="center" justifyContent="center" className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
              <DemoBox className="!bg-emerald-100 !text-emerald-700">Item A</DemoBox>
              <DemoBox className="!bg-purple-100 !text-purple-700">Item B</DemoBox>
              <DemoBox className="!bg-amber-100 !text-amber-700">Item C</DemoBox>
            </ITStack>
          </div>
          {/* Vertical with divider */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Vertical + divider</p>
            <ITStack spacing={2} divider={<div className="h-px bg-slate-200 dark:bg-slate-700" />}>
              <DemoBox>Sección 1</DemoBox>
              <DemoBox>Sección 2</DemoBox>
              <DemoBox>Sección 3</DemoBox>
            </ITStack>
          </div>
        </ITStack>
      }
    />
  );
};

// ─────────────────────────────────────────
// 2. ITFlex Showcase
// ─────────────────────────────────────────
export const FlexShowcase = () => {
  const [direction, setDirection] = useState<"row" | "column">("row");
  const [justify, setJustify] = useState("start");
  const [align, setAlign] = useState("center");
  const [gap, setGap] = useState(3);

  const justifyOptions = [
    { value: "start", label: "Start" },
    { value: "center", label: "Center" },
    { value: "end", label: "End" },
    { value: "between", label: "Between" },
    { value: "around", label: "Around" },
  ];

  const code = `<ITFlex direction="${direction}" justify="${justify}" align="${align}" gap={${gap}}>\n  <Box>Item 1</Box>\n  <Box>Item 2</Box>\n  <Box>Item 3</Box>\n</ITFlex>`;

  return (
    <ShowcaseLayout
      title="ITFlex"
      description="Contenedor flexbox completo con control total sobre alineación, distribución y gap. Para layouts complejos que requieren más control que ITStack."
      code={code}
      demo={
        <div className="w-full">
          <ITFlex direction={direction} justify={justify as any} align={align as any} gap={gap} className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 min-h-[100px] border border-dashed border-slate-200 dark:border-slate-700">
            <DemoBox className="!bg-blue-100 !text-blue-700">Flex 1</DemoBox>
            <DemoBox className="!bg-emerald-100 !text-emerald-700">Flex 2</DemoBox>
            <DemoBox className="!bg-purple-100 !text-purple-700">Flex 3</DemoBox>
          </ITFlex>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <ITSegmentedControl
            options={[
              { value: "row", label: "Row" },
              { value: "column", label: "Column" },
              { value: "row-reverse", label: "Row Rev" },
              { value: "column-reverse", label: "Col Rev" },
            ]}
            value={direction}
            onChange={(v) => setDirection(v as any)}
            size="sm"
          />
          <ITStack spacing={2}>
            <span className="text-xs font-semibold text-slate-600">Justify</span>
            <ITSegmentedControl
              options={justifyOptions.map(o => ({ value: o.value, label: o.label }))}
              value={justify}
              onChange={setJustify}
            />
          </ITStack>
          <ITStack spacing={2}>
            <span className="text-xs font-semibold text-slate-600">Align</span>
            <ITSegmentedControl
              options={["start", "center", "end", "stretch"].map(a => ({ value: a, label: a.charAt(0).toUpperCase() + a.slice(1) }))}
              value={align}
              onChange={setAlign}
            />
          </ITStack>
          <ITSlider label="Gap" value={gap} onChange={setGap} min={0} max={10} />
        </ITStack>
      }
      gallery={
        <ITStack spacing={6}>
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Space-Between Row</p>
            <ITFlex justify="between" className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
              <DemoBox className="!w-20">Left</DemoBox>
              <DemoBox className="!w-20">Center</DemoBox>
              <DemoBox className="!w-20">Right</DemoBox>
            </ITFlex>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Grow Items</p>
            <ITFlex gap={3}>
              <ITFlex grow className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 text-center text-sm text-blue-700">Grow</ITFlex>
              <ITFlex grow className="bg-emerald-100 dark:bg-emerald-900/30 rounded-lg p-3 text-center text-sm text-emerald-700">Grow</ITFlex>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center text-sm text-slate-500">Fixed</div>
            </ITFlex>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Column Layout</p>
            <ITFlex direction="column" gap={2} className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
              <DemoBox className="!w-full">Stacked 1</DemoBox>
              <DemoBox className="!w-full">Stacked 2</DemoBox>
              <DemoBox className="!w-full">Stacked 3</DemoBox>
            </ITFlex>
          </div>
        </ITStack>
      }
    />
  );
};

// ─────────────────────────────────────────
// 3. ITGrid Showcase
// ─────────────────────────────────────────
export const GridShowcase = () => {
  const [spacing, setSpacing] = useState(3);
  const [columns, setColumns] = useState(3);

  const code = `<ITGrid container spacing={${spacing}}>\n  {items.map(item => (\n    <ITGrid item xs={12} md={${12 / columns}}>\n      <Card>{item.name}</Card>\n    </ITGrid>\n  ))}\n</ITGrid>`;

  const items = Array.from({ length: columns * 2 }, (_, i) => `Item ${i + 1}`);

  return (
    <ShowcaseLayout
      title="ITGrid"
      description="Sistema de grid responsivo de 12 columnas. Ideal para dashboards, galerías, y layouts de página completos."
      code={code}
      demo={
        <div className="w-full">
          <ITGrid container spacing={spacing}>
            {items.map((item, i) => (
              <ITGrid key={i} item xs={12} md={Math.floor(12 / columns)}>
                <DemoBox className="!bg-white dark:!bg-slate-800 !text-slate-700 dark:!text-slate-200 border border-slate-200 dark:border-slate-700">
                  {item}
                </DemoBox>
              </ITGrid>
            ))}
          </ITGrid>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <ITSlider label="Columnas" value={columns} onChange={setColumns} min={1} max={6} />
          <ITSlider label="Spacing" value={spacing} onChange={setSpacing} min={0} max={8} />
        </ITStack>
      }
      gallery={
        <ITStack spacing={6}>
          {/* Sidebar + Content layout */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Sidebar + Content (3/9)</p>
            <ITGrid container spacing={3}>
              <ITGrid item xs={12} md={3}>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-center text-sm text-slate-500">Sidebar</div>
              </ITGrid>
              <ITGrid item xs={12} md={9}>
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center text-sm text-primary-600">Main Content</div>
              </ITGrid>
            </ITGrid>
          </div>
          {/* Responsive cards */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Responsive (xs=12 sm=6 md=4 lg=3)</p>
            <ITGrid container spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <ITGrid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <DemoCard>Card {i}</DemoCard>
                </ITGrid>
              ))}
            </ITGrid>
          </div>
          {/* 2-column form layout */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Form Layout (2 columnas)</p>
            <ITGrid container spacing={3}>
              <ITGrid item xs={12} md={6}>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                  <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-8 bg-slate-100 dark:bg-slate-700/50 rounded" />
                </div>
              </ITGrid>
              <ITGrid item xs={12} md={6}>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                  <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-8 bg-slate-100 dark:bg-slate-700/50 rounded" />
                </div>
              </ITGrid>
              <ITGrid item xs={12}>
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                  <div className="h-3 w-1/4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-20 bg-slate-100 dark:bg-slate-700/50 rounded" />
                </div>
              </ITGrid>
            </ITGrid>
          </div>
        </ITStack>
      }
    />
  );
};

// ─────────────────────────────────────────
// 4. Composite Screen Examples
// ─────────────────────────────────────────
const SectionTitle = ({ children }: { children: string }) => (
  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{children}</h3>
);

const SectionDesc = ({ children }: { children: string }) => (
  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{children}</p>
);

export const ScreenDashboardShowcase = () => {
  const code = `// Dashboard completo en 30 líneas
<ITStack spacing={6}>
  {/* Header row */}
  <ITFlex justify="between" align="center">
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-slate-500">Resumen de actividad</p>
    </div>
    <ITButton label="Exportar" variant="outlined" />
  </ITFlex>

  {/* Stats cards grid */}
  <ITGrid container spacing={4}>
    {stats.map(stat => (
      <ITGrid item xs={12} sm={6} lg={3} key={stat.title}>
        <ITCard>
          <StatCard {...stat} />
        </ITCard>
      </ITGrid>
    ))}
  </ITGrid>

  {/* Charts section */}
  <ITGrid container spacing={4}>
    <ITGrid item xs={12} lg={8}>
      <ITCard title="Gráfico Principal">...</ITCard>
    </ITGrid>
    <ITGrid item xs={12} lg={4}>
      <ITCard title="Actividad Reciente">
        <ITStack spacing={3}>
          {items.map(item => <ActivityRow key={item.id} {...item} />)}
        </ITStack>
      </ITCard>
    </ITGrid>
  </ITGrid>
</ITStack>`;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Pantallas Compuestas</h1>
        <p className="text-slate-500 mt-1.5 text-sm md:text-base">
          Ejemplos reales combinando ITStack + ITFlex + ITGrid para construir pantallas completas en minutos.
        </p>
      </div>

      {/* Dashboard Example */}
      <ITCard title="Dashboard de Métricas" className="overflow-hidden">
        <ITStack spacing={6}>
          <ITFlex justify="between" align="center">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Dashboard</h2>
              <p className="text-xs text-slate-400">Resumen de actividad del sistema</p>
            </div>
            <ITButton label="Exportar" variant="outlined" size="small" />
          </ITFlex>

          <ITGrid container spacing={3}>
            <ITGrid item xs={12} sm={6} lg={3}>
              <ITStatCard label="Usuarios Activos" value="1,245" trend="+12%" trendDirection="up" />
            </ITGrid>
            <ITGrid item xs={12} sm={6} lg={3}>
              <ITStatCard label="Ventas Hoy" value="$4,320" trend="+5.4%" trendDirection="up" color="bg-blue-50 dark:bg-blue-950/20" />
            </ITGrid>
            <ITGrid item xs={12} sm={6} lg={3}>
              <ITStatCard label="Órdenes" value="89" trend="-2.1%" trendDirection="down" color="bg-amber-50 dark:bg-amber-950/20" />
            </ITGrid>
            <ITGrid item xs={12} sm={6} lg={3}>
              <ITStatCard label="Tickets Abiertos" value="12" trend="-8%" trendDirection="down" color="bg-rose-50 dark:bg-rose-950/20" />
            </ITGrid>
          </ITGrid>

          <ITGrid container spacing={3}>
            <ITGrid item xs={12} lg={8}>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                <ITFlex justify="between" align="center" className="mb-4">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Gráfico de Ventas</span>
                  <span className="text-xs text-slate-400">Últimos 30 días</span>
                </ITFlex>
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary-500/60 dark:bg-primary-400/40 rounded-t-md hover:bg-primary-500 transition-all" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </ITGrid>
            <ITGrid item xs={12} lg={4}>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800 h-full">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3 block">Actividad Reciente</span>
                <ITStack spacing={3}>
                  {[
                    { user: "Ana López", action: "creó un reporte" },
                    { user: "Carlos Ruiz", action: "aprobó la orden #1234" },
                    { user: "María García", action: "actualizó el perfil" },
                  ].map((item, i) => (
                    <ITFlex key={i} gap={3} align="center">
                      <ITAvatar initials={item.user.split(" ").map(w => w[0]).join("")} size="sm" color="bg-primary-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{item.user}</p>
                        <p className="text-[10px] text-slate-400 truncate">{item.action}</p>
                      </div>
                    </ITFlex>
                  ))}
                </ITStack>
              </div>
            </ITGrid>
          </ITGrid>
        </ITStack>
      </ITCard>

      <CodeViewer code={code} />
    </div>
  );
};

export const ScreenFormShowcase = () => {
  const formCode = `// Formulario responsivo en 20 líneas
<ITStack spacing={6}>
  <div>
    <h1 className="text-2xl font-bold">Nuevo Usuario</h1>
    <p className="text-sm text-slate-500">Completa los campos</p>
  </div>

  <ITGrid container spacing={4}>
    <ITGrid item xs={12} md={6}>
      <Input label="Nombre" />
    </ITGrid>
    <ITGrid item xs={12} md={6}>
      <Input label="Apellido" />
    </ITGrid>
    <ITGrid item xs={12}>
      <Input label="Email" />
    </ITGrid>
    <ITGrid item xs={12} md={6}>
      <Select label="Rol" />
    </ITGrid>
    <ITGrid item xs={12} md={6}>
      <Select label="Departamento" />
    </ITGrid>
    <ITGrid item xs={12}>
      <ITFlex justify="end" gap={3}>
        <Button variant="outlined">Cancelar</Button>
        <Button>Guardar</Button>
      </ITFlex>
    </ITGrid>
  </ITGrid>
</ITStack>`;

  return (
    <ITCard title="Formulario Responsivo">
      <ITStack spacing={6}>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Nuevo Usuario</h2>
          <p className="text-xs text-slate-400">Completa los campos para registrar un nuevo usuario</p>
        </div>

        <ITGrid container spacing={4}>
          <ITGrid item xs={12} md={6}>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Nombre</label>
              <input className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ej: Juan" />
            </div>
          </ITGrid>
          <ITGrid item xs={12} md={6}>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Apellido</label>
              <input className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ej: Pérez" />
            </div>
          </ITGrid>
          <ITGrid item xs={12}>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Email</label>
              <input className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" placeholder="ej: usuario@correo.com" />
            </div>
          </ITGrid>
          <ITGrid item xs={12} md={6}>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Rol</label>
              <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500">
                <option>Seleccionar...</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Usuario</option>
              </select>
            </div>
          </ITGrid>
          <ITGrid item xs={12} md={6}>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Departamento</label>
              <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500">
                <option>Seleccionar...</option>
                <option>Ingeniería</option>
                <option>Diseño</option>
                <option>Ventas</option>
              </select>
            </div>
          </ITGrid>
          <ITGrid item xs={12}>
            <ITFlex justify="end" gap={3}>
              <ITButton label="Cancelar" variant="outlined" size="small" />
              <ITButton label="Guardar" size="small" />
            </ITFlex>
          </ITGrid>
        </ITGrid>
      </ITStack>
      <div className="mt-6">
        <CodeViewer code={formCode} />
      </div>
    </ITCard>
  );
};

export const ScreenCardGridShowcase = () => {
  const code = `// Grid de tarjetas 100% responsivo
<ITGrid container spacing={4}>
  {products.map(product => (
    <ITGrid item xs={12} sm={6} md={4} lg={3} key={product.id}>
      <ITCard>
        <img src={product.image} alt={product.name} />
        <ITStack spacing={1}>
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-sm text-slate-500">{product.price}</p>
          <ITButton label="Ver más" fullWidth />
        </ITStack>
      </ITCard>
    </ITGrid>
  ))}
</ITGrid>`;

  return (
    <ITCard title="Grid de Tarjetas Responsivo">
      <ITStack spacing={4}>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Productos</h2>
          <p className="text-xs text-slate-400">Galería responsiva que pasa de 1 columna en mobile a 4 columnas en desktop</p>
        </div>

        <ITGrid container spacing={4}>
          {[
            { name: "Design Pro", color: "bg-blue-500" },
            { name: "Dev Kit", color: "bg-emerald-500" },
            { name: "UI Bundle", color: "bg-purple-500" },
            { name: "Analytics", color: "bg-amber-500" },
            { name: "Cloud Sync", color: "bg-rose-500" },
            { name: "Security+", color: "bg-cyan-500" },
            { name: "Data Viz", color: "bg-indigo-500" },
            { name: "API Hub", color: "bg-teal-500" },
          ].map((product, i) => (
            <ITGrid key={i} item xs={12} sm={6} md={4} lg={3}>
              <ITStack spacing={3} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow">
                <div className={`${product.color} h-24 rounded-lg flex items-center justify-center text-white text-2xl font-bold`}>
                  {product.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm">{product.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">A partir de $19.99/mes</p>
                </div>
                <ITButton label="Ver más" size="small" className="w-full" />
              </ITStack>
            </ITGrid>
          ))}
        </ITGrid>
      </ITStack>
      <div className="mt-6">
        <CodeViewer code={code} />
      </div>
    </ITCard>
  );
};
