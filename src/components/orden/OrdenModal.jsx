import { useEffect, useState } from "react";

import CrudModal from "../ui/CrudModal";
import ClienteMotoSelector from "../ui/ClienteMotoSelector";
import ServicioRepuestoModal from "../orden/detalle/ServicioRepuestoModal";

import { servicios } from "../../data/servicio";
import { repuestos } from "../../data/repuesto";
import { getClientes } from "../../services/clientesService";
import { getMotocicletas } from "../../services/motocicletasService";
import { useFormValidation } from "../../utils/validarFormulario";
import { InputValidado } from "../ui/InputValidado";

const ESTADO_OPTIONS = [
    { label: "Pendiente", value: "PENDIENTE" },
    { label: "En proceso", value: "EN_PROCESO" },
    { label: "Finalizada", value: "FINALIZADA" },
];

function buildInitialFormData(initialOrden) {
    const motocicleta = getMotocicletas().find(
        (moto) => moto.id === initialOrden?.motocicletaId,
    );

    return {
        clienteId: motocicleta?.clienteId ?? "",
        motocicletaId: initialOrden?.motocicletaId ?? "",
        fechaIngreso: initialOrden?.fechaIngreso ?? "",
        fechaEntrega: initialOrden?.fechaEntrega ?? "",
        kilometraje: initialOrden?.kilometraje ?? "",
        estado: initialOrden?.estado ?? "PENDIENTE",
        diagnostico: initialOrden?.diagnostico ?? "",
        observaciones: initialOrden?.observaciones ?? "",
    };
}

