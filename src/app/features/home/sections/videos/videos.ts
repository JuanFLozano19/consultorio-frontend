import { Adornos } from '../../../../shared/components/adornos/adornos';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { hoyTemporada, temporadaActiva } from '../../../../core/config/temporada';
import { CategoriaVideo, VIDEOS, categoriasVisibles } from '../../../../core/config/videos';
import { Reveal } from '../../../../shared/directives/reveal';

/** Videos cortos (Reels) por categoría; se reproducen al tocarlos, uno a la vez. */
@Component({
  selector: 'app-videos',
  imports: [Reveal, Adornos],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="videos" class="band videos" aria-labelledby="videos-titulo">
      @if (navidad) {
        <app-adornos [cantidad]="9" />
      }
      <div class="wrap">
        <div class="cab">
          <div class="section-head" appReveal>
            <p class="eyebrow">Videos</p>
            <h2 id="videos-titulo">Salud en <em>un minuto</em></h2>
            <p>Mitos, datos curiosos y un poco de humor. Tócalos para verlos con sonido.</p>
          </div>
          <div class="flechas" [appReveal]="100">
            <button type="button" (click)="mover(-1)" aria-label="Videos anteriores">←</button>
            <button type="button" (click)="mover(1)" aria-label="Videos siguientes">→</button>
          </div>
        </div>

        <div class="tabs" role="tablist" aria-label="Categorías de videos" [appReveal]="60">
          @for (c of categorias; track c.id) {
            <button
              type="button"
              role="tab"
              [id]="'tab-' + c.id"
              [attr.aria-selected]="c.id === activa()"
              [attr.tabindex]="c.id === activa() ? 0 : -1"
              aria-controls="videos-panel"
              (click)="elegir(c.id)"
              (keydown)="teclado($event)"
            >
              {{ c.nombre }}
            </button>
          }
        </div>

        <div
          #pista
          id="videos-panel"
          class="pista"
          role="tabpanel"
          [attr.aria-labelledby]="'tab-' + activa()"
        >
          @for (v of lista(); track v.archivo; let i = $index) {
            <figure class="vid" [style.--i]="i">
              <video
                [src]="'videos/' + v.archivo + '.mp4'"
                [poster]="'videos/' + v.archivo + '.webp'"
                preload="none"
                playsinline
                controls
                width="540"
                height="960"
                (play)="soloUno($event)"
                [attr.aria-label]="v.titulo"
              ></video>
              <figcaption>{{ v.titulo }}</figcaption>
            </figure>
          }
        </div>
        <p class="nota">Información general de salud; no reemplaza la consulta médica.</p>
      </div>
    </section>
  `,
  styles: `
    .videos {
      position: relative;
    }
    h2 em {
      font-style: italic;
      color: var(--clay);
    }
    .cab {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
    }
    .flechas {
      display: flex;
      gap: 10px;
      margin-bottom: 52px;
      button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1.5px solid var(--line);
        background: var(--card);
        color: var(--slate-ink);
        font-size: 20px;
        cursor: pointer;
        transition:
          transform 160ms var(--ease-out),
          border-color 0.2s;
        &:hover {
          border-color: var(--slate);
        }
        &:active {
          transform: scale(0.95);
        }
      }
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: -24px 0 24px;
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
          border-color 0.2s,
          transform 160ms var(--ease-out);
        &:active {
          transform: scale(0.97);
        }
        &[aria-selected='true'] {
          background: var(--slate-ink);
          border-color: var(--slate-ink);
          color: var(--on-slate);
        }
      }
    }
    .pista {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 230px;
      gap: 18px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      padding: 4px 4px 14px;
      scrollbar-width: thin;
    }
    .vid {
      margin: 0;
      scroll-snap-align: start;
      animation: entra 0.5s var(--ease-out) both;
      animation-delay: calc(var(--i) * 70ms);
      video {
        display: block;
        width: 100%;
        aspect-ratio: 9 / 16;
        height: auto;
        border-radius: 20px;
        background: var(--slate-ink);
        object-fit: cover;
        box-shadow: 0 20px 40px -26px rgba(20, 40, 46, 0.6);
      }
      figcaption {
        margin-top: 10px;
        font-weight: 500;
        color: var(--slate-ink);
        font-size: 15px;
      }
    }
    .nota {
      margin-top: 12px;
      font-size: 13px;
      color: var(--muted);
    }
    @keyframes entra {
      from {
        opacity: 0;
        transform: translateY(14px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .vid {
        animation: none;
      }
      .pista {
        scroll-behavior: auto;
      }
    }
    @media (max-width: 700px) {
      .flechas {
        display: none;
      }
      .pista {
        grid-auto-columns: 62vw;
        margin-inline: -20px;
        padding-inline: 20px;
        scroll-padding-inline: 20px;
      }
    }
  `,
})
export class Videos {
  private readonly pista = viewChild.required<ElementRef<HTMLElement>>('pista');
  protected readonly navidad = temporadaActiva(hoyTemporada());
  protected readonly categorias = categoriasVisibles(this.navidad);
  protected readonly activa = signal<CategoriaVideo>(this.categorias[0].id);
  protected readonly lista = computed(() => VIDEOS.filter((v) => v.categoria === this.activa()));

  protected elegir(id: CategoriaVideo): void {
    this.pausarTodos();
    this.activa.set(id);
    this.pista().nativeElement.scrollTo({ left: 0 });
  }

  /** Flechas izquierda/derecha entre pestañas (patrón de pestañas accesible). */
  protected teclado(e: KeyboardEvent): void {
    const i = this.categorias.findIndex((c) => c.id === this.activa());
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const sig = this.categorias[(i + d + this.categorias.length) % this.categorias.length];
    this.elegir(sig.id);
    (document.getElementById('tab-' + sig.id) as HTMLElement | null)?.focus();
  }

  protected mover(dir: number): void {
    const el = this.pista().nativeElement;
    el.scrollBy({ left: dir * el.clientWidth * 0.8 });
  }

  /** Al reproducir uno, pausa los demás. */
  protected soloUno(e: Event): void {
    this.pausarTodos(e.target as HTMLVideoElement);
  }

  private pausarTodos(excepto?: HTMLVideoElement): void {
    this.pista()
      .nativeElement.querySelectorAll('video')
      .forEach((v) => v !== excepto && v.pause());
  }
}
