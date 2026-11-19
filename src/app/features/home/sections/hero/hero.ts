import { ScrollProgreso } from '../../../../shared/directives/scroll-progreso';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { Estado } from '../../../../shared/components/estado/estado';
import { Logo } from '../../../../shared/components/logo/logo';

@Component({
  selector: 'app-hero',
  imports: [Logo, Estado, ScrollProgreso],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly doctor = SITE.doctor;
  protected readonly address = SITE.contact.address;
}
