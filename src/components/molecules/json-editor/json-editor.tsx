import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import {
  FaAlignLeft,
  FaCheck,
  FaChevronDown,
  FaChevronRight,
  FaCompressAlt,
  FaCopy,
  FaDownload,
  FaExclamationTriangle,
  FaPlusSquare,
  FaSitemap,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaTextHeight,
  FaUpload,
  FaMagic,
} from "react-icons/fa";
import { useITTranslation } from "@/i18n";
import type { ITJSONEditorMode, ITJSONEditorProps } from "./json-editor.props";
import ITCodeTreeView from "./json-editor-tree";
import { useJsonEditorKeyboard } from "./useJsonEditorKeyboard";
import {
  analyzeCode,
  findFoldRegions,
  parseJsonError,
  transformValue,
  valueKind,
  type ITJsonTransform,
} from "./json-editor.utils";

/** Filete de 1px que separa las franjas del editor. */
const FILETE = "border-slate-200 dark:border-slate-800";
/** Rótulo en mono y mayúsculas de la fila de ajustes. */
const EYEBROW =
  "font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400";

/** Clase de resaltado por tipo de token. */
const TOKEN_CLASS: Record<string, string> = {
  key: "it-json-editor-tk-key",
  string: "it-json-editor-tk-string",
  number: "it-json-editor-tk-number",
  keyword: "it-json-editor-tk-keyword",
  punctuation: "it-json-editor-tk-punct",
  whitespace: "",
  plain: "it-json-editor-tk-plain",
};

/** Etiqueta corta del tipo de valor raíz. */
function describeKind(kind: string, t: (key: string) => string): string {
  switch (kind) {
    case "object":
      return t("jsonEditor.kindObject");
    case "array":
      return t("jsonEditor.kindArray");
    case "string":
      return t("jsonEditor.kindString");
    case "number":
      return t("jsonEditor.kindNumber");
    case "boolean":
      return t("jsonEditor.kindBoolean");
    default:
      return t("jsonEditor.kindNull");
  }
}

/** Posición (línea y columna, 1-based) de un offset del documento. */
function caretPosition(text: string, offset: number, lineStarts: number[]): { line: number; column: number } {
  const safe = Math.max(0, Math.min(offset, text.length));
  let low = 0;
  let high = Math.max(0, lineStarts.length - 1);
  while (low < high) {
    const mid = (low + high + 1) >> 1;
    if (lineStarts[mid] <= safe) low = mid;
    else high = mid - 1;
  }
  return { line: low + 1, column: safe - lineStarts[low] + 1 };
}

/** Cuenta nodos (claves y elementos) de un valor ya parseado. */
function countNodes(value: unknown): number {
  if (Array.isArray(value)) return value.reduce<number>((total, item) => total + 1 + countNodes(item), 0);
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).reduce<number>(
      (total, nested) => total + 1 + countNodes(nested),
      0
    );
  }
  return 0;
}

