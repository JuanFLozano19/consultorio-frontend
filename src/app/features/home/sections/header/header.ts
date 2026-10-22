import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { Logo } from '../../../../shared/components/logo/logo';

@Component({
  selector: 'app-header',
  imports: [Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly doctor = SITE.doctor;
  protected readonly links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#actividad', label: 'Actividad física' },
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#ubicacion', label: 'Ubicación' },
  ];
}
