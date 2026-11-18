import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  afterNextRender,
  Injector,
} from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { MITOS_DATOS, MitoDato, mensajeFinal, nuevaRonda } from '../../../../core/salud/mitos';
import { Reveal } from '../../../../shared/directives/reveal';

type Fase = 'inicio' | 'jugando' | 'fin';

/** Juego «¿Mito o dato?»: rondas de 5 frases al azar, con explicación en cada una. */
@Component({
  selector: 'app-mito-dato',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mito-dato.html',
  styleUrl: './mito-dato.scss',
})
export class MitoDatoJuego {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);

  protected readonly totalFrases = MITOS_DATOS.length;
  protected readonly porRonda = 5;
  protected readonly fase = signal<Fase>('inicio');
  protected readonly ronda = signal<MitoDato[]>([]);
  protected readonly indice = signal(0);
  /** Lo que respondió la persona en la pregunta actual (true = dato). */
  protected readonly respuesta = signal<boolean | null>(null);
  protected readonly aciertos = signal(0);
  protected readonly resultados = signal<boolean[]>([]);

  protected readonly actual = computed(() => this.ronda()[this.indice()] ?? null);
  protected readonly acerto = computed(() => {
    const r = this.respuesta();
    const a = this.actual();
    return r === null || !a ? null : r === a.esDato;
  });
  protected readonly mensaje = computed(() => mensajeFinal(this.aciertos(), this.ronda().length));
  protected readonly whatsapp = computed(
    () =>
      `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(
        `Hola Dr. Patiño, jugué «¿Mito o dato?» en su página (${this.aciertos()}/${this.ronda().length}) y tengo una pregunta.`,
      )}`,
  );

  protected empezar(): void {
    this.ronda.set(nuevaRonda(this.porRonda));
    this.indice.set(0);
    this.respuesta.set(null);
    this.aciertos.set(0);
    this.resultados.set([]);
    this.fase.set('jugando');
    this.enfocar('.md__frase');
  }

  protected responder(esDato: boolean): void {
    const a = this.actual();
    if (!a || this.respuesta() !== null) return;
    this.respuesta.set(esDato);
    const ok = esDato === a.esDato;
    if (ok) this.aciertos.update((n) => n + 1);
    this.resultados.update((r) => [...r, ok]);
    this.enfocar('.md__siguiente');
  }

  protected siguiente(): void {
    if (this.indice() + 1 >= this.ronda().length) {
      this.fase.set('fin');
      this.enfocar('.md__puntaje');
      return;
    }
    this.indice.update((i) => i + 1);
    this.respuesta.set(null);
    this.enfocar('.md__frase');
  }

  /** Lleva el foco al nuevo contenido para quien usa teclado o lector de pantalla. */
  private enfocar(selector: string): void {
    afterNextRender(
      () =>
        (this.host.querySelector(selector) as HTMLElement | null)?.focus({ preventScroll: true }),
      { injector: this.injector },
    );
  }
}
