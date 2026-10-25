import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE, whatsappHref } from '../../../../core/config/site.config';
import { Icon } from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-whatsapp-float',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="float"
      [href]="href"
      [attr.target]="externo ? '_blank' : null"
      [attr.rel]="externo ? 'noopener' : null"
      aria-label="¿Tienes una pregunta? Escríbenos por WhatsApp"
      title="¿Tienes una pregunta? Escríbenos"
    >
      <app-icon name="whatsapp" [size]="30" />
    </a>
  `,
  styles: `
    .float {
      position: fixed;
      right: calc(20px + env(safe-area-inset-right, 0px));
      bottom: calc(20px + env(safe-area-inset-bottom, 0px));
      z-index: 6;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: var(--slate);
      color: var(--on-slate);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgb(30 45 50 / 0.28);
    }
    .float:hover {
      background: var(--slate-ink);
    }
  `,
})
export class WhatsappFloat {
  protected readonly href = whatsappHref();
  protected readonly externo = !!SITE.contact.whatsapp;
}
