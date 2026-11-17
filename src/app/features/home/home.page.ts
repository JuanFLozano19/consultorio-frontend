import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './sections/about/about';
import { Activity } from './sections/activity/activity';
import { Booking } from './sections/booking/booking';
import { Faq } from './sections/faq/faq';
import { Galeria } from './sections/galeria/galeria';
import { Manifiesto } from './sections/manifiesto/manifiesto';
import { Herramientas } from './sections/herramientas/herramientas';
import { Pasos } from './sections/pasos/pasos';
import { Progreso } from '../../shared/components/progreso/progreso';
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
    Manifiesto,
    Herramientas,
    Pasos,
    Progreso,
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
    <app-progreso />
    <app-header />
    <main>
      <app-hero />
      <app-manifiesto />
      <app-services />
      <app-activity />
      <app-herramientas />
      <app-galeria />
      <app-about />
      <app-pasos />
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
