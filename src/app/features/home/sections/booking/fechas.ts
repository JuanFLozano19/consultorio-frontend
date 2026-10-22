import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Fecha local en formato yyyy-MM-dd (el input type="date" usa este formato). */
export function isoLocal(fecha: Date): string {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function sumarDias(fecha: Date, dias: number): Date {
  const r = new Date(fecha);
  r.setDate(r.getDate() + dias);
  return r;
}

/** Mismas reglas que el backend: no en el pasado, máximo 90 días, sin domingos. */
export function fechaCitaValidator(control: AbstractControl<string>): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;
  const [y, m, d] = valor.split('-').map(Number);
  const fecha = new Date(y, m - 1, d);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fecha < hoy) return { pasada: true };
  if (fecha > sumarDias(hoy, 90)) return { muyLejana: true };
  if (fecha.getDay() === 0) return { domingo: true };
  return null;
}
