import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/** Barra de progreso de lectura (arriba) y botón para volver al inicio (abajo). */
@Component({
  selector: 'app-progreso',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'medir()', '(window:resize)': 'medir()' },
  template: `
    <div class="barra" aria-hidden="true" [style.transform]="'scaleX(' + avance() + ')'"></div>
    <a
      class="arriba"
      href="#inicio"
      [class.arriba--ver]="mostrarBoton()"
      [attr.tabindex]="mostrarBoton() ? null : -1"
      [attr.aria-hidden]="mostrarBoton() ? null : 'true'"
      aria-label="Volver al inicio"
    >
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        <circle
          class="aro"
          cx="24"
          cy="24"
          r="21"
          pathLength="1"
          [style.stroke-dasharray]="avance() + ' 1'"
        />
        <path
          d="M24 31V17m-6 6 6-6 6 6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
  `,
  styles: `
    .barra {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      z-index: 20;
      background: linear-gradient(90deg, var(--slate), var(--clay));
      transform-origin: left;
      pointer-events: none;
    }
    .arriba {
      position: fixed;
      right: calc(26px + env(safe-area-inset-right, 0px));
      bottom: calc(92px + env(safe-area-inset-bottom, 0px));
      z-index: 6;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--card);
      color: var(--slate-ink);
      box-shadow: 0 10px 24px -8px rgba(20, 40, 46, 0.35);
      opacity: 0;
      transform: translateY(14px) scale(0.8);
      pointer-events: none;
      transition:
        opacity 0.3s,
        transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .arriba--ver {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }
    .arriba:hover {
      transform: translateY(-3px);
    }
    svg {
      position: absolute;
      inset: 0;
    }
    .aro {
      fill: none;
      stroke: var(--clay);
      stroke-width: 2.5;
      stroke-linecap: round;
      transform: rotate(-90deg);
      transform-origin: center;
    }
  `,
})
export class Progreso {
  protected readonly avance = signal(0);
  protected readonly mostrarBoton = signal(false);

  protected medir(): void {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    const y = el.scrollTop || window.scrollY;
    this.avance.set(max > 0 ? Math.min(1, y / max) : 0);
    this.mostrarBoton.set(y > 700);
  }
}
