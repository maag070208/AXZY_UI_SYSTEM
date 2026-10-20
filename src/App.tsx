import React, { useEffect, useMemo, useState } from "react";
import { ITLayout, ITThemeProvider, ITI18nProvider, useITTranslation, useDebouncedSearch } from "./index";
import { DEFAULT_AXZY_CONFIG, mergeAxzyConfig, type AxzyConfig } from "./sandbox/axzyConfig";
import type { ITNavigationItem } from "./index";

// Import Showcases
import { HomeShowcase } from "./showcases/HomeShowcase";
import ProductoDetalle from "./showcases/ProductoDetalle";
import { PRODUCTOS } from "./showcases/productos";
import { GettingStartedShowcase } from "./showcases/GettingStartedShowcase";
import { HelpShowcase } from "./showcases/HelpShowcase";
import { SizesShowcase } from "./showcases/SizesShowcase";
import {
  CardShowcase,
  LayoutShowcase,
  TextShowcase,
  AccordionShowcase,
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
  InputNumberShowcase,
  SelectShowcase,
  SearchSelectShowcase,
  DatePickerShowcase,
  TimePickerShowcase,
  CalendarShowcase,
  SlideToggleShowcase,
  DropfileShowcase,
  FormBuilderShowcase,
  WysiwygShowcase,
  FieldShowcase,
  MaskedInputShowcase,
  MultiSelectShowcase,
  ChipInputShowcase,
  SegmentedControlShowcase,
} from "./showcases/FormShowcases";
import {
  TableShowcase,
  DataTableShowcase,
  BadgetShowcase,
  ImageShowcase,
  ChipShowcase,
} from "./showcases/DataShowcases";
import {
  TabsShowcase,
  StepperShowcase,
  PaginationShowcase,
  TripleFilterShowcase,
  DropdownMenuShowcase,
} from "./showcases/NavigationShowcases";
import {
  DialogShowcase,
  ToastShowcase,
  LoaderShowcase,
  ThemeProviderShowcase,
} from "./showcases/FeedbackShowcases";
import JsonRendererShowcase from "./showcases/JsonRendererShowcase";
import JsonEditorShowcase from "./showcases/JsonEditorShowcase";
import JsonScreenShowcase from "./showcases/JsonScreenShowcase";
import DemoJsonPortfolio from "./showcases/DemoJsonPortfolio";
import DemoJsonDashboard, { DEMO_APP_PAGES, type DemoAppPage } from "./showcases/DemoJsonDashboard";

// Sandbox routing / landing (dev-only, never published)
import {
  SANDBOX_GROUPS,
  firstItemOf,
} from "./sandbox/navigation";
import { useHashRoute } from "./sandbox/useHashRoute";
import TopbarSearch from "./sandbox/TopbarSearch";
import { LandingShowcase } from "./sandbox/LandingShowcase";
import NotFoundShowcase from "./sandbox/NotFoundShowcase";
import { AxzyLogo } from "./sandbox/AxzyLogo";
import { sandboxMessages, translateLabel } from "./sandbox/i18n";
import { SandboxLocaleProvider, useSandboxLocale } from "./sandbox/locale";
import { SelectorIdioma, SelectorTema } from "./sandbox/controls";
import { GROUP_ICONS } from "./sandbox/icons";

/**
 * Dev-only language switcher for the sandbox chrome. Lee el idioma del contexto
 * compartido, así que el mismo control vive igual en la barra del sandbox y en
 * la cabecera del portafolio.
 */
