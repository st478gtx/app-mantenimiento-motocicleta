import CrudModal from "../ui/CrudModal";

export default function OrdenConfirmDeleteModal({
    isOpen,
    orden,
    onCancel,
    onConfirm,
}) {
    return (
        <CrudModal
            isOpen={isOpen && Boolean(orden)}
            eyebrow="Eliminar orden"
            title="Confirmar eliminación"
            modalId="ordenes-delete-modal-title"
            compact
            onClose={onCancel}
        >
            <p className="crud-modal__message">
                Vas a eliminar la orden <strong>#{orden?.id}</strong>. Esta
                acción no se puede deshacer.
            </p>

            <div className="crud-modal__actions">
                <button
                    type="button"
                    className="crud-modal__button crud-modal__button--ghost"
                    onClick={onCancel}
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    className="crud-modal__button crud-modal__button--danger"
                    onClick={onConfirm}
                >
                    Eliminar
                </button>
            </div>
        </CrudModal>
    );
}
