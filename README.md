# Consultorio Dr. Jeison Patiño · Frontend

Sitio web público y panel administrativo del consultorio. Hecho con **Angular 22** (componentes standalone, signals, zoneless).
Consume la API del repositorio `consultorio-backend`.

## Requisitos

- Node.js 24 (o 22.22.3+): `nvm use` lee el archivo `.nvmrc`
- La API corriendo en `http://localhost:8080` para el formulario y el panel
  (sin API la web igual carga, con la lista de servicios local)

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
| `/admin/login` | Ingreso del doctor o la secretaria                |
| `/admin`       | Solicitudes: confirmar, cancelar, marcar atendida |

## Cambios frecuentes

| Quiero cambiar…                   | Dónde                                           |
| --------------------------------- | ----------------------------------------------- |
| WhatsApp, horario, dirección      | `core/config/site.config.ts` → `contact`        |
| Nombre, estudios, biografía, foto | `core/config/site.config.ts` → `doctor`         |
| Servicios                         | Base de datos (tabla `servicios`) vía la API    |
| Colores y tipografía              | `src/styles.scss`                               |
| URL de la API en producción       | `src/environments/environment.ts`               |

## Pendientes de contenido

- [ ] Nombre completo del doctor
- [ ] WhatsApp laboral y horario
- [ ] Foto con bata (`public/images/`)
- [ ] URL real de la API en `environment.ts`

## Despliegue (Vercel)

1. Importar el repositorio en [vercel.com](https://vercel.com). `vercel.json` ya trae el comando de build,
   la carpeta de salida y la regla para que `/admin` funcione al recargar.
2. Cada push a `main` publica; cada Pull Request genera una vista previa.
3. Agregar el dominio del frontend en `CORS_ALLOWED_ORIGINS` del backend.

## Flujo de trabajo

- `main` = producción, `develop` = integración. Ramas `feature/...` con Pull Request.
- GitHub Actions (`.github/workflows/ci.yml`) compila y corre las pruebas en cada push y PR.
