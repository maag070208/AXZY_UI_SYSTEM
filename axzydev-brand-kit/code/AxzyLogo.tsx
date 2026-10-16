// React / Vite.  npm i lottie-web
// Copia /lottie/*.json a /public/lottie/
import { useEffect, useRef, useState } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';

type Variant = 'logo' | 'icon' | 'loader';
type Theme = 'light' | 'dark';
type Color = Theme | 'black' | 'white';   // logo: color claro, color sobre oscuro, negro, blanco
type Tone = 'teal' | 'navy' | 'black' | 'white'; // ícono / loader

const FILES: Record<string, string> = {
  'logo-light': '/lottie/axzydev-logo-intro-light.json',
  'logo-dark': '/lottie/axzydev-logo-intro-dark.json',
  icon: '/lottie/axzydev-icon-intro.json',
  loader: '/lottie/axzydev-icon-loop.json',
  'logo-black': '/lottie/axzydev-logo-intro-black.json',
  'logo-white': '/lottie/axzydev-logo-intro-white.json',
  'icon-navy': '/lottie/axzydev-icon-intro-navy.json',
  'icon-black': '/lottie/axzydev-icon-intro-black.json',
  'icon-white': '/lottie/axzydev-icon-intro-white.json',
  'loader-navy': '/lottie/axzydev-icon-loop-navy.json',
  'loader-black': '/lottie/axzydev-icon-loop-black.json',
  'loader-white': '/lottie/axzydev-icon-loop-white.json',
};

function readTheme(): Theme {
  const root = document.documentElement;
  const attr = root.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  if (root.classList.contains('dark')) return 'dark';
  if (root.classList.contains('light')) return 'light';
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Sigue tu toggle claro/oscuro/sistema (atributo data-theme, clase .dark o preferencia del SO). */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(readTheme);
  useEffect(() => {
    const update = () => setTheme(readTheme());
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', update);
    return () => { mo.disconnect(); mq.removeEventListener('change', update); };
  }, []);
  return theme;
}

interface Props {
  variant?: Variant;
  theme?: Color;          // logo: 'light' | 'dark' | 'black' | 'white' (si lo omites, sigue el tema del sitio)
  tone?: Tone;            // icon / loader: 'teal' (default) | 'navy' | 'black' | 'white'
  replayOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AxzyLogo({ variant = 'logo', theme, tone = 'teal', replayOnHover = false, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const auto = useTheme();
  const t = theme ?? auto;
  const key = variant === 'logo' ? `logo-${t}` : tone === 'teal' ? variant : `${variant}-${tone}`;

  useEffect(() => {
    if (!ref.current) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const anim = lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: variant === 'loader',
      autoplay: !reduce,
      path: FILES[key],
    });
    if (reduce) anim.addEventListener('DOMLoaded', () => anim.goToAndStop(anim.totalFrames - 1, true));
    animRef.current = anim;
    return () => anim.destroy();
  }, [key, variant]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="axzydev"
      className={className}
      style={style}
      onMouseEnter={() => replayOnHover && variant !== 'loader' && animRef.current?.goToAndPlay(0)}
    />
  );
}

/* Uso:
   <AxzyLogo variant="logo" style={{ width: 280 }} />       // hero / footer
   <AxzyLogo variant="icon" style={{ width: 40 }} />         // navbar (reemplaza el badge "AA")
   <AxzyLogo variant="loader" style={{ width: 96 }} />       // pantalla de carga
*/
