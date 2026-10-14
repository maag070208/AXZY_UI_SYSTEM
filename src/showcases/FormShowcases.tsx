import React, { useState, useEffect, useMemo } from "react";
import { FaSync, FaSave, FaTrash, FaEdit, FaCode, FaCheck, FaCalendar } from "react-icons/fa";
import {
  ITButton,
  ITInput,
  ITInputNumber,
  ITSelect,
  ITSearchSelect,
  ITDatePicker,
  ITTimePicker,
  ITCalendar,
  ITSlideToggle,
  ITDropfile,
  ITFormBuilder,
  ITWysiwyg,
  ITField,
  ITMaskedInput,
  ITMultiSelect,
  ITChipInput,
  ITBadget,
  ITSegmentedControl,
  UploadStatus
} from "../index";
import { ShowcaseLayout, CodeViewer } from "./ShowcaseLayout";
import ITFlex from "../components/atoms/flex/flex";
import { useITTranslation } from "@/i18n";

const CodeExampleBlock = ({ title, desc, code, children }: { title: string; desc: string; code: string; children: React.ReactNode }) => {
  const { t } = useITTranslation();
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <ITFlex justify="between" align="center">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">{title}</h3>
            <p className="text-xs text-slate-500 mt-1">{desc}</p>
          </div>
          <ITButton variant="outlined" color="gray" size="sm" onClick={() => setShowCode(!showCode)}>
            <ITFlex align="center" gap={1}>
              <FaCode size={9} />
              {showCode ? t("showcase.common.hideCode") : t("showcase.common.showCode")}
            </ITFlex>
          </ITButton>
        </ITFlex>
      </div>
      <div className="p-6">{children}</div>
      {showCode && (
        <div className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700 pt-4">
          <CodeViewer code={code} compact />
        </div>
      )}
    </div>
  );
};

// 1. ITButton Showcase
export const ButtonShowcase = () => {
  const { t } = useITTranslation();
  const [color, setColor] = useState<any>("primary");
  const [size, setSize] = useState<any>("medium");
  const [variant, setVariant] = useState<any>("filled");
  const [disabled, setDisabled] = useState(false);
  const [withIcon, setWithIcon] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const code = `<ITButton\n  label="Hacer Click"\n  color="${color}"\n  size="${size}"\n  variant="${variant}"${withIcon ? '\n  icon={<FaSync />}' : ""}\n  disabled={${disabled}}\n  onClick={() => console.log('Click!')}\n/>`;

  return (
    <ShowcaseLayout
      title="ITButton"
      description={t("showcase.forms.buttonDesc")}
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITButton
            label={t("showcase.forms.clickMe")}
            color={color}
            size={size}
            variant={variant}
            disabled={disabled}
            icon={withIcon ? <FaSync /> : undefined}
            onClick={() => setClickCount(c => c + 1)}
          />
          {clickCount > 0 && (
            <span className="text-xs font-mono text-slate-500 animate-pulse">
              {t("showcase.forms.clicksRegistered", { count: clickCount })}
            </span>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="color"
            label={t("showcase.common.color")}
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
              { label: "Purple", value: "purple" },
              { label: "Gray", value: "gray" }
            ]}
          />
          <ITSelect
            name="size"
            label={t("showcase.common.size")}
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" }
            ]}
          />
          <ITSelect
            name="variant"
            label={t("showcase.common.variant")}
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Filled", value: "filled" },
              { label: "Outlined", value: "outlined" },
              { label: "Raised", value: "raised" },
              { label: "Rounded", value: "rounded" },
              { label: "Text", value: "text" },
              { label: "Raised Text", value: "raised-text" },
              { label: "Link", value: "link" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.forms.withIcon")}</span>
            <ITSlideToggle isOn={withIcon} onToggle={setWithIcon} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.disabled")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">{t("showcase.forms.galleryWithIcon")}</h4>
            <div className="flex flex-wrap gap-3">
              <ITButton label={t("showcase.common.save")} icon={<FaSave />} color="success" />
              <ITButton label={t("showcase.common.edit")} icon={<FaEdit />} color="info" />
              <ITButton label={t("showcase.common.delete")} icon={<FaTrash />} color="danger" variant="outlined" />
              <ITButton label={t("showcase.forms.sync")} icon={<FaSync />} variant="text" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">{t("showcase.forms.galleryVariants")}</h4>
            <div className="flex flex-wrap gap-3">
              <ITButton label="Filled" variant="filled" />
              <ITButton label="Outlined" variant="outlined" />
              <ITButton label="Raised" variant="raised" />
              <ITButton label="Rounded" variant="rounded" />
              <ITButton label="Text" variant="text" />
              <ITButton label="Link" variant="link" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">{t("showcase.forms.gallerySemanticColors")}</h4>
            <div className="flex flex-wrap gap-3">
              <ITButton label="Primary" color="primary" />
              <ITButton label="Secondary" color="secondary" />
              <ITButton label="Success" color="success" />
              <ITButton label="Danger" color="danger" />
              <ITButton label="Warning" color="warning" />
              <ITButton label="Info" color="info" />
              <ITButton label="Purple" color="purple" />
            </div>
          </div>
        </div>
      }
    />
  );
};

