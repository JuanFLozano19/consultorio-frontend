import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { instagramHref, whatsappHref } from '../../../../core/config/site.config';
import { RelojTemporada } from '../../../../core/reloj-temporada';

const LLAVE = 'aviso-temporada-cerrado';

/** Franja de temporada (Navidad y Año Nuevo) arriba de la página; se puede cerrar. */
@Component({
  selector: 'app-temporada',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (aviso(); as a) {
      <aside class="temp" aria-label="Aviso de temporada">
        <span class="luces" aria-hidden="true">
          @for (c of luces; track $index) {
            <i [style.background]="c" [style.--k]="$index"></i>
          }
        </span>
        <p class="txt">
          @if (a.icono === 'vela') {
            <svg class="vela" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="9" y="11" width="6" height="11" rx="1.5" fill="currentColor" opacity=".9" />
              <path
                class="vela__llama"
                d="M12 2c2.2 2.6 2.6 4.6 0 7.2C9.4 6.6 9.8 4.6 12 2z"
                fill="#ffd23f"
              />
            </svg>
          } @else if (a.icono === 'regalo') {
            <svg class="ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="4" y="10" width="16" height="11" rx="2" fill="#e2774a" />
              <rect x="3" y="7" width="18" height="4" rx="1.5" fill="#f0b893" />
              <rect x="11" y="7" width="2" height="14" fill="#ffd23f" />
              <path d="M12 7c-2-4-5-3-4-1s4 1 4 1zm0 0c2-4 5-3 4-1s-4 1-4 1z" fill="#ffd23f" />
            </svg>
          } @else if (a.icono === 'uvas') {
            <svg class="ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <g fill="#b48ad8">
                <circle cx="9" cy="9" r="3" />
                <circle cx="15" cy="9" r="3" />
                <circle cx="12" cy="13" r="3" />
                <circle cx="8" cy="15" r="3" />
                <circle cx="16" cy="15" r="3" />
                <circle cx="12" cy="19" r="3" />
              </g>
              <path d="M12 6V2" stroke="#8fd3c8" stroke-width="2" stroke-linecap="round" />
            </svg>
          } @else if (a.icono === 'confeti') {
            <svg class="ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M3 21l5-14 9 9z" fill="#ffd23f" />
              <circle cx="16" cy="5" r="1.6" fill="#e2774a" />
              <circle cx="20" cy="10" r="1.6" fill="#8fd3c8" />
              <circle cx="12" cy="3" r="1.2" fill="#f6efe4" />
              <circle cx="21" cy="4" r="1.2" fill="#f0b893" />
            </svg>
          } @else {
            <svg class="estrella" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12 2.5l2.6 6 6.5.6-4.9 4.3 1.5 6.4L12 16.5l-5.7 3.3 1.5-6.4L2.9 9.1l6.5-.6z"
                fill="currentColor"
              />
            </svg>
          }
          <b>{{ a.etiqueta }}</b>
          <span class="sep" aria-hidden="true">·</span>
          <span>{{ a.texto }}</span>
          @if (a.accion; as acc) {
            <a
              class="cta"
              [href]="acc.destino === 'whatsapp' ? wa : ig"
              target="_blank"
              rel="noopener"
              >{{ acc.texto }} →</a
            >
          }
        </p>
        <button type="button" class="cerrar" (click)="cerrar(a.clave)" aria-label="Cerrar aviso">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </aside>
    }
  `,
  styles: `
    .temp {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 12px 52px 12px 20px;
      background: var(--slate-ink);
      color: var(--on-slate);
      font-size: 15px;
      overflow: hidden;
      animation: bajar 0.6s var(--ease-out) both;
    }
    .luces {
      position: absolute;
      inset: 0 0 auto 0;
      display: flex;
      justify-content: space-around;
      pointer-events: none;
      i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-top: -2px;
        opacity: 0.85;
      }
    }
    .txt {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 4px 8px;
      text-align: center;
    }
    .estrella {
      color: #f0b893;
    }
    .vela {
      color: #f6efe4;
    }
    .vela__llama {
      transform-origin: 12px 9px;
    }
    @media (prefers-reduced-motion: no-preference) {
      .vela__llama {
        animation: llama 1.1s ease-in-out infinite alternate;
      }
    }
    @keyframes llama {
      to {
        transform: scale(0.85, 1.12) skewX(4deg);
      }
    }
    b {
      font-weight: 600;
    }
    .sep {
      opacity: 0.6;
    }
    .cta {
      color: inherit;
      font-weight: 600;
      text-underline-offset: 3px;
      margin-left: 4px;
    }
    .cerrar {
      position: absolute;
      right: 10px;
      top: 50%;
      translate: 0 -50%;
      width: 36px;
      height: 36px;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: inherit;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background 0.2s ease;
      &:hover {
        background: color-mix(in srgb, var(--on-slate) 14%, transparent);
      }
      &:active {
        scale: 0.94;
      }
    }
    @keyframes bajar {
      from {
        transform: translateY(-100%);
      }
    }
    @keyframes titilar {
      50% {
        opacity: 0.25;
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      .luces i {
        animation: titilar 2.4s ease-in-out infinite;
        animation-delay: calc(var(--k) * -0.37s);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .temp {
        animation: none;
      }
    }
    @media (max-width: 560px) {
      .temp {
        font-size: 14px;
        padding: 12px 46px 12px 14px;
      }
      .sep {
        display: none;
      }
      .txt b {
        flex-basis: 100%;
      }
    }
  `,
})
export class Temporada {
  protected readonly wa = whatsappHref();
  protected readonly ig = instagramHref();
  protected readonly luces = [...Array(18)].map(
    (_, i) => ['#ffd23f', '#e2774a', '#f6efe4', '#8fd3c8'][i % 4],
  );
  private readonly reloj = inject(RelojTemporada);
  private readonly cerrado = signal(leer());
  protected readonly aviso = computed(() => {
    const a = this.reloj.aviso();
    return a && a.clave !== this.cerrado() ? a : null;
  });

  protected cerrar(clave: string): void {
    this.cerrado.set(clave);
    try {
      localStorage.setItem(LLAVE, clave);
    } catch {
      /* sin almacenamiento: se cierra solo por esta visita */
    }
  }
}

function leer(): string {
  try {
    return localStorage.getItem(LLAVE) ?? '';
  } catch {
    return '';
  }
}
