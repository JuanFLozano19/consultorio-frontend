import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 40 40" fill="none" stroke="currentColor"
         stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (name()) {
        @case ('stethoscope') {
          <path d="M12 6v10a8 8 0 0 0 16 0V6" />
          <path d="M20 24v4a6 6 0 0 0 12 0v-3" />
          <circle cx="32" cy="22" r="3" />
        }
        @case ('pulse') {
          <path d="M4 22h7l4-10 6 18 4-8h11" />
        }
        @case ('heart') {
          <path d="M20 35s-13-7.8-13-17A7 7 0 0 1 20 13a7 7 0 0 1 13 5c0 9.2-13 17-13 17z" />
          <path d="M14 21h4l2-4 2 7 2-3h3" />
        }
        @case ('document') {
          <rect x="8" y="5" width="24" height="30" rx="2" />
          <path d="M14 13h12M14 19h12M14 25h7" />
        }
        @case ('whatsapp') {
          <path d="M7 33l2.2-6.5A13.3 13.3 0 1 1 13.5 31z" />
          <path d="M15 15.8c.5 3.4 4.2 7 7.5 7.5l1.7-2 3 1.5c-.3 1.7-1.7 3-3.3 3-6-.3-11-5.3-11.3-11.3 0-1.7 1.3-3 3-3.3l1.5 3z" fill="currentColor" stroke="none" />
        }
        @default {
          <path d="M20 36s-11-10-11-18a11 11 0 0 1 22 0c0 8-11 18-11 18z" />
          <circle cx="20" cy="18" r="4" />
        }
      }
    </svg>
  `,
  styles: `:host { display: inline-flex; }`,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(40);
}
