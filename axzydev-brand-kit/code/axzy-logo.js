// Vanilla JS / cualquier framework.  npm i lottie-web
// Copia /lottie/*.json a tu carpeta pública (p. ej. /public/lottie/)
import lottie from 'lottie-web';

const FILES = {
  'logo-light': '/lottie/axzydev-logo-intro-light.json', // para fondo claro
  'logo-dark':  '/lottie/axzydev-logo-intro-dark.json',  // para fondo oscuro
  icon:         '/lottie/axzydev-icon-intro.json',       // una sola vez (2.5 s)
  loader:       '/lottie/axzydev-icon-loop.json',        // en bucle (3 s)
  'logo-black': '/lottie/axzydev-logo-intro-black.json',
  'logo-white': '/lottie/axzydev-logo-intro-white.json',
  'icon-navy': '/lottie/axzydev-icon-intro-navy.json',
  'icon-black': '/lottie/axzydev-icon-intro-black.json',
  'icon-white': '/lottie/axzydev-icon-intro-white.json',
  'loader-navy': '/lottie/axzydev-icon-loop-navy.json',
  'loader-black': '/lottie/axzydev-icon-loop-black.json',
  'loader-white': '/lottie/axzydev-icon-loop-white.json',
};

export function resolveTheme() {
  const root = document.documentElement;
  const attr = root.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  if (root.classList.contains('dark')) return 'dark';
  if (root.classList.contains('light')) return 'light';
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** mountAxzy(el, { variant: 'logo'|'icon'|'loader', theme?: 'light'|'dark'|'black'|'white', tone?: 'teal'|'navy'|'black'|'white' }) */
export function mountAxzy(el, { variant = 'logo', theme = resolveTheme(), tone = 'teal' } = {}) {
  const key = variant === 'logo' ? `logo-${theme}` : tone === 'teal' ? variant : `${variant}-${tone}`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const anim = lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: variant === 'loader',
    autoplay: !reduce,
    path: FILES[key],
    rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
  });
  // Con "reducir movimiento" mostramos el último fotograma, estático.
  if (reduce) anim.addEventListener('DOMLoaded', () => anim.goToAndStop(anim.totalFrames - 1, true));
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', 'axzydev');
  return anim; // anim.goToAndPlay(0) para repetir; anim.destroy() para limpiar
}
