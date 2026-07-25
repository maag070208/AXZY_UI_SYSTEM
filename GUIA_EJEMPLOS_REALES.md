# AXZY UI SYSTEM — Guía de Ejemplos Reales

Esta guía muestra **ejemplos completos y listos para producción** de los componentes más usados, combinando `ITLayout`, `ITPage`, `ITPageHeader`, `ITCard`, `ITGrid`, `ITStatCard`, formularios, tablas y feedback.

Todos los ejemplos asumen imports centralizados:

```tsx
import {
  ITLayout,
  ITNavbar,
  ITPage,
  ITPageHeader,
  ITCard,
  ITButton,
  ITInput,
  ITGrid,
  ITStack,
  ITFlex,
  ITStatCard,
  ITAvatar,
  ITDataTable,
  ITEmptyState,
  ITAlert,
  ITSlideToggle,
  ITBreadcrumbs,
  ITThemeProvider,
} from "axzy-ui-system";
```

---

## 1. Shell de aplicación con `ITLayout`

AppShell que monta `ITLayout` con sidebar navegable y topbar con menú de usuario.

```tsx
import { useState } from "react";
import { FaHome, FaUsers, FaShoppingCart, FaCog, FaBell } from "react-icons/fa";
import { ITLayout } from "axzy-ui-system";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("dashboard");

  const sidebar = {
    navigationItems: [
      { id: "dashboard", label: "Dashboard", icon: <FaHome />, isActive: active === "dashboard", action: () => setActive("dashboard") },
      { id: "users", label: "Usuarios", icon: <FaUsers />, isActive: active === "users", action: () => setActive("users") },
      { id: "sales", label: "Ventas", icon: <FaShoppingCart />, isActive: active === "sales", action: () => setActive("sales"), badge: "3" },
      { id: "settings", label: "Configuración", icon: <FaCog />, isActive: active === "settings", action: () => setActive("settings") },
    ],
  };

  const topBar = {
    logoText: "AXZY Console",
    navItems: [
      { id: "home", label: "Inicio", icon: <FaHome />, action: () => setActive("dashboard") },
      { id: "alerts", label: "Alertas", icon: <FaBell />, action: () => {} },
    ],
    userMenu: {
      userName: "Asael Amaro",
      userEmail: "asael@axzy.dev",
      menuItems: [
        { label: "Mi perfil", onClick: () => {} },
        { label: "Cerrar sesión", onClick: () => {} },
      ],
    },
  };

  return (
    <ITLayout topBar={topBar} sidebar={sidebar}>
      {children}
    </ITLayout>
  );
}
```

---

## 2. Dashboard con `ITPage` + KPIs + gráfico

Página de métricas con 4 stat cards, gráfico de barras manual y lista de actividad.

```tsx
import { FaChartLine, FaUsers, FaShoppingCart, FaBoxOpen, FaCog } from "react-icons/fa";
import {
  ITPage, ITPageHeader, ITGrid, ITStatCard, ITCard, ITStack, ITFlex, ITAvatar,
} from "axzy-ui-system";

export function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard();

  return (
    <ITPage
      title="Dashboard"
      description="Resumen general del sistema en tiempo real"
      icon={<FaChartLine size={20} />}
      iconColor="#6366f1"
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Dashboard" },
      ]}
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
      actions={
        <>
          <button>Exportar</button>
          <button>Nuevo reporte</button>
        </>
      }
    >
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

      <ITGrid container spacing={3}>
        <ITGrid item xs={12} lg={8}>
          <ITCard title="Ventas de los últimos 30 días">
            <div className="h-48 flex items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50, 70, 85, 60, 90, 80, 95, 70, 85, 65, 90, 75, 88, 70, 92, 80, 96, 78, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-primary-500/60 dark:bg-primary-400/40 rounded-t-md" style={{ height: `${h}%` }} />
              ))}
            </div>
          </ITCard>
        </ITGrid>
        <ITGrid item xs={12} lg={4}>
          <ITCard title="Actividad reciente">
            <ITStack spacing={3}>
              {data?.activity.map((a) => (
                <ITFlex key={a.id} gap={3} align="center">
                  <ITAvatar initials={a.userInitials} size="sm" color={a.color} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{a.user}</p>
                    <p className="text-[10px] text-slate-400">{a.action}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{a.time}</span>
                </ITFlex>
              ))}
            </ITStack>
          </ITCard>
        </ITGrid>
      </ITGrid>
    </ITPage>
  );
}
```

