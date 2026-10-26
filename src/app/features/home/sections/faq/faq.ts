import { Reveal } from '../../../../shared/directives/reveal';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../../../core/config/site.config';

@Component({
  selector: 'app-faq',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="preguntas" class="band">
      <div class="wrap faq">
        <div class="section-head" appReveal>
          <p class="eyebrow">Preguntas frecuentes</p>
          <h2>Antes de reservar</h2>
        </div>
        <div class="lista" [appReveal]="120">
          @for (f of faq; track f.q) {
            <details>
              <summary>{{ f.q }}</summary>
              <p>{{ f.a }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .faq {
      display: grid;
      grid-template-columns: 0.8fr 1.2fr;
      gap: 48px;
      align-items: start;
    }
    .section-head {
      margin-bottom: 0;
    }
    .lista {
      border-top: 1px solid var(--line);
      min-width: 0;
    }
    details {
      border-bottom: 1px solid var(--line);
    }
    summary {
      list-style: none;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 20px 0;
      min-height: 44px;
      font-family: var(--display);
      font-size: 24px;
      color: var(--slate-ink);
    }
    summary::-webkit-details-marker {
      display: none;
    }
    summary::after {
      content: '+';
      font-family: var(--body);
      font-size: 24px;
      color: var(--clay);
      flex: none;
      transition: transform 0.2s;
    }
    details[open] summary::after {
      transform: rotate(45deg);
    }
    details p {
      color: var(--muted);
      padding: 0 0 22px;
      max-width: 60ch;
    }
    @media (max-width: 820px) {
      .faq {
        grid-template-columns: 1fr;
        gap: 28px;
      }
    }
  `,
})
export class Faq {
  protected readonly faq = SITE.faq;
}
