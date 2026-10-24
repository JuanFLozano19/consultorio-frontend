import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../../core/config/site.config';
import { Logo } from '../../../../shared/components/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly doctor = SITE.doctor;
  protected readonly address = SITE.contact.address;
  protected readonly year = new Date().getFullYear();
  protected readonly enLinea = SITE.features.citasEnLinea;
}
