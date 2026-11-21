import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { Logo } from '../../../../shared/components/logo/logo';
import { Guirnalda } from '../../../../shared/components/guirnalda/guirnalda';
import { hoyTemporada, temporadaActiva } from '../../../../core/config/temporada';

@Component({
  selector: 'app-header',
  imports: [Logo, Guirnalda],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(window:scroll)': 'alHacerScroll()',
    '(document:keydown.escape)': 'menuAbierto.set(false)',
  },
})
export class Header {
  protected readonly doctor = SITE.doctor;
  protected readonly navidad = temporadaActiva(hoyTemporada());
  protected readonly links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#actividad', label: 'Actividad' },
    { href: '#herramientas', label: 'Herramientas' },
    { href: '#galeria', label: 'Galería' },
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#noticias', label: 'Noticias' },
    { href: '#ubicacion', label: 'Ubicación' },
  ];

  /** La barra se compacta y toma sombra al bajar. */
  protected readonly compacto = signal(false);
  /** Sección visible, para resaltar su enlace. */
  protected readonly activo = signal('');
  protected readonly menuAbierto = signal(false);
  /** Tema que se ve ahora (el del sistema o el que eligió la persona). */
  protected readonly oscuro = signal(false);

  constructor() {
    afterNextRender(() => {
      const elegido = document.documentElement.dataset['theme'];
      this.oscuro.set(
        elegido
          ? elegido === 'dark'
          : (window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false),
      );
      this.alHacerScroll();
    });
  }

  private cuadro = 0;

  protected alHacerScroll(): void {
    this.compacto.set(window.scrollY > 24);
    if (!this.cuadro) this.cuadro = requestAnimationFrame(() => this.marcarActivo());
  }

  /**
   * Resalta el enlace de la sección que cruza la mitad de la pantalla. Se calcula al
   * hacer scroll (y no con observadores fijos) porque varias secciones se cargan
   * después, cuando la persona se acerca a ellas.
   */
  private marcarActivo(): void {
    this.cuadro = 0;
    const medio = window.innerHeight * 0.5;
    let activo = '';
    for (const l of this.links) {
      const el = document.querySelector(l.href);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.top <= medio && r.bottom > medio) activo = l.href;
    }
    this.activo.set(activo);
  }

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  /** Letra más grande para leer cómodo (se recuerda en este navegador). */
  protected readonly letraGrande = signal(
    typeof document !== 'undefined' && document.documentElement.classList.contains('letra-grande'),
  );

  protected alternarLetra(): void {
    const grande = !this.letraGrande();
    this.letraGrande.set(grande);
    document.documentElement.classList.toggle('letra-grande', grande);
    try {
      localStorage.setItem('letra', grande ? 'grande' : 'normal');
    } catch {
      /* sin almacenamiento: dura hasta recargar */
    }
  }

  /** Cambia entre modo claro y oscuro y lo recuerda en este navegador. */
  protected alternarTema(): void {
    const raiz = document.documentElement;
    const nuevo = this.oscuro() ? 'light' : 'dark';
    raiz.classList.add('cambiando-tema');
    raiz.dataset['theme'] = nuevo;
    this.oscuro.set(nuevo === 'dark');
    try {
      localStorage.setItem('tema', nuevo);
    } catch {
      /* sin almacenamiento: el tema dura hasta recargar */
    }
    setTimeout(() => raiz.classList.remove('cambiando-tema'), 500);
  }
}
