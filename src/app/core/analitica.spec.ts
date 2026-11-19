import { seccionDe, tipoDeEnlace } from './analitica';

describe('analítica', () => {
  it('reconoce los enlaces que se cuentan', () => {
    expect(tipoDeEnlace('https://wa.me/573126885199?text=hola')).toBe('whatsapp');
    expect(tipoDeEnlace('https://wa.me/?text=mira')).toBeNull();
    expect(tipoDeEnlace('https://www.instagram.com/dr.jeisonpatino/')).toBe('instagram');
    expect(tipoDeEnlace('https://www.google.com/maps/search/?api=1&query=x')).toBe('mapa');
    expect(tipoDeEnlace('#reserva')).toBeNull();
    expect(tipoDeEnlace('https://www.paho.org/es')).toBeNull();
  });

  it('nombra la sección desde donde se hizo el clic', () => {
    document.body.innerHTML =
      '<section id="reserva"><a id="x" href="#">a</a></section><footer><a id="y">b</a></footer>';
    expect(seccionDe(document.getElementById('x')!)).toBe('reserva');
    expect(seccionDe(document.getElementById('y')!)).toBe('footer');
  });
});
