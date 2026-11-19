/**
 * Videos cortos del consultorio (Reels) que se muestran en la página.
 * Los archivos están en public/videos: <archivo>.mp4 (540×960) y <archivo>.webp (portada).
 */
export type CategoriaVideo = 'navidad' | 'mito' | 'sabias' | 'humor';

export interface VideoCorto {
  archivo: string;
  titulo: string;
  categoria: CategoriaVideo;
}

export const CATEGORIAS: { id: CategoriaVideo; nombre: string; soloTemporada?: boolean }[] = [
  { id: 'navidad', nombre: 'Navidad', soloTemporada: true },
  { id: 'mito', nombre: '¿Mito o dato?' },
  { id: 'sabias', nombre: '¿Sabías que…?' },
  { id: 'humor', nombre: 'Con humor' },
];

export const VIDEOS: readonly VideoCorto[] = [
  { archivo: 'navidad-novena', titulo: 'Novena de la salud', categoria: 'navidad' },
  { archivo: 'navidad-mito-o-dato', titulo: '¿Mito o dato? Edición Navidad', categoria: 'navidad' },
  { archivo: 'navidad-frases', titulo: 'Las 3 frases de diciembre', categoria: 'navidad' },
  { archivo: 'mito-o-dato-1', titulo: '¿Mito o dato? · Parte 1', categoria: 'mito' },
  { archivo: 'mito-o-dato-2', titulo: '¿Mito o dato? · Parte 2', categoria: 'mito' },
  { archivo: 'mito-o-dato-4', titulo: '¿Mito o dato? · Parte 4', categoria: 'mito' },
  { archivo: 'sabias-que-1', titulo: '¿Sabías que…? Tu cuerpo', categoria: 'sabias' },
  { archivo: 'sabias-que-2', titulo: '¿Sabías que…? Parte 2', categoria: 'sabias' },
  { archivo: 'humor-nevera', titulo: 'La nevera tiene algo que decir', categoria: 'humor' },
  { archivo: 'humor-gps', titulo: 'El GPS de la salud', categoria: 'humor' },
  { archivo: 'humor-chequeo', titulo: 'El chequeo que aplazo', categoria: 'humor' },
  { archivo: 'humor-reloj', titulo: 'El reloj que cuenta pasos', categoria: 'humor' },
];

/** Categorías visibles (Navidad solo en temporada) que tienen al menos un video. */
export function categoriasVisibles(enTemporada: boolean) {
  return CATEGORIAS.filter(
    (c) => (enTemporada || !c.soloTemporada) && VIDEOS.some((v) => v.categoria === c.id),
  );
}