---

## 3. Listado de Usuarios con búsqueda y tabla

```tsx
import { FaSearch, FaFilter, FaPlus, FaDownload, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useState, useMemo } from "react";
import {
  ITPage, ITPageHeader, ITCard, ITStack, ITFlex, ITAvatar, ITButton, ITInput,
} from "axzy-ui-system";

export function UsersListPage() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useUsers();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter(u =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  return (
    <ITPage
      title="Usuarios"
      description={`${data?.length ?? 0} usuarios registrados`}
      icon={<FaUsers size={20} />}
      iconColor="#6366f1"
      breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Usuarios" }]}
      actions={
        <>
          <ITButton label="Exportar" variant="outlined" size="small" icon={<FaDownload />} />
          <ITButton label="Nuevo usuario" size="small" icon={<FaPlus />} onClick={() => navigate("/users/new")} />
        </>
      }
      loading={isLoading}
    >
      <ITCard>
        <ITFlex gap={3} className="mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
            />
          </div>
          <ITButton label="Filtros" variant="outlined" size="small" icon={<FaFilter />} />
        </ITFlex>

        <ITStack spacing={1}>
          {filtered.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <ITAvatar initials={u.initials} size="sm" color={u.status === "active" ? "bg-emerald-500" : "bg-slate-400"} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{u.name}</p>
                <p className="text-xs text-slate-500 truncate">{u.email}</p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-primary-100 text-primary-700">
                {u.role}
              </span>
              <ITFlex gap={1}>
                <button className="p-1.5 rounded-md hover:bg-slate-100"><FaEye size={12} /></button>
                <button className="p-1.5 rounded-md hover:bg-slate-100"><FaEdit size={12} /></button>
                <button className="p-1.5 rounded-md hover:bg-slate-100 text-rose-600"><FaTrash size={12} /></button>
              </ITFlex>
            </div>
          ))}
        </ITStack>
      </ITCard>
    </ITPage>
  );
}
```

---

## 4. Detalle de Producto

```tsx
import { FaBoxOpen, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { ITPage, ITPageHeader, ITCard, ITGrid, ITStack, ITFlex, ITButton } from "axzy-ui-system";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id);

  return (
    <ITPage
      title={product?.name ?? "Cargando..."}
      description={product ? `SKU: ${product.sku} · Stock: ${product.stock} unidades` : undefined}
      icon={<FaBoxOpen size={20} />}
      iconColor="#ec4899"
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Productos", href: "/products" },
        { label: product?.name ?? "..." },
      ]}
      backAction={() => navigate("/products")}
      actions={
        <>
          <ITButton label="Eliminar" variant="outlined" size="small" icon={<FaTrash />} />
          <ITButton label="Editar" size="small" icon={<FaEdit />} onClick={() => navigate(`/products/${id}/edit`)} />
        </>
      }
      loading={isLoading}
    >
      <ITGrid container spacing={3}>
        <ITGrid item xs={12} md={5}>
          <ITCard>
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
              <FaBoxOpen className="text-6xl text-slate-400" />
            </div>
          </ITCard>
        </ITGrid>
        <ITGrid item xs={12} md={7}>
          <ITCard title="Información general">
            <ITStack spacing={4}>
              <div>
                <p className="text-xs font-bold uppercase text-slate-400 mb-1">Precio</p>
                <ITFlex align="baseline" gap={2}>
                  <span className="text-3xl font-extrabold">${product?.price}</span>
                  {product?.oldPrice && (
                    <>
                      <span className="text-sm text-slate-400 line-through">${product.oldPrice}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        -{product.discount}%
                      </span>
                    </>
                  )}
                </ITFlex>
              </div>
              <ITGrid container spacing={3}>
                <ITGrid item xs={6}>
                  <p className="text-xs font-bold uppercase text-slate-400 mb-1">Estado</p>
                  <ITFlex gap={1.5} align="center">
                    <FaCheckCircle className="text-emerald-500 text-xs" />
                    <span className="text-sm font-semibold text-emerald-600">Activo</span>
                  </ITFlex>
                </ITGrid>
                <ITGrid item xs={6}>
                  <p className="text-xs font-bold uppercase text-slate-400 mb-1">Vendidos</p>
                  <p className="text-sm font-semibold">{product?.soldCount} unidades</p>
                </ITGrid>
              </ITGrid>
            </ITStack>
          </ITCard>
        </ITGrid>
      </ITGrid>
    </ITPage>
  );
}
```

