import { useState } from 'react'
import { getClientes } from '../services/clientesService'
import { getMotocicletas } from '../services/motocicletasService'
import {
  dashboardChartConfig,
  dashboardYearOptions,
  monthlyData,
  months,
  statIcons,
  statsCardTemplates,
  statSubtitleByKey
} from '../data/dashboardStaticData'
import { buildChartData, buildOrderRows, buildStatsCards } from './dashboardPageHelpers'
import {
  DashboardChartCard,
  DashboardOrdersCard,
  DashboardStatsGrid
} from '../components/dashboard'
import './DashboardPage.css'
import { getOrdenes } from '../services/ordenesService'

const chartData = buildChartData(months, monthlyData)


export default function DashboardPage() {

  const [clientes] = useState(() => getClientes())
  const [motocicletas] = useState(() => getMotocicletas())
  const [ordenes] = useState(()=> getOrdenes())
  
  const orderRows = buildOrderRows(ordenes)
  const completedOrdersCount = ordenes.filter((order) => order.estado === 'FINALIZADA').length
  

  const statsCards = buildStatsCards({
    templates: statsCardTemplates,
    totalsByKey: {
      clientes: clientes.length,
      motocicletas: motocicletas.length,
      ordenes: ordenes.length,
      ordenesCompletadas: completedOrdersCount
    },
    subtitlesByKey: statSubtitleByKey,
    iconComponentsByKey: statIcons
  })

  return (
    <section className="dashboard">
      <DashboardStatsGrid cards={statsCards} />

      <div className="dashboard__content-grid">
        <DashboardChartCard
          chartConfig={dashboardChartConfig}
          yearOptions={dashboardYearOptions}
          chartData={chartData}
        />

        <DashboardOrdersCard orders={orderRows} />
      </div>
    </section>
  )
}
