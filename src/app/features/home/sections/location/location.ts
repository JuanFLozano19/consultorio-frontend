import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { tablaHorario } from '../../../../core/config/horario';
import {
  SITE,
  instagramHref,
  mapsHref,
  whatsappDisplay,
  whatsappHref,
} from '../../../../core/config/site.config';
import { Estado } from '../../../../shared/components/estado/estado';
import { Icon } from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-location',
  imports: [Icon, Estado],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location {
  protected readonly address = SITE.contact.address;
  protected readonly hours = tablaHorario();
  protected readonly mapsHref = mapsHref();
  protected readonly whatsappHref = whatsappHref();
  protected readonly whatsappDisplay = whatsappDisplay();
  protected readonly instagram = SITE.contact.instagram;
  protected readonly instagramHref = instagramHref();
  /** Mapa embebido de Google (no requiere API key). La URL es fija, no viene del usuario. */
  protected readonly mapaEmbed = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    `https://www.google.com/maps?q=${encodeURIComponent(SITE.contact.address.mapsQuery)}&output=embed`,
  );
}
