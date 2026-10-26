import { Reveal } from '../../../../shared/directives/reveal';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DiaAtencion, ahoraEnBogota, proximosDias } from '../../../../core/config/horario';
import { SITE } from '../../../../core/config/site.config';
import { mensajeDeError } from '../../../../core/services/api-error';
import { CitaService } from '../../../../core/services/cita.service';
import { ServicioService } from '../../../../core/services/servicio.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { enlaceWhatsapp, mensajeCita } from './whatsapp-mensaje';

type EstadoEnvio = 'editando' | 'enviando' | 'enviado' | 'error';

/** Validadores que solo aplican cuando la cita se guarda en el backend. */
const soloEnLinea = (validators: ValidatorFn[]): ValidatorFn[] =>
  SITE.features.citasEnLinea ? validators : [];

@Component({
  selector: 'app-booking',
  imports: [Reveal, ReactiveFormsModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {
  private readonly fb = inject(FormBuilder);
  private readonly citaService = inject(CitaService);

  /** false = la solicitud se envía por WhatsApp; true = se guarda en la API. */
  protected readonly enLinea = SITE.features.citasEnLinea;
  protected readonly servicios = toSignal(inject(ServicioService).listarActivos(), {
    initialValue: SITE.servicios,
  });
  /** Días con atención (sin domingos ni festivos), según el horario de site.config. */
  protected readonly dias: DiaAtencion[] = proximosDias(ahoraEnBogota());

  protected readonly estado = signal<EstadoEnvio>('editando');
  protected readonly mensaje = signal('');
  /** Enlace ya armado, por si el navegador bloquea la ventana nueva. */
  protected readonly enlaceGenerado = signal('');

  protected readonly form = this.fb.nonNullable.group({
    servicioId: [''],
    fechaPreferida: ['', Validators.required],
    nombrePaciente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    motivo: ['', Validators.maxLength(500)],
    documento: ['', soloEnLinea([Validators.required, Validators.pattern(/^[0-9A-Za-z]{5,20}$/)])],
    telefono: ['', soloEnLinea([Validators.required, Validators.pattern(/^\+?[0-9 ]{7,20}$/)])],
    correo: ['', [Validators.email, Validators.maxLength(255)]],
    aceptaTratamientoDatos: [false, soloEnLinea([Validators.requiredTrue])],
  });

  private readonly fechaElegida = toSignal(this.form.controls.fechaPreferida.valueChanges, {
    initialValue: '',
  });
  protected readonly diaElegido = computed(
    () => this.dias.find((d) => d.iso === this.fechaElegida()) ?? null,
  );

  protected invalido(campo: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.enLinea) {
      this.enviarAlBackend();
    } else {
      this.abrirWhatsapp();
    }
  }

  private abrirWhatsapp(): void {
    const dia = this.diaElegido();
    if (!SITE.contact.whatsapp || !dia) {
      this.mensaje.set('No pudimos preparar el mensaje. Escríbenos directamente por WhatsApp.');
      this.estado.set('error');
      return;
    }
    const v = this.form.getRawValue();
    const servicio = this.servicios().find((s) => String(s.id) === v.servicioId)?.nombre ?? null;
    const url = enlaceWhatsapp(
      SITE.contact.whatsapp,
      mensajeCita({
        nombre: v.nombrePaciente,
        servicio,
        dia: dia.largo,
        rango: dia.rango,
        motivo: v.motivo,
      }),
    );
    this.enlaceGenerado.set(url);
    this.mensaje.set(
      'Abrimos WhatsApp con tu solicitud lista. Envíala y te responderemos con la hora disponible.',
    );
    this.estado.set('enviado');
    window.open(url, '_blank', 'noopener');
  }

  private enviarAlBackend(): void {
    const v = this.form.getRawValue();
    const dia = this.diaElegido();
    this.estado.set('enviando');
    this.citaService
      .solicitar({
        nombrePaciente: v.nombrePaciente,
        documento: v.documento,
        telefono: v.telefono,
        correo: v.correo || null,
        servicioId: v.servicioId ? Number(v.servicioId) : null,
        fechaPreferida: v.fechaPreferida,
        franja: dia && dia.franja.desde < '12:00' ? 'MANANA' : 'TARDE',
        motivo: v.motivo || null,
        aceptaTratamientoDatos: v.aceptaTratamientoDatos,
      })
      .subscribe({
        next: (r) => {
          this.mensaje.set(r.mensaje);
          this.estado.set('enviado');
          this.form.reset();
        },
        error: (err) => {
          this.mensaje.set(mensajeDeError(err));
          this.estado.set('error');
        },
      });
  }

  protected otraSolicitud(): void {
    this.enlaceGenerado.set('');
    this.form.reset();
    this.estado.set('editando');
  }
}
