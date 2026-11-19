/**
 * Temporada de Navidad y Año Nuevo: aviso de arriba y «escena» al pie del inicio.
 * Todo cambia solo según la fecha y la hora de Bogotá. Para otra temporada basta con
 * cambiar las fechas y los textos de este archivo.
 *
 * Fechas especiales:
 * - 7 dic: noche de velitas.
 * - 16–24 dic: novena (un consejo por día; estrellas que se van encendiendo).
 * - 24 dic desde las 6:00 p. m.: Nochebuena, con cuenta regresiva a la medianoche.
 * - 25 dic: Navidad.
 * - 31 dic: noche vieja, con las 12 uvas y cuenta regresiva al año nuevo.
 * - 1 ene: ¡feliz año nuevo! con confeti.
 */
import { Ahora, ahoraEnBogota } from './horario';

export interface AvisoTemporada {
  /** Clave para recordar si la persona lo cerró (cambia con cada mensaje). */
  clave: string;
  etiqueta: string;
  texto: string;
  accion?: { texto: string; destino: 'instagram' | 'whatsapp' };
  /** Ícono del aviso. */
  icono?: 'estrella' | 'vela' | 'regalo' | 'uvas' | 'confeti';
}

export type Escena =
  | { tipo: 'velitas' }
  | { tipo: 'novena'; dia: number; consejo: string }
  | { tipo: 'nochebuena'; faltan: string }
  | { tipo: 'navidad' }
  | { tipo: 'nochevieja'; faltan: string; anio: number }
  | { tipo: 'anonuevo'; anio: number };

/** [año, mes (1-12), día] */
type Dia = [number, number, number];
const INICIO: Dia = [2026, 11, 18];
const FIN: Dia = [2027, 1, 6];
/** Hora (en minutos) desde la que el 24 se vuelve «Nochebuena». */
const NOCHEBUENA = 18 * 60;

/** Un consejo por día de la novena (16 al 24 de diciembre), igual que las historias de Instagram. */
export const NOVENA = [
  'Baila, que también cuenta.',
  'El agua también se invita.',
  'Natilla sí, con medida.',
  'Celebra sin pólvora.',
  'Si tomas, no manejes.',
  'Dormir también es fiesta.',
  'Frutas en la mesa.',
  'Tus medicamentos no se van de vacaciones.',
  'El mejor regalo: tiempo.',
];

const num = ([a, m, d]: Dia) => a * 10000 + m * 100 + d;
const partes = (hoy: Date): Dia => [hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate()];

/** true entre INICIO y FIN (decoración navideña de la página). */
export function temporadaActiva(hoy: Date): boolean {
  const n = num(partes(hoy));
  return n >= num(INICIO) && n <= num(FIN);
}

/** 7 de diciembre: noche de velitas. */
export function esDiaDeVelitas(hoy: Date): boolean {
  return hoy.getMonth() === 11 && hoy.getDate() === 7;
}

