import React, { useMemo, useState } from "react";
import {
  FaCreditCard,
  FaHome,
  FaKeyboard,
  FaRegBell,
  FaSearch,
  FaSlidersH,
  FaTable,
} from "react-icons/fa";
import { ITLayout, ITThemeProvider } from "./index";
import "./index.css";

// Import Showcases
import { HomeShowcase } from "./showcases/HomeShowcase";
import {
  CardShowcase,
  LayoutShowcase,
  TextShowcase,
} from "./showcases/StructureShowcases";
import {
  ButtonShowcase,
  InputShowcase,
  SelectShowcase,
  SearchSelectShowcase,
  DatePickerShowcase,
  TimePickerShowcase,
  CalendarShowcase,
  SlideToggleShowcase,
  DropfileShowcase,
  FormBuilderShowcase,
} from "./showcases/FormShowcases";
import {
  TableShowcase,
  DataTableShowcase,
  BadgetShowcase,
  ImageShowcase,
} from "./showcases/DataShowcases";
import {
  TabsShowcase,
  StepperShowcase,
  PaginationShowcase,
  TripleFilterShowcase,
} from "./showcases/NavigationShowcases";
import {
  DialogShowcase,
  ToastShowcase,
  LoaderShowcase,
  ThemeProviderShowcase,
} from "./showcases/FeedbackShowcases";

