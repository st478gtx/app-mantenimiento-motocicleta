import CrudModal from "../ui/CrudModal";

import { getMotocicletas } from "../../services/motocicletasService";
import { getClientes } from "../../services/clientesService";

function getOrdenRelations(orden) {
    const motocicleta = getMotocicletas().find(
        (moto) => moto.id === orden?.motocicletaId,
    );

    const cliente = getClientes().find(
        (cliente) => cliente.id === motocicleta?.clienteId,
    );

    return {
        motocicleta,
        cliente,
    };
}

export default function OrdenViewModal({ isOpen, orden, onClose }) {
    const { motocicleta, cliente } = getOrdenRelations(orden);

    return (
        <CrudModal
            isOpen={isOpen && Boolean(orden)}
            eyebrow="Orden de trabajo"
            title={`Orden #${orden?.id ?? ""}`}
            modalId="ordenes-view-modal-title"
            onClose={onClose}
        >
            <dl className="crud-view__grid">
                <div className="crud-view__item crud-view__item--full">
                    <dt>Cliente</dt>
                    <dd>
                        {cliente
                            ? `${cliente.nombre} ${cliente.apellido}`
                            : "—"}
                    </dd>
                </div>

                <div className="crud-view__item">
                    <dt>Placa</dt>
                    <dd>{motocicleta?.placa ?? "—"}</dd>
                </div>

                <div className="crud-view__item">
                    <dt>Motocicleta</dt>
                    <dd>
                        {motocicleta
                            ? `${motocicleta.marca} ${motocicleta.modelo}`
                            : "—"}
                    </dd>
                </div>

                <div className="crud-view__item">
                    <dt>Año</dt>
                    <dd>{motocicleta?.anio ?? "—"}</dd>
                </div>

                <div className="crud-view__item">
                    <dt>Color</dt>
                    <dd>{motocicleta?.color ?? "—"}</dd>
                </div>

                <div className="crud-view__item">
                    <dt>Kilometraje</dt>
                    <dd>
                        {orden?.kilometraje != null
                            ? `${orden.kilometraje.toLocaleString("es-PE")} km`
                            : "—"}
                    </dd>
                </div>

                <div className="crud-view__item">
                    <dt>Estado</dt>
                    <dd>{orden?.estado ?? "—"}</dd>
                </div>

                <div className="crud-view__item">
                    <dt>Fecha de ingreso</dt>
                    <dd>
                        {orden?.fechaIngreso
                            ? new Date(
                                  `${orden.fechaIngreso}T00:00:00`,
                              ).toLocaleDateString("es-PE")
                            : "—"}
                    </dd>
                </div>

                <div className="crud-view__item">
                    <dt>Fecha de entrega</dt>
                    <dd>
                        {orden?.fechaEntrega
                            ? new Date(
                                  `${orden.fechaEntrega}T00:00:00`,
                              ).toLocaleDateString("es-PE")
                            : "Pendiente"}
                    </dd>
                </div>

                <div className="crud-view__item crud-view__item--full">
                    <dt>Diagnóstico</dt>
                    <dd>{orden?.diagnostico ?? "—"}</dd>
                </div>

                <div className="crud-view__item crud-view__item--full">
                    <dt>Observaciones</dt>
                    <dd>{orden?.observaciones ?? "—"}</dd>
                </div>
            </dl>

            <div className="crud-modal__actions">
                <button
                    type="button"
                    className="crud-modal__button crud-modal__button--primary"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </CrudModal>
    );
}
