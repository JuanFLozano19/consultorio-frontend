import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from './sections/about/about';
import { Activity } from './sections/activity/activity';
import { Booking } from './sections/booking/booking';
import { Faq } from './sections/faq/faq';
import { Galeria } from './sections/galeria/galeria';
import { Manifiesto } from './sections/manifiesto/manifiesto';
import { Cinta } from './sections/cinta/cinta';
import { Preparar } from './sections/preparar/preparar';
import { Herramientas } from './sections/herramientas/herramientas';
import { MitoDatoJuego } from './sections/mito-dato/mito-dato';
import { Pasos } from './sections/pasos/pasos';
import { Progreso } from '../../shared/components/progreso/progreso';
import { Novedades } from './sections/novedades/novedades';
import { Noticias } from './sections/noticias/noticias';
import { Temporada } from './sections/temporada/temporada';
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
    Cinta,
    Preparar,
    Herramientas,
    MitoDatoJuego,
    Pasos,
    Progreso,
    Novedades,
    Noticias,
    Temporada,
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
    <app-temporada />
    <app-header />
    <main>
      <app-hero />
      <app-manifiesto />
      <app-cinta />
      <app-services />
      <app-activity />
      <app-herramientas />
      <app-mito-dato />
      <app-galeria />
      <app-about />
      <app-pasos />
      <app-preparar />
      <app-booking />
      <app-faq />
      <app-noticias />
      <app-novedades />
      <app-instagram />
      <app-location />
    </main>
    <app-footer />
    <app-whatsapp-float />
  `,
})
export class HomePage {}
