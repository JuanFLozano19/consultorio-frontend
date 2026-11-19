import { Component, afterNextRender, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { iniciarAnalitica } from './core/analitica';
import { iniciarEnlacesInternos, quitarHash } from './core/enlaces-internos';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: '<router-outlet />',
})
export class App {
  constructor() {
    afterNextRender(() => {
      iniciarAnalitica();
      iniciarEnlacesInternos();
    });
    // Enlaces con fragmento del router (p. ej. desde la página 404): limpiar el # después.
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (typeof window !== 'undefined' && location.hash) setTimeout(quitarHash, 1500);
      });
  }
}
