import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Hace aparecer el elemento (sube y se desvanece) cuando entra en pantalla.
 * Solo se oculta si el navegador lo soporta y el usuario no pidió menos movimiento
 * (clase `js-reveal` en <html>, ver index.html); si no, el contenido siempre es visible.
 * Uso: <div appReveal> o <div [appReveal]="120"> (retraso en ms para escalonar).
 */
@Directive({ selector: '[appReveal]', host: { class: 'reveal' } })
export class Reveal implements OnInit, OnDestroy {
  readonly appReveal = input<number | ''>('');
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const retraso = Number(this.appReveal()) || 0;
    if (retraso) this.el.style.transitionDelay = `${retraso}ms`;
    if (typeof IntersectionObserver === 'undefined') {
      this.el.classList.add('is-in');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.el.classList.add('is-in');
            this.observer?.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
