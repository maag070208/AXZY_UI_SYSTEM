import React, { useEffect, useMemo, useState } from "react";
import {
  FaCreditCard,
  FaHome,
  FaKeyboard,
  FaRegBell,
  FaSlidersH,
  FaTable,
} from "react-icons/fa";
import { ITLayout, ITThemeProvider } from "./index";
import "./index.css";

// Import Showcases
import { HomeShowcase } from "./showcases/HomeShowcase";
import { GettingStartedShowcase } from "./showcases/GettingStartedShowcase";
import { SizesShowcase } from "./showcases/SizesShowcase";
import {
  CardShowcase,
  LayoutShowcase,
  TextShowcase,
} from "./showcases/StructureShowcases";
import {
  StackShowcase,
  FlexShowcase,
  GridShowcase,
  ScreenDashboardShowcase,
  ScreenFormShowcase,
} from "./showcases/LayoutPrimitivesShowcases";
import {
  PageHeaderShowcase,
  PageShowcase,
} from "./showcases/PageShowcases";
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

type ViewMode = "home" | "ui-system";

// Group definitions for the sidebar (UI System showroom). Estático: se define
// fuera del componente para que su referencia sea estable en los deps del memo.
const categories = [
  {
    id: "general",
    label: "General",
    icon: <FaHome />,
    subitems: [
      { id: "getting-started", label: "Getting Started" },
      { id: "sizes", label: "Medidas · sm / md / lg" },
    ],
  },
  {
    id: "struc",
    label: "Estructura & Layout",
    icon: <FaCreditCard />,
    subitems: [
      { id: "layout", label: "ITLayout & ITNavbar" },
      { id: "stack", label: "ITStack" },
      { id: "flex", label: "ITFlex" },
      { id: "grid", label: "ITGrid" },
      { id: "card", label: "ITCard" },
      { id: "text", label: "ITText" },
      { id: "pageheader", label: "ITPageHeader" },
      { id: "page", label: "ITPage" },
      { id: "screen-dashboard", label: "Dashboard Ejemplo" },
      { id: "screen-form", label: "Formulario Ejemplo" },
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

function App() {
  const [view, setView] = useState<ViewMode>(() => {
    const hash = window.location.hash.replace("#", "");
    return hash.startsWith("ui-system") ? "ui-system" : "home";
  });
  const [showroomActive, setShowroomActive] = useState("screen-form");
  const [searchTerm] = useState("");
  const [subitemConnector] = useState<
    "dot" | "|" | "none"
  >("dot");

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setView(hash.startsWith("ui-system") ? "ui-system" : "home");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

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
              isActive: showroomActive === cat.id,
              action: () => setShowroomActive(cat.id),
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
          isActive: showroomActive === sub.id,
          action: () => setShowroomActive(sub.id),
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
  }, [searchTerm, showroomActive]);

  const sidebarProps = {
    navigationItems: filteredNavigationItems,
    subitemConnector,
  };

  const topBarProps = {
    logoText: "AXZY UI System",
    userMenu: {
      userName: "Alex Dev",
      userEmail: "alex@axzy.dev",
      menuItems: [
        {
          label: "Ir al Portafolio",
          onClick: () => {
            window.location.hash = "home";
          },
        },
      ],
    },
  };

  // Render correct component based on active showroom navigation
  const renderShowcase = () => {
    switch (showroomActive) {
      case "getting-started":
        return <GettingStartedShowcase />;
      // Structure
      case "layout":
        return <LayoutShowcase />;
      case "stack":
        return <StackShowcase />;
      case "flex":
        return <FlexShowcase />;
      case "grid":
        return <GridShowcase />;
      case "card":
        return <CardShowcase />;
      case "text":
        return <TextShowcase />;
      case "pageheader":
        return <PageHeaderShowcase />;
      case "page":
        return <PageShowcase />;
      case "screen-dashboard":
        return <ScreenDashboardShowcase />;
      case "screen-form":
        return <ScreenFormShowcase />;
      case "sizes":
        return <SizesShowcase />;
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
        return <GettingStartedShowcase />;
    }
  };

  return (
    <ITThemeProvider showFab={false} density={0.98} radius={10} shadow={2}>
      {view === "home" ? (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <HomeShowcase />
          </div>
        </div>
      ) : (
        <ITLayout sidebar={sidebarProps} topBar={topBarProps}>
          <div className="max-w-7xl mx-auto">
            {renderShowcase()}
          </div>
        </ITLayout>
      )}
    </ITThemeProvider>
  );
}

export default App;
