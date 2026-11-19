import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Cuenta de 0 hasta `appContar` cuando el número entra en pantalla.
 * El texto inicial ya es el número final (se ve bien sin JavaScript o con "menos movimiento").
 */
@Directive({ selector: '[appContar]' })
export class Contar implements OnInit, OnDestroy {
  readonly appContar = input.required<number>();
  readonly duracion = input(1400);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;
  private cuadro = 0;

  ngOnInit(): void {
    const fin = this.appContar();
    if (
      typeof IntersectionObserver === 'undefined' ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    this.el.textContent = '0';
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        this.observer?.disconnect();
        const t0 = performance.now();
        const paso = (ahora: number): void => {
          const k = Math.min(1, (ahora - t0) / this.duracion());
          const suave = 1 - Math.pow(1 - k, 4);
          this.el.textContent = String(Math.round(fin * suave));
          if (k < 1) this.cuadro = requestAnimationFrame(paso);
        };
        this.cuadro = requestAnimationFrame(paso);
      },
      { threshold: 0.6 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.cuadro);
  }
}
