import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FieldConfigV2,
  ITFormBuilder,
  ITButton,
  ITCard,
  ITLayout,
  ITThemeProvider,
  ITBadget,
  ITTable,
  ITDialog,
} from "./index";
import {
  FaUser,
  FaEnvelope,
  FaSearch,
  FaLock,
  FaCalculator,
  FaCommentDots,
  FaHome,
  FaChartBar,
  FaCog,
  FaBell,
} from "react-icons/fa";
import "./index.css";

function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formConfig: FieldConfigV2[] = [
    // --- ICONOS E INPUT BÁSICO ---
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      required: true,
      placeholder: "••••••••",
      leftIcon: <FaLock className="text-gray-400" />,
      column: { sm: 12, md: 6 },
    },
    {
      name: "username",
      label: "Usuario (Icono Izquierdo Fijo)",
      type: "text",
      placeholder: "Ej. dev123",
      required: true,
      leftIcon: <FaUser className="text-gray-400" />,
      column: { sm: 12, md: 6 },
    },
    {
      name: "promoCode",
      label: "Código Promo (Icono Derecho Click)",
      type: "text",
      placeholder: "Ingresa código...",
      rightIcon: (
        <button
          type="button"
          onClick={() => alert("¡Disparando búsqueda de código promocional!")}
          className="text-primary-600 hover:text-primary-800 transition px-2"
        >
          <FaSearch />
        </button>
      ),
      column: { sm: 12, md: 6 },
    },

    // --- CORREO Y PASSWORD (Password tiene su propio toggle de ojo) ---
    {
      name: "email",
      label: "Correo (Validación estricta YUP)",
      type: "email",
      placeholder: "ejemplo@correo.com",
      required: true,
      leftIcon: <FaEnvelope className="text-gray-400" />,
      column: { sm: 12, md: 6 },
    },

    // --- EVENTOS AL ESCRIBIR & ESTADOS BLOQUEADOS ---
    {
      name: "subtotal",
      label: "Subtotal (Dispara OnChange)",
      type: "number",
      required: true,
      currencyFormat: true,
      leftIcon: <FaCalculator className="text-gray-400" />,
      column: { sm: 12, md: 4 },
      onChangeAction: (val, { setFieldValue }) => {
        const num = parseFloat(val) || 0;
        setFieldValue("iva", (num * 0.16).toFixed(2));
        setFieldValue("total", (num * 1.16).toFixed(2));
      },
    },
    {
      name: "iva",
      label: "IVA (Read-Only)",
      type: "number",
      currencyFormat: true,
      readOnly: true, // Bloqueado, pero con color de texto normal y se envía
      column: { sm: 12, md: 4 },
    },
    {
      name: "total",
      label: "Total (Disabled)",
      type: "number",
      currencyFormat: true,
      disabled: true, // Completamente bloqueado e ignora focus, con estilo gris
      column: { sm: 12, md: 4 },
    },

    // --- DEPENDENCIA DINÁMICA DE RENDERIZADO ---
    {
      name: "country",
      label: "País (Muestra RFC si es MX)",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Selecciona país..." },
        { value: "MX", label: "México" },
        { value: "US", label: "Estados Unidos" },
        { value: "OTHER", label: "Otro" },
      ],
      column: { sm: 12, md: 6 },
    },
    {
      name: "rfc",
      label: "RFC de México (Renderización Condicional)",
      type: "text",
      dependsOn: ["country"], // Escucha cambios en 'country'
      renderWhen: (vals) => vals.country === "MX", // Sólo insertarlo en el DOM si es MX
      required: true,
      showHintLength: true,
      maxLength: 13,
      column: { sm: 12, md: 6 },
    },

    // --- COMPONENTES EXPERTOS ---
    {
      name: "date",
      label: "Selector de Fecha",
      type: "date",
      required: true,
      column: { sm: 12, md: 4 },
    },
    {
      name: "time",
      label: "Selector de Hora",
      type: "time" as any,
      required: true,
      column: { sm: 12, md: 4 },
    },
    {
      name: "comments",
      label: "Comentarios (Textarea + Límite)",
      type: "textarea" as any, // Cast para forzar a FormBuilder enviarle esto al Input
      rows: 3,
      showHintLength: true,
      maxLength: 200,
      leftIcon: <FaCommentDots className="text-gray-400" />,
      column: { sm: 12, md: 4 },
    },
  ];

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es requerido"),
    promoCode: Yup.string(),
    email: Yup.string()
      .email("Formato de correo inválido")
      .required("El correo es requerido"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .required("La contraseña es requerida"),
    subtotal: Yup.number()
      .typeError("Debe ser un número")
      .required("Requerido")
      .min(1, "Mayor a 0"),
    country: Yup.string().required("Selecciona un país"),
    rfc: Yup.string().when("country", {
      is: "MX",
      then: (schema) =>
        schema
          .length(13, "Debe tener 13 caracteres exactos")
          .required("El RFC es obligatorio para MX"),
      otherwise: (schema) => schema.notRequired(),
    }),
    date: Yup.date().required("Fecha requerida"),
    time: Yup.string().required("Hora requerida"),
    comments: Yup.string().max(200, "Máximo 200 caracteres"),
  });

  const sidebarProps = {
    navigationItems: [
      {
        id: "home",
        label: "Dashboard",
        icon: <FaHome />,
        isActive: activeNav === "home",
        action: () => setActiveNav("home"),
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <FaChartBar />,
        isActive: activeNav === "analytics",
        action: () => setActiveNav("analytics"),
        badge: "New",
      },
      {
        id: "settings",
        label: "Settings",
        icon: <FaCog />,
        isActive: activeNav === "settings",
        subitems: [
          {
            id: "profile",
            label: "Profile",
            action: () => setActiveNav("settings"),
          },
          {
            id: "billing",
            label: "Billing",
            action: () => setActiveNav("settings"),
          },
        ],
      },
    ],
  };

  const topBarProps = {
    logoText: "AXZY Admin Platform",
    userMenu: {
      userName: "Admin User",
      userEmail: "admin@axzy.dev",
      userImage: "https://i.pravatar.cc/150",
      menuItems: [
        { label: "Profile", onClick: () => alert("Profile Clicked") },
        { label: "Logout", onClick: () => alert("Logout Clicked") },
      ],
    },
    userProfile: {
      name: "Admin User",
      role: "Super Admin",
      avatarUrl: "https://i.pravatar.cc/150",
      actions: [
        { label: "Profile", onClick: () => {} },
        { label: "Logout", onClick: () => {} },
      ],
    },
    navItems: [
      {
        id: "notifications",
        label: "Notificaciones",
        icon: <FaBell />,
        action: () => alert("Notificaciones"),
      },
    ],
  };

  // Fake custom brand theme injected by consumer
  const customTheme = {
    colors: {
      primary: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444", // Red 500
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a",
      },
      secondary: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280", // Gray 500
        600: "#525b6b",
        700: "#404a59",
        800: "#262f3d",
        900: "#1e293b",
        950: "#0f172a",
      },
    },
  };


  const data = [
  {
    "id": 1,
    "username": "admin",
    "password": "$2a$10$EHcagMcHk7QY3h/DGPBDv.l94pa0Aw3FL3AgKOxd62si3UzoNSTdW",
    "name": "Admin",
    "lastName": "Principal",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-02-23T06:23:09.193Z",
    "updatedAt": "2026-02-23T06:23:09.193Z"
  },
  {
    "id": 2,
    "username": "asael",
    "password": "$2a$10$EHcagMcHk7QY3h/DGPBDv.l94pa0Aw3FL3AgKOxd62si3UzoNSTdW",
    "name": "Asael",
    "lastName": "Cajero 1",
    "role": "CAJERO",
    "isActive": true,
    "createdAt": "2026-02-23T06:23:09.370Z",
    "updatedAt": "2026-02-23T06:23:09.370Z"
  },
  {
    "id": 3,
    "username": "karla",
    "password": "$2a$10$EHcagMcHk7QY3h/DGPBDv.l94pa0Aw3FL3AgKOxd62si3UzoNSTdW",
    "name": "Karla",
    "lastName": "Cajero 2",
    "role": "CAJERO",
    "isActive": true,
    "createdAt": "2026-02-23T06:23:09.456Z",
    "updatedAt": "2026-02-23T06:23:09.456Z"
  },
  {
    "id": 4,
    "username": "marco",
    "password": "$2a$10$EHcagMcHk7QY3h/DGPBDv.l94pa0Aw3FL3AgKOxd62si3UzoNSTdW",
    "name": "Marco",
    "lastName": "Técnico",
    "role": "TECNICO",
    "isActive": true,
    "createdAt": "2026-02-23T06:23:09.542Z",
    "updatedAt": "2026-02-23T06:23:09.542Z"
  },
  {
    "id": 5,
    "username": "supervisor",
    "password": "$2a$10$EHcagMcHk7QY3h/DGPBDv.l94pa0Aw3FL3AgKOxd62si3UzoNSTdW",
    "name": "Karla Sup",
    "lastName": "Supervisora",
    "role": "SUPERVISOR",
    "isActive": true,
    "createdAt": "2026-02-23T06:23:09.629Z",
    "updatedAt": "2026-02-23T06:23:09.629Z"
  }
]

  return (
    <ITThemeProvider theme={customTheme}>
      <ITLayout sidebar={sidebarProps} topBar={topBarProps}>
        <div className="flex justify-center items-center py-10 px-4 w-full">
          <ITCard className="flex flex-col gap-4 p-8 w-full max-w-6xl shadow-xl border border-gray-100">
            <div className="mb-4 flex flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Data Table Showcase
                </h2>
                <p className="text-gray-500 mt-1">
                  Tabla con ordenamiento fluido, paginación dinámica, filtrado condicional por columna y celdas renderizadas custom.
                </p>
              </div>
              <ITButton onClick={() => setIsDialogOpen(true)} color="primary">
                Test Dialog Overlay
              </ITButton>
            </div>
            <ITTable
              columns={[
                {
                  key: "username",
                  label: "Usuario",
                  type: "string",
                  filter: true,
                },
                {
                  key: "name",
                  label: "Nombre",
                  type: "string",
                  filter: true,
                },
                {
                  key: "lastName",
                  label: "Apellido",
                  type: "string",
                  filter: true,
                },
                {
                  key: "role",
                  label: "Rol",
                  type: "string",
                  filter: true,
                  render: (row: any) => {
                    return (
                      <ITBadget
                        color={
                          row.role === "ADMIN"
                            ? "primary"
                            : row.role === "CAJERO"
                            ? "success"
                            : row.role === "TECNICO"
                            ? "warning"
                            : "secondary"
                        }
                        label={row.role}
                      />
                    );
                  },
                },
                {
                  key: "isActive",
                  label: "Activo",
                  type: "boolean",
                  filter: true,
                },
              ]}
              data={data}
              defaultItemsPerPage={5}
              itemsPerPageOptions={[5, 10, 20]}
            />
          </ITCard>
        </div>
      </ITLayout>

      <ITDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Z-Index Test Overlay"
        useFormHeader={true}
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            Este diálogo ahora se renderiza a través de un Portal directamente
            en el body (`document.body`).
          </p>
          <p className="text-gray-600">
            Como puedes ver, bloquea completamente el Header y el Sidebar, sin
            importar que estén envueltos dentro del ITLayout con altos
            z-indexes, porque el Portal salta fuera de esa jerarquía HTML.
          </p>
          <div className="flex justify-end pt-4">
            <ITButton
              onClick={() => setIsDialogOpen(false)}
              color="danger"
              className="px-6"
            >
              Cerrar Prueba
            </ITButton>
          </div>
        </div>
      </ITDialog>

    </ITThemeProvider>
  );
}

export default App;
