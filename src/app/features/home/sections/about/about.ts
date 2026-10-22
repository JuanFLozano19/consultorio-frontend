import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly doctor = SITE.doctor;
}
