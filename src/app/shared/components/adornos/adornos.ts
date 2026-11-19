import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const COLORES = ['#e2774a', '#ffd23f', '#8fd3c8', '#f0b893', '#c0533a', '#f6efe4'];

/** Esferas navideñas colgando del borde superior de una sección (decorativo). */
@Component({
  selector: 'app-adornos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    @for (a of adornos(); track $index) {
      <span
        class="adorno"
        [class.solo-ancho]="a.soloAncho"
        [style.left.%]="a.x"
        [style.--largo.px]="a.largo"
        [style.--tam.px]="a.tam"
        [style.--color]="a.color"
        [style.--ritmo.s]="a.ritmo"
        [style.--ret.s]="a.ret"
      >
        <i class="hilo"></i><i class="tapa"></i><i class="bola"></i>
      </span>
    }
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0 0 auto 0;
      height: 0;
      z-index: 1;
      pointer-events: none;
    }
    .adorno {
      position: absolute;
      top: 0;
      width: var(--tam);
      translate: -50% 0;
      transform-origin: 50% 0;
    }
    .hilo {
      display: block;
      width: 1.5px;
      height: var(--largo);
      margin: 0 auto;
      background: color-mix(in srgb, currentColor 45%, transparent);
    }
    .tapa {
      display: block;
      width: calc(var(--tam) * 0.34);
      height: calc(var(--tam) * 0.18);
      margin: 0 auto -2px;
      border-radius: 3px 3px 1px 1px;
      background: linear-gradient(90deg, #b8913a, #f2d37a, #b8913a);
    }
    .bola {
      display: block;
      width: var(--tam);
      height: var(--tam);
      border-radius: 50%;
      background: radial-gradient(
        circle at 32% 28%,
        rgba(255, 255, 255, 0.85) 0 9%,
        var(--color) 26%,
        color-mix(in srgb, var(--color) 70%, #000) 100%
      );
      box-shadow: 0 8px 14px -8px rgba(0, 0, 0, 0.5);
    }
    @keyframes mecer {
      from {
        rotate: -5deg;
      }
      to {
        rotate: 5deg;
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      .adorno {
        animation: mecer var(--ritmo) ease-in-out var(--ret) infinite alternate;
      }
    }
    @media (max-width: 700px) {
      .solo-ancho {
        display: none;
      }
      .hilo {
        height: calc(var(--largo) * 0.6);
      }
      .adorno {
        scale: 0.85;
      }
    }
  `,
})
export class Adornos {
  readonly cantidad = input(9);
  /** Color del hilo (por defecto el del texto de la sección). */
  protected readonly adornos = computed(() => {
    const n = this.cantidad();
    return [...Array(n)].map((_, i) => ({
      x: 4 + ((i + 0.5) * 92) / n + (((i * 37) % 7) - 3),
      largo: 8 + ((i * 53) % 5) * 11,
      tam: 22 + ((i * 29) % 3) * 8,
      color: COLORES[(i * 5) % COLORES.length],
      ritmo: 2.4 + ((i * 17) % 5) * 0.35,
      ret: -((i * 0.7) % 3),
      soloAncho: i % 2 === 1,
    }));
  });
}
