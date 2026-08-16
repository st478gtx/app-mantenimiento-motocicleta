import { ordenesTrabajo as initialOrdenes } from '../data/ordenTrabajo'
import { crearOrdenTrabajoDTO } from '../dto/orderTrabajoDTO'
import { obtenerNuevoId } from '../utils/crudHelpers'
import { getClientes } from './clientesService'
import { getMotocicletas } from './motocicletasService'
import { cloneItems, readStorage, writeStorage } from "./storageService"

const STORAGE_KEY = 'moviservice-ordenes'

function read() {   

    return readStorage(STORAGE_KEY, initialOrdenes)
}

function write(ordenes) {
    writeStorage(STORAGE_KEY, ordenes)
}

function toDTO(orden) {
    return crearOrdenTrabajoDTO(
        orden,
        getMotocicletas(),
        getClientes()
    )
}

export function getOrdenes() {

    const ordenes = read()

    return cloneItems(ordenes.map(toDTO))
}

export function createOrden(ordenData) {
    const ordenes = read()

    const nextOrden = {
        id: obtenerNuevoId(ordenes),

        motocicletaId: Number(
            ordenData.motocicletaId
        ),

        fechaIngreso: ordenData.fechaIngreso,

        fechaEntrega: ordenData.fechaEntrega,

        kilometraje: Number(
            ordenData.kilometraje
        ),

        estado: ordenData.estado,

        diagnostico: ordenData.diagnostico,

        observaciones: ordenData.observaciones
    }

    const next = [
        nextOrden,
        ...ordenes
    ]

    write(next)

    return cloneItems(
        next.map(toDTO)
    )
}

export function updateOrden(ordenId, ordenData) {
    const ordenes = read()

    const next = ordenes.map(orden =>
        orden.id === ordenId
            ? {
                ...orden,

                motocicletaId: Number(
                    ordenData.motocicletaId
                ),

                fechaIngreso:
                    ordenData.fechaIngreso,

                fechaEntrega:
                    ordenData.fechaEntrega,

                kilometraje: Number(
                    ordenData.kilometraje
                ),

                estado:
                    ordenData.estado,

                diagnostico:
                    ordenData.diagnostico,

                observaciones:
                    ordenData.observaciones
            }
            : orden
    )

    write(next)

    const ordenActualizada = next.find(
        orden => orden.id === ordenId
    )

    return ordenActualizada
        ? cloneItems(next.map(toDTO))
        : null
}

export function deleteOrden(ordenId) {
    const next = read().filter(
        orden => orden.id !== ordenId
    )

    write(next)

    return cloneItems(
        next.map(toDTO)
    )
}