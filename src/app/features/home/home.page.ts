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
import { Videos } from './sections/videos/videos';
import { TestActividad } from './sections/test-actividad/test-actividad';
import { Recordatorio } from './sections/recordatorio/recordatorio';
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
    Videos,
    TestActividad,
    Recordatorio,
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
      @defer (on viewport; prefetch on idle) {
        <app-activity />
      } @placeholder {
        <div id="actividad" class="diferido" style="--h-d: 1153px; --h-m: 1781px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-test-actividad />
      } @placeholder {
        <div id="test-actividad" class="diferido" style="--h-d: 1028px; --h-m: 1088px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-herramientas />
      } @placeholder {
        <div id="herramientas" class="diferido" style="--h-d: 827px; --h-m: 930px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-mito-dato />
      } @placeholder {
        <div id="mito-o-dato" class="diferido" style="--h-d: 769px; --h-m: 774px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-videos />
      } @placeholder {
        <div id="videos" class="diferido" style="--h-d: 940px; --h-m: 1046px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-galeria />
      } @placeholder {
        <div id="galeria" class="diferido" style="--h-d: 946px; --h-m: 921px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-about />
      } @placeholder {
        <div id="sobre-mi" class="diferido" style="--h-d: 700px; --h-m: 1260px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-pasos />
      } @placeholder {
        <div id="primera-consulta" class="diferido" style="--h-d: 702px; --h-m: 945px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-preparar />
      } @placeholder {
        <div id="preparar" class="diferido" style="--h-d: 887px; --h-m: 1260px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-booking />
      } @placeholder {
        <div id="reserva" class="diferido" style="--h-d: 1365px; --h-m: 2163px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-recordatorio />
      } @placeholder {
        <div id="recordatorio" class="diferido" style="--h-d: 493px; --h-m: 732px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-faq />
      } @placeholder {
        <div id="preguntas" class="diferido" style="--h-d: 669px; --h-m: 1112px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-noticias />
      } @placeholder {
        <div id="noticias" class="diferido" style="--h-d: 1266px; --h-m: 2329px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-novedades />
      } @placeholder {
        <div id="novedades" class="diferido" style="--h-d: 947px; --h-m: 922px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-instagram />
      } @placeholder {
        <div class="diferido" style="--h-d: 467px; --h-m: 730px"></div>
      }
      @defer (on viewport; prefetch on idle) {
        <app-location />
      } @placeholder {
        <div id="ubicacion" class="diferido" style="--h-d: 822px; --h-m: 1121px"></div>
      }
    </main>
    <app-footer />
    <app-whatsapp-float />
  `,
})
export class HomePage {}
