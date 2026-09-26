import { FaHome, FaLayerGroup } from "react-icons/fa";
import ITButton from "@/components/atoms/button/button";
import ITFlex from "@/components/atoms/flex/flex";
import ITStack from "@/components/atoms/stack/stack";
import ITText from "@/components/atoms/text/text";

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
 */
export default function NotFoundShowcase({
  attempted,
  onGoLanding,
  onGoPortfolio,
}: NotFoundShowcaseProps) {
  return (
    <div className="animate-fadeIn flex min-h-[60vh] items-center justify-center px-4">
      <ITStack spacing={5} className="w-full max-w-xl text-center items-center">
        <ITText
          as="div"
          className="!text-7xl !font-extrabold !tracking-tight bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 bg-clip-text text-transparent"
        >
          404
        </ITText>

        <ITStack spacing={2} className="items-center">
          <ITText as="h1" className="!text-2xl !font-bold text-slate-900 dark:text-white">
            Ruta no encontrada
          </ITText>
          <ITText as="p" className="!text-sm text-slate-500 dark:text-slate-400">
            No existe una página para este hash. Revisa el enlace o vuelve al inicio.
          </ITText>
          <code className="mt-1 max-w-full truncate rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
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
            Volver al inicio
          </ITButton>
          <ITButton
            variant="outlined"
            color="secondary"
            icon={<FaLayerGroup size={13} />}
            onClick={onGoPortfolio}
          >
            Ver portafolio
          </ITButton>
        </ITFlex>
      </ITStack>
    </div>
  );
}