/** Tiempo que falta para la medianoche: «3 h 20 min», «45 min», «menos de 1 min». */
export function faltaParaMedianoche(minutos: number): string {
  const r = Math.max(0, 1440 - minutos);
  if (r < 1) return 'menos de 1 min';
  const h = Math.floor(r / 60);
  const m = r % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** Qué se muestra al pie del inicio según la fecha y la hora (null = nada especial). */
export function escenaTemporada(hoy: Date, minutos = 0): Escena | null {
  if (!temporadaActiva(hoy)) return null;
  const [a, m, d] = partes(hoy);
  if (esDiaDeVelitas(hoy)) return { tipo: 'velitas' };
  if (m === 12 && d === 24 && minutos >= NOCHEBUENA) {
    return { tipo: 'nochebuena', faltan: faltaParaMedianoche(minutos) };
  }
  if (m === 12 && d >= 16 && d <= 24)
    return { tipo: 'novena', dia: d - 15, consejo: NOVENA[d - 16] };
  if (m === 12 && d === 25) return { tipo: 'navidad' };
  if (m === 12 && d === 31) {
    return { tipo: 'nochevieja', faltan: faltaParaMedianoche(minutos), anio: a + 1 };
  }
  if (m === 1 && d === 1) return { tipo: 'anonuevo', anio: a };
  return null;
}

export function avisoTemporada(hoy: Date, minutos = 0): AvisoTemporada | null {
  if (!temporadaActiva(hoy)) return null;
  const [a, m, d] = partes(hoy);
  const insta = { texto: 'Síguela en Instagram', destino: 'instagram' as const };
  const escena = escenaTemporada(hoy, minutos);

  switch (escena?.tipo) {
    case 'velitas':
      return {
        clave: `velitas-${a}`,
        etiqueta: 'Noche de velitas',
        texto: 'Prende tus velas lejos de cortinas y de los niños, y celebra sin pólvora.',
        icono: 'vela',
      };
    case 'nochebuena':
      return {
        clave: `nochebuena-${a}`,
        etiqueta: '¡Feliz Nochebuena!',
        texto: `Faltan ${escena.faltan} para la Navidad. Que esta noche tengas tiempo para los tuyos.`,
        icono: 'estrella',
      };
    case 'novena':
      return {
        clave: `novena-${a}-${d}`,
        etiqueta: `Novena de la salud · Día ${escena.dia}`,
        texto: escena.consejo,
        accion: insta,
      };
    case 'navidad':
      return {
        clave: `navidad-${a}`,
        etiqueta: '¡Feliz Navidad!',
        texto: 'Que estas fiestas tengas tiempo para lo que más importa: tu familia y tu salud.',
        icono: 'regalo',
      };
    case 'nochevieja':
      return {
        clave: `nochevieja-${a}`,
        etiqueta: 'Noche vieja',
        texto: `Faltan ${escena.faltan} para ${escena.anio}. Celebra sin pólvora y, si tomas, no manejes.`,
        icono: 'uvas',
      };
    case 'anonuevo':
      return {
        clave: `ano-nuevo-${a}`,
        etiqueta: `¡Feliz ${a}!`,
        texto: 'Propósito número 1: tu chequeo preventivo.',
        accion: { texto: 'Agenda por WhatsApp', destino: 'whatsapp' },
        icono: 'confeti',
      };
  }
  if (m === 12 && d >= 26) {
    return {
      clave: `fin-de-ano-${a}`,
      etiqueta: 'Fin de año',
      texto: 'Este 31, celebra sin pólvora. Y si tomas, no manejes.',
    };
  }
  if (m === 1) {
    return {
      clave: `ano-nuevo-${a}`,
      etiqueta: `¡Feliz ${a}!`,
      texto: 'Propósito número 1: tu chequeo preventivo.',
      accion: { texto: 'Agenda por WhatsApp', destino: 'whatsapp' },
    };
  }
  return {
    clave: `previa-${a}`,
    etiqueta: 'Novena de la salud',
    texto: 'Del 16 al 24 de diciembre, un consejo de salud cada día.',
    accion: insta,
  };
}

/**
 * Diferencia (ms) entre la hora simulada y la real. Para revisar cómo se verá la página
 * otro día se puede abrir con `?fecha=2026-12-07` o con hora: `?fecha=2026-12-31T23:58`
 * (solo cambia la decoración y el aviso; el reloj sigue corriendo desde ahí).
 */
function desfaseSimulado(): number {
  try {
    const f = new URLSearchParams(location.search).get('fecha');
    const r = f?.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/);
    if (r) {
      const [, a, m, d, h = '12', mi = '00'] = r;
      // Bogotá es UTC−5 todo el año.
      return Date.UTC(+a, +m - 1, +d, +h + 5, +mi) - Date.now();
    }
  } catch {
    /* sin ventana (pruebas): hora real */
  }
  return 0;
}

const DESFASE = desfaseSimulado();

/** Fecha y hora actuales de Bogotá para la temporada (respeta `?fecha=` para revisar). */
export function ahoraTemporada(): Ahora {
  return ahoraEnBogota(new Date(Date.now() + DESFASE));
}

/** Solo la fecha de hoy (Bogotá) para la temporada. */
export function hoyTemporada(): Date {
  return ahoraTemporada().hoy;
}
