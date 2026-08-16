import { Navigate, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import DashboardPage from './pages/DashboardPage'
import MotocicletasPage from './pages/MotocicletasPage'
import ClientesPage from './pages/ClientesPage'
import SectionPage from './pages/SectionPage'
import OrdenTrabajo from './pages/OrdenTrabajo'
import OrdenesPage from './pages/OrdenesPage'

// Fuente unica para construir rutas secundarias y mantener menu/rutas sincronizados.
const sectionRoutes = [
  { path: 'inventario' },
  { path: 'historial' },
  { path: 'reportes' },
  { path: 'configuracion' }
]

export default function App() {
  return (
    <Routes>
      {/* Layout principal: sidebar y header persistentes para todas las vistas hijas */}
      <Route path="/" element={<BaseLayout />}>
        {/* Ruta de inicio (index) para renderizar el dashboard sin segmento adicional */}
        <Route index element={<DashboardPage />} />

        <Route path="clientes" element={<ClientesPage />} />
        <Route path="motocicletas" element={<MotocicletasPage />} />
        <Route path='ordenTrabajo' element={<OrdenTrabajo />} />
        <Route path='ordenes' element={<OrdenesPage />} />

        {/* Rutas dinamicas: cada objeto en sectionRoutes crea una pagina de seccion */}
        {sectionRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<SectionPage />} />
        ))}

        {/* Fallback: cualquier ruta no reconocida dentro del layout vuelve a Inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
