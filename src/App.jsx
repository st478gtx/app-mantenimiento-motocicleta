import { Navigate, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import DashboardPage from './pages/DashboardPage'
import SectionPage from './pages/SectionPage'

// Fuente unica para construir rutas secundarias y mantener menu/rutas sincronizados.
const sectionRoutes = [
  {
    path: 'clientes',
    title: 'Gestión de clientes',
    description: 'Administra la información de tus clientes desde este módulo.'
  },
  {
    path: 'motocicletas',
    title: 'Gestión de motocicletas',
    description: 'Administra el padrón de motocicletas, marcas y estados operativos.'
  },
  {
    path: 'ordenes',
    title: 'Gestión de órdenes',
    description: 'Consulta, filtra y actualiza el estado de todas las órdenes.'
  },
  {
    path: 'inventario',
    title: 'Control de inventario',
    description: 'Visualiza existencias y movimientos de repuestos y suministros.'
  },
  {
    path: 'historial',
    title: 'Historial',
    description: 'Consulta eventos, cambios y trazabilidad operativa del sistema.'
  },
  {
    path: 'reportes',
    title: 'Centro de reportes',
    description: 'Genera reportes operativos y financieros del sistema.'
  },
  {
    path: 'configuracion',
    title: 'Configuración',
    description: 'Ajusta parámetros generales y preferencias de la plataforma.'
  }
]

export default function App() {
  return (
    <Routes>
      {/* Layout principal: sidebar y header persistentes para todas las vistas hijas */}
      <Route path="/" element={<BaseLayout />}>
        {/* Ruta de inicio (index) para renderizar el dashboard sin segmento adicional */}
        <Route index element={<DashboardPage />} />

        {/* Rutas dinamicas: cada objeto en sectionRoutes crea una pagina de seccion */}
        {sectionRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<SectionPage title={route.title} description={route.description} />}
          />
        ))}

        {/* Fallback: cualquier ruta no reconocida dentro del layout vuelve a Inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
