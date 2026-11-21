/**
 * Enlaces internos (#reserva, #servicios…) sin dejar el «#» en la dirección.
 *
 * Antes, al tocar un enlace del menú la dirección quedaba como `/#reserva`. Si la persona
 * volvía a entrar desde el historial, el autocompletado o una pestaña guardada, la página
 * cargaba arriba y luego «se bajaba sola» hasta esa sección. Ahora:
 * - Los clics en enlaces internos desplazan la página pero no cambian la dirección.
 * - Si la dirección trae «#» al entrar, index.html lo quita antes de cargar: la página
 *   siempre abre arriba.
 */
export function iniciarEnlacesInternos(): void {
  if (typeof window === 'undefined') return;

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const id = decodeURIComponent(a.getAttribute('href')!.slice(1));
    const destino = id ? document.getElementById(id) : null;
    if (id && !destino) return;
    e.preventDefault();
    // Si el clic vino del menú abierto del celular, esperar a que termine de cerrarse
    // (la página sube ~0,45 s); si no, el destino se calcularía corrido hacia abajo.
    const desdeMenu = !!a.closest('.header--menu');
    setTimeout(() => irA(destino), desdeMenu ? 470 : 0);
  });
}

/** Desplaza hasta el elemento (o arriba del todo) y le pasa el foco para teclado y lectores. */
export function irA(destino: HTMLElement | null): void {
  const suave = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!destino || destino.id === 'inicio') {
    window.scrollTo({ top: 0, behavior: suave ? 'smooth' : 'auto' });
  } else {
    destino.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });
    corregirAlTerminar(destino);
    if (!destino.hasAttribute('tabindex')) destino.setAttribute('tabindex', '-1');
    destino.focus({ preventScroll: true });
  }
  quitarHash();
}

/** Quita el «#…» de la dirección sin recargar ni tocar el estado del router. */
export function quitarHash(): void {
  if (!location.hash) return;
  history.replaceState(history.state, '', location.pathname + location.search);
}

/**
 * Si mientras bajaba cambió el alto de algo de arriba (imágenes que terminan de cargar,
 * animaciones), ajusta al final para que la sección quede justo debajo del menú.
 */
function corregirAlTerminar(destinoInicial: HTMLElement): void {
  // Si la sección se estaba cargando, el elemento de reserva se reemplaza por el real:
  // se vuelve a buscar por id en cada ajuste.
  const actual = (): HTMLElement => document.getElementById(destinoInicial.id) ?? destinoInicial;
  let hecho = false;
  const ajustar = (): void => {
    if (hecho) return;
    hecho = true;
    window.removeEventListener('scrollend', ajustar);
    const destino = actual();
    const margen = parseFloat(getComputedStyle(destino).scrollMarginTop) || 0;
    const delta = destino.getBoundingClientRect().top - margen;
    if (Math.abs(delta) > 6) window.scrollBy({ top: delta, behavior: 'auto' });
  };
  window.addEventListener('scrollend', ajustar, { once: true });
  setTimeout(ajustar, 1600);
  // Las secciones que se cargan al acercarse pueden cambiar el alto un momento después:
  // un segundo ajuste deja la sección en su sitio.
  setTimeout(() => {
    const destino = actual();
    const margen = parseFloat(getComputedStyle(destino).scrollMarginTop) || 0;
    const delta = destino.getBoundingClientRect().top - margen;
    if (Math.abs(delta) > 6) window.scrollBy({ top: delta, behavior: 'auto' });
  }, 2400);
}
