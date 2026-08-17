import { createColumnHelper } from '@tanstack/react-table'
import {
  CRUD_PAGE_SIZE,
  buildPaginationRange,
  buildVisiblePages,
  filterByQueryAndStatus,
  renderActionsCell,
  renderStatusCell,
  renderTextCell
} from '../utils/crudHelpers'
import { renderClientCell } from './clientesPageUiHelpers.jsx'

const columnHelper = createColumnHelper()

export const PAGE_SIZE = CRUD_PAGE_SIZE
export { buildVisiblePages, buildPaginationRange }

export const STATUS_FILTERS = [
  { label: 'Todos los estados', value: 'all' },
  { label: 'Activos', value: 'active' },
  { label: 'Inactivos', value: 'inactive' }
]

const CLIENTES_SEARCH_FIELDS = ['nombre', 'correo', 'telefono', 'distrito']

export function filterClientes(clientes, query, statusFilter) {
  return filterByQueryAndStatus(clientes, query, statusFilter, CLIENTES_SEARCH_FIELDS)
}

export function buildClientesColumns({ onView, onEdit, onDelete }) {
  return [
    columnHelper.accessor('nombre', {
      header: 'Cliente',
      cell: renderClientCell
    }),
    columnHelper.accessor('telefono', {
      header: 'Teléfono',
      cell: renderTextCell
    }),
    columnHelper.accessor('distrito', {
      header: 'Distrito',
      cell: renderTextCell
    }),
    columnHelper.accessor('activo', {
      header: 'Estado',
      cell: renderStatusCell
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: (info) => renderActionsCell({ onView, onEdit, onDelete, entityLabel: 'cliente' }, info)
    })
  ]
}