// 2. ITInput Showcase
export const InputShowcase = () => {
  const { t } = useITTranslation();
  const [selectedInput, setSelectedInput] = useState<
    "text" | "password" | "select" | "searchselect" | "datepicker" | "timepicker" | "toggle" | "dropfile" | "form"
  >("text");

  const [textVal, setTextVal] = useState("usuario_admin");
  const [passVal, setPassVal] = useState("secreto123");
  const [selectVal, setSelectVal] = useState("admin");
  const [searchSelectVal, setSearchSelectVal] = useState("MX");
  const [dateVal, setDateVal] = useState<any>(new Date());
  const [timeVal, setTimeVal] = useState("08:00");
  const [toggleVal, setToggleVal] = useState(true);
  const [fileVal, setFileVal] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    country: "",
    birthday: new Date(),
    meetingTime: "09:30",
    newsletter: false,
    file: null as File | null
  });
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [label, setLabel] = useState(t("showcase.forms.inputUserLabel"));
  const [placeholder, setPlaceholder] = useState(t("showcase.forms.inputUserPlaceholder"));
  const [variant, setVariant] = useState<any>("primary");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  const [formVariant, setFormVariant] = useState<any>("primary");
  const [formDisabled, setFormDisabled] = useState(false);
  const [showFormErrors, setShowFormErrors] = useState(false);

  const formErrors = showFormErrors ? {
    name: t("showcase.forms.errName"),
    email: t("showcase.forms.errEmail"),
    password: t("showcase.forms.errPassword"),
    role: t("showcase.forms.errRole"),
    country: t("showcase.forms.errCountry"),
    birthday: t("showcase.forms.errBirthday"),
    meetingTime: t("showcase.forms.errTime"),
    file: t("showcase.forms.errFile")
  } : {} as any;

  useEffect(() => {
    if (selectedInput !== "form") {
      const DEFAULT_PROPS: Record<string, { label: string; placeholder: string }> = {
        text: { label: t("showcase.forms.inputUserLabel"), placeholder: t("showcase.forms.inputUserPlaceholder") },
        password: { label: t("showcase.forms.inputPasswordLabel"), placeholder: t("showcase.forms.inputPasswordPlaceholder") },
        select: { label: t("showcase.forms.inputSelectLabel"), placeholder: t("showcase.forms.inputSelectPlaceholder") },
        searchselect: { label: t("showcase.forms.inputCountryLabel"), placeholder: t("showcase.forms.inputCountryPlaceholder") },
        datepicker: { label: t("showcase.forms.inputDateLabel"), placeholder: t("showcase.forms.inputDatePlaceholder") },
        timepicker: { label: t("showcase.forms.inputTimeLabel"), placeholder: t("showcase.forms.inputTimePlaceholder") },
        toggle: { label: t("showcase.forms.inputToggleLabel"), placeholder: "" },
        dropfile: { label: t("showcase.forms.inputFileLabel"), placeholder: "" }
      };
      const defaults = DEFAULT_PROPS[selectedInput];
      if (defaults) {
        setLabel(defaults.label);
        setPlaceholder(defaults.placeholder);
      }
    }
  }, [selectedInput, t]);

  const code = useMemo(() => {
    if (selectedInput === "text") {
      return `<ITInput\n  name="username"\n  label="${label}"\n  placeholder="${placeholder}"\n  value="${textVal}"\n  onChange={(e) => setVal(e.target.value)}\n  variant="${variant}"\n  disabled={${disabled}}\n  required={${required}}\n  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}\n/>`;
    }
    if (selectedInput === "password") {
      return `<ITInput\n  name="password"\n  type="password"\n  label="${label}"\n  placeholder="${placeholder}"\n  value="${passVal}"\n  onChange={(e) => setVal(e.target.value)}\n  variant="${variant}"\n  disabled={${disabled}}\n  required={${required}}\n  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}\n/>`;
    }
    if (selectedInput === "select") {
      return `<ITSelect\n  name="user_role"\n  label="${label}"\n  value="${selectVal}"\n  onChange={(e) => setVal(e.target.value)}\n  options={[\n    { label: "Administrador", value: "admin" },\n    { label: "Colaborador", value: "staff" },\n    { label: "Auditor Externo", value: "auditor" }\n  ]}\n  disabled={${disabled}}\n  required={${required}}\n  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}\n/>`;
    }
    if (selectedInput === "searchselect") {
      return `<ITSearchSelect\n  name="user_country"\n  label="${label}"\n  placeholder="${placeholder}"\n  value="${searchSelectVal}"\n  onChange={(val) => setVal(val)}\n  options={[\n    { label: "México", value: "MX" },\n    { label: "España", value: "ES" },\n    { label: "Colombia", value: "CO" },\n    { label: "Argentina", value: "AR" },\n    { label: "Perú", value: "PE" }\n  ]}\n  disabled={${disabled}}\n  required={${required}}\n  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}\n/>`;
    }
    if (selectedInput === "datepicker") {
      return `<ITDatePicker\n  name="birthday"\n  label="${label}"\n  placeholder="${placeholder}"\n  value={dateVal}\n  onChange={(e) => setVal(e.target.value)}\n  variant="${variant}"\n  disabled={${disabled}}\n  required={${required}}\n  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}\n/>`;
    }
    if (selectedInput === "timepicker") {
      return `<ITTimePicker\n  name="meeting_time"\n  label="${label}"\n  placeholder="${placeholder}"\n  value="${timeVal}"\n  onChange={(e) => setVal(e.target.value)}\n  variant="${variant}"\n  disabled={${disabled}}\n  required={${required}}\n  error=${errorInput === "true" ? "{true}" : (errorInput ? `"${errorInput}"` : "undefined")}\n/>`;
    }
    if (selectedInput === "toggle") {
      return `<ITSlideToggle\n  label="${label}"\n  isOn={${toggleVal}}\n  onToggle={(val) => setVal(val)}\n  disabled={${disabled}}\n/>`;
    }
    if (selectedInput === "dropfile") {
      return `<ITDropfile\n  onFileSelect={(file) => setFile(file)}\n  uploadStatus={${fileVal ? "UploadStatus.UPLOADED" : "UploadStatus.PENDING"}}\n/>`;
    }
    return `// Formulario Completo AXZY con todos los tipos de Input:\n<form onSubmit={handleSubmit} className="space-y-4">\n  <ITInput label="Nombre Completo" name="name" value={name} onChange={...} />\n  <ITInput label="Correo" name="email" value={email} onChange={...} />\n  <ITInput label="Contraseña" type="password" name="password" value={password} onChange={...} />\n  \n  <ITSelect label="Rol de Usuario" value={role} options={roles} onChange={...} />\n  <ITSearchSelect label="País" value={country} options={countries} onChange={...} />\n  \n  <ITDatePicker label="Nacimiento" value={birthday} onChange={...} />\n  <ITTimePicker label="Hora de Entrada" value={time} onChange={...} />\n  \n  <ITSlideToggle label="Boletín" isOn={newsletter} onToggle={...} />\n  <ITDropfile label="Documento" onFileSelect={...} />\n  \n  <ITButton type="submit" label="Enviar Formulario" />\n</form>`;
  }, [selectedInput, label, placeholder, variant, disabled, required, errorInput, textVal, passVal, selectVal, searchSelectVal, timeVal, toggleVal, fileVal]);

  const tabs = [
    { id: "text", label: t("showcase.forms.tabText") },
    { id: "password", label: t("showcase.forms.tabPassword") },
    { id: "select", label: "Select" },
    { id: "searchselect", label: "SearchSelect" },
    { id: "datepicker", label: "DatePicker" },
    { id: "timepicker", label: "TimePicker" },
    { id: "toggle", label: "SlideToggle" },
    { id: "dropfile", label: "Dropfile" },
    { id: "form", label: t("showcase.forms.tabForm") }
  ];

  const renderActiveInput = () => {
    switch (selectedInput) {
      case "text":
        return (
          <div className="w-full max-w-sm">
            <ITInput
              name="sandbox_username"
              label={label}
              placeholder={placeholder}
              value={textVal}
              onChange={(e: any) => setTextVal(e.target.value)}
              onBlur={() => { }}
              variant={variant}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "password":
        return (
          <div className="w-full max-w-sm">
            <ITInput
              name="sandbox_password"
              type="password"
              label={label}
              placeholder={placeholder}
              value={passVal}
              onChange={(e: any) => setPassVal(e.target.value)}
              onBlur={() => { }}
              variant={variant}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "select":
        return (
          <div className="w-full max-w-sm">
            <ITSelect
              name="sandbox_select"
              label={label}
              value={selectVal}
              onChange={(e: any) => setSelectVal(e.target.value)}
              options={[
                { label: "Administrador", value: "admin" },
                { label: "Colaborador", value: "staff" },
                { label: "Auditor Externo", value: "auditor" }
              ]}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "searchselect":
        return (
          <div className="w-full max-w-sm">
            <ITSearchSelect
              name="sandbox_searchselect"
              label={label}
              placeholder={placeholder}
              value={searchSelectVal}
              onChange={(val: string) => setSearchSelectVal(val)}
              options={[
                { label: "México", value: "MX" },
                { label: "España", value: "ES" },
                { label: "Colombia", value: "CO" },
                { label: "Argentina", value: "AR" },
                { label: "Perú", value: "PE" }
              ]}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "datepicker":
        return (
          <div className="w-full max-w-sm">
            <ITDatePicker
              name="sandbox_datepicker"
              label={label}
              value={dateVal}
              onChange={(e: any) => setDateVal(e.target.value)}
              variant={variant}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "timepicker":
        return (
          <div className="w-full max-w-sm">
            <ITTimePicker
              name="sandbox_timepicker"
              label={label}
              placeholder={placeholder}
              value={timeVal}
              onChange={(e: any) => setTimeVal(e.target.value)}
              onBlur={() => { }}
              variant={variant}
              disabled={disabled}
              required={required}
              error={errorInput === "true" ? true : (errorInput || undefined)}
            />
          </div>
        );
      case "toggle":
        return (
          <div className="w-full max-w-sm flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label || t("showcase.forms.toggleSwitch")}</span>
            <ITSlideToggle
              isOn={toggleVal}
              onToggle={setToggleVal}
              disabled={disabled}
              activeColor={variant === "primary" ? "success" : variant}
            />
          </div>
        );
      case "dropfile":
        return (
          <div className="w-full max-w-sm">
            {label && <label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5 block">{label}</label>}
            <ITDropfile
              onFileSelect={setFileVal}
              uploadStatus={fileVal ? UploadStatus.UPLOADED : UploadStatus.PENDING}
            />
          </div>
        );
      case "form":
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmittedData(formData);
            }}
            className="w-full max-w-lg space-y-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ITInput
                name="form_name"
                label={t("showcase.forms.fullName")}
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={(e: any) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.name}
                touched={showFormErrors ? true : undefined}
              />
              <ITInput
                name="form_email"
                label={t("showcase.forms.email")}
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={(e: any) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.email}
                touched={showFormErrors ? true : undefined}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ITInput
                name="form_password"
                label={t("showcase.forms.password")}
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e: any) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.password}
                touched={showFormErrors ? true : undefined}
              />
              <ITSelect
                name="form_role"
                label={t("showcase.forms.userRole")}
                value={formData.role}
                onChange={(e: any) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                options={[
                  { label: "Administrador", value: "admin" },
                  { label: "Colaborador", value: "staff" },
                  { label: "Auditor Externo", value: "auditor" }
                ]}
                disabled={formDisabled}
                required={true}
                error={formErrors.role}
                touched={showFormErrors ? true : undefined}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ITSearchSelect
                name="form_country"
                label={t("showcase.forms.countryResidence")}
                value={formData.country}
                onChange={(val: string) => setFormData(prev => ({ ...prev, country: val }))}
                options={[
                  { label: "México", value: "MX" },
                  { label: "España", value: "ES" },
                  { label: "Colombia", value: "CO" },
                  { label: "Argentina", value: "AR" },
                  { label: "Perú", value: "PE" }
                ]}
                disabled={formDisabled}
                required={true}
                error={formErrors.country}
                touched={showFormErrors ? true : undefined}
              />
              <ITDatePicker
                name="form_birthday"
                label={t("showcase.forms.birthDate")}
                value={formData.birthday}
                onChange={(e: any) => setFormData(prev => ({ ...prev, birthday: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.birthday}
                touched={showFormErrors ? true : undefined}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <ITTimePicker
                name="form_time"
                label={t("showcase.forms.entryTime")}
                value={formData.meetingTime}
                onChange={(e: any) => setFormData(prev => ({ ...prev, meetingTime: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.meetingTime}
                touched={showFormErrors ? true : undefined}
              />
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl h-[64px]">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t("showcase.forms.newsletter")}</span>
                <ITSlideToggle
                  isOn={formData.newsletter}
                  onToggle={(val) => setFormData(prev => ({ ...prev, newsletter: val }))}
                  disabled={formDisabled}
                  size="sm"
                />
              </div>
            </div>

            <ITDropfile
              onFileSelect={(file) => setFormData(prev => ({ ...prev, file }))}
              uploadStatus={formData.file ? UploadStatus.UPLOADED : UploadStatus.PENDING}
            />
            {formErrors.file && <p className="text-xs text-red-500 mt-1">{formErrors.file}</p>}

            <div className="flex justify-end pt-2">
              <ITButton label={t("showcase.forms.submitForm")} color={formVariant} type="submit" disabled={formDisabled} />
            </div>

            {submittedData && (
              <div className="mt-4 p-4 bg-slate-950 text-emerald-400 font-mono text-[10px] sm:text-xs rounded-xl border border-slate-800">
                <p className="font-bold mb-2">{t("showcase.forms.submitData")}</p>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(
                    {
                      ...submittedData,
                      birthday: submittedData.birthday instanceof Date ? submittedData.birthday.toLocaleDateString() : submittedData.birthday,
                      file: submittedData.file ? submittedData.file.name : null
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedInput(tab.id as any);
              setSubmittedData(null);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${selectedInput === tab.id
              ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ShowcaseLayout
        title="ITInput Suite"
        description={
          selectedInput === "form"
            ? t("showcase.forms.inputFormDesc")
            : t("showcase.forms.inputSingleDesc", { type: selectedInput.toUpperCase() })
        }
        code={code}
        demo={renderActiveInput()}
        controls={
          selectedInput === "form" ? (
            <>
              <ITSelect
                name="form_variant_ctrl"
                label={t("showcase.forms.buttonColorVariant")}
                value={formVariant}
                onChange={(e: any) => setFormVariant(e.target.value)}
                options={[
                  { label: "Primary", value: "primary" },
                  { label: "Secondary", value: "secondary" },
                  { label: "Success", value: "success" },
                  { label: "Danger", value: "danger" },
                  { label: "Warning", value: "warning" },
                  { label: "Info", value: "info" }
                ]}
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{t("showcase.forms.simulateErrors")}</span>
                <ITSlideToggle isOn={showFormErrors} onToggle={setShowFormErrors} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{t("showcase.forms.disableAll")}</span>
                <ITSlideToggle isOn={formDisabled} onToggle={setFormDisabled} activeColor="danger" size="sm" />
              </div>
            </>
          ) : (
            <>
              <ITInput
                name="label_ctrl"
                label={t("showcase.forms.labelProp")}
                value={label}
                onChange={(e: any) => setLabel(e.target.value)}
                onBlur={() => { }}
              />
              {["text", "password", "searchselect", "datepicker", "timepicker"].includes(selectedInput) && (
                <ITInput
                  name="placeholder_ctrl"
                  label={t("showcase.forms.placeholderLabel")}
                  value={placeholder}
                  onChange={(e: any) => setPlaceholder(e.target.value)}
                  onBlur={() => { }}
                />
              )}
              {["text", "password", "datepicker", "timepicker", "toggle"].includes(selectedInput) && (
                <ITSelect
                  name="variant_ctrl"
                  label={t("showcase.forms.colorVariant")}
                  value={variant}
                  onChange={(e: any) => setVariant(e.target.value)}
                  options={[
                    { label: "Primary", value: "primary" },
                    { label: "Secondary", value: "secondary" },
                    { label: "Success", value: "success" },
                    { label: "Danger", value: "danger" },
                    { label: "Warning", value: "warning" },
                    { label: "Info", value: "info" }
                  ]}
                />
              )}
              <ITInput
                name="error_ctrl"
                label={t("showcase.forms.errorMessage")}
                value={errorInput}
                onChange={(e: any) => setErrorInput(e.target.value)}
                onBlur={() => { }}
                placeholder={t("showcase.forms.invalidFormatPlaceholder")}
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{t("showcase.common.required")}</span>
                <ITSlideToggle isOn={required} onToggle={setRequired} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{t("showcase.common.disabled")}</span>
                <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
              </div>
            </>
          )
        }
        gallery={
          selectedInput === "form" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ITInput name="g1" label={t("showcase.forms.inputStandard")} placeholder={t("showcase.forms.enterData")} onChange={() => { }} onBlur={() => { }} />
              <ITInput name="g2" label={t("showcase.forms.inputWithError")} value="Email no válido" error={t("showcase.forms.emailFormatError")} onChange={() => { }} onBlur={() => { }} touched />
              <ITInput name="g3" label={t("showcase.forms.inputDisabled")} placeholder={t("showcase.forms.readOnly")} disabled onChange={() => { }} onBlur={() => { }} />
              <ITInput name="g4" label={t("showcase.forms.inputPassword")} type="password" value="secreto123" onChange={() => { }} onBlur={() => { }} />
            </div>
          ) : undefined
        }
      />
    </div>
  );
};

// 3. ITSelect Showcase
export const SelectShowcase = () => {
  const { t } = useITTranslation();
  const [val, setVal] = useState("");
  const [label, setLabel] = useState(t("showcase.forms.inputSelectLabel"));
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const options = [
    { label: "Administrador Supremo", value: "SUPERADMIN" },
    { label: "Operador de Planta", value: "OPERATOR" },
    { label: "Auditor Externo", value: "AUDITOR" }
  ];

  const code = `<ITSelect\n  name="role"\n  label="${label}"\n  value="${val}"\n  options={[\n    { label: 'Administrador Supremo', value: 'SUPERADMIN' },\n    { label: 'Operador de Planta', value: 'OPERATOR' },\n    { label: 'Auditor Externo', value: 'AUDITOR' }\n  ]}\n  disabled={${disabled}}\n  error=${error ? `"${error}"` : "undefined"}\n  onChange={(e) => setVal(e.target.value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSelect"
      description={t("showcase.forms.selectDesc")}
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITSelect
            name="showcase_select"
            label={label}
            value={val}
            options={options}
            disabled={disabled}
            error={error || undefined}
            onChange={(e: any) => setVal(e.target.value)}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">{t("showcase.forms.selection", { value: val })}</p>
          )}
        </div>
      }
      controls={
        <>
          <ITInput name="label_ctrl" label={t("showcase.common.label")} value={label} onChange={(e: any) => setLabel(e.target.value)} onBlur={() => { }} />
          <ITInput name="err_ctrl" label={t("showcase.forms.errorMessage")} value={error} onChange={(e: any) => setError(e.target.value)} onBlur={() => { }} />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.disabled")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ITSelect name="s1" label={t("showcase.forms.simpleOption")} options={[{ label: "Chile", value: "cl" }]} onChange={() => { }} />
          <ITSelect name="s2" label={t("showcase.forms.selectWithError")} options={[]} error={t("showcase.forms.requiredFieldError2")} touched onChange={() => { }} />
        </div>
      }
    />
  );
};

// 4. ITSearchSelect Showcase
export const SearchSelectShowcase = () => {
  const { t } = useITTranslation();
  const [val, setVal] = useState<any>("");
  const [customVal, setCustomVal] = useState<any>("MX");
  const [clearVal, setClearVal] = useState<any>("ES");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const options = [
    { label: "Argentina", value: "AR", flag: "🇦🇷", region: "Sudamérica" },
    { label: "Brasil", value: "BR", flag: "🇧🇷", region: "Sudamérica" },
    { label: "Colombia", value: "CO", flag: "🇨🇴", region: "Sudamérica" },
    { label: "México", value: "MX", flag: "🇲🇽", region: "Norteamérica" },
    { label: "Perú", value: "PE", flag: "🇵🇪", region: "Sudamérica" },
    { label: "España", value: "ES", flag: "🇪🇸", region: "Europa" }
  ];

  const code = `<ITSearchSelect\n  name="country"\n  label="Seleccionar País"\n  value="${val}"\n  options={[\n    { label: 'Argentina', value: 'AR' },\n    { label: 'Brasil', value: 'BR' },...\n  ]}\n  isLoading={${isLoading}}\n  disabled={${disabled}}\n  onChange={(value) => setVal(value)}\n/>`;

  const customCode = `<ITSearchSelect\n  name="country_custom"\n  label="País (template personalizado)"\n  value="${customVal}"\n  options={countries}\n  onChange={(value) => setCustomVal(value)}\n  renderOption={(option, { isSelected }) => (\n    <div className="flex items-center gap-2">\n      <span>{option.flag}</span>\n      <span className="flex-1">{option.label}</span>\n      <span className="text-xs text-secondary-400">{option.region}</span>\n      {isSelected && <FaCheck className="text-primary-500" size={10} />}\n    </div>\n  )}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSearchSelect"
      description={t("showcase.forms.searchSelectDesc")}
      code={`${code}\n\n${customCode}`}
      demo={
        <div className="w-full max-w-sm">
          <ITSearchSelect
            name="country"
            label={t("showcase.forms.selectCountry")}
            value={val}
            options={options}
            isLoading={isLoading}
            disabled={disabled}
            onChange={(value) => setVal(value)}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">{t("showcase.forms.countrySelected", { value: val })}</p>
          )}
        </div>
      }
      gallery={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full max-w-sm">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {t("showcase.forms.customTemplate")}
            </p>
            <ITSearchSelect
              name="country_custom"
              label={t("showcase.forms.countryCustomLabel")}
              value={customVal}
              options={options}
              onChange={(value) => setCustomVal(value)}
              renderOption={(option, { isSelected }) => (
                <div className="flex items-center gap-2">
                  <span>{option.flag}</span>
                  <span className="flex-1">{option.label}</span>
                  <span className="text-xs text-secondary-400">{option.region}</span>
                  {isSelected && <FaCheck className="text-primary-500" size={10} />}
                </div>
              )}
            />
            <p className="mt-2 text-xs text-slate-500 font-mono">
              {customVal ? t("showcase.forms.countrySelected", { value: customVal }) : t("showcase.common.noSelection")}
            </p>
          </div>

          <div className="w-full max-w-sm">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {t("showcase.forms.clearButton")}
            </p>
            <ITSearchSelect
              name="country_clear"
              label={t("showcase.forms.countryClearable")}
              value={clearVal}
              options={options}
              onChange={(value) => setClearVal(value)}
              onClear={() => setClearVal("")}
            />
            <p className="mt-2 text-xs text-slate-500 font-mono">
              {clearVal ? t("showcase.forms.countrySelected", { value: clearVal }) : t("showcase.common.noSelection")}
            </p>
          </div>
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.forms.loadingState")}</span>
            <ITSlideToggle isOn={isLoading} onToggle={setIsLoading} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.disabled")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 5. ITDatePicker Showcase
export const DatePickerShowcase = () => {
  const { t } = useITTranslation();
  const [val, setVal] = useState<any>(new Date());
  const [range, setRange] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [variant, setVariant] = useState<any>("primary");

  const handleDateChange = (e: any) => {
    setVal(e.target.value);
  };

  const code = `<ITDatePicker\n  name="date"\n  label="Fecha de Auditoría"\n  value={${range ? "dateRange" : "singleDate"}}\n  range={${range}}\n  variant="${variant}"\n  disabled={${disabled}}\n  onChange={(e) => setVal(e.target.value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITDatePicker"
      description={t("showcase.forms.datePickerDesc")}
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITDatePicker
            name="showcase_datepicker"
            label={t("showcase.forms.eventDate")}
            value={val}
            range={range}
            variant={variant}
            disabled={disabled}
            onChange={handleDateChange}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">
              {t("showcase.forms.currentValue")} {range && Array.isArray(val)
                ? t("showcase.forms.rangeValue", { from: val[0]?.toLocaleDateString() || "?", to: val[1]?.toLocaleDateString() || "?" })
                : val instanceof Date
                  ? val.toLocaleDateString()
                  : String(val)
              }
            </p>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="variant_ctrl"
            label={t("showcase.forms.colorTheme")}
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.forms.rangeSelection")}</span>
            <ITSlideToggle isOn={range} onToggle={(r) => { setRange(r); setVal(r ? [new Date(), new Date()] : new Date()); }} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.disabled")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 6. ITTimePicker Showcase
export const TimePickerShowcase = () => {
  const { t } = useITTranslation();
  const [val, setVal] = useState("09:30");
  const [variant, setVariant] = useState<any>("primary");
  const [disabled, setDisabled] = useState(false);

  const code = `<ITTimePicker\n  name="time"\n  label="Hora de Inicio"\n  value="${val}"\n  variant="${variant}"\n  disabled={${disabled}}\n  onChange={(e) => setVal(e.target.value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTimePicker"
      description={t("showcase.forms.timePickerDesc")}
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITTimePicker
            name="showcase_time"
            label={t("showcase.forms.startTime")}
            value={val}
            variant={variant}
            disabled={disabled}
            onChange={(e: any) => setVal(e.target.value)}
            onBlur={() => { }}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">{t("showcase.forms.timeChosen", { value: val })}</p>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="variant_ctrl"
            label={t("showcase.common.variant")}
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
              { label: "Purple", value: "purple" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.disabled")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 7. ITCalendar Showcase
export const CalendarShowcase = () => {
  const { t } = useITTranslation();
  const [mode, setMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectionMode, setSelectionMode] = useState<'single' | 'range'>('single');
  const [calendarVariant, setCalendarVariant] = useState<any>("primary");
  const [events] = useState<any[]>([
    { id: "1", title: "Planificación de Sprint", start: new Date(), end: new Date(new Date().getTime() + 60 * 60 * 1000), color: "#3b82f6" },
    { id: "2", title: "Revisión Técnica", start: new Date(new Date().setDate(new Date().getDate() + 2)), end: new Date(new Date().setDate(new Date().getDate() + 2)), color: "#10b981" }
  ]);

  const code = `<ITCalendar\n  mode="${mode}"\n  selectionMode="${selectionMode}"\n  variant="${calendarVariant}"\n  events={[\n    { id: '1', title: 'Sprint Planning', start: new Date(), end: new Date() }\n  ]}\n  onSlotClick={(date) => alert(date)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITCalendar"
      description={t("showcase.forms.calendarDesc")}
      code={code}
      demo={
        <div className="w-full h-[450px]">
          <ITCalendar
            mode={mode}
            selectionMode={selectionMode}
            variant={calendarVariant}
            events={events}
            onSlotClick={(date) => alert(t("showcase.forms.slotClick", { date: date.toLocaleString() }))}
            onEventClick={(evt) => alert(t("showcase.forms.eventDetail", { title: evt.title }))}
          />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="mode_ctrl"
            label={t("showcase.forms.viewMode")}
            value={mode}
            onChange={(e: any) => setMode(e.target.value)}
            options={[
              { label: "Mes (Month)", value: "month" },
              { label: "Semana (Week)", value: "week" },
              { label: "Día (Day)", value: "day" }
            ]}
          />
          <ITSelect
            name="sel_ctrl"
            label={t("showcase.forms.selectionMode")}
            value={selectionMode}
            onChange={(e: any) => setSelectionMode(e.target.value)}
            options={[
              { label: "Single", value: "single" },
              { label: "Range", value: "range" }
            ]}
          />
          <ITSelect
            name="var_ctrl"
            label={t("showcase.forms.colorVariant")}
            value={calendarVariant}
            onChange={(e: any) => setCalendarVariant(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" }
            ]}
          />
        </>
      }
    />
  );
};

// 8. ITSlideToggle Showcase
export const SlideToggleShowcase = () => {
  const { t } = useITTranslation();
  const [isOn, setIsOn] = useState(false);
  const [activeColor, setActiveColor] = useState<any>("success");
  const [size, setSize] = useState<any>("md");
  const [disabled, setDisabled] = useState(false);

  const code = `<ITSlideToggle\n  isOn={${isOn}}\n  onToggle={(state) => setIsOn(state)}\n  activeColor="${activeColor}"\n  size="${size}"\n  disabled={${disabled}}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSlideToggle"
      description={t("showcase.forms.slideToggleDesc")}
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITSlideToggle
            isOn={isOn}
            onToggle={setIsOn}
            activeColor={activeColor}
            size={size}
            disabled={disabled}
          />
          <span className="text-xs font-mono text-slate-500">
            {t("showcase.forms.stateLabel")} {isOn ? t("showcase.forms.stateOn") : t("showcase.forms.stateOff")}
          </span>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="col_ctrl"
            label={t("showcase.forms.activeColor")}
            value={activeColor}
            onChange={(e: any) => setActiveColor(e.target.value)}
            options={[
              { label: "Success (Verde)", value: "success" },
              { label: "Primary (Azul)", value: "primary" },
              { label: "Danger (Rojo)", value: "danger" },
              { label: "Warning (Naranja)", value: "warning" },
              { label: "Purple (Morado)", value: "purple" }
            ]}
          />
          <ITSelect
            name="sz_ctrl"
            label={t("showcase.common.size")}
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "sm" },
              { label: "Medium", value: "md" },
              { label: "Large", value: "lg" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.forms.disableSwitch")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="flex flex-wrap items-center gap-6">
          <ITSlideToggle initialState={false} size="sm" />
          <ITSlideToggle initialState={true} activeColor="primary" size="md" />
          <ITSlideToggle initialState={true} activeColor="purple" size="lg" />
          <ITSlideToggle initialState={true} disabled size="md" />
        </div>
      }
    />
  );
};

// 9. ITDropfile Showcase
export const DropfileShowcase = () => {
  const { t } = useITTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<any>("pendiente");

  const code = `<ITDropfile\n  onFileSelect={(file) => setSelectedFile(file)}\n  uploadStatus="${status}"\n  showStatusBadge={true}\n/>`;

  return (
    <ShowcaseLayout
      title="ITDropfile"
      description={t("showcase.forms.dropfileDesc")}
      code={code}
      demo={
        <div className="w-full max-w-md">
          <ITDropfile
            onFileSelect={(file) => setSelectedFile(file)}
            uploadStatus={status}
            onStatusChange={(st) => setStatus(st)}
          />
          {selectedFile && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg text-xs font-mono">
              <p>{t("showcase.forms.fileName")} {selectedFile.name}</p>
              <p>{t("showcase.forms.fileSize")} {(selectedFile.size / 1024).toFixed(1)} KB</p>
              <p>{t("showcase.forms.fileType")} {selectedFile.type}</p>
            </div>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="status_ctrl"
            label={t("showcase.forms.forceUploadState")}
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
            options={[
              { label: "Pendiente", value: "pendiente" },
              { label: "Subiendo (Uploading)", value: "subiendo" },
              { label: "Subido (Uploaded)", value: "subido" },
              { label: "Error", value: "error" }
            ]}
          />
        </>
      }
    />
  );
};

// 10. ITWysiwyg Showcase
export const WysiwygShowcase = () => {
  const { t } = useITTranslation();
  const [html, setHtml] = useState(
    "<div>Edita este texto con la <strong>barra de herramientas</strong>.</div><ul><li>Negrita, <em>itálica</em> y <u>subrayado</u></li><li><mark style=\"background-color:#fde68a\">Marcador amarillo</mark></li></ul>"
  );
  const [size, setSize] = useState<any>("md");
  const [error, setError] = useState<string | undefined>(undefined);

  const code = `<ITWysiwyg\n  label="Descripción"\n  value={html}\n  onChange={setHtml}\n  size="${size}"\n  highlightColor="#fde68a"\n/>`;

  return (
    <ShowcaseLayout
      title="ITWysiwyg"
      description={t("showcase.forms.wysiwygDesc")}
      code={code}
      doc={{
        summary:
          "Editor de texto enriquecido formado por una barra de herramientas y un área contentEditable. Toda la lógica de formato es manual sobre la API Selection/Range.",
        description:
          "Soporta bold, italic, underline, marcador amarillo configurable y listas con viñetas/numeradas. Las operaciones togglean envolviendo/desenvolviendo elementos, sin usar document.execCommand.",
        examples: [
          '<ITWysiwyg label="Descripción" value={html} onChange={setHtml} />',
          '<ITWysiwyg size="lg" highlightColor="#fef08a" toolbar={["bold", "ul"]} />',
        ],
        props: [
          { name: "value", type: "string", description: "HTML controlado. Se refleja solo cuando el editor no está enfocado." },
          { name: "onChange", type: "(html: string) => void", description: "Devuelve el HTML del editor al cambiar." },
          { name: "label", type: "string", description: "Texto de etiqueta sobre el editor." },
          { name: "placeholder", type: "string", description: "Texto fantasma cuando el editor está vacío." },
          { name: "error", type: "string", description: "Mensaje de validación (borde/ring en rojo)." },
          { name: "disabled", type: "boolean", default: "false", description: "Deshabilita edición y toolbar." },
          { name: "readOnly", type: "boolean", default: "false", description: "Solo lectura." },
          { name: "size", type: "sm | md | lg", default: "md", description: "Padding y fuente del área editable." },
          { name: "minHeight", type: "number", default: "128", description: "Altura mínima en px del área editable." },
          { name: "highlightColor", type: "string", default: "#fde68a", description: "Color del marcador." },
          { name: "toolbar", type: "ToolbarAction[]", default: "todas", description: "Subconjunto de acciones: bold, italic, underline, highlight, ul, ol, clear." },
        ],
        notes: [
          "Las listas operan por bloques de primer nivel (no dividen selecciones parciales dentro de un bloque).",
          "El pegado se inserta como texto plano (sin HTML externo).",
          "Al estar enfocado el editor, cambios externos del value no se aplican para evitar saltos del cursor.",
        ],
      }}
      demo={
        <div className="w-full max-w-2xl space-y-4">
          <ITWysiwyg
            label={t("showcase.forms.articleContent")}
            value={html}
            onChange={setHtml}
            size={size}
            error={error}
            placeholder={t("showcase.forms.wysiwygPlaceholder")}
          />
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              {t("showcase.forms.generatedHtml")}
            </p>
            <pre className="text-[11px] text-emerald-300 font-mono whitespace-pre-wrap break-words">
              {html}
            </pre>
          </div>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="size_ctrl"
            label={t("showcase.common.size")}
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "sm" },
              { label: "Medium", value: "md" },
              { label: "Large", value: "lg" },
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.forms.forceError")}</span>
            <ITSlideToggle
              isOn={!!error}
              onToggle={(v) => setError(v ? t("showcase.forms.requiredFieldError") : undefined)}
              activeColor="danger"
              size="sm"
            />
          </div>
        </>
      }
    />
  );
};

// 11. ITFormBuilder Showcase
export const FormBuilderShowcase = () => {
  const { t } = useITTranslation();
  const [values, setValues] = useState({
    name: "",
    email: "",
    country: "MX",
    accept: false
  });
  const [submitted, setSubmitted] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const config: any = [
    { name: "name", label: "Nombre Completo", type: "text", required: true, column: 6 },
    { name: "email", label: "Correo de Contacto", type: "email", required: true, column: 6 },
    {
      name: "country",
      label: "País Operación",
      type: "select",
      column: 6,
      options: [
        { label: "México", value: "MX" },
        { label: "Chile", value: "CL" },
        { label: "Perú", value: "PE" }
      ]
    },
    { name: "accept", label: "Acepto términos y condiciones", type: "checkbox", column: 12 }
  ];

  const code = `<ITFormBuilder\n  config={[\n    { name: 'name', label: 'Nombre', type: 'text', required: true },\n    { name: 'email', label: 'Email', type: 'email' },\n    ...\n  ]}\n  values={formValues}\n  handleChange={handleFormChange}\n/>`;

  return (
    <div className="space-y-8">
      <ShowcaseLayout
        title="ITFormBuilder"
        description={t("showcase.forms.formBuilderDesc")}
        doc={{
          summary:
            "Renderiza un grid responsive de inputs a partir de un arreglo de definiciones de campo. Totalmente controlado: delega el estado a Formik (o cualquier holder externo).",
          description:
            "La API V2 (`config`) habilita renderizado condicional (`renderWhen`/`dependsOn`), propiedades dinámicas (`dynamicProps`), campos derivados (`onChangeAction`), carga asíncrona de opciones, secciones anidadas y componentes custom. La API V1 (`fields`) se conserva para compatibilidad y soporta un subconjunto reducido sin reglas ni secciones.",
          examples: [
            `<ITFormBuilder config={[{ name: "email", label: "Email", type: "email", required: true }]} values={formik.values} handleChange={formik.handleChange} handleBlur={formik.handleBlur} touched={formik.touched} errors={formik.errors} setFieldValue={formik.setFieldValue} />`,
            `<ITFormBuilder fields={[{ name: "email", type: "text" }, { name: "pwd", type: "password" }]} values={...} handleChange={...} handleBlur={...} touched={...} errors={...} />`,
          ],
          props: [
            { name: "fields", type: "FieldConfig[]", description: "(V1, legacy) Definiciones de campo. Mantenido por compatibilidad." },
            { name: "config", type: "FieldConfigV2[]", description: "(V2) Definiciones de campo con motor de reglas, secciones y custom. Recomendado." },
            { name: "columns", type: "number", default: "12", description: "Número de columnas del grid responsive (1-12)." },
            { name: "values", type: "Record<string, unknown>", required: true, description: "Valores actuales del formulario, indexados por `name`." },
            { name: "handleChange", type: "(event) => void", required: true, description: "Handler onChange compatible con Formik." },
            { name: "handleBlur", type: "(event) => void", required: true, description: "Handler onBlur compatible con Formik." },
            { name: "touched", type: "Record<string, boolean>", required: true, description: "Estado de touched por campo." },
            { name: "errors", type: "Record<string, string>", required: true, description: "Errores de validación por campo." },
            { name: "setFieldValue", type: "(field, value, shouldValidate?) => Promise", description: "Setter programático de valor (Formik parity). Necesario para V2 `onChangeAction`/`dynamicProps`." },
            { name: "setFieldTouched", type: "(field, touched?, shouldValidate?) => Promise", description: "Setter programático de touched." },
            { name: "setFieldError", type: "(field, message?) => void", description: "Setter programático de error de campo." },
            { name: "isSubmitting", type: "boolean", default: "false", description: "Bandera de submit en curso; expuesta al contexto." },
          ],
          notes: [
            "Cuando se pasan ambos `config` y `fields`, gana `config` (V2).",
            "Si no se pasa `config` ni `fields` el componente renderiza un grid vacío.",
            "El hook `useFormBuilder` debe usarse dentro del subárbol de un `ITFormBuilder` con la API V2 (lanza un error claro fuera del provider).",
            "`validation` y `asyncValidation` NO se ejecutan automáticamente — intégralos con Yup en el Formik padre, o ejecútalos manualmente dentro de `onChangeAction`.",
            "Opciones async (`options: () => Promise<...>`) montan `ITSearchSelect` con un placeholder de spinner mientras cargan.",
          ],
        }}
        code={code}
        demo={
          <div className="w-full max-w-md space-y-6">
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(values); }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm space-y-4"
            >
              <ITFormBuilder
                config={config}
                values={values}
                handleChange={handleChange}
                handleBlur={() => {}}
                touched={{}}
                errors={{}}
                setFieldValue={(field, val) => { setValues(prev => ({ ...prev, [field]: val })); return Promise.resolve(); }}
              />
              <div className="pt-4 flex justify-end gap-3">
                <ITButton variant="outlined" color="gray" size="sm" onClick={() => { setValues({ name: "", email: "", country: "MX", accept: false }); setSubmitted(null); }}>
                  {t("showcase.forms.clear")}
                </ITButton>
                <ITButton variant="filled" color="primary" size="sm" type="submit">
                  {t("showcase.forms.send")}
                </ITButton>
              </div>
            </form>
            {submitted && (
              <div className="p-4 bg-slate-950 text-emerald-400 text-xs rounded-xl border border-slate-800 font-mono">
                <p className="font-bold text-emerald-300 mb-2">{t("showcase.forms.payloadSent")}</p>
                <pre>{JSON.stringify(submitted, null, 2)}</pre>
              </div>
            )}
          </div>
        }
        controls={
          <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs">
            <p className="text-slate-500">{t("showcase.forms.formBuilderHint")}</p>
          </div>
        }
      />

      <CodeExampleBlock
        title={t("showcase.forms.exampleFillTitle")}
        desc={t("showcase.forms.exampleFillDesc")}
        code={`const FormFillFromApi = () => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    setTimeout(() => {
      // Simula fetch de API
      setValues({ name: "Juan Pérez", email: "juan@ejemplo.com", role: "admin" });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit}>
      <ITFormBuilder
        config={[
          { name: "name", label: "Nombre", type: "text", required: true, column: 6 },
          { name: "email", label: "Correo", type: "email", required: true, column: 6 },
          { name: "role", label: "Rol", type: "select", column: 12,
            options: [
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Usuario", value: "user" }
            ]
          }
        ]}
        values={values}
        handleChange={...}
        setFieldValue={...}
      />
    </form>
  );
};`}
      >
        <FormFillFromApi />
      </CodeExampleBlock>

      <CodeExampleBlock
        title={t("showcase.forms.exampleCascadeTitle")}
        desc={t("showcase.forms.exampleCascadeDesc")}
        code={`const config = [
  {
    name: "country", label: "País", type: "select",
    options: [
      { label: "México", value: "MX" },
      { label: "España", value: "ES" },
      { label: "Colombia", value: "CO" }
    ],
    onChangeAction: (val, { setFieldValue }) => {
      setFieldValue("city", ""); // limpia ciudad al cambiar país
    }
  },
  {
    name: "city", label: "Ciudad", type: "select",
    options: async () => {
      const cities = {
        MX: [
          { value: "CDMX", label: "Ciudad de México" },
          { value: "GDL", label: "Guadalajara" },
          { value: "MTY", label: "Monterrey" }
        ],
        ES: [
          { value: "MAD", label: "Madrid" },
          { value: "BCN", label: "Barcelona" },
          { value: "SEV", label: "Sevilla" }
        ],
        CO: [
          { value: "BOG", label: "Bogotá" },
          { value: "MED", label: "Medellín" },
          { value: "CAL", label: "Cali" }
        ]
      };
      await new Promise(r => setTimeout(r, 800));
      return cities[country] || [];
    }
  }
];`}
      >
        <CascadingSelectsExample />
      </CodeExampleBlock>

      <CodeExampleBlock
        title={t("showcase.forms.exampleCurrencyTitle")}
        desc={t("showcase.forms.exampleCurrencyDesc")}
        code={`const CurrencyConverterExample = () => {
  const [values, setValues] = useState({ currency: "MXN", amount: 1000 });
  const TC = 20.50;

  const config = [
    {
      name: "currency", label: "Moneda", type: "select", column: 6,
      options: [
        { label: "MXN - Peso Mexicano", value: "MXN" },
        { label: "USD - Dólar Americano", value: "USD" }
      ]
    },
    {
      name: "amount", label: "Cantidad", type: "number", column: 6,
      currencyFormat: true
    }
  ];

  const converted = values.currency === "MXN"
    ? { mxn: values.amount, usd: values.amount / TC }
    : { mxn: values.amount * TC, usd: values.amount };

  return (
    <>
      <ITFormBuilder config={config} values={values} setFieldValue={...} />
      <div className="grid grid-cols-2 gap-4">
        <div>MXN: {converted.mxn}</div>
        <div>USD: {converted.usd}</div>
      </div>
    </>
  );
};`}
      >
        <CurrencyConverterExample />
      </CodeExampleBlock>
    </div>
  );
};

// ── Fill from API example ──
const FormFillFromApi = () => {
  const { t } = useITTranslation();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({ name: "", email: "", role: "" });
  const [submitted, setSubmitted] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValues({ name: "Juan Pérez", email: "juan@ejemplo.com", role: "admin" });
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const config: any = [
    { name: "name", label: "Nombre", type: "text", required: true, column: 6 },
    { name: "email", label: "Correo", type: "email", required: true, column: 6 },
    {
      name: "role", label: "Rol", type: "select", column: 12,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Usuario", value: "user" }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-8 justify-center">
        <FaSync className="animate-spin text-primary-500" />
        <span className="text-sm text-slate-500">{t("showcase.forms.loadingUserData")}</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(values); }} className="space-y-4">
        <ITFormBuilder
          config={config}
          values={values}
          handleChange={handleChange}
          handleBlur={() => {}}
          touched={{}}
          errors={{}}
          setFieldValue={(field, val) => { setValues(prev => ({ ...prev, [field]: val })); return Promise.resolve(); }}
        />
        <div className="flex justify-end">
          <ITButton variant="filled" color="primary" size="sm" type="submit">{t("showcase.forms.saveChanges")}</ITButton>
        </div>
      </form>
      {submitted && (
        <div className="p-3 bg-slate-950 text-emerald-400 text-xs rounded-lg font-mono border border-slate-800">
          <p className="font-bold mb-1">{t("showcase.forms.editedPayload")}</p>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// ── Cascading Selects Example ──
const CascadingSelectsExample = () => {
  const { t } = useITTranslation();
  const [values, setValues] = useState({ country: "", city: "" });
  const [submitted, setSubmitted] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const config: any = [
    {
      name: "country", label: "País", type: "select", required: true, column: 6,
      options: [
        { label: "México", value: "MX" },
        { label: "España", value: "ES" },
        { label: "Colombia", value: "CO" }
      ],
      onChangeAction: (val: any, { setFieldValue }: any) => {
        setFieldValue("city", "");
      }
    },
    {
      name: "city", label: "Ciudad", type: "select", required: true, column: 6,
      options: async () => {
        const cities: Record<string, { value: string; label: string }[]> = {
          MX: [
            { value: "CDMX", label: "Ciudad de México" },
            { value: "GDL", label: "Guadalajara" },
            { value: "MTY", label: "Monterrey" }
          ],
          ES: [
            { value: "MAD", label: "Madrid" },
            { value: "BCN", label: "Barcelona" },
            { value: "SEV", label: "Sevilla" }
          ],
          CO: [
            { value: "BOG", label: "Bogotá" },
            { value: "MED", label: "Medellín" },
            { value: "CAL", label: "Cali" }
          ]
        };
        await new Promise(r => setTimeout(r, 800));
        return cities[values.country] || [];
      }
    }
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(values); }} className="space-y-4">
        <ITFormBuilder
          config={config}
          values={values}
          handleChange={handleChange}
          handleBlur={() => {}}
          touched={{}}
          errors={{}}
          setFieldValue={(field, val) => { setValues(prev => ({ ...prev, [field]: val })); return Promise.resolve(); }}
        />
        <div className="flex justify-end">
          <ITButton variant="filled" color="primary" size="sm" type="submit">{t("showcase.forms.send")}</ITButton>
        </div>
      </form>
      {submitted && (
        <div className="p-3 bg-slate-950 text-emerald-400 text-xs rounded-lg font-mono border border-slate-800">
          <p className="font-bold mb-1">{t("showcase.forms.dataPayload")}</p>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// ── Currency Converter Example ──
const CurrencyConverterExample = () => {
  const { t } = useITTranslation();
  const [values, setValues] = useState({ currency: "MXN", amount: 1000 });
  const TC = 20.50;

  const config: any = [
    {
      name: "currency", label: "Moneda", type: "select", required: true, column: 6,
      options: [
        { label: "MXN - Peso Mexicano", value: "MXN" },
        { label: "USD - Dólar Americano", value: "USD" }
      ]
    },
    {
      name: "amount", label: "Cantidad", type: "number", required: true, column: 6,
      currencyFormat: true
    }
  ];

  const converted = values.currency === "MXN"
    ? { mxn: values.amount, usd: values.amount / TC }
    : { mxn: values.amount * TC, usd: values.amount };

  return (
    <div className="w-full max-w-md space-y-4">
      <ITFormBuilder
        config={config}
        values={values}
        handleChange={() => {}}
        handleBlur={() => {}}
        touched={{}}
        errors={{}}
        setFieldValue={(field, val) => { setValues(prev => ({ ...prev, [field]: val })); return Promise.resolve(); }}
      />
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">MXN</p>
          <p className="text-xl font-bold text-emerald-900 dark:text-emerald-200 font-mono">
            {converted.mxn.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">USD</p>
          <p className="text-xl font-bold text-blue-900 dark:text-blue-200 font-mono">
            {converted.usd.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </p>
        </div>
      </div>
      {values.amount > 0 && (
        <p className="text-[11px] text-slate-400 text-center">
          {t("showcase.forms.exchangeRate", { rate: TC.toFixed(2) })}
        </p>
      )}
    </div>
  );
};

// 12. ITField Showcase
export const FieldShowcase = () => {
  const { t } = useITTranslation();
  const [email, setEmail] = useState("");
  const [showHelp, setShowHelp] = useState(true);
  const invalid = email.length > 0 && !email.includes("@");

  const code = `<ITField\n  label="Correo"\n  htmlFor="email"\n  required\n  error={${invalid ? '"Ingresa un correo válido."' : "undefined"}}\n  helpText="Nunca compartimos tu correo."\n>\n  <ITInput name="email" value="${email}" onChange={(e) => setEmail(e.target.value)} />\n</ITField>`;

  return (
    <ShowcaseLayout
      title="ITField"
      description={t("showcase.forms.fieldDesc")}
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITField
            label={t("showcase.forms.emailSubject")}
            htmlFor="email"
            required
            error={invalid ? t("showcase.forms.invalidEmail") : undefined}
            helpText={showHelp ? t("showcase.forms.emailHelp") : undefined}
          >
            <ITInput name="email" value={email} onChange={(e: any) => setEmail(e.target.value)} onBlur={() => {}} />
          </ITField>
        </div>
      }
      controls={
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">{t("showcase.forms.showHelp")}</span>
          <ITSlideToggle isOn={showHelp} onToggle={setShowHelp} size="sm" />
        </div>
      }
      doc={{
        summary: "Wrapper que unifica label, requerido, ayuda y error para cualquier control.",
        examples: [
          '<ITField label="Email" htmlFor="email" required error={errors.email} helpText="...">',
          '  <ITInput name="email" value={email} onChange={onChange} />',
          '</ITField>',
        ],
        props: [
          { name: "label", type: "string", description: "Etiqueta sobre el control." },
          { name: "htmlFor", type: "string", description: "id del control (htmlFor)." },
          { name: "required", type: "boolean", default: "false", description: "Muestra asterisco rojo." },
          { name: "error", type: "string | boolean", description: "Mensaje de error o true para el genérico." },
          { name: "helpText", type: "string", description: "Texto de ayuda si no hay error." },
          { name: "children", type: "ReactNode", required: true, description: "El control del formulario." },
        ],
        notes: ["El error tiene prioridad sobre helpText; solo se muestra uno."],
      }}
    />
  );
};

// 13. ITMultiSelect Showcase
export const MultiSelectShowcase = () => {
  const { t } = useITTranslation();
  const [value, setValue] = useState<(string | number)[]>(["mx", "es"]);

  const options = [
    { value: "mx", label: "México" },
    { value: "es", label: "España" },
    { value: "co", label: "Colombia" },
    { value: "ar", label: "Argentina" },
    { value: "pe", label: "Perú" },
    { value: "cl", label: "Chile" },
  ];

  const code = `<ITMultiSelect\n  label="Países"\n  options={countries}\n  value={[${value.map((v) => `'${v}'`).join(", ")}]}\n  onChange={(values) => setValue(values)}\n  maxVisibleChips={3}\n/>`;

  return (
    <ShowcaseLayout
      title="ITMultiSelect"
      description={t("showcase.forms.multiSelectDesc")}
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITMultiSelect
            label={t("showcase.forms.countries")}
            options={options}
            value={value}
            onChange={(values) => setValue(values)}
            maxVisibleChips={3}
          />
          <p className="mt-2 text-xs text-slate-500 font-mono">
            {t("showcase.forms.selectedCount", { count: value.length, values: JSON.stringify(value) })}
          </p>
        </div>
      }
      controls={
        <div className="space-y-2">
          <p className="text-xs text-slate-500">
            {t("showcase.forms.multiSelectHint")}
          </p>
        </div>
      }
      gallery={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full max-w-sm">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{t("showcase.forms.optionTemplate")}</p>
            <ITMultiSelect
              label="Skills (template)"
              options={options}
              value={value}
              onChange={(values) => setValue(values)}
              renderOption={(option, { isSelected }) => (
                <span className={isSelected ? "font-bold" : ""}>{option.label}</span>
              )}
            />
          </div>
          <div className="w-full max-w-sm">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{t("showcase.forms.withError")}</p>
            <ITMultiSelect
              label={t("showcase.common.required")}
              options={options}
              value={[]}
              onChange={() => {}}
              required
              touched
              error
            />
          </div>
        </div>
      }
      doc={{
        summary: "Select múltiple con búsqueda, chips removibles y navegación por teclado.",
        examples: [
          '<ITMultiSelect label="Skills" options={skills} value={selected} onChange={setSelected} />',
          '<ITMultiSelect options={opts} value={v} onChange={setV} renderOption={(o, { isSelected }) => ...} />',
        ],
        props: [
          { name: "options", type: "ITMultiSelectOption[]", required: true, description: "Opciones { label, value, ...custom }." },
          { name: "value", type: "(string | number)[]", required: true, description: "Valores seleccionados (controlado)." },
          { name: "onChange", type: "(values, options) => void", description: "Devuelve los valores seleccionados." },
          { name: "label", type: "string", description: "Etiqueta del control." },
          { name: "placeholder", type: "string", default: '"Selecciona opciones"', description: "Texto cuando está vacío." },
          { name: "maxVisibleChips", type: "number", default: "3", description: "Chips visibles antes de +N." },
          { name: "clearable", type: "boolean", default: "true", description: "Botón de limpiar (X)." },
          { name: "searchable", type: "boolean", default: "true", description: "Habilita el input de búsqueda." },
          { name: "onSearch", type: "(query) => void", description: "Búsqueda remota." },
          { name: "renderOption", type: "(option, state) => ReactNode", description: "Plantilla de opción." },
          { name: "error", type: "string | boolean", description: "Estado de error." },
        ],
        notes: [
          "role=combobox + listbox con aria-multiselectable.",
          "Backspace con input vacío elimina el último chip.",
        ],
      }}
    />
  );
};

// 14. ITChipInput Showcase
export const ChipInputShowcase = () => {
  const { t } = useITTranslation();
  const [tags, setTags] = useState<string[]>(["react", "typescript"]);
  const [maxTags, setMaxTags] = useState(5);

  const code = `<ITChipInput\n  label="Etiquetas"\n  value={[${tags.map((t) => `'${t}'`).join(", ")}]}\n  onChange={setTags}\n  maxTags={${maxTags}}\n  placeholder="Agrega una etiqueta..."\n/>`;

  return (
    <ShowcaseLayout
      title="ITChipInput"
      description={t("showcase.forms.chipInputDesc")}
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITChipInput
            label={t("showcase.forms.tags")}
            value={tags}
            onChange={setTags}
            maxTags={maxTags}
            placeholder={t("showcase.forms.addTagPlaceholder")}
            helpText={t("showcase.forms.chipInputHelp")}
          />
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.map((t) => (
              <ITBadget key={t} label={t} color="primary" size="sm" />
            ))}
          </div>
        </div>
      }
      controls={
        <ITInput
          name="maxTags"
          label={t("showcase.forms.maxTags")}
          type="number"
          value={maxTags}
          onChange={(e: any) => setMaxTags(Number(e.target.value) || 0)}
          onBlur={() => {}}
        />
      }
      doc={{
        summary: "Input que convierte texto en etiquetas (chips) removibles con validación.",
        examples: [
          '<ITChipInput label="Etiquetas" value={tags} onChange={setTags} />',
          '<ITChipInput value={emails} onChange={setEmails} validate={(v) => isEmail(v) ? undefined : "Correo inválido"} />',
        ],
        props: [
          { name: "value", type: "string[]", required: true, description: "Etiquetas actuales (controlado)." },
          { name: "onChange", type: "(values: string[]) => void", description: "Devuelve las etiquetas." },
          { name: "delimiters", type: "string[]", default: '["Enter", ","]', description: "Teclas que confirman una etiqueta." },
          { name: "maxTags", type: "number", description: "Máximo de etiquetas." },
          { name: "allowDuplicates", type: "boolean", default: "false", description: "Permite duplicados." },
          { name: "validate", type: "(value) => string | undefined", description: "Rechaza una etiqueta con mensaje." },
          { name: "color", type: "ColorsTypes", default: '"primary"', description: "Color de los chips." },
          { name: "error", type: "string | boolean", description: "Estado de error." },
        ],
        notes: ["Backspace en input vacío elimina la última etiqueta."],
      }}
    />
  );
};

// 15. ITMaskedInput Showcase
const MaskedDemo = ({
  title,
  mask,
  pattern,
  hint,
  initial,
}: {
  title: string;
  mask: string;
  pattern?: RegExp;
  hint?: string;
  initial?: string;
}) => {
  const { t } = useITTranslation();
  const [raw, setRaw] = useState<string>(initial ?? "");
  const [complete, setComplete] = useState<string | null>(null);
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-700 mb-2">{title}</h4>
      <ITMaskedInput
        name={title.toLowerCase().replace(/\s+/g, "_")}
        label={mask}
        mask={mask}
        pattern={pattern}
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value);
          setComplete(null);
        }}
        onComplete={(v) => setComplete(v)}
      />
      <p className="mt-1.5 text-xs font-mono text-slate-500">
        {t("showcase.forms.rawLabel")} {raw || t("showcase.forms.emptyValue")}
        {complete && <span className="text-emerald-600 ml-2">{t("showcase.forms.completeValue")}</span>}
        {hint && <span className="text-slate-400 ml-2">· {hint}</span>}
      </p>
    </div>
  );
};

export const MaskedInputShowcase = () => {
  const { t } = useITTranslation();
  const [code, setCode] = useState<string>("");
  const [variant, setVariant] = useState<any>("primary");
  const [size, setSize] = useState<any>("md");
  const [disabled, setDisabled] = useState(false);
  const [withError, setWithError] = useState(false);

  const codeExample = `<ITMaskedInput\n  name="code"\n  label="Código de activación"\n  mask="xxxx-xxxx-xxxx"\n  variant="${variant}"\n  size="${size}"\n  disabled={${disabled}}\n  onChange={(e) => setCode(e.target.value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITMaskedInput"
      description={t("showcase.forms.maskedInputDesc")}
      code={codeExample}
      demo={
        <div className="w-full max-w-sm">
          <ITMaskedInput
            name="showcase_masked"
            label={t("showcase.forms.activationCode")}
            mask="xxxx-xxxx-xxxx"
            value={code}
            variant={variant}
            size={size}
            disabled={disabled}
            error={withError}
            onChange={(e) => setCode(e.target.value)}
          />
          {code && (
            <p className="mt-2 text-xs text-slate-500 font-mono">
              {t("showcase.forms.currentRawValue")} {code || "—"}
            </p>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="masked_variant_ctrl"
            label={t("showcase.forms.colorTheme")}
            value={variant}
            onChange={(e: any) => setVariant(e.target.value)}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Success", value: "success" },
              { label: "Danger", value: "danger" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
            ]}
          />
          <ITSelect
            name="masked_size_ctrl"
            label={t("showcase.common.size")}
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "sm" },
              { label: "Medium", value: "md" },
              { label: "Large", value: "lg" },
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.disabled")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.error")}</span>
            <ITSlideToggle isOn={withError} onToggle={setWithError} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <MaskedDemo
            title={t("showcase.forms.maskAlphanumeric")}
            mask="xxxx-xxxx-xxxx"
            hint="Escribe: ABC1-2345"
          />
          <MaskedDemo
            title={t("showcase.forms.maskCardNumber")}
            mask="9999-9999-9999-9999"
            hint="Escribe 16 dígitos"
          />
          <MaskedDemo
            title={t("showcase.forms.maskPhone")}
            mask="(999) 999-9999"
            pattern={/^\d{10}$/}
            hint="Regex /^\\d{10}$/"
          />
          <MaskedDemo
            title={t("showcase.forms.maskPostalCode")}
            mask="99999"
            hint="Ejemplo: 44100"
          />
          <MaskedDemo
            title={t("showcase.forms.maskCvv")}
            mask="999"
            hint="3 dígitos, onComplete"
          />
          <MaskedDemo
            title={t("showcase.forms.maskUppercase")}
            mask="A-A-A-999"
            hint="Token A auto-mayúscula"
            initial="ABC123"
          />
        </div>
      }
      doc={{
        summary: "Input con máscara: value/onChange entregan solo los caracteres útiles y los separadores se auto-insertan.",
        description:
          "Define el patrón con tokens (9=dígito, A=letra mayúscula, a=letra, x=alfanumérico, *=cualquiera) y literales (todo lo demás). Los huecos vacíos se pintan con placeholderChar ('_').",
        examples: [
          '<ITMaskedInput name="code" mask="xxxx-xxxx-xxxx" onChange={(e) => setCode(e.target.value)} />',
          '<ITMaskedInput name="phone" mask="(999) 999-9999" pattern={/^\\d{10}$/} onChange={setPhone} />',
          '<ITMaskedInput name="card" mask="9999-9999-9999-9999" onComplete={validateCard} />',
        ],
        props: [
          { name: "mask", type: "string", required: true, description: "Patrón de la máscara (tokens + literales)." },
          { name: "value", type: "string", description: "Valor limpio (raw): solo caracteres útiles." },
          { name: "onChange", type: "(e) => void", description: "e.target.value = raw sin separadores." },
          { name: "onComplete", type: "(value) => void", description: "Dispara al llenar toda la máscara." },
          { name: "pattern", type: "RegExp", description: "Validación full-match del raw en blur." },
          { name: "placeholderChar", type: "string", default: '"_"', description: "Relleno de slots vacíos." },
          { name: "variant", type: "ColorsTypes", default: '"primary"', description: "Color de acento." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamaño del input." },
          { name: "error", type: "string | boolean", description: "Estado de error." },
        ],
        notes: [
          "Los tokens A guardan letras en mayúsculas automáticamente.",
          "Borrar un separador lo vuelve a insertar; el cursor se conserva en la posición correcta.",
          "El cursor se preserva también al editar en medio de la máscara.",
        ],
      }}
    />
  );
};

// 17. ITSegmentedControl Showcase
export const SegmentedControlShowcase = () => {
  const { t } = useITTranslation();
  const [view, setView] = useState("day");
  const [size, setSize] = useState<any>("md");
  const [disabled, setDisabled] = useState(false);
  const [withIcons, setWithIcons] = useState(false);

  const options = withIcons
    ? [
        { value: "day", label: "Día", icon: <FaCheck size={10} /> },
        { value: "week", label: "Semana", icon: <FaCalendar size={10} /> },
        { value: "month", label: "Mes", icon: <FaSave size={10} /> },
      ]
    : [
        { value: "day", label: "Día" },
        { value: "week", label: "Semana" },
        { value: "month", label: "Mes" },
      ];

  const code = `<ITSegmentedControl\n  options={[\n    { value: "day", label: "Día" },\n    { value: "week", label: "Semana" },\n    { value: "month", label: "Mes" },\n  ]}\n  value="${view}"\n  onChange={(value) => setView(value)}\n  size="${size}"\n  disabled={${disabled}}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSegmentedControl"
      description={t("showcase.forms.segmentedDesc")}
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITSegmentedControl
            options={options}
            value={view}
            onChange={setView}
            size={size}
            disabled={disabled}
          />
          <span className="text-xs font-mono text-slate-500">{t("showcase.forms.selectedValue", { value: view })}</span>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="seg_size_ctrl"
            label={t("showcase.common.size")}
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "sm" },
              { label: "Medium", value: "md" },
            ]}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.forms.withIcons")}</span>
            <ITSlideToggle isOn={withIcons} onToggle={setWithIcons} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.disabled")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="flex flex-wrap items-center gap-6">
          <ITSegmentedControl
            options={[
              { value: "list", label: "List" },
              { value: "grid", label: "Grid" },
            ]}
            value="list"
            onChange={() => {}}
            size="sm"
          />
          <ITSegmentedControl
            options={[
              { value: "light", label: "☀️" },
              { value: "dark", label: "🌙" },
              { value: "system", label: "💻" },
            ]}
            value="dark"
            onChange={() => {}}
            size="sm"
          />
          <ITSegmentedControl
            options={[
              { value: "a", label: "Activo" },
              { value: "b", label: "Inactivo" },
            ]}
            value="a"
            onChange={() => {}}
            disabled
          />
        </div>
      }
      doc={{
        summary:
          "Control segmentado: una sola opción activa a la vez. Útil para alternar vistas (lista/grid), rangos (día/semana/mes) o filtros.",
        description:
          "Componente totalmente controlado: recibe el valor activo vía value y notifica los cambios vía onChange.",
        examples: [
          '<ITSegmentedControl options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }]} value={view} onChange={setView} />',
          '<ITSegmentedControl size="sm" options={[{ value: "list", label: "List", icon: <FaList /> }, { value: "grid", label: "Grid", icon: <FaTh /> }]} value={view} onChange={setView} />',
        ],
        props: [
          { name: "options", type: "ISegmentedOption[]", required: true, description: "Opciones excluyentes { value, label, icon? }." },
          { name: "value", type: "string", required: true, description: "Valor de la opción activa." },
          { name: "onChange", type: "(value: string) => void", required: true, description: "Se dispara al elegir otra opción." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "Tamaño del control." },
          { name: "className", type: "string", description: "Clases adicionales en el contenedor." },
          { name: "disabled", type: "boolean", default: "false", description: "Deshabilita todas las opciones." },
        ],
        notes: [
          "Solo una opción puede estar activa; es mutuamente excluyente por diseño.",
          "Cada opción acepta un icon opcional junto al label.",
          "No expone roles ARIA de radiogroup: si se usa en un formulario accesible habría que agregarlos.",
        ],
      }}
    />
  );
};

// 18. ITInputNumber Showcase
export const InputNumberShowcase = () => {
  const { t } = useITTranslation();
  const [amount, setAmount] = useState<number | null>(1234.5);
  const [quantity, setQuantity] = useState<number | null>(3);
  const [decimals, setDecimals] = useState<any>("2");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [showError, setShowError] = useState(false);

  const code = `<ITInputNumber\n  name="amount"\n  label="Monto"\n  value={${amount === null ? "null" : amount}}\n  prefix="$"\n  decimals={${decimals}}\n  disabled={${disabled}}\n  required={${required}}\n  onChange={(value) => setAmount(value)}\n/>

// El valor que recibes ya es un number (o undefined si está vacío):
onChange={(value) => console.log(value + 1)} // ${amount === null ? "undefined" : amount + 1}`;

  return (
    <ShowcaseLayout
      title="ITInputNumber"
      description={t("showcase.forms.inputNumberDesc")}
      code={code}
      demo={
        <div className="w-full max-w-sm space-y-3">
          <ITInputNumber
            name="amount"
            label={t("showcase.forms.amount")}
            placeholder="0.00"
            prefix="$"
            value={amount}
            onChange={setAmount}
            decimals={Number(decimals)}
            disabled={disabled}
            required={required}
            touched={showError}
            error={showError ? t("showcase.forms.amountRequired") : undefined}
          />
          <p className="text-xs font-mono text-slate-500">
            {t("showcase.forms.valueLabel")} {amount === null ? "null" : `${amount} (${typeof amount})`}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <ITInputNumber
              name="quantity"
              label={t("showcase.forms.quantityIntegers")}
              value={quantity}
              decimals={0}
              min={1}
              max={99}
              onChange={setQuantity}
            />
            <ITInputNumber
              name="bounded"
              label={t("showcase.forms.between10And500")}
              min={10}
              max={500}
              value={null}
              onChange={() => {}}
            />
          </div>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="in_decimals"
            label={t("showcase.forms.decimals")}
            value={decimals}
            onChange={(e: any) => setDecimals(e.target.value)}
            options={[
              { label: "0 (enteros)", value: "0" },
              { label: "1 decimal", value: "1" },
              { label: "2 decimales", value: "2" },
            ]}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.required")}</span>
            <ITSlideToggle isOn={required} onToggle={setRequired} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.forms.simulateError")}</span>
            <ITSlideToggle isOn={showError} onToggle={setShowError} activeColor="danger" size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{t("showcase.common.disabled")}</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full max-w-sm">
            <ITInputNumber
              name="g_amount"
              label={t("showcase.forms.prefixDollar")}
              prefix="$"
              value={98765.43}
              readOnly
              onChange={() => {}}
            />
          </div>
          <div className="w-full max-w-sm">
            <ITInputNumber
              name="g_price"
              label={t("showcase.forms.unitPrice")}
              prefix="$"
              value={null}
              onChange={() => {}}
            />
          </div>
          <div className="w-full max-w-sm">
            <ITInputNumber
              name="g_qty"
              label={t("showcase.forms.quantityDecimals0")}
              decimals={0}
              value={12}
              onChange={() => {}}
            />
          </div>
          <div className="w-full max-w-sm">
            <ITInputNumber
              name="g_disabled"
              label={t("showcase.common.disabled")}
              prefix="$"
              value={1500}
              disabled
              onChange={() => {}}
            />
          </div>
        </div>
      }
      doc={{
        summary:
          "Input numérico con formato de moneda: agrupa miles, fija decimales y entrega un number en onChange/onBlur.",
        description:
          "Es un ITInput especializado (misma label, validación, tamaños e iconos). La diferencia es que siempre formatea con currencyFormat y parsea el valor antes de emitirlo, así no hay que hacer parseFloat en el consumidor.",
        examples: [
          '<ITInputNumber name="amount" label="Monto" prefix="$" value={amount} onChange={(value) => setAmount(value)} />',
          '<ITInputNumber name="qty" label="Cantidad" decimals={0} min={1} max={99} value={qty} onChange={setQty} />',
          '<ITInputNumber name="total" label="Total" value={total} onChange={(value) => setTotal((value ?? 0) + 1)} />',
        ],
        props: [
          { name: "name", type: "string", required: true, description: "Nombre del campo." },
          { name: "value", type: "number | null", description: "Valor numérico actual." },
          { name: "onChange", type: "(value, event) => void", required: true, description: "Recibe el number parseado (undefined si está vacío)." },
          { name: "onBlur", type: "(value, event) => void", description: "Recibe el number parseado y clampeado a min/max." },
          { name: "decimals", type: "number", default: "2", description: "Decimales permitidos; 0 = solo enteros." },
          { name: "prefix", type: "string", description: "Prefijo dentro del campo (ej. \"$\"). Se ignora si hay iconLeft." },
          { name: "min", type: "number", description: "Valor mínimo; se ajusta al salir del campo." },
          { name: "max", type: "number", description: "Valor máximo; se ajusta al salir del campo." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamaño del campo." },
          { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el campo." },
          { name: "readOnly", type: "boolean", default: "false", description: "Modo solo lectura." },
          { name: "required", type: "boolean", default: "false", description: "Marca el campo como requerido." },
          { name: "touched", type: "boolean", description: "Indica que el campo fue tocado." },
          { name: "error", type: "string | boolean", description: "Error de validación (true = mensaje genérico)." },
          { name: "iconLeft / iconRight", type: "ReactNode", description: "Iconos dentro del campo." },
        ],
        notes: [
          "El valor emitido ya es un number; ya no hace falta parseFloat.",
          "Formatea en blur (miles + decimales) y muestra crudo mientras escribes.",
          "Usa decimals={0} para forzar enteros.",
          "min/max se aplican al salir del campo (clamp), no mientras escribes.",
        ],
      }}
    />
  );
};
