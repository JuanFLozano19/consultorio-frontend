import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, whatsappHref } from '../../core/config/site.config';
import { Logo } from '../../shared/components/logo/logo';

/** Página para enlaces rotos o direcciones que no existen. */
@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="barra">
      <div class="wrap">
        <a class="marca" routerLink="/"
          ><app-logo [size]="40" /><span>{{ nombre }}</span></a
        >
      </div>
    </div>
    <main class="wrap nf">
      <app-logo class="nf__logo" [size]="110" [animado]="true" />
      <p class="eyebrow">Error 404</p>
      <h1>Esta página <em>no existe</em></h1>
      <p class="lead">
        Puede que el enlace esté mal escrito o que la página haya cambiado. Pero tranquilo: aquí
        seguimos, con tiempo para escucharte.
      </p>
      <div class="acciones">
        <a class="btn" routerLink="/">Ir al inicio</a>
        <a class="btn btn--ghost" [href]="wa" target="_blank" rel="noopener"
          >Escribir por WhatsApp</a
        >
      </div>
      <nav class="atajos" aria-label="Secciones">
        <a routerLink="/" fragment="servicios">Servicios</a>
        <a routerLink="/" fragment="reserva">Reservar</a>
        <a routerLink="/" fragment="ubicacion">Ubicación</a>
        <a routerLink="/" fragment="preguntas">Preguntas</a>
      </nav>
    </main>
  `,
  styleUrl: './marco-legal.scss',
  styles: `
    .nf {
      min-height: calc(100vh - 90px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 14px;
      padding-block: 48px;
    }
    .nf__logo {
      color: var(--slate);
      margin-bottom: 8px;
    }
    h1 {
      font-size: clamp(40px, 7vw, 68px);
      margin: 0;
      em {
        font-style: italic;
        color: var(--clay);
      }
    }
    .lead {
      max-width: 34em;
      color: var(--muted);
      font-size: 18px;
    }
    .acciones {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-top: 8px;
    }
    .atajos {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px 22px;
      margin-top: 22px;
      a {
        color: var(--slate-ink);
        text-underline-offset: 4px;
      }
    }
  `,
})
export class NoEncontradaPage {
  protected readonly nombre = SITE.doctor.name;
  protected readonly wa = whatsappHref();
}
