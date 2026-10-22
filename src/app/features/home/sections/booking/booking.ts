import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SITE, whatsappDisplay, whatsappHref } from '../../../../core/config/site.config';
import { Franja } from '../../../../core/models/cita.model';
import { mensajeDeError } from '../../../../core/services/api-error';
import { CitaService } from '../../../../core/services/cita.service';
import { ServicioService } from '../../../../core/services/servicio.service';
import { Icon } from '../../../../shared/components/icon/icon';
import { fechaCitaValidator, isoLocal, sumarDias } from './fechas';

type EstadoEnvio = 'editando' | 'enviando' | 'enviado' | 'error';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {
  private readonly fb = inject(FormBuilder);
  private readonly citaService = inject(CitaService);

  protected readonly servicios = toSignal(inject(ServicioService).listarActivos(), {
    initialValue: SITE.fallbackServices,
  });
  protected readonly whatsappHref = whatsappHref();
  protected readonly whatsappDisplay = whatsappDisplay();
  protected readonly hayWhatsapp = !!SITE.contact.whatsapp;
  protected readonly hoy = isoLocal(new Date());
  protected readonly maxFecha = isoLocal(sumarDias(new Date(), 90));

  protected readonly estado = signal<EstadoEnvio>('editando');
  protected readonly mensaje = signal('');

  protected readonly pasos = [
    { title: 'Envía tu solicitud', text: 'Con el formulario o por WhatsApp, con el día y la franja que prefieres.' },
    { title: 'Confirmamos tu hora', text: 'Te contactamos con los horarios disponibles y separamos tu cita.' },
    { title: 'Llega al piso 5', text: 'Edificio Habital Medical Center. Llega 10 minutos antes.' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    nombrePaciente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    documento: ['', [Validators.required, Validators.pattern(/^[0-9A-Za-z]{5,20}$/)]],
    telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9 ]{7,20}$/)]],
    correo: ['', [Validators.email, Validators.maxLength(255)]],
    servicioId: [''],
    fechaPreferida: ['', [Validators.required, fechaCitaValidator]],
    franja: ['MANANA' as Franja, Validators.required],
    motivo: ['', Validators.maxLength(500)],
    aceptaTratamientoDatos: [false, Validators.requiredTrue],
  });

  protected invalido(campo: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.estado.set('enviando');
    this.citaService
      .solicitar({
        nombrePaciente: v.nombrePaciente,
        documento: v.documento,
        telefono: v.telefono,
        correo: v.correo || null,
        servicioId: v.servicioId ? Number(v.servicioId) : null,
        fechaPreferida: v.fechaPreferida,
        franja: v.franja,
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
    this.estado.set('editando');
  }
}
