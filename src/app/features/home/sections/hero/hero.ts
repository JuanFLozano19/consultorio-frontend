import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { Logo } from '../../../../shared/components/logo/logo';

@Component({
  selector: 'app-hero',
  imports: [Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly doctor = SITE.doctor;
  protected readonly address = SITE.contact.address;
}
