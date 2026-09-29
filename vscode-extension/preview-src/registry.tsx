import React, { useState } from "react";
import {
  ITAccordion,
  ITAlert,
  ITAvatar,
  ITBadget,
  ITBreadcrumbs,
  ITButton,
  ITCard,
  ITCheckbox,
  ITChip,
  ITChipInput,
  ITDataTable,
  ITDatePicker,
  ITDialog,
  ITDivider,
  ITDropdownMenu,
  ITDropfile,
  ITEmptyState,
  ITFormHeader,
  ITImage,
  ITInput,
  ITInputNumber,
  ITLoader,
  ITMaskedInput,
  ITMultiSelect,
  ITPageHeader,
  ITPagination,
  ITPopover,
  ITProgress,
  ITRadioGroup,
  ITSearchSelect,
  ITSegmentedControl,
  ITSelect,
  ITSkeleton,
  ITSlider,
  ITSlideToggle,
  ITStatCard,
  ITStepper,
  ITTable,
  ITTabs,
  ITText,
  ITTextarea,
  ITTimePicker,
  ITToast,
  ITTripleFilter,
} from "../../dist/index.js";

/** A preview demo component. */
export type DemoComponent = React.ComponentType;

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-wrap items-center gap-3">{children}</div>
);

const demoColumns = [
  { key: "name", label: "Name", type: "string", sortable: true, filter: true },
  { key: "role", label: "Role", type: "string", filter: true },
  { key: "active", label: "Active", type: "boolean", filter: true },
];

const demoRows = [
  { id: 1, name: "Sofía Castillo", role: "Admin", active: true },
  { id: 2, name: "Daniela Klein", role: "Editor", active: true },
  { id: 3, name: "Mariana Reyes", role: "Viewer", active: false },
  { id: 4, name: "Camila Torres", role: "Admin", active: true },
];

