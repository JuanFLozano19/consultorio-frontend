import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fechaCorta, ultimasNoticias } from '../../../../core/config/noticias';
import { Reveal } from '../../../../shared/directives/reveal';

/** Noticias de salud de fuentes oficiales, resumidas y con «qué puedes hacer». */
@Component({
  selector: 'app-noticias',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="noticias" class="band" aria-labelledby="noticias-titulo">
      <div class="wrap">
        <div class="section-head" appReveal>
          <p class="eyebrow">Noticias de salud</p>
          <h2 id="noticias-titulo">Lo que pasa <em>en salud</em></h2>
          <p>
            Noticias de fuentes oficiales, contadas en palabras sencillas y con lo que puedes hacer.
          </p>
        </div>
        <div class="grid">
          @for (n of noticias; track n.enlace; let i = $index) {
            <article class="nota" [class.nota--destacada]="i === 0" [appReveal]="i * 110">
              <p class="meta">
                <span class="fuente">{{ n.fuente }}</span>
                <time [attr.datetime]="n.fecha">{{ fecha(n.fecha) }}</time>
              </p>
              <h3>{{ n.titulo }}</h3>
              <p class="resumen">{{ n.resumen }}</p>
              <div class="hacer">
                <span class="hacer__t">Qué puedes hacer</span>
                <p>{{ n.queHacer }}</p>
              </div>
              <a class="leer" [href]="n.enlace" target="_blank" rel="noopener"
                >Leer en la fuente<span class="sr-only">: {{ n.titulo }}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </article>
          }
        </div>
        <p class="nota-pie" appReveal>
          Resúmenes informativos hechos por el consultorio. No reemplazan la consulta médica.
        </p>
      </div>
    </section>
  `,
  styles: `
    h2 em {
      font-style: italic;
      color: var(--clay);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-auto-rows: auto;
      gap: 18px;
    }
    .nota {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 24px 26px;
      border-radius: 24px;
      background: var(--card);
      border: 1px solid var(--line);
      transition:
        transform 0.35s var(--ease-out),
        box-shadow 0.35s var(--ease-out);
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 40px -28px rgba(20, 40, 46, 0.45);
        }
      }
    }
    .nota--destacada {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      grid-template-areas: 'meta hacer' 'h3 hacer' 'res hacer' 'leer hacer';
      align-content: start;
      column-gap: 40px;
      background: var(--slate-ink);
      color: var(--on-slate);
      border-color: transparent;
      padding: 34px;
      gap: 16px;
      h3 {
        font-size: clamp(30px, 3.4vw, 42px);
        color: inherit;
      }
      .resumen {
        font-size: 18px;
        opacity: 0.9;
      }
      .fuente {
        background: color-mix(in srgb, var(--on-slate) 16%, transparent);
        color: inherit;
      }
      .meta,
      .leer {
        color: inherit;
      }
      .hacer {
        background: color-mix(in srgb, var(--on-slate) 10%, transparent);
        border-color: color-mix(in srgb, var(--on-slate) 25%, transparent);
      }
      .hacer__t {
        color: inherit;
        opacity: 0.85;
      }
      .meta {
        grid-area: meta;
      }
      h3 {
        grid-area: h3;
      }
      .resumen {
        grid-area: res;
      }
      .leer {
        grid-area: leer;
      }
      .hacer {
        grid-area: hacer;
        align-self: center;
        padding: 20px 22px;
        p {
          font-size: 17px;
        }
      }
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      color: var(--muted);
      margin: 0;
    }
    .fuente {
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--sand);
      color: var(--slate-ink);
      font-weight: 500;
      letter-spacing: 0.04em;
    }
    h3 {
      font-size: 24px;
      line-height: 1.15;
      margin: 0;
    }
    .resumen {
      margin: 0;
      font-size: 15.5px;
    }
    .hacer {
      border-left: 3px solid var(--clay);
      padding: 10px 14px;
      border-radius: 0 12px 12px 0;
      background: color-mix(in srgb, var(--clay) 7%, transparent);
      p {
        margin: 2px 0 0;
        font-size: 15px;
      }
    }
    .nota--destacada .hacer {
      border-left-color: currentColor;
    }
    .hacer__t {
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--clay);
      font-weight: 500;
    }
    .leer {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      color: var(--slate-ink);
      text-underline-offset: 4px;
      svg {
        transition: transform 0.25s var(--ease-out);
      }
      &:hover svg {
        transform: translate(2px, -2px);
      }
    }
    .nota-pie {
      margin-top: 22px;
      font-size: 13px;
      color: var(--muted);
    }
    @media (max-width: 860px) {
      .grid {
        grid-template-columns: 1fr;
      }
      .nota--destacada {
        display: flex;
        padding: 28px 24px;
      }
    }
  `,
})
export class Noticias {
  protected readonly noticias = ultimasNoticias(4);
  protected readonly fecha = fechaCorta;
}
