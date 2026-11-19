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
    if (retraso) this.el.style.setProperty('--d', `${retraso}ms`);
    this.partirTitulos();
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

  /**
   * Parte en palabras los títulos h2 que pertenecen a este bloque, para que aparezcan
   * una por una (ver `.tw .w` en styles.scss). Solo toca texto fijo de la plantilla.
   */
  private partirTitulos(): void {
    const titulos = [...this.el.querySelectorAll('h2')].filter(
      (h) => h.closest('.reveal') === this.el && !h.classList.contains('tw'),
    );
    for (const h of titulos) {
      let i = 0;
      const recorrer = (nodo: Node): void => {
        for (const hijo of [...nodo.childNodes]) {
          if (hijo.nodeType === Node.TEXT_NODE) {
            const partes = (hijo.textContent ?? '').split(/(\s+)/);
            const frag = document.createDocumentFragment();
            for (const parte of partes) {
              if (!parte) continue;
              if (/^\s+$/.test(parte)) {
                frag.append(parte);
              } else {
                const w = document.createElement('span');
                w.className = 'w';
                w.style.setProperty('--i', String(i++));
                w.textContent = parte;
                frag.append(w);
              }
            }
            hijo.replaceWith(frag);
          } else if (hijo instanceof HTMLElement && hijo.tagName !== 'BR') {
            recorrer(hijo);
          }
        }
      };
      recorrer(h);
      h.classList.add('tw');
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
