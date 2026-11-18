import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Cinta en movimiento con los servicios: dos filas en direcciones opuestas. Se detiene al pasar el mouse. */
@Component({
  selector: 'app-cinta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cinta" role="region" aria-label="Servicios del consultorio">
      <p class="sr">
        Medicina general, chequeos preventivos, actividad física y salud, certificados médicos.
      </p>
      @for (fila of filas; track $index; let i = $index) {
        <div class="fila" [class.fila--inv]="i === 1" aria-hidden="true">
          <div class="pista">
            @for (vuelta of [0, 1]; track vuelta) {
              @for (t of fila; track t) {
                <span class="item" [class.item--serif]="i === 1">{{ t }}</span
                ><span class="sep">✦</span>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    /* Colores fijos de campaña: se ven bien en claro y oscuro */
    .cinta {
      background: #13343b;
      color: #fff3e6;
      padding: 26px 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .fila {
      display: flex;
      overflow: hidden;
      mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }
    .pista {
      display: flex;
      align-items: center;
      flex: none;
      gap: 34px;
      padding-right: 34px;
      white-space: nowrap;
    }
    .item {
      font-weight: 700;
      font-size: clamp(26px, 3.4vw, 44px);
      letter-spacing: -0.01em;
      text-transform: uppercase;
    }
    .item--serif {
      font-family: var(--display);
      font-style: italic;
      font-weight: 400;
      text-transform: none;
      color: #f0b893;
    }
    .sep {
      color: #e2774a;
      font-size: 22px;
    }
    @media (prefers-reduced-motion: no-preference) {
      .pista {
        animation: correr 38s linear infinite;
      }
      .fila--inv .pista {
        animation-direction: reverse;
        animation-duration: 46s;
      }
      .cinta:hover .pista {
        animation-play-state: paused;
      }
    }
    @keyframes correr {
      to {
        transform: translateX(-50%);
      }
    }
    .sr {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
    }
  `,
})
export class Cinta {
  protected readonly filas = [
    [
      'Medicina general',
      'Chequeos preventivos',
      'Actividad física y salud',
      'Certificados médicos',
    ],
    [
      'Con tiempo para escucharte',
      'Sin filas ni afán',
      'Moverte también es medicina',
      'Consulta particular',
    ],
  ];
}
