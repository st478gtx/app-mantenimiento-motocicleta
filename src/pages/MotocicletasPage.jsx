import { Fragment, useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import { MotoModal, MotoViewModal, MotoConfirmDeleteModal } from '../components/motocicletas'
import { deleteMotocicleta, getMotocicletas, createMotocicleta, updateMotocicleta } from '../services/motocicletasService'
import {
  buildMotocicletasColumns,
  buildVisiblePages,
  buildPaginationRange,
  filterMotocicletas,
  PAGE_SIZE,
  STATUS_FILTERS
} from './motocicletasPageHelpers.js'
import '../components/ui/CrudPage.css'
import '../components/ui/CrudModal.css'

export default function MotocicletasPage() {
  const [motos, setMotos] = useState(() => getMotocicletas())
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: PAGE_SIZE })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMoto, setEditingMoto] = useState(null)
  const [viewingMoto, setViewingMoto] = useState(null)
  const [motoToDelete, setMotoToDelete] = useState(null)

  const filteredMotos = useMemo(() => {
    return filterMotocicletas(motos, query, statusFilter)
  }, [motos, query, statusFilter])

  const columns = useMemo(
    () =>
      buildMotocicletasColumns({
        onView: openViewModal,
        onEdit: openEditModal,
        onDelete: handleDelete
      }),
    []
  )

  const table = useReactTable({
    data: filteredMotos,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  function resetToFirstPage() {
    setPagination((current) => ({ ...current, pageIndex: 0 }))
  }

  function applyMotosUpdate(nextMotos) {
    setMotos(nextMotos)
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
    setEditingMoto(null)
    setIsModalOpen(true)
  }

  function openEditModal(moto) {
    setEditingMoto(moto)
    setIsModalOpen(true)
  }

  function openViewModal(moto) {
    setViewingMoto(moto)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingMoto(null)
  }

  function closeViewModal() {
    setViewingMoto(null)
  }

  function handleSubmit(formData) {
    const nextMotos = editingMoto
      ? updateMotocicleta(editingMoto.id, formData)
      : createMotocicleta(formData)

    applyMotosUpdate(nextMotos)
    closeModal()
  }

  function handleDelete(moto) {
    setMotoToDelete(moto)
  }

  function closeDeleteModal() {
    setMotoToDelete(null)
  }

  function confirmDelete() {
    if (!motoToDelete) return

    applyMotosUpdate(deleteMotocicleta(motoToDelete.id))
    closeDeleteModal()
  }

  const pageCount = table.getPageCount() || 1
  const visibleRows = table.getRowModel().rows.length
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const { rangeStart, rangeEnd } = buildPaginationRange(filteredMotos.length, pageIndex, pageSize, visibleRows)
  const visiblePages = buildVisiblePages(pageCount, pageIndex)

  return (
    <section className="crud-page">
      <div className="crud-page__hero">
        <div>
          <p className="crud-page__eyebrow">CRUD</p>
          <h1 className="crud-page__title">Motocicletas</h1>
          <p className="crud-page__description">
            Administra el listado de motocicletas con búsqueda, filtro por estado, paginación y edición en modal.
          </p>
        </div>
      </div>

      <div className="crud-page__panel">
        <div className="crud-page__toolbar">
          <label className="crud-page__search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Buscar motocicleta, color o cliente..."
              value={query}
              onChange={handleQueryChange}
            />
          </label>

          <div className="crud-page__select-shell">
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              {STATUS_FILTERS.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="crud-page__primary-button" onClick={openNewModal}>
            <Plus size={18} />
            Nueva motocicleta
          </button>
        </div>

        <div className="crud-table__wrap">
          <table className="crud-table">
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
                  <td className="crud-table__empty" colSpan={columns.length}>
                    No se encontraron motocicletas con ese criterio.
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

        <div className="crud-page__footer">
          <p className="crud-page__footer-info">
            Mostrando {rangeStart} a {rangeEnd} de {filteredMotos.length} motocicletas
          </p>

          <div className="crud-page__pagination">
            <button type="button" className="crud-page__page-nav" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ChevronLeft size={16} />
            </button>

            <div className="crud-page__pagination-pages">
              {visiblePages.map((pageNumber, index) => {
                const previousPageNumber = visiblePages[index - 1]
                const shouldShowEllipsis =
                  index > 0 && previousPageNumber !== undefined && pageNumber - previousPageNumber > 1

                return (
                  <Fragment key={pageNumber}>
                    {shouldShowEllipsis ? <span className="crud-page__pagination-ellipsis">...</span> : null}
                    <button
                      type="button"
                      className={`crud-page__page-number ${pageNumber === pageIndex ? 'is-active' : ''}`}
                      onClick={() => table.setPageIndex(pageNumber)}
                    >
                      {pageNumber + 1}
                    </button>
                  </Fragment>
                )
              })}
            </div>

            <button type="button" className="crud-page__page-nav" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <MotoModal
        key={`${editingMoto?.id ?? 'new'}-${isModalOpen ? 'open' : 'closed'}`}
        isOpen={isModalOpen}
        title={editingMoto ? 'Editar motocicleta' : 'Nueva motocicleta'}
        initialMoto={editingMoto}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <MotoViewModal
        isOpen={Boolean(viewingMoto)}
        moto={viewingMoto}
        onClose={closeViewModal}
      />

      <MotoConfirmDeleteModal
        isOpen={Boolean(motoToDelete)}
        moto={motoToDelete}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </section>
  )
}
