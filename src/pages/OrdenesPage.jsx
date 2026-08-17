import { Fragment, useMemo, useState } from "react";
import {
    createOrden,
    deleteOrden,
    getOrdenes,
    updateOrden,
} from "../services/ordenesService";
import {
    buildPaginationRange,
    buildVisiblePages,
    PAGE_SIZE,
} from "./motocicletasPageHelpers";
import {
    buildOrdenesColumns,
    filterOrdenes,
    STATUS_FILTERS,
} from "./OrdenesPageHelpers";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    OrdenConfirmDeleteModal,
    OrdenModal,
    OrdenViewModal,
} from "../components/orden";
import { getDetalleServiciosByOrden } from "../services/detalleServicioService";
import { saveDetallesOrden } from "../services/detalleServicioService";
import { useSnackbar } from '../context/useSnackbar.js'

import "../components/ui/CrudPage.css";
import "../components/ui/CrudModal.css";
import "../components/orden/detalle/DetalleModal.css";

export default function OrdenesPage() {
    const [ordenes, setOrdenes] = useState(() => getOrdenes());
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: PAGE_SIZE,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrden, setEditingOrden] = useState(null);
    const [viewingOrden, setViewingOrden] = useState(null);
    const [ordenToDelete, setOrdenToDelete] = useState(null);

    const [detallesServicios, setDetallesServicios] = useState([]);

    const { showSnackbar } = useSnackbar()

    const filteredOrdenes = useMemo(() => {
        return filterOrdenes(ordenes, query, statusFilter);
    }, [ordenes, query, statusFilter]);

    const columns = useMemo(() =>
        buildOrdenesColumns({
            onView: openViewModal,
            onEdit: openEditModal,
            onDelete: handleDelete,
        }),
    );

    const table = useReactTable({
        data: filteredOrdenes,
        columns,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    function resetToFirstPage() {
        setPagination((current) => ({ ...current, pageIndex: 0 }));
    }

    function applyOrdenesUpdate(nextOrdenes) {
        setOrdenes(nextOrdenes);
        resetToFirstPage();
    }

    function handleQueryChange(event) {
        setQuery(event.target.value);
        resetToFirstPage();
    }

    function handleStatusFilterChange(event) {
        setStatusFilter(event.target.value);
        resetToFirstPage();
    }

    function openNewModal() {
        setEditingOrden(null);
        setDetallesServicios([]);
        setIsModalOpen(true);
    }

    function openViewModal(orden) {
        setViewingOrden(orden);
    }

    function openEditModal(orden) {
        const detalles = getDetalleServiciosByOrden(orden.id);

        setEditingOrden(orden);
        setDetallesServicios(detalles);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setDetallesServicios([]);
        setEditingOrden(null);
    }

    function closeViewModal() {
        setViewingOrden(null);
    }

    function handlesubmit(formData) {
        const { detallesServicios = [], ...ordenData } = formData;

        if (editingOrden) {
            const nextOrdenes = updateOrden(editingOrden.id, ordenData);

            saveDetallesOrden(editingOrden.id, detallesServicios);

            applyOrdenesUpdate(nextOrdenes);

            showSnackbar('Orden actualizada satifactoriamente.', 'info')
        } else {
            const nextOrdenes = createOrden(ordenData);

            const nuevaOrden = nextOrdenes[nextOrdenes.length - 1];

            saveDetallesOrden(nuevaOrden.id, detallesServicios);

            applyOrdenesUpdate(nextOrdenes);

            showSnackbar('Orden creada satifactoriamente.')
        }

        closeModal();
    }

    function handleDelete(moto) {
        setOrdenToDelete(moto);
    }

    function closeDeleteModal() {
        setOrdenToDelete(null);
    }

    function confirmDelete() {
        if (!ordenToDelete) return;

        applyOrdenesUpdate(deleteOrden(ordenToDelete.id));
        closeDeleteModal();
    }

    const pageCount = table.getPageCount() || 1;
    const visibleRows = table.getRowModel().rows.length;
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const { rangeStart, rangeEnd } = buildPaginationRange(
        filteredOrdenes.length,
        pageIndex,
        pageSize,
        visibleRows,
    );
    const visiblePages = buildVisiblePages(pageCount, pageIndex);

    return (
        <section className="crud-page">
            <div className="crud-page__hero">
                <div>
                    <p className="crud-page__eyebrow">CRUD</p>
                    <h1 className="crud-page__title">Ordenes</h1>
                    <p className="crud-page__description">
                        Administra el listado de ordenes con busqueda, filtro
                        por estado, paginación y edición en modal.
                    </p>
                </div>
            </div>

            <div className="crud-page__panel">
                <div className="crud-page__toolbar">
                    <label className="crud-page__search">
                        <Search size={18} />
                        <input
                            type="searh"
                            placeholder="Buscar ordenes"
                            value={query}
                            onChange={handleQueryChange}
                        />
                    </label>
                    <div className="crud-page__select-shell">
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

                    <button
                        type="button"
                        className="crud-page__primary-button"
                        onClick={openNewModal}
                    >
                        <Plus size={18} />
                        Nueva orden
                    </button>
                </div>
                <div className="crud-table__wrap">
                    <table className="crud-table">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td
                                        className="crud-table__empty"
                                        colSpan={columns.length}
                                    >
                                        No se encontraron orden con ese criterio
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="crud-page__footer">
                    <p className="cud-page__footer-info">
                        Mostrando {rangeStart} a {rangeEnd} de{" "}
                        {filteredOrdenes.length} ordenes
                    </p>

                    <div className="crud-page__pagination">
                        <button
                            type="button"
                            className="crud-page__page-nav"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="crud-page__pagination-pages">
                            {visiblePages.map((pageNumber, index) => {
                                const previousPageNumber =
                                    visiblePages[index - 1];
                                const shouldShowEllipsis =
                                    index > 0 &&
                                    previousPageNumber !== undefined &&
                                    pageNumber - previousPageNumber > 1;

                                return (
                                    <Fragment key={pageNumber}>
                                        {shouldShowEllipsis ? (
                                            <span className="crud-page__pagination-ellipsis">
                                                ...
                                            </span>
                                        ) : null}
                                        <button
                                            type="button"
                                            className={`crud-page__page-number ${pageNumber === pageIndex ? "is-active" : ""}`}
                                            onClick={() =>
                                                table.setPageIndex(pageNumber)
                                            }
                                        >
                                            {pageNumber + 1}
                                        </button>
                                    </Fragment>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            className="crud-page__page-nav"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <OrdenModal
                key={`${editingOrden?.id ?? "new"}-${isModalOpen ? "open" : "closed"}`}
                isOpen={isModalOpen}
                title={editingOrden ? "Editar orden" : "Nueva orden"}
                initialOrden={editingOrden}
                detallesIniciales={detallesServicios}
                onClose={closeModal}
                onSubmit={handlesubmit}
            />

            <OrdenViewModal
                isOpen={Boolean(viewingOrden)}
                orden={viewingOrden}
                onClose={closeViewModal}
            />
            <OrdenConfirmDeleteModal
                isOpen={Boolean(ordenToDelete)}
                orden={ordenToDelete}
                onCancel={closeDeleteModal}
                onConfirm={confirmDelete}
            />
        </section>
    );
}
