import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Bike,
  ClipboardList,
  House,
  Users,
  Wrench
} from 'lucide-react'
import './BaseLayout.css'

const navItems = [
  {
    path: '/',
    label: 'Inicio',
    title: 'Dashboard',
    icon: <House className="base-layout__icon" />
  },
  {
    path: '/clientes',
    label: 'Clientes',
    title: 'Clientes',
    icon: <Users className="base-layout__icon" />
  },
  {
    path: '/motocicletas',
    label: 'Motocicletas',
    title: 'Motocicletas',
    icon: <Bike className="base-layout__icon" />
  },
  {
    path: '/ordenes',
    label: 'Ordenes',
    title: 'Ordenes',
    icon: <ClipboardList className="base-layout__icon" />
  }
]

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function getHeaderTitle(pathname) {
  const currentPath = normalizePath(pathname)
  const currentItem = navItems.find((item) => item.path === currentPath)

  return currentItem ? currentItem.title : 'Dashboard'
}

export default function BaseLayout() {
  const location = useLocation()
  const title = getHeaderTitle(location.pathname)

  return (
    <div className="base-layout">
      {/* Sidebar */}
      <aside className="base-layout__sidebar">
        
        {/* Brand Row */}
        <div className="base-layout__brand-row">
          <div className="base-layout__brand-icon-wrap">
            <Wrench className="base-layout__icon" strokeWidth={2.2} />
          </div>
          <span className="base-layout__brand-text">MobiService</span>
        </div>

        {/* Navigation Links */}
        <nav className="base-layout__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `base-layout__nav-link ${isActive ? 'is-active' : 'is-idle'}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="base-layout__user-section">
          <div className="base-layout__user-row">
            <div className="base-layout__avatar">A</div>
            <div>
              <p className="base-layout__user-name">Administrador</p>
              <p className="base-layout__user-email">admin@mobiservice.pe</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="base-layout__main">

        {/* Header Section */}
        <header className="base-layout__header">
          <h1 className="base-layout__title">{title}</h1>

          <div className="base-layout__header-actions">
            <div className="base-layout__avatar">A</div>
          </div>
        </header>

        {/* Outlet for nested routes */}
        <Outlet />
      </main>
    </div>
  )
}
