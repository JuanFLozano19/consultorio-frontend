import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Isotipo: estetoscopio en forma de corazón con las iniciales JP. Toma el color del texto.
 * Con [animado]="true" el estetoscopio se dibuja al cargar (se omite si el usuario pidió menos movimiento).
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="width()"
      [attr.height]="size()"
      viewBox="0 0 200 220"
      [attr.stroke-width]="strokeWidth()"
      [class.animado]="animado()"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
    >
      <g fill="none" stroke="currentColor" stroke-linecap="round">
        <path class="trazo" pathLength="1" d="M55 32 C 22 62, 38 108, 100 142"></path>
        <path class="trazo" pathLength="1" d="M145 32 C 178 62, 162 108, 100 142"></path>
        <path class="trazo trazo--2" pathLength="1" d="M100 142 C 100 180, 116 198, 136 192"></path>
        <path class="trazo trazo--3" pathLength="1" d="M48 26 L58 32 M152 26 L142 32"></path>
      </g>
      <circle
        class="trazo trazo--3"
        pathLength="1"
        cx="152"
        cy="186"
        r="17"
        fill="none"
        stroke="currentColor"
      ></circle>
      <circle class="aparece" cx="152" cy="186" r="7" fill="currentColor"></circle>
      <!-- prettier-ignore -->
      <text class="aparece" x="96" y="98" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="52" fill="currentColor" stroke="none">J<tspan dx="-9">P</tspan></text>
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
    }
    svg {
      max-width: 100%;
      height: auto;
    }
    @media (prefers-reduced-motion: no-preference) {
      .animado .trazo {
        stroke-dasharray: 1;
        animation: dibujar 1.4s cubic-bezier(0.65, 0, 0.35, 1) 0.2s both;
      }
      .animado .trazo--2 {
        animation-delay: 0.9s;
        animation-duration: 0.8s;
      }
      .animado .trazo--3 {
        animation-delay: 1.5s;
        animation-duration: 0.6s;
      }
      .animado .aparece {
        animation: aparecer 0.8s ease 1.9s both;
      }
    }
    @keyframes dibujar {
      0% {
        stroke-dashoffset: 1;
        opacity: 0;
      }
      2% {
        opacity: 1;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
    }
    @keyframes aparecer {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
})
export class Logo {
  readonly size = input(44);
  readonly strokeWidth = input(6);
  readonly label = input('');
  readonly animado = input(false);
  protected readonly width = computed(() => Math.round(this.size() * (200 / 220)));
}
