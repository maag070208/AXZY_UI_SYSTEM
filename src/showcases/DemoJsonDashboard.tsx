import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaBook, FaBoxOpen, FaChartBar, FaSave, FaShoppingCart, FaTrash, FaUsers } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { AxzyLogo } from "../sandbox/AxzyLogo";
import {
  ITAlert,
  ITButton,
  ITDialog,
  ITFlex,
  ITGrid,
  ITInput,
  ITLayout,
  ITLoader,
  ITPage,
  ITSchemaRenderer,
  ITStack,
  ITText,
  ITToast,
  ITTripleFilter,
  ITDropfile,
  ITDatePicker,
  ITTimePicker,
  ITSelect,
  ITSearchSelect,
  ITInputNumber,
  parsePartialSchema,
  useITTranslation,
  validateSchema,
  type JsonEngineIssue,
  type NodeSchema,
  type SchemaValue,
  type ScreenSchema,
} from "../index";
import { DemoJsonDocs } from "./DemoJsonDocs";
import {
  actualizarUsuario,
  crearUsuario,
  createDemoFetcher,
  setEstadoFiltro,
  eliminarUsuario,
  isDemoSource,
  obtenerUsuario,
  type DemoUsuario,
  type DemoUsuarioInput,
} from "./demoApp/demoData";

/** Páginas del dashboard, en orden de navegación. */
export const DEMO_APP_PAGES = ["inicio", "usuarios", "pedidos", "productos", "reportes", "docs"] as const;

/** Nombre de una página del dashboard. */
export type DemoAppPage = (typeof DEMO_APP_PAGES)[number];

/** Clave de i18n del rótulo de cada página. */
const PAGE_LABEL: Record<DemoAppPage, string> = {
  inicio: "sandbox.app.nav.inicio",
  usuarios: "sandbox.app.nav.usuarios",
  pedidos: "sandbox.app.nav.pedidos",
  productos: "sandbox.app.nav.productos",
  reportes: "sandbox.app.nav.reportes",
  docs: "sandbox.app.nav.docs",
};

/** Registro de iconos: el JSON nombra, el host decide qué componente es. */
const ICONOS: Record<string, React.ReactNode> = {
  home: <FiHome size={14} />,
  users: <FaUsers size={13} />,
  cart: <FaShoppingCart size={13} />,
  box: <FaBoxOpen size={13} />,
  chart: <FaChartBar size={13} />,
  book: <FaBook size={12} />,
};

/** Módulo del sidebar tal como lo declara `layout.json`. */
interface LayoutModule {
  id: string;
  label: string | { i18n: string };
  icon?: string;
  page: string;
  badge?: number | string;
  subitems?: { id: string; label: string | { i18n: string }; page: string; query?: Record<string, string> }[];
}

/** Shell declarado en JSON. */
interface LayoutFile {
  layout: { brand?: { logo?: string; text?: string }; topBarNav?: string[]; modules: LayoutModule[] };
}

/** Estado del formulario de usuario. */
const ROLES = ["Admin", "Operador", "Auditor", "Soporte"];
const ESTADOS = ["Activo", "Inactivo"];
const EMPRESAS = ["CYC ERP", "Puerto Nuevo", "CheckApp", "Grupo Delta", "Nova Salud", "Ferretería Sur"];
const FORM_VACIO: DemoUsuarioInput = { nombre: "", correo: "", rol: "Operador", estado: "Activo", edad: 30, empresa: "CheckApp", turno: "09:00", alta: new Date().toISOString().slice(0, 10) };

/** `true` cuando el valor es una referencia de fuente (`{ $source }`). */
function isSourceRef(value: unknown): value is { $source: string } {
  return Boolean(value) && typeof value === "object" && typeof (value as { $source?: unknown }).$source === "string";
}

/** `true` cuando el valor es una clave de traducción (`{ i18n }`). */
function isI18nRef(value: unknown): value is { i18n: string; params?: Record<string, SchemaValue> } {
  return Boolean(value) && typeof value === "object" && typeof (value as { i18n?: unknown }).i18n === "string";
}

