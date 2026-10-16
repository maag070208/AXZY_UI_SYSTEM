// Angular 16+ (standalone).  npm i lottie-web
// Copia /lottie/*.json a /public/lottie/ (Angular 18+) o /src/assets/lottie/ (ajusta BASE)
import {
  AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges,
  OnDestroy, ViewChild,
} from '@angular/core';
import lottie, { AnimationItem } from 'lottie-web';

const BASE = '/lottie/';
const FILES: Record<string, string> = {
  'logo-light': 'axzydev-logo-intro-light.json',
  'logo-dark': 'axzydev-logo-intro-dark.json',
  icon: 'axzydev-icon-intro.json',
  loader: 'axzydev-icon-loop.json',
  'logo-black': 'axzydev-logo-intro-black.json',
  'logo-white': 'axzydev-logo-intro-white.json',
  'icon-navy': 'axzydev-icon-intro-navy.json',
  'icon-black': 'axzydev-icon-intro-black.json',
  'icon-white': 'axzydev-icon-intro-white.json',
  'loader-navy': 'axzydev-icon-loop-navy.json',
  'loader-black': 'axzydev-icon-loop-black.json',
  'loader-white': 'axzydev-icon-loop-white.json',
};

@Component({
  selector: 'axzy-logo',
  standalone: true,
  template: `<div #host role="img" aria-label="axzydev" style="width:100%"></div>`,
  styles: [`:host { display: inline-block; width: var(--axzy-logo-width, 280px); }`],
})
export class AxzyLogoComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() variant: 'logo' | 'icon' | 'loader' = 'logo';
  @Input() theme?: 'light' | 'dark' | 'black' | 'white'; // logo; si lo omites, sigue el tema del sitio
  @Input() tone: 'teal' | 'navy' | 'black' | 'white' = 'teal'; // icon / loader
  @Input() replayOnHover = false;

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  private anim?: AnimationItem;
  private mo?: MutationObserver;

  private currentTheme(): 'light' | 'dark' | 'black' | 'white' {
    if (this.theme) return this.theme;
    const root = document.documentElement;
    const attr = root.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    if (root.classList.contains('dark')) return 'dark';
    if (root.classList.contains('light')) return 'light';
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private load() {
    this.anim?.destroy();
    const key = this.variant === 'logo' ? `logo-${this.currentTheme()}`
      : this.tone === 'teal' ? this.variant : `${this.variant}-${this.tone}`;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.anim = lottie.loadAnimation({
      container: this.host.nativeElement,
      renderer: 'svg',
      loop: this.variant === 'loader',
      autoplay: !reduce,
      path: BASE + FILES[key],
    });
    if (reduce) {
      this.anim.addEventListener('DOMLoaded', () =>
        this.anim!.goToAndStop(this.anim!.totalFrames - 1, true));
    }
  }

  ngAfterViewInit() {
    this.load();
    this.mo = new MutationObserver(() => !this.theme && this.load());
    this.mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  }
  ngOnChanges() { if (this.anim) this.load(); }
  ngOnDestroy() { this.anim?.destroy(); this.mo?.disconnect(); }

  @HostListener('mouseenter')
  onEnter() { if (this.replayOnHover && this.variant !== 'loader') this.anim?.goToAndPlay(0); }
}

/* Uso:
   imports: [AxzyLogoComponent]
   <axzy-logo variant="logo" style="--axzy-logo-width: 280px" />
   <axzy-logo variant="icon" style="--axzy-logo-width: 40px" />
   <axzy-logo variant="loader" style="--axzy-logo-width: 96px" />
   <axzy-logo variant="logo" theme="black" />
   <axzy-logo variant="icon" tone="white" />
*/
