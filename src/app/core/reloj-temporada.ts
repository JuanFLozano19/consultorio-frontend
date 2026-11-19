import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { Ahora } from './config/horario';
import { ahoraTemporada, avisoTemporada, escenaTemporada } from './config/temporada';

/**
 * Reloj de la temporada: se actualiza cada 15 s para que el aviso y la escena cambien
 * solos (por ejemplo, a la medianoche del 24 o del 31) sin recargar la página.
 */
@Injectable({ providedIn: 'root' })
export class RelojTemporada {
  private readonly ahora = signal<Ahora>(ahoraTemporada());
  readonly escena = computed(() => escenaTemporada(this.ahora().hoy, this.ahora().minutos));
  readonly aviso = computed(() => avisoTemporada(this.ahora().hoy, this.ahora().minutos));

  constructor() {
    if (typeof window === 'undefined') return;
    const id = setInterval(() => this.ahora.set(ahoraTemporada()), 15_000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
