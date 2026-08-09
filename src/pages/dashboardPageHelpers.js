// Chart
export function buildChartData(months, monthlyData) {
  return months.map((month, index) => ({
    month,
    value: monthlyData[index] ?? 0
  }))
}

// Stats cards
export function buildStatsCards({
  templates,
  totalsByKey,
  subtitlesByKey,
  iconComponentsByKey
}) {
  return templates.map((template) => {
    const total = totalsByKey[template.key] ?? template.total ?? 0

    return {
      ...template,
      total: String(total),
      subtitle: subtitlesByKey[template.key] ?? '',
      IconComponent: iconComponentsByKey?.[template.key] ?? null
    }
  })
}

// Orders
import { ORDENES_ESTADOS } from '../utils/constants'

export function buildOrderRows(orders, locale = 'es-PE') {
  return orders.slice(-5).map((order) => ({
    ...order,
    id: String(order.id),
    code: `OT-${order.id.toString().padStart(3, '0')}`,
    statusClass:
      order.estado === ORDENES_ESTADOS.COMPLETADA
        ? 'is-completed'
        : order.estado === ORDENES_ESTADOS.EN_PROGRESO
        ? 'is-in-progress'
        : 'is-pending',
    status: order.estado,
    dateLabel: new Date(order.fecha).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }))
}
