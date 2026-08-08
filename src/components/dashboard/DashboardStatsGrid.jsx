export default function DashboardStatsGrid({ cards }) {
  return (
    <div className="dashboard__stats-grid">
      {cards.map((card) => {
        const StatIcon = card.IconComponent

        return (
          <article key={card.title} className="dashboard__stat-card">
            <div className="dashboard__stat-layout">
              <div className="dashboard__stat-icon-wrap" style={{ backgroundColor: card.iconBg, color: card.iconColor }}>
                {StatIcon ? <StatIcon className="dashboard__stat-icon" /> : null}
              </div>
              <div className="dashboard__stat-content">
                <p className="dashboard__stat-title">{card.title}</p>
                <p className="dashboard__stat-value">{card.total}</p>
                <p className="dashboard__stat-subtitle">{card.subtitle}</p>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
