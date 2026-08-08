import CrudModal from '../ui/CrudModal'

export default function ConfirmDeleteModal({ isOpen, cliente, onCancel, onConfirm }) {
  return (
    <CrudModal
      isOpen={isOpen && Boolean(cliente)}
      eyebrow="Eliminar cliente"
      title="Confirmar eliminación"
      modalId="clientes-delete-modal-title"
      compact
      onClose={onCancel}
    >
      <p className="crud-modal__message">
        Vas a eliminar a <strong>{cliente?.nombre}</strong>. Esta acción no se puede deshacer.
      </p>

      <div className="crud-modal__actions">
        <button type="button" className="crud-modal__button crud-modal__button--ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="button" className="crud-modal__button crud-modal__button--danger" onClick={onConfirm}>
          Eliminar
        </button>
      </div>
    </CrudModal>
  )
}
