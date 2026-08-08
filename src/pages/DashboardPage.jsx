import { clientes, motocicletas, ordenes } from '../data/staticData'
import { ORDENES_ESTADOS } from '../util/constants'
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

const completedOrdersCount = ordenes.filter((order) => order.estado === ORDENES_ESTADOS.COMPLETADA).length

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
const chartData = buildChartData(months, monthlyData)
const orderRows = buildOrderRows(ordenes)

export default function DashboardPage() {

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
