import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ImagenCarrusel } from '../../../core/config/galeria';

/**
 * Carrusel 3D "de vidrio": las tarjetas forman un anillo que gira.
 * Se mueve arrastrando, con las flechas, con el teclado o solo (con botón de pausa),
 * y cada imagen se abre en grande al tocar la tarjeta del frente.
 */
@Component({
  selector: 'app-carrusel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--ratio]': 'proporcion()',
    '[style.--ms]': 'intervalo() + "ms"',
    '[class.entrado]': 'entrado()',
    '(window:resize)': 'medir()',
  },
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.scss',
})
export class Carrusel {
  readonly imagenes = input.required<readonly ImagenCarrusel[]>();
  /** Nombre del carrusel para lectores de pantalla. */
  readonly etiqueta = input('Galería de imágenes');
  /** Proporción de cada tarjeta (CSS aspect-ratio). */
  readonly proporcion = input('4 / 5');
  /** Ancho máximo de la tarjeta del frente (px). */
  readonly ancho = input(280);
  /** Muestra el título en una píldora de vidrio sobre la tarjeta. */
  readonly mostrarTitulo = input(true);
  /** Muestra botones para compartir y descargar en la vista ampliada. */
  readonly compartir = input(false);
  /** Texto que acompaña el enlace al compartir. */
  readonly textoCompartir = input('');
  /** Milisegundos entre avances automáticos (0 = sin avance automático). */
  readonly intervalo = input(4000);

  /** Posición del anillo, en tarjetas (sigue creciendo para girar siempre hacia el mismo lado). */
  protected readonly giro = signal(0);
  protected readonly actual = computed(() => {
    const n = this.imagenes().length || 1;
    return ((Math.round(this.giro()) % n) + n) % n;
  });
  protected readonly paso = computed(() => 360 / (this.imagenes().length || 1));
  /** Ancho real de la tarjeta (px) y radio del anillo. */
  protected readonly anchoReal = signal(280);
  protected readonly radio = computed(() => {
    const n = this.imagenes().length || 1;
    return Math.round((this.anchoReal() / 2 / Math.tan(Math.PI / n)) * 1.22);
  });

  protected readonly pausa = signal(false);
  protected readonly encima = signal(false);
  protected readonly enfocado = signal(false);
  protected readonly arrastrando = signal(false);
  private readonly visible = signal(false);
  protected readonly entrado = signal(false);
  protected readonly indiceVisor = signal<number | null>(null);
  protected readonly direccion = signal(1);
  protected readonly claveVisor = computed(() => [this.indiceVisor() ?? -1]);
  protected readonly abierta = computed(() => {
    const i = this.indiceVisor();
    return i === null ? null : this.imagenes()[i];
  });
  /** El avance automático está corriendo (muestra la barra de progreso). */
  protected readonly corriendo = computed(
    () =>
      this.intervalo() > 0 &&
      this.visible() &&
      !this.pausa() &&
      !this.encima() &&
      !this.enfocado() &&
      !this.arrastrando() &&
      this.indiceVisor() === null,
  );

