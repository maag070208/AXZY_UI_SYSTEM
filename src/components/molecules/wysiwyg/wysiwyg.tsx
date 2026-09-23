import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import {
  FaBold,
  FaEraser,
  FaHighlighter,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";
import { ITWysiwygProps, ToolbarAction, toolbarActions } from "./wysiwyg.props";
import ITTooltip from "@/components/atoms/tooltip/tooltip";
import ITText from "@/components/atoms/text/text";
import { inputError, inputLabel, inputWrapper } from "@/utils/styles";
import { inputSizeTokens } from "@/theme/theme";

const INLINE_TAGS = new Set(["STRONG", "B", "EM", "I", "U", "MARK"]);

const ACTION_META: Record<
  ToolbarAction,
  { label: string; icon: ReactNode }
> = {
  bold: { label: "Negrita", icon: <FaBold /> },
  italic: { label: "Itálica", icon: <FaItalic /> },
  underline: { label: "Subrayado", icon: <FaUnderline /> },
  highlight: { label: "Marcador", icon: <FaHighlighter /> },
  ul: { label: "Lista con viñetas", icon: <FaListUl /> },
  ol: { label: "Lista numerada", icon: <FaListOl /> },
  clear: { label: "Limpiar formato", icon: <FaEraser /> },
};

type ActiveState = Partial<Record<ToolbarAction, boolean>>;

/**
 * Lightweight WYSIWYG editor (no external rich-text dependency). Provides bold,
 * italic, underline, a yellow marker highlight and ordered/unordered lists.
 * Formatting is applied manually over the Selection/Range API (no deprecated
 * `document.execCommand`), toggling elements by wrapping/unwrapping text nodes.
 *
 * The component is uncontrolled at the DOM level: it renders `value` lazily and
 * only re-syncs it when the editor is not focused (`onChange` reports the HTML).
 *
 * @example
 * <ITWysiwyg
 *   label="Descripción"
 *   value={content}
 *   onChange={setContent}
 *   placeholder="Escribe aquí..."
 * />
 *
 * @example
 * <ITWysiwyg size="lg" highlightColor="#fef08a" toolbar={["bold", "ul"]} />
 */
export default function ITWysiwyg({
  value,
  onChange,
  label,
  placeholder,
  error,
  disabled = false,
  readOnly = false,
  name,
  size = "md",
  minHeight = 128,
  highlightColor = "#fde68a",
  toolbar = toolbarActions,
  className,
}: ITWysiwygProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const focusedRef = useRef(false);
  const [active, setActive] = useState<ActiveState>({});

  const isLocked = disabled || readOnly;

  const sizeConfig = inputSizeTokens[size] ?? inputSizeTokens.md;

  const findAncestor = useCallback(
    (node: Node | null, predicate: (el: Element) => boolean): Element | null => {
      const editor = editorRef.current;
      if (!editor) return null;
      let cur: Node | null = node;
      while (cur && cur !== editor) {
        if (cur instanceof Element && predicate(cur)) return cur;
        cur = cur.parentNode;
      }
      return null;
    },
    []
  );

  const isInlineTag = useCallback((el: Element, tag: string) => {
    if (tag === "STRONG" || tag === "B") {
      return el.tagName === "STRONG" || el.tagName === "B";
    }
    if (tag === "EM" || tag === "I") {
      return el.tagName === "EM" || el.tagName === "I";
    }
    return el.tagName === tag;
  }, []);

  const getTextNodesInRange = useCallback((range: Range): Node[] => {
    const editor = editorRef.current;
    if (!editor) return [];
    const out: Node[] = [];
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (range.intersectsNode(node)) out.push(node);
    }
    return out;
  }, []);

  const placeCaretAtEnd = useCallback((target: Node) => {
    const editor = editorRef.current;
    const sel = window.getSelection();
    if (!editor || !sel) return;
    const range = document.createRange();
    range.selectNodeContents(target);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    if (document.activeElement !== editor) editor.focus();
  }, []);

  const emitChange = useCallback(() => {
    const editor = editorRef.current;
    if (editor) onChange?.(editor.innerHTML);
  }, [onChange]);

  const updateActive = useCallback(() => {
    const editor = editorRef.current;
    const sel = window.getSelection();
    const node = sel?.anchorNode ?? null;
    if (!editor || !node) return;
    const hasInline = (tag: string) =>
      !!findAncestor(node, (el) => isInlineTag(el, tag));
    const list = findAncestor(node, (el) => el.tagName === "LI");
    const next: ActiveState = {
      bold: hasInline("STRONG"),
      italic: hasInline("EM"),
      underline: hasInline("U"),
      highlight: hasInline("MARK"),
      ul: !!list && list.parentElement?.tagName === "UL",
      ol: !!list && list.parentElement?.tagName === "OL",
    };
    setActive((prev) =>
      JSON.stringify(prev) === JSON.stringify(next) ? prev : next
    );
  }, [findAncestor, isInlineTag]);

  const unwrapElement = useCallback((el: Element) => {
    const parent = el.parentNode;
    if (!parent) return;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    el.remove();
  }, []);

  const applyInline = useCallback(
    (tag: "STRONG" | "EM" | "U" | "MARK", prepare?: (el: HTMLElement) => void) => {
      const editor = editorRef.current;
      const sel = window.getSelection();
      if (!editor || !sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      if (!editor.contains(range.commonAncestorContainer)) return;
      if (document.activeElement !== editor) editor.focus();

      if (range.collapsed) {
        const existing = findAncestor(sel.anchorNode, (el) =>
          isInlineTag(el, tag)
        );
        if (existing) {
          unwrapElement(existing);
        } else {
          const el = document.createElement(tag);
          prepare?.(el);
          const zw = document.createTextNode("\u200B");
          el.appendChild(zw);
          range.insertNode(el);
          const caret = document.createRange();
          caret.setStart(zw, 1);
          caret.collapse(true);
          sel.removeAllRanges();
          sel.addRange(caret);
        }
        emitChange();
        updateActive();
        return;
      }

      const nodes = getTextNodesInRange(range).filter(
        (n) => n.textContent && n.textContent.length > 0
      );
      if (nodes.length === 0) return;

      const fullyWrapped =
        nodes.length > 0 &&
        nodes.every((n) => findAncestor(n, (el) => isInlineTag(el, tag)));

      if (fullyWrapped) {
        const wrappers = Array.from(
          new Set(
            nodes.map(
              (n) => findAncestor(n, (el) => isInlineTag(el, tag)) as Element
            )
          )
        );
        const parent = wrappers[0].parentNode;
        wrappers.forEach(unwrapElement);
        if (parent) placeCaretAtEnd(parent);
      } else {
        // Build contiguous runs of unformatted text sharing the same parent.
        const runs: { nodes: Node[]; parent: Element | null }[] = [];
        for (const node of nodes) {
          if (findAncestor(node, (el) => isInlineTag(el, tag))) continue;
          const parentEl = node.parentElement;
          const last = runs[runs.length - 1];
          if (last && last.parent === parentEl) last.nodes.push(node);
          else runs.push({ nodes: [node], parent: parentEl });
        }
        const created: HTMLElement[] = [];
        for (const run of runs) {
          const first = run.nodes[0];
          if (!first || !first.parentNode) continue;
          const el = document.createElement(tag);
          prepare?.(el);
          first.parentNode.insertBefore(el, first);
          run.nodes.forEach((n) => el.appendChild(n));
          created.push(el);
        }
        const last = created[created.length - 1];
        if (last) placeCaretAtEnd(last);
      }

      emitChange();
      updateActive();
    },
    [
      findAncestor,
      getTextNodesInRange,
      isInlineTag,
      placeCaretAtEnd,
      unwrapElement,
      emitChange,
      updateActive,
    ]
  );

  const normalizeBlocks = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const children = Array.from(editor.childNodes);
    let pending: Node[] = [];
    const flush = () => {
      if (!pending.length) return;
      const div = document.createElement("div");
      const first = pending[0];
      (first.parentNode as Node).insertBefore(div, first);
      pending.forEach((n) => div.appendChild(n));
      pending = [];
    };
    for (const child of children) {
      if (child.nodeType === Node.TEXT_NODE || child instanceof HTMLBRElement) {
        pending.push(child);
      } else {
        flush();
      }
    }
    flush();
  }, []);

  const convertLiToDiv = useCallback((li: Element) => {
    const list = li.parentElement;
    if (!list || !list.parentNode) return;
    const div = document.createElement("div");
    while (li.firstChild) div.appendChild(li.firstChild);
    list.parentNode.insertBefore(div, list);
    li.remove();
  }, []);

  const cleanupEmptyLists = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.querySelectorAll("ul, ol").forEach((list) => {
      if (!list.querySelector("li")) list.remove();
    });
  }, []);

  const retagList = useCallback((list: Element, type: "ul" | "ol") => {
    if (!list.parentNode) return;
    const nl = document.createElement(type);
    while (list.firstChild) nl.appendChild(list.firstChild);
    list.parentNode.replaceChild(nl, list);
  }, []);

  const toggleList = useCallback(
    (type: "ul" | "ol") => {
      const editor = editorRef.current;
      const sel = window.getSelection();
      if (!editor || !sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      if (!editor.contains(range.commonAncestorContainer)) return;
      if (document.activeElement !== editor) editor.focus();
      normalizeBlocks();

      const lines: Element[] = [];
      for (const child of Array.from(editor.children) as Element[]) {
        if (child.tagName === "UL" || child.tagName === "OL") {
          const lis = Array.from(
            child.children as HTMLCollectionOf<Element>
          ).filter((li) => range.intersectsNode(li));
          if (lis.length) lines.push(...lis);
        } else if (range.intersectsNode(child)) {
          lines.push(child);
        }
      }

      if (lines.length === 0) {
        // Fallback: block (or list) containing the caret.
        let node: Node | null = sel.anchorNode;
        while (node && node !== editor && !(node instanceof Element && node.parentElement === editor)) {
          node = node.parentNode;
        }
        if (node instanceof Element && node !== editor) {
          if (node.tagName === "UL" || node.tagName === "OL") {
            const li = node.firstElementChild as Element | null;
            if (li) lines.push(li);
          } else {
            lines.push(node);
          }
        }
      }
      if (lines.length === 0) return;

      const liOf = (el: Element) =>
        findAncestor(el, (n) => n.tagName === "LI");
      const anyLi = lines.some((l) => liOf(l));
      const allSameTarget =
        anyLi &&
        lines.every((l) => {
          const li = liOf(l);
          return !!li && li.parentElement?.tagName === type;
        });

      if (anyLi && allSameTarget) {
        const lis = Array.from(
          new Set(lines.map((l) => liOf(l) as Element))
        );
        const lastList = lis[0].parentElement;
        lis.forEach(convertLiToDiv);
        cleanupEmptyLists();
        if (lastList?.parentNode) placeCaretAtEnd(lastList);
      } else if (anyLi) {
        const lists = Array.from(
          new Set(lines.map((l) => liOf(l)?.parentElement as Element))
        );
        lists.forEach((list) => {
          if (list.tagName !== type) retagList(list, type);
        });
        if (lists[0]) placeCaretAtEnd(lists[0]);
      } else {
        const runs: Element[][] = [];
        let current: Element[] = [];
        for (const line of lines) {
          const prev = current[current.length - 1];
          if (prev && prev.nextElementSibling === line) current.push(line);
          else {
            if (current.length) runs.push(current);
            current = [line];
          }
        }
        if (current.length) runs.push(current);

        let lastList: Element | null = null;
        for (const run of runs) {
          const list = document.createElement(type);
          for (const line of run) {
            const li = document.createElement("li");
            while (line.firstChild) li.appendChild(line.firstChild);
            list.appendChild(li);
          }
          const first = run[0];
          first.parentElement?.insertBefore(list, first);
          run.forEach((line) => line.remove());
          lastList = list;
        }
        if (lastList) placeCaretAtEnd(lastList);
      }

      emitChange();
      updateActive();
    },
    [
      findAncestor,
      normalizeBlocks,
      convertLiToDiv,
      cleanupEmptyLists,
      retagList,
      placeCaretAtEnd,
      emitChange,
      updateActive,
    ]
  );

  const clearFormatting = useCallback(() => {
    const editor = editorRef.current;
    const sel = window.getSelection();
    if (!editor || !sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) return;
    if (document.activeElement !== editor) editor.focus();

    const nodes = getTextNodesInRange(range).filter(
      (n) => n.textContent && n.textContent.length > 0
    );
    const wrappers = new Set<Element>();
    for (const node of nodes) {
      let cur = node.parentElement;
      while (cur && cur !== editor) {
        if (INLINE_TAGS.has(cur.tagName)) {
          wrappers.add(cur);
          break;
        }
        cur = cur.parentElement;
      }
    }
    const toUnwrap = Array.from(wrappers);
    toUnwrap.forEach(unwrapElement);
    const last = toUnwrap[toUnwrap.length - 1];
    if (last?.parentNode) placeCaretAtEnd(last.parentNode);

    emitChange();
    updateActive();
  }, [
    getTextNodesInRange,
    unwrapElement,
    placeCaretAtEnd,
    emitChange,
    updateActive,
  ]);

  // Keep the editor content in sync with `value` while not focused.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (!focusedRef.current) {
      const next = value ?? "";
      if (editor.innerHTML !== next) editor.innerHTML = next;
    }
  }, [value]);

  useEffect(() => {
    const onSelectionChange = () => {
      const editor = editorRef.current;
      const sel = window.getSelection();
      if (!editor || !sel?.anchorNode) return;
      if (editor.contains(sel.anchorNode)) updateActive();
    };
    document.addEventListener("selectionchange", onSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", onSelectionChange);
  }, [updateActive]);

  const handleInput = () => emitChange();

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const editor = editorRef.current;
    const sel = window.getSelection();
    if (!editor || !sel || sel.rangeCount === 0) return;
    const text = event.clipboardData.getData("text/plain");
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    emitChange();
  };

  const runAction = (action: ToolbarAction) => {
    switch (action) {
      case "bold":
        applyInline("STRONG");
        break;
      case "italic":
        applyInline("EM");
        break;
      case "underline":
        applyInline("U");
        break;
      case "highlight":
        applyInline("MARK", (el) => (el.style.backgroundColor = highlightColor));
        break;
      case "ul":
        toggleList("ul");
        break;
      case "ol":
        toggleList("ol");
        break;
      case "clear":
        clearFormatting();
        break;
    }
  };

  const ToolbarButton = ({
    action,
  }: {
    action: ToolbarAction;
  }) => {
    const meta = ACTION_META[action];
    const isActive = !!active[action];
    return (
      <ITTooltip content={meta.label}>
        <button
          type="button"
          tabIndex={-1}
          disabled={isLocked}
          title={meta.label}
          aria-label={meta.label}
          aria-pressed={isActive}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => runAction(action)}
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded-md text-[13px] transition-colors",
            isActive
              ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
              : "text-secondary-500 hover:bg-secondary-200/70 hover:text-secondary-800 dark:text-secondary-400 dark:hover:bg-slate-700 dark:hover:text-secondary-200",
            isLocked && "cursor-not-allowed opacity-40"
          )}
        >
          {meta.icon}
        </button>
      </ITTooltip>
    );
  };

  return (
    <div className={inputWrapper(className)}>
      {label && (
        <ITText as="label" className={inputLabel(!!error)} htmlFor={name}>
          {label}
        </ITText>
      )}
      <div
        className={clsx(
          "w-full border border-solid rounded-lg overflow-hidden transition-all duration-200",
          error
            ? "ring-2 ring-danger-100 border-danger-500"
            : "border-secondary-300 focus-within:ring-2 focus-within:border-primary-500 focus-within:ring-primary-100",
          isLocked && "opacity-50 cursor-not-allowed bg-secondary-100 dark:bg-slate-800"
        )}
      >
        <div
          className={clsx(
            "flex flex-wrap items-center gap-0.5 px-1.5 py-1 border-b border-secondary-200 bg-secondary-50 dark:bg-slate-800",
            isLocked && "bg-secondary-100 dark:bg-slate-900"
          )}
        >
          {toolbar.map((action, i) => (
            <span key={action} className="flex items-center">
              {(i > 0 && (action === "ul" || action === "ol" || action === "clear")) && (
                <span className="mx-1 h-4 w-px bg-secondary-200 dark:bg-slate-600" />
              )}
              <ToolbarButton action={action} />
            </span>
          ))}
        </div>
        <div
          id={name}
          ref={editorRef}
          role="textbox"
          aria-multiline="true"
          contentEditable={!isLocked}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={handleInput}
          onPaste={handlePaste}
          onFocus={() => (focusedRef.current = true)}
          onBlur={() => {
            focusedRef.current = false;
            emitChange();
          }}
          className={clsx(
            "outline-none bg-white dark:bg-slate-900 text-secondary-800 dark:text-secondary-200",
            "empty:before:content-[attr(data-placeholder)] empty:before:text-secondary-400 empty:before:pointer-events-none empty:before:select-none",
            "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:ml-4",
            "[&_mark]:rounded-sm [&_mark]:px-0.5"
          )}
          style={{
            minHeight,
            padding: sizeConfig.padding,
            fontSize: sizeConfig.fontSize,
            lineHeight: "1.6",
          }}
        />
      </div>
      {error && <ITText as="span" className={inputError}>{error}</ITText>}
    </div>
  );
}