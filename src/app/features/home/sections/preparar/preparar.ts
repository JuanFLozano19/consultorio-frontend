import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { Reveal } from '../../../../shared/directives/reveal';

const CLAVE = 'prepara-cita-v1';
interface Guardado {
  hechos: boolean[];
  preguntas: string[];
}

/** Lista para preparar la cita y anotar preguntas; se guarda solo en este navegador. */
@Component({
  selector: 'app-preparar',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './preparar.html',
  styleUrl: './preparar.scss',
})
export class Preparar {
  protected readonly items = [
    { t: 'Documento de identidad', s: 'Original o foto legible' },
    { t: 'Exámenes recientes', s: 'Laboratorios, imágenes o informes, si los tienes' },
    { t: 'Lista de medicamentos', s: 'Nombre, dosis y cada cuánto los tomas' },
    { t: 'Tus antecedentes', s: 'Cirugías, alergias y enfermedades en la familia' },
    { t: 'Ropa cómoda', s: 'Si vienes por asesoría en actividad física' },
  ];
  protected readonly hechos = signal<boolean[]>(this.items.map(() => false));
  protected readonly preguntas = signal<string[]>([]);
  protected readonly borrador = signal('');
  protected readonly copiado = signal(false);

  protected readonly listos = computed(() => this.hechos().filter(Boolean).length);
  protected readonly avance = computed(() => this.listos() / this.items.length);

  constructor() {
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) ?? 'null') as Guardado | null;
      if (g?.hechos?.length === this.items.length) this.hechos.set(g.hechos);
      if (Array.isArray(g?.preguntas)) this.preguntas.set(g.preguntas.slice(0, 12));
    } catch {
      /* sin almacenamiento: la lista funciona igual, sin recordarse */
    }
    effect(() => {
      const datos: Guardado = { hechos: this.hechos(), preguntas: this.preguntas() };
      try {
        localStorage.setItem(CLAVE, JSON.stringify(datos));
      } catch {
        /* ignorar */
      }
    });
  }

  protected alternar(i: number): void {
    this.hechos.update((h) => h.map((v, k) => (k === i ? !v : v)));
  }

  protected agregar(): void {
    const t = this.borrador().trim();
    if (!t || this.preguntas().length >= 12) return;
    this.preguntas.update((p) => [...p, t.slice(0, 200)]);
    this.borrador.set('');
  }

  protected quitar(i: number): void {
    this.preguntas.update((p) => p.filter((_, k) => k !== i));
  }

  private texto(): string {
    const lista = this.preguntas()
      .map((p, i) => `${i + 1}. ${p}`)
      .join('\n');
    return `Hola Dr. Patiño, quiero agendar una consulta. Estas son mis preguntas:\n${lista}`;
  }

  protected readonly enlace = computed(
    () => `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(this.texto())}`,
  );

  protected async copiar(): Promise<void> {
    try {
      await navigator.clipboard.writeText(
        this.preguntas()
          .map((p, i) => `${i + 1}. ${p}`)
          .join('\n'),
      );
      this.copiado.set(true);
      setTimeout(() => this.copiado.set(false), 1800);
    } catch {
      /* el navegador no permitió copiar */
    }
  }

  protected reiniciar(): void {
    this.hechos.set(this.items.map(() => false));
    this.preguntas.set([]);
  }
}
