import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function DashboardChartCard({ chartConfig, chartData, yearOptions = [] }) {
  const maxValue = chartData.reduce((highest, point) => Math.max(highest, point.value ?? 0), 0)
  const yMax = Math.max(10, Math.ceil(maxValue / 10) * 10)
  const yTicks = Array.from({ length: yMax / 10 + 1 }, (_, index) => index * 10)

  return (
    <article className="dashboard__chart-card">
      <div className="dashboard__chart-head">
        <h2 className="dashboard__card-title">Órdenes por mes</h2>
        <select className="dashboard__year-select">
          {yearOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="dashboard__chart-scroll">
        <div className="dashboard__chart-surface" style={{ height: `${chartConfig.height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={chartConfig.margin}>
              <defs>
                <linearGradient id="redArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.03" />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#e8edf3" vertical={false} strokeDasharray="0" />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
              />

              <YAxis
                type="number"
                domain={[0, yMax]}
                ticks={yTicks}
                axisLine={false}
                tickLine={false}
                width={32}
                tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#dc2626"
                strokeWidth={2.6}
                fill="url(#redArea)"
                dot={{ r: 4.4, fill: '#ef4444', stroke: '#dc2626', strokeWidth: 1.7 }}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  )
}
