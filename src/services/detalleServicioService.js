import { detalleServicios as initialDetalleServicios } from "../data/detalleServicio";
import { detalleRepuestos as initialDetalleRepuestos } from "../data/detalleRepuesto";

import { obtenerNuevoId } from "../utils/crudHelpers";

import {
    cloneItems,
    readStorage,
    writeStorage,
} from "./storageService";

const STORAGE_KEY_SERVICIOS =
    "moviservice-detalle-servicios";

const STORAGE_KEY_REPUESTOS =
    "moviservice-detalle-repuestos";


// =====================================================
// STORAGE
// =====================================================

function readServicios() {
    return readStorage(
        STORAGE_KEY_SERVICIOS,
        initialDetalleServicios
    );
}

function writeServicios(detalles) {
    writeStorage(
        STORAGE_KEY_SERVICIOS,
        detalles
    );
}

function readRepuestos() {
    return readStorage(
        STORAGE_KEY_REPUESTOS,
        initialDetalleRepuestos
    );
}

function writeRepuestos(detalles) {
    writeStorage(
        STORAGE_KEY_REPUESTOS,
        detalles
    );
}


// =====================================================
// OBTENER TODOS
// =====================================================

export function getDetalleServicios() {
    return cloneItems(readServicios());
}

export function getDetalleRepuestos() {
    return cloneItems(readRepuestos());
}


// =====================================================
// OBTENER DETALLES DE UNA ORDEN
// =====================================================

export function getDetalleServiciosByOrden(
    ordenTrabajoId
) {
    const ordenId = Number(ordenTrabajoId);

    const detallesServicios =
        readServicios().filter(
            (detalle) =>
                detalle.ordenTrabajoId === ordenId
        );

    const detallesRepuestos =
        readRepuestos();

    const resultado =
        detallesServicios.map(
            (detalle) => ({
                ...detalle,

                repuestos:
                    detallesRepuestos
                        .filter(
                            (repuesto) =>
                                repuesto.detalleServicioId ===
                                detalle.id
                        )
                        .map(
                            (repuesto) => ({
                                repuestoId:
                                    repuesto.repuestoId,

                                cantidad:
                                    repuesto.cantidad,

                                precioUnitario:
                                    repuesto.precioUnitario,

                                subtotal:
                                    repuesto.subtotal,
                            })
                        ),
            })
        );

    return cloneItems(resultado);
}


// =====================================================
// CREAR DETALLE DE SERVICIO
// =====================================================

export function createDetalleServicio(
    detalleData
) {
    const detalles =
        readServicios();

    const cantidad =
        Number(
            detalleData.cantidad ?? 1
        );

    const precioUnitario =
        Number(
            detalleData.precioUnitario
        );

    const nuevoDetalle = {
        id: obtenerNuevoId(detalles),

        ordenTrabajoId:
            Number(
                detalleData.ordenTrabajoId
            ),

        servicioId:
            Number(
                detalleData.servicioId
            ),

        cantidad,

        precioUnitario,

        subtotal:
            cantidad *
            precioUnitario,

        observaciones:
            detalleData.observaciones ??
            "",
    };

    const next = [
        nuevoDetalle,
        ...detalles,
    ];

    writeServicios(next);

    return structuredClone(
        nuevoDetalle
    );
}


// =====================================================
// CREAR DETALLE DE REPUESTO
// =====================================================

export function createDetalleRepuesto(
    detalleServicioId,
    repuestoData
) {
    const detalles =
        readRepuestos();

    const cantidad =
        Number(
            repuestoData.cantidad ?? 1
        );

    const precioUnitario =
        Number(
            repuestoData.precioUnitario
        );

    const nuevoDetalle = {
        id: obtenerNuevoId(detalles),

        detalleServicioId:
            Number(
                detalleServicioId
            ),

        repuestoId:
            Number(
                repuestoData.repuestoId
            ),

        cantidad,

        precioUnitario,

        subtotal:
            cantidad *
            precioUnitario,
    };

    const next = [
        nuevoDetalle,
        ...detalles,
    ];

    writeRepuestos(next);

    return structuredClone(
        nuevoDetalle
    );
}


