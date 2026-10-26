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
  `,
})
export class Instagram {
  protected readonly usuario = SITE.contact.instagram;
  protected readonly href = instagramHref();
}
