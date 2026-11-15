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
 * Carrusel accesible: se desliza con el dedo, con las flechas o con el teclado,
 * avanza solo (con botón de pausa) y abre cada imagen en grande al tocarla.
 */
@Component({
  selector: 'app-carrusel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--ratio]': 'proporcion()',
    '[style.--col]': 'columna()',
  },
  template: `
    <div
      class="car"
      role="region"
      aria-roledescription="carrusel"
      [attr.aria-label]="etiqueta()"
      (keydown)="teclado($event)"
      (pointerenter)="encima.set(true)"
      (pointerleave)="encima.set(false)"
      (focusin)="enfocado.set(true)"
      (focusout)="enfocado.set(false)"
    >
      <div class="track" #track (scroll)="alDesplazar()" aria-live="off">
        @for (img of imagenes(); track img.src; let i = $index) {
          <figure
            class="slide"
            [class.slide--activa]="i === actual()"
            role="group"
            aria-roledescription="diapositiva"
            [attr.aria-label]="i + 1 + ' de ' + imagenes().length"
          >
            <button
              type="button"
              class="slide__btn"
              (click)="abrir(i)"
              [attr.aria-label]="'Ver en grande: ' + (img.titulo ?? img.alt)"
            >
              <img
                [src]="img.src"
                [alt]="img.alt"
                [attr.width]="img.ancho"
                [attr.height]="img.alto"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              <span class="slide__zoom" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                </svg>
              </span>
            </button>
            @if (img.titulo) {
              <figcaption>{{ img.titulo }}</figcaption>
            }
          </figure>
        }
      </div>

      <div class="ctrl">
        <div class="dots" role="group" aria-label="Elegir imagen">
          @for (img of imagenes(); track img.src; let i = $index) {
            <button
              type="button"
              class="dot"
              [class.dot--on]="i === actual()"
              [attr.aria-label]="'Ir a la imagen ' + (i + 1)"
              [attr.aria-current]="i === actual() ? 'true' : null"
              (click)="irA(i)"
            >
              <span></span>
            </button>
          }
        </div>
        <div class="nav">
          <span class="contador" aria-hidden="true"
            >{{ dosDigitos(actual() + 1) }} / {{ dosDigitos(imagenes().length) }}</span
          >
          <button
            type="button"
            class="redondo"
            (click)="pausa.set(!pausa())"
            [attr.aria-label]="
              pausa() ? 'Reanudar el avance automático' : 'Pausar el avance automático'
            "
          >
            @if (pausa()) {
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            }
          </button>
          <button type="button" class="redondo" (click)="anterior()" aria-label="Imagen anterior">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button type="button" class="redondo" (click)="siguiente()" aria-label="Imagen siguiente">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <dialog
      #visor
      class="lb"
      [attr.aria-label]="'Imagen ampliada: ' + (abierta()?.titulo ?? '')"
      (click)="clickFondo($event)"
      (close)="indiceVisor.set(null)"
      (keydown)="tecladoVisor($event)"
    >
      @if (abierta(); as img) {
        <figure class="lb__fig" (pointerdown)="inicioGesto($event)" (pointerup)="finGesto($event)">
          <img [src]="img.src" [alt]="img.alt" [attr.width]="img.ancho" [attr.height]="img.alto" />
          <figcaption>
            <span class="lb__titulo">{{ img.titulo ?? img.alt }}</span>
            <span class="lb__num">{{ (indiceVisor() ?? 0) + 1 }} / {{ imagenes().length }}</span>
            @if (compartir()) {
              <span class="lb__acciones">
                <a
                  class="lb__btn lb__btn--wa"
                  [href]="enlaceCompartir(img)"
                  target="_blank"
                  rel="noopener"
                  >Compartir por WhatsApp</a
                >
                <a class="lb__btn" [href]="img.src" [attr.download]="nombreDescarga(img)"
                  >Descargar</a
                >
              </span>
            }
          </figcaption>
        </figure>
        <button type="button" class="lb__x" (click)="cerrar()" aria-label="Cerrar">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <button
          type="button"
          class="lb__flecha lb__flecha--izq"
          (click)="moverVisor(-1)"
          aria-label="Anterior"
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          class="lb__flecha lb__flecha--der"
          (click)="moverVisor(1)"
          aria-label="Siguiente"
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      }
    </dialog>
  `,
  styleUrl: './carrusel.scss',
})
export class Carrusel {
  readonly imagenes = input.required<readonly ImagenCarrusel[]>();
  /** Nombre del carrusel para lectores de pantalla. */
  readonly etiqueta = input('Galería de imágenes');
  /** Proporción de cada tarjeta (CSS aspect-ratio). */
  readonly proporcion = input('4 / 5');
  /** Ancho de cada tarjeta en pantallas grandes. */
  readonly columna = input('clamp(240px, 30%, 360px)');
  /** Muestra botones para compartir y descargar en la vista ampliada. */
  readonly compartir = input(false);
  /** Texto que acompaña el enlace al compartir. */
  readonly textoCompartir = input('');
  /** Milisegundos entre avances automáticos (0 = sin avance automático). */
  readonly intervalo = input(5000);

