import { useMemo, useState } from 'react'

const navItems = [
  {
    label: 'Inicio',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
      </svg>
    )
  },
  {
    label: 'Clientes',
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
    label: 'Almaceneros',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7l8-4 8 4-8 4-8-4z" />
        <path d="M4 7v10l8 4 8-4V7" />
        <path d="M12 11v10" />
      </svg>
    )
  },
  {
    label: 'Órdenes',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </svg>
    )
  },
  {
    label: 'Inventario',
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
    label: 'Reportes',
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
    label: 'Configuración',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7.1 4l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    )
  }
]

const statsCards = [
  {
    title: 'Clientes',
    value: 120,
    iconBg: '#eef2ff',
    iconColor: '#4f7cff',
    trend: '↑ 8% este mes',
    trendColor: 'text-emerald-600',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    )
  },
  {
    title: 'Almaceneros',
    value: 83,
    iconBg: '#fffbeb',
    iconColor: '#f59e0b',
    trend: '↑ 4% este mes',
    trendColor: 'text-emerald-600',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7l8-4 8 4-8 4-8-4z" />
        <path d="M4 7v10l8 4 8-4V7" />
      </svg>
    )
  },
  {
    title: 'Órdenes activas',
    value: 24,
    iconBg: '#fff0f0',
    iconColor: '#e8414a',
    trend: '↓ 2% este mes',
    trendColor: 'text-red-500',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </svg>
    )
  },
  {
    title: 'Reportes nuevos',
    value: 9,
    iconBg: '#ecfdf5',
    iconColor: '#10b981',
    trend: '↑ 12% este mes',
    trendColor: 'text-emerald-600',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
        <path d="M3 19h18" />
      </svg>
    )
  }
]

const orders = [
  { cliente: 'Ana Torres', id: '#00412', fecha: '02 Ago 2026', estado: 'Pendiente' },
  { cliente: 'Carlos Vega', id: '#00411', fecha: '01 Ago 2026', estado: 'Pagado' },
  { cliente: 'Lucia Ramos', id: '#00410', fecha: '31 Jul 2026', estado: 'Pendiente' },
  { cliente: 'Mario Salas', id: '#00409', fecha: '30 Jul 2026', estado: 'Pagado' },
  { cliente: 'Elena Prado', id: '#00408', fecha: '30 Jul 2026', estado: 'Pendiente' }
]

const monthlyData = [38, 52, 47, 68, 63, 79, 74, 86, 82, 91, 88, 96]
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function App() {
  const [collapsed, setCollapsed] = useState(false)

  const chartPoints = useMemo(() => {
    const width = 760
    const height = 260
    const left = 44
    const right = 20
    const top = 24
    const bottom = 40

    const innerWidth = width - left - right
    const innerHeight = height - top - bottom

    const max = Math.max(...monthlyData)
    const min = Math.min(...monthlyData)
    const spread = max - min || 1

    return monthlyData.map((value, index) => {
      const x = left + (innerWidth / (monthlyData.length - 1)) * index
      const y = top + ((max - value) / spread) * innerHeight
      return { x, y, value }
    })
  }, [])

  const pathD = chartPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const areaD = `${pathD} L ${chartPoints[chartPoints.length - 1].x} 220 L ${chartPoints[0].x} 220 Z`

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
          {navItems.map((item) => {
            const isActive = item.label === 'Inicio'
            return (
              <button
                key={item.label}
                type="button"
                className={`flex h-10 items-center rounded-lg px-3 text-sm font-medium transition ${
                  isActive ? 'bg-[var(--accent)] text-white' : 'text-white/55 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'justify-center' : 'gap-3'}`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
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

          <h1 className="mr-auto text-xl font-bold">Dashboard</h1>

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

        <section className="p-4 md:p-8">
          <div className="flex flex-wrap gap-4">
            {statsCards.map((card) => (
              <article key={card.title} className="min-w-52 flex-1 rounded-xl bg-[var(--card-bg)] p-5 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.45)]">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">{card.title}</p>
                  <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ backgroundColor: card.iconBg, color: card.iconColor }}>
                    {card.icon}
                  </div>
                </div>
                <p className="mb-2 text-3xl font-bold leading-none">{card.value}</p>
                <p className={`text-sm font-medium ${card.trendColor}`}>{card.trend}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <article className="min-w-80 flex-[2_1_620px] rounded-xl bg-[var(--card-bg)] p-5 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.45)]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Órdenes por mes</h2>
                <select className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-[var(--accent)]">
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <svg viewBox="0 0 760 260" className="min-w-[660px] w-full" role="img" aria-label="Grafica de ordenes por mes">
                  <defs>
                    <linearGradient id="redArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#e8414a" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#e8414a" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {[56, 88, 120, 152, 184, 216].map((y) => (
                    <line key={y} x1="44" y1={y} x2="740" y2={y} stroke="#d1d5db" strokeDasharray="4 6" strokeWidth="1" />
                  ))}

                  <path d={areaD} fill="url(#redArea)" />
                  <path d={pathD} fill="none" stroke="#e8414a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  {chartPoints.map((point) => (
                    <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="5" fill="#fff" stroke="#e8414a" strokeWidth="3" />
                  ))}

                  {months.map((month, index) => {
                    const x = chartPoints[index].x
                    return (
                      <text key={month} x={x} y="246" textAnchor="middle" fill="#6b7280" fontSize="12" fontWeight="500">
                        {month}
                      </text>
                    )
                  })}
                </svg>
              </div>
            </article>

            <article className="min-w-72 flex-1 rounded-xl bg-[var(--card-bg)] p-5 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.45)]">
              <h2 className="mb-3 text-lg font-semibold">Últimas órdenes</h2>
              <div className="space-y-0">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-start justify-between border-b border-slate-100 py-3 last:border-b-0">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{order.cliente}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{order.id}</p>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">{order.fecha}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        order.estado === 'Pagado' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {order.estado}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-4 h-10 w-full rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Ver todas las órdenes
              </button>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
