import { ChangeDetectionStrategy, Component } from '@angular/core';
import { whatsappHref } from '../../../../core/config/site.config';
import { Reveal } from '../../../../shared/directives/reveal';

@Component({
  selector: 'app-pasos',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="primera-consulta" class="band pasos" aria-labelledby="pasos-titulo">
      <div class="wrap">
        <div class="section-head" appReveal>
          <p class="eyebrow">Tu primera consulta</p>
          <h2 id="pasos-titulo">Así de <em>fácil</em></h2>
          <p>Cuatro pasos, sin filas ni enredos.</p>
        </div>
        <ol class="lista">
          @for (p of pasos; track p.titulo; let i = $index) {
            <li class="paso" [appReveal]="i * 140">
              <span class="paso__num" aria-hidden="true">{{ i + 1 }}</span>
              <h3>{{ p.titulo }}</h3>
              <p>{{ p.texto }}</p>
            </li>
          }
        </ol>
        <div class="acciones" appReveal>
          <a class="btn btn--claro" href="#reserva">Reservar mi consulta</a>
          <a class="enlace" [href]="wa" target="_blank" rel="noopener"
            >o escríbenos por WhatsApp →</a
          >
        </div>
      </div>
    </section>
  `,
  styles: `
    .pasos {
      --pf: var(--on-slate);
      background: var(--slate-ink);
      color: var(--pf);
      overflow: hidden;
    }
    .pasos h2,
    .pasos h3,
    .pasos .eyebrow {
      color: var(--pf);
    }
    .section-head p {
      color: inherit;
      opacity: 0.8;
    }
    h2 em {
      font-style: italic;
    }
    .lista {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 26px;
      position: relative;
      counter-reset: paso;
    }
    /* Línea que une los pasos */
    .lista::before {
      content: '';
      position: absolute;
      top: 32px;
      left: 32px;
      right: calc((100% - 78px) / 4 - 32px);
      height: 1.5px;
      background: repeating-linear-gradient(
        90deg,
        color-mix(in srgb, var(--pf) 45%, transparent) 0 8px,
        transparent 8px 16px
      );
    }
    .paso {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .paso__num {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-family: var(--display);
      font-size: 32px;
      background: var(--pf);
      color: var(--slate-ink);
      box-shadow: 0 0 0 8px var(--slate-ink);
      position: relative;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .paso:hover .paso__num {
      transform: scale(1.1) rotate(-6deg);
    }
    h3 {
      font-size: 28px;
      margin-top: 8px;
    }
    .paso p {
      opacity: 0.85;
      font-size: 16px;
    }
    .acciones {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px 24px;
      margin-top: 52px;
    }
    .btn--claro {
      background: var(--pf);
      color: var(--slate-ink);
      &:hover {
        background: var(--sand);
      }
    }
    .enlace {
      color: inherit;
      text-underline-offset: 4px;
    }
    @media (max-width: 860px) {
      .lista {
        grid-template-columns: 1fr 1fr;
      }
      .lista::before {
        display: none;
      }
    }
    @media (max-width: 520px) {
      .lista {
        grid-template-columns: 1fr;
      }
      .paso {
        display: grid;
        grid-template-columns: 64px 1fr;
        column-gap: 18px;
        row-gap: 4px;
      }
      .paso__num {
        grid-row: span 2;
      }
      h3 {
        margin-top: 4px;
      }
    }
  `,
})
export class Pasos {
  protected readonly wa = whatsappHref();
  protected readonly pasos = [
    {
      titulo: 'Escríbenos',
      texto: 'Por WhatsApp o con el formulario de reserva de esta página.',
    },
    { titulo: 'Confirma tu cita', texto: 'Te respondemos con el día y la hora de tu consulta.' },
    {
      titulo: 'Tu consulta',
      texto: 'Revisamos tus síntomas, antecedentes y hábitos, con tiempo y sin afán.',
    },
    {
      titulo: 'Plan y seguimiento',
      texto: 'Sales con un plan claro: tratamiento, prevención y, si lo necesitas, ejercicio.',
    },
  ];
}
