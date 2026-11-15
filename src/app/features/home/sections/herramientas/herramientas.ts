import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';
import { calcularImc, calcularZonasFc, evaluarActividad } from '../../../../core/salud/calculos';
import { Reveal } from '../../../../shared/directives/reveal';

type Pestana = 'imc' | 'fc' | 'act';

@Component({
  selector: 'app-herramientas',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './herramientas.html',
  styleUrl: './herramientas.scss',
})
export class Herramientas {
  protected readonly pestanas: { id: Pestana; titulo: string; corto: string; sub: string }[] = [
    { id: 'imc', titulo: 'Índice de masa corporal', corto: 'IMC', sub: 'IMC' },
    { id: 'fc', titulo: 'Zonas de frecuencia cardíaca', corto: 'Pulso', sub: 'Para entrenar' },
    { id: 'act', titulo: 'Tu actividad semanal', corto: 'Actividad', sub: 'Meta de la OMS' },
  ];
  protected readonly pestana = signal<Pestana>('imc');

  // IMC
  protected readonly peso = signal<number | null>(null);
  protected readonly estatura = signal<number | null>(null);
  protected readonly imc = computed(() => {
    const p = this.peso();
    const e = this.estatura();
    return p && e ? calcularImc(p, e) : null;
  });
  /** Posición del marcador en la barra (IMC de 15 a 40). */
  protected readonly posImc = computed(() => {
    const r = this.imc();
    return r ? Math.max(0, Math.min(100, ((r.valor - 15) / 25) * 100)) : 0;
  });

  // Frecuencia cardíaca
  protected readonly edad = signal<number | null>(null);
  protected readonly reposo = signal<number | null>(null);
  protected readonly fc = computed(() => {
    const e = this.edad();
    return e ? calcularZonasFc(e, this.reposo()) : null;
  });

  // Actividad
  protected readonly moderada = signal<number | null>(null);
  protected readonly vigorosa = signal<number | null>(null);
  protected readonly fuerza = signal(0);
  protected readonly act = computed(() => {
    const m = this.moderada();
    const v = this.vigorosa();
    return m === null && v === null ? null : evaluarActividad(m ?? 0, v ?? 0, this.fuerza());
  });
  /** Longitud del anillo de progreso (meta de 300 min = vuelta completa). */
  protected readonly anillo = computed(() => {
    const r = this.act();
    return r ? Math.min(1, r.equivalentes / 300) : 0;
  });

  /** Número con coma decimal, como se escribe en Colombia. */
  protected dec(n: number): string {
    return n.toLocaleString('es-CO', { maximumFractionDigits: 1 });
  }

  protected numero(v: string): number | null {
    const n = parseFloat(v.replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  }

  protected elegir(p: Pestana, enfocar = false, ev?: KeyboardEvent): void {
    this.pestana.set(p);
    if (enfocar) (document.getElementById('tab-' + p) as HTMLElement | null)?.focus();
    ev?.preventDefault();
  }

  protected tecladoTabs(e: KeyboardEvent): void {
    const ids = this.pestanas.map((p) => p.id);
    const i = ids.indexOf(this.pestana());
    if (e.key === 'ArrowRight') this.elegir(ids[(i + 1) % ids.length], true, e);
    else if (e.key === 'ArrowLeft') this.elegir(ids[(i - 1 + ids.length) % ids.length], true, e);
  }

  /** Enlace a WhatsApp con el resultado, para comentarlo con el doctor. */
  protected whatsapp(texto: string): string {
    const n = SITE.contact.whatsapp;
    return `https://wa.me/${n}?text=${encodeURIComponent('Hola Dr. Patiño, ' + texto + ' Me gustaría agendar una consulta.')}`;
  }

  protected textoImc(): string {
    const r = this.imc();
    return r
      ? `calculé mi IMC en la página: ${this.dec(r.valor)} (${r.etiqueta.toLowerCase()}).`
      : '';
  }

  protected textoFc(): string {
    const r = this.fc();
    return r ? `calculé mis zonas de frecuencia cardíaca (máxima estimada ${r.fcMax} lpm).` : '';
  }

  protected textoAct(): string {
    const r = this.act();
    return r
      ? `hago unos ${r.equivalentes} minutos de actividad física a la semana y quiero un plan de ejercicio.`
      : '';
  }
}
