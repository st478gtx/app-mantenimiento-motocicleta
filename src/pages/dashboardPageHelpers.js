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
import { formatoId } from '../utils/formatos'

export function buildOrderRows(orders) {

  const ordenes = orders.map((ordenDashboard) => ({
    id: ordenDashboard.id,
    motocicletaNombre: ordenDashboard.motocicletaNombre,
    clienteNombre: ordenDashboard.clienteNombre,
    estado: ordenDashboard.estado,
    fechaIngreso: ordenDashboard.fechaIngreso,
  }))

  console.log(ordenes)

  return ordenes.slice(0,4)
    .sort((a,b) => b.id - a.id)
    .map((orden) => ({
    ...orden,
    id: formatoId(orden.id),
    motocicletaNombre: orden.motocicletaNombre,
    clienteNombre: orden.clienteNombre,
    estado: orden.estado,
    fechaIngreso: orden.fechaIngreso,
  }))
}