/** Props del dashboard. */
export interface DemoJsonDashboardProps {
  /** Página activa. */
  page: DemoAppPage;
  /** Navega a otra página del dashboard. */
  onNavigate: (page: DemoAppPage) => void;
  /** Vuelve al portafolio de demostración. */
  onExit: () => void;
  /** Filtro de estado leído de la URL (`?estado=`). */
  filterEstado: string;
  /** Escribe el filtro en la URL. */
  onFilterChange: (estado: string) => void;
}

/**
 * Sistema de demostración: `ITLayout` + `ITPage` como shell, páginas en JSON y
 * un CRUD real sobre `ITDataTable`.
 *
 * El host hace seis cosas:
 * 1. Carga el JSON de la página (`/demo/app/<página>.json`).
 * 2. Lo valida y muestra el veredicto.
 * 3. Resuelve textos (`{ i18n }`).
 * 4. Resuelve fuentes de datos (`{ $source }` → `fetchData`).
 * 5. Resuelve acciones por nombre (`ir-pagina`, `nuevo-registro`, `editar-usuario`).
 * 6. Guarda: el formulario es del host, porque escribir es autoridad del host.
 *
 * @example
 * // Ruta: #demo/app/usuarios
 * <DemoJsonDashboard page="usuarios" onNavigate={setPage} onExit={goToDemo} />
 */