export default function OrdenModal({
    isOpen,
    title,
    initialOrden,
    detallesIniciales = [],
    onClose,
    onSubmit,
}) {
    console.log(initialOrden);
    const [formData, setFormData] = useState(() =>
        buildInitialFormData(initialOrden),
    );

    const clientes = getClientes();
    const motocicletas = getMotocicletas();

    const [isServiciosModalOpen, setIsServiciosModalOpen] = useState(false);

    /*
     * Selecciones temporales de servicios y repuestos.
     *
     * Esta información todavía NO se guarda en localStorage.
     * Solamente pertenece al formulario actual.
     */
    const [detallesServicios, setDetallesServicios] = useState(() =>
        structuredClone(detallesIniciales),
    );

    useEffect(() => {
        console.log("detallesServicios CAMBIÓ:", detallesServicios);
    }, [detallesServicios]);

    const ordenRules = {
    clienteId: {
        required: true,
        notEqual: 0,
    },

    motocicletaId: {
        required: true,
        notEqual: 0,
    },

    fechaIngreso: {
        required: true,
    },

    kilometraje: {
        required: true,
        min: 0,
    },

    estado: {
        required: true,
    },

    diagnostico: {
        required: true,
        minLength: 5,
        maxLength: 500,
    },

    observaciones: {
        required: false,
        maxLength: 500,
    },
};

    const serviciosSeleccionados = detallesServicios
        .map((detalle) =>
            servicios.find(
                (servicio) => servicio.id === Number(detalle.servicioId),
            ),
        )
        .filter(Boolean);

    const repuestosSeleccionados = [
        ...new Map(
            detallesServicios
                .flatMap((detalle) =>
                    (detalle.repuestos ?? [])
                        .map((detalleRepuesto) =>
                            repuestos.find(
                                (x) => x.id == detalleRepuesto.repuestoId,
                            ),
                        )
                        .filter(Boolean),
                )
                .map((repuesto) => [repuesto.id, repuesto]),
        ).values(),
    ];
    const totalServicios = serviciosSeleccionados.reduce(
        (total, servicio) => total + Number(servicio.precioBase),
        0,
    );

    const totalRepuestos = repuestosSeleccionados.reduce(
        (total, repuesto) => total + Number(repuesto.precioVenta),
        0,
    );

    const totalDetalles = totalServicios + totalRepuestos;

    function handleClienteChange(clienteId) {
        setFormData((current) => ({
            ...current,
            clienteId,
            motocicletaId: "",
        }));
    }

    function handleMotocicletaChange(motocicletaId) {
        setFormData((current) => ({
            ...current,
            motocicletaId,
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }

    /*
     * Abre el modal de servicios y repuestos.
     */
    function openServiciosModal() {
        setIsServiciosModalOpen(true);
    }

    /*
     * Cierra el modal de servicios y repuestos.
     */
    function closeServiciosModal() {
        setIsServiciosModalOpen(false);
    }

    /*
     * Recibe la selección realizada en
     * ServicioRepuestoModal.
     */
    function handleDetallesConfirmados(detalles) {
        setDetallesServicios(structuredClone(detalles));

        closeServiciosModal();
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSubmit({
            motocicletaId: Number(formData.motocicletaId),

            fechaIngreso: formData.fechaIngreso,

            fechaEntrega: formData.fechaEntrega || null,

            kilometraje: Number(formData.kilometraje),

            estado: formData.estado,

            diagnostico: formData.diagnostico.trim(),

            observaciones: formData.observaciones.trim(),

            /*
             * Agregamos los detalles.
             */
            detallesServicios: structuredClone(detallesServicios),
        });
    }

    const tieneServicios = serviciosSeleccionados.length > 0;
    const formularioValido = useFormValidation(formData, ordenRules) && tieneServicios;

    return (
        <>
            <CrudModal
                isOpen={isOpen & !isServiciosModalOpen}
                eyebrow="Órdenes de trabajo"
                title={title}
                modalId="ordenes-modal-title"
                onClose={onClose}
            >
                <form className="crud-modal__form" onSubmit={handleSubmit}>
                    <ClienteMotoSelector
                        clientes={clientes}
                        motocicletas={motocicletas}
                        clienteId={formData.clienteId}
                        motocicletaId={formData.motocicletaId}
                        onClienteChange={handleClienteChange}
                        onMotocicletaChange={handleMotocicletaChange}
                    />

                    <label className="crud-modal__field">
                        <span>Fecha de ingreso</span>

                        <input
                            name="fechaIngreso"
                            type="date"
                            value={formData.fechaIngreso}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="crud-modal__field">
                        <span>Fecha de entrega</span>

                        <input
                            name="fechaEntrega"
                            type="date"
                            value={formData.fechaEntrega}
                            onChange={handleChange}
                        />
                    </label>

                    {/* <label className="crud-modal__field">
                        <span>Kilometraje</span>

                        <input
                            name="kilometraje"
                            type="number"
                            min="0"
                            value={formData.kilometraje}
                            onChange={handleChange}
                            required
                        />
                    </label> */}
                    <InputValidado 
                        label="Kilometraje"
                        name="kilometraje"
                        type="number"
                        style="crud-modal__field"
                        value={formData.kilometraje}
                        onChange={handleChange}
                        rules={ordenRules.kilometraje}
                        errorMessage="Solo se permiten cantidades positivas"
                        successMessage="Válido"
                    />

                    <label className="crud-modal__field">
                        <span>Estado</span>

                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            required
                        >
                            {ESTADO_OPTIONS.map((estado) => (
                                <option key={estado.value} value={estado.value}>
                                    {estado.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="crud-modal__field crud-modal__field--full">
                        <span>Diagnóstico</span>

                        <textarea
                            name="diagnostico"
                            value={formData.diagnostico}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </label>

                    <label className="crud-modal__field crud-modal__field--full">
                        <span>Observaciones</span>

                        <textarea
                            name="observaciones"
                            value={formData.observaciones}
                            onChange={handleChange}
                            rows="3"
                        />
                    </label>
                    <div className="crud-modal__field crud-modal__field--full">
                        <div className="orden-detalles">
                            <div className="orden-detalles__header">
                                <div>
                                    <span>Servicios y repuestos</span>

                                    <p>
                                        Servicios realizados y repuestos
                                        utilizados en la orden.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={openServiciosModal}
                                >
                                    {detallesServicios.length > 0
                                        ? "Modificar"
                                        : "Agregar servicios"}
                                </button>
                            </div>

                            {detallesServicios.length > 0 ? (
                                <div className="orden-detalles__list">
                                    <div className="orden-detalles__section">
                                        <span className="orden-detalles__subtitle">
                                            Servicios
                                        </span>

                                        <div className="breadcrumb-container">
                                            {serviciosSeleccionados.map(
                                                (servicio) => (
                                                    <div
                                                        key={servicio.id}
                                                        className="breadcrumb-item"
                                                    >
                                                        <span>
                                                            {servicio.nombre}
                                                        </span>

                                                        <strong>
                                                            S/{" "}
                                                            {Number(
                                                                servicio.precioBase,
                                                            ).toFixed(2)}
                                                        </strong>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    {repuestosSeleccionados.length > 0 && (
                                        <div className="orden-detalles__section">
                                            <span className="orden-detalles__subtitle">
                                                Repuestos
                                            </span>

                                            <div className="breadcrumb-container">
                                                {repuestosSeleccionados.map(
                                                    (repuesto) => (
                                                        <div
                                                            key={repuesto.id}
                                                            className="breadcrumb-item"
                                                        >
                                                            <span>
                                                                {
                                                                    repuesto.nombre
                                                                }
                                                            </span>

                                                            <strong>
                                                                S/{" "}
                                                                {Number(
                                                                    repuesto.precioVenta,
                                                                ).toFixed(2)}
                                                            </strong>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* TOTAL */}
                                    <div className="orden-detalles__total">
                                        <span>Total</span>

                                        <strong>
                                            S/ {totalDetalles.toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                            ) : (
                                <div className="orden-detalles__empty">
                                    <span>
                                        No hay servicios agregados a la orden.
                                    </span>

                                    <button
                                        type="button"
                                        onClick={openServiciosModal}
                                    >
                                        Agregar servicios y repuestos
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="crud-modal__actions">
                        <button
                            type="button"
                            className="crud-modal__button crud-modal__button--ghost"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="crud-modal__button crud-modal__button--primary"
                            disabled={!formularioValido}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </CrudModal>

            <ServicioRepuestoModal
                isOpen={isServiciosModalOpen}
                detallesIniciales={detallesServicios}
                onClose={closeServiciosModal}
                onConfirm={handleDetallesConfirmados}
            />
        </>
    );
}
