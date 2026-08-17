import { createElement } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import {
  CRUD_PAGE_SIZE,
  buildPaginationRange,
  buildVisiblePages,
  getAvatarTone,
  getInitials,
  renderActionsCell,
  renderStatusCell
} from '../utils/crudHelpers'
import { formatoId } from '../utils/formatos'

const columnHelper = createColumnHelper()

export const PAGE_SIZE = CRUD_PAGE_SIZE
export { buildVisiblePages, buildPaginationRange }

export const STATUS_FILTERS = [
  { label: 'Todos los estados', value: 'all' },
  { label: 'Activos', value: 'active' },
  { label: 'Inactivos', value: 'inactive' }
]

export function filterMotocicletas(motos, query, statusFilter) {
  const normalizedQuery = query.trim().toLowerCase()

  return motos.filter((moto) => {
    const searchableText = [moto.marca, moto.color, moto.tipo, moto.clienteNombre ?? '']
      .join(' ')
      .toLowerCase()

    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && moto.activo) ||
      (statusFilter === 'inactive' && !moto.activo)

    return matchesQuery && matchesStatus
  })
}

function renderMotoCell(info) {
  const moto = info.row.original

  return createElement(
    'div',
    { className: 'crud-table__item--with-avatar' },
    // createElement('div', { className: `crud-table__avatar` }, getInitials(moto.modelo)),
    createElement(
      'div',
      null,
      createElement('p', { className: 'crud-table__item-name' }, moto.marca),
      createElement('p', { className: 'crud-table__cell-meta' }, `${moto.anio} · ${moto.tipo}`)
    )
  )
}

export function buildMotocicletasColumns({ onView, onEdit, onDelete }) {
  return [
    columnHelper.accessor('id',{
      id:'motocicleta',
      header: 'Id',
      cell: (info) =>
        createElement('span', { className: 'crud-table__cell-meta dashboard__order-id' }, formatoId(info.getValue(),'MOTO'))
    }),
    columnHelper.accessor('marca', {
      header: 'Nombre',
      cell: renderMotoCell
    }),
    columnHelper.accessor('clienteNombre',{
      header: 'Cliente',
      cell: (info) =>
        createElement('span', { className: 'crud-table__cell-meta' }, info.getValue())
    }),
    columnHelper.accessor('color', {
      header: 'Color',
      cell: (info) => createElement('span', { className: 'crud-table__cell-meta' }, info.getValue())
    }),
    columnHelper.accessor('activo', {
      header: 'Estado',
      cell: renderStatusCell
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: (info) => renderActionsCell({ onView, onEdit, onDelete, entityLabel: 'motocicleta' }, info)
    })
  ]
}
