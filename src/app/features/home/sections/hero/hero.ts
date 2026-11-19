import { ScrollProgreso } from '../../../../shared/directives/scroll-progreso';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { Estado } from '../../../../shared/components/estado/estado';
import { Logo } from '../../../../shared/components/logo/logo';
import { Guirnalda } from '../../../../shared/components/guirnalda/guirnalda';
import { hoyTemporada, temporadaActiva } from '../../../../core/config/temporada';
import { RelojTemporada } from '../../../../core/reloj-temporada';
import { EscenaTemporada } from '../escena/escena';

@Component({
  selector: 'app-hero',
  imports: [Logo, Estado, ScrollProgreso, Guirnalda, EscenaTemporada],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly navidad = temporadaActiva(hoyTemporada());
  /** Escena especial al pie del inicio (velitas, novena, Nochebuena, Navidad, 31, año nuevo). */
  private readonly reloj = inject(RelojTemporada);
  protected readonly hayEscena = computed(() => !!this.reloj.escena());
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
