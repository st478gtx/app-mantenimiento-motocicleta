import { Navigate, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import DashboardPage from './pages/DashboardPage'
import MotocicletasPage from './pages/MotocicletasPage'
import ClientesPage from './pages/ClientesPage'
import OrdenTrabajo from './pages/OrdenTrabajo'
import OrdenesPage from './pages/OrdenesPage'


export default function App() {
  return (
    <Routes>
      {/* Layout principal: sidebar y header persistentes para todas las vistas hijas */}
      <Route path="/" element={<BaseLayout />}>
        {/* Ruta de inicio (index) para renderizar el dashboard sin segmento adicional */}
        <Route index element={<DashboardPage />} />

        <Route path="clientes" element={<ClientesPage />} />
        <Route path="motocicletas" element={<MotocicletasPage />} />
        <Route path='ordenes' element={<OrdenesPage />} />

        {/* Fallback: cualquier ruta no reconocida dentro del layout vuelve a Inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
