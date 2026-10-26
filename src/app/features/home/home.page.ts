import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './sections/about/about';
import { Activity } from './sections/activity/activity';
import { Booking } from './sections/booking/booking';
import { Faq } from './sections/faq/faq';
import { Instagram } from './sections/instagram/instagram';
import { Footer } from './sections/footer/footer';
import { Header } from './sections/header/header';
import { Hero } from './sections/hero/hero';
import { Location } from './sections/location/location';
import { Services } from './sections/services/services';
import { WhatsappFloat } from './sections/whatsapp-float/whatsapp-float';

@Component({
  selector: 'app-home-page',
  imports: [
    Header,
    Hero,
    Services,
    Activity,
    About,
    Booking,
    Faq,
    Instagram,
    Location,
    Footer,
    WhatsappFloat,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-services />
      <app-activity />
      <app-about />
      <app-booking />
      <app-faq />
      <app-instagram />
      <app-location />
    </main>
    <app-footer />
    <app-whatsapp-float />
  `,
})
export class HomePage {}
