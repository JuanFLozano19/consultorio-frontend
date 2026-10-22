import { FormControl } from '@angular/forms';
import { fechaCitaValidator, isoLocal, sumarDias } from './fechas';

function validar(fecha: Date) {
  return fechaCitaValidator(new FormControl(isoLocal(fecha), { nonNullable: true }));
}

function proximo(diaSemana: number): Date {
  const d = sumarDias(new Date(), 1);
  while (d.getDay() !== diaSemana) d.setDate(d.getDate() + 1);
  return d;
}

describe('fechaCitaValidator', () => {
  it('acepta un día hábil próximo', () => {
    expect(validar(proximo(3))).toBeNull();
  });

  it('rechaza domingos', () => {
    expect(validar(proximo(0))).toEqual({ domingo: true });
  });

  it('rechaza fechas pasadas', () => {
    expect(validar(sumarDias(new Date(), -1))).toEqual({ pasada: true });
  });

  it('rechaza más de 90 días', () => {
    expect(validar(sumarDias(new Date(), 120))).toEqual({ muyLejana: true });
  });
});
