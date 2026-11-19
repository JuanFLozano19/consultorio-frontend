import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const COLORES = ['#ffd23f', '#e2774a', '#8fd3c8', '#f6efe4'];

/**
 * Guirnalda de luces navideñas (decorativa).
 * - forma 'recta': cable ondulado a lo ancho (para el menú).
 * - forma 'arco': sigue el borde superior de la foto en arco del inicio.
 */
@Component({
  selector: 'app-guirnalda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'guirnalda' },
  template: `
    <svg [attr.viewBox]="caja()" preserveAspectRatio="none" class="g">
      <path [attr.d]="cable()" class="g__cable" />
      @for (b of bombillos(); track $index) {
        <g [attr.transform]="b.t">
          <rect x="-3.5" y="-2" width="7" height="6" rx="1.5" class="g__base" />
          <ellipse cy="9" rx="5.5" ry="8" [attr.fill]="b.c" class="g__luz" [style.--k]="$index" />
        </g>
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
      pointer-events: none;
    }
    .g {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .g__cable {
      fill: none;
      stroke: color-mix(in srgb, var(--slate-ink) 70%, transparent);
      stroke-width: 1.4;
      vector-effect: non-scaling-stroke;
    }
    .g__base {
      fill: var(--slate-ink);
    }
    .g__luz {
      filter: drop-shadow(0 0 4px currentColor);
    }
    @keyframes titilar {
      50% {
        opacity: 0.3;
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      .g__luz {
        animation: titilar 2.6s ease-in-out infinite;
        animation-delay: calc(var(--k) * -0.43s);
      }
    }
  `,
})
export class Guirnalda {
  readonly forma = input<'recta' | 'arco'>('recta');
  readonly cantidad = input(24);

  protected readonly caja = computed(() =>
    this.forma() === 'arco' ? '0 0 400 210' : '0 0 1200 30',
  );

  protected readonly cable = computed(() => {
    if (this.forma() === 'arco') return 'M2 206 A198 198 0 0 1 398 206';
    let d = 'M0 4';
    const n = this.cantidad();
    for (let i = 0; i < n; i++) {
      const x0 = (i * 1200) / n;
      const x1 = ((i + 1) * 1200) / n;
      d += ` Q ${(x0 + x1) / 2} 16 ${x1} 4`;
    }
    return d;
  });

  protected readonly bombillos = computed(() => {
    const n = this.cantidad();
    return [...Array(n)].map((_, i) => {
      const c = COLORES[i % COLORES.length];
      if (this.forma() === 'arco') {
        // de 172° a 8° sobre el arco superior (centro 200,206, radio 198)
        const a = ((172 - (i * 164) / (n - 1)) * Math.PI) / 180;
        const x = 200 + 198 * Math.cos(a);
        const y = 206 - 198 * Math.sin(a);
        const giro = 90 - (a * 180) / Math.PI;
        return { c, t: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${giro.toFixed(1)})` };
      }
      const x = ((i + 0.5) * 1200) / n;
      return { c, t: `translate(${x.toFixed(1)} 10) rotate(${i % 2 ? 8 : -8})` };
    });
  });
}
