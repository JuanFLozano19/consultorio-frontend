import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Isotipo: estetoscopio en forma de corazón con las iniciales JP. Toma el color del texto. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="width()"
      [attr.height]="size()"
      viewBox="0 0 200 220"
      [attr.stroke-width]="strokeWidth()"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
    >
      <g fill="none" stroke="currentColor" stroke-linecap="round">
        <path d="M55 32 C 22 62, 38 108, 100 142"></path>
        <path d="M145 32 C 178 62, 162 108, 100 142"></path>
        <path d="M100 142 C 100 180, 116 198, 136 192"></path>
        <path d="M48 26 L58 32 M152 26 L142 32"></path>
      </g>
      <circle cx="152" cy="186" r="17" fill="none" stroke="currentColor"></circle>
      <circle cx="152" cy="186" r="7" fill="currentColor"></circle>
      <text x="96" y="98" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="52" fill="currentColor" stroke="none">J<tspan dx="-9">P</tspan></text>
    </svg>
  `,
  styles: `:host { display: inline-flex; } svg { max-width: 100%; height: auto; }`,
})
export class Logo {
  readonly size = input(44);
  readonly strokeWidth = input(6);
  readonly label = input('');
  protected readonly width = computed(() => Math.round(this.size() * (200 / 220)));
}