---

## 5. Formulario de edición

```tsx
import { useForm } from "react-hook-form";
import { FaEdit, FaSave } from "react-icons/fa";
import { ITPage, ITPageHeader, ITCard, ITGrid, ITStack, ITFlex, ITButton, ITAvatar } from "axzy-ui-system";

export function EditProfilePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data) => {
    await updateProfile(data);
    toast.success("Perfil actualizado");
  };

  return (
    <ITPage
      title="Editar perfil"
      description="Actualiza tu información personal"
      icon={<FaEdit size={20} />}
      iconColor="#10b981"
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Mi cuenta", href: "/account" },
        { label: "Editar perfil" },
      ]}
      backAction={() => navigate("/account")}
      actions={
        <>
          <ITButton label="Cancelar" variant="outlined" size="small" onClick={() => navigate(-1)} />
          <ITButton label="Guardar cambios" size="small" icon={<FaSave />} onClick={handleSubmit(onSubmit)} />
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ITGrid container spacing={3}>
          <ITGrid item xs={12} md={4}>
            <ITCard title="Foto de perfil">
              <div className="flex flex-col items-center gap-4">
                <ITAvatar initials="AL" size="xl" color="bg-primary-500" />
                <ITButton label="Subir imagen" variant="outlined" size="small" type="button" />
              </div>
            </ITCard>
          </ITGrid>
          <ITGrid item xs={12} md={8}>
            <ITCard title="Información personal">
              <ITGrid container spacing={3}>
                <ITGrid item xs={12} sm={6}>
                  <ITInput name="firstName" label="Nombre" {...register("firstName", { required: true })} error={errors.firstName} />
                </ITGrid>
                <ITGrid item xs={12} sm={6}>
                  <ITInput name="lastName" label="Apellido" {...register("lastName", { required: true })} error={errors.lastName} />
                </ITGrid>
                <ITGrid item xs={12}>
                  <ITInput name="email" type="email" label="Email" {...register("email", { required: true })} error={errors.email} />
                </ITGrid>
              </ITGrid>
            </ITCard>
          </ITGrid>
        </ITGrid>
      </form>
    </ITPage>
  );
}
```

---

## 6. Configuración con sidebar de secciones

```tsx
import { useState } from "react";
import { FaCog, FaBell, FaShieldAlt, FaPalette, FaLanguage, FaDollarSign } from "react-icons/fa";
import { ITPage, ITPageHeader, ITCard, ITGrid, ITStack, ITFlex, ITSlideToggle } from "axzy-ui-system";

export function SettingsPage() {
  const [section, setSection] = useState("general");
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);

  const sections = [
    { id: "general", label: "General", icon: <FaCog /> },
    { id: "notif", label: "Notificaciones", icon: <FaBell /> },
    { id: "sec", label: "Seguridad", icon: <FaShieldAlt /> },
    { id: "apariencia", label: "Apariencia", icon: <FaPalette /> },
    { id: "lang", label: "Idioma", icon: <FaLanguage /> },
    { id: "billing", label: "Facturación", icon: <FaDollarSign /> },
  ];

  return (
    <ITPage
      title="Configuración"
      description="Administra las preferencias de tu cuenta y del sistema"
      icon={<FaCog size={20} />}
      iconColor="#f59e0b"
      breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Configuración" }]}
    >
      <ITGrid container spacing={3}>
        <ITGrid item xs={12} md={4}>
          <ITCard>
            <ITStack spacing={1}>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    section === s.id
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-300"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="text-base">{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </ITStack>
          </ITCard>
        </ITGrid>
        <ITGrid item xs={12} md={8}>
          <ITCard title="Preferencias generales">
            <ITStack spacing={4}>
              <ITFlex justify="between" align="center">
                <div>
                  <p className="text-sm font-semibold">Modo oscuro automático</p>
                  <p className="text-xs text-slate-500">Sigue la configuración del sistema</p>
                </div>
                <ITSlideToggle isOn={darkMode} onToggle={setDarkMode} size="sm" />
              </ITFlex>
              <ITFlex justify="between" align="center">
                <div>
                  <p className="text-sm font-semibold">Notificaciones por email</p>
                  <p className="text-xs text-slate-500">Recibe alertas de actividad</p>
                </div>
                <ITSlideToggle isOn={emailNotif} onToggle={setEmailNotif} size="sm" />
              </ITFlex>
            </ITStack>
          </ITCard>
        </ITGrid>
      </ITGrid>
    </ITPage>
  );
}
```

