import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, instagramHref } from '../../../../core/config/site.config';
import { Icon } from '../../../../shared/components/icon/icon';
import { Logo } from '../../../../shared/components/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly doctor = SITE.doctor;
  protected readonly address = SITE.contact.address;
  protected readonly year = new Date().getFullYear();
  protected readonly enLinea = SITE.features.citasEnLinea;
  protected readonly instagram = SITE.contact.instagram;
  protected readonly instagramHref = instagramHref();
}
