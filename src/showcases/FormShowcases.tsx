import React, { useState, useEffect, useMemo } from "react";
import { FaSync } from "react-icons/fa";
import {
  ITButton,
  ITInput,
  ITSelect,
  ITSearchSelect,
  ITDatePicker,
  ITTimePicker,
  ITCalendar,
  ITSlideToggle,
  ITDropfile,
  ITFormBuilder,
  UploadStatus
} from "../index";
import { ShowcaseLayout } from "./ShowcaseLayout";

// 1. ITButton Showcase
export const ButtonShowcase = () => {
  const [color, setColor] = useState<any>("primary");
  const [size, setSize] = useState<any>("medium");
  const [variant, setVariant] = useState<any>("filled");
  const [disabled, setDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const code = `<ITButton\n  label="Hacer Click"\n  color="${color}"\n  size="${size}"\n  variant="${variant}"\n  disabled={${disabled}}\n  onClick={() => console.log('Click!')}\n/>`;

  return (
    <ShowcaseLayout
      title="ITButton"
      description="Botón premium con soporte completo de variantes, colores del tema y estados."
      code={code}
      demo={
        <div className="flex flex-col items-center gap-3">
          <ITButton
            label="Hacer Click"
            color={color}
            size={size}
            variant={variant}
            disabled={disabled}
            onClick={() => setClickCount(c => c + 1)}
          />
          {clickCount > 0 && (
            <span className="text-xs font-mono text-slate-500 animate-pulse">
              Clicks registrados: {clickCount}
            </span>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="color"
            label="Color"
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
            label="Tamaño"
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
            label="Variante"
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
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-3">Variantes</h4>
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
            <h4 className="text-sm font-bold text-slate-700 mb-3">Colores Semánticos</h4>
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

  const [label, setLabel] = useState("Nombre de Usuario");
  const [placeholder, setPlaceholder] = useState("Escribe tu apodo...");
  const [variant, setVariant] = useState<any>("primary");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  const [formVariant, setFormVariant] = useState<any>("primary");
  const [formDisabled, setFormDisabled] = useState(false);
  const [showFormErrors, setShowFormErrors] = useState(false);

  const formErrors = showFormErrors ? {
    name: "El nombre es obligatorio",
    email: "Formato de correo no válido",
    password: "La contraseña es muy corta",
    role: "Debes elegir un rol administrativo",
    country: "Debes elegir tu país de residencia",
    birthday: "Fecha incorrecta",
    meetingTime: "Hora no permitida",
    file: "Debes adjuntar un archivo"
  } : {} as any;

  useEffect(() => {
    if (selectedInput !== "form") {
      const DEFAULT_PROPS: Record<string, { label: string; placeholder: string }> = {
        text: { label: "Nombre de Usuario", placeholder: "Escribe tu apodo..." },
        password: { label: "Contraseña", placeholder: "Introduce tu clave..." },
        select: { label: "Rol Administrativo", placeholder: "Selecciona un rol" },
        searchselect: { label: "País de Origen", placeholder: "Buscar país..." },
        datepicker: { label: "Fecha de Registro", placeholder: "Elige una fecha" },
        timepicker: { label: "Hora de Turno", placeholder: "Elige una hora" },
        toggle: { label: "Habilitar Notificaciones", placeholder: "" },
        dropfile: { label: "Subir Documento", placeholder: "" }
      };
      const defaults = DEFAULT_PROPS[selectedInput];
      if (defaults) {
        setLabel(defaults.label);
        setPlaceholder(defaults.placeholder);
      }
    }
  }, [selectedInput]);

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
  }, [selectedInput, label, placeholder, variant, disabled, required, errorInput, textVal, passVal, selectVal, searchSelectVal, dateVal, timeVal, toggleVal, fileVal]);

  const tabs = [
    { id: "text", label: "Texto" },
    { id: "password", label: "Contraseña" },
    { id: "select", label: "Select" },
    { id: "searchselect", label: "SearchSelect" },
    { id: "datepicker", label: "DatePicker" },
    { id: "timepicker", label: "TimePicker" },
    { id: "toggle", label: "SlideToggle" },
    { id: "dropfile", label: "Dropfile" },
    { id: "form", label: "Formulario" }
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
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label || "Toggle Switch"}</span>
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
                label="Nombre Completo"
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
                label="Correo Electrónico"
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
                label="Contraseña"
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
                label="Rol de Usuario"
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
                label="País de Residencia"
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
                label="Fecha de Nacimiento"
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
                label="Hora de Entrada"
                value={formData.meetingTime}
                onChange={(e: any) => setFormData(prev => ({ ...prev, meetingTime: e.target.value }))}
                variant={formVariant}
                disabled={formDisabled}
                required={true}
                error={formErrors.meetingTime}
                touched={showFormErrors ? true : undefined}
              />
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl h-[64px]">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Recibir Boletín</span>
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
              <ITButton label="Enviar Formulario" color={formVariant} type="submit" disabled={formDisabled} />
            </div>

            {submittedData && (
              <div className="mt-4 p-4 bg-slate-950 text-emerald-400 font-mono text-[10px] sm:text-xs rounded-xl border border-slate-800">
                <p className="font-bold mb-2">✓ Submit Data (JSON):</p>
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
            ? "Formulario unificado con todos los tipos de campos de entrada (Texto, Menú, Búsqueda, Fechas, Horas, Toggles y Archivos) para validar su correcto comportamiento visual."
            : `Sandbox interactivo para experimentar con el componente individual de tipo ${selectedInput.toUpperCase()}.`
        }
        code={code}
        demo={renderActiveInput()}
        controls={
          selectedInput === "form" ? (
            <>
              <ITSelect
                name="form_variant_ctrl"
                label="Variante de Color de Botón"
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
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Simular Errores</span>
                <ITSlideToggle isOn={showFormErrors} onToggle={setShowFormErrors} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Deshabilitar Todo</span>
                <ITSlideToggle isOn={formDisabled} onToggle={setFormDisabled} activeColor="danger" size="sm" />
              </div>
            </>
          ) : (
            <>
              <ITInput
                name="label_ctrl"
                label="Etiqueta (Label)"
                value={label}
                onChange={(e: any) => setLabel(e.target.value)}
                onBlur={() => { }}
              />
              {["text", "password", "searchselect", "datepicker", "timepicker"].includes(selectedInput) && (
                <ITInput
                  name="placeholder_ctrl"
                  label="Placeholder"
                  value={placeholder}
                  onChange={(e: any) => setPlaceholder(e.target.value)}
                  onBlur={() => { }}
                />
              )}
              {["text", "password", "datepicker", "timepicker", "toggle"].includes(selectedInput) && (
                <ITSelect
                  name="variant_ctrl"
                  label="Variante de Color"
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
                label="Mensaje de Error"
                value={errorInput}
                onChange={(e: any) => setErrorInput(e.target.value)}
                onBlur={() => { }}
                placeholder="Ej. Formato inválido"
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Requerido</span>
                <ITSlideToggle isOn={required} onToggle={setRequired} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Deshabilitado</span>
                <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
              </div>
            </>
          )
        }
        gallery={
          selectedInput === "form" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ITInput name="g1" label="Input Estándar" placeholder="Ingresa datos..." onChange={() => { }} onBlur={() => { }} />
              <ITInput name="g2" label="Input Con Error" value="Email no válido" error="El formato del correo es incorrecto" onChange={() => { }} onBlur={() => { }} touched />
              <ITInput name="g3" label="Input Deshabilitado" placeholder="Solo lectura" disabled onChange={() => { }} onBlur={() => { }} />
              <ITInput name="g4" label="Input Contraseña" type="password" value="secreto123" onChange={() => { }} onBlur={() => { }} />
            </div>
          ) : undefined
        }
      />
    </div>
  );
};

// 3. ITSelect Showcase
export const SelectShowcase = () => {
  const [val, setVal] = useState("");
  const [label, setLabel] = useState("Rol Administrativo");
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
      description="Menú desplegable de selección simple optimizado con los estilos visuales AXZY."
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
            <p className="mt-2 text-xs text-slate-500 font-mono">Selección: "{val}"</p>
          )}
        </div>
      }
      controls={
        <>
          <ITInput name="label_ctrl" label="Label" value={label} onChange={(e: any) => setLabel(e.target.value)} onBlur={() => { }} />
          <ITInput name="err_ctrl" label="Mensaje de Error" value={error} onChange={(e: any) => setError(e.target.value)} onBlur={() => { }} />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
      gallery={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ITSelect name="s1" label="Opción Simple" options={[{ label: "Chile", value: "cl" }]} onChange={() => { }} />
          <ITSelect name="s2" label="Select Con Error" options={[]} error="Este campo es obligatorio" touched onChange={() => { }} />
        </div>
      }
    />
  );
};

// 4. ITSearchSelect Showcase
export const SearchSelectShowcase = () => {
  const [val, setVal] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const options = [
    { label: "Argentina", value: "AR" },
    { label: "Brasil", value: "BR" },
    { label: "Colombia", value: "CO" },
    { label: "México", value: "MX" },
    { label: "Perú", value: "PE" },
    { label: "España", value: "ES" }
  ];

  const code = `<ITSearchSelect\n  name="country"\n  label="Seleccionar País"\n  value="${val}"\n  options={[\n    { label: 'Argentina', value: 'AR' },\n    { label: 'Brasil', value: 'BR' },...\n  ]}\n  isLoading={${isLoading}}\n  disabled={${disabled}}\n  onChange={(value) => setVal(value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSearchSelect"
      description="Selector avanzado con barra de búsqueda para filtrar colecciones grandes o cargar opciones remotas."
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITSearchSelect
            name="country"
            label="Seleccionar País"
            value={val}
            options={options}
            isLoading={isLoading}
            disabled={disabled}
            onChange={(value) => setVal(value)}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">País seleccionado: "{val}"</p>
          )}
        </div>
      }
      controls={
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Estado de Carga (Loading)</span>
            <ITSlideToggle isOn={isLoading} onToggle={setIsLoading} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 5. ITDatePicker Showcase
export const DatePickerShowcase = () => {
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
      description="Calendario de entrada de fechas estático y flotante con soporte para selección de rangos."
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITDatePicker
            name="showcase_datepicker"
            label="Fecha del Evento"
            value={val}
            range={range}
            variant={variant}
            disabled={disabled}
            onChange={handleDateChange}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">
              Valor actual: {range && Array.isArray(val)
                ? `Rango: ${val[0]?.toLocaleDateString() || "?"} - ${val[1]?.toLocaleDateString() || "?"}`
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
            label="Tema de Color"
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
            <span className="text-sm font-semibold text-gray-700">Selección de Rango</span>
            <ITSlideToggle isOn={range} onToggle={(r) => { setRange(r); setVal(r ? [new Date(), new Date()] : new Date()); }} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 6. ITTimePicker Showcase
export const TimePickerShowcase = () => {
  const [val, setVal] = useState("09:30");
  const [variant, setVariant] = useState<any>("primary");
  const [disabled, setDisabled] = useState(false);

  const code = `<ITTimePicker\n  name="time"\n  label="Hora de Inicio"\n  value="${val}"\n  variant="${variant}"\n  disabled={${disabled}}\n  onChange={(e) => setVal(e.target.value)}\n/>`;

  return (
    <ShowcaseLayout
      title="ITTimePicker"
      description="Selector de horas y minutos con panel interactivo de scroll suave."
      code={code}
      demo={
        <div className="w-full max-w-sm">
          <ITTimePicker
            name="showcase_time"
            label="Hora de Inicio"
            value={val}
            variant={variant}
            disabled={disabled}
            onChange={(e: any) => setVal(e.target.value)}
            onBlur={() => { }}
          />
          {val && (
            <p className="mt-2 text-xs text-slate-500 font-mono">Hora elegida: "{val}"</p>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="variant_ctrl"
            label="Variante"
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
            <span className="text-sm font-semibold text-gray-700">Deshabilitado</span>
            <ITSlideToggle isOn={disabled} onToggle={setDisabled} activeColor="danger" size="sm" />
          </div>
        </>
      }
    />
  );
};

// 7. ITCalendar Showcase
export const CalendarShowcase = () => {
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
      description="Calendario completo con soporte para eventos y agendamiento diario/semanal."
      code={code}
      demo={
        <div className="w-full h-[450px]">
          <ITCalendar
            mode={mode}
            selectionMode={selectionMode}
            variant={calendarVariant}
            events={events}
            onSlotClick={(date) => alert(`Click en horario: ${date.toLocaleString()}`)}
            onEventClick={(evt) => alert(`Detalle del Evento: ${evt.title}`)}
          />
        </div>
      }
      controls={
        <>
          <ITSelect
            name="mode_ctrl"
            label="Modo de Vista"
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
            label="Modo de Selección"
            value={selectionMode}
            onChange={(e: any) => setSelectionMode(e.target.value)}
            options={[
              { label: "Single", value: "single" },
              { label: "Range", value: "range" }
            ]}
          />
          <ITSelect
            name="var_ctrl"
            label="Variante de Color"
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
  const [isOn, setIsOn] = useState(false);
  const [activeColor, setActiveColor] = useState<any>("success");
  const [size, setSize] = useState<any>("md");
  const [disabled, setDisabled] = useState(false);

  const code = `<ITSlideToggle\n  isOn={${isOn}}\n  onToggle={(state) => setIsOn(state)}\n  activeColor="${activeColor}"\n  size="${size}"\n  disabled={${disabled}}\n/>`;

  return (
    <ShowcaseLayout
      title="ITSlideToggle"
      description="Interruptor de alternancia (Switch) estilizado para cambiar estados binarios."
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
            Estado: {isOn ? "ENCENDIDO" : "APAGADO"}
          </span>
        </div>
      }
      controls={
        <>
          <ITSelect
            name="col_ctrl"
            label="Color Activo"
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
            label="Tamaño"
            value={size}
            onChange={(e: any) => setSize(e.target.value)}
            options={[
              { label: "Small", value: "sm" },
              { label: "Medium", value: "md" },
              { label: "Large", value: "lg" }
            ]}
          />
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-700">Deshabilitar Switch</span>
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<any>("pendiente");

  const code = `<ITDropfile\n  onFileSelect={(file) => setSelectedFile(file)}\n  uploadStatus="${status}"\n  showStatusBadge={true}\n/>`;

  return (
    <ShowcaseLayout
      title="ITDropfile"
      description="Área interactiva para arrastrar y soltar archivos, con previsualización de imágenes y barra de progreso."
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
              <p>Nombre: {selectedFile.name}</p>
              <p>Tamaño: {(selectedFile.size / 1024).toFixed(1)} KB</p>
              <p>Tipo: {selectedFile.type}</p>
            </div>
          )}
        </div>
      }
      controls={
        <>
          <ITSelect
            name="status_ctrl"
            label="Forzar Estado de Subida"
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

// 10. ITFormBuilder Showcase
export const FormBuilderShowcase = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    country: "MX",
    accept: false
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const config: any = [
    { name: "name", label: "Nombre Completo", type: "text", required: true },
    { name: "email", label: "Correo de Contacto", type: "email", required: true },
    {
      name: "country",
      label: "País Operación",
      type: "select",
      options: [
        { label: "México", value: "MX" },
        { label: "Chile", value: "CL" },
        { label: "Perú", value: "PE" }
      ]
    },
    { name: "accept", label: "Acepto términos y condiciones", type: "checkbox" }
  ];

  const code = `<ITFormBuilder\n  config={[\n    { name: 'name', label: 'Nombre', type: 'text', required: true },\n    { name: 'email', label: 'Email', type: 'email' },\n    ...\n  ]}\n  values={formValues}\n  handleChange={handleFormChange}\n/>`;

  return (
    <ShowcaseLayout
      title="ITFormBuilder"
      description="Generador dinámico de formularios basado en un esquema estructurado JSON."
      code={code}
      demo={
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm space-y-6">
          <ITFormBuilder
            config={config}
            values={values}
            handleChange={handleChange}
            handleBlur={() => { }}
            touched={{}}
            errors={{}}
          />
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h5 className="text-xs font-bold uppercase text-slate-400 mb-2">Valores del Formulario (JSON):</h5>
            <pre className="p-3 bg-slate-950 text-emerald-400 text-xs rounded-lg overflow-x-auto font-mono">
              {JSON.stringify(values, null, 2)}
            </pre>
          </div>
        </div>
      }
      controls={
        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs">
          <p className="text-slate-500">El formulario se genera dinámicamente inyectando un array de campos configurados.</p>
        </div>
      }
    />
  );
};
