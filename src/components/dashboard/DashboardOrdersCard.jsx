import { Link } from 'react-router-dom'

export default function DashboardOrdersCard({ orders }) {
  return (
    <article className="dashboard__orders-card">
      <h2 className="dashboard__card-title dashboard__card-title--spaced">Últimas órdenes</h2>
      <div className="dashboard__orders-list">
        {orders.length === 0 && (
          <p className="dashboard__orders-empty">No hay órdenes recientes para mostrar.</p>
        )}
        {orders.map((order) => (
          <div key={order.id} className="dashboard__order-row">
            <p className="dashboard__order-id">{order.code}</p>

            <div className="dashboard__order-details">
              <p className="dashboard__order-client">{order.cliente.nombre}</p>
              <p className="dashboard__order-meta dashboard__order-bike">{order.motocicleta.nombre}</p>
            </div>

            <div className="dashboard__order-right">
              <span className={`dashboard__order-status ${order.statusClass}`}>
                {order.status}
              </span>
              <p className="dashboard__order-meta dashboard__order-date">{order.dateLabel}</p>
            </div>
          </div>
        ))}
      </div>

      <Link to="/ordenes" className="dashboard__orders-button">
        Ver todas las órdenes
      </Link>
    </article>
  )
}