// =====================================================
// GUARDAR TODOS LOS DETALLES DE UNA ORDEN
// =====================================================

export function saveDetallesOrden(
    ordenTrabajoId,
    detalles
) {
    const ordenId =
        Number(ordenTrabajoId);

    /*
     * Reemplazamos los detalles
     * anteriores de la orden.
     */
    deleteDetalleServiciosByOrden(
        ordenId
    );

    /*
     * Creamos nuevamente los
     * servicios seleccionados.
     */
    for (const detalle of detalles) {

        const detalleCreado =
            createDetalleServicio({
                ordenTrabajoId:
                    ordenId,

                servicioId:
                    detalle.servicioId,

                /*
                 * La interfaz solamente
                 * selecciona.
                 *
                 * La cantidad real se
                 * establece internamente.
                 */
                cantidad:
                    detalle.cantidad ?? 1,

                precioUnitario:
                    detalle.precioUnitario,

                observaciones:
                    detalle.observaciones,
            });

        /*
         * Creamos los repuestos
         * pertenecientes al servicio.
         */
        for (
            const repuesto
            of detalle.repuestos ?? []
        ) {
            createDetalleRepuesto(
                detalleCreado.id,
                {
                    repuestoId:
                        repuesto.repuestoId,

                    cantidad:
                        repuesto.cantidad ?? 1,

                    precioUnitario:
                        repuesto.precioUnitario,
                }
            );
        }
    }

    /*
     * Devolvemos la estructura
     * completa que utiliza el modal.
     */
    return getDetalleServiciosByOrden(
        ordenId
    );
}


// =====================================================
// ACTUALIZAR DETALLE DE SERVICIO
// =====================================================

export function updateDetalleServicio(
    detalleId,
    detalleData
) {
    const detalles =
        readServicios();

    const cantidad =
        Number(
            detalleData.cantidad ?? 1
        );

    const precioUnitario =
        Number(
            detalleData.precioUnitario
        );

    const next =
        detalles.map(
            (detalle) =>
                detalle.id === detalleId
                    ? {
                          ...detalle,

                          servicioId:
                              Number(
                                  detalleData.servicioId
                              ),

                          cantidad,

                          precioUnitario,

                          subtotal:
                              cantidad *
                              precioUnitario,

                          observaciones:
                              detalleData.observaciones ??
                              "",
                      }
                    : detalle
        );

    writeServicios(next);

    return cloneItems(next);
}


// =====================================================
// ELIMINAR UN DETALLE DE SERVICIO
// =====================================================

export function deleteDetalleServicio(
    detalleId
) {
    const next =
        readServicios().filter(
            (detalle) =>
                detalle.id !== detalleId
        );

    writeServicios(next);

    /*
     * También eliminamos los
     * repuestos relacionados.
     */
    const nextRepuestos =
        readRepuestos().filter(
            (repuesto) =>
                repuesto.detalleServicioId !==
                Number(detalleId)
        );

    writeRepuestos(
        nextRepuestos
    );

    return cloneItems(next);
}


// =====================================================
// ELIMINAR TODOS LOS DETALLES DE UNA ORDEN
// =====================================================

export function deleteDetalleServiciosByOrden(
    ordenTrabajoId
) {
    const ordenId =
        Number(ordenTrabajoId);

    const detalles =
        readServicios();

    /*
     * Obtenemos primero los IDs
     * de los detalles de servicio.
     */
    const detalleIds =
        detalles
            .filter(
                (detalle) =>
                    detalle.ordenTrabajoId ===
                    ordenId
            )
            .map(
                (detalle) =>
                    detalle.id
            );

    /*
     * Eliminamos los servicios
     * de esa orden.
     */
    const nextServicios =
        detalles.filter(
            (detalle) =>
                detalle.ordenTrabajoId !==
                ordenId
        );

    writeServicios(
        nextServicios
    );

    /*
     * Eliminamos los repuestos
     * asociados a esos servicios.
     */
    const nextRepuestos =
        readRepuestos().filter(
            (repuesto) =>
                !detalleIds.includes(
                    repuesto.detalleServicioId
                )
        );

    writeRepuestos(
        nextRepuestos
    );

    return cloneItems(
        nextServicios
    );
}