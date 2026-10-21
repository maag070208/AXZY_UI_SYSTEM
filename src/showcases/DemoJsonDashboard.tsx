import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaBook, FaBoxOpen, FaChartBar, FaSave, FaShoppingCart, FaTrash, FaUsers } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { AxzyLogo } from "../sandbox/AxzyLogo";
import {
  ITAlert,
  ITConfirmDialog,
  ITLineBarChart,
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
  type DataHandler,
  type EffectRegistry,
  type ITLineBarDatum,
  type ITDataTableFetchParams,
  type NavNode,
  type RoutesSchema,
  buildNavigationTree,
  flattenRoutes,
  matchRoute,
  navContainsRoute,
  type SlotComponent,
  type SlotRegistry,
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
  PEDIDOS,
  setEstadoFiltro,
  eliminarUsuario,
  obtenerUsuario,
  type DemoUsuario,
  type DemoUsuarioInput,
} from "./demoApp/demoData";

/** Páginas del dashboard, en orden de navegación. */
export const DEMO_APP_PAGES = ["inicio", "usuarios", "pedidos", "productos", "reportes", "docs", "usuario-detalle"] as const;

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
  "usuario-detalle": "sandbox.app.detail.title",
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

/** Estado del formulario de usuario. */
const ROLES = ["Admin", "Operador", "Auditor", "Soporte"];
const ESTADOS = ["Activo", "Inactivo"];
const EMPRESAS = ["CYC ERP", "Puerto Nuevo", "CheckApp", "Grupo Delta", "Nova Salud", "Ferretería Sur"];
const FORM_VACIO: DemoUsuarioInput = { nombre: "", correo: "", rol: "Operador", estado: "Activo", edad: 30, empresa: "CheckApp", turno: "09:00", alta: new Date().toISOString().slice(0, 10) };

/** `true` cuando el valor es una clave de traducción (`{ i18n }`). */
function isI18nRef(value: unknown): value is { i18n: string; params?: Record<string, SchemaValue> } {
  return Boolean(value) && typeof value === "object" && typeof (value as { i18n?: unknown }).i18n === "string";
}

/**
 * Slot del host: un bloque JSX que el JSON nombra (`{ "type": "slot", "props": { "name": "avisoInicio" } }`).
 * Los textos llegan ya traducidos por `resolveValue`.
 */
const AvisoInicio: SlotComponent = ({ titulo, mensaje }) => (
  <ITAlert variant="info" title={String(titulo ?? "")}>
    {String(mensaje ?? "")}
  </ITAlert>
);

/**
 * Slot del host para `/usuarios/:id`: busca el usuario por id y pinta sus datos.
 * El id llega ya resuelto desde `$param`; el JSON no puede elegir qué usuario mostrar más allá de la dirección.
 */
const UsuarioDetalle: SlotComponent = ({ id }) => {
  const { t } = useITTranslation();
  const usuario = obtenerUsuario(Number(id));
  if (!usuario) {
    return <ITAlert variant="warning" title={t("sandbox.app.detail.notFound")} />;
  }
  const campos: [string, unknown][] = [
    [t("sandbox.app.form.email"), usuario.correo],
    [t("sandbox.app.form.role"), usuario.rol],
    [t("sandbox.app.form.status"), usuario.estado],
    [t("sandbox.app.form.company"), usuario.empresa],
    [t("sandbox.app.form.since"), usuario.alta],
  ];
  return (
    <ITStack direction="column" spacing={3}>
      <ITText as="span" className="text-lg font-semibold">
        {String(usuario.nombre)}
      </ITText>
      {campos.map(([etiqueta, valor]) => (
        <ITFlex key={etiqueta} gap={3} align="center">
          <ITText as="span" muted className="w-28">
            {etiqueta}
          </ITText>
          <ITText as="span">{String(valor)}</ITText>
        </ITFlex>
      ))}
    </ITStack>
  );
};

/** Gráfica de ingresos y pedidos por mes, calculada sobre los pedidos del demo. */
const GraficaIngresos: SlotComponent = () => {
  const { t, formatCurrency } = useITTranslation();
  const datos = useMemo<ITLineBarDatum[]>(() => {
    const meses = new Map<string, ITLineBarDatum>();
    for (const pedido of PEDIDOS) {
      const mes = String(pedido.fecha).slice(0, 7);
      const acumulado = meses.get(mes) ?? { label: mes.slice(5), line: 0, bar: 0 };
      acumulado.line += Number(pedido.total);
      acumulado.bar += 1;
      meses.set(mes, acumulado);
    }
    return [...meses.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, dato]) => dato);
  }, []);

  return (
    <ITStack direction="column" spacing={2}>
      <ITText as="span" className="font-semibold">
        {t("sandbox.app.reportes.chartTitle")}
      </ITText>
      <ITLineBarChart
        data={datos}
        ariaLabel={t("sandbox.app.reportes.chartAria")}
        lineLabel={t("sandbox.app.reportes.chartLine")}
        barLabel={t("sandbox.app.reportes.chartBar")}
        formatValue={(valor) => formatCurrency(valor)}
        height={220}
      />
    </ITStack>
  );
};

/** Slots que registra el host para las páginas del demo. Constante: identidad estable. */
const DEMO_SLOTS: SlotRegistry = {
  avisoInicio: AvisoInicio,
  usuarioDetalle: UsuarioDetalle,
  graficaIngresos: GraficaIngresos,
};

/** Nombres de slot que registra el host. El JSON solo puede nombrar estos. */
export const DEMO_SLOT_NAMES = Object.keys(DEMO_SLOTS);

/** Acciones que el host resuelve por nombre. El JSON solo puede usar estas. */
export const DEMO_ACTIONS = ["ir-pagina", "nuevo-registro", "ver-usuario", "editar-usuario", "exportar-reporte", "enviar-contacto"] as const;

/** Props del dashboard. */
export interface DemoJsonDashboardProps {
  /** Dirección dentro del dashboard (`/usuarios`). La casa `routes.json`. */
  path: string;
  /** Query de la dirección (`{ estado: "Activo" }`). */
  query: Record<string, string>;
  /** Navega a una dirección del árbol de navegación (`/usuarios?estado=Activo`). */
  onNavigate: (href: string) => void;
  /** Vuelve al portafolio de demostración. */
  onExit: () => void;
  /** Escribe el filtro de estado en la URL. */
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
 * 4. Registra los handlers de datos; el motor resuelve `{ $source }` contra `data`.
 * 5. Resuelve acciones por nombre (`ir-pagina`, `nuevo-registro`, `ver-usuario`, `editar-usuario`).
 * 6. Guarda: el formulario es del host, porque escribir es autoridad del host.
 *
 * @example
 * // Ruta: #demo/app/usuarios?estado=Activo
 * <DemoJsonDashboard path="/usuarios" query={{ estado: "Activo" }} onNavigate={go} onExit={goToDemo} />
 */
export const DemoJsonDashboard: React.FC<DemoJsonDashboardProps> = ({ path, query, onNavigate, onExit, onFilterChange }) => {
  const { t } = useITTranslation();

  /** Rutas declaradas en JSON: de ellas salen el menú y la página de cada dirección. */
  const [rutas, setRutas] = useState<RoutesSchema | null>(null);
  useEffect(() => {
    fetch("/demo/app/routes.json")
      .then((respuesta) => respuesta.json() as Promise<RoutesSchema>)
      .then(setRutas)
      .catch(() => setRutas(null));
  }, []);
  const planas = useMemo(() => (rutas ? flattenRoutes(rutas.routes) : []), [rutas]);
  const arbol = useMemo(() => (rutas ? buildNavigationTree(rutas.routes) : []), [rutas]);
  const coincidencia = useMemo(() => matchRoute(planas, path.split("/").filter(Boolean), query), [planas, path, query]);
  /** Parámetros de la dirección (`:id`), que el motor expone como `$param`. */
  const parametros = useMemo(() => coincidencia?.params ?? {}, [coincidencia]);
  /** Id de la ruta activa. Una dirección que no casa muestra el inicio. */
  const rutaActiva = coincidencia?.route.id ?? "inicio";
  const pagina: DemoAppPage = DEMO_APP_PAGES.includes(coincidencia?.route.page as DemoAppPage)
    ? (coincidencia!.route.page as DemoAppPage)
    : "inicio";
  /** Filtro de estado: lo marca la query de la dirección. */
  const filterEstado = query.estado ?? "Todos";

  /** Etiqueta de una entrada: `{ i18n }` se traduce, el texto literal pasa tal cual. */
  const etiqueta = (valor: unknown) => (isI18nRef(valor) ? t(valor.i18n) : String(valor));
  /** Entrada del sidebar a partir del árbol. Solo el primer nivel lleva icono. */
  const aItemSidebar = (entrada: NavNode, primerNivel: boolean) => ({
    id: entrada.id,
    label: etiqueta(entrada.label),
    icon: primerNivel ? ICONOS[entrada.icon ?? "box"] : undefined,
    isActive: navContainsRoute(entrada, rutaActiva),
    badge: entrada.badge,
    action: () => onNavigate(entrada.href ?? "/inicio"),
    subitems: entrada.children?.map((hijo) => aItemSidebar(hijo, false)),
  });
  const [esquema, setEsquema] = useState<ScreenSchema | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avisos, setAvisos] = useState<JsonEngineIssue[]>([]);

