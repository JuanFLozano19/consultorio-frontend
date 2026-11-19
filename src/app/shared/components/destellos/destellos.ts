import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Estrellitas que caen despacio dentro del contenedor (decorativo). */
@Component({
  selector: 'app-destellos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    @for (d of lista(); track $index) {
      <svg
        viewBox="0 0 24 24"
        [style.left.%]="d.x"
        [style.width.px]="d.s"
        [style.--dur.s]="d.d"
        [style.--ret.s]="d.r"
        [style.color]="d.c"
      >
        <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
      </svg>
    }
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }
    svg {
      position: absolute;
      top: -30px;
      height: auto;
      opacity: 0.6;
    }
    @keyframes caer {
      to {
        transform: translateY(700px) rotate(220deg);
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      svg {
        animation: caer var(--dur) linear var(--ret) infinite;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      svg {
        top: calc(var(--ret) * -5%);
      }
    }
  `,
})
export class Destellos {
  readonly cantidad = input(12);
  protected readonly lista = computed(() =>
    [...Array(this.cantidad())].map((_, i) => ({
      x: (i * 61) % 100,
      s: 6 + ((i * 7) % 4) * 3,
      d: 9 + ((i * 5) % 7),
      r: -((i * 3.7) % 14),
      c: ['#ffd23f', '#f0b893', '#f6efe4'][i % 3],
    })),
  );
}
