import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './sections/about/about';
import { Activity } from './sections/activity/activity';
import { Booking } from './sections/booking/booking';
import { Faq } from './sections/faq/faq';
import { Galeria } from './sections/galeria/galeria';
import { Novedades } from './sections/novedades/novedades';
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
    Galeria,
    Novedades,
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
      <app-galeria />
      <app-about />
      <app-booking />
      <app-faq />
      <app-novedades />
      <app-instagram />
      <app-location />
    </main>
    <app-footer />
    <app-whatsapp-float />
  `,
})
export class HomePage {}
