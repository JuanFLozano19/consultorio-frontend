import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE, instagramHref, mapsHref, whatsappDisplay, whatsappHref } from '../../../../core/config/site.config';
import { Icon } from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-location',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location {
  protected readonly address = SITE.contact.address;
  protected readonly hours = SITE.contact.hours;
  protected readonly mapsHref = mapsHref();
  protected readonly whatsappHref = whatsappHref();
  protected readonly whatsappDisplay = whatsappDisplay();
  protected readonly instagram = SITE.contact.instagram;
  protected readonly instagramHref = instagramHref();
}
