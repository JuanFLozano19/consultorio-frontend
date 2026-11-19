import { irA, quitarHash } from './enlaces-internos';

describe('enlaces internos', () => {
  beforeEach(() => {
    window.matchMedia ??= (() => ({ matches: false })) as unknown as typeof window.matchMedia;
  });

  it('quita el # de la dirección sin cambiar la ruta', () => {
    history.replaceState(null, '', '/privacidad?x=1#reserva');
    quitarHash();
    expect(location.pathname + location.search + location.hash).toBe('/privacidad?x=1');
  });

  it('lleva el foco a la sección y no deja # en la dirección', () => {
    document.body.innerHTML = '<section id="reserva">R</section>';
    const s = document.getElementById('reserva')!;
    s.scrollIntoView = () => undefined;
    history.replaceState(null, '', '/#reserva');
    irA(s);
    expect(document.activeElement).toBe(s);
    expect(location.hash).toBe('');
  });
});
