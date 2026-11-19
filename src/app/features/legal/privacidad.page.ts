import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, whatsappDisplay, whatsappHref } from '../../core/config/site.config';
import { Logo } from '../../shared/components/logo/logo';

/** Aviso de privacidad y tratamiento de datos (Ley 1581 de 2012). */
@Component({
  selector: 'app-privacidad',
  imports: [RouterLink, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="barra">
      <div class="wrap">
        <a class="marca" routerLink="/"
          ><app-logo [size]="40" /><span>{{ doctor.name }}</span></a
        >
        <a class="volver" routerLink="/">← Volver al inicio</a>
      </div>
    </div>
    <main class="wrap doc">
      <p class="eyebrow">Tus datos</p>
      <h1>Aviso de <em>privacidad</em></h1>
      <p class="lead">
        Así se manejan los datos personales en esta página y en el consultorio, según la Ley 1581 de
        2012 y sus normas reglamentarias.
      </p>

      <h2>Quién es el responsable</h2>
      <p>
        {{ doctor.fullName }}, médico general. {{ a.street }}, {{ a.floor.toLowerCase() }},
        {{ a.building }}, {{ a.city }}. Contacto: WhatsApp
        <a [href]="wa" target="_blank" rel="noopener">{{ waTexto }}</a
        >.
      </p>

      <h2>Qué datos se recogen en esta página</h2>
      <ul>
        <li>
          <b>No hay registro ni cuentas.</b> La página no guarda en servidores lo que escribes. El
          formulario de reserva y «Prepara tu consulta» solo arman un mensaje que tú decides enviar
          por WhatsApp.
        </li>
        <li>
          <b>En tu propio navegador</b> se guardan, si los usas, tus notas de «Prepara tu consulta»,
          el modo claro u oscuro y si cerraste el aviso de temporada. Puedes borrarlos desde la
          configuración de tu navegador.
        </li>
        <li>
          <b>Estadísticas anónimas.</b> Contamos visitas y clics a WhatsApp, Instagram y el mapa con
          Vercel Web Analytics, que no usa cookies ni identifica a las personas.
        </li>
        <li>
          <b>Servicios de terceros.</b> El mapa (Google Maps) y los enlaces a WhatsApp, Instagram y
          Waze se rigen por las políticas de privacidad de esas empresas.
        </li>
      </ul>

      <h2>Datos que compartes al pedir una cita o en la consulta</h2>
      <p>
        Cuando escribes por WhatsApp o asistes a consulta puedes compartir tu nombre, teléfono,
        documento y el motivo de tu consulta. La información de salud es un dato sensible: solo se
        trata con tu autorización, no estás obligado a darla y se guarda con reserva en la historia
        clínica, como lo exige la ley.
      </p>

      <h2>Para qué se usan</h2>
      <ul>
        <li>Responder tus mensajes y agendar, confirmar o reprogramar tu cita.</li>
        <li>Prestarte la atención médica y hacer el seguimiento que acuerdes con el doctor.</li>
        <li>Cumplir las obligaciones legales del ejercicio de la medicina.</li>
      </ul>
      <p>Tus datos no se venden ni se comparten con terceros, salvo cuando la ley lo exija.</p>

      <h2>Tus derechos</h2>
      <p>Como titular de tus datos puedes:</p>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos.</li>
        <li>Pedir prueba de la autorización que diste y saber cómo se han usado.</li>
        <li>
          Revocar la autorización o pedir que se borren, cuando no exista un deber legal de
          conservarlos (por ejemplo, la historia clínica).
        </li>
        <li>Acceder gratis a tus datos.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
      </ul>

      <h2>Cómo ejercerlos</h2>
      <p>
        Escribe por WhatsApp al <a [href]="wa" target="_blank" rel="noopener">{{ waTexto }}</a> o
        pídelo en consulta. Las consultas se responden en máximo 10 días hábiles y los reclamos en
        máximo 15 días hábiles.
      </p>

      <p class="vigencia">Vigente desde noviembre de 2026. Si cambia, lo publicaremos aquí.</p>
    </main>
  `,
  styleUrl: './marco-legal.scss',
  styles: `
    .doc {
      max-width: 760px;
      padding-block: 56px 96px;
    }
    h1 {
      font-size: clamp(40px, 6vw, 60px);
      margin: 10px 0 16px;
      em {
        font-style: italic;
        color: var(--clay);
      }
    }
    .lead {
      font-size: 19px;
      color: var(--muted);
    }
    h2 {
      font-size: 28px;
      margin: 40px 0 12px;
    }
    ul {
      padding-left: 20px;
      display: grid;
      gap: 10px;
    }
    a {
      color: var(--slate-ink);
      text-underline-offset: 3px;
    }
    .vigencia {
      margin-top: 48px;
      font-size: 14px;
      color: var(--muted);
    }
  `,
})
export class PrivacidadPage {
  protected readonly doctor = SITE.doctor;
  protected readonly a = SITE.contact.address;
  protected readonly wa = whatsappHref();
  protected readonly waTexto = whatsappDisplay();
}