/** Tamaño legible (`842 B`, `12.4 kB`). */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} kB`;
}

/**
 * Editor de JSON con resaltado de sintaxis, gutter con números y plegado,
 * errores señalados por línea y columna, árbol navegable y acciones de formato.
 *
 * No añade dependencias: el resaltado se pinta en una capa bajo el `<textarea>`
 * nativo, así que se conservan el deshacer del navegador, el pegado, el dictado
 * y el corrector. La validación la hace `JSON.parse`, de modo que el coloreado
 * funciona igual mientras el documento está a medio escribir.
 *
 * @example
 * ```tsx
 * <ITJSONEditor value={json} onChange={setJson} onParse={handleParse} height={420} />
 * ```
 *
 * @example
 * ```tsx
 * <ITJSONEditor
 *   value={json}
 *   onChange={setJson}
 *   mode="tree"
 *   indentSize={4}
 *   showFoldGutter
 *   showStatusBar
 * />
 * ```
 */
export default function ITJSONEditor({
  value = "",
  onChange,
  onParse,
  placeholder,
  readOnly = false,
  mode,
  showModeSwitch = true,
  showToolbar = true,
  showValidation = true,
  showStatusBar = true,
  showLineNumbers = true,
  showFoldGutter = true,
  showTransformActions = true,
  showCopyButton = true,
  showImportButton = true,
  showDownloadButton = true,
  showViewSettings = true,
  indentSize: indentSizeProp = 2,
  wrapLines: wrapLinesProp = false,
  treeShowLines = false,
  canvasTheme = "ink",
  height = 340,
  minWidth,
  actions,
  className,
  id,
  textareaClassName,
  errorLine,
}: ITJSONEditorProps) {
  const { t, formatNumber } = useITTranslation();

  /* ---------------------------------------------------------------- estado */

  const [viewMode, setViewMode] = useState<ITJSONEditorMode>(mode ?? "text");
  const [wrapLines, setWrapLines] = useState(wrapLinesProp);
  const [indentSize, setIndentSize] = useState(Math.min(8, Math.max(0, indentSizeProp)));
  const [withNumbers, setWithNumbers] = useState(showLineNumbers);
  const [withFolds, setWithFolds] = useState(showFoldGutter);
  const [copied, setCopied] = useState(false);
  const [foldedStarts, setFoldedStarts] = useState<number[]>([]);
  const [caretLine, setCaretLine] = useState(1);
  const [lineHeight, setLineHeight] = useState(21);
  const [notice, setNotice] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  /** Selección a reponer tras el re-render que provoca el cambio de valor. */
  const pendingSelection = useRef<[number, number] | null>(null);
  const editorId = useId();

  // Los props de modo y ajustes son el valor inicial, pero si la aplicación los
  // cambia en caliente el editor debe seguirlos.
  useEffect(() => {
    if (mode !== undefined) setViewMode(mode);
  }, [mode]);
  useEffect(() => {
    setWrapLines(wrapLinesProp);
  }, [wrapLinesProp]);
  useEffect(() => {
    setIndentSize(Math.min(8, Math.max(0, indentSizeProp)));
  }, [indentSizeProp]);

  /* ------------------------------------------------------------- derivados */

  const analysis = useMemo(() => analyzeCode(value), [value]);
  const folds = useMemo(() => findFoldRegions(value), [value]);

  const validation = useMemo(() => {
    if (!value.trim()) {
      return {
        isValid: true,
        parsed: undefined as unknown,
        error: undefined as ReturnType<typeof parseJsonError> | undefined,
      };
    }
    try {
      return { isValid: true, parsed: JSON.parse(value) as unknown, error: undefined };
    } catch (raw) {
      return {
        isValid: false,
        parsed: undefined as unknown,
        error: parseJsonError(raw, value, analysis.lineStarts),
      };
    }
  }, [value, analysis.lineStarts]);

  useEffect(() => {
    onParse?.(validation.parsed, validation.isValid, validation.error?.message);
  }, [validation, onParse]);

  /** Regiones plegadas que siguen existiendo en el texto actual. */
  const foldedRegions = useMemo(() => {
    if (!foldedStarts.length || !folds.length) return [];
    return folds.filter((region) => foldedStarts.includes(region.startLine));
  }, [folds, foldedStarts]);

  /** Líneas ocultas por el plegado (todo lo que no sea la de apertura). */
  const hiddenLines = useMemo(() => {
    const hidden = new Set<number>();
    for (const region of foldedRegions) {
      for (let line = region.startLine + 1; line <= region.endLine; line++) hidden.add(line);
    }
    return hidden;
  }, [foldedRegions]);

  /** Línea de apertura → línea de cierre, para pintar el marcador `…`. */
  const closedByStart = useMemo(() => {
    const map = new Map<number, number>();
    for (const region of foldedRegions) map.set(region.startLine, region.endLine);
    return map;
  }, [foldedRegions]);

  const visibleLines = useMemo(
    () => analysis.lines.filter((line) => !hiddenLines.has(line.number)),
    [analysis.lines, hiddenLines]
  );

  const lineStarts = analysis.lineStarts;

  const nodeCount = useMemo(() => countNodes(validation.parsed), [validation.parsed]);
  const maxDepth = useMemo(
    () => analysis.lines.reduce((deepest, line) => Math.max(deepest, line.depth), 0),
    [analysis.lines]
  );
  const byteSize = useMemo(() => new Blob([value]).size, [value]);

  /* ------------------------------------------------------------- medición */

  /**
   * Alto real de una línea, medido sobre la propia fila pintada.
   *
   * Es la única forma de que gutter, capa resaltada y `<textarea>` queden
   * alineados al píxel con cualquier tipografía: el valor se publica como
   * `--it-json-editor-line` y el textarea lo usa como `line-height`. Se re-mide
   * al cambiar de lienzo, al cargar las fuentes y al redimensionar el editor.
   */
  useEffect(() => {
    const measure = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const computed = window.getComputedStyle(textarea);
      const numeric = parseFloat(computed.lineHeight);
      const fallback = parseFloat(computed.fontSize) * 1.7;
      const measured = Number.isFinite(numeric) ? numeric : fallback;
      if (measured <= 0) return;
      setLineHeight(measured);
      // El valor se publica en el lienzo y lo consumen el textarea, el gutter y
      // la capa pintada, que así quedan alineados al píxel.
      canvasRef.current?.style.setProperty("--it-json-editor-line", `${measured}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (highlightRef.current) observer.observe(highlightRef.current);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => observer.disconnect();
  }, [canvasTheme, visibleLines.length, wrapLines]);

  const rowHeight = `${lineHeight}px`;
  const contentHeight = visibleLines.length * lineHeight;
  const activeLine = validation.isValid ? caretLine : validation.error?.line ?? errorLine ?? caretLine;
  const treeValue = validation.isValid ? validation.parsed : undefined;

  /* -------------------------------------------------------------- edición */

  /**
   * Repone la selección pedida por `applyEdit`. Hace falta porque el re-render
   * del `<textarea>` controlado mueve el cursor: lo manda al final cuando cambia
   * el texto y lo devuelve a su posición anterior cuando el texto no cambia (caso
   * de "saltar" un cierre que ya estaba delante). React restaura el suyo durante
   * el commit, así que la reposición se reafirma en el layout effect y en un par
   * de turnos más; la siguiente pulsación cancela la intención.
   */
  const restoreSelection = useCallback(() => {
    const textarea = textareaRef.current;
    const pending = pendingSelection.current;
    if (!textarea || !pending) return;
    const max = textarea.value.length;
    textarea.setSelectionRange(Math.min(pending[0], max), Math.min(pending[1], max));
  }, []);

  /**
   * Aplica la selección pedida y **consume** la intención: solo se repone una vez
   * por edición. Si se dejara viva, cualquier commit posterior (un clic, un
   * cambio de vista) devolvería el cursor a la posición del último atajo.
   */
  const consumePendingSelection = useCallback(() => {
    if (!pendingSelection.current) return;
    const pending = pendingSelection.current;
    pendingSelection.current = null;
    restoreSelection();
    // React restaura el suyo en el commit; se reafirma justo después.
    queueMicrotask(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const max = textarea.value.length;
      textarea.setSelectionRange(Math.min(pending[0], max), Math.min(pending[1], max));
    });
  }, [restoreSelection]);

  useLayoutEffect(() => {
    consumePendingSelection();
  });

  const applyEdit = useCallback(
    (result: { value: string; selectionStart: number; selectionEnd: number; handled: boolean }) => {
      pendingSelection.current = [result.selectionStart, result.selectionEnd];
      onChange?.(result.value);
      // Si el valor no cambia no habrá commit y el layout effect no correrá
      // (caso de "saltar" un cierre que ya estaba delante): se aplica aquí y se
      // reafirma tras el commit de React.
      if (!pendingSelection.current) return;
      const pending = pendingSelection.current;
      pendingSelection.current = null;
      restoreSelection();
      queueMicrotask(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const max = textarea.value.length;
        textarea.setSelectionRange(Math.min(pending[0], max), Math.min(pending[1], max));
      });
    },
    [onChange, restoreSelection]
  );

  const handleKeyDownRaw = useJsonEditorKeyboard({
    textareaRef,
    indentSize,
    readOnly,
    applyEdit,
  });

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Una pulsación nueva manda: cualquier intención de cursor anterior se
      // descarta para que no pise lo que haga el navegador con esta tecla.
      pendingSelection.current = null;
      handleKeyDownRaw(event);
    },
    [handleKeyDownRaw]
  );

  const syncCaret = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    setCaretLine(caretPosition(value, textarea.selectionStart, lineStarts).line);
  }, [value, lineStarts]);

  const scrollCaretIntoView = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || wrapLines) return;
    const { line } = caretPosition(value, textarea.selectionStart, lineStarts);
    const target = (line - 1) * lineHeight;
    const viewTop = textarea.scrollTop;
    const viewBottom = viewTop + textarea.clientHeight;
    if (target < viewTop || target + lineHeight > viewBottom) {
      textarea.scrollTop = Math.max(0, target - textarea.clientHeight / 2);
      if (highlightRef.current) highlightRef.current.scrollTop = textarea.scrollTop;
    }
  }, [value, lineStarts, lineHeight, wrapLines]);

  const flash = useCallback((message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 1800);
  }, []);

  /* ------------------------------------------------------------ acciones */

  const applyTransform = useCallback(
    (transform: ITJsonTransform) => {
      if (!validation.isValid || validation.parsed === undefined) return;
      try {
        const next = transformValue(validation.parsed, transform, indentSize);
        if (next === value) return;
        onChange?.(next);
        setFoldedStarts([]);
        flash(t("jsonEditor.applied"));
      } catch {
        flash(t("jsonEditor.actionFailed"));
      }
    },
    [validation, indentSize, value, onChange, flash, t]
  );

  /** Atajos de la barra: Mayús+Alt+F formatea, +M minifica, +S ordena. */
  const handleTransformHotkeys = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!(event.altKey && event.shiftKey)) return;
      const key = event.key.toLowerCase();
      if (key === "f") applyTransform("format");
      else if (key === "m") applyTransform("minify");
      else if (key === "s") applyTransform("sortAsc");
    },
    [applyTransform]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      flash(t("jsonEditor.copyFailed"));
    }
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "document.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange?.(String(reader.result ?? ""));
      setFoldedStarts([]);
      flash(t("jsonEditor.fileLoaded"));
    };
    reader.onerror = () => flash(t("jsonEditor.fileError"));
    reader.readAsText(file);
  };

  /** Salta a una línea, la deja visible y enfoca el editor. */
  const jumpToLine = useCallback(
    (line: number) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      setViewMode("text");
      const index = Math.min(lineStarts.length, Math.max(1, line)) - 1;
      const start = lineStarts[index] ?? 0;
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start);
        setCaretLine(index + 1);
        scrollCaretIntoView();
      });
    },
    [lineStarts, scrollCaretIntoView]
  );

  /* ------------------------------------------------------------- plegado */

  const toggleFold = (startLine: number) => {
    setFoldedStarts((previous) =>
      previous.includes(startLine)
        ? previous.filter((line) => line !== startLine)
        : [...previous, startLine]
    );
  };

  const toggleAllFolds = () => {
    setFoldedStarts((previous) => (previous.length ? [] : folds.map((region) => region.startLine)));
  };

  /* ------------------------------------------------------------- pintado */

  const effectiveFolds = withFolds ? folds : [];
  const canvasHeight = typeof height === "number" ? `${height}px` : height;
  const canvasMinWidth = typeof minWidth === "number" ? `${minWidth}px` : minWidth;

  const statusText = validation.isValid
    ? t("jsonEditor.valid")
    : t("jsonEditor.invalidAt", {
        line: validation.error?.line ?? 1,
        column: validation.error?.column ?? 1,
      });

  return (
    <div
      id={id}
      className={clsx("overflow-hidden rounded-[10px] border", FILETE, className)}
      data-testid="it-json-editor"
      data-editable={!readOnly}
      data-mode={viewMode}
    >
      {/* ─── BARRA SUPERIOR ─── */}
      {showToolbar && (
        <div
          className={clsx(
            "flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b bg-white px-3 py-2 dark:bg-slate-950",
            FILETE
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            {showValidation && (
              <span className="flex shrink-0 items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={clsx(
                    "inline-block h-1.5 w-1.5 rounded-full",
                    validation.isValid ? "bg-success-500" : "bg-danger-500"
                  )}
                />
                <span
                  className={clsx(
                    "font-mono text-[10px] uppercase tracking-[0.12em]",
                    validation.isValid
                      ? "text-success-700 dark:text-success-400"
                      : "text-danger-600 dark:text-danger-400"
                  )}
                >
                  {validation.isValid ? t("jsonEditor.valid") : t("jsonEditor.invalid")}
                </span>
              </span>
            )}
            {showValidation && !validation.isValid && validation.error && (
              <span
                className="truncate font-mono text-[10.5px] text-danger-600 dark:text-danger-400"
                title={validation.error.message}
              >
                <FaExclamationTriangle size={9} className="mr-1 inline" />
                {`L${validation.error.line}:${validation.error.column} — ${validation.error.message}`}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {showTransformActions && (
              <>
                <EditorIconButton
                  icon={<FaMagic size={10} />}
                  label={t("jsonEditor.format")}
                  hint={t("jsonEditor.formatHint")}
                  disabled={!validation.isValid || readOnly}
                  onClick={() => applyTransform("format")}
                />
                <EditorIconButton
                  icon={<FaCompressAlt size={10} />}
                  label={t("jsonEditor.minify")}
                  disabled={!validation.isValid || readOnly}
                  onClick={() => applyTransform("minify")}
                />
                <EditorIconButton
                  icon={<FaSortAlphaDown size={10} />}
                  label={t("jsonEditor.sortAsc")}
                  disabled={!validation.isValid || readOnly}
                  onClick={() => applyTransform("sortAsc")}
                />
                <EditorIconButton
                  icon={<FaSortAlphaUp size={10} />}
                  label={t("jsonEditor.sortDesc")}
                  disabled={!validation.isValid || readOnly}
                  onClick={() => applyTransform("sortDesc")}
                />
                <EditorIconButton
                  icon={<FaPlusSquare size={10} />}
                  label={t("jsonEditor.escape")}
                  disabled={!validation.isValid || readOnly}
                  onClick={() => applyTransform("escape")}
                />
                <EditorIconButton
                  icon={<FaAlignLeft size={10} />}
                  label={t("jsonEditor.unescape")}
                  disabled={!validation.isValid || readOnly}
                  onClick={() => applyTransform("unescape")}
                />
                <span className="mx-0.5 h-4 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
              </>
            )}

            {showModeSwitch && (
              <div className="it-json-editor-segment" role="group" aria-label={t("jsonEditor.viewMode")}>
                <button
                  type="button"
                  onClick={() => setViewMode("text")}
                  aria-pressed={viewMode === "text"}
                  className={clsx(
                    "it-json-editor-segment-item",
                    viewMode === "text" && "it-json-editor-segment-item--active"
                  )}
                >
                  <FaTextHeight size={9} />
                  <span>{t("jsonEditor.modeText")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("tree")}
                  aria-pressed={viewMode === "tree"}
                  className={clsx(
                    "it-json-editor-segment-item",
                    viewMode === "tree" && "it-json-editor-segment-item--active"
                  )}
                >
                  <FaSitemap size={9} />
                  <span>{t("jsonEditor.modeTree")}</span>
                </button>
              </div>
            )}

            {actions}

            {showCopyButton && (
              <EditorIconButton
                icon={copied ? <FaCheck size={10} /> : <FaCopy size={10} />}
                label={copied ? t("jsonEditor.copied") : t("jsonEditor.copy")}
                onClick={handleCopy}
              />
            )}
            {showImportButton && !readOnly && (
              <EditorIconButton
                icon={<FaUpload size={10} />}
                label={t("jsonEditor.importFile")}
                onClick={() => fileInputRef.current?.click()}
              />
            )}
            {showDownloadButton && (
              <EditorIconButton
                icon={<FaDownload size={10} />}
                label={t("jsonEditor.download")}
                onClick={handleDownload}
              />
            )}
          </div>
        </div>
      )}

      {/* ─── FILA DE AJUSTES DE VISTA ─── */}
      {showViewSettings && (
        <div
          className={clsx(
            "flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b bg-slate-50/70 px-3 py-1.5 dark:bg-slate-900/60",
            FILETE
          )}
        >
          <span className={EYEBROW}>{t("jsonEditor.viewSettings")}</span>
          <EditorToggle
            label={t("jsonEditor.wrap")}
            checked={wrapLines}
            onChange={() => setWrapLines((previous) => !previous)}
          />
          <EditorToggle
            label={t("jsonEditor.lineNumbers")}
            checked={withNumbers}
            onChange={() => setWithNumbers((previous) => !previous)}
          />
          <EditorToggle
            label={t("jsonEditor.folding")}
            checked={withFolds}
            onChange={() => setWithFolds((previous) => !previous)}
          />
          <label className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            <span>{t("jsonEditor.indent")}</span>
            <select
              value={indentSize}
              onChange={(event) => setIndentSize(Number(event.target.value))}
              aria-label={t("jsonEditor.indent")}
              className={clsx(
                "rounded-[6px] border bg-white px-1.5 py-0.5 font-mono text-[10px] focus:outline-none dark:bg-slate-950",
                FILETE
              )}
            >
              {[0, 2, 4, 8].map((size) => (
                <option key={size} value={size}>
                  {size === 0 ? t("jsonEditor.indentNone") : `${size}`}
                </option>
              ))}
            </select>
          </label>
          {withFolds && effectiveFolds.length > 0 && (
            <button type="button" onClick={toggleAllFolds} className="it-json-editor-tree-jump">
              {foldedStarts.length ? t("jsonEditor.expandAll") : t("jsonEditor.collapseAll")}
            </button>
          )}
          {notice && (
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-primary-700 dark:text-primary-400">
              {notice}
            </span>
          )}
        </div>
      )}

      {/* ─── LIENZO ─── */}
      <div
        ref={canvasRef}
        className="it-json-editor-canvas relative overflow-hidden"
        data-canvas={canvasTheme}
        style={{ height: canvasHeight, minWidth: canvasMinWidth }}
      >
        {/* Regla oculta: mide la altura real de una línea para alinear el gutter. */}


        {viewMode === "tree" ? (
          validation.isValid ? (
            <ITCodeTreeView
              value={treeValue}
              analysis={analysis}
              showLines={treeShowLines}
              onJumpToLine={jumpToLine}
              className="h-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center gap-2 p-4">
              <FaExclamationTriangle size={12} className="text-danger-500" />
              <span className="font-mono text-[11px] text-danger-600 dark:text-danger-400">
                {t("jsonEditor.treeNeedsValid")}
              </span>
            </div>
          )
        ) : (
          <div className="flex h-full">
            {/* Gutter de plegado */}
            {withFolds && (
              <div className="it-json-editor-gutter shrink-0" style={{ height: contentHeight }}>
                {visibleLines.map((line) => {
                  const isFoldable = effectiveFolds.some((item) => item.startLine === line.number);
                  const isFolded = closedByStart.has(line.number);
                  return (
                    <div
                      key={line.number}
                      className="it-json-editor-gutter-row"
                      style={{ height: rowHeight, paddingLeft: line.depth * 6 }}
                    >
                      {isFoldable ? (
                        <button
                          type="button"
                          onClick={() => toggleFold(line.number)}
                          aria-label={
                            isFolded
                              ? t("jsonEditor.expandBlock", { line: line.number })
                              : t("jsonEditor.collapseBlock", { line: line.number })
                          }
                          aria-expanded={!isFolded}
                          className="it-json-editor-fold"
                        >
                          {isFolded ? <FaChevronRight size={7} /> : <FaChevronDown size={7} />}
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Números de línea */}
            {withNumbers && (
              <div className="it-json-editor-linenumbers shrink-0" style={{ height: contentHeight }}>
                {visibleLines.map((line) => (
                  <div
                    key={line.number}
                    className={clsx(
                      "it-json-editor-linenumber",
                      line.number === activeLine && "it-json-editor-linenumber--active"
                    )}
                    style={{ height: rowHeight }}
                  >
                    {formatNumber(line.number)}
                  </div>
                ))}
              </div>
            )}

            {/* Superficie de edición */}
            <div className="relative min-w-0 flex-1">
              {/* Fondo de línea vigente y de la línea con error. Con ajuste de
                  línea se desactivan: su posición depende de las vueltas que dé
                  cada línea, que ya no se pueden calcular por índice. */}
              {!wrapLines && (
                <>
                  <div
                    className="it-json-editor-active-line pointer-events-none absolute inset-x-0 top-0"
                    style={{
                      height: rowHeight,
                      transform: `translateY(${(activeLine - 1) * lineHeight}px)`,
                    }}
                  />
                  {!validation.isValid && validation.error && (
                    <div
                      className="it-json-editor-error-line pointer-events-none absolute inset-x-0 top-0"
                      style={{
                        height: rowHeight,
                        transform: `translateY(${(validation.error.line - 1) * lineHeight}px)`,
                      }}
                    />
                  )}
                </>
              )}

              {/* Capa resaltada (debajo) y textarea transparente (encima). */}
              <div
                ref={highlightRef}
                aria-hidden="true"
                className={clsx(
                  "it-json-editor-highlight",
                  wrapLines ? "overflow-hidden" : "overflow-auto"
                )}
              >
                <div className="it-json-editor-code" style={{ minHeight: contentHeight }}>
                  {visibleLines.map((line) => (
                    <div
                      key={line.number}
                      className="it-json-editor-code-line"
                      style={{ height: rowHeight }}
                    >
                      {line.tokens.map((token, index) => (
                        <span key={index} className={TOKEN_CLASS[token.type]}>
                          {token.text}
                        </span>
                      ))}
                      {closedByStart.has(line.number) && (
                        <span className="it-json-editor-fold-marker">
                          {t("jsonEditor.foldMore", {
                            count: closedByStart.get(line.number)! - line.number,
                          })}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <textarea
                ref={textareaRef}
                id={editorId}
                value={value}
                onChange={(event) => {
                  onChange?.(event.target.value);
                  setFoldedStarts([]);
                }}
                onKeyDown={(event) => {
                  handleKeyDown(event);
                  handleTransformHotkeys(event);
                }}
                onKeyUp={syncCaret}
                onClick={syncCaret}
                onScroll={(event) => {
                  const highlight = highlightRef.current;
                  if (!highlight) return;
                  highlight.scrollTop = event.currentTarget.scrollTop;
                  highlight.scrollLeft = event.currentTarget.scrollLeft;
                }}
                readOnly={readOnly}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                wrap={wrapLines ? "soft" : "off"}
                aria-label={t("jsonEditor.ariaLabel")}
                aria-invalid={!validation.isValid}
                placeholder={placeholder ?? t("jsonEditor.placeholder")}
                className={clsx(
                  "it-json-editor-textarea",
                  !wrapLines && "it-json-editor-nowrap",
                  textareaClassName
                )}
              />
            </div>
          </div>
        )}
      </div>

      {/* ─── PIE ─── */}
      {showStatusBar && (
        <div
          className={clsx(
            "flex flex-wrap items-center gap-x-4 gap-y-1 border-t bg-slate-50/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-500 dark:bg-slate-900/60 dark:text-slate-400",
            FILETE
          )}
        >
          <span>{statusText}</span>
          <span>{t("jsonEditor.statLines", { count: analysis.lineCount })}</span>
          {validation.isValid && (
            <>
              <span>{t("jsonEditor.statNodes", { count: nodeCount })}</span>
              <span>{t("jsonEditor.statDepth", { count: maxDepth })}</span>
              <span>{t("jsonEditor.statRoot", { kind: describeKind(valueKind(validation.parsed), t) })}</span>
            </>
          )}
          <span className="ml-auto">{t("jsonEditor.statSize", { size: formatBytes(byteSize) })}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------- auxiliares */

/** Botón de la barra: icono + etiqueta corta, con tooltip nativo. */
function EditorIconButton({
  icon,
  label,
  hint,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={hint ?? label}
      aria-label={label}
      className="it-json-editor-tool"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/** Interruptor compacto de la fila de ajustes. */
function EditorToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={clsx("it-json-editor-toggle", checked && "it-json-editor-toggle--on")}
    >
      <span className="it-json-editor-toggle-dot" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