/** Every previewable component, keyed by export name. */
export const registry: Record<string, DemoComponent> = {
  ITAvatar: () => (
    <Row>
      <ITAvatar initials="SC" size="sm" />
      <ITAvatar initials="DK" size="md" />
      <ITAvatar initials="MR" size="lg" />
    </Row>
  ),
  ITBadget: () => (
    <Row>
      <ITBadget label="Primary" color="primary" />
      <ITBadget label="Success" color="success" />
      <ITBadget label="Warning" color="warning" />
      <ITBadget label="Danger" color="danger" />
      <ITBadget label="Info" color="info" />
    </Row>
  ),
  ITButton: () => (
    <Row>
      <ITButton label="Filled" />
      <ITButton label="Outlined" variant="outlined" />
      <ITButton label="Text" variant="text" />
      <ITButton label="Danger" color="danger" />
      <ITButton label="Small" size="sm" />
      <ITButton label="Large" size="lg" />
    </Row>
  ),
  ITCheckbox: () => <CheckboxDemo />,
  ITChip: () => (
    <Row>
      <ITChip label="Default" />
      <ITChip label="Selected" selected />
      <ITChip label="Removable" removable onRemove={() => {}} />
      <ITChip label="Primary" color="primary" />
    </Row>
  ),
  ITDivider: () => (
    <div className="w-72">
      <ITDivider />
    </div>
  ),
  ITImage: () => (
    <ITImage src="https://picsum.photos/seed/axzy/240/140" alt="Placeholder" className="rounded-lg" />
  ),
  ITInput: () => <InputDemo />,
  ITInputNumber: () => <InputNumberDemo />,
  ITLoader: () => (
    <Row>
      <ITLoader size="sm" />
      <ITLoader size="md" />
      <ITLoader size="lg" />
    </Row>
  ),
  ITPopover: () => (
    <ITPopover trigger={<ITButton label="Open popover" />}>
      <div className="p-1 text-sm">Popover content</div>
    </ITPopover>
  ),
  ITProgress: () => (
    <div className="w-72 space-y-3">
      <ITProgress value={65} />
      <ITProgress value={35} color="success" size="sm" />
      <ITProgress variant="indeterminate" />
    </div>
  ),
  ITRadioGroup: () => <RadioDemo />,
  ITSegmentedControl: () => <SegmentedDemo />,
  ITSkeleton: () => (
    <div className="w-72 space-y-2">
      <ITSkeleton height={16} />
      <ITSkeleton height={16} width="80%" />
      <ITSkeleton height={16} width="60%" />
    </div>
  ),
  ITSlider: () => <SliderDemo />,
  ITSlideToggle: () => <SlideToggleDemo />,
  ITText: () => (
    <div className="space-y-1">
      <ITText as="h2" className="text-xl font-bold">Heading</ITText>
      <ITText as="p">Body text rendered with the ITText typography wrapper.</ITText>
    </div>
  ),
  ITTextarea: () => <TextareaDemo />,

  ITAccordion: () => (
    <div className="w-full max-w-xl">
      <ITAccordion
        items={[
          { id: "a", title: "Section A", content: <p>Content A</p> },
          { id: "b", title: "Section B", content: <p>Content B</p> },
        ]}
      />
    </div>
  ),
  ITAlert: () => (
    <div className="w-full max-w-xl space-y-2">
      <ITAlert variant="info" title="Info">Informational message.</ITAlert>
      <ITAlert variant="success" title="Success">Operation completed.</ITAlert>
      <ITAlert variant="error" title="Error" dismissible>Something went wrong.</ITAlert>
    </div>
  ),
  ITBreadcrumbs: () => (
    <ITBreadcrumbs
      items={[
        { label: "Home", href: "#" },
        { label: "Library", href: "#" },
        { label: "Components" },
      ]}
    />
  ),
  ITCard: () => (
    <div className="w-80">
      <ITCard title="Card title" actions={<ITButton label="Action" size="sm" />}>
        <p className="text-sm text-secondary-600">Card body content.</p>
      </ITCard>
    </div>
  ),
  ITChipInput: () => <ChipInputDemo />,
  ITDatePicker: () => <DatePickerDemo />,
  ITDropdownMenu: () => (
    <ITDropdownMenu
      items={[
        { id: "edit", label: "Edit" },
        { id: "duplicate", label: "Duplicate" },
        { id: "delete", label: "Delete" },
      ]}
    />
  ),
  ITEmptyState: () => (
    <div className="w-full max-w-md">
      <ITEmptyState title="No results" description="Try adjusting your filters." />
    </div>
  ),
  ITFormHeader: () => (
    <div className="w-full max-w-xl">
      <ITFormHeader title="Create account" />
    </div>
  ),
  ITMaskedInput: () => <MaskedDemo />,
  ITMultiSelect: () => <MultiSelectDemo />,
  ITPagination: () => <PaginationDemo />,
  ITSearchSelect: () => <SearchSelectDemo />,
  ITSelect: () => <SelectDemo />,
  ITStatCard: () => (
    <Row>
      <ITStatCard label="Users" value={1042} trend="+12%" trendDirection="up" />
      <ITStatCard label="Revenue" value="$48.2k" trend="-3%" trendDirection="down" />
    </Row>
  ),
  ITStepper: () => (
    <div className="w-full max-w-xl">
      <ITStepper
        currentStep={1}
        steps={[
          { label: "Account", content: <p>Step 1</p> },
          { label: "Company", content: <p>Step 2</p> },
          { label: "Done", content: <p>Step 3</p> },
        ]}
      />
    </div>
  ),
  ITTable: () => (
    <ITTable columns={demoColumns as never} data={demoRows} title="Table" defaultItemsPerPage={4} />
  ),
  ITTabs: () => (
    <div className="w-full max-w-xl">
      <ITTabs
        items={[
          { id: "overview", label: "Overview", content: <p className="pt-3">Overview panel</p> },
          { id: "activity", label: "Activity", content: <p className="pt-3">Activity panel</p> },
        ]}
      />
    </div>
  ),
  ITTimePicker: () => <TimePickerDemo />,

  ITDataTable: () => (
    <div className="w-full">
      <ITDataTable
        title="Server-side table"
        columns={demoColumns as never}
        defaultItemsPerPage={4}
        fetchData={async (params) => {
          await new Promise((resolve) => setTimeout(resolve, 250));
          const start = (params.page - 1) * params.limit;
          return { data: demoRows.slice(start, start + params.limit) as never, total: demoRows.length };
        }}
      />
    </div>
  ),
  ITDialog: () => <DialogDemo />,
  ITDropfile: () => (
    <div className="w-full max-w-md">
      <ITDropfile onFileSelect={() => {}} />
    </div>
  ),
  ITPageHeader: () => (
    <div className="w-full">
      <ITPageHeader title="Users" />
    </div>
  ),
  ITToast: () => (
    <Row>
      <ITToast message="Saved successfully" type="success" />
      <ITToast message="Something failed" type="error" />
    </Row>
  ),
  ITTripleFilter: () => <TripleFilterDemo />,
};

// --- interactive demos (need local state) -----------------------------------

const CheckboxDemo: React.FC = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Row>
      <ITCheckbox label="Checked" checked={checked} onChange={setChecked} />
      <ITCheckbox label="Indeterminate" indeterminate />
      <ITCheckbox label="Disabled" disabled />
    </Row>
  );
};

const InputDemo: React.FC = () => {
  const [value, setValue] = useState("Hello");
  return (
    <div className="w-72 space-y-3">
      <ITInput name="demo" label="Name" value={value} onChange={(e: any) => setValue(e.target.value)} />
      <ITInput name="demo2" label="Email" placeholder="you@axzy.dev" onChange={() => {}} />
    </div>
  );
};