  private readonly escena = viewChild.required<ElementRef<HTMLDivElement>>('escena');
  private readonly visor = viewChild.required<ElementRef<HTMLDialogElement>>('visor');
  private arrastre: { x: number; giro: number; movio: boolean } | null = null;
  private gestoX: number | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    const host = inject(ElementRef<HTMLElement>);
    afterNextRender(() => {
      const reducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      if (reducido) this.pausa.set(true);
      this.medir();

      let obs: IntersectionObserver | undefined;
      if (typeof IntersectionObserver !== 'undefined') {
        obs = new IntersectionObserver(
          ([e]) => {
            this.visible.set(e.isIntersecting);
            if (e.isIntersecting) this.entrado.set(true);
          },
          { threshold: 0.3 },
        );
        obs.observe(host.nativeElement);
      } else {
        this.entrado.set(true);
      }
      const ms = this.intervalo();
      const timer =
        ms > 0
          ? setInterval(() => {
              if (this.corriendo() && document.visibilityState === 'visible') this.siguiente();
            }, ms)
          : undefined;
      destroyRef.onDestroy(() => {
        obs?.disconnect();
        if (timer) clearInterval(timer);
      });
    });
  }

  /** Ajusta el tamaño de las tarjetas al ancho disponible. */
  medir(): void {
    const w = this.escena().nativeElement.clientWidth;
    if (w) this.anchoReal.set(Math.round(Math.min(this.ancho(), w * (w < 640 ? 0.64 : 0.5))));
  }

  protected dosDigitos(n: number): string {
    return n < 10 ? '0' + n : String(n);
  }

  /** Posición de una tarjeta respecto al frente, en tarjetas (−n/2 … n/2). */
  protected relativo(i: number): number {
    const n = this.imagenes().length;
    let r = (i - this.giro()) % n;
    if (r > n / 2) r -= n;
    if (r < -n / 2) r += n;
    return r;
  }

  /** Las tarjetas se oscurecen al alejarse del frente. */
  protected brillo(i: number): number {
    return Math.max(0.35, 1 - Math.abs(this.relativo(i)) * 0.17);
  }

  /** Las de atrás se ven tenues entre las de adelante. */
  protected opacidad(i: number): number {
    const a = Math.abs(this.relativo(i));
    return a > 2.6 ? 0.25 : a > 1.6 ? 0.75 : 1;
  }

  /** Solo las tarjetas de adelante reciben clics (las de atrás se ven a través del anillo). */
  protected tocable(i: number): boolean {
    return Math.abs(this.relativo(i)) < 1.5;
  }

  /** Gira por el camino más corto hasta la tarjeta i. */
  irA(i: number): void {
    const n = this.imagenes().length;
    let d = (i - this.actual()) % n;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    this.giro.set(Math.round(this.giro()) + d);
  }

  siguiente(): void {
    this.giro.set(Math.round(this.giro()) + 1);
  }

  anterior(): void {
    this.giro.set(Math.round(this.giro()) - 1);
  }

  protected teclado(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.siguiente();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.anterior();
    }
  }

  // ----- Arrastrar para girar -----
  protected bajar(e: PointerEvent): void {
    if (e.button !== 0) return;
    this.arrastre = { x: e.clientX, giro: this.giro(), movio: false };
  }

  protected mover(e: PointerEvent): void {
    if (!this.arrastre) return;
    const dx = e.clientX - this.arrastre.x;
    if (!this.arrastre.movio && Math.abs(dx) > 6) {
      this.arrastre.movio = true;
      this.arrastrando.set(true);
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
    if (this.arrastre.movio) this.giro.set(this.arrastre.giro - dx / (this.anchoReal() * 0.9));
  }

  protected soltar(): void {
    if (!this.arrastre) return;
    const movio = this.arrastre.movio;
    this.arrastre = null;
    if (movio) {
      this.giro.set(Math.round(this.giro()));
      // El clic que llega justo después de arrastrar no debe abrir la tarjeta.
      setTimeout(() => this.arrastrando.set(false));
    }
  }

  protected tocar(i: number): void {
    if (this.arrastrando()) return;
    if (i === this.actual()) this.abrir(i);
    else this.irA(i);
  }

  // ----- Vista ampliada -----
  abrir(i: number): void {
    this.indiceVisor.set(i);
    const d = this.visor().nativeElement;
    if (!d.open) d.showModal?.();
  }

  protected cerrar(): void {
    this.visor().nativeElement.close();
  }

  protected moverVisor(delta: number): void {
    this.direccion.set(delta < 0 ? -1 : 1);
    const n = this.imagenes().length;
    const i = ((this.indiceVisor() ?? 0) + delta + n) % n;
    this.indiceVisor.set(i);
    this.irA(i);
  }

  protected tecladoVisor(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.moverVisor(1);
    else if (e.key === 'ArrowLeft') this.moverVisor(-1);
  }

  protected clickFondo(e: MouseEvent): void {
    if (e.target === this.visor().nativeElement) this.cerrar();
  }

  protected inicioGesto(e: PointerEvent): void {
    this.gestoX = e.clientX;
  }

  protected finGesto(e: PointerEvent): void {
    if (this.gestoX === null) return;
    const dx = e.clientX - this.gestoX;
    this.gestoX = null;
    if (Math.abs(dx) > 50) this.moverVisor(dx < 0 ? 1 : -1);
  }

  protected enlaceCompartir(img: ImagenCarrusel): string {
    const texto = `${img.titulo ?? ''} — ${this.textoCompartir()}`.trim();
    return 'https://wa.me/?text=' + encodeURIComponent(texto);
  }

  protected nombreDescarga(img: ImagenCarrusel): string {
    return 'Dr-Jeison-Patino-' + (img.src.split('/').pop() ?? 'imagen');
  }
}
