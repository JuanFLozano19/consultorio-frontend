import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GALERIA } from '../../../../core/config/galeria';
import { Carrusel } from '../../../../shared/components/carrusel/carrusel';
import { Reveal } from '../../../../shared/directives/reveal';

@Component({
  selector: 'app-galeria',
  imports: [Carrusel, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="galeria" class="band band--sand" aria-labelledby="galeria-titulo">
      <div class="wrap">
        <div class="section-head" appReveal>
          <p class="eyebrow">Galería</p>
          <h2 id="galeria-titulo">Así es tu <em>consulta</em></h2>
          <p>Desliza o usa las flechas. Toca una foto para verla en grande.</p>
        </div>
        <app-carrusel
          [appReveal]="120"
          [imagenes]="fotos"
          etiqueta="Galería de fotos del consultorio"
        />
        <p class="nota">Algunas imágenes son ilustrativas.</p>
      </div>
    </section>
  `,
  styles: `
    h2 em {
      font-style: italic;
      color: var(--clay);
    }
    .nota {
      margin-top: 18px;
      font-size: 13px;
      color: var(--muted);
    }
  `,
})
export class Galeria {
  protected readonly fotos = GALERIA;
}
