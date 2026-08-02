import { useMemo } from 'react'

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

export default function DashboardPage() {
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
      return { x, y }
    })
  }, [])

  const pathD = chartPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const areaD = `${pathD} L ${chartPoints[chartPoints.length - 1].x} 220 L ${chartPoints[0].x} 220 Z`

  return (
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
  )
}