export const DemoJsonDashboard: React.FC<DemoJsonDashboardProps> = ({ page, onNavigate, onExit, filterEstado, onFilterChange }) => {
  const { t } = useITTranslation();
  const [esquema, setEsquema] = useState<ScreenSchema | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avisos, setAvisos] = useState<JsonEngineIssue[]>([]);

  // CRUD: el esquema pide; el host escribe.
  const [formulario, setFormulario] = useState<DemoUsuarioInput | null>(null);
  // El sidebar se colapsa solo en pantallas estrechas y se puede alternar.
  const [colapsado, setColapsado] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<string>(filterEstado);
  // La URL manda: si cambia el `?estado=`, la tabla se ajusta.
  useEffect(() => {
    setFiltroEstado(filterEstado);
  }, [filterEstado]);
  const [shell, setShell] = useState<LayoutFile["layout"] | null>(null);
  const [aviso, setAviso] = useState<{ mensaje: string; tipo: "success" | "danger" } | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [version, setVersion] = useState(0);

  const pagina: DemoAppPage = DEMO_APP_PAGES.includes(page) ? page : "inicio";

  /** Auto-colapso: en cuanto el ancho baja de 1100px, el rail pasa a iconos. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 1100px)");
    const aplicar = () => setColapsado(media.matches);
    aplicar();
    media.addEventListener("change", aplicar);
    return () => media.removeEventListener("change", aplicar);
  }, []);

  /** Muestra un aviso y lo retira solo. */
  const toast = useCallback((mensaje: string, tipo: "success" | "danger" = "success") => {
    setAviso({ mensaje, tipo });
    window.setTimeout(() => setAviso(null), 3000);
  }, []);
  const url = `/demo/app/${pagina}.json`;

  /** 0. El shell también es JSON: se carga una vez. */
  useEffect(() => {
    fetch("/demo/app/layout.json")
      .then((r) => r.json() as Promise<LayoutFile>)
      .then((archivo) => setShell(archivo.layout))
      .catch(() => setShell(null));
  }, []);

  /** 1. Carga del JSON de la página. */
  useEffect(() => {
    let cancelado = false;
    setEsquema(null);
    setError(null);
    setAvisos([]);

    fetch(url)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        return respuesta.text();
      })
      .then((texto) => {
        if (!cancelado) setEsquema(parsePartialSchema(texto).tree);
      })
      .catch((fallo: unknown) => {
        if (!cancelado) setError(fallo instanceof Error ? fallo.message : String(fallo));
      });

    return () => {
      cancelado = true;
    };
  }, [url]);

  const informe = useMemo(() => (esquema ? validateSchema(esquema) : null), [esquema]);

  /** Abre el formulario de usuario (alta o edición). */
  const abrirFormulario = useCallback((usuario?: DemoUsuario) => {
    if (usuario) {
      setEditandoId(usuario.id);
      setFormulario({ nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol, estado: usuario.estado, edad: usuario.edad, empresa: usuario.empresa, turno: usuario.turno, alta: usuario.alta });
    } else {
      setEditandoId(null);
      setFormulario({ ...FORM_VACIO });
    }
  }, []);

  /** `ITInput` entrega el evento: se normaliza a string antes de guardarlo. */
  const setCampo = useCallback(
    (campo: keyof DemoUsuarioInput) => (evento: unknown) => {
      const valor =
        typeof evento === "string"
          ? evento
          : ((evento as { target?: { value?: string } } | null)?.target?.value ?? "");
      setFormulario((previo) => (previo ? { ...previo, [campo]: valor } : previo));
    },
    []
  );

  const cerrarFormulario = useCallback(() => {
    setFormulario(null);
    setEditandoId(null);
  }, []);

  /** Guarda el formulario y remonta el esquema para refrescar la tabla. */
  const guardar = useCallback(() => {
    if (!formulario || !formulario.nombre.trim() || !formulario.correo.trim()) return;
    if (editandoId === null) crearUsuario(formulario);
    else actualizarUsuario(editandoId, formulario);
    cerrarFormulario();
    setVersion((n) => n + 1);
    toast(t("sandbox.app.toast.saved"));
  }, [formulario, editandoId, cerrarFormulario, t, toast]);

  const borrar = useCallback(() => {
    if (editandoId === null) return;
    eliminarUsuario(editandoId);
    cerrarFormulario();
    setVersion((n) => n + 1);
    toast(t("sandbox.app.toast.deleted"), "danger");
  }, [editandoId, cerrarFormulario, t, toast]);

  /** El filtro triple se aplica en el fetcher y se remonta la tabla. */
  useEffect(() => {
    setEstadoFiltro(pagina === "docs" ? null : filtroEstado);
  }, [filtroEstado, pagina]);

  /** Fetchers estables: uno por fuente, no uno por render. */
  const fetchers = useMemo(
    () => ({
      usuarios: createDemoFetcher("usuarios"),
      pedidos: createDemoFetcher("pedidos"),
      productos: createDemoFetcher("productos"),
    }),
    []
  );

  /** 3 y 4. Textos y fuentes de datos. */
  const resolveValue = useCallback(
    (value: unknown): unknown => {
      if (isSourceRef(value)) {
        return isDemoSource(value.$source) ? fetchers[value.$source] : () => Promise.resolve({ data: [], total: 0 });
      }
      if (isI18nRef(value)) {
        const params = value.params
          ? Object.fromEntries(Object.entries(value.params).map(([clave, dato]) => [clave, String(dato)]))
          : undefined;
        return t(value.i18n, params);
      }
      return value;
    },
    [t, fetchers]
  );

  /** 5. Acciones por nombre. La navegación y la escritura son del host. */
  const resolveAction = useCallback(
    (node: NodeSchema, _prop: string, action: unknown) => {
      const declarada = action as { action?: string; args?: Record<string, SchemaValue> } | undefined;
      const nombre = declarada?.action;
      if (!nombre) return undefined;

      return (...args: unknown[]) => {
        switch (nombre) {
          case "ir-pagina": {
            const destino = String(declarada?.args?.pagina ?? "");
            if (DEMO_APP_PAGES.includes(destino as DemoAppPage)) onNavigate(destino as DemoAppPage);
            return;
          }
          case "nuevo-registro":
            abrirFormulario();
            return;
          case "editar-usuario": {
            // La tabla pasa la fila como primer argumento.
            const fila = args[0] as DemoUsuario | undefined;
            const usuario = fila && typeof fila.id === "number" ? obtenerUsuario(fila.id) : undefined;
            if (usuario) abrirFormulario(usuario);
            return;
          }
          default:
            return;
        }
      };
    },
    [onNavigate, abrirFormulario, pagina, onFilterChange]
  );

  const cuerpo = error ? (
    <ITAlert variant="error" title={t("sandbox.app.loadError")}>
      {`${url}: ${error}`}
    </ITAlert>
  ) : !esquema ? (
    <ITFlex align="center" justify="center" gap={3} className="min-h-[320px]">
      <ITLoader variant="spinner" size="md" color="primary" />
      <ITText as="span" muted>
        {t("sandbox.app.loading")}
      </ITText>
    </ITFlex>
  ) : (
    <ITStack direction="column" spacing={5}>
      <ITFlex align="center" justify="between" wrap="wrap" gap={2}>
        <ITText as="span" muted className="font-mono !text-[10px] uppercase !tracking-[0.12em]">
          {`${url} · ${informe?.verdict ?? "?"} · ${informe?.warnings.length ?? 0} avisos`}
        </ITText>
      </ITFlex>
      {[...(informe?.errors ?? []), ...(informe?.warnings ?? []), ...avisos].slice(0, 4).map((aviso, indice) => (
        <ITText key={`${aviso.code}-${indice}`} as="span" className="font-mono !text-[10px] text-amber-700 dark:text-amber-400">
          {`${aviso.code} ${aviso.path}: ${aviso.message}`}
        </ITText>
      ))}
      <ITSchemaRenderer
        key={version}
        schema={esquema}
        resolveValue={resolveValue}
        resolveAction={resolveAction}
        onIssue={(aviso) =>
          setAvisos((previos) =>
            previos.some((item) => item.code === aviso.code && item.path === aviso.path) ? previos : [...previos, aviso]
          )
        }
      />
    </ITStack>
  );

  return (
    <>
      <ITLayout
        topBar={{
          logo: <AxzyLogo variante="icono" tamano={20} />,
          logoText: shell?.brand?.text ?? "AXZY · demo",
          navItems: DEMO_APP_PAGES.map((item) => ({
            id: item,
            label: t(PAGE_LABEL[item]),
            isActive: item === pagina,
            action: () => onNavigate(item),
          })),
          children: (
            <ITButton label={t("sandbox.app.exit")} size="sm" variant="outlined" color="gray" onClick={onExit} />
          ),
        }}
        sidebar={{
          isCollapsed: colapsado,
          onToggleCollapse: () => setColapsado((previo) => !previo),
          brand: {
            logo: <AxzyLogo variante="icono" tamano={20} />,
            text: shell?.brand?.text ?? "AXZY · demo",
          },
          navigationItems: (shell?.modules ?? []).map((modulo) => ({
            id: modulo.id,
            label: isI18nRef(modulo.label) ? t(modulo.label.i18n) : String(modulo.label),
            icon: ICONOS[modulo.icon ?? "box"],
            isActive: modulo.page === pagina,
            badge: modulo.badge,
            action: () => onNavigate(modulo.page as DemoAppPage),
            // Los sub-items llevan `query`: filtran de verdad, no son decoración.
            subitems: modulo.subitems?.map((sub) => ({
              id: sub.id,
              label: isI18nRef(sub.label) ? t(sub.label.i18n) : String(sub.label),
              action: () => {
                if (sub.page !== pagina) onNavigate(sub.page as DemoAppPage);
                onFilterChange(sub.query?.estado ?? "Todos");
                setVersion((n) => n + 1);
              },
            })),
          })),
        }}
      >
        <ITPage
          title={esquema && isI18nRef(esquema.title) ? t(esquema.title.i18n) : t(PAGE_LABEL[pagina])}
          description={esquema && isI18nRef(esquema.description) ? t(esquema.description.i18n) : undefined}
          breadcrumbs={[
            { label: t("sandbox.app.title"), href: "#demo/app/inicio" },
            { label: t(PAGE_LABEL[pagina]) },
          ]}
        >
          <ITStack direction="column" spacing={4}>
            {pagina !== "docs" && (
            <ITTripleFilter
              value={filtroEstado}
              onChange={(valor) => {
                onFilterChange(valor);
                setVersion((n) => n + 1);
              }}
              options={[
                { label: t("sandbox.app.sub.todos"), value: "Todos" },
                { label: t("sandbox.app.sub.activos"), value: "Activo" },
                { label: t("sandbox.app.sub.inactivos"), value: "Inactivo" },
              ]}
            />
            )}
            {pagina === "docs" ? <DemoJsonDocs /> : cuerpo}
          </ITStack>
        </ITPage>
      </ITLayout>

      <ITDialog
        isOpen={formulario !== null}
        onClose={cerrarFormulario}
        title={editandoId === null ? t("sandbox.app.form.create") : t("sandbox.app.form.edit")}
      >
        {formulario && (
          <div className="w-full max-w-[620px]">
            <ITGrid container columns={12} spacing={3}>
              {/* Avatar: compacto, en su propia celda. */}
              <ITGrid item xs={12} md={4}>
                <ITDropfile
                  onFileSelect={() => undefined}
                  acceptedFileTypes={["image/png", "image/jpeg"] as never}
                />
              </ITGrid>
              <ITGrid item xs={12} md={8}>
                <ITStack direction="column" spacing={3}>
                  <ITInput name="nombre" label={t("sandbox.app.form.name")} value={formulario.nombre} onChange={setCampo("nombre")} />
                  <ITInput name="correo" label={t("sandbox.app.form.email")} value={formulario.correo} onChange={setCampo("correo")} />
                  <ITFlex gap={3}>
                    <ITInputNumber name="edad" label={t("sandbox.app.form.age")} value={formulario.edad} decimals={0} onChange={(valor) => setFormulario({ ...formulario, edad: valor ?? 0 })} />
                    <ITSelect name="rol" label={t("sandbox.app.form.role")} value={formulario.rol} options={ROLES.map((rol) => ({ value: rol, label: rol }))} onChange={(evento) => setFormulario({ ...formulario, rol: evento.target.value })} />
                  </ITFlex>
                </ITStack>
              </ITGrid>
              <ITGrid item xs={12} md={6}>
                <ITSelect name="estado" label={t("sandbox.app.form.status")} value={formulario.estado} options={ESTADOS.map((estado) => ({ value: estado, label: estado }))} onChange={(evento) => setFormulario({ ...formulario, estado: evento.target.value })} />
              </ITGrid>
              <ITGrid item xs={12} md={6}>
                <ITSearchSelect label={t("sandbox.app.form.company")} value={formulario.empresa} options={EMPRESAS.map((empresa) => ({ value: empresa, label: empresa }))} valueField="value" labelField="label" onChange={(valor) => setFormulario({ ...formulario, empresa: String(valor) })} />
              </ITGrid>
              <ITGrid item xs={12} md={6}>
                <ITDatePicker name="alta" label={t("sandbox.app.form.since")} value={new Date(formulario.alta)} onChange={(fecha) => { const valor = Array.isArray(fecha) ? fecha[0] : fecha; setFormulario({ ...formulario, alta: valor ? valor.toISOString().slice(0, 10) : formulario.alta }); }} />
              </ITGrid>
              <ITGrid item xs={12} md={6}>
                <ITTimePicker name="turno" label={t("sandbox.app.form.shift")} value={formulario.turno} onChange={(evento) => setFormulario({ ...formulario, turno: String(evento?.target?.value ?? formulario.turno) })} />
              </ITGrid>
            </ITGrid>
            <ITFlex justify="between" wrap="wrap" gap={2} className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
              {editandoId !== null ? (
                <ITButton label={t("sandbox.app.form.delete")} icon={<FaTrash size={10} />} size="sm" variant="outlined" color="danger" onClick={borrar} />
              ) : (<span />)}
              <ITFlex gap={2}>
                <ITButton label={t("sandbox.app.form.cancel")} size="sm" variant="text" color="gray" onClick={cerrarFormulario} />
                <ITButton label={t("sandbox.app.form.save")} icon={<FaSave size={10} />} size="sm" disabled={!formulario.nombre.trim() || !formulario.correo.trim()} onClick={guardar} />
              </ITFlex>
            </ITFlex>
          </div>
        )}
      </ITDialog>

      {aviso && (
        <ITToast
          message={aviso.mensaje}
          type={aviso.tipo}
          position="bottom-right"
          duration={3000}
          onClose={() => setAviso(null)}
        />
      )}
    </>
  );
};

export default DemoJsonDashboard;