---

## 7. Página con estado vacío y acción

```tsx
import { FaInbox, FaPlus } from "react-icons/fa";
import { ITPage, ITButton, ITEmptyState } from "axzy-ui-system";

export function NotificationsPage() {
  const { data } = useNotifications();

  return (
    <ITPage
      title="Notificaciones"
      description="Centro de alertas del sistema"
      empty={!data || data.length === 0}
      emptyTitle="Bandeja vacía"
      emptyDescription="Cuando recibas notificaciones aparecerán aquí."
      emptyAction={
        <ITButton label="Configurar alertas" size="small" onClick={() => navigate("/settings/notifications")} />
      }
    >
      {data?.map((n) => (
        <ITCard key={n.id} className="mb-3">
          {/* item */}
        </ITCard>
      ))}
    </ITPage>
  );
}
```

---

## 8. Página de login (sin header de página, custom layout)

```tsx
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { ITCard, ITInput, ITButton, ITStack, ITFlex, ITAlert } from "axzy-ui-system";

export function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn();
      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales inválidas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <ITCard className="w-full max-w-md">
        <form onSubmit={onSubmit}>
          <ITStack spacing={5}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-500 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">A</div>
              <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">Bienvenido</h1>
              <p className="text-sm text-slate-500">Ingresa a tu cuenta de AXZY</p>
            </div>

            {error && <ITAlert type="error" title="Error" message={error} />}

            <ITInput name="email" type="email" label="Email" iconLeft={<FaEnvelope />} required />
            <ITInput name="password" type="password" label="Contraseña" iconLeft={<FaLock />} required />

            <ITButton type="submit" label={loading ? "Ingresando..." : "Ingresar"} icon={<FaArrowRight />} fullWidth loading={loading} />
          </ITStack>
        </form>
      </ITCard>
    </div>
  );
}
```

---

## 9. Wizard / Stepper

```tsx
import { ITStepper, ITButton, ITCard, ITStack } from "axzy-ui-system";

const steps = [
  { id: "1", title: "Datos básicos", description: "Información de la cuenta" },
  { id: "2", title: "Plan", description: "Selecciona tu plan" },
  { id: "3", title: "Pago", description: "Método de facturación" },
  { id: "4", title: "Confirmación", description: "Revisa y confirma" },
];

export function OnboardingWizard() {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ITStepper steps={steps} activeStep={active} />
      <ITCard className="mt-6">
        <ITStack spacing={4}>
          {/* contenido dinámico según active */}
          <h2 className="text-xl font-bold">{steps[active].title}</h2>
          <ITFlex justify="end" gap={2}>
            <ITButton label="Atrás" variant="outlined" disabled={active === 0} onClick={() => setActive(a => a - 1)} />
            <ITButton label={active === steps.length - 1 ? "Finalizar" : "Siguiente"} onClick={() => setActive(a => a + 1)} />
          </ITFlex>
        </ITStack>
      </ITCard>
    </div>
  );
}
```

---

## 10. Tabla de datos con paginación (`ITDataTable`)

```tsx
import { useState } from "react";
import { ITDataTable, ITButton, ITInput } from "axzy-ui-system";

export function OrdersTablePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useOrders({ page, search });

  return (
    <ITCard title="Órdenes recientes">
      <ITDataTable
        loading={isLoading}
        data={data?.items ?? []}
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        columns={[
          { key: "id", label: "#", width: 60 },
          { key: "customer", label: "Cliente" },
          { key: "total", label: "Total", render: (r) => `$${r.total.toFixed(2)}` },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
          {
            key: "actions", label: "", render: (r) => (
              <ITButton label="Ver" size="small" variant="text" onClick={() => navigate(`/orders/${r.id}`)} />
            ),
          },
        ]}
        toolbar={
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg"
          />
        }
      />
    </ITCard>
  );
}
```

