import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';

@Component({
  selector: 'app-activity',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity.html',
  styleUrl: './activity.scss',
})
export class Activity {
  protected readonly activity = SITE.activity;
}
