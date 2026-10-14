import React, { useEffect, useMemo, useState } from "react";
import {
  FaCreditCard,
  FaHome,
  FaKeyboard,
  FaRegBell,
  FaSlidersH,
  FaTable,
} from "react-icons/fa";
import { ITLayout, ITThemeProvider, ITI18nProvider, ITSegmentedControl, useITTranslation, useDebouncedSearch } from "./index";
import type { ITNavigationItem } from "./index";
import "./index.css";

// Import Showcases
import { HomeShowcase } from "./showcases/HomeShowcase";
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

// Sandbox routing / landing (dev-only, never published)
import {
  SANDBOX_GROUPS,
  firstItemOf,
} from "./sandbox/navigation";
import { useHashRoute } from "./sandbox/useHashRoute";
import TopbarSearch from "./sandbox/TopbarSearch";
import { LandingShowcase } from "./sandbox/LandingShowcase";
import NotFoundShowcase from "./sandbox/NotFoundShowcase";
import { sandboxMessages, translateLabel } from "./sandbox/i18n";

// Icons per sandbox group (icons stay here; navigation.ts is plain data).
const GROUP_ICONS: Record<string, React.ReactNode> = {
  general: <FaHome />,
  struc: <FaCreditCard />,
  forms: <FaKeyboard />,
  data: <FaTable />,
  nav: <FaSlidersH />,
  feed: <FaRegBell />,
};

/** Dev-only language switcher for the sandbox; lives inside `ITI18nProvider`. */
function LocaleSwitcher({
  locale,
  onChange,
}: {
  locale: "es" | "en";
  onChange: (locale: "es" | "en") => void;
}) {
  const { t } = useITTranslation();
  return (
    <div role="group" aria-label={t("sandbox.language")}>
      <ITSegmentedControl
        size="sm"
        options={[
          { value: "es", label: "ES" },
          { value: "en", label: "EN" },
        ]}
        value={locale}
        onChange={(value) => onChange(value === "en" ? "en" : "es")}
      />
    </div>
  );
}

function AppShell({
  locale,
  onLocaleChange,
}: {
  locale: "es" | "en";
  onLocaleChange: (locale: "es" | "en") => void;
}) {
  const { t } = useITTranslation();
  const { route, goToItem, goToLanding, goToPortfolio } = useHashRoute();
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
    // The topbar places `children` in its right area, right before the user menu.
    children: (
      <>
        <LocaleSwitcher locale={locale} onChange={onLocaleChange} />
        <button
          type="button"
          aria-label={t("sandbox.notifications")}
          title={t("sandbox.notifications")}
          className="relative flex items-center justify-center p-2.5 rounded-xl transition-colors duration-200 hover:bg-[var(--it-topbar-user-hover,#f1f5f9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
          style={{ color: "var(--it-topbar-icon, #94a3b8)" }}
        >
          <FaRegBell className="w-5 h-5" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
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
    ],
    onNavItemClick: (id: string) => {
      if (id === "ui-system") goToLanding();
      else if (id === "portfolio") goToPortfolio();
    },
    userMenu: {
      userName: "Alex Dev",
      userEmail: "alex@axzy.dev",
      menuItems: [
        {
          label: t("sandbox.userMenu.portfolio"),
          onClick: () => goToPortfolio(),
        },
      ],
    },
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
    <ITThemeProvider showFab={false} density={0.98} radius={10} shadow={2}>
        {route.view === "home" ? (
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <HomeShowcase />
            </div>
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

/** Sandbox root: owns the locale state and provides i18n to the whole showroom. */
function App() {
  const [locale, setLocale] = useState<"es" | "en">(() => {
    if (typeof window === "undefined") return "es";
    return window.localStorage.getItem("it-locale") === "en" ? "en" : "es";
  });

  useEffect(() => {
    window.localStorage.setItem("it-locale", locale);
  }, [locale]);

  return (
    <ITI18nProvider locale={locale} messages={sandboxMessages}>
      <AppShell locale={locale} onLocaleChange={setLocale} />
    </ITI18nProvider>
  );
}

export default App;
