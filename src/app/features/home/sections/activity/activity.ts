import { Reveal } from '../../../../shared/directives/reveal';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';

@Component({
  selector: 'app-activity',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity.html',
  styleUrl: './activity.scss',
})
export class Activity {
  protected readonly activity = SITE.activity;
}
