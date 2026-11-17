import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { whatsappHref } from '../../../../core/config/site.config';

/** Manifiesto de marca: el fonendoscopio escultórico de la campaña, que se dibuja al aparecer. */
@Component({
  selector: 'app-manifiesto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.visto]': 'visto()' },
  template: `
    <section class="man" aria-labelledby="man-titulo">
      <div class="wrap man__grid">
        <div class="man__arte">
          <svg
            viewBox="0 60 1080 1200"
            class="esc"
            role="img"
            aria-label="Fonendoscopio que atraviesa la palabra escuchar"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="man-sh" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="16" />
              </filter>
              <filter id="man-hl" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" />
              </filter>
              <radialGradient id="man-metal" cx="34%" cy="30%" r="78%">
                <stop offset="0" stop-color="#ffffff" />
                <stop offset=".3" stop-color="#e1e5e8" />
                <stop offset=".72" stop-color="#7c868c" />
                <stop offset="1" stop-color="#363e43" />
              </radialGradient>
              <radialGradient id="man-diaf" cx="38%" cy="32%" r="80%">
                <stop offset="0" stop-color="#ffffff" />
                <stop offset=".6" stop-color="#d4d9dc" />
                <stop offset="1" stop-color="#9aa3a8" />
              </radialGradient>
              <linearGradient id="man-vara" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#5e676c" />
                <stop offset=".35" stop-color="#f3f5f6" />
                <stop offset=".6" stop-color="#b8c0c4" />
                <stop offset="1" stop-color="#4e575c" />
              </linearGradient>
              <radialGradient id="man-oliva" cx="35%" cy="30%" r="75%">
                <stop offset="0" stop-color="#6b7b80" />
                <stop offset=".5" stop-color="#1d2629" />
                <stop offset="1" stop-color="#0b1113" />
              </radialGradient>
            </defs>
            <clipPath id="man-c">
              <rect x="760" y="200" width="300" height="320" />
              <rect x="40" y="540" width="300" height="320" />
            </clipPath>
            <text
              x="46"
              y="500"
              font-family="Jost, sans-serif"
              font-size="400"
              font-weight="900"
              fill="currentColor"
              textLength="988"
              lengthAdjust="spacingAndGlyphs"
            >
              ESCU
            </text>
            <text
              x="46"
              y="838"
              font-family="Jost, sans-serif"
              font-size="400"
              font-weight="900"
              fill="currentColor"
              textLength="988"
              lengthAdjust="spacingAndGlyphs"
            >
              CHAR
            </text>
            <g class="obj">
              <path
                d="M760,96 C 770,170 820,210 850,232"
                fill="none"
                stroke="rgba(40,18,6,.3)"
                stroke-width="16.0"
                stroke-linecap="round"
                filter="url(#man-sh)"
                transform="translate(12,18)"
              />
              <path
                d="M760,96 C 770,170 820,210 850,232"
                fill="none"
                stroke="#545d62"
                stroke-width="16.0"
                stroke-linecap="round"
              />
              <path
                d="M760,96 C 770,170 820,210 850,232"
                fill="none"
                stroke="#c9d0d4"
                stroke-width="9.9"
                stroke-linecap="round"
                transform="translate(-1.5,-1.5)"
              />
              <path
                d="M760,96 C 770,170 820,210 850,232"
                fill="none"
                stroke="#fff"
                stroke-width="3.2"
                stroke-linecap="round"
                transform="translate(-3,-3)"
                filter="url(#man-hl)"
              />
              <path
                d="M922,84 C 910,170 878,212 850,232"
                fill="none"
                stroke="rgba(40,18,6,.3)"
                stroke-width="16.0"
                stroke-linecap="round"
                filter="url(#man-sh)"
                transform="translate(12,18)"
              />
              <path
                d="M922,84 C 910,170 878,212 850,232"
                fill="none"
                stroke="#545d62"
                stroke-width="16.0"
                stroke-linecap="round"
              />
              <path
                d="M922,84 C 910,170 878,212 850,232"
                fill="none"
                stroke="#c9d0d4"
                stroke-width="9.9"
                stroke-linecap="round"
                transform="translate(-1.5,-1.5)"
              />
              <path
                d="M922,84 C 910,170 878,212 850,232"
                fill="none"
                stroke="#fff"
                stroke-width="3.2"
                stroke-linecap="round"
                transform="translate(-3,-3)"
                filter="url(#man-hl)"
              />
              <circle cx="766" cy="102" r="19.0" fill="rgba(40,18,6,.35)" filter="url(#man-sh)" />
              <circle cx="760" cy="92" r="19.0" fill="url(#man-oliva)" />
              <ellipse cx="754.3" cy="85.3" rx="5.7" ry="3.0" fill="rgba(255,255,255,.55)" />
              <circle cx="928" cy="90" r="19.0" fill="rgba(40,18,6,.35)" filter="url(#man-sh)" />
              <circle cx="922" cy="80" r="19.0" fill="url(#man-oliva)" />
              <ellipse cx="916.3" cy="73.3" rx="5.7" ry="3.0" fill="rgba(255,255,255,.55)" />
              <path
                class="dib"
                pathLength="1"
                d="M850,232 C 850,430 470,350 330,560 C 220,740 520,930 690,790 C 840,660 1010,800 960,912 C 935,968 880,955 880,1004"
                fill="none"
                stroke="rgba(40,18,6,.38)"
                stroke-width="50"
                stroke-linecap="round"
                filter="url(#man-sh)"
                transform="translate(18,28)"
              />
              <path
                class="dib"
                pathLength="1"
                d="M850,232 C 850,430 470,350 330,560 C 220,740 520,930 690,790 C 840,660 1010,800 960,912 C 935,968 880,955 880,1004"
                fill="none"
                stroke="#0B2328"
                stroke-width="50"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                class="dib"
                pathLength="1"
                d="M850,232 C 850,430 470,350 330,560 C 220,740 520,930 690,790 C 840,660 1010,800 960,912 C 935,968 880,955 880,1004"
                fill="none"
                stroke="#1D4E57"
                stroke-width="37.0"
                stroke-linecap="round"
                stroke-linejoin="round"
                transform="translate(-3.5,-4.0)"
              />
              <path
                class="dib"
                pathLength="1"
                d="M850,232 C 850,430 470,350 330,560 C 220,740 520,930 690,790 C 840,660 1010,800 960,912 C 935,968 880,955 880,1004"
                fill="none"
                stroke="rgba(255,255,255,0.62)"
                stroke-width="7.5"
                stroke-linecap="round"
                transform="translate(-10.0,-11.5)"
                filter="url(#man-hl)"
              />
              <circle cx="850" cy="232" r="21.0" fill="url(#man-metal)" />
              <ellipse
                cx="903"
                cy="1168"
                rx="106"
                ry="104"
                fill="rgba(40,18,6,.4)"
                filter="url(#man-sh)"
              />
              <g transform="translate(880,1132) rotate(0)">
                <rect
                  x="-13.5"
                  y="-137.3"
                  width="27.0"
                  height="57.2"
                  rx="8.3"
                  fill="url(#man-vara)"
                />
                <circle r="104" fill="url(#man-metal)" />
                <circle r="83.2" fill="#5a6469" />
                <circle r="79.0" fill="url(#man-diaf)" />
                <circle r="52.0" fill="none" stroke="rgba(120,130,135,.35)" stroke-width="2.1" />
                <ellipse
                  cx="-33.3"
                  cy="-39.5"
                  rx="29.1"
                  ry="12.5"
                  fill="rgba(255,255,255,.85)"
                  transform="rotate(-35)"
                  filter="url(#man-hl)"
                />
              </g>
            </g>
            <text
              x="46"
              y="500"
              font-family="Jost, sans-serif"
              font-size="400"
              font-weight="900"
              fill="currentColor"
              textLength="988"
              lengthAdjust="spacingAndGlyphs"
              clip-path="url(#man-c)"
            >
              ESCU
            </text>
            <text
              x="46"
              y="838"
              font-family="Jost, sans-serif"
              font-size="400"
              font-weight="900"
              fill="currentColor"
              textLength="988"
              lengthAdjust="spacingAndGlyphs"
              clip-path="url(#man-c)"
            >
              CHAR
            </text>
          </svg>
        </div>
        <div class="man__txt">
          <p class="man__eyebrow">La medicina también puede ser arte</p>
          <h2 id="man-titulo">Con tiempo<br /><em>para escucharte.</em></h2>
          <p class="man__p">
            Una consulta no debería sentirse como una fila. Aquí escuchamos primero, explicamos con
            claridad y decidimos contigo.
          </p>
          <div class="man__acc">
            <a class="btn man__btn" href="#reserva">Reservar consulta</a>
            <a class="man__wa" [href]="wa" target="_blank" rel="noopener"
              >o escríbenos por WhatsApp →</a
            >
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './manifiesto.scss',
})
export class Manifiesto {
  protected readonly wa = whatsappHref();
  protected readonly visto = signal(false);

  constructor() {
    const host = inject(ElementRef<HTMLElement>);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return this.visto.set(true);
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            this.visto.set(true);
            obs.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      obs.observe(host.nativeElement);
    });
  }
}
