import { Reveal } from '../../../../shared/directives/reveal';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE, whatsappHref } from '../../../../core/config/site.config';

@Component({
  selector: 'app-faq',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="preguntas" class="band">
      <div class="wrap faq">
        <div class="izq">
          <div class="section-head" appReveal>
            <p class="eyebrow">Preguntas frecuentes</p>
            <h2>Antes de <em>reservar</em></h2>
          </div>
          <aside class="ayuda" [appReveal]="150">
            <img
              src="images/galeria/real-cielo-1.webp"
              alt=""
              width="900"
              height="1200"
              loading="lazy"
            />
            <div>
              <p class="ayuda__t">¿Tienes otra pregunta?</p>
              <p class="ayuda__p">Escríbele directamente al doctor; te responde por WhatsApp.</p>
              <a class="ayuda__btn" [href]="wa" target="_blank" rel="noopener"
                >Escribir por WhatsApp</a
              >
            </div>
          </aside>
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
    h2 em {
      font-style: italic;
      color: var(--clay);
    }
    .izq {
      display: flex;
      flex-direction: column;
      gap: 36px;
      position: sticky;
      top: 110px;
    }
    .ayuda {
      display: flex;
      gap: 18px;
      align-items: center;
      padding: 16px;
      border-radius: 24px;
      background: var(--sand);
      border: 1px solid var(--line);
      img {
        width: 92px;
        height: 112px;
        object-fit: cover;
        border-radius: 999px 999px 16px 16px;
        flex: none;
      }
    }
    .ayuda__t {
      font-family: var(--display);
      font-size: 24px;
      color: var(--slate-ink);
      line-height: 1.1;
    }
    .ayuda__p {
      color: var(--muted);
      font-size: 15px;
      margin-top: 4px;
    }
    .ayuda__btn {
      display: inline-flex;
      margin-top: 12px;
      padding: 10px 18px;
      border-radius: 999px;
      background: #1fa855;
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      &:hover {
        background: #188a45;
      }
    }
    summary:hover {
      color: var(--clay);
    }
    details[open] {
      background: linear-gradient(
        90deg,
        color-mix(in srgb, var(--sand) 70%, transparent),
        transparent
      );
    }
    details[open] p {
      animation: abrir 0.4s ease-out;
    }
    @keyframes abrir {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }
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
      .izq {
        position: static;
      }
    }
  `,
})
export class Faq {
  protected readonly faq = SITE.faq;
  protected readonly wa = whatsappHref();
}
