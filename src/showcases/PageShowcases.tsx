import { useState } from "react";
import {
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaBoxOpen,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaDownload,
  FaFilter,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBell,
  FaSave,
  FaSignOutAlt,
  FaShieldAlt,
  FaPalette,
  FaLanguage,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import ITPage from "../components/page/page";
import ITPageHeader from "../components/page-header/page-header";
import ITButton from "../components/button/button";
import ITCard from "../components/card/card";
import ITStack from "../components/stack/stack";
import ITGrid from "../components/grid/grid";
import ITStatCard from "../components/stat-card/stat-card";
import ITFlex from "../components/flex/flex";
import ITAvatar from "../components/avatar/avatar";
import ITSlideToggle from "../components/slide/slide";
import ITText from "@/components/text/text";
import ITTable from "@/components/table/table";
import type { Column } from "@/components/table/table.props";
import { ShowcaseLayout } from "./ShowcaseLayout";

export const PageHeaderShowcase = () => {
  const [showBack, setShowBack] = useState(true);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [iconColor, setIconColor] = useState("#6366f1");
  const [showDesc, setShowDesc] = useState(true);
  const [actionsVariant, setActionsVariant] = useState<"none" | "single" | "double" | "full">("double");
  const [showFilters, setShowFilters] = useState(true);

  const buildCode = () => {
    const lines = [`<ITPageHeader`];
    lines.push(`  title="Team members"`);
    if (showDesc) lines.push(`  description="Manage invitations, roles and permissions…"`);
    if (showIcon) lines.push(`  icon={<FaUsers size={20} />}`);
    if (showBreadcrumbs) lines.push(`  breadcrumbs={[{ label: "Admin", href: "#" }, { label: "Team" }]}`);
    if (showBack) lines.push(`  backAction={() => history.back()}`);
    if (actionsVariant !== "none") {
      const acts = [];
      acts.push(`<ITButton label="Add member" variant="filled" color="primary" size="small" />`);
      if (actionsVariant === "double" || actionsVariant === "full") acts.push(`<ITButton label="Export" variant="outlined" color="gray" size="small" />`);
      lines.push(`  actions={<>${acts.join("")}</>}`);
    }
    lines.push(`/>`);
    return lines.join("\n");
  };

  const actionEl =
    actionsVariant === "none" ? undefined : (
      <ITFlex gap={2}>
        <ITButton label="Add member" variant="filled" color="primary" size="small" />
        {(actionsVariant === "double" || actionsVariant === "full") && (
          <ITButton label="Export" variant="outlined" color="gray" size="small" />
        )}
      </ITFlex>
    );

  return (
    <ShowcaseLayout
      title="ITPageHeader"
      description="Encabezado estandarizado para pantallas. Incluye título, descripción, icono, breadcrumbs, botón de volver y área de acciones."
      code={buildCode()}
      demo={
        <div className="w-full flex flex-col">
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 overflow-hidden">
            <div className="p-6 pb-4">
              <ITPageHeader
                title="Team members"
                description={showDesc ? "Manage invitations, roles and permissions for your organization workspace." : undefined}
                icon={showIcon ? <FaUsers size={20} /> : undefined}
                iconColor={showIcon ? iconColor : undefined}
                breadcrumbs={showBreadcrumbs ? [
                  { label: "Admin", href: "#" },
                  { label: "Team" },
                ] : undefined}
                backAction={showBack ? () => {} : undefined}
                actions={actionEl}
              />
            </div>

            {/* Filter bar below header */}
            {showFilters && (
              <div className="px-6 pb-4">
                <ITFlex gap={3} align="center" wrap="wrap">
                  <div className="flex-1 min-w-[200px] relative">
                    <FaSearch size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select
                    value="all"
                    onChange={() => {}}
                    className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All roles</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <select
                    value="all"
                    onChange={() => {}}
                    className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ITButton label="Clear" variant="text" color="gray" size="small" />
                </ITFlex>
              </div>
            )}
          </div>

          {/* Fixed footer with active-property badges */}
          <div className="sticky bottom-0 mt-4 -mx-6 -mb-6 px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 flex items-center flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mr-1">Active:</span>
            {showBack && <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">back</span>}
            {showBreadcrumbs && <span className="px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">breadcrumbs</span>}
            {showIcon && <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">icon</span>}
            {showDesc && <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">description</span>}
            {actionsVariant !== "none" && <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">actions ({actionsVariant})</span>}
            {showFilters && <span className="px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300">filters</span>}
          </div>
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Header elements</p>
            <ITFlex direction="column" gap={3}>
              <ITFlex justify="between" align="center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Back button</span>
                <ITSlideToggle isOn={showBack} onToggle={setShowBack} size="sm" />
              </ITFlex>
              <ITFlex justify="between" align="center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Breadcrumbs</span>
                <ITSlideToggle isOn={showBreadcrumbs} onToggle={setShowBreadcrumbs} size="sm" />
              </ITFlex>
              <ITFlex justify="between" align="center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Icon</span>
                <ITSlideToggle isOn={showIcon} onToggle={setShowIcon} size="sm" />
              </ITFlex>
              {showIcon && (
                <ITFlex gap={2} align="center">
                  {["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setIconColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        iconColor === c ? "border-slate-900 dark:border-white scale-125" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </ITFlex>
              )}
              <ITFlex justify="between" align="center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</span>
                <ITSlideToggle isOn={showDesc} onToggle={setShowDesc} size="sm" />
              </ITFlex>
            </ITFlex>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Actions</p>
            <ITFlex gap={2} wrap="wrap">
              {(["none", "single", "double", "full"] as const).map((v) => (
                <ITButton
                  key={v}
                  label={v.charAt(0).toUpperCase() + v.slice(1)}
                  variant={actionsVariant === v ? "filled" : "outlined"}
                  color="primary"
                  size="small"
                  onClick={() => setActionsVariant(v)}
                />
              ))}
            </ITFlex>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Filters</p>
            <ITFlex justify="between" align="center">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Show filter bar</span>
              <ITSlideToggle isOn={showFilters} onToggle={setShowFilters} size="sm" />
            </ITFlex>
          </div>
        </ITStack>
      }
      gallery={
        <ITStack spacing={6}>
          {/* 1. Team management — full header + search + filter bar + user rows */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Team management</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900/50">
              <div className="p-5 pb-3">
                <ITPageHeader
                  title="Team members"
                  description="Manage invitations, roles and permissions for your organization workspace."
                  icon={<FaUsers size={20} />}
                  iconColor="#6366f1"
                  breadcrumbs={[{ label: "Admin", href: "#" }, { label: "Team" }]}
                  backAction={() => {}}
                  actions={
                    <ITFlex gap={2}>
                      <ITButton label="Export" variant="outlined" color="gray" size="small" />
                      <ITButton label="Add member" variant="filled" color="primary" size="small" />
                    </ITFlex>
                  }
                />
              </div>
              <ITFlex gap={3} align="center" wrap="wrap" className="px-5 pb-3">
                <div className="flex-1 min-w-[180px] relative">
                  <FaSearch size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
                </div>
                <select className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none">
                  <option>All roles</option>
                  <option>Admin</option>
                  <option>Editor</option>
                </select>
                <select className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none">
                  <option>All status</option>
                  <option>Active</option>
                  <option>Pending</option>
                </select>
              </ITFlex>
              <ITStack spacing={1} className="px-5 pb-5">
                {[
                  { name: "Sofía Castillo", email: "sofia@axzy.dev", role: "Admin", status: "active" },
                  { name: "Daniela Klein", email: "daniela@axzy.dev", role: "Editor", status: "active" },
                  { name: "Mariana Reyes", email: "mariana@axzy.dev", role: "Viewer", status: "inactive" },
                ].map((u, i) => (
                  <ITFlex key={i} align="center" gap={3} className="p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <ITAvatar initials={u.name.split(" ").map(w => w[0]).join("")} size="sm" color={u.status === "active" ? "bg-primary-700" : "bg-slate-400"} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{u.name}</p>
                      <p className="text-xs text-slate-500 truncate">{u.email}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                      u.role === "Admin" ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300" :
                      u.role === "Editor" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300" :
                      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}>{u.role}</span>
                    <ITFlex gap={1}>
                      <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-primary-600"><FaEye size={12} /></button>
                      <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-rose-600"><FaTrash size={12} /></button>
                    </ITFlex>
                  </ITFlex>
                ))}
              </ITStack>
            </div>
          </div>

          {/* 2. Detail page — back + breadcrumbs + back button + save/cancel */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Detail / Edit form</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900/50">
              <div className="p-5 pb-3">
                <ITPageHeader
                  title="Edit product"
                  description="Update product details, pricing and inventory information."
                  icon={<FaBoxOpen size={20} />}
                  iconColor="#ec4899"
                  breadcrumbs={[{ label: "Products", href: "#" }, { label: "MacBook Pro 16", href: "#" }, { label: "Edit" }]}
                  backAction={() => {}}
                  actions={
                    <ITFlex gap={2}>
                      <ITButton label="Cancel" variant="outlined" color="gray" size="small" />
                      <ITButton label="Save changes" variant="filled" color="primary" size="small" />
                    </ITFlex>
                  }
                />
              </div>
              <ITGrid container spacing={3} className="px-5 pb-5">
                <ITGrid item xs={12} md={6}>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Product name</label>
                  <input type="text" defaultValue="MacBook Pro 16" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                </ITGrid>
                <ITGrid item xs={12} md={3}>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Price</label>
                  <input type="text" defaultValue="$3,499" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                </ITGrid>
                <ITGrid item xs={12} md={3}>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Stock</label>
                  <input type="text" defaultValue="24" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                </ITGrid>
              </ITGrid>
            </div>
          </div>

          {/* 3. Dashboard header — icon + title + desc + date range + refresh */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Dashboard</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900/50">
              <div className="p-5">
                <ITPageHeader
                  title="Dashboard"
                  description="Real-time overview of your business metrics and activity."
                  icon={<FaChartLine size={20} />}
                  iconColor="#10b981"
                  actions={
                    <ITFlex gap={2} align="center">
                      <select className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>This quarter</option>
                        <option>Custom range</option>
                      </select>
                      <ITButton label="Refresh" variant="outlined" color="gray" size="small" />
                    </ITFlex>
                  }
                />
              </div>
            </div>
          </div>

          {/* 4. Settings header — no icon, no breadcrumbs, just title + desc + save */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Settings / Preferences</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900/50">
              <div className="p-5">
                <ITPageHeader
                  title="General settings"
                  description="Configure your workspace preferences, notifications and security options."
                  actions={
                    <ITFlex gap={2}>
                      <ITButton label="Reset" variant="outlined" color="gray" size="small" />
                      <ITButton label="Save" variant="filled" color="primary" size="small" />
                    </ITFlex>
                  }
                />
              </div>
            </div>
          </div>

          {/* 5. Users list — icon + breadcrumbs + search in actions + add button */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Users list</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900/50">
              <div className="p-5">
                <ITPageHeader
                  title="Users"
                  description="1,245 registered users · 38 active right now"
                  icon={<FaUsers size={20} />}
                  iconColor="#8b5cf6"
                  backAction={() => {}}
                  breadcrumbs={[{ label: "Admin", href: "#" }, { label: "Users" }]}
                  actions={
                    <ITFlex gap={2}>
                      <div className="relative">
                        <FaSearch size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search..." className="w-[180px] pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                      </div>
                      <ITButton label="Invite" variant="filled" color="primary" size="small" />
                    </ITFlex>
                  }
                />
              </div>
            </div>
          </div>
        </ITStack>
      }
    />
  );
};

const USERS: Record<string, unknown>[] = [
  { name: "Sofía Castillo", email: "sofia@axzy.dev", role: "Admin", active: true, lastLogin: "2026-07-18T09:30:00" },
  { name: "Daniela Klein", email: "daniela@axzy.dev", role: "Editor", active: true, lastLogin: "2026-07-17T14:22:00" },
  { name: "Mariana Reyes", email: "mariana@axzy.dev", role: "Viewer", active: false, lastLogin: "2026-07-10T11:00:00" },
  { name: "Camila Torres", email: "camila@axzy.dev", role: "Admin", active: true, lastLogin: "2026-07-18T08:15:00" },
  { name: "Valentina Méndez", email: "valentina@axzy.dev", role: "Editor", active: true, lastLogin: "2026-07-16T19:45:00" },
  { name: "Luciana Rivas", email: "luciana@axzy.dev", role: "Viewer", active: false, lastLogin: "2026-06-28T16:30:00" },
  { name: "Isabella Cruz", email: "isabella@axzy.dev", role: "Editor", active: true, lastLogin: "2026-07-18T10:05:00" },
  { name: "Gabriela Vargas", email: "gabriela@axzy.dev", role: "Admin", active: true, lastLogin: "2026-07-15T22:10:00" },
];

export const PageShowcase = () => {
  const [state, setState] = useState<"normal" | "loading" | "error" | "empty">("normal");
  const [screen, setScreen] = useState<"list" | "detail">("list");
  const [selectedUser, setSelectedUser] = useState<Record<string, unknown> | null>(null);
  const [showIcon, setShowIcon] = useState(true);

  const isNormal = state === "normal";
  const isDetail = screen === "detail";

  const handleViewUser = (row: Record<string, unknown>) => {
    setSelectedUser(row);
    setScreen("detail");
  };

  const handleBackToList = () => {
    setScreen("list");
    setSelectedUser(null);
  };

  const user = selectedUser;
  const initials = user
    ? (user.name as string).split(" ").map((w: string) => w[0]).join("")
    : "";
  const userInitial = initials.charAt(0).toUpperCase();
  const roleColor =
    user?.role === "Admin"
      ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300"
      : user?.role === "Editor"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

  const buildCode = () => {
    if (isDetail && user) {
      return `<ITPage
  title="${user.name as string}"
  description="Member · ${user.role as string}"
  icon={<FaUsers size={20} />}
  iconColor="#6366f1"
  breadcrumbs={[{ label: "Team", href: "#" }, { label: user.name as string }]}
  backAction={() => history.back()}
>
  {/* User detail card */}
</ITPage>`;
    }
    return `<ITPage
  title="Team members"
  description="Manage your organization workspace"
  icon={<FaUsers size={20} />}
  iconColor="#6366f1"
  breadcrumbs={[{ label: "Admin", href: "#" }, { label: "Team" }]}
  loading={isLoading}
  error={error}
  empty={isEmpty}
  onRetry={refetch}
  actions={<ITButton label="Invite" size="small" />}
>
  <ITTable columns={[...]} data={users} />
</ITPage>`;
  };

  const columns: Column[] = [
    {
      key: "name",
      label: "Name",
      type: "string",
      sortable: true,
      filter: true,
      render: (row: Record<string, unknown>) => (
        <ITFlex gap={2.5} align="center">
          <ITAvatar initials={(row.name as string).split(" ").map(w => w[0]).join("")} size="sm" />
          <span className="font-semibold text-slate-800 dark:text-white">{row.name as string}</span>
        </ITFlex>
      ),
    },
    {
      key: "email",
      label: "Email",
      type: "string",
      sortable: true,
      filter: true,
    },
    {
      key: "role",
      label: "Role",
      type: "string",
      sortable: true,
      filter: true,
      render: (row: Record<string, unknown>) => (
        <span className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md ${
          row.role === "Admin"
            ? "bg-primary-100 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300"
            : row.role === "Editor"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        }`}>
          {row.role as string}
        </span>
      ),
    },
    {
      key: "active",
      label: "Active",
      type: "boolean",
      filter: true,
    },
    {
      key: "lastLogin",
      label: "Last login",
      type: "string",
      sortable: true,
      render: (row: Record<string, unknown>) => {
        const date = new Date(row.lastLogin as string);
        return (
          <span className="text-slate-500 text-xs">
            {date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "",
      type: "actions",
      actions: (row: Record<string, unknown>) => (
        <ITFlex gap={1}>
          <button
            onClick={() => handleViewUser(row)}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-primary-600 transition-colors"
            title="View detail"
          >
            <FaEye size={13} />
          </button>
        </ITFlex>
      ),
    },
  ];

  const shouldShowIcon = showIcon ? <FaUsers size={20} /> : undefined;
  const shouldShowIconColor = showIcon ? "#6366f1" : undefined;

  return (
    <ShowcaseLayout
      title="ITPage"
      description="Template completo de página con tabla, detalle y 4 estados (carga, error, vacío, normal)."
      code={buildCode()}
      demo={
        <div className="w-full border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900/50">
          {isDetail && user ? (
            <ITPage
              title={user.name as string}
              description={`Member · ${user.role as string} · ${(user.active as boolean) ? "Active" : "Inactive"}`}
              icon={shouldShowIcon}
              iconColor={shouldShowIconColor}
              breadcrumbs={[{ label: "Team", href: "#" }, { label: user.name as string }]}
              backAction={handleBackToList}
              loading={state === "loading"}
              error={state === "error" ? "Could not load user details. Please try again." : null}
              errorTitle="Details error"
              onRetry={() => setState("normal")}
              empty={state === "empty"}
              emptyTitle="No user data"
              emptyDescription="No information available for this user."
            >
              <ITGrid container spacing={4}>
                <ITGrid item xs={12} md={4}>
                  <ITCard>
                    <div className="flex flex-col items-center gap-4 py-4">
                      <ITAvatar initials={userInitial} size="xl" />
                      <div className="text-center">
                        <ITText as="p" className="text-lg font-bold text-slate-800 dark:text-white">{user.name as string}</ITText>
                        <ITText as="p" className="text-sm text-slate-500">{user.email as string}</ITText>
                      </div>
                      <span className={roleColor + " px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md"}>
                        {user.role as string}
                      </span>
                    </div>
                  </ITCard>
                </ITGrid>
                <ITGrid item xs={12} md={8}>
                  <ITCard title="Account details">
                    <ITStack spacing={4}>
                      {[
                        { label: "Full name", value: user.name as string },
                        { label: "Email address", value: user.email as string },
                        { label: "Role", value: user.role as string },
                        { label: "Status", value: (user.active as boolean) ? "Active" : "Inactive" },
                        { label: "Last login", value: new Date(user.lastLogin as string).toLocaleString("en-US") },
                      ].map((f) => (
                        <div key={f.label}>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{f.label}</p>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">{f.value}</p>
                        </div>
                      ))}
                    </ITStack>
                  </ITCard>
                </ITGrid>
              </ITGrid>
            </ITPage>
          ) : (
            <ITPage
              title="Team members"
              description="Manage invitations, roles and permissions for your organization workspace."
              icon={shouldShowIcon}
              iconColor={shouldShowIconColor}
              breadcrumbs={[{ label: "Admin", href: "#" }, { label: "Team" }]}
              loading={state === "loading"}
              error={state === "error" ? "Could not load team members. Check your connection and try again." : null}
              errorTitle="Connection error"
              onRetry={() => setState("normal")}
              empty={state === "empty"}
              emptyTitle="No team members yet"
              emptyDescription="Invite your first team member to get started."
              emptyAction={<ITButton label="Invite members" size="small" icon={<FaPlus />} />}
              actions={<ITButton label="Invite" size="small" icon={<FaPlus />} />}
            >
              <ITTable
                columns={columns}
                data={USERS}
                size="sm"
                defaultItemsPerPage={5}
                title="All members"
              />
            </ITPage>
          )}
        </div>
      }
      controls={
        <ITStack spacing={4}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Page state</p>
            <ITFlex gap={2} wrap="wrap">
              {(["normal", "loading", "error", "empty"] as const).map((s) => (
                <ITButton
                  key={s}
                  label={s.charAt(0).toUpperCase() + s.slice(1)}
                  variant={state === s ? "filled" : "outlined"}
                  size="small"
                  onClick={() => setState(s)}
                />
              ))}
            </ITFlex>
          </div>

          <ITFlex justify="between" align="center">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Icon in header</span>
            <ITSlideToggle isOn={showIcon} onToggle={setShowIcon} size="sm" />
          </ITFlex>

          {isNormal && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Screen</p>
              <ITFlex gap={2} wrap="wrap">
                <ITButton
                  label="List"
                  variant={screen === "list" ? "filled" : "outlined"}
                  size="small"
                  onClick={() => handleBackToList()}
                />
                <ITButton
                  label="Detail (last viewed)"
                  variant={screen === "detail" ? "filled" : "outlined"}
                  size="small"
                  disabled={!selectedUser}
                  onClick={() => screen === "list" && selectedUser ? setScreen("detail") : handleBackToList()}
                />
              </ITFlex>
              {selectedUser && (
                <p className="text-xs text-slate-500 mt-2">
                  Selected: <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedUser.name as string}</span>
                </p>
              )}
            </div>
          )}
        </ITStack>
      }
      gallery={
        <ITStack spacing={6}>
          {/* 1. Users list with ITTable */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Users — table with actions</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="Users"
                description="1,245 registered · 38 active now"
                icon={<FaUsers size={20} />}
                iconColor="#6366f1"
                breadcrumbs={[{ label: "Admin", href: "#" }, { label: "Users" }]}
                actions={
                  <ITFlex gap={2}>
                    <ITButton label="Export" variant="outlined" size="small" icon={<FaDownload />} />
                    <ITButton label="Add user" size="small" icon={<FaPlus />} />
                  </ITFlex>
                }
              >
                <ITTable
                  columns={columns}
                  data={USERS}
                  size="sm"
                  defaultItemsPerPage={5}
                />
              </ITPage>
            </div>
          </div>

          {/* 2. Product detail */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Product detail</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="MacBook Pro 16'' M3 Max"
                description="SKU: MBP-16-M3MAX-2024 · Stock: 24"
                icon={<FaBoxOpen size={20} />}
                iconColor="#ec4899"
                breadcrumbs={[{ label: "Products", href: "#" }, { label: "MacBook Pro 16" }]}
                backAction={() => {}}
                actions={
                  <ITFlex gap={2}>
                    <ITButton label="Delete" variant="outlined" color="gray" size="small" icon={<FaTrash />} />
                    <ITButton label="Edit" size="small" icon={<FaEdit />} />
                  </ITFlex>
                }
              >
                <ITGrid container spacing={3}>
                  <ITGrid item xs={12} md={5}>
                    <ITCard>
                      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl flex items-center justify-center">
                        <FaBoxOpen className="text-6xl text-slate-400" />
                      </div>
                    </ITCard>
                  </ITGrid>
                  <ITGrid item xs={12} md={7}>
                    <ITStack spacing={3}>
                      <ITCard title="Pricing">
                        <ITFlex align="baseline" gap={2}>
                          <span className="text-3xl font-extrabold text-slate-800 dark:text-white">$3,499</span>
                          <span className="text-sm text-slate-400 line-through">$3,799</span>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">-8%</span>
                        </ITFlex>
                      </ITCard>
                      <ITCard title="Description">
                        <ITText className="text-sm text-slate-600 dark:text-slate-300">
                          Extreme performance for professionals. M3 Max chip with 16-core CPU, 40-core GPU, and 64GB unified memory.
                        </ITText>
                      </ITCard>
                    </ITStack>
                  </ITGrid>
                </ITGrid>
              </ITPage>
            </div>
          </div>

          {/* 3. Edit profile form */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Edit profile</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="Edit profile"
                description="Update your personal information and contact details"
                icon={<FaEdit size={20} />}
                iconColor="#10b981"
                breadcrumbs={[{ label: "Account", href: "#" }, { label: "Edit profile" }]}
                backAction={() => {}}
                actions={
                  <ITFlex gap={2}>
                    <ITButton label="Cancel" variant="outlined" color="gray" size="small" />
                    <ITButton label="Save changes" size="small" icon={<FaSave />} />
                  </ITFlex>
                }
              >
                <ITGrid container spacing={3}>
                  <ITGrid item xs={12} md={4}>
                    <ITCard title="Profile photo">
                      <div className="flex flex-col items-center gap-4">
                        <ITAvatar initials="AL" size="xl" />
                        <ITButton label="Upload image" variant="outlined" size="small" />
                      </div>
                    </ITCard>
                  </ITGrid>
                  <ITGrid item xs={12} md={8}>
                    <ITCard title="Personal information">
                      <ITGrid container spacing={3}>
                        <ITGrid item xs={12} sm={6}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">First name</label>
                          <input type="text" defaultValue="Ana" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </ITGrid>
                        <ITGrid item xs={12} sm={6}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Last name</label>
                          <input type="text" defaultValue="López" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </ITGrid>
                        <ITGrid item xs={12}>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Email</label>
                          <input type="email" defaultValue="ana.lopez@axzy.dev" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </ITGrid>
                      </ITGrid>
                    </ITCard>
                  </ITGrid>
                </ITGrid>
              </ITPage>
            </div>
          </div>

          {/* 4. Orders with table */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Orders — status table</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="Orders"
                description="89 pending · 1,247 completed this month"
                icon={<FaShoppingCart size={20} />}
                iconColor="#f59e0b"
                breadcrumbs={[{ label: "Dashboard", href: "#" }, { label: "Orders" }]}
                actions={
                  <ITFlex gap={2}>
                    <ITButton label="Export" variant="outlined" color="gray" size="small" icon={<FaDownload />} />
                    <ITButton label="New order" size="small" icon={<FaPlus />} />
                  </ITFlex>
                }
              >
                <ITTable
                  columns={[
                    { key: "order", label: "Order", type: "string", sortable: true, render: (r: Record<string, unknown>) => <span className="font-mono font-semibold text-primary-600">#{r.order as string}</span> },
                    { key: "customer", label: "Customer", type: "string", sortable: true, filter: true },
                    { key: "status", label: "Status", type: "string", render: (r: Record<string, unknown>) => {
                      const s = r.status as string;
                      const c = s === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" :
                               s === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300" :
                               "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
                      return <span className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md ${c}`}>{s}</span>;
                    }},
                    { key: "total", label: "Total", type: "number", sortable: true, currencyMX: true },
                    { key: "actions", label: "", type: "actions", actions: () => (
                      <ITFlex gap={1}>
                        <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-primary-600"><FaEye size={13} /></button>
                      </ITFlex>
                    )},
                  ]}
                  data={[
                    { order: "ORD-1042", customer: "Sofía Castillo", status: "Completed", total: 3499 },
                    { order: "ORD-1043", customer: "Daniela Klein", status: "Pending", total: 1299 },
                    { order: "ORD-1044", customer: "Mariana Reyes", status: "Completed", total: 549 },
                    { order: "ORD-1045", customer: "Camila Torres", status: "Pending", total: 2199 },
                    { order: "ORD-1046", customer: "Valentina Méndez", status: "Cancelled", total: 799 },
                    { order: "ORD-1047", customer: "Luciana Rivas", status: "Completed", total: 4999 },
                    { order: "ORD-1048", customer: "Isabella Cruz", status: "Pending", total: 1599 },
                    { order: "ORD-1049", customer: "Gabriela Vargas", status: "Completed", total: 899 },
                  ] as Record<string, unknown>[]}
                  size="sm"
                  defaultItemsPerPage={5}
                />
              </ITPage>
            </div>
          </div>

          {/* 5. Settings with tabs */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Settings</h4>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <ITPage
                title="Settings"
                description="Manage your account and workspace preferences"
                icon={<FaCog size={20} />}
                iconColor="#10b981"
                breadcrumbs={[{ label: "Account", href: "#" }, { label: "Settings" }]}
              >
                <ITGrid container spacing={3}>
                  <ITGrid item xs={12} md={4}>
                    <ITCard>
                      <ITStack spacing={1}>
                        {[
                          { id: "general", label: "General", icon: <FaCog />, active: true },
                          { id: "notif", label: "Notifications", icon: <FaBell /> },
                          { id: "sec", label: "Security", icon: <FaShieldAlt /> },
                          { id: "apariencia", label: "Appearance", icon: <FaPalette /> },
                          { id: "billing", label: "Billing", icon: <FaDollarSign /> },
                        ].map(item => (
                          <button key={item.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? "bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-300" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                          </button>
                        ))}
                      </ITStack>
                    </ITCard>
                  </ITGrid>
                  <ITGrid item xs={12} md={8}>
                    <ITCard title="General preferences">
                      <ITStack spacing={4}>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Workspace name</label>
                          <input type="text" defaultValue="AXZY Console" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <ITStack spacing={3} className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <ITFlex justify="between" align="center">
                            <div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Dark mode</p>
                              <p className="text-xs text-slate-500">Follow system appearance</p>
                            </div>
                            <ITSlideToggle isOn={true} onToggle={() => {}} size="sm" />
                          </ITFlex>
                          <ITFlex justify="between" align="center">
                            <div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email notifications</p>
                              <p className="text-xs text-slate-500">Receive activity alerts</p>
                            </div>
                            <ITSlideToggle isOn={false} onToggle={() => {}} size="sm" />
                          </ITFlex>
                        </ITStack>
                      </ITStack>
                    </ITCard>
                  </ITGrid>
                </ITGrid>
              </ITPage>
            </div>
          </div>
        </ITStack>
      }
    />
  );
};
