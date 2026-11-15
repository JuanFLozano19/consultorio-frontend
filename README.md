# Consultorio Dr. Jeison Patiño · Frontend

Sitio web del consultorio. Hecho con **Angular 22** (componentes standalone, signals, zoneless).

## Dos modos de funcionamiento

El interruptor está en `src/app/core/config/site.config.ts` → `features.citasEnLinea`.

| `citasEnLinea`       | Cómo funciona                                                                                       | Necesita backend / BD |
| -------------------- | --------------------------------------------------------------------------------------------------- | --------------------- |
| `false` **(actual)** | Web estática. El formulario arma el mensaje y abre WhatsApp. Servicios desde `site.config.ts`. Sin `/admin`. | No                    |
| `true`               | El formulario guarda la cita en `consultorio-backend`, los servicios vienen de la API y se activa `/admin`. | Sí                    |

Para activar el modo en línea: publicar el backend (ver su README), poner su URL en
`src/environments/environment.ts` y cambiar `citasEnLinea` a `true`.

## Requisitos

- Node.js 24 (o 22.22.3+): `nvm use` lee el archivo `.nvmrc`
- Solo en modo en línea: la API corriendo en `http://localhost:8080`

## Desarrollo

```bash
npm install
npm start            # http://localhost:4200
npm run build        # producción en dist/consultorio-frontend/browser
npm run test:ci      # pruebas unitarias (Vitest)
```

## Estructura

```
src/
├── environments/                 ← URL de la API (local y producción)
└── app/
    ├── core/
    │   ├── config/site.config.ts ← DATOS DEL CONSULTORIO: WhatsApp, horario, dirección, textos
    │   ├── models/               ← tipos que coinciden con los DTO del backend
    │   ├── services/             ← llamadas HTTP (servicios, citas, auth)
    │   ├── interceptors/         ← agrega el JWT y cierra sesión con 401
    │   └── guards/               ← protege /admin
    ├── shared/components/        ← logo e íconos
    └── features/
        ├── home/                 ← página pública, una carpeta por sección
        │   └── sections/{header,hero,services,activity,about,booking,location,footer,whatsapp-float}
        └── admin/                ← login y gestión de solicitudes de cita
```

## Rutas

| Ruta           | Qué es                                            |
| -------------- | ------------------------------------------------- |
| `/`            | Web pública con formulario de cita                |
| `/admin/login` | Ingreso del doctor o la secretaria (solo en línea) |
| `/admin`       | Solicitudes: confirmar, cancelar, marcar atendida (solo en línea) |

## Cambios frecuentes

| Quiero cambiar…                   | Dónde                                           |
| --------------------------------- | ----------------------------------------------- |
| WhatsApp, Instagram, dirección    | `core/config/site.config.ts` → `contact`        |
| Horario (tabla, "Abierto ahora" y días para reservar) | `core/config/site.config.ts` → `contact.horario` (festivos de Colombia automáticos) |
| Preguntas frecuentes              | `core/config/site.config.ts` → `faq`            |
| URL publicada (vista previa y Google) | `site.config.ts` → `siteUrl` y `src/index.html` |
| Nombre, estudios, biografía, foto | `core/config/site.config.ts` → `doctor`         |
| Servicios                         | `core/config/site.config.ts` → `servicios` (en línea: tabla `servicios`) |
| Colores y tipografía              | `src/styles.scss`                               |
| URL de la API en producción       | `src/environments/environment.ts`               |

## Pendientes de contenido


## Despliegue (Vercel)

1. Importar el repositorio en [vercel.com](https://vercel.com). `vercel.json` ya trae el comando de build,
   la carpeta de salida y la regla para que `/admin` funcione al recargar.
2. Cada push a `main` publica; cada Pull Request genera una vista previa.
3. Solo en modo en línea: agregar el dominio del frontend en `CORS_ALLOWED_ORIGINS` del backend.

## Ramas y flujo de trabajo

| Rama            | Para qué                                                     |
| --------------- | ------------------------------------------------------------ |
| `main`          | Producción: lo que ve el público. Solo recibe desde `preproduccion`. |
| `preproduccion` | Pruebas finales y aprobación del doctor antes de publicar.   |
| `desarrollo`    | Integración del trabajo diario.                              |

1. Crear una rama desde `desarrollo`: `git switch desarrollo && git pull && git switch -c feature/mi-cambio`
2. Pull Request de `feature/...` → `desarrollo`.
3. Cuando un grupo de cambios está listo: Pull Request `desarrollo` → `preproduccion` y se revisa.
4. Aprobado: Pull Request `preproduccion` → `main` (publica).

GitHub Actions (`.github/workflows/ci.yml`) compila y corre las pruebas en cada push y Pull Request de las tres ramas.

## Galería y publicaciones (carruseles)

Las fotos de la sección **Galería** y las piezas de **Novedades** se configuran en
`src/app/core/config/galeria.ts`. Para agregar una imagen:

1. Guárdela en `public/images/galeria/` o `public/images/publicidad/` (WebP de ~900 px de ancho es lo ideal).
2. Agregue una línea en `GALERIA` o `PUBLICACIONES` con la ruta, la descripción y el título.

El carrusel (`src/app/shared/components/carrusel`) se desliza con el dedo, las flechas o el
teclado, avanza solo (con botón de pausa) y abre cada imagen en grande; en Novedades además
permite compartir por WhatsApp y descargar.

## Otras funciones de la página

- **Herramientas de salud** (`sections/herramientas`, cálculos en `core/salud/calculos.ts` con pruebas):
  IMC con categorías de la OMS, zonas de frecuencia cardíaca (Tanaka / Karvonen) y minutos de
  actividad física semanal frente a la recomendación de la OMS. Cada resultado tiene un botón
  para comentarlo con el doctor por WhatsApp.
- **Tu primera consulta** (`sections/pasos`): los cuatro pasos para agendar.
- **Modo claro / oscuro**: botón en el encabezado; se recuerda en el navegador.
- **Barra de progreso de lectura** y botón **volver arriba** (`shared/components/progreso`).
- **Carrusel con efecto de profundidad**: la tarjeta del centro se destaca y las demás giran y se
  atenúan al deslizar; el punto activo muestra el tiempo del avance automático.
