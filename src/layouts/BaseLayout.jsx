import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  {
    path: '/',
    label: 'Inicio',
    title: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
      </svg>
    )
  },
  {
    path: '/clientes',
    label: 'Clientes',
    title: 'Clientes',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M16.5 9.5a2.5 2.5 0 1 0 0-5" />
        <path d="M19 19c0-2-1-3.8-2.6-4.9" />
      </svg>
    )
  },
  {
    path: '/almaceneros',
    label: 'Almaceneros',
    title: 'Almaceneros',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7l8-4 8 4-8 4-8-4z" />
        <path d="M4 7v10l8 4 8-4V7" />
        <path d="M12 11v10" />
      </svg>
    )
  },
  {
    path: '/ordenes',
    label: 'Órdenes',
    title: 'Órdenes',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </svg>
    )
  },
  {
    path: '/inventario',
    label: 'Inventario',
    title: 'Inventario',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7h18" />
        <path d="M6 7V5h12v2" />
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M10 11h4" />
      </svg>
    )
  },
  {
    path: '/reportes',
    label: 'Reportes',
    title: 'Reportes',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
        <path d="M3 19h18" />
      </svg>
    )
  },
  {
    path: '/configuracion',
    label: 'Configuración',
    title: 'Configuración',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7.1 4l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    )
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
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const title = getHeaderTitle(location.pathname)

  return (
    <div className="flex min-h-screen bg-[var(--main-bg)] text-[var(--text-primary)]">
      <aside
        className="bg-[var(--sidebar-bg)] px-3 py-5 text-white transition-all duration-300"
        style={{ width: collapsed ? 60 : 220 }}
      >
        <div className="mb-8 flex items-center gap-3 px-1">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 13h10" />
              <path d="M14 9l4 4-4 4" />
              <path d="M4 6h2M4 18h2" />
            </svg>
          </div>
          {!collapsed && <span className="text-lg font-semibold tracking-tight">MobiService</span>}
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex h-10 items-center rounded-lg px-3 text-sm font-medium transition ${
                  isActive ? 'bg-[var(--accent)] text-white' : 'text-white/55 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center' : 'gap-3'}`
              }
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 border-t border-white/10 pt-4">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#4f7cff] text-sm font-semibold">A</div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-white">Administrador</p>
                <p className="text-xs text-slate-400">admin@mobiservice.pe</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <header className="flex h-16 flex-wrap items-center gap-4 border-b border-slate-200 bg-white px-4 md:px-8">
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            aria-label="Alternar menú"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <h1 className="mr-auto text-xl font-bold">{title}</h1>

          <div className="flex min-w-60 flex-1 items-center justify-end gap-3 md:flex-none">
            <label className="relative block max-w-xs flex-1 md:w-72 md:flex-none">
              <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-slate-400">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Buscar..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[var(--accent)]"
              />
            </label>

            <button type="button" className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 17H5.7a1.7 1.7 0 0 1-1.2-2.9l.5-.5V10a7 7 0 1 1 14 0v3.6l.5.5a1.7 1.7 0 0 1-1.2 2.9H15z" />
                <path d="M9 17a3 3 0 0 0 6 0" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full bg-[var(--accent)] text-[10px] font-semibold leading-4 text-white">3</span>
            </button>

            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#4f7cff] text-sm font-semibold text-white">A</div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}
