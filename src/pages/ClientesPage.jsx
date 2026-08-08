import { Fragment, useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import { ClienteModal, ClienteViewModal, ConfirmDeleteModal } from '../components/clientes'
import { deleteCliente, getClientes, createCliente, updateCliente } from '../services/clientesService'
import {
  buildClientesColumns,
  buildVisiblePages,
  buildPaginationRange,
  filterClientes,
  PAGE_SIZE,
  STATUS_FILTERS
} from './clientesPageHelpers.js'
import './ClientesPage.css'
import '../components/ui/CrudModal.css'

export default function ClientesPage() {
  const [clientes, setClientes] = useState(() => getClientes())
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: PAGE_SIZE })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCliente, setEditingCliente] = useState(null)
  const [viewingCliente, setViewingCliente] = useState(null)
  const [clienteToDelete, setClienteToDelete] = useState(null)

  const filteredClientes = useMemo(() => {
    return filterClientes(clientes, query, statusFilter)
  }, [clientes, query, statusFilter])

  const columns = useMemo(
    () =>
      buildClientesColumns({
        onView: openViewModal,
        onEdit: openEditModal,
        onDelete: handleDelete
      }),
    []
  )

  const table = useReactTable({
    data: filteredClientes,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  function resetToFirstPage() {
    setPagination((currentValue) => ({ ...currentValue, pageIndex: 0 }))
  }

  function applyClientesUpdate(nextClientes) {
    setClientes(nextClientes)
    resetToFirstPage()
  }

  function handleQueryChange(event) {
    setQuery(event.target.value)
    resetToFirstPage()
  }

  function handleStatusFilterChange(event) {
    setStatusFilter(event.target.value)
    resetToFirstPage()
  }

  function openNewModal() {
    setEditingCliente(null)
    setIsModalOpen(true)
  }

  function openEditModal(cliente) {
    setEditingCliente(cliente)
    setIsModalOpen(true)
  }

  function openViewModal(cliente) {
    setViewingCliente(cliente)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingCliente(null)
  }

  function closeViewModal() {
    setViewingCliente(null)
  }

  function handleSubmit(formData) {
    const nextClientes = editingCliente
      ? updateCliente(editingCliente.id, formData)
      : createCliente(formData)

    applyClientesUpdate(nextClientes)
    closeModal()
  }

  function handleDelete(cliente) {
    setClienteToDelete(cliente)
  }

  function closeDeleteModal() {
    setClienteToDelete(null)
  }

  function confirmDelete() {
    if (!clienteToDelete) {
      return
    }

    applyClientesUpdate(deleteCliente(clienteToDelete.id))
    closeDeleteModal()
  }

  const pageCount = table.getPageCount() || 1
  const visibleRows = table.getRowModel().rows.length
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const { rangeStart, rangeEnd } = buildPaginationRange(filteredClientes.length, pageIndex, pageSize, visibleRows)
  const visiblePages = buildVisiblePages(pageCount, pageIndex)

  return (
    <section className="clientes-page">
      <div className="clientes-page__hero">
        <div>
          <p className="clientes-page__eyebrow">CRUD</p>
          <h1 className="clientes-page__title">Clientes</h1>
          <p className="clientes-page__description">
            Administra el listado de clientes con búsqueda, filtro por estado, paginación y edición en modal.
          </p>
        </div>
      </div>

      <div className="clientes-page__panel">
        <div className="clientes-page__toolbar">
          <label className="clientes-page__search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Buscar cliente, correo o distrito..."
              value={query}
              onChange={handleQueryChange}
            />
          </label>

          <div className="clientes-page__select-shell">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              {STATUS_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="clientes-page__primary-button" onClick={openNewModal}>
            <Plus size={18} />
            Nuevo cliente
          </button>
        </div>

        <div className="clientes-table__wrap">
          <table className="clientes-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td className="clientes-table__empty" colSpan={columns.length}>
                    No se encontraron clientes con ese criterio.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="clientes-page__footer">
          <p className="clientes-page__footer-info">
            Mostrando {rangeStart} a {rangeEnd} de {filteredClientes.length} clientes
          </p>

          <div className="clientes-page__pagination">
            <button type="button" className="clientes-page__page-nav" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ChevronLeft size={16} />
            </button>

            <div className="clientes-page__pagination-pages">
              {visiblePages.map((pageNumber, index) => {
                const previousPageNumber = visiblePages[index - 1]
                const shouldShowEllipsis =
                  index > 0 && previousPageNumber !== undefined && pageNumber - previousPageNumber > 1

                return (
                  <Fragment key={pageNumber}>
                    {shouldShowEllipsis ? <span className="clientes-page__pagination-ellipsis">...</span> : null}
                    <button
                      type="button"
                      className={`clientes-page__page-number ${pageNumber === pageIndex ? 'is-active' : ''}`}
                      onClick={() => table.setPageIndex(pageNumber)}
                    >
                      {pageNumber + 1}
                    </button>
                  </Fragment>
                )
              })}
            </div>

            <button type="button" className="clientes-page__page-nav" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <ClienteModal
        key={`${editingCliente?.id ?? 'new'}-${isModalOpen ? 'open' : 'closed'}`}
        isOpen={isModalOpen}
        title={editingCliente ? 'Editar cliente' : 'Nuevo cliente'}
        initialClient={editingCliente}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <ClienteViewModal
        isOpen={Boolean(viewingCliente)}
        cliente={viewingCliente}
        onClose={closeViewModal}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(clienteToDelete)}
        cliente={clienteToDelete}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </section>
  )
}
