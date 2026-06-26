import { useState } from "react";
import {
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaBoxOpen,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaDownload,
  FaFilter,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBell,
  FaSave,
  FaSignOutAlt,
  FaShieldAlt,
  FaPalette,
  FaLanguage,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import ITPage from "../components/page/page";
import ITPageHeader from "../components/page-header/page-header";
import ITButton from "../components/button/button";
import ITCard from "../components/card/card";
import ITStack from "../components/stack/stack";
import ITGrid from "../components/grid/grid";
import ITStatCard from "../components/stat-card/stat-card";
import ITFlex from "../components/flex/flex";
import ITAvatar from "../components/avatar/avatar";
import ITSlideToggle from "../components/slide/slide";
import ITText from "@/components/text/text";
import { ShowcaseLayout } from "./ShowcaseLayout";

export const PageHeaderShowcase = () => {
  const [showBack, setShowBack] = useState(true);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  const code = `<ITPageHeader
  title="Usuarios"
  description="Gestiona los usuarios del sistema"
  icon={<FaUsers size={20} />}
  iconColor="#6366f1"
  breadcrumbs={[
    { label: "Inicio", href: "#" },
    { label: "Usuarios" },
  ]}
  actions={<ITButton label="Nuevo" size="small" />}
/>`;

  return (
    <ShowcaseLayout
      title="ITPageHeader"
      description="Encabezado estandarizado para pantallas. Incluye título, descripción, icono, breadcrumbs, botón de volver y área de acciones."
      code={code}
      demo={
        <div className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-900/50">
          <ITPageHeader
            title="Usuarios"
            description={showDescription ? "Gestiona los usuarios del sistema" : undefined}
            icon={showIcon ? <FaUsers size={20} /> : undefined}
            iconColor={showIcon ? "#6366f1" : undefined}
            breadcrumbs={showBreadcrumbs ? [
              { label: "Inicio", href: "#" },
              { label: "Usuarios" },
            ] : undefined}
            backAction={showBack ? () => {} : undefined}
            actions={showActions ? <ITButton label="Nuevo Usuario" size="small" /> : undefined}
          />
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Volver</span>
            <ITSlideToggle isOn={showBack} onToggle={setShowBack} size="sm" />
          </ITFlex>
          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Breadcrumbs</span>
            <ITSlideToggle isOn={showBreadcrumbs} onToggle={setShowBreadcrumbs} size="sm" />
          </ITFlex>
          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Descripción</span>
            <ITSlideToggle isOn={showDescription} onToggle={setShowDescription} size="sm" />
          </ITFlex>
          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Icono</span>
            <ITSlideToggle isOn={showIcon} onToggle={setShowIcon} size="sm" />
          </ITFlex>
          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Acciones</span>
            <ITSlideToggle isOn={showActions} onToggle={setShowActions} size="sm" />
          </ITFlex>
        </ITStack>
      }
      gallery={
        <ITStack spacing={4}>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900/50">
            <ITPageHeader title="Solo título" />
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900/50">
            <ITPageHeader
              title="Dashboard"
              description="Resumen de métricas del sistema"
            />
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900/50">
            <ITPageHeader
              title="Órdenes"
              description="Listado de órdenes activas"
              breadcrumbs={[
                { label: "Dashboard", href: "#" },
                { label: "Órdenes" },
              ]}
              actions={
                <>
                  <ITButton label="Exportar" variant="outlined" size="small" />
                  <ITButton label="Nueva" size="small" />
                </>
              }
            />
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900/50">
            <ITPageHeader
              title="Editar Producto"
              description="Modifica los datos del producto"
              breadcrumbs={[
                { label: "Productos", href: "#" },
                { label: "Editar" },
              ]}
              backAction={() => {}}
              actions={
                <>
                  <ITButton label="Cancelar" variant="outlined" size="small" />
                  <ITButton label="Guardar" size="small" />
                </>
              }
            />
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900/50">
            <ITPageHeader
              title="Usuarios"
              description="Gestiona los usuarios del sistema"
              icon={<FaUsers size={20} />}
              iconColor="#6366f1"
            />
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900/50">
            <ITPageHeader
              title="Órdenes"
              description="Listado de órdenes activas"
              icon={<FaShoppingCart size={20} />}
              iconColor="#f59e0b"
              breadcrumbs={[
                { label: "Dashboard", href: "#" },
                { label: "Órdenes" },
              ]}
              actions={<ITButton label="Nueva Orden" size="small" />}
            />
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900/50">
            <ITPageHeader
              title="Configuración"
              description="Ajustes generales del sistema"
              icon={<FaCog size={20} />}
              iconColor="#10b981"
            />
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-900/50">
            <ITPageHeader
              title="Detalle del Producto"
              description="Información completa del producto"
              icon={<FaBoxOpen size={20} />}
              iconColor="#ec4899"
              backAction={() => {}}
              breadcrumbs={[
                { label: "Productos", href: "#" },
                { label: "Detalle" },
              ]}
              actions={<ITButton label="Editar" size="small" />}
            />
          </div>
        </ITStack>
      }
    />
  );
};

export const PageShowcase = () => {
  const [state, setState] = useState<"normal" | "loading" | "error" | "empty">("normal");
  const [showIcon, setShowIcon] = useState(true);

  const code = `<ITPage
  title="Dashboard"
  description="Resumen general del sistema"
  icon={<FaChartLine size={20} />}
  iconColor="#6366f1"
  breadcrumbs={[{ label: "Inicio", href: "#" }, { label: "Dashboard" }]}
  loading={isLoading}
  error={error}
  empty={isEmpty}
  onRetry={refetch}
>
  {/* KPIs, gráficos, listas, tablas... */}
</ITPage>`;

  return (
    <ShowcaseLayout
      title="ITPage"
      description="Template completo de página con estados: carga, error, vacío y contenido normal."
      code={code}
      demo={
        <div className="w-full border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900/50">
          <ITPage
            title="Dashboard"
            description="Resumen general del sistema en tiempo real"
            icon={showIcon ? <FaChartLine size={20} /> : undefined}
            iconColor={showIcon ? "#6366f1" : undefined}
            breadcrumbs={[
              { label: "Inicio", href: "#" },
              { label: "Dashboard" },
            ]}
            loading={state === "loading"}
            error={state === "error" ? "No se pudo conectar con el servidor. Verifica tu conexión a internet." : null}
            errorTitle="Error de conexión"
            onRetry={() => setState("normal")}
            empty={state === "empty"}
            emptyTitle="Aún no hay actividad"
            emptyDescription="Cuando tus usuarios comiencen a generar actividad, verás las métricas aquí."
            emptyAction={<ITButton label="Invitar usuarios" size="small" icon={<FaPlus />} />}
          >
            {/* KPIs */}
            <ITGrid container spacing={3}>
              <ITGrid item xs={12} sm={6} lg={3}>
                <ITStatCard label="Ingresos del mes" value="$48,250" trend="+12.5%" trendDirection="up" />
              </ITGrid>
              <ITGrid item xs={12} sm={6} lg={3}>
                <ITStatCard label="Usuarios activos" value="1,245" trend="+5.4%" trendDirection="up" color="bg-blue-50 dark:bg-blue-950/20" />
              </ITGrid>
              <ITGrid item xs={12} sm={6} lg={3}>
                <ITStatCard label="Órdenes pendientes" value="89" trend="-2.1%" trendDirection="down" color="bg-amber-50 dark:bg-amber-950/20" />
              </ITGrid>
              <ITGrid item xs={12} sm={6} lg={3}>
                <ITStatCard label="Tickets abiertos" value="12" trend="-8%" trendDirection="down" color="bg-rose-50 dark:bg-rose-950/20" />
              </ITGrid>
            </ITGrid>

            {/* Charts + Activity */}
            <ITGrid container spacing={3}>
              <ITGrid item xs={12} lg={8}>
                <ITCard title="Ventas de los últimos 30 días">
                  <div className="h-48 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50, 70, 85, 60, 90, 80, 95, 70, 85, 65, 90, 75, 88, 70, 92, 80, 96, 78, 90].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary-500/60 dark:bg-primary-400/40 rounded-t-md hover:bg-primary-500 transition-all"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <ITText className="text-xs text-slate-500">Total: $148,250</ITText>
                    <ITFlex gap={3} align="center">
                      <ITFlex gap={1.5} align="center">
                        <FaArrowUp className="text-emerald-500 text-xs" />
                        <span className="text-xs font-semibold text-emerald-600">+24.5%</span>
                      </ITFlex>
                      <span className="text-xs text-slate-400">vs mes anterior</span>
                    </ITFlex>
                  </div>
                </ITCard>
              </ITGrid>
              <ITGrid item xs={12} lg={4}>
                <ITCard title="Actividad reciente">
                  <ITStack spacing={3}>
                    {[
                      { user: "Ana López", action: "creó un reporte", time: "hace 2 min", color: "bg-emerald-500" },
                      { user: "Carlos Ruiz", action: "aprobó orden #1234", time: "hace 15 min", color: "bg-blue-500" },
                      { user: "María García", action: "actualizó perfil", time: "hace 1 h", color: "bg-purple-500" },
                      { user: "Pedro Martín", action: "subió documento", time: "hace 3 h", color: "bg-amber-500" },
                    ].map((item, i) => (
                      <ITFlex key={i} gap={3} align="center">
                        <ITAvatar initials={item.user.split(" ").map(w => w[0]).join("")} size="sm" color={item.color} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{item.user}</p>
                          <p className="text-[10px] text-slate-400 truncate">{item.action}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                      </ITFlex>
                    ))}
                  </ITStack>
                </ITCard>
              </ITGrid>
            </ITGrid>
          </ITPage>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Estado de la página</p>
            <ITFlex gap={2} wrap="wrap">
              {(["normal", "loading", "error", "empty"] as const).map((s) => (
                <ITButton
                  key={s}
                  label={s.charAt(0).toUpperCase() + s.slice(1)}
                  variant={state === s ? "filled" : "outlined"}
                  size="small"
                  onClick={() => setState(s)}
                />
              ))}
            </ITFlex>
          </div>
          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Icono en header</span>
            <ITSlideToggle isOn={showIcon} onToggle={setShowIcon} size="sm" />
          </ITFlex>
        </ITStack>
      }
      gallery={
        <ITStack spacing={6}>
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Listado de Usuarios</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="Usuarios"
                description="1,245 usuarios registrados · 38 activos hoy"
                icon={<FaUsers size={20} />}
                iconColor="#6366f1"
                breadcrumbs={[{ label: "Inicio", href: "#" }, { label: "Usuarios" }]}
                actions={
                  <>
                    <ITButton label="Exportar" variant="outlined" size="small" icon={<FaDownload />} />
                    <ITButton label="Nuevo usuario" size="small" icon={<FaPlus />} />
                  </>
                }
              >
                <ITCard>
                  <ITFlex gap={3} className="mb-4">
                    <div className="flex-1 relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <ITButton label="Filtros" variant="outlined" size="small" icon={<FaFilter />} />
                  </ITFlex>
                  <ITStack spacing={2}>
                    {[
                      { name: "Ana López", email: "ana.lopez@axzy.dev", role: "Admin", status: "active", last: "Hace 2 min" },
                      { name: "Carlos Ruiz", email: "carlos.ruiz@axzy.dev", role: "Editor", status: "active", last: "Hace 1 h" },
                      { name: "María García", email: "maria.garcia@axzy.dev", role: "Viewer", status: "inactive", last: "Hace 3 días" },
                      { name: "Pedro Martín", email: "pedro.martin@axzy.dev", role: "Admin", status: "active", last: "Hace 5 min" },
                      { name: "Lucía Fernández", email: "lucia.fernandez@axzy.dev", role: "Editor", status: "pending", last: "Nunca" },
                    ].map((u, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <ITAvatar initials={u.name.split(" ").map(w => w[0]).join("")} size="sm" color={u.status === "active" ? "bg-emerald-500" : u.status === "pending" ? "bg-amber-500" : "bg-slate-400"} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{u.name}</p>
                          <p className="text-xs text-slate-500 truncate">{u.email}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                          u.role === "Admin" ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" :
                          u.role === "Editor" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" :
                          "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}>{u.role}</span>
                        <ITFlex gap={1}>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-primary-600"><FaEye size={12} /></button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-primary-600"><FaEdit size={12} /></button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-rose-600"><FaTrash size={12} /></button>
                        </ITFlex>
                      </div>
                    ))}
                  </ITStack>
                </ITCard>
              </ITPage>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Detalle de Producto</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="MacBook Pro 16'' M3 Max"
                description="SKU: MBP-16-M3MAX-2024 · Stock: 24 unidades"
                icon={<FaBoxOpen size={20} />}
                iconColor="#ec4899"
                breadcrumbs={[
                  { label: "Inicio", href: "#" },
                  { label: "Productos", href: "#" },
                  { label: "MacBook Pro 16" },
                ]}
                backAction={() => {}}
                actions={
                  <>
                    <ITButton label="Eliminar" variant="outlined" size="small" icon={<FaTrash />} />
                    <ITButton label="Editar" size="small" icon={<FaEdit />} />
                  </>
                }
              >
                <ITGrid container spacing={3}>
                  <ITGrid item xs={12} md={5}>
                    <ITCard>
                      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl flex items-center justify-center">
                        <FaBoxOpen className="text-6xl text-slate-400" />
                      </div>
                      <ITFlex gap={2} className="mt-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-transparent hover:border-primary-500 cursor-pointer" />
                        ))}
                      </ITFlex>
                    </ITCard>
                  </ITGrid>
                  <ITGrid item xs={12} md={7}>
                    <ITCard title="Información general">
                      <ITStack spacing={4}>
                        <div>
                          <p className="text-xs font-bold uppercase text-slate-400 mb-1">Precio</p>
                          <ITFlex align="baseline" gap={2}>
                            <span className="text-3xl font-extrabold text-slate-800 dark:text-white">$3,499</span>
                            <span className="text-sm text-slate-400 line-through">$3,799</span>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">-8%</span>
                          </ITFlex>
                        </div>
                        <ITGrid container spacing={3}>
                          <ITGrid item xs={6}>
                            <p className="text-xs font-bold uppercase text-slate-400 mb-1">Categoría</p>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Laptops</p>
                          </ITGrid>
                          <ITGrid item xs={6}>
                            <p className="text-xs font-bold uppercase text-slate-400 mb-1">Estado</p>
                            <ITFlex gap={1.5} align="center">
                              <FaCheckCircle className="text-emerald-500 text-xs" />
                              <span className="text-sm font-semibold text-emerald-600">Activo</span>
                            </ITFlex>
                          </ITGrid>
                          <ITGrid item xs={6}>
                            <p className="text-xs font-bold uppercase text-slate-400 mb-1">Vendidos</p>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">142 unidades</p>
                          </ITGrid>
                          <ITGrid item xs={6}>
                            <p className="text-xs font-bold uppercase text-slate-400 mb-1">Valoración</p>
                            <p className="text-sm font-semibold text-amber-600">★ 4.8 (89 reseñas)</p>
                          </ITGrid>
                        </ITGrid>
                        <div>
                          <p className="text-xs font-bold uppercase text-slate-400 mb-1">Descripción</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Potencia extrema para profesionales. Chip M3 Max con CPU de 16 núcleos, GPU de 40 núcleos y 64GB de memoria unificada.
                          </p>
                        </div>
                      </ITStack>
                    </ITCard>
                  </ITGrid>
                </ITGrid>
              </ITPage>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Editar / Formulario</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="Editar perfil"
                description="Actualiza tu información personal y de contacto"
                icon={<FaEdit size={20} />}
                iconColor="#10b981"
                breadcrumbs={[
                  { label: "Inicio", href: "#" },
                  { label: "Mi cuenta", href: "#" },
                  { label: "Editar perfil" },
                ]}
                backAction={() => {}}
                actions={
                  <>
                    <ITButton label="Cancelar" variant="outlined" size="small" />
                    <ITButton label="Guardar cambios" size="small" icon={<FaSave />} />
                  </>
                }
              >
                <ITGrid container spacing={3}>
                  <ITGrid item xs={12} md={4}>
                    <ITCard title="Foto de perfil">
                      <div className="flex flex-col items-center gap-4">
                        <ITAvatar initials="AL" size="xl" color="bg-primary-500" />
                        <div className="w-full">
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">URL de imagen</label>
                          <input type="text" placeholder="https://..." defaultValue="" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <ITButton label="Subir imagen" variant="outlined" size="small" />
                      </div>
                    </ITCard>
                  </ITGrid>
                  <ITGrid item xs={12} md={8}>
                    <ITCard title="Información personal">
                      <ITGrid container spacing={3}>
                        <ITGrid item xs={12} sm={6}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Nombre</label>
                          <input type="text" defaultValue="Ana" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </ITGrid>
                        <ITGrid item xs={12} sm={6}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Apellido</label>
                          <input type="text" defaultValue="López" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </ITGrid>
                        <ITGrid item xs={12}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Email</label>
                          <input type="email" defaultValue="ana.lopez@axzy.dev" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </ITGrid>
                        <ITGrid item xs={12} sm={6}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Teléfono</label>
                          <input type="text" placeholder="+52..." className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </ITGrid>
                        <ITGrid item xs={12} sm={6}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Ubicación</label>
                          <input type="text" placeholder="Ciudad, País" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </ITGrid>
                        <ITGrid item xs={12}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Biografía</label>
                          <textarea
                            rows={3}
                            defaultValue="Diseñadora de producto enfocada en crear experiencias memorables."
                            className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </ITGrid>
                      </ITGrid>
                    </ITCard>
                  </ITGrid>
                </ITGrid>
              </ITPage>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Configuración con tabs</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="Configuración"
                description="Administra las preferencias de tu cuenta y del sistema"
                icon={<FaCog size={20} />}
                iconColor="#f59e0b"
                breadcrumbs={[{ label: "Inicio", href: "#" }, { label: "Configuración" }]}
              >
                <ITGrid container spacing={3}>
                  <ITGrid item xs={12} md={4}>
                    <ITCard>
                      <ITStack spacing={1}>
                        {[
                          { id: "general", label: "General", icon: <FaCog />, active: true },
                          { id: "notif", label: "Notificaciones", icon: <FaBell /> },
                          { id: "sec", label: "Seguridad", icon: <FaShieldAlt /> },
                          { id: "apariencia", label: "Apariencia", icon: <FaPalette /> },
                          { id: "lang", label: "Idioma", icon: <FaLanguage /> },
                          { id: "billing", label: "Facturación", icon: <FaDollarSign /> },
                        ].map(item => (
                          <button key={item.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? "bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                          </button>
                        ))}
                      </ITStack>
                    </ITCard>
                  </ITGrid>
                  <ITGrid item xs={12} md={8}>
                    <ITCard title="Preferencias generales">
                      <ITStack spacing={4}>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Nombre del sistema</label>
                          <input type="text" defaultValue="AXZY Console" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Zona horaria</label>
                          <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500">
                            <option>América/México_City (GMT-6)</option>
                            <option>América/Bogotá (GMT-5)</option>
                            <option>América/Madrid (GMT+1)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Idioma por defecto</label>
                          <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500">
                            <option>Español (México)</option>
                            <option>Español (España)</option>
                            <option>English (US)</option>
                          </select>
                        </div>
                        <ITStack spacing={3} className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <ITFlex justify="between" align="center">
                            <div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Modo oscuro automático</p>
                              <p className="text-xs text-slate-500">Sigue la configuración del sistema</p>
                            </div>
                            <ITSlideToggle isOn={true} onToggle={() => {}} size="sm" />
                          </ITFlex>
                          <ITFlex justify="between" align="center">
                            <div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Notificaciones por email</p>
                              <p className="text-xs text-slate-500">Recibe alertas de actividad</p>
                            </div>
                            <ITSlideToggle isOn={false} onToggle={() => {}} size="sm" />
                          </ITFlex>
                        </ITStack>
                      </ITStack>
                    </ITCard>
                  </ITGrid>
                </ITGrid>
              </ITPage>
            </div>
          </div>
        </ITStack>
      }
    />
  );
};
