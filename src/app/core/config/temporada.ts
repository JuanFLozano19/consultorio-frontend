/**
 * Aviso de temporada (Navidad y Año Nuevo). Se muestra solo entre `INICIO` y `FIN`
 * y el mensaje cambia según el día en Bogotá. Para otra temporada basta con
 * cambiar las fechas y los textos de este archivo.
 */
import { ahoraEnBogota } from './horario';

export interface AvisoTemporada {
  /** Clave para recordar si la persona lo cerró (cambia con cada mensaje). */
  clave: string;
  etiqueta: string;
  texto: string;
  accion?: { texto: string; destino: 'instagram' | 'whatsapp' };
  /** Ícono del aviso: estrella (por defecto) o velita (Día de Velitas). */
  icono?: 'estrella' | 'vela';
}

/** [año, mes (1-12), día] */
type Dia = [number, number, number];
const INICIO: Dia = [2026, 11, 18];
const FIN: Dia = [2027, 1, 6];

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

/** true entre INICIO y FIN (decoración navideña de la página). */
export function temporadaActiva(hoy: Date): boolean {
  const n = num([hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate()]);
  return n >= num(INICIO) && n <= num(FIN);
}

/** 7 de diciembre: noche de velitas. */
export function esDiaDeVelitas(hoy: Date): boolean {
  return hoy.getMonth() === 11 && hoy.getDate() === 7;
}

/**
 * Fecha de hoy en Bogotá. Para revisar cómo se verá la página otro día, se puede abrir con
 * `?fecha=2026-12-07` (solo cambia la decoración y el aviso; no afecta el horario).
 */
export function hoyTemporada(): Date {
  try {
    const f = new URLSearchParams(location.search).get('fecha');
    if (f && /^\d{4}-\d{2}-\d{2}$/.test(f)) {
      const [a, m, d] = f.split('-').map(Number);
      return new Date(a, m - 1, d);
    }
  } catch {
    /* sin ventana (pruebas): fecha real */
  }
  return ahoraEnBogota().hoy;
}

export function avisoTemporada(hoy: Date): AvisoTemporada | null {
  const dia: Dia = [hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate()];
  const n = num(dia);
  if (n < num(INICIO) || n > num(FIN)) return null;
  const [a, m, d] = dia;
  const insta = { texto: 'Síguela en Instagram', destino: 'instagram' as const };

  if (esDiaDeVelitas(hoy)) {
    return {
      clave: `velitas-${a}`,
      etiqueta: 'Noche de velitas',
      texto: 'Prende tus velas lejos de cortinas y de los niños, y celebra sin pólvora.',
      icono: 'vela',
    };
  }
  if (m === 12 && d >= 16 && d <= 24) {
    const i = d - 16;
    return {
      clave: `novena-${a}-${d}`,
      etiqueta: `Novena de la salud · Día ${i + 1}`,
      texto: NOVENA[i],
      accion: insta,
    };
  }
  if (m === 12 && d === 25) {
    return {
      clave: `navidad-${a}`,
      etiqueta: '¡Feliz Navidad!',
      texto: 'Que estas fiestas tengas tiempo para lo que más importa: tu familia y tu salud.',
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
