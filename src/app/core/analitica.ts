import { isDevMode } from '@angular/core';
import { inject as iniciarVercel, pageview, track } from '@vercel/analytics';

/**
 * Analítica anónima con Vercel Web Analytics (sin cookies ni datos personales).
 * Además de las visitas, cuenta los clics a WhatsApp, Instagram y el mapa, y la sección
 * desde donde se hicieron:
 * - como evento `whatsapp` / `instagram` / `mapa` (visible en planes Pro de Vercel), y
 * - como visita a una ruta virtual `/clic/<tipo>/<sección>` (visible también en el plan gratis).
 */
export type TipoClic = 'whatsapp' | 'instagram' | 'mapa' | 'google';

export function tipoDeEnlace(href: string): TipoClic | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  const h = url.hostname.replace(/^www\./, '');
  if (h === 'wa.me' || h === 'api.whatsapp.com') {
    // wa.me/?text=… sin número es «compartir», no un mensaje al consultorio
    return url.pathname.length > 1 ? 'whatsapp' : null;
  }
  if (h === 'instagram.com') return 'instagram';
  if (h === 'g.page' || (h === 'search.google.com' && url.pathname.includes('review')))
    return 'google';
  if (
    h === 'maps.google.com' ||
    (h.endsWith('google.com') && url.pathname.startsWith('/maps')) ||
    h === 'maps.app.goo.gl'
  ) {
    return 'mapa';
  }
  return null;
}

/** Nombre corto de la sección donde está el enlace (id de la sección, o header/footer). */
export function seccionDe(el: Element): string {
  const s = el.closest('section[id], header, footer, aside, [data-seccion]');
  if (!s) return 'otra';
  return (s.getAttribute('data-seccion') || s.id || s.tagName.toLowerCase()).slice(0, 40);
}

export function iniciarAnalitica(): void {
  if (typeof window === 'undefined') return;
  iniciarVercel({ mode: isDevMode() ? 'development' : 'production' });
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const tipo = tipoDeEnlace(a.href);
      if (!tipo) return;
      const seccion = seccionDe(a);
      track(tipo, { seccion });
      pageview({ route: `/clic/${tipo}`, path: `/clic/${tipo}/${seccion}` });
    },
    { capture: true },
  );
}