  // CRUD: el esquema pide; el host escribe.
  const [formulario, setFormulario] = useState<DemoUsuarioInput | null>(null);
  // El sidebar se colapsa solo en pantallas estrechas y se puede alternar.
  // El sidebar empieza colapsado (solo logo) y se abre al pasar el cursor.
  const [colapsado, setColapsado] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>(filterEstado);
  // La URL manda: si cambia el `?estado=`, la tabla se ajusta.
  useEffect(() => {
    setFiltroEstado(filterEstado);
  }, [filterEstado]);
  const [aviso, setAviso] = useState<{ mensaje: string; tipo: "success" | "danger" } | null>(null);
  // Diálogo de confirmación que abre la acción `exportar-reporte` del JSON.
  const [exportando, setExportando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [version, setVersion] = useState(0);


  /** Muestra un aviso y lo retira solo. */
  const toast = useCallback((mensaje: string, tipo: "success" | "danger" = "success") => {
    setAviso({ mensaje, tipo });
    window.setTimeout(() => setAviso(null), 3000);
  }, []);
  // Efectos que cumple el host cuando una acción del JSON lo pide (`then`, `toast`, `navigate`).
  const efectosDemo = useMemo<EffectRegistry>(
    () => ({
      toast: ({ variant, message }) => toast(message, variant === "error" || variant === "warning" ? "danger" : "success"),
      navigate: (href) => onNavigate(href),
    }),
    [toast, onNavigate]
  );
  const url = `/demo/app/${pagina}.json`;


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
    setVersion((n) => n + 1);
  }, [filtroEstado, pagina]);

  /** Handlers estables: el motor los referencia por nombre desde `data` del esquema. */
  const dataHandlers = useMemo<Record<string, DataHandler>>(() => {
    const usuarios = createDemoFetcher("usuarios");
    const pedidos = createDemoFetcher("pedidos");
    const productos = createDemoFetcher("productos");
    return {
      usuarios: (query) => usuarios(query as ITDataTableFetchParams),
      pedidos: (query) => pedidos(query as ITDataTableFetchParams),
      productos: (query) => productos(query as ITDataTableFetchParams),
    };
  }, []);

  /** 3. Textos. Las fuentes de datos (`$source`) las resuelve el motor. */
  const resolveValue = useCallback(
    (value: unknown): unknown => {
      if (isI18nRef(value)) {
        const params = value.params
          ? Object.fromEntries(Object.entries(value.params).map(([clave, dato]) => [clave, String(dato)]))
          : undefined;
        return t(value.i18n, params);
      }
      return value;
    },
    [t]
  );

  /** 5. Acciones por nombre. La navegación y la escritura son del host. */
  const resolveAction = useCallback(
    (node: NodeSchema, _prop: string, action: unknown) => {
      const declarada = action as { action?: string; args?: Record<string, SchemaValue> } | undefined;
      const nombre = declarada?.action;
      // Solo las acciones de DEMO_ACTIONS existen: lo demás avisa con JR040 en lugar de no hacer nada.
      if (!nombre || !(DEMO_ACTIONS as readonly string[]).includes(nombre)) return undefined;

      return (...args: unknown[]) => {
        switch (nombre) {
          case "ir-pagina": {
            const destino = String(declarada?.args?.pagina ?? "");
            if (DEMO_APP_PAGES.includes(destino as DemoAppPage)) onNavigate(`/${destino}`);
            return;
          }
          case "exportar-reporte":
            setExportando(true);
            return;
          case "enviar-contacto":
            // Los campos ya los validó el motor, y el aviso de éxito lo declara el JSON (`then`).
            return;
          case "nuevo-registro":
            abrirFormulario();
            return;
          case "ver-usuario": {
            // La tabla pasa la fila como primer argumento: su detalle vive en la dirección /usuarios/:id.
            const fila = args[0] as DemoUsuario | undefined;
            if (fila && typeof fila.id === "number") onNavigate(`/usuarios/${fila.id}`);
            return;
          }
          case "editar-usuario": {
            // Desde la tabla llega la fila; desde el detalle, el id de la dirección.
            const fila = args[0] as DemoUsuario | undefined;
            const id = fila && typeof fila.id === "number" ? fila.id : Number(parametros.id);
            const usuario = Number.isFinite(id) ? obtenerUsuario(id) : undefined;
            if (usuario) abrirFormulario(usuario);
            return;
          }
          default:
            return;
        }
      };
    },
    [onNavigate, abrirFormulario, pagina, onFilterChange, parametros, toast, t]
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
        params={parametros}
        dataHandlers={dataHandlers}
        slots={DEMO_SLOTS}
        effects={efectosDemo}
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
          children: (
            <ITButton label={t("sandbox.app.exit")} size="sm" variant="outlined" color="gray" onClick={onExit} />
          ),
        }}
        sidebar={{
          isCollapsed: colapsado,
          expandOnHover: true,
          onToggleCollapse: () => setColapsado((previo) => !previo),
          // Los sub-items son rutas con `query`: navegar a ellas filtra de verdad.
          navigationItems: arbol.map((entrada) => aItemSidebar(entrada, true)),
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
            {(pagina === "usuarios" || pagina === "pedidos") && (
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

      <ITConfirmDialog
        isOpen={exportando}
        onClose={() => setExportando(false)}
        onConfirm={() => {
          setExportando(false);
          toast(t("sandbox.app.export.done"));
        }}
        title={t("sandbox.app.export.title")}
        message={t("sandbox.app.export.message")}
        confirmLabel={t("sandbox.app.export.confirm")}
        cancelLabel={t("sandbox.app.form.cancel")}
      />

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
