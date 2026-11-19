import { Contar } from '../../../../shared/directives/contar';
import { Reveal } from '../../../../shared/directives/reveal';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';

@Component({
  selector: 'app-activity',
  imports: [Reveal, Contar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity.html',
  styleUrl: './activity.scss',
})
export class Activity {
  protected readonly activity = SITE.activity;
  /** Recomendaciones de la OMS (Directrices sobre actividad física, 2020). */
  protected readonly cifras = [
    {
      n: 150,
      unidad: 'min',
      texto: 'a la semana, como mínimo, de actividad moderada para adultos',
    },
    { n: 2, unidad: 'días', texto: 'por semana de ejercicios de fuerza muscular' },
    { n: 60, unidad: 'min', texto: 'al día, en promedio, para niños y adolescentes' },
  ];
}
