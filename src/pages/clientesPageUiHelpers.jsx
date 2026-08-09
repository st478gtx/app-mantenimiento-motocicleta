import { getAvatarTone, getInitials } from '../utils/crudHelpers'

export function renderClientCell(info) {
  const cliente = info.row.original

  return (
    <div className="crud-table__item--with-avatar">
      <div className={`crud-table__avatar ${getAvatarTone(cliente.id)}`}>
        {getInitials(info.getValue())}
      </div>
      <div>
        <p className="crud-table__item-name">{info.getValue()}</p>
        <p className="crud-table__cell-meta">{cliente.correo}</p>
      </div>
    </div>
  )
}
