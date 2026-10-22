import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Cita, EstadoCita, Pagina, SIGUIENTES_ESTADOS } from '../../../core/models/cita.model';
import { mensajeDeError } from '../../../core/services/api-error';
import { AuthService } from '../../../core/services/auth.service';
import { CitaService } from '../../../core/services/cita.service';
import { Logo } from '../../../shared/components/logo/logo';

const ETIQUETA_ESTADO: Record<EstadoCita, string> = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  CANCELADA: 'Cancelada',
  ATENDIDA: 'Atendida',
};

const ACCION: Record<EstadoCita, string> = {
  PENDIENTE: '',
  CONFIRMADA: 'Confirmar',
  CANCELADA: 'Cancelar',
  ATENDIDA: 'Marcar atendida',
};

@Component({
  selector: 'app-citas-page',
  imports: [DatePipe, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './citas.page.html',
  styleUrl: './citas.page.scss',
})
export class CitasPage {
  private readonly citaService = inject(CitaService);
  protected readonly auth = inject(AuthService);

  protected readonly filtros: { valor: EstadoCita | null; etiqueta: string }[] = [
    { valor: 'PENDIENTE', etiqueta: 'Pendientes' },
    { valor: 'CONFIRMADA', etiqueta: 'Confirmadas' },
    { valor: 'ATENDIDA', etiqueta: 'Atendidas' },
    { valor: 'CANCELADA', etiqueta: 'Canceladas' },
    { valor: null, etiqueta: 'Todas' },
  ];

  protected readonly filtro = signal<EstadoCita | null>('PENDIENTE');
  protected readonly pagina = signal(0);
  protected readonly datos = signal<Pagina<Cita> | null>(null);
  protected readonly cargando = signal(false);
  protected readonly error = signal('');
  protected readonly actualizando = signal<number | null>(null);

  protected readonly citas = computed(() => this.datos()?.contenido ?? []);
  protected readonly etiqueta = ETIQUETA_ESTADO;
  protected readonly accion = ACCION;

  constructor() {
    this.cargar();
  }

  protected acciones(c: Cita): EstadoCita[] {
    return SIGUIENTES_ESTADOS[c.estado];
  }

  protected cambiarFiltro(valor: EstadoCita | null): void {
    this.filtro.set(valor);
    this.pagina.set(0);
    this.cargar();
  }

  protected irA(pagina: number): void {
    this.pagina.set(pagina);
    this.cargar();
  }

  protected cambiarEstado(c: Cita, estado: EstadoCita): void {
    this.actualizando.set(c.id);
    this.citaService.cambiarEstado(c.id, estado).subscribe({
      next: () => {
        this.actualizando.set(null);
        this.cargar();
      },
      error: (err) => {
        this.actualizando.set(null);
        this.error.set(mensajeDeError(err));
      },
    });
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.citaService.listar(this.filtro(), this.pagina()).subscribe({
      next: (p) => {
        this.datos.set(p);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(mensajeDeError(err));
        this.cargando.set(false);
      },
    });
  }
}
