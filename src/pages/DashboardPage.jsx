import { useEffect, useMemo, useState } from 'react'
import { BarChart3, ClipboardList, Package, Users } from 'lucide-react'
import { monthlyData, months, statsCardTemplates, ultimasOrdenes } from '../data/dashboardStaticData'
import { motocicletasService, clientesService } from '../services'
import './DashboardPage.css'

const statIcons = {
  users: Users,
  package: Package,
  clipboard: ClipboardList,
  chart: BarChart3
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [clientes, setClientes] = useState([])
  const [motocicletas, setMotocicletas] = useState([])

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      setIsLoading(true)
      setError('')

      try {
        const [clientesFromServer, motocicletasFromServer] = await Promise.all([
          clientesService.listarClientes(),
          motocicletasService.listarMotocicletas()
        ])

        if (!isMounted) {
          return
        }

        setClientes(clientesFromServer)
        setMotocicletas(motocicletasFromServer)
      } catch {
        if (isMounted) {
          setError('No se pudo cargar la información del dashboard.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const statsCards = useMemo(
    () =>
      statsCardTemplates.map((template) => {
        const IconComponent = statIcons[template.iconKey]

        const baseCard = {
          ...template,
          icon: IconComponent ? <IconComponent className="dashboard__stat-icon" /> : null
        }

        if (template.key === 'clientes') {
          return { ...baseCard, ...clientes }
        }

        if (template.key === 'motocicletas') {
          return { ...baseCard, ...motocicletas }
        }

        if (template.key === 'ordenesActivas') {
          return { ...baseCard }
        }

        return { ...baseCard }
      }),
    [motocicletas, clientes]
  )

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
    <section className="dashboard">
      {/* Header */}
      {error && (
        <div className="dashboard__error">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="dashboard__stats-grid">
        {statsCards.map((card) => (
          <article key={card.title} className="dashboard__stat-card">
            <div className="dashboard__stat-head">
              <p className="dashboard__stat-title">{card.title}</p>
              <div className="dashboard__stat-icon-wrap" style={{ backgroundColor: card.iconBg, color: card.iconColor }}>
                {card.icon}
              </div>
            </div>
            <p className="dashboard__stat-value">{isLoading ? '...' : card.total}</p>
            <p className={`dashboard__stat-trend ${card.tendencia === 'decremento' ? 'is-negative' : 'is-positive'}`}>{card.tendencia === 'decremento' ? '↓' : '↑'} {card.variacionPorcentual}% este mes</p>
          </article>
        ))}
      </div>

      {/* Charts and Orders */}
      <div className="dashboard__content-grid">
        <article className="dashboard__chart-card">
          <div className="dashboard__chart-head">
            <h2 className="dashboard__card-title">Órdenes por mes</h2>
            <select className="dashboard__year-select">
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>

          <div className="dashboard__chart-scroll">
            <svg viewBox="0 0 760 260" className="dashboard__chart-svg" role="img" aria-label="Grafica de ordenes por mes">
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

        <article className="dashboard__orders-card">
          <h2 className="dashboard__card-title dashboard__card-title--spaced">Últimas órdenes</h2>
          <div>
            {!isLoading && ultimasOrdenes.length === 0 && (
              <p className="dashboard__orders-empty">No hay órdenes recientes para mostrar.</p>
            )}
            {ultimasOrdenes.map((order) => (
              <div key={order.id} className="dashboard__order-row">
                <div>
                  <p className="dashboard__order-client">{order.cliente}</p>
                  <p className="dashboard__order-meta">{order.id}</p>
                  <p className="dashboard__order-meta dashboard__order-date">{order.fechaLabel}</p>
                </div>
                <span
                  className={`dashboard__order-status ${
                    order.estadoPago === 'Pagado' ? 'is-paid' : 'is-pending'
                  }`}
                >
                  {order.estadoPago}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="dashboard__orders-button"
          >
            Ver todas las órdenes
          </button>
        </article>
      </div>
    </section>
  )
}