---

## 11. Modal de confirmación (`ITDialog` + `ITAlert`)

```tsx
import { useState } from "react";
import { ITDialog, ITButton, ITAlert, ITStack } from "axzy-ui-system";

export function DeleteUserButton({ userId, userName }: { userId: string; userName: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    await deleteUser(userId);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <ITButton label="Eliminar" variant="outlined" color="danger" onClick={() => setOpen(true)} />

      <ITDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar eliminación"
        actions={
          <ITStack direction="row" spacing={2} justify="end">
            <ITButton label="Cancelar" variant="outlined" onClick={() => setOpen(false)} />
            <ITButton label="Eliminar" color="danger" loading={loading} onClick={onConfirm} />
          </ITStack>
        }
      >
        <ITAlert
          type="warning"
          title="Esta acción no se puede deshacer"
          message={`Vas a eliminar al usuario "${userName}". Se borrarán también todos sus datos asociados.`}
        />
      </ITDialog>
    </>
  );
}
```

---

## 12. Notificaciones toast (`ITToast`)

```tsx
import { ITButton, useToast } from "axzy-ui-system";

export function SaveButton() {
  const toast = useToast();

  const onSave = async () => {
    try {
      await api.save();
      toast.success("Cambios guardados", "Tu información se actualizó correctamente");
    } catch (err) {
      toast.error("No se pudo guardar", err.message);
    }
  };

  return <ITButton label="Guardar" onClick={onSave} />;
}
```

---

## 13. Página de error 404

```tsx
import { FaExclamationTriangle } from "react-icons/fa";
import { ITEmptyState, ITButton } from "axzy-ui-system";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <ITEmptyState
        icon={<FaExclamationTriangle className="text-6xl text-amber-500" />}
        title="404 — Página no encontrada"
        description="La ruta que buscas no existe o fue movida."
        action={
          <ITButton label="Volver al inicio" onClick={() => navigate("/")} />
        }
      />
    </div>
  );
}
```

---

## 14. Tema dinámico con `ITThemeProvider`

```tsx
import { ITThemeProvider, ITButton } from "axzy-ui-system";

export function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ITThemeProvider preset={theme === "dark" ? "midnight" : "default"} mode={theme}>
      <AppShell>
        <ITButton label="Cambiar tema" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} />
      </AppShell>
    </ITThemeProvider>
  );
}
```

---

## 15. Sidebar con submenús anidados

```tsx
import { FaUsers, FaUserShield, FaUserPlus, FaUserCog } from "react-icons/fa";

const navItems = [
  {
    id: "users", label: "Usuarios", icon: <FaUsers />,
    subitems: [
      { id: "all", label: "Todos los usuarios", action: () => {} },
      { id: "roles", label: "Roles", action: () => {} },
      {
        id: "permissions", label: "Permisos", action: () => {},
      },
    ],
  },
  { id: "admins", label: "Administradores", icon: <FaUserShield /> },
];
```

---

## Resumen de patrones

| Patrón | Componentes principales |
|---|---|
| App shell | `ITThemeProvider` + `ITLayout` (topBar + sidebar) |
| Dashboard | `ITPage` + `ITPageHeader` + `ITGrid` + `ITStatCard` + `ITCard` |
| Listado | `ITPage` + `ITInput` (search) + lista custom o `ITDataTable` |
| Detalle | `ITPage` + `backAction` + `ITGrid` con info + galería |
| Formulario | `ITPage` + `ITInput` + acciones de `Guardar`/`Cancelar` |
| Configuración | `ITPage` + sidebar de secciones + `ITCard` + `ITSlideToggle` |
| Modal | `ITDialog` + `ITAlert` + acciones en `actions` |
| Feedback | `useToast()` + `ITAlert` inline |
| Estados | `ITPage` props: `loading`, `error`, `empty` |
| Tema | `ITThemeProvider` envolviendo la app |