function App() {
  const [activeComponentId, setActiveComponentId] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [subitemConnector, setSubitemConnector] = useState<
    "lines" | "dots" | "|" | "none"
  >("lines");

  // Group definitions for the sidebar
  const categories = [
    {
      id: "general",
      label: "General",
      icon: <FaHome />,
    },
    {
      id: "struc",
      label: "Estructura & Layout",
      icon: <FaCreditCard />,
      subitems: [
        { id: "layout", label: "ITLayout & ITNavbar" },
        { id: "card", label: "ITCard" },
        { id: "text", label: "ITText" },
      ],
    },
    {
      id: "forms",
      label: "Formularios & Inputs",
      icon: <FaKeyboard />,
      subitems: [
        { id: "button", label: "ITButton" },
        { id: "input", label: "ITInput" },
        { id: "select", label: "ITSelect" },
        { id: "searchselect", label: "ITSearchSelect" },
        { id: "datepicker", label: "ITDatePicker" },
        { id: "timepicker", label: "ITTimePicker" },
        { id: "calendar", label: "ITCalendar" },
        { id: "slidetoggle", label: "ITSlideToggle" },
        { id: "dropfile", label: "ITDropfile" },
        { id: "formbuilder", label: "ITFormBuilder" },
      ],
    },
    {
      id: "data",
      label: "Visualización Datos",
      icon: <FaTable />,
      subitems: [
        { id: "table", label: "ITTable" },
        { id: "datatable", label: "ITDataTable" },
        { id: "badget", label: "ITBadget" },
        { id: "image", label: "ITImage" },
      ],
    },
    {
      id: "nav",
      label: "Navegación & Control",
      icon: <FaSlidersH />,
      subitems: [
        { id: "tabs", label: "ITTabs" },
        { id: "stepper", label: "ITStepper" },
        { id: "pagination", label: "ITPagination" },
        { id: "triplefilter", label: "ITTripleFilter" },
      ],
    },
    {
      id: "feed",
      label: "Feedback & Sistema",
      icon: <FaRegBell />,
      subitems: [
        { id: "dialog", label: "ITDialog" },
        { id: "toast", label: "ITToast" },
        { id: "loader", label: "ITLoader" },
        { id: "themeprovider", label: "ITThemeProvider" },
      ],
    },
  ];

  // Filter sidebar navigation items based on search term
  const filteredNavigationItems = useMemo(() => {
    return categories
      .map((cat) => {
        if (!cat.subitems) {
          const matches =
            cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.id.toLowerCase().includes(searchTerm.toLowerCase());
          if (matches) {
            return {
              ...cat,
              isActive: activeComponentId === cat.id,
              action: () => setActiveComponentId(cat.id),
            };
          }
          return null;
        }

        const matchingSubitems = cat.subitems.filter(
          (sub) =>
            sub.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.id.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        const mappedSubitems = matchingSubitems.map((sub) => ({
          id: sub.id,
          label: sub.label,
          isActive: activeComponentId === sub.id,
          action: () => setActiveComponentId(sub.id),
        }));

        const isAnySubitemActive = mappedSubitems.some((sub) => sub.isActive);

        return {
          ...cat,
          isActive: isAnySubitemActive,
          subitems: mappedSubitems,
        };
      })
      .filter((cat): cat is Exclude<typeof cat, null> => {
        if (!cat) return false;
        if (cat.subitems) return cat.subitems.length > 0;
        return true;
      });
  }, [searchTerm, activeComponentId]);

  const sidebarProps = {
    navigationItems: filteredNavigationItems,
    subitemConnector,
  };

  const topBarProps = {
    logoText: "AXZY Showroom",
    userMenu: {
      userName: "Alex Dev",
      userEmail: "alex@axzy.dev",
      menuItems: [
        {
          label: "Resetear Demo",
          onClick: () => {
            setActiveComponentId("home");
            setSearchTerm("");
          },
        },
      ],
    },
  };

  // Render correct component based on active navigation
  const renderShowcase = () => {
    switch (activeComponentId) {
      case "home":
        return <HomeShowcase />;
      // Structure
      case "layout":
        return <LayoutShowcase />;
      case "card":
        return <CardShowcase />;
      case "text":
        return <TextShowcase />;
      // Forms
      case "button":
        return <ButtonShowcase />;
      case "input":
        return <InputShowcase />;
      case "select":
        return <SelectShowcase />;
      case "searchselect":
        return <SearchSelectShowcase />;
      case "datepicker":
        return <DatePickerShowcase />;
      case "timepicker":
        return <TimePickerShowcase />;
      case "calendar":
        return <CalendarShowcase />;
      case "slidetoggle":
        return <SlideToggleShowcase />;
      case "dropfile":
        return <DropfileShowcase />;
      case "formbuilder":
        return <FormBuilderShowcase />;
      // Data
      case "table":
        return <TableShowcase />;
      case "datatable":
        return <DataTableShowcase />;
      case "badget":
        return <BadgetShowcase />;
      case "image":
        return <ImageShowcase />;
      // Navigation
      case "tabs":
        return <TabsShowcase />;
      case "stepper":
        return <StepperShowcase />;
      case "pagination":
        return <PaginationShowcase />;
      case "triplefilter":
        return <TripleFilterShowcase />;
      // Feedback
      case "dialog":
        return <DialogShowcase />;
      case "toast":
        return <ToastShowcase />;
      case "loader":
        return <LoaderShowcase />;
      case "themeprovider":
        return <ThemeProviderShowcase />;
      default:
        return <HomeShowcase />;
    }
  };

  return (
    <ITThemeProvider showFab={false}>
      <ITLayout sidebar={sidebarProps} topBar={topBarProps}>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Glassmorphic Search Bar Header */}
          <div className="relative p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 backdrop-blur-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                Explorador de Componentes
              </h2>
              <p className="text-xs text-slate-500">
                Selecciona o filtra en la lista lateral para inspeccionar e
                interactuar.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Connector selection */}
              <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-950/40 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/80">
                {(["lines", "dots", "|", "none"] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setSubitemConnector(style)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      subitemConnector === style
                        ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-700/50"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    {style === "lines"
                      ? "Líneas"
                      : style === "dots"
                        ? "Puntos"
                        : style === "|"
                          ? "Vertical"
                          : "Normal"}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Buscar componente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-100/80 dark:bg-slate-950/40 text-slate-800 dark:text-white pl-10 pr-4 py-2 text-sm rounded-xl outline-none focus:ring-2 focus:ring-primary-500 border border-transparent focus:border-transparent transition-all"
                />
                <FaSearch
                  className="absolute left-3 top-3 text-slate-400"
                  size={14}
                />
              </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-slate-950/10 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-sm min-h-[500px]">
            {renderShowcase()}
          </div>
        </div>
      </ITLayout>
    </ITThemeProvider>
  );
}

export default App;
