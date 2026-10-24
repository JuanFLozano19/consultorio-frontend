import { Franja } from '../../../../core/models/cita.model';

export interface DatosMensajeCita {
  nombre: string;
  servicio: string | null;
  fecha: string; // yyyy-MM-dd
  franja: Franja;
  motivo: string;
}

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/** "2026-10-23" → "viernes 23 de octubre" */
export function fechaLegible(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const f = new Date(y, m - 1, d);
  return `${DIAS[f.getDay()]} ${d} de ${MESES[m - 1]}`;
}

/** Texto que le llega al consultorio por WhatsApp. */
export function mensajeCita(d: DatosMensajeCita): string {
  const lineas = [
    `Hola Dr. Patiño, soy ${d.nombre.trim()} y quiero reservar una consulta.`,
    `• Servicio: ${d.servicio ?? 'No estoy seguro'}`,
    `• Fecha preferida: ${fechaLegible(d.fecha)}, en la ${d.franja === 'MANANA' ? 'mañana' : 'tarde'}`,
  ];
  if (d.motivo.trim()) lineas.push(`• Motivo: ${d.motivo.trim()}`);
  return lineas.join('\n');
}

export function enlaceWhatsapp(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
