import { useEffect, useState } from "react";

import DetalleModal from "./DetalleModal";

import { zonasMoto } from "../../../data/zonasMoto";
import { servicios } from "../../../data/servicio";
import { repuestos } from "../../../data/repuesto";
// import { servicioRepuestos } from "../../../data/servicioRepuesto";

import hondaRevel from "../../../assets/honda-cmx-250-c-rebel-250.webp";

import { formatoMoneda } from "../../../utils/moneda";

import { getDetalleServicios } from "../../../services/detalleServicioService";

function obtenerServiciosIniciales(detallesIniciales) {
    return detallesIniciales.map(
        (detalle) => detalle.servicioId
    );
}

function obtenerRepuestosIniciales(detallesIniciales) {
    return detallesIniciales.flatMap(
        (detalle) =>
            detalle.repuestos?.map(
                (repuesto) => repuesto.repuestoId
            ) ?? []
    );
}

export default function ServicioRepuestoModal({
    isOpen,
    detallesIniciales = [],
    onClose,
    onConfirm,
}) {
    // TODO: BUG
    const servicioRepuestos = getDetalleServicios();
    const [listRepuestoId, setListRepuestoId] =
        useState(() => {
            const servicioInicial =
                servicios.find((servicio) =>
                    obtenerServiciosIniciales(
                        detallesIniciales
                    ).includes(servicio.id)
                );

            if (!servicioInicial) {
                return [];
            }

            const serviciosDeZona =
                servicios
                    .filter(
                        (servicio) =>
                            servicio.zonaId ===
                            servicioInicial.zonaId
                    )
                    .map(
                        (servicio) =>
                            servicio.id
                    );

            return [
                ...new Set(
                    servicioRepuestos
                        .filter((item) =>
                            serviciosDeZona.includes(
                                item.servicioId
                            )
                        )
                        .map(
                            (item) =>
                                item.repuestoId
                        )
                ),
            ];
        });

    const [selected, setSelected] =
        useState(() => {
            const servicioInicial =
                servicios.find((servicio) =>
                    obtenerServiciosIniciales(
                        detallesIniciales
                    ).includes(servicio.id)
                );

            if (!servicioInicial) {
                return "";
            }

            const zonaInicial =
                zonasMoto.find(
                    (zona) =>
                        zona.id ===
                        servicioInicial.zonaId
                );

            return zonaInicial?.nombre ?? "";
        });

    const [zona, setZona] =
        useState(() => {
            const servicioInicial =
                servicios.find((servicio) =>
                    obtenerServiciosIniciales(
                        detallesIniciales
                    ).includes(servicio.id)
                );

            if (!servicioInicial) {
                return {};
            }

            return (
                zonasMoto.find(
                    (zona) =>
                        zona.id ===
                        servicioInicial.zonaId
                ) ?? {}
            );
        });

    const [servicioAgregado, setServicioAgregado] =
        useState(() =>
            obtenerServiciosIniciales(
                detallesIniciales
            )
        );

    const [repuestoAgregado, setRepuestoAgregado] =
        useState(() =>
            obtenerRepuestosIniciales(
                detallesIniciales
            )
        );

    /*
     * Cuando el modal se abre, cargamos las selecciones
     * que ya existían.
     *
     * Esto será importante para EDITAR una orden.
     */    

    /*
     * Seleccionar/deseleccionar servicio.
     */
    function manejoCambioServicio(id) {
        setServicioAgregado((prev) =>
            prev.includes(id)
                ? prev.filter(
                      (x) => x !== id
                  )
                : [...prev, id]
        );
    }

    /*
     * Seleccionar/deseleccionar repuesto.
     */
    function manejoCambioRepuesto(id) {
        setRepuestoAgregado((prev) =>
            prev.includes(id)
                ? prev.filter(
                      (x) => x !== id
                  )
                : [...prev, id]
        );
    }

    /*
     * Seleccionar zona.
     */
    function seleccionZona(event) {
        const nombreZona =
            event.target.value;

        setSelected(nombreZona);

        const zonaSeleccionada =
            zonasMoto.find(
                (item) =>
                    item.nombre ===
                    nombreZona
            );

        if (!zonaSeleccionada) {
            return;
        }

        setZona(zonaSeleccionada);

        cargarRepuestos(
            zonaSeleccionada.id
        );
    }

    /*
     * Obtiene los repuestos relacionados con
     * los servicios disponibles de una zona.
     */
    function cargarRepuestos(zonaId) {
        const servicioZona =
            servicios
                .filter(
                    (servicio) =>
                        servicio.zonaId ===
                        zonaId
                )
                .map(
                    (servicio) =>
                        servicio.id
                );

        const repuestoFiltro =
            servicioRepuestos
                .filter((item) =>
                    servicioZona.includes(
                        item.servicioId
                    )
                )
                .map(
                    (item) =>
                        item.repuestoId
                );

        setListRepuestoId(
            [...new Set(repuestoFiltro)]
        );
    }

    /*
     * Servicios completos seleccionados.
     */
    const serviciosSeleccionados =
        servicios.filter((servicio) =>
            servicioAgregado.includes(
                servicio.id
            )
        );

    /*
     * Repuestos completos seleccionados.
     */
    const repuestosSeleccionados =
        repuestos.filter((repuesto) =>
            repuestoAgregado.includes(
                repuesto.id
            )
        );

    /*
     * Total de servicios.
     */
    const totalServicios =
        serviciosSeleccionados.reduce(
            (total, servicio) =>
                total +
                servicio.precioBase,
            0
        );

    /*
     * Total de repuestos.
     */
    const totalRepuestos =
        repuestosSeleccionados.reduce(
            (total, repuesto) =>
                total +
                repuesto.precioVenta,
            0
        );

    const total =
        totalServicios +
        totalRepuestos;

    /*
     * Servicios de la zona actualmente seleccionada.
     */
    const serviciosDeZona =
        zona.id
            ? servicios.filter(
                  (servicio) =>
                      servicio.zonaId ===
                          zona.id &&
                      servicio.estado
              )
            : [];

    /*
     * Repuestos disponibles para la zona.
     */
    const repuestosDeZona =
        repuestos.filter((repuesto) =>
            listRepuestoId.includes(
                repuesto.id
            )
        );

    /*
     * Construye la estructura que necesita
     * DetalleServicio.
     *
     * No agregamos cantidades porque tu
     * selección solamente indica si está
     * seleccionado o no.
     */
    function construirDetalles() {
        return serviciosSeleccionados.map(
            (servicio) => ({
                servicioId:
                    servicio.id,

                cantidad: 1,

                precioUnitario:
                    servicio.precioBase,

                subtotal:
                    servicio.precioBase,

                observaciones: "",

                repuestos:
                    repuestosSeleccionados
                        .filter((repuesto) =>
                            servicioRepuestos.some(
                                (relacion) =>
                                    relacion.servicioId ===
                                        servicio.id &&
                                    relacion.repuestoId ===
                                        repuesto.id
                            )
                        )
                        .map((repuesto) => ({
                            repuestoId:
                                repuesto.id,

                            cantidad: 1,

                            precioUnitario:
                                repuesto.precioVenta,

                            subtotal:
                                repuesto.precioVenta,
                        })),
            })
        );
    }

    /*
     * Confirmar selección.
     */
    function handleConfirm() {
        const detalles =
            construirDetalles();

        onConfirm(detalles);
    }

    /*
     * Limpiar selección al cancelar.
     */
    function handleClose() {
        onClose();
    }

    return (
        <DetalleModal
            isOpen={isOpen}
            eyebrow="Orden de trabajo"
            title="Servicios y repuestos"
            modalId="servicios-repuestos-modal-title"
            onClose={handleClose}
        >
            <div className="orden-trabajo-main">

                {/* =====================================
                    PARTE SUPERIOR
                ====================================== */}

                <div className="orden-container">

                    {/* =================================
                        MOTOCICLETA
                    ================================== */}

                    <div className="moto-container">

                        <p>
                            <strong>
                                Seleccione una zona de
                                la motocicleta
                            </strong>
                        </p>

                        <img
                            src={hondaRevel}
                            className="moto-image"
                            alt="Motocicleta"
                        />

                        {zonasMoto.map(
                            (item) => (
                                <div
                                    key={item.id}
                                    className="zona"
                                    style={{
                                        left: `${item.x}%`,
                                        top: `${item.y}%`,
                                    }}
                                >
                                    <input
                                        type="radio"
                                        className="radio-custom"
                                        name="zonaMoto"
                                        value={
                                            item.nombre
                                        }
                                        checked={
                                            selected ===
                                            item.nombre
                                        }
                                        onChange={
                                            seleccionZona
                                        }
                                    />

                                    <span>
                                        {
                                            item.nombre
                                        }
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    {/* =================================
                        SERVICIOS / REPUESTOS
                    ================================== */}

                    <div className="zona-servicio">

                        <div>
                            <p>
                                <strong>
                                    Zona seleccionada
                                </strong>
                            </p>

                            <div className="zona-titulo">
                                {
                                    zona.nombre ??
                                    ""
                                }
                            </div>

                            <div className="zona-descripcion">
                                {
                                    zona.descripcion ??
                                    ""
                                }
                            </div>

                            <div className="zona-servicio-titulo">
                                Servicios disponibles
                            </div>

                            {serviciosDeZona.length >
                            0 ? (
                                serviciosDeZona.map(
                                    (
                                        servicio
                                    ) => (
                                        <div
                                            className="zona-check"
                                            key={
                                                servicio.id
                                            }
                                        >
                                            <input
                                                type="checkbox"
                                                className="checkbox-custom"
                                                checked={servicioAgregado.includes(
                                                    servicio.id
                                                )}
                                                onChange={() =>
                                                    manejoCambioServicio(
                                                        servicio.id
                                                    )
                                                }
                                            />

                                            <span>
                                                {
                                                    servicio.nombre
                                                }
                                            </span>
                                        </div>
                                    )
                                )
                            ) : (
                                <span>
                                    Seleccione una
                                    zona
                                </span>
                            )}
                        </div>

                        {/* =================================
                            REPUESTOS
                        ================================== */}

                        <div className="zona-servicio-inferior">

                            {repuestosDeZona.length >
                            0 ? (
                                <div>

                                    <div className="zona-servicio-titulo">
                                        Repuestos
                                        disponibles
                                    </div>

                                    {repuestosDeZona.map(
                                        (
                                            repuesto
                                        ) => (
                                            <div
                                                className="zona-check"
                                                key={
                                                    repuesto.id
                                                }
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="checkbox-custom"
                                                    checked={repuestoAgregado.includes(
                                                        repuesto.id
                                                    )}
                                                    onChange={() =>
                                                        manejoCambioRepuesto(
                                                            repuesto.id
                                                        )
                                                    }
                                                />

                                                <span>
                                                    {
                                                        repuesto.nombre
                                                    }
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* =====================================
                    SELECCIONADOS
                ====================================== */}

                <div className="container-bottom">

                    <div className="seleccion-item">

                        {/* SERVICIOS */}

                        <div>
                            <div className="seleccion-servicio-barra">

                                <div>
                                    Servicios
                                    seleccionados (
                                    {
                                        serviciosSeleccionados.length
                                    }
                                    )
                                </div>

                                <div className="total-pago-container">
                                    Total a pagar

                                    <span>
                                        {formatoMoneda(
                                            total,
                                            "PEN",
                                            "es-PE"
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="breadcrumb-container">
                                {serviciosSeleccionados.map(
                                    (
                                        servicio
                                    ) => (
                                        <div
                                            className="breadcrumb-item"
                                            key={
                                                servicio.id
                                            }
                                        >
                                            {
                                                servicio.nombre
                                            }

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    manejoCambioServicio(
                                                        servicio.id
                                                    )
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* REPUESTOS */}

                        <div>

                            <div className="seleccion-servicio-barra">
                                <div>
                                    Repuestos
                                    seleccionados (
                                    {
                                        repuestosSeleccionados.length
                                    }
                                    )
                                </div>
                            </div>

                            <div className="breadcrumb-container">
                                {repuestosSeleccionados.map(
                                    (
                                        repuesto
                                    ) => (
                                        <div
                                            className="breadcrumb-item"
                                            key={
                                                repuesto.id
                                            }
                                        >
                                            {
                                                repuesto.nombre
                                            }

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    manejoCambioRepuesto(
                                                        repuesto.id
                                                    )
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* =================================
                        BOTONERA
                    ================================== */}

                    <div className="botonera">

                        <button
                            type="button"
                            className="crud-page__cancel-button"
                            onClick={
                                handleClose
                            }
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="crud-page__primary-button"
                            onClick={
                                handleConfirm
                            }
                        >
                            Agregar selección
                        </button>

                    </div>
                </div>
            </div>
        </DetalleModal>
    );
}