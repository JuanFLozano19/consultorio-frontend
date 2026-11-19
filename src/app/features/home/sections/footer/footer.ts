import { Adornos } from '../../../../shared/components/adornos/adornos';
import { Destellos } from '../../../../shared/components/destellos/destellos';
import { hoyTemporada, temporadaActiva } from '../../../../core/config/temporada';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  SITE,
  instagramHref,
  mapsHref,
  whatsappDisplay,
  whatsappHref,
} from '../../../../core/config/site.config';
import { tablaHorario } from '../../../../core/config/horario';
import { Icon } from '../../../../shared/components/icon/icon';
import { Logo } from '../../../../shared/components/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo, RouterLink, Icon, Adornos, Destellos],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly aviso = signal('');

  /** Comparte la página (menú del sistema en celular) o copia el enlace. */
  protected async compartir(): Promise<void> {
    const url = location.origin + location.pathname;
    const datos = {
      title: 'Dr. Jeison Patiño · Medicina general',
      text: 'Consulta médica particular, con tiempo para escucharte.',
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(datos);
        return;
      }
      await navigator.clipboard.writeText(url);
      this.mostrar('Enlace copiado');
    } catch (e) {
      if ((e as DOMException)?.name !== 'AbortError') this.mostrar('No se pudo compartir');
    }
  }

  private mostrar(t: string): void {
    this.aviso.set(t);
    setTimeout(() => this.aviso.set(''), 2200);
  }

  protected readonly doctor = SITE.doctor;
  protected readonly address = SITE.contact.address;
  protected readonly year = new Date().getFullYear();
  protected readonly enLinea = SITE.features.citasEnLinea;
  protected readonly instagram = SITE.contact.instagram;
  protected readonly instagramHref = instagramHref();
  protected readonly wa = whatsappHref();
  protected readonly navidad = temporadaActiva(hoyTemporada());
  protected readonly waTexto = whatsappDisplay();
  protected readonly maps = mapsHref();
  protected readonly horario = tablaHorario();
  protected readonly links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#actividad', label: 'Actividad física' },
    { href: '#herramientas', label: 'Herramientas de salud' },
    { href: '#preparar', label: 'Prepara tu cita' },
    { href: '#galeria', label: 'Galería' },
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#preguntas', label: 'Preguntas frecuentes' },
  ];
}
