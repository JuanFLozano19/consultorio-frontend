import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ahoraEnBogota } from '../../../../core/config/horario';
import { instagramHref, whatsappHref } from '../../../../core/config/site.config';
import { avisoTemporada } from '../../../../core/config/temporada';

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
          <svg class="estrella" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M12 2.5l2.6 6 6.5.6-4.9 4.3 1.5 6.4L12 16.5l-5.7 3.3 1.5-6.4L2.9 9.1l6.5-.6z"
              fill="currentColor"
            />
          </svg>
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
  private readonly cerrado = signal(leer());
  protected readonly aviso = computed(() => {
    const a = avisoTemporada(ahoraEnBogota().hoy);
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
