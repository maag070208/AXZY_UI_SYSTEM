import clsx from "clsx";
import { ITBreadcrumbsProps } from "./breadcrumbs.props";
import { FaChevronRight } from "react-icons/fa";
import ITText from "@/components/text/text";

export default function ITBreadcrumbs({
  items,
  separator = <FaChevronRight size={10} />,
  className,
}: ITBreadcrumbsProps) {
  return (
    <nav className={clsx("flex items-center gap-1.5 text-sm", className)} aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-slate-300 dark:text-slate-600">{separator}</span>}
            {isLast ? (
              <ITText as="span" className="text-slate-800 dark:text-white font-semibold">{item.label}</ITText>
            ) : item.href ? (
              <a href={item.href} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                <ITText as="span">{item.label}</ITText>
              </a>
            ) : (
              <button onClick={item.onClick} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                <ITText as="span">{item.label}</ITText>
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
