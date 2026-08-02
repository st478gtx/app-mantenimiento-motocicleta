import { Navigate, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import DashboardPage from './pages/DashboardPage'
import SectionPage from './pages/SectionPage'

const sectionRoutes = [
  {
    path: 'clientes',
    title: 'Gestión de clientes',
    description: 'Administra la información de tus clientes desde este módulo.'
  },
  {
    path: 'almaceneros',
    title: 'Gestión de almaceneros',
    description: 'Supervisa al personal y tareas de almacén en tiempo real.'
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
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<DashboardPage />} />
        {sectionRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<SectionPage title={route.title} description={route.description} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