function AppShell() {
  const { t } = useITTranslation();
  const { route, goToItem, goToLanding, goToPortfolio, goToDemo } = useHashRoute();
  // Configuración global del sandbox: `public/axzy.json`.
  const [configGlobal, setConfigGlobal] = useState<AxzyConfig>(DEFAULT_AXZY_CONFIG);
  useEffect(() => {
    fetch("/axzy.json")
      .then((r) => r.json())
      .then((json: unknown) => setConfigGlobal(mergeAxzyConfig(json)))
      .catch(() => setConfigGlobal(DEFAULT_AXZY_CONFIG));
  }, []);
  const [subitemConnector] = useState<"dot" | "|" | "none">("dot");

  // Debounced term drives filtering; `searchValue` is the live input value.
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const {
    searchTerm: searchValue,
    handleSearchChange,
    handleClearSearch,
  } = useDebouncedSearch({ debounceMs: 250, onSearch: setDebouncedTerm });

  // The active component page (group-only routes fall back to the first item).
  const showroomActive =
    route.view === "ui-system" && route.valid
      ? route.item ?? (route.group ? firstItemOf(route.group) : null)
      : null;

  // Redirect `#ui-system/<group>` to the group's first item (replace, no history spam).
  useEffect(() => {
    if (route.view === "ui-system" && route.valid && route.group && !route.item) {
      const first = firstItemOf(route.group);
      if (first) goToItem(route.group, first, { replace: true });
    }
  }, [route, goToItem]);

  // Sidebar navigation: grouped when idle, flat filtered leaves when searching.
  const navigationItems = useMemo<ITNavigationItem[]>(() => {
    const term = debouncedTerm.trim().toLowerCase();

    if (!term) {
      return SANDBOX_GROUPS.map((group) => {
        const subitems = group.subitems.map((sub) => ({
          id: sub.id,
          label: translateLabel(sub.id, sub.label, t),
          isActive: showroomActive === sub.id,
          action: () => goToItem(group.id, sub.id),
        }));
        return {
          id: group.id,
          label: translateLabel(group.id, group.label, t),
          icon: GROUP_ICONS[group.id],
          isActive: subitems.some((sub) => sub.isActive),
          subitems,
        };
      });
    }

    const flat: ITNavigationItem[] = [];
    SANDBOX_GROUPS.forEach((group) => {
      const groupLabel = translateLabel(group.id, group.label, t);
      const groupMatches =
        groupLabel.toLowerCase().includes(term) ||
        group.id.toLowerCase().includes(term);
      const groupBadge = groupLabel.split(" ")[0];

      group.subitems
        .filter(
          (sub) =>
            groupMatches ||
            translateLabel(sub.id, sub.label, t).toLowerCase().includes(term) ||
            sub.id.toLowerCase().includes(term),
        )
        .forEach((sub) => {
          flat.push({
            id: sub.id,
            label: translateLabel(sub.id, sub.label, t),
            icon: GROUP_ICONS[group.id],
            badge: groupBadge,
            isActive: showroomActive === sub.id,
            action: () => goToItem(group.id, sub.id),
          });
        });
    });
    return flat;
  }, [debouncedTerm, showroomActive, goToItem, t]);

  // Sidebar is UNCONTROLLED: ITLayout's internal default is the 88px rail and the
  // rail expands automatically on hover. No toggle button — the hover is the control.
  // The component search lives in the topbar because a hover-only rail can't host it.
  const sidebarProps = {
    navigationItems,
    subitemConnector,
  };

  const topBarProps = {
    // La marca axzydev sustituye al nombre suelto: el wordmark ya dice a quién
    // pertenece el catálogo y el texto se mantiene como respaldo accesible.
    logo: <AxzyLogo variante="icono" tamano={22} />,
    logoText: "AXZY UI System",
    centerContent: (
      <TopbarSearch
        value={searchValue}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        resultCount={navigationItems.length}
        pending={searchValue.trim() !== debouncedTerm.trim()}
      />
    ),
    // The topbar places `children` in its right area: los controles reales del
    // chrome (idioma y tema). Antes había aquí una campana de notificaciones con
    // un punto rojo que no llevaba a ninguna parte.
    children: (
      <>
        <SelectorIdioma />
        <SelectorTema />
      </>
    ),
    navItems: [
      {
        id: "ui-system",
        label: "UI System",
        action: () => goToLanding(),
      },
      {
        id: "portfolio",
        label: t("sandbox.nav.portfolio"),
        action: () => goToPortfolio(),
      },
      {
        id: "demo",
        label: t("sandbox.nav.demo"),
        action: () => goToDemo(),
      },
    ],
    onNavItemClick: (id: string) => {
      if (id === "ui-system") goToLanding();
      else if (id === "portfolio") goToPortfolio();
      else if (id === "demo") goToDemo();
    },
    // Sin `userMenu`: el sandbox no tiene sesión. Antes mostraba un usuario
    // inventado ("Alex Dev / alex@axzy.dev") en un portafolio real.
  };

  // Render correct component based on active showroom navigation
  const renderShowcase = (itemId: string | null) => {
    switch (itemId) {
      case "getting-started":
        return <GettingStartedShowcase />;
      case "help":
        return <HelpShowcase />;
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
      case "accordion":
        return <AccordionShowcase />;
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
      case "inputnumber":
        return <InputNumberShowcase />;
      case "select":
        return <SelectShowcase />;
      case "searchselect":
        return <SearchSelectShowcase />;
      case "multiselect":
        return <MultiSelectShowcase />;
      case "chipinput":
        return <ChipInputShowcase />;
      case "field":
        return <FieldShowcase />;
      case "datepicker":
        return <DatePickerShowcase />;
      case "timepicker":
        return <TimePickerShowcase />;
      case "maskedinput":
        return <MaskedInputShowcase />;
      case "calendar":
        return <CalendarShowcase />;
      case "slidetoggle":
        return <SlideToggleShowcase />;
      case "segmentedcontrol":
        return <SegmentedControlShowcase />;
      case "dropfile":
        return <DropfileShowcase />;
      case "wysiwyg":
        return <WysiwygShowcase />;
      case "formbuilder":
        return <FormBuilderShowcase />;
      // Data
      case "table":
        return <TableShowcase />;
      case "datatable":
        return <DataTableShowcase />;
      case "badget":
        return <BadgetShowcase />;
      case "chip":
        return <ChipShowcase />;
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
      case "dropdownmenu":
        return <DropdownMenuShowcase />;
      // Feedback
      case "dialog":
        return <DialogShowcase />;
      case "toast":
        return <ToastShowcase />;
      case "loader":
        return <LoaderShowcase />;
      case "themeprovider":
        return <ThemeProviderShowcase />;
      case "jsonrenderer":
        return <JsonRendererShowcase />;
      case "jsoneditor":
        return <JsonEditorShowcase />;
      case "jsonscreen":
        return <JsonScreenShowcase />;
      default:
        return (
          <NotFoundShowcase
            attempted={route.raw}
            onGoLanding={() => goToLanding()}
            onGoPortfolio={goToPortfolio}
          />
        );
    }
  };

  return (
    <ITThemeProvider
      showFab={configGlobal.showFab}
      density={configGlobal.density}
      radius={configGlobal.radius}
      shadow={configGlobal.shadow}
      appearance={configGlobal.appearance}
      theme={configGlobal.theme}
    >
        {route.view === "producto" ? (
          <div className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#0b0d10]">
            {route.valid ? (
              <ProductoDetalle
                producto={PRODUCTOS.find((producto) => producto.id === route.producto)!}
                onBack={() => goToPortfolio()}
              />
            ) : (
              <NotFoundShowcase
                attempted={route.raw}
                onGoLanding={() => goToLanding()}
                onGoPortfolio={goToPortfolio}
              />
            )}
          </div>
        ) : route.view === "demo" ? (
          route.group === "app" ? (
            <DemoJsonDashboard
              page={(DEMO_APP_PAGES.includes((route.item ?? "inicio") as DemoAppPage)
                ? route.item
                : "inicio") as DemoAppPage}
              onNavigate={(pagina) => {
                window.location.hash = `#demo/app/${pagina}`;
              }}
              onExit={() => {
                window.location.hash = "#demo";
              }}
              filterEstado={route.query.estado ?? "Todos"}
              onFilterChange={(estado) => {
                const base = `#demo/app/${route.item ?? "inicio"}`;
                window.location.hash = estado === "Todos" ? base : `${base}?estado=${encodeURIComponent(estado)}`;
              }}
            />
          ) : (
            <div className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#0b0d10]">
              <DemoJsonPortfolio
                onBack={() => goToLanding()}
                onOpenProject={(id) => {
                  window.location.hash = `#proyecto/${id}`;
                }}
                onOpenPanel={() => {
                  window.location.hash = "#demo/app/inicio";
                }}
              />
            </div>
          )
        ) : route.view === "home" ? (
          <div className="min-h-[100dvh] bg-[#fafafa] dark:bg-[#0b0d10]">
            <HomeShowcase />
          </div>
        ) : (
          <ITLayout sidebar={sidebarProps} topBar={topBarProps}>
            {!route.valid ? (
              <NotFoundShowcase
                attempted={route.raw}
                onGoLanding={() => goToLanding()}
                onGoPortfolio={goToPortfolio}
              />
            ) : !route.group && !route.item ? (
              <LandingShowcase
                onOpenItem={goToItem}
                onOpenPortfolio={goToPortfolio}
              />
            ) : (
              renderShowcase(showroomActive)
            )}
          </ITLayout>
        )}
      </ITThemeProvider>
  );
}

/**
 * Sandbox root: el idioma vive en `SandboxLocaleProvider` (compartido con el
 * portafolio) y `ITI18nProvider` lo aplica a todo el showroom.
 */
function SandboxI18n() {
  const { locale } = useSandboxLocale();

  return (
    <ITI18nProvider locale={locale} messages={sandboxMessages}>
      <AppShell />
    </ITI18nProvider>
  );
}

function App() {
  return (
    <SandboxLocaleProvider>
      <SandboxI18n />
    </SandboxLocaleProvider>
  );
}

export default App;
