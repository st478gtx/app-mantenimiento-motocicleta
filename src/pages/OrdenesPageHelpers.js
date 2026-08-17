import { createColumnHelper } from "@tanstack/react-table";
import {
    CRUD_PAGE_SIZE,
    buildPaginationRange,
    buildVisiblePages,
    filterByQueryAndStatusOrden,
    renderActionsCell,
    renderStatusOrdenCell
} from "../utils/crudHelpers";
import { createElement } from "react";
import { formatoId } from "../utils/formatos";

const columnHelper = createColumnHelper()

export const PAGE_SIZE = CRUD_PAGE_SIZE
export { buildVisiblePages, buildPaginationRange }

export const STATUS_FILTERS = [
    { label: 'Todos los estados', value: 'all' },
    { label: 'En proceso', value: 'EN_PROCESO' },
    { label: 'Finalizada', value: 'FINALIZADA' },
    { label: 'Pendiente', value: 'PENDIENTE' }
]

const ORDENES_SEARCH_FIELDS = ["clienteNombre", "motocicletaNombre"]

export function filterOrdenes(ordenes, query, statusFilter) {
    return filterByQueryAndStatusOrden(ordenes, query, statusFilter, ORDENES_SEARCH_FIELDS)
}

export function buildOrdenesColumns({ onView, onEdit, onDelete }) {
    return [
        columnHelper.accessor('id', {
            id: 'orden',
            header: 'Orden',
            cell: (info) =>
                createElement('span', { className: 'crud-table__cell-meta dashboard__order-id' }, formatoId(info.getValue()))
        }),
        columnHelper.accessor('clienteNombre', {
            header: 'Cliente',
            cell: (info) => createElement('span', { className: 'crud-table__cell-meta' }, info.getValue())
        }),
        columnHelper.accessor('motocicletaNombre', {
            header: 'Motocicleta',
            cell: (info) => createElement('span', { className: 'crud-table__cell-meta' }, info.getValue())
        }),
        columnHelper.accessor('motocicletaPlaca', {
            header: 'Placa',
            cell: (info) => createElement('span', { className: 'crud-table__cell-meta' }, info.getValue())
        }),
        columnHelper.accessor('fechaIngreso', {
            header: 'Fecha ingreso',
            cell: (info) => createElement('span', { className: 'crud-table__cell-meta' }, info.getValue())
        }),
        columnHelper.accessor('estado', {
            header: 'Estado',
            cell: renderStatusOrdenCell
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: (info) => renderActionsCell({ onView, onEdit, onDelete, entityLabel: 'motocicleta' }, info)
        })
    ]
}