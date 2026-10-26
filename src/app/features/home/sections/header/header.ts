import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { Logo } from '../../../../shared/components/logo/logo';

@Component({
  selector: 'app-header',
  imports: [Logo],
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
  protected readonly links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#actividad', label: 'Actividad física' },
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#preguntas', label: 'Preguntas' },
    { href: '#ubicacion', label: 'Ubicación' },
  ];

  /** La barra se compacta y toma sombra al bajar. */
  protected readonly compacto = signal(false);
  /** Sección visible, para resaltar su enlace. */
  protected readonly activo = signal('');
  protected readonly menuAbierto = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.alHacerScroll();
      if (typeof IntersectionObserver === 'undefined') return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.activo.set('#' + e.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const l of this.links) {
        const el = document.querySelector(l.href);
        if (el) obs.observe(el);
      }
      const inicio = document.querySelector('#inicio');
      if (inicio) obs.observe(inicio);
      destroyRef.onDestroy(() => obs.disconnect());
    });
  }

  protected alHacerScroll(): void {
    this.compacto.set(window.scrollY > 24);
  }

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }
}
