/**
 * Lógica del horario del consultorio (hora de Colombia, festivos incluidos).
 * Funciones puras: reciben la fecha actual para poder probarlas.
 */
import { SITE } from './site.config';

export interface Franja {
  desde: string; // 'HH:mm'
  hasta: string; // 'HH:mm'
}

export interface DiaAtencion {
  /** yyyy-MM-dd */
  iso: string;
  /** 'Hoy', 'Mañana' o 'Lun 26 oct' */
  etiqueta: string;
  /** 'lunes 26 de octubre' */
  largo: string;
  rango: string;
  /** '3 – 7 p. m.' para espacios pequeños */
  rangoCorto: string;
  franja: Franja;
}

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

// ---------- fechas "calendario" (sin zona horaria) ----------

/** Fecha de calendario como Date a medianoche local; solo se usan año, mes, día y día de la semana. */
function fecha(y: number, m: number, d: number): Date {
  return new Date(y, m - 1, d);
}

function sumar(f: Date, dias: number): Date {
  const r = new Date(f);
  r.setDate(r.getDate() + dias);
  return r;
}

export function iso(f: Date): string {
  return `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
}

/** Lunes siguiente (o el mismo día si ya es lunes): Ley Emiliani. */
function aLunes(f: Date): Date {
  const dia = f.getDay();
  return dia === 1 ? f : sumar(f, (8 - dia) % 7);
}

/** Domingo de Pascua (algoritmo gregoriano anónimo). */
function pascua(y: number): Date {
  const a = y % 19;
  const b = Math.floor(y / 100);
  const c = y % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return fecha(y, mes, dia);
}

const cacheFestivos = new Map<number, Set<string>>();

/** Festivos de Colombia del año (Ley 51 de 1983). */
export function festivosColombia(y: number): Set<string> {
  const cache = cacheFestivos.get(y);
  if (cache) return cache;
  const p = pascua(y);
  const lista = [
    fecha(y, 1, 1),
    aLunes(fecha(y, 1, 6)),
    aLunes(fecha(y, 3, 19)),
    sumar(p, -3), // Jueves Santo
    sumar(p, -2), // Viernes Santo
    fecha(y, 5, 1),
    aLunes(sumar(p, 39)), // Ascensión
    aLunes(sumar(p, 60)), // Corpus Christi
    aLunes(sumar(p, 68)), // Sagrado Corazón
    aLunes(fecha(y, 6, 29)),
    fecha(y, 7, 20),
    fecha(y, 8, 7),
    aLunes(fecha(y, 8, 15)),
    aLunes(fecha(y, 10, 12)),
    aLunes(fecha(y, 11, 1)),
    aLunes(fecha(y, 11, 11)),
    fecha(y, 12, 8),
    fecha(y, 12, 25),
  ];
  const set = new Set(lista.map(iso));
  cacheFestivos.set(y, set);
  return set;
}

export function esFestivo(f: Date): boolean {
  return festivosColombia(f.getFullYear()).has(iso(f));
}

/** Franja de atención de ese día, o null si no hay atención. */
export function franjaDe(f: Date, horario = SITE.contact.horario): Franja | null {
  if (esFestivo(f)) return null;
  const regla = horario.find((h) => h.dias.includes(f.getDay()));
  return regla ? { desde: regla.desde, hasta: regla.hasta } : null;
}

// ---------- formato ----------

/** '15:00' → '3:00 p. m.'; '12:00' → '12:00 m.'; '09:30' → '9:30 a. m.' */
export function hora(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const mm = String(m).padStart(2, '0');
  if (h === 12 && m === 0) return '12:00 m.';
  const sufijo = h < 12 ? 'a. m.' : 'p. m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mm} ${sufijo}`;
}

/** '3:00 – 7:00 p. m.' o '9:00 a. m. – 12:00 m.' */
export function rango(f: Franja): string {
  const [ha, sa] = partir(hora(f.desde));
  const [hb, sb] = partir(hora(f.hasta));
  return sa === sb ? `${ha} – ${hb} ${sb}` : `${ha} ${sa} – ${hb} ${sb}`;
}

/** '3:00 p. m.' → ['3:00', 'p. m.'] */
function partir(texto: string): [string, string] {
  const i = texto.indexOf(' ');
  return [texto.slice(0, i), texto.slice(i + 1)];
}

export function fechaLarga(f: Date): string {
  return `${DIAS[f.getDay()]} ${f.getDate()} de ${MESES[f.getMonth()]}`;
}

/** Filas para la tabla de horario. */
export function tablaHorario(): { dias: string; texto: string }[] {
  return [
    ...SITE.contact.horario.map((h) => ({ dias: h.etiqueta, texto: rango(h) })),
    { dias: SITE.contact.sinAtencion.etiqueta, texto: SITE.contact.sinAtencion.texto },
  ];
}

// ---------- "ahora" en Bogotá ----------

export interface Ahora {
  hoy: Date;
  minutos: number;
}

/** Fecha y minuto del día en Colombia, sin importar la zona del visitante. */
export function ahoraEnBogota(instante = new Date()): Ahora {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instante);
  const v = (t: string) => Number(partes.find((p) => p.type === t)!.value);
  return { hoy: fecha(v('year'), v('month'), v('day')), minutos: v('hour') * 60 + v('minute') };
}

const minutosDe = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export interface EstadoConsultorio {
  abierto: boolean;
  texto: string;
}

/** 'Abierto ahora · hasta las 7:00 p. m.' o 'Cerrado · abre el lunes a las 3:00 p. m.' */
export function estadoConsultorio(ahora: Ahora): EstadoConsultorio {
  const hoyFranja = franjaDe(ahora.hoy);
  if (
    hoyFranja &&
    ahora.minutos >= minutosDe(hoyFranja.desde) &&
    ahora.minutos < minutosDe(hoyFranja.hasta)
  ) {
    return { abierto: true, texto: `Abierto ahora · hasta las ${hora(hoyFranja.hasta)}` };
  }
  if (hoyFranja && ahora.minutos < minutosDe(hoyFranja.desde)) {
    return { abierto: false, texto: `Cerrado · abre hoy a las ${hora(hoyFranja.desde)}` };
  }
  for (let i = 1; i <= 14; i++) {
    const dia = sumar(ahora.hoy, i);
    const f = franjaDe(dia);
    if (f) {
      const cuando = i === 1 ? 'mañana' : `el ${DIAS[dia.getDay()]}`;
      return { abierto: false, texto: `Cerrado · abre ${cuando} a las ${hora(f.desde)}` };
    }
  }
  return { abierto: false, texto: 'Cerrado' };
}

/**
 * Próximos días con atención para reservar. Incluye hoy solo si todavía
 * falta al menos una hora para el cierre.
 */
export function proximosDias(ahora: Ahora, cantidad = 8, maxDias = 30): DiaAtencion[] {
  const r: DiaAtencion[] = [];
  for (let i = 0; i <= maxDias && r.length < cantidad; i++) {
    const dia = sumar(ahora.hoy, i);
    const f = franjaDe(dia);
    if (!f) continue;
    if (i === 0 && ahora.minutos > minutosDe(f.hasta) - 60) continue;
    const etiqueta =
      i === 0
        ? 'Hoy'
        : i === 1
          ? 'Mañana'
          : `${DIAS_CORTOS[dia.getDay()]} ${dia.getDate()} ${MESES[dia.getMonth()].slice(0, 3)}`;
    r.push({
      iso: iso(dia),
      etiqueta,
      largo: fechaLarga(dia),
      rango: rango(f),
      rangoCorto: rango(f).replaceAll(':00', ''),
      franja: f,
    });
  }
  return r;
}
