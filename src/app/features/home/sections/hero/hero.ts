import { ScrollProgreso } from '../../../../shared/directives/scroll-progreso';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { Estado } from '../../../../shared/components/estado/estado';
import { Logo } from '../../../../shared/components/logo/logo';
import { Guirnalda } from '../../../../shared/components/guirnalda/guirnalda';
import { esDiaDeVelitas, hoyTemporada, temporadaActiva } from '../../../../core/config/temporada';

@Component({
  selector: 'app-hero',
  imports: [Logo, Estado, ScrollProgreso, Guirnalda],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly navidad = temporadaActiva(hoyTemporada());
  /** 7 de diciembre: fila de velitas encendidas al pie del inicio. */
  protected readonly velitas = esDiaDeVelitas(hoyTemporada())
    ? [...Array(11)].map((_, i) => ({
        alto: 34 + ((i * 7) % 4) * 9,
        color: ['#f6efe4', '#f0b893', '#ffd23f', '#8fd3c8', '#e2774a'][i % 5],
        ritmo: 0.9 + ((i * 3) % 5) * 0.12,
      }))
    : [];
  /** Destellos que caen despacio detrás del inicio (posición, tamaño, duración y retraso fijos). */
  protected readonly destellos = [...Array(16)].map((_, i) => ({
    x: (i * 61) % 100,
    s: 6 + ((i * 7) % 4) * 3,
    d: 14 + ((i * 5) % 9),
    r: -((i * 3.7) % 18),
    c: ['#ffd23f', '#e2774a', '#8fd3c8'][i % 3],
  }));
  protected readonly doctor = SITE.doctor;
  protected readonly address = SITE.contact.address;
}
