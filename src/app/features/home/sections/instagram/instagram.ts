import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE, instagramHref } from '../../../../core/config/site.config';
import { Icon } from '../../../../shared/components/icon/icon';
import { Reveal } from '../../../../shared/directives/reveal';

@Component({
  selector: 'app-instagram',
  imports: [Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (usuario) {
      <section class="band band--sand ig" aria-labelledby="ig-titulo">
        <div class="wrap ig__inner" appReveal>
          <app-icon class="ig__icon" name="instagram" [size]="56" />
          <div class="ig__texto">
            <p class="eyebrow">Sígueme en Instagram</p>
            <h2 id="ig-titulo">
              <a [href]="href" target="_blank" rel="noopener">&#64;{{ usuario }}</a>
            </h2>
            <p>Consejos de salud y ejercicio, y novedades del consultorio.</p>
          </div>
          <a class="btn btn--ghost" [href]="href" target="_blank" rel="noopener">Ver perfil</a>
        </div>
        <div class="wrap mosaico">
          @for (f of fotos; track f; let i = $index) {
            <a
              class="mosaico__item reveal--foto"
              [href]="href"
              target="_blank"
              rel="noopener"
              [appReveal]="i * 80"
              [attr.aria-label]="'Ver en Instagram'"
            >
              <img [src]="f" alt="" width="720" height="900" loading="lazy" />
              <span class="mosaico__over" aria-hidden="true"
                ><app-icon name="instagram" [size]="34"
              /></span>
            </a>
          }
        </div>
      </section>
    }
  `,
  styles: `
    .ig {
      padding-block: 72px;
    }
    .ig__inner {
      display: flex;
      align-items: center;
      gap: 28px 36px;
      flex-wrap: wrap;
    }
    .ig__icon {
      color: var(--slate);
      flex: none;
    }
    .ig__texto {
      flex: 1 1 320px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    h2 {
      font-size: clamp(36px, 5vw, 56px);
      overflow-wrap: anywhere;
    }
    h2 a {
      text-decoration: none;
      background: linear-gradient(var(--clay), var(--clay)) left bottom / 0 1.5px no-repeat;
      transition: background-size 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }
    h2 a:hover {
      background-size: 100% 1.5px;
    }
    p:not(.eyebrow) {
      color: var(--muted);
    }
    .mosaico {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      margin-top: 40px;
    }
    .mosaico__item {
      position: relative;
      display: block;
      border-radius: 16px;
      overflow: hidden;
      aspect-ratio: 4 / 5;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      }
      &:hover img {
        transform: scale(1.08);
      }
      &:hover .mosaico__over {
        opacity: 1;
      }
    }
    .mosaico__over {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: #fff;
      background: linear-gradient(
        135deg,
        rgba(131, 58, 180, 0.55),
        rgba(253, 29, 29, 0.45),
        rgba(252, 176, 69, 0.5)
      );
      opacity: 0;
      transition: opacity 0.35s;
    }
    @media (max-width: 760px) {
      .mosaico {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `,
})
export class Instagram {
  protected readonly usuario = SITE.contact.instagram;
  protected readonly href = instagramHref();
  protected readonly fotos = [
    'images/publicidad/01-tu-salud.webp',
    'images/publicidad/03-movimiento.webp',
    'images/publicidad/08-agenda-pop.webp',
    'images/publicidad/02-diagnostico.webp',
    'images/publicidad/12-actividad.webp',
    'images/publicidad/06-plan-ejercicio.webp',
  ];
}
