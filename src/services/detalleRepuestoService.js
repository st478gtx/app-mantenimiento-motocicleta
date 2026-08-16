import { detalleRepuestos as initialDetalleRepuestos } from "../data/detalleRepuesto";
import { obtenerNuevoId } from "../utils/crudHelpers";
import {
    cloneItems,
    readStorage,
    writeStorage,
} from "./storageService";

const STORAGE_KEY =
    "moviservice-detalle-repuestos";

function read() {
    return readStorage(
        STORAGE_KEY,
        initialDetalleRepuestos
    );
}

function write(detalles) {
    writeStorage(
        STORAGE_KEY,
        detalles
    );
}

export function getDetalleRepuestos() {
    return cloneItems(read());
}

export function getDetalleRepuestosByDetalleServicio(
    detalleServicioId
) {
    const detalles = read().filter(
        (detalle) =>
            detalle.detalleServicioId ===
            Number(detalleServicioId)
    );

    return cloneItems(detalles);
}

export function createDetalleRepuesto(
    detalleData
) {
    const detalles = read();

    const cantidad = Number(
        detalleData.cantidad
    );

    const precioUnitario = Number(
        detalleData.precioUnitario
    );

    const nuevoDetalle = {
        id: obtenerNuevoId(detalles),

        detalleServicioId: Number(
            detalleData.detalleServicioId
        ),

        repuestoId: Number(
            detalleData.repuestoId
        ),

        cantidad,

        precioUnitario,

        subtotal:
            cantidad * precioUnitario,
    };

    const next = [
        nuevoDetalle,
        ...detalles,
    ];

    write(next);

    return cloneItems(next);
}

export function updateDetalleRepuesto(
    detalleId,
    detalleData
) {
    const detalles = read();

    const next = detalles.map(
        (detalle) =>
            detalle.id === detalleId
                ? {
                      ...detalle,

                      repuestoId: Number(
                          detalleData.repuestoId
                      ),

                      cantidad: Number(
                          detalleData.cantidad
                      ),

                      precioUnitario:
                          Number(
                              detalleData.precioUnitario
                          ),

                      subtotal:
                          Number(
                              detalleData.cantidad
                          ) *
                          Number(
                              detalleData.precioUnitario
                          ),
                  }
                : detalle
    );

    write(next);

    return cloneItems(next);
}

export function deleteDetalleRepuesto(
    detalleId
) {
    const next = read().filter(
        (detalle) =>
            detalle.id !== detalleId
    );

    write(next);

    return cloneItems(next);
}

export function deleteDetalleRepuestosByDetalleServicio(
    detalleServicioId
) {
    const next = read().filter(
        (detalle) =>
            detalle.detalleServicioId !==
            Number(detalleServicioId)
    );

    write(next);

    return cloneItems(next);
}