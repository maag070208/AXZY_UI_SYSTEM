# Ejemplos reales — así se usa AXZY UI System en producción

Extraído de **CYC ERP** (`~/DEV/CYC/web`), una app real con React 19 + Vite + Tailwind v4 + Redux +
react-router. Todo lo de aquí está **en producción**: úsalo como plantilla antes que inventar.

> Estos ejemplos cubren la parte que **no** está en el README: cómo se deja la instalación al 100 (capas
> de CSS, dark mode por defecto, overrides de tokens), cómo se compone el chassis en un guard de rutas, y
> cómo se escriben páginas de listado, formulario y tablero con la librería.

- Versión usada: `@axzydev/axzy_ui_system ^1.4.7`
- React 19 · Vite 6 · Tailwind `4.3.3` (`@tailwindcss/vite`) · `react-i18next` para los textos de la app

---

## 1. CSS: capas, orden y overrides (`src/app/index.css`)

```css
/* 1) El orden de capas manda por encima del orden de imports.
      `axzy-ui-system` va DESPUÉS de `base` (su reset no lo pisa tu app) y
      ANTES de `utilities` (tus utilidades de Tailwind siguen ganando cuando
      necesitas ajustar algo de la librería). */
@layer theme, base, axzy-ui-system, components, utilities;

@import "tailwindcss";
@import "@axzydev/axzy_ui_system/dist/index.css" layer(axzy-ui-system);
/* Alternativa: el propio paquete publica la versión ya capada
   @import "@axzydev/axzy_ui_system/layered.css"; */

/* 2) Tokens del provider que quieras ajustar por CSS.
      `ITThemeProvider` inyecta estos `--it-*`; un selector con atributo
      (`:root[data-it-appearance="flat"]`) gana sobre la inyección del provider. */
:root[data-it-appearance="flat"] {
  --it-layout-bg: #f5f6fa;
  --it-sidebar-border: #e8eaf0;
  --it-topbar-border: #e8eaf0;
}

/* 3) Pisar una clase interna cuando el componente no expone prop para eso.
      Con el orden de capas de arriba NO hace falta `!important`; si tu capa de
      la librería va después de `utilities`, sí (ver §8). */
.it-dialog-panel {
  width: min(94vw, 900px);
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}
```

**Por qué importa**: `dist/index.css` es un build de Tailwind ya compilado con sus propias capas
`theme/base/components/utilities`. Si tu app también importa Tailwind sin capas explícitas, acabas con
**dos** juegos de capas con el mismo nombre y gana el que se registró último (normalmente tu Preflight, que
no conoce los tokens de AXZY). Con `layer(axzy-ui-system)` + el orden declarado, no depende del orden de
los imports.

## 2. Entrada: dark mode por defecto y config del provider (`src/app/main.tsx`)

```tsx
import { ITThemePalette, ITThemeProvider } from "@axzydev/axzy_ui_system";
import "@shared/i18n/config";              // tu i18next antes de renderizar
import "@app/index.css";
import { store } from "@app/store";
import ToastProvider from "@app/toast/ToastProvider";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App";

// El provider arranca en "system" (según el SO). Si quieres un default propio,
// escribe su clave de localStorage ANTES de montar la app.
if (!localStorage.getItem("it-theme-dark-mode")) {
  localStorage.setItem("it-theme-dark-mode", "light");   // "light" | "dark" | "system"
}

const customTheme: ITThemePalette = {
  primary: "#3056B8",
  secondary: "#27469B",
  ternary: "#EEF2FB",
  alert: "#F97316",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0EA5E9",
  success: "#16A34A",
  layout: { sidebarBg: "#F5F6FA", sidebarText: "#334155", navbarBg: "#FFFFFF", navbarText: "#1E293B" },
  table: { headerBg: "#F8FAFC", headerText: "#475569", rowBg: "#FFFFFF", rowText: "#1E293B", rowHover: "#F5F7FB" },
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ITThemeProvider
        theme={customTheme}
        appearance="flat"   // lenguaje visual plano (bordes finos, sin sombras)
        radius={10}         // radio global de la escala rounded-*
        shadow={1}          // intensidad de sombras
        density={1}         // 0.5–1.5
        showFab={false}     // sin diseñador de temas flotante en producción
      >
        <ToastProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ToastProvider>
      </ITThemeProvider>
    </Provider>
  </React.StrictMode>
);
```

## 3. Chassis en un guard de rutas (`src/app/guards/PrivateRoutes.tsx`)

Toda la app autenticada vive dentro de **un** `ITLayout`; el menú se arma desde un catálogo y se filtra
por permisos.

```tsx
import { ITLayout, type ITSidebarProps, type ITNavigationItem } from "@axzydev/axzy_ui_system";
import { Outlet } from "react-router-dom";

const NAV_ICONS: Record<string, ReactNode> = { home: <FaHouseUser size={14} />, students: <FaUserGraduate size={14} /> };

export default function PrivateRoutes() {
  const { t } = useTranslation(["common"]);
  const { user } = useSelector((s: RootState) => s.auth);

  const navigationItems: ITNavigationItem[] = APP_SCREENS
    .filter((s) => isScreenVisible(s, user))              // permisos por pantalla
    .map((s) => ({
      id: s.id,
      label: t(`nav.${s.id}`),
      icon: NAV_ICONS[s.id],
      isActive: location.pathname.startsWith(s.path),
      action: () => navigate(s.path),
    }));

  const sidebar: ITSidebarProps = {
    navigationItems,
    notification: { count: unread, icon: <FaBell />, label: t("notifications"), onClick: () => navigate("/notifications") },
  };

  return (
    <ITLayout
      topBar={{
        logo: <img src={cycMark} alt="" className="h-8" />,
        logoText: "CYC ERP",
        userMenu: { userName: user?.name ?? "", userEmail: user?.email ?? "", menuItems: [{ label: t("logout"), onClick: handleLogout }] },
      }}
      sidebar={sidebar}
    >
      <Outlet />
    </ITLayout>
  );
}
```

## 4. Página de listado con tabla server-side

`src/pages/students/StudentsListPage.tsx` (73 líneas: cabecera, KPIs y tabla):

```tsx
import { ITButton, ITFlex, ITPage, ITText } from "@axzydev/axzy_ui_system";

<ITPage
  className="m-0! px-4! max-w-screen!"   // ITPage trae su propio padding/max-width: se pisa con `!`
  noPadding
  breadcrumbs={crumbs({ label: t("common:nav.students") })}
  title={t("list.title")}
  description={t("list.description", { count: fx.total })}
  icon={<FaUserGraduate size={20} />}
  actions={
    <ITFlex gap={2}>
      <ITButton variant="outlined" color="secondary" onClick={fx.reload}>
        <ITFlex align="center" gap={1}>
          <FaSync size={11} />
          <ITText className="font-bold text-[11px]">{t("common:actions.reload")}</ITText>
        </ITFlex>
      </ITButton>
      <ITButton variant="filled" color="primary" onClick={() => navigate("/students/new")}>
        <ITFlex align="center" gap={1}>
          <FaPlus size={11} />
          <ITText className="font-bold text-[11px]">{t("list.new")}</ITText>
        </ITFlex>
      </ITButton>
    </ITFlex>
  }
>
  <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <KpiTile label={t("kpi.total")} value={fx.summary?.total ?? "—"} icon={<FaUsers size={16} />} />
  </div>
  <StudentsTable fx={fx} onOpen={(student) => navigate(`/students/${student.id}`)} />
</ITPage>
```

La tabla tipada con `Column<T>` y `fetchData` (así se conecta una API real):

```tsx
import { ITDataTable, ITBadget, ITText } from "@axzydev/axzy_ui_system";
import type { Column, ITDataTableFetchParams, ITDataTableResponse } from "@axzydev/axzy_ui_system";

const columns: Column<Student>[] = [
  {
    key: "studentNumber",
    label: t("table.studentNumber"),
    type: "string",
    width: 130,
    filter: true,
    sortable: false,
    render: (s) => <ITText className="font-mono text-[12px] font-black text-slate-700">{s.studentNumber}</ITText>,
  },
  { key: "name", label: t("table.name"), type: "string", filter: true, render: (s) => <ITText className="text-[12px]">{s.fullName}</ITText> },
  { key: "status", label: t("table.status"), type: "string", render: (s) => <ITBadget label={s.status} /> },
];

<ITDataTable
  columns={columns as unknown as Column<Record<string, unknown>>[]}
  fetchData={fx.fetchTableData as unknown as (p: ITDataTableFetchParams) => Promise<ITDataTableResponse<Record<string, unknown>>>}
  reloadTrigger={fx.reloadKey}       // cambia el número y la tabla vuelve a pedir datos
  onRowClick={(row) => onOpen(row as unknown as Student)}
  defaultItemsPerPage={25}
  itemsPerPageOptions={[25, 50, 100]}
  layout="fixed"
  density="compact"
  virtualized
  virtualizedMaxHeight={400}
  rowHeight={50}
/>
```

**El hook que alimenta la tabla** (filtros, orden y paginación los manda la tabla):

```ts
const fetchTableData = useCallback(async (params: ITDataTableFetchParams) => {
  const res = await studentApi.table({
    page: params.page, limit: params.limit, filters: params.filters, sort: params.sort,
  });
  setTotal(res.total);
  return {
    data: res.data as unknown as Record<string, unknown>[],
    total: res.total,
  };
}, []);
// …
const reload = () => setReloadKey((k) => k + 1);   // se pasa como `reloadTrigger`
```

