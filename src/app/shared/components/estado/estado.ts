import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { ahoraEnBogota, estadoConsultorio } from '../../../core/config/horario';

/** Aviso "Abierto ahora · hasta las 7:00 p. m." en hora de Colombia; se actualiza cada minuto. */
@Component({
  selector: 'app-estado',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="estado" [class.estado--abierto]="estado().abierto"
    ><span class="punto" aria-hidden="true"></span>{{ estado().texto }}</span
  >`,
  styles: `
    :host {
      display: inline-flex;
    }
    .estado {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--muted);
    }
    .punto {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--muted);
      flex: none;
    }
    .estado--abierto {
      color: var(--ok);
      font-weight: 500;
    }
    .estado--abierto .punto {
      background: var(--ok);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--ok) 20%, transparent);
    }
  `,
})
export class Estado implements OnDestroy {
  protected readonly estado = signal(estadoConsultorio(ahoraEnBogota()));
  private readonly timer = setInterval(
    () => this.estado.set(estadoConsultorio(ahoraEnBogota())),
    60_000,
  );

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
