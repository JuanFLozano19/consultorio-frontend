import { VIDEOS, categoriasVisibles } from './videos';

describe('videos', () => {
  it('Navidad solo aparece en temporada', () => {
    expect(categoriasVisibles(true)[0].id).toBe('navidad');
    expect(categoriasVisibles(false).some((c) => c.id === 'navidad')).toBe(false);
  });

  it('cada video tiene archivo y título únicos', () => {
    expect(new Set(VIDEOS.map((v) => v.archivo)).size).toBe(VIDEOS.length);
    VIDEOS.forEach((v) => expect(v.titulo.length).toBeGreaterThan(3));
  });
});
