import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { iniciarAnalitica } from './core/analitica';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: '<router-outlet />',
})
export class App {
  constructor() {
    afterNextRender(() => iniciarAnalitica());
  }
}
