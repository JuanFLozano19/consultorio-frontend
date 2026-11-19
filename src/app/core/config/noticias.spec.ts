import { NOTICIAS, fechaCorta, ultimasNoticias } from './noticias';

describe('noticias', () => {
  it('todas tienen fecha válida, fuente y enlace seguro', () => {
    NOTICIAS.forEach((n) => {
      expect(n.fecha).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(n.fuente.length).toBeGreaterThan(2);
      expect(n.enlace.startsWith('https://')).toBe(true);
    });
  });

  it('ordena de la más reciente a la más antigua', () => {
    const r = ultimasNoticias(3, [
      { ...NOTICIAS[0], fecha: '2026-01-01' },
      { ...NOTICIAS[0], fecha: '2026-03-01' },
      { ...NOTICIAS[0], fecha: '2026-02-01' },
    ]);
    expect(r.map((x) => x.fecha)).toEqual(['2026-03-01', '2026-02-01', '2026-01-01']);
  });

  it('formatea la fecha en español', () => {
    expect(fechaCorta('2026-11-18')).toBe('18 nov 2026');
    expect(fechaCorta('2026-01-02')).toBe('2 ene 2026');
  });
});