  protected readonly actual = signal(0);
  protected readonly pausa = signal(false);
  protected readonly encima = signal(false);
  protected readonly enfocado = signal(false);
  private readonly visible = signal(false);
  protected readonly indiceVisor = signal<number | null>(null);
  protected readonly abierta = computed(() => {
    const i = this.indiceVisor();
    return i === null ? null : this.imagenes()[i];
  });

  private readonly track = viewChild.required<ElementRef<HTMLDivElement>>('track');
  private readonly visor = viewChild.required<ElementRef<HTMLDialogElement>>('visor');
  private raf = 0;
  private gestoX: number | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    const host = inject(ElementRef<HTMLElement>);
    afterNextRender(() => {
      const reducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      if (reducido) this.pausa.set(true);

      let obs: IntersectionObserver | undefined;
      if (typeof IntersectionObserver !== 'undefined') {
        obs = new IntersectionObserver(([e]) => this.visible.set(e.isIntersecting), {
          threshold: 0.35,
        });
        obs.observe(host.nativeElement);
      }
      const ms = this.intervalo();
      const timer =
        ms > 0
          ? setInterval(() => {
              const quieto =
                this.pausa() || this.encima() || this.enfocado() || this.indiceVisor() !== null;
              if (this.visible() && !quieto && document.visibilityState === 'visible')
                this.siguiente();
            }, ms)
          : undefined;
      destroyRef.onDestroy(() => {
        obs?.disconnect();
        if (timer) clearInterval(timer);
        cancelAnimationFrame(this.raf);
      });
    });
  }

  protected dosDigitos(n: number): string {
    return n < 10 ? '0' + n : String(n);
  }

  private slides(): HTMLElement[] {
    return Array.from(this.track().nativeElement.children) as HTMLElement[];
  }

  irA(i: number): void {
    const t = this.track().nativeElement;
    const s = this.slides();
    if (!s.length) return;
    const n = s.length;
    const idx = ((i % n) + n) % n;
    t.scrollTo({ left: s[idx].offsetLeft - s[0].offsetLeft, behavior: 'smooth' });
    this.actual.set(idx);
  }

  siguiente(): void {
    const t = this.track().nativeElement;
    const alFinal = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
    this.irA(alFinal ? 0 : this.actual() + 1);
  }

  anterior(): void {
    const t = this.track().nativeElement;
    this.irA(
      t.scrollLeft <= 4 && this.actual() === 0 ? this.imagenes().length - 1 : this.actual() - 1,
    );
  }

  protected alDesplazar(): void {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      const t = this.track().nativeElement;
      const s = this.slides();
      if (!s.length) return;
      const base = s[0].offsetLeft;
      let mejor = 0;
      let dist = Infinity;
      s.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft - base - t.scrollLeft);
        if (d < dist) {
          dist = d;
          mejor = i;
        }
      });
      // Al llegar al final, marcar la última aunque no quede alineada a la izquierda.
      if (t.scrollLeft + t.clientWidth >= t.scrollWidth - 4) mejor = Math.max(mejor, s.length - 1);
      this.actual.set(mejor);
    });
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
