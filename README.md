# App Mantenimiento Motocicleta

Aplicación web para la gestión de talleres de mantenimiento de motocicletas. Permite administrar clientes, motocicletas y visualizar estadísticas del taller desde un dashboard interactivo.

## Características

- **Dashboard** — estadísticas del taller, gráficos de ingresos mensuales y listado de órdenes recientes.
- **Clientes** — CRUD completo con búsqueda, filtrado por estado y paginación.
- **Motocicletas** — CRUD completo con búsqueda, filtrado por estado y paginación.
- **Persistencia local** — los datos se guardan en `localStorage`, sin necesidad de backend.

## Stack

| Herramienta | Versión |
|---|---|
| Node.js | 24.11.0 (lts/krypton) |
| React | 19 |
| React Router DOM | 7 |
| TanStack Table | 8 |
| Recharts | 3 |
| Lucide React | 1 |
| Vite | 8 |

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables (modales, UI compartida)
│   ├── clientes/
│   ├── dashboard/
│   ├── motocicletas/
│   └── ui/
├── data/               # Datos estáticos y configuración de gráficos
├── layouts/            # Layout base de la aplicación
├── pages/              # Páginas principales y sus helpers
├── services/           # Lógica de acceso a datos (localStorage)
└── utils/              # Utilidades generales
```
