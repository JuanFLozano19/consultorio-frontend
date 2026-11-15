import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PUBLICACIONES } from '../../../../core/config/galeria';
import { SITE } from '../../../../core/config/site.config';
import { Carrusel } from '../../../../shared/components/carrusel/carrusel';
import { Reveal } from '../../../../shared/directives/reveal';

@Component({
  selector: 'app-novedades',
  imports: [Carrusel, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="novedades" class="band nov" aria-labelledby="novedades-titulo">
      <div class="wrap nov__wrap">
        <div class="section-head" appReveal>
          <p class="eyebrow">Novedades</p>
          <h2 id="novedades-titulo">Publicaciones del <em>consultorio</em></h2>
          <p>Ábrelas en grande para compartirlas por WhatsApp o descargarlas.</p>
        </div>
        <app-carrusel
          [appReveal]="120"
          [imagenes]="publicaciones"
          etiqueta="Publicaciones del consultorio"
          [ancho]="260"
          [mostrarTitulo]="false"
          [compartir]="true"
          [textoCompartir]="textoCompartir"
          [intervalo]="4500"
        />
      </div>
    </section>
  `,
  styles: `
    .nov {
      --nov-bg: var(--slate);
      --nov-fg: var(--on-slate);
      background: var(--nov-bg);
      color: var(--nov-fg);
    }
    /* Colores del carrusel sobre fondo azul */
    .nov__wrap {
      --slate-ink: var(--nov-fg);
      --muted: color-mix(in srgb, var(--nov-fg) 78%, transparent);
      --line: color-mix(in srgb, var(--nov-fg) 32%, transparent);
      --clay: var(--nov-fg);
      --slate: var(--nov-fg);
      --on-slate: var(--nov-bg);
    }
    .nov h2,
    .nov .eyebrow {
      color: inherit;
    }
    h2 em {
      font-style: italic;
    }
    .section-head p {
      color: inherit;
      opacity: 0.85;
    }
  `,
})
export class Novedades {
  protected readonly publicaciones = PUBLICACIONES;
  protected readonly textoCompartir = `Dr. ${SITE.doctor.name}, médico general. Agenda tu consulta: ${SITE.siteUrl}`;
}
