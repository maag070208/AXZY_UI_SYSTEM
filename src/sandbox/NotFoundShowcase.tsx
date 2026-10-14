import { FaHome, FaLayerGroup } from "react-icons/fa";
import ITButton from "@/components/atoms/button/button";
import ITFlex from "@/components/atoms/flex/flex";
import ITStack from "@/components/atoms/stack/stack";
import ITText from "@/components/atoms/text/text";
import { useITTranslation } from "@/i18n";

/** Props for the sandbox 404 page. */
export interface NotFoundShowcaseProps {
  /** Raw hash that failed to resolve (shown inside a `<code>` block). */
  attempted: string;
  /** Navigate back to the `#ui-system` landing. */
  onGoLanding: () => void;
  /** Navigate back to the portfolio. */
  onGoPortfolio: () => void;
}

/**
 * Sandbox 404 page rendered when a hash route does not resolve to a page.
 *
 * Shows the attempted path, a friendly message, and buttons to recover.
 * Follows the blueprint spec: flat surface, 1px border, mono metadata.
 */
export default function NotFoundShowcase({
  attempted,
  onGoLanding,
  onGoPortfolio,
}: NotFoundShowcaseProps) {
  const { t } = useITTranslation();
  return (
    <div className="animate-fadeIn flex min-h-[60vh] items-center justify-center px-4">
      <div className="it-reveal w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <ITStack spacing={5} className="items-center">
          <ITText
            as="p"
            className="font-mono !text-[11px] !font-medium uppercase !tracking-[0.18em] text-primary-600 dark:text-primary-400"
          >
            {t("showcase.notFound.eyebrow")}
          </ITText>

          <ITText
            as="div"
            className="font-display !text-6xl !font-bold -tracking-[0.02em] tabular-nums text-slate-900 dark:text-white"
          >
            404
          </ITText>

          <ITStack spacing={2} className="items-center">
            <ITText
              as="h1"
              className="font-display !text-2xl !font-bold -tracking-[0.02em] text-slate-900 dark:text-white"
            >
              {t("showcase.notFound.title")}
            </ITText>
            <ITText as="p" className="!text-sm !leading-relaxed text-slate-500 dark:text-slate-400">
              {t("showcase.notFound.description")}
            </ITText>
            <code className="mt-1 max-w-full truncate rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              {attempted || "#"}
            </code>
          </ITStack>

          <ITFlex gap={3} wrap="wrap" justify="center" align="center">
            <ITButton
              variant="filled"
              color="primary"
              icon={<FaHome size={13} />}
              onClick={onGoLanding}
            >
              {t("showcase.notFound.backHome")}
            </ITButton>
            <ITButton
              variant="outlined"
              color="secondary"
              icon={<FaLayerGroup size={13} />}
              onClick={onGoPortfolio}
            >
              {t("showcase.landing.viewPortfolio")}
            </ITButton>
          </ITFlex>
        </ITStack>
      </div>
    </div>
  );
}
