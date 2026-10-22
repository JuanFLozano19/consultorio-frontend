import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE, mapsHref } from '../../../../core/config/site.config';

@Component({
  selector: 'app-location',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location {
  protected readonly address = SITE.contact.address;
  protected readonly hours = SITE.contact.hours;
  protected readonly mapsHref = mapsHref();
}