> El doble cast (`as unknown as Column<Record<string, unknown>>[]`) es el precio de que la tabla sea
> genérica por dentro y tipada por fuera. Es el patrón que usa CYC y evita `any` sueltos.

## 5. Página de formulario con estados

`ITPage` ya resuelve `loading`/`error`/`backAction`; la página solo orquesta (53 líneas):

```tsx
<ITPage
  className="m-0! px-4! max-w-screen!"
  noPadding
  breadcrumbs={crumbs({ label: t("common:nav.students"), to: "/students" }, { label: id ? t("form.titleEdit") : t("form.titleNew") })}
  title={id ? t("form.titleEdit") : t("form.titleNew")}
  description={student ? `${student.studentNumber} · ${student.fullName}` : undefined}
  icon={<FaUserGraduate size={20} />}
  loading={loading}
  error={error}
  backAction={() => navigate(id ? `/students/${id}` : "/students")}
>
  {(!id || student) && (
    <StudentForm
      student={student}
      onCancel={() => navigate("/students")}
      onSaved={(saved, created) => {
        notify.success(created ? t("form.created") : t("form.saved"));
        navigate(`/students/${saved.id}`);
      }}
    />
  )}
</ITPage>
```

## 6. Tablero con filtros en la cabecera

Los filtros del tablero viven en `actions` de `ITPage` (no en una barra aparte) y encadenan
dependencias (al cambiar ciclo/curso se limpia el grupo):

```tsx
<ITPage
  className="m-0! px-4! max-w-screen!"
  noPadding
  title={t("home.title")}
  description={t("home.welcome", { name: user?.name ?? "" })}
  icon={<FaHouseUser size={20} />}
  actions={
    <ITFlex align="center" gap={2} wrap="wrap" className="justify-end">
      <div className="w-[168px]">
        <ITSelect
          size="sm"
          name="termId"
          label={t("reports:home.term")}
          value={filters.termId ?? ""}
          placeholder={t("reports:activeTerm")}
          options={terms.map((term) => ({ value: term.id, label: term.name }))}
          onChange={(e) => set("termId", e.target.value)}
        />
      </div>
    </ITFlex>
  }
>
  <DashboardView filters={filters} />
</ITPage>
```

## 7. Toasts globales (patrón portal + store)

`ITToast` es un componente tonto: **tú** decides dónde vive y cuándo se va. En CYC hay un provider con
portal sobre el store:

```tsx
// app/toast/useNotify.ts — la API que usan las páginas
export const useNotify = () => {
  const dispatch = useDispatch();
  const success = (message: string) => dispatch(showToast({ message, type: "success" }));
  const error = (message: string) => dispatch(showToast({ message, type: "error", duration: 4000 }));
  return { success, error };
};

// app/toast/ToastProvider.tsx — un solo toast global, encima de todo
{isVisible &&
  createPortal(
    <div className="fixed inset-0 z-[99999] pointer-events-none">
      <ITToast message={message} type={type} duration={duration} position={position}
        onClose={() => dispatch(hideToast())} />
    </div>,
    document.body
  )}
```

## 8. Reglas aprendidas (esto es lo que faltaba en la doc)

1. **Capas primero**: `@layer theme, base, axzy-ui-system, components, utilities;` + importar el CSS de la
   librería con `layer(...)`. Si la capa de la librería queda **después** de `utilities`, cualquier
   utilidad tuya que deba ganarle necesita el sufijo `!` de Tailwind v4 (`m-0! px-4! max-w-screen!`), que
   es justo lo que hace CYC en sus páginas.
2. **`ITPage` ya trae padding y max-width**: para una página a sangre usa `noPadding` y, si necesitas
   control total, `className="m-0! px-4! max-w-screen!"`.
3. **Dark mode por defecto**: escribe `it-theme-dark-mode` (`"light" | "dark" | "system"`) en
   `localStorage` antes de montar; el provider lo lee al inicializar.
4. **Los tokens se ajustan por CSS**: `:root[data-it-appearance="flat"] { --it-layout-bg: …; }` gana sobre
   lo que inyecta el provider. Para clases internas (`.it-dialog-panel`), una regla propia **fuera de
   capas** basta con el orden recomendado.
5. **i18n conviven**: la librería cae a su catálogo en español si no montas `ITI18nProvider`; la app puede
   usar `react-i18next` para lo suyo sin conflicto. Si quieres que la librería siga tu idioma, monta
   `<ITI18nProvider locale={...} messages={...}>`.
6. **Permisos en la UI**: los `actions` de `ITPage` se renderizan condicionados (`canExport && …`), y el
   menú se filtra por permiso antes de pasarlo a `ITLayout`.
7. **La tabla es genérica**: tipa tus columnas con `Column<T>` y castea al pasarlas; el `fetchData` debe
   devolver `{ data, total }`.
8. **Un solo toast global** con portal: no montes un `ITToast` por página.
