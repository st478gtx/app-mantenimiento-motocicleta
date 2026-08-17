import { createElement } from 'react'
import { Eye, PencilLine, Trash2 } from 'lucide-react'

export const CRUD_PAGE_SIZE = 5

const AVATAR_TONES = ['tone-a', 'tone-b', 'tone-c', 'tone-d']

export function getStatusLabel(isActive) {
  return isActive ? 'Activo' : 'Inactivo'
}

export function getStatusTone(isActive) {
  return isActive ? 'is-active' : 'is-inactive'
}

export function getStatusLabelOrden(option) {

  let tone = option

  switch (tone) {
    case "EN_PROCESO":
      tone = "En proceso"
      break;

    case "FINALIZADA":
      tone = "Finalizada"
      break;

    case "PENDIENTE":
      tone = "Pendiente"
      break;

    default:
      tone = ""
      break;
  }

  return tone
}

export function getStatusToneOrden(option) {

  let tone = option

  switch (tone) {
    case "EN_PROCESO":
      tone = "En-Proceso"
      break;

    case "FINALIZADA":
      tone = "Finalizada"
      break;

    case "PENDIENTE":
      tone = "Pendiente"
      break;

    default:
      tone = ""
      break;
  }
  return tone
}

export function getAvatarTone(id) {
  const numericId = Number.parseInt(String(id).replace(/\D/g, ''), 10)

  return AVATAR_TONES[Number.isNaN(numericId) ? 0 : numericId % AVATAR_TONES.length]
}

export function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

export function buildVisiblePages(pageCount, pageIndex) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index)
  }

  const pages = new Set([0, pageCount - 1, pageIndex])

  if (pageIndex - 1 >= 0) pages.add(pageIndex - 1)
  if (pageIndex + 1 < pageCount) pages.add(pageIndex + 1)

  return [...pages].sort((a, b) => a - b)
}

export function buildPaginationRange(totalItems, pageIndex, pageSize, visibleItemsCount) {
  if (totalItems === 0) return { rangeStart: 0, rangeEnd: 0 }

  const rangeStart = pageIndex * pageSize + 1
  const rangeEnd = Math.min(rangeStart + visibleItemsCount - 1, totalItems)

  return { rangeStart, rangeEnd }
}

export function filterByQueryAndStatus(items, query, statusFilter, searchFields) {
  const normalizedQuery = query.trim().toLowerCase()

  return items.filter((item) => {
    const searchableText = searchFields.map((field) => item[field] ?? '').join(' ').toLowerCase()
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && item.activo) ||
      (statusFilter === 'inactive' && !item.activo)

    return matchesQuery && matchesStatus
  })
}

export function filterByQueryAndStatusOrden(items, query, statusFilter, searchFields) {
  const normalizedQuery = query.trim().toLowerCase()

  return items.filter((item) => {
    const searchableText = searchFields.map((field) => item[field] ?? '').join(' ').toLowerCase()
    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
    const matchesStatus =
      statusFilter === 'all' || item.estado === statusFilter

    return matchesQuery && matchesStatus
  })
}

export function renderTextCell(info) {
  return createElement('span', { className: 'crud-table__cell-meta' }, info.getValue())
}

export function renderStatusCell(info) {
  return createElement(
    'span',
    { className: `crud-table__status ${getStatusTone(info.getValue())}` },
    getStatusLabel(info.getValue())
  )
}

export function renderStatusOrdenCell(info) {
  return createElement(
    'span',
    { className: `crud-table__statusOrden ${getStatusToneOrden(info.getValue())}` },
    getStatusLabelOrden(info.getValue())
  )
}

export function obtenerNuevoId(lista) {
  if (lista.length === 0) return 1

  return Math.max(...lista.map(x => x.id)) + 1
}

export function renderActionsCell({ onView, onEdit, onDelete, entityLabel }, info) {
  const item = info.row.original

  return createElement(
    'div',
    { className: 'crud-table__actions' },
    createElement(
      'button',
      {
        type: 'button',
        className: 'crud-table__icon-button',
        onClick: () => onView(item),
        'aria-label': `Ver ${entityLabel} ${item.nombre}`
      },
      createElement(Eye, { size: 16 })
    ),
    createElement(
      'button',
      {
        type: 'button',
        className: 'crud-table__icon-button',
        onClick: () => onEdit(item),
        'aria-label': `Editar ${entityLabel} ${item.nombre}`
      },
      createElement(PencilLine, { size: 16 })
    ),
    createElement(
      'button',
      {
        type: 'button',
        className: 'crud-table__icon-button crud-table__icon-button--danger',
        onClick: () => onDelete(item),
        'aria-label': `Eliminar ${entityLabel} ${item.nombre}`
      },
      createElement(Trash2, { size: 16 })
    )
  )
}
