import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SITE, whatsappHref } from '../../../../core/config/site.config';
import {
  archivoIcs,
  enlaceGoogleCalendar,
  fechaEnMeses,
  fechaLarga,
} from '../../../../core/salud/recordatorio';
import { Reveal } from '../../../../shared/directives/reveal';

/** «Recuérdame mi próximo chequeo»: lo agrega al calendario de la persona. */
@Component({
  selector: 'app-recordatorio',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="recordatorio" class="band rec" aria-labelledby="rec-titulo">
      <div class="wrap rec__caja" appReveal>
        <div class="rec__icono" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="56" height="56">
            <rect
              x="6"
              y="10"
              width="36"
              height="32"
              rx="6"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            />
            <path
              d="M6 19h36M16 6v8M32 6v8"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <path
              d="M17 30l5 5 9-10"
              fill="none"
              stroke="var(--clay)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="rec__texto">
          <p class="eyebrow">Para no olvidarlo</p>
          <h2 id="rec-titulo">Recuérdame mi próximo <em>chequeo</em></h2>
          <p>
            Elige cuándo y lo agregamos a tu calendario, con un aviso un día antes. No guardamos tus
            datos: el recordatorio queda solo en tu celular o en tu cuenta.
          </p>
          <div class="rec__plazos" role="radiogroup" aria-label="¿Cuándo?">
            @for (o of opciones; track o.meses) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="meses() === o.meses"
                (click)="meses.set(o.meses)"
              >
                {{ o.texto }}
              </button>
            }
          </div>
          <p class="rec__fecha">
            Te lo recordamos el <b>{{ fechaTexto() }}</b>
          </p>
          <div class="rec__acciones">
            <a class="btn" [href]="google()" target="_blank" rel="noopener">Google Calendar</a>
            <button type="button" class="btn btn--ghost" (click)="descargarIcs()">
              iPhone u otro calendario
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .rec {
      padding-block: 64px;
    }
    .rec__caja {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 28px;
      align-items: start;
      max-width: 880px;
      padding: 36px;
      border-radius: 28px;
      background: var(--card);
      border: 1px solid var(--line);
    }
    .rec__icono {
      color: var(--slate);
      width: 88px;
      height: 88px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--sand);
    }
    h2 {
      margin: 6px 0 10px;
      em {
        font-style: italic;
        color: var(--clay);
      }
    }
    .rec__plazos {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 18px 0 10px;
      button {
        padding: 10px 18px;
        border-radius: 999px;
        border: 1.5px solid var(--line);
        background: transparent;
        color: var(--slate-ink);
        font: inherit;
        font-weight: 500;
        cursor: pointer;
        transition:
          background 0.2s,
          color 0.2s,
          transform 160ms var(--ease-out);
        &:active {
          transform: scale(0.97);
        }
        &[aria-checked='true'] {
          background: var(--slate-ink);
          border-color: var(--slate-ink);
          color: var(--on-slate);
        }
      }
    }
    .rec__fecha {
      color: var(--muted);
      b {
        color: var(--slate-ink);
      }
    }
    .rec__acciones {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 16px;
    }
    @media (max-width: 640px) {
      .rec__caja {
        grid-template-columns: 1fr;
        padding: 26px 22px;
        gap: 14px;
      }
      .rec__icono {
        width: 68px;
        height: 68px;
      }
      .rec__acciones .btn {
        flex: 1 1 100%;
        justify-content: center;
      }
    }
  `,
})
export class Recordatorio {
  protected readonly opciones = [
    { meses: 3, texto: 'En 3 meses' },
    { meses: 6, texto: 'En 6 meses' },
    { meses: 12, texto: 'En 1 año' },
  ];
  protected readonly meses = signal(6);
  private readonly fecha = computed(() => fechaEnMeses(new Date(), this.meses()));
  protected readonly fechaTexto = computed(() => fechaLarga(this.fecha()));

  private readonly datos = (() => {
    const a = SITE.contact.address;
    return {
      titulo: `Chequeo preventivo con el ${SITE.doctor.name}`,
      detalle: `Es momento de tu chequeo. Agenda por WhatsApp: ${whatsappHref()}`,
      lugar: `${a.street}, ${a.floor}, ${a.building}, ${a.city}`,
    };
  })();

  protected readonly google = computed(() => enlaceGoogleCalendar(this.fecha(), this.datos));

  protected descargarIcs(): void {
    const ics = archivoIcs(this.fecha(), this.datos);
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recordatorio-chequeo.ics';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
}
