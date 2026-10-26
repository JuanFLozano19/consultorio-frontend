import { Reveal } from '../../../../shared/directives/reveal';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SITE } from '../../../../core/config/site.config';
import { ServicioService } from '../../../../core/services/servicio.service';
import { Icon } from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-services',
  imports: [Reveal, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private readonly servicioService = inject(ServicioService);
  protected readonly servicios = toSignal(this.servicioService.listarActivos(), {
    initialValue: SITE.servicios,
  });
}
