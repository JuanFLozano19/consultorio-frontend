export interface DatosMensajeCita {
  nombre: string;
  servicio: string | null;
  /** 'martes 3 de noviembre' */
  dia: string;
  /** '3:00 – 7:00 p. m.' */
  rango: string;
  motivo: string;
}

/** Texto que le llega al consultorio por WhatsApp. */
export function mensajeCita(d: DatosMensajeCita): string {
  const lineas = [
    `Hola Dr. Patiño, soy ${d.nombre.trim()} y quiero reservar una consulta.`,
    `• Servicio: ${d.servicio ?? 'No estoy seguro'}`,
    `• Día: ${d.dia} (${d.rango})`,
  ];
  if (d.motivo.trim()) lineas.push(`• Motivo: ${d.motivo.trim()}`);
  lineas.push('¿Qué hora tienen disponible?');
  return lineas.join('\n');
}

export function enlaceWhatsapp(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
