import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Publica en el elemento cuánto ha avanzado el scroll, para animar con CSS:
 * - `--p` (0 → 1): 0 cuando el borde superior está en `desde` × alto de ventana,
 *   1 cuando el borde inferior llega a `hasta` × alto de ventana.
 * - `--sy`: desplazamiento vertical de la página en píxeles (sin unidad), para parallax.
 * Un solo cálculo por cuadro (requestAnimationFrame) y escucha pasiva.
 */
@Directive({ selector: '[appScrollProgreso]' })
export class ScrollProgreso implements OnInit, OnDestroy {
  readonly desde = input(0.85);
  readonly hasta = input(0.5);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private cuadro = 0;
  private readonly alMover = (): void => {
    if (!this.cuadro) this.cuadro = requestAnimationFrame(() => this.medir());
  };

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', this.alMover, { passive: true });
    window.addEventListener('resize', this.alMover, { passive: true });
    this.medir();
  }

  private medir(): void {
    this.cuadro = 0;
    const vh = window.innerHeight || 1;
    const r = this.el.getBoundingClientRect();
    const total = r.height + vh * (this.desde() - this.hasta());
    const p = total > 0 ? (vh * this.desde() - r.top) / total : 1;
    this.el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
    if (r.bottom > -200 && r.top < vh + 200)
      this.el.style.setProperty('--sy', String(Math.round(window.scrollY)));
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.alMover);
    window.removeEventListener('resize', this.alMover);
    cancelAnimationFrame(this.cuadro);
  }
}
