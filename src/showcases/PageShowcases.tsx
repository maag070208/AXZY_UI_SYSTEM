import { useState } from "react";
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
import { ShowcaseLayout } from "./ShowcaseLayout";

export const PageHeaderShowcase = () => {
  const [showBack, setShowBack] = useState(true);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showActions, setShowActions] = useState(true);

  const code = `<ITPageHeader
  title="Usuarios"
  description="Gestiona los usuarios del sistema"
  breadcrumbs={[
    { label: "Inicio", href: "#" },
    { label: "Usuarios" },
  ]}
  actions={<ITButton label="Nuevo" size="small" />}
/>`;

  return (
    <ShowcaseLayout
      title="ITPageHeader"
      description="Encabezado estandarizado para pantallas. Incluye título, descripción, breadcrumbs, botón de volver y área de acciones."
      code={code}
      demo={
        <div className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-900/50">
          <ITPageHeader
            title="Usuarios"
            description={showDescription ? "Gestiona los usuarios del sistema" : undefined}
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
        </ITStack>
      }
    />
  );
};

export const PageShowcase = () => {
  const [state, setState] = useState<"normal" | "loading" | "error" | "empty">("normal");

  const code = `<ITPage
  title="Dashboard"
  description="Resumen de actividad"
  breadcrumbs={[{ label: "Dashboard" }]}
  loading={isLoading}
  error={error}
  onRetry={refetch}
>
  <ITGrid container spacing={3}>
    <ITGrid item xs={12} sm={6} lg={3}>
      <ITStatCard label="Usuarios" value="1,245" />
    </ITGrid>
  </ITGrid>
</ITPage>`;

  return (
    <ShowcaseLayout
      title="ITPage"
      description="Template completo de página con estados: carga, error, vacío y contenido normal."
      code={code}
      demo={
        <div className="w-full">
          <ITPage
            title="Dashboard"
            description="Resumen de actividad del sistema"
            breadcrumbs={[
              { label: "Dashboard" },
            ]}
            loading={state === "loading"}
            error={state === "error" ? "Error al cargar los datos. Verifica tu conexión." : null}
            onRetry={() => setState("normal")}
            empty={state === "empty"}
            emptyTitle="Sin datos disponibles"
            emptyDescription="No hay actividad reciente para mostrar."
          >
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
                <ITStatCard label="Tickets" value="12" trend="-8%" trendDirection="down" color="bg-rose-50 dark:bg-rose-950/20" />
              </ITGrid>
            </ITGrid>

            <ITCard title="Actividad Reciente">
              <ITStack spacing={3}>
                {[
                  { user: "Ana López", action: "creó un reporte" },
                  { user: "Carlos Ruiz", action: "aprobó orden #1234" },
                  { user: "María García", action: "actualizó perfil" },
                ].map((item, i) => (
                  <ITFlex key={i} gap={3} align="center">
                    <ITAvatar initials={item.user.split(" ").map(w => w[0]).join("")} size="sm" color="bg-primary-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{item.user}</p>
                      <p className="text-[10px] text-slate-400">{item.action}</p>
                    </div>
                  </ITFlex>
                ))}
              </ITStack>
            </ITCard>
          </ITPage>
        </div>
      }
      controls={
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
      }
    />
  );
};
