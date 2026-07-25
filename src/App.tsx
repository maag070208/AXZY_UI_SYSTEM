import React, { useEffect, useMemo, useState } from "react";
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

function App() {
  const [activeComponentId, setActiveComponentId] = useState(
    () => window.location.hash.replace("#", "") || "home"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [subitemConnector, setSubitemConnector] = useState<
    "dot" | "|" | "none"
  >("dot");

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace("#", "") || "home";
      setActiveComponentId(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.location.hash = activeComponentId;
  }, [activeComponentId]);

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
    <ITThemeProvider showFab={true}>
      <ITLayout sidebar={sidebarProps} topBar={topBarProps}>
        <div className="max-w-7xl mx-auto">
          {renderShowcase()}
        </div>
      </ITLayout>
    </ITThemeProvider>
  );
}

export default App;
