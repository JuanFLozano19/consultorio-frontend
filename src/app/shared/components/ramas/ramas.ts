import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Rama de pino con esferas para una esquina superior (decorativo). */
@Component({
  selector: 'app-ramas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class.derecha]': "lado() === 'derecha'" },
  template: `
    <svg viewBox="0 0 260 170">
      <g class="pino">
        <path
          d="M-10 18 C 60 30 140 40 250 26"
          stroke="#5b3a26"
          stroke-width="7"
          fill="none"
          stroke-linecap="round"
        />
        @for (k of agujas; track $index) {
          <path
            [attr.d]="'M' + k.x + ' ' + k.y + ' l ' + k.dx + ' ' + k.dy"
            [attr.stroke]="k.c"
            stroke-width="4"
            stroke-linecap="round"
          />
        }
      </g>
      <g class="bolas">
        <line x1="70" y1="34" x2="70" y2="78" stroke="#b8913a" stroke-width="1.5" />
        <circle cx="70" cy="92" r="15" fill="#e2774a" />
        <circle cx="65" cy="86" r="4" fill="#fff" opacity=".7" />
        <line x1="150" y1="38" x2="150" y2="104" stroke="#b8913a" stroke-width="1.5" />
        <circle cx="150" cy="118" r="12" fill="#ffd23f" />
        <circle cx="146" cy="113" r="3" fill="#fff" opacity=".7" />
        <line x1="210" y1="32" x2="210" y2="58" stroke="#b8913a" stroke-width="1.5" />
        <circle cx="210" cy="70" r="10" fill="#8fd3c8" />
        <circle cx="207" cy="66" r="2.6" fill="#fff" opacity=".7" />
      </g>
      <g class="bayas">
        <circle cx="112" cy="40" r="6" fill="#c0533a" />
        <circle cx="122" cy="44" r="6" fill="#c0533a" />
        <circle cx="116" cy="50" r="6" fill="#c0533a" />
      </g>
    </svg>
  `,
  styles: `
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: clamp(150px, 20vw, 260px);
      pointer-events: none;
      z-index: 0;
    }
    :host(.derecha) {
      left: auto;
      right: 0;
      scale: -1 1;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .bolas {
      transform-origin: 50% 20%;
    }
    @keyframes mecer {
      from {
        rotate: -1.5deg;
      }
      to {
        rotate: 1.5deg;
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      .bolas {
        animation: mecer 3.2s ease-in-out infinite alternate;
      }
    }
  `,
})
export class Ramas {
  readonly lado = input<'izquierda' | 'derecha'>('izquierda');
  /** Agujas de pino a lo largo de la rama, en dos tonos de verde. */
  protected readonly agujas = [...Array(30)].flatMap((_, i) => {
    const x = i * 8.5;
    const y = 18 + (x / 260) * 12 - Math.sin((x / 260) * Math.PI) * 4;
    const c = i % 2 ? '#2f7d4e' : '#3f9a63';
    return [
      { x, y, dx: 10, dy: -14, c },
      { x, y, dx: 12, dy: 14, c: i % 2 ? '#3f9a63' : '#2f7d4e' },
    ];
  });
}
