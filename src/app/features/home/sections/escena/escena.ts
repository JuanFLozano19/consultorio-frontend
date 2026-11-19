import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RelojTemporada } from '../../../../core/reloj-temporada';

const COLORES = ['#f6efe4', '#f0b893', '#ffd23f', '#8fd3c8', '#e2774a'];

/** Escena de temporada al pie del inicio (velitas, novena, Nochebuena, Navidad, 31, año nuevo). */
@Component({
  selector: 'app-escena-temporada',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './escena.html',
  styleUrl: './escena.scss',
})
export class EscenaTemporada {
  protected readonly escena = inject(RelojTemporada).escena;

  protected readonly velitas = [...Array(11)].map((_, i) => ({
    alto: 34 + ((i * 7) % 4) * 9,
    color: COLORES[i % 5],
    ritmo: 0.9 + ((i * 3) % 5) * 0.12,
  }));
  protected readonly estrellas = [...Array(9)].map((_, i) => i);
  protected readonly regalos = [...Array(7)].map((_, i) => ({
    caja: ['#e2774a', '#8fd3c8', '#ffd23f', '#4a6670', '#f0b893'][i % 5],
    cinta: ['#f6efe4', '#e2774a', '#4a6670', '#ffd23f', '#1d4e57'][i % 5],
    tam: 30 + ((i * 5) % 3) * 9,
    giro: ((i * 7) % 5) - 2,
  }));
  protected readonly uvas = [...Array(12)].map((_, i) => i);
  protected readonly confeti = [...Array(36)].map((_, i) => ({
    x: (i * 29) % 100,
    c: ['#e2774a', '#ffd23f', '#8fd3c8', '#4a6670', '#f0b893'][i % 5],
    dur: 3.5 + ((i * 7) % 5) * 0.6,
    ret: -((i * 1.3) % 6),
    giro: (i * 47) % 360,
  }));

  protected readonly etiqueta = computed(() => {
    const e = this.escena();
    switch (e?.tipo) {
      case 'velitas':
        return 'Velitas encendidas por el Día de Velitas';
      case 'novena':
        return `Novena de la salud: día ${e.dia} de 9`;
      case 'nochebuena':
        return `Nochebuena: faltan ${e.faltan} para la Navidad`;
      case 'navidad':
        return 'Regalos de Navidad';
      case 'nochevieja':
        return `Las 12 uvas: faltan ${e.faltan} para ${e.anio}`;
      case 'anonuevo':
        return `Feliz ${e.anio}`;
      default:
        return '';
    }
  });
}