const InputNumberDemo: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(1234.5);
  return (
    <div className="w-72 space-y-3">
      <ITInputNumber
        name="amount"
        label="Amount"
        prefix="$"
        value={amount}
        onChange={(value) => setAmount(value ?? null)}
      />
      <ITInputNumber
        name="qty"
        label="Quantity (integers)"
        decimals={0}
        min={1}
        max={99}
        value={12}
        onChange={() => {}}
      />
    </div>
  );
};

const TextareaDemo: React.FC = () => {
  const [value, setValue] = useState("Some text");
  return (
    <div className="w-80">
      <ITTextarea name="bio" label="Bio" value={value} onChange={setValue} />
    </div>
  );
};

const RadioDemo: React.FC = () => {
  const [value, setValue] = useState("a");
  return (
    <ITRadioGroup
      name="demo"
      value={value}
      onChange={setValue}
      options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
      ]}
    />
  );
};

const SegmentedDemo: React.FC = () => {
  const [value, setValue] = useState("day");
  return (
    <ITSegmentedControl
      value={value}
      onChange={setValue}
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  );
};

const SliderDemo: React.FC = () => {
  const [value, setValue] = useState(40);
  return (
    <div className="w-72">
      <ITSlider value={value} onChange={setValue} label="Volume" />
    </div>
  );
};

const SlideToggleDemo: React.FC = () => {
  const [isOn, setIsOn] = useState(true);
  return (
    <Row>
      <ITSlideToggle isOn={isOn} onToggle={setIsOn} />
      <ITSlideToggle isOn={!isOn} onToggle={() => {}} size="sm" />
    </Row>
  );
};

const ChipInputDemo: React.FC = () => {
  const [value, setValue] = useState(["react", "vite"]);
  return (
    <div className="w-80">
      <ITChipInput name="tags" label="Tags" value={value} onChange={setValue} />
    </div>
  );
};

const DatePickerDemo: React.FC = () => {
  const [value, setValue] = useState<Date | undefined>(new Date());
  return (
    <div className="w-64">
      <ITDatePicker name="date" label="Date" value={value} onChange={(e: any) => setValue(e.target.value)} />
    </div>
  );
};

const TimePickerDemo: React.FC = () => {
  const [value, setValue] = useState("09:30");
  return (
    <div className="w-64">
      <ITTimePicker name="time" label="Time" value={value} onChange={(e: any) => setValue(e.target.value)} />
    </div>
  );
};

const MaskedDemo: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-64">
      <ITMaskedInput
        name="phone"
        label="Phone"
        mask="(999) 999-9999"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />
    </div>
  );
};

const SelectDemo: React.FC = () => {
  const [value, setValue] = useState("mx");
  return (
    <div className="w-64">
      <ITSelect
        name="country"
        label="Country"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        options={[
          { value: "mx", label: "Mexico" },
          { value: "us", label: "United States" },
          { value: "es", label: "Spain" },
        ]}
      />
    </div>
  );
};

const SearchSelectDemo: React.FC = () => {
  const [value, setValue] = useState<string | number>("");
  return (
    <div className="w-72">
      <ITSearchSelect
        name="user"
        label="User"
        value={value}
        onChange={(next) => setValue(next)}
        options={[
          { value: 1, label: "Sofía Castillo" },
          { value: 2, label: "Daniela Klein" },
          { value: 3, label: "Mariana Reyes" },
        ]}
      />
    </div>
  );
};

const MultiSelectDemo: React.FC = () => {
  const [value, setValue] = useState<Array<string | number>>([1]);
  return (
    <div className="w-72">
      <ITMultiSelect
        label="Roles"
        value={value}
        onChange={(next) => setValue(next as Array<string | number>)}
        options={[
          { value: 1, label: "Admin" },
          { value: 2, label: "Editor" },
          { value: 3, label: "Viewer" },
        ]}
      />
    </div>
  );
};

const PaginationDemo: React.FC = () => {
  const [page, setPage] = useState(2);
  return <ITPagination currentPage={page} totalPages={8} totalItems={80} onPageChange={setPage} />;
};

const DialogDemo: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col items-start gap-3">
      <ITButton label="Open dialog" onClick={() => setOpen(true)} />
      <ITDialog isOpen={open} onClose={() => setOpen(false)} title="Dialog title">
        <p className="text-sm">Dialog body content.</p>
      </ITDialog>
    </div>
  );
};

const TripleFilterDemo: React.FC = () => {
  const [value, setValue] = useState<"all" | "active" | "inactive">("all");
  return (
    <ITTripleFilter
      value={value}
      onChange={setValue}
      options={[
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ]}
    />
  );
};
