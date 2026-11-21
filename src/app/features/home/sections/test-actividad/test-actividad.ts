import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { PREGUNTAS, resultadoTest } from '../../../../core/salud/test-actividad';
import { Reveal } from '../../../../shared/directives/reveal';

/** Test de 5 preguntas: «¿Te mueves lo suficiente?» (recomendaciones de la OMS). */
@Component({
  selector: 'app-test-actividad',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="test-actividad" class="band band--sand" aria-labelledby="test-titulo">
      <div class="wrap">
        <div class="section-head" appReveal>
          <p class="eyebrow">Test de 1 minuto</p>
          <h2 id="test-titulo">¿Te mueves <em>lo suficiente?</em></h2>
          <p>Cinco preguntas rápidas y te decimos cómo vas frente a lo que recomienda la OMS.</p>
        </div>

        <div class="t" [appReveal]="100">
          @if (paso() < preguntas.length) {
            @let q = preguntas[paso()];
            <div class="t__card">
              <div class="t__barra" aria-hidden="true">
                <span [style.width.%]="(paso() / preguntas.length) * 100"></span>
              </div>
              <p class="t__cont">Pregunta {{ paso() + 1 }} de {{ preguntas.length }}</p>
              @for (k of [paso()]; track k) {
                <fieldset class="t__preg">
                  <legend class="t__texto" tabindex="-1">{{ q.texto }}</legend>
                  @if (q.ayuda) {
                    <p class="t__ayuda">{{ q.ayuda }}</p>
                  }
                  <div class="t__ops">
                    @for (o of q.opciones; track o; let i = $index) {
                      <button
                        type="button"
                        class="t__op"
                        [class.elegida]="respuestas()[paso()] === i"
                        (click)="elegir(i)"
                      >
                        {{ o }}
                      </button>
                    }
                  </div>
                </fieldset>
              }
              @if (paso() > 0) {
                <button type="button" class="t__atras" (click)="atras()">← Anterior</button>
              }
            </div>
          } @else {
            @let r = resultado();
            <div class="t__card t__res" [class]="'t__res--' + r.nivel">
              <p class="t__cont">Tu resultado</p>
              <h3 class="t__titulo" tabindex="-1">{{ r.titulo }}</h3>
              <div
                class="t__meta"
                role="img"
                [attr.aria-label]="'Llevas el ' + r.porcentaje + ' % de la meta mínima semanal'"
              >
                <span [style.width.%]="min(r.porcentaje, 100)"></span>
              </div>
              <p class="t__pct">
                <b>{{ r.porcentaje }} %</b> de la meta mínima de 150 minutos por semana
              </p>
              <p>{{ r.mensaje }}</p>
              <ul class="t__consejos">
                @for (c of r.consejos; track c) {
                  <li>{{ c }}</li>
                }
              </ul>
              <div class="t__acciones">
                <a class="btn" [href]="wa" target="_blank" rel="noopener"
                  >Quiero mi plan de actividad física</a
                >
                <button type="button" class="btn btn--ghost" (click)="reiniciar()">
                  Hacer el test otra vez
                </button>
              </div>
            </div>
          }
          <p class="t__nota">
            Orientativo, según las recomendaciones de la OMS para adultos. Si tienes alguna
            condición de salud, consulta antes de aumentar tu actividad.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: `
    h2 em {
      font-style: italic;
      color: var(--clay);
    }
    .t {
      max-width: 760px;
      margin: 0 auto;
    }
    .t__card {
      background: var(--card);
      border: 1.5px solid var(--line);
      border-radius: 28px;
      padding: clamp(24px, 5vw, 44px);
      box-shadow: 0 24px 48px -32px rgb(30 45 50 / 0.45);
    }
    .t__barra,
    .t__meta {
      height: 8px;
      border-radius: 99px;
      background: var(--line);
      overflow: hidden;
      span {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: var(--clay);
        transition: width 0.5s var(--ease-out);
      }
    }
    .t__cont {
      margin: 14px 0 6px;
      font-size: 13px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .t__preg {
      border: 0;
      padding: 0;
      margin: 0;
      animation: entra 0.4s var(--ease-out);
    }
    .t__texto {
      padding: 0;
      font: 600 clamp(24px, 3.6vw, 32px) / 1.2 var(--display);
      color: var(--slate-ink);
      outline: none;
    }
    .t__ayuda {
      margin: 8px 0 0;
      color: var(--muted);
    }
    .t__ops {
      display: grid;
      gap: 10px;
      margin-top: 20px;
    }
    .t__op {
      text-align: left;
      padding: 16px 20px;
      border-radius: 16px;
      border: 1.5px solid var(--line);
      background: transparent;
      color: var(--slate-ink);
      font: inherit;
      font-size: 17px;
      cursor: pointer;
      transition:
        border-color 0.2s,
        background 0.2s,
        transform 160ms var(--ease-out);
      &:hover {
        border-color: var(--slate);
      }
      &:active {
        transform: scale(0.985);
      }
      &.elegida {
        border-color: var(--slate-ink);
        background: color-mix(in srgb, var(--slate) 10%, transparent);
      }
    }
    .t__atras {
      margin-top: 16px;
      border: 0;
      background: none;
      color: var(--slate-ink);
      font: inherit;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    .t__res {
      animation: entra 0.45s var(--ease-out);
    }
    .t__titulo {
      margin: 0 0 16px;
      font-size: clamp(34px, 5vw, 46px);
      color: var(--slate-ink);
      outline: none;
    }
    .t__res--cumple .t__meta span,
    .t__res--optimo .t__meta span {
      background: var(--ok);
    }
    .t__pct {
      margin: 10px 0 6px;
      color: var(--muted);
      b {
        color: var(--slate-ink);
        font-size: 20px;
      }
    }
    .t__consejos {
      margin: 16px 0 0;
      padding-left: 20px;
      display: grid;
      gap: 8px;
    }
    .t__acciones {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }
    .t__nota {
      margin-top: 14px;
      font-size: 13px;
      color: var(--muted);
      text-align: center;
    }
    @keyframes entra {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .t__preg,
      .t__res {
        animation: none;
      }
    }
    @media (max-width: 560px) {
      .t__acciones .btn {
        flex: 1 1 100%;
        justify-content: center;
      }
    }
  `,
})
export class TestActividad {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);
  protected readonly preguntas = PREGUNTAS;
  protected readonly paso = signal(0);
  protected readonly respuestas = signal<number[]>([]);
  protected readonly resultado = computed(() => resultadoTest(this.respuestas()));
  protected readonly min = Math.min;
  protected readonly wa = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(
    'Hola Dr. Patiño, hice el test de actividad física en su página y quiero un plan a mi medida.',
  )}`;

  protected elegir(i: number): void {
    this.respuestas.update((r) => {
      const n = [...r];
      n[this.paso()] = i;
      return n;
    });
    // pequeña pausa para que se vea la opción elegida
    setTimeout(() => {
      this.paso.update((p) => p + 1);
      this.enfocar(this.paso() < this.preguntas.length ? '.t__texto' : '.t__titulo');
    }, 220);
  }

  protected atras(): void {
    this.paso.update((p) => Math.max(0, p - 1));
    this.enfocar('.t__texto');
  }

  protected reiniciar(): void {
    this.respuestas.set([]);
    this.paso.set(0);
    this.enfocar('.t__texto');
  }

  private enfocar(sel: string): void {
    afterNextRender(
      () => (this.host.querySelector(sel) as HTMLElement | null)?.focus({ preventScroll: true }),
      { injector: this.injector },
    );
  }
}
