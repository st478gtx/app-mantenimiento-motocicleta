import CrudModal from '../ui/CrudModal'

export default function MotoConfirmDeleteModal({ isOpen, moto, onCancel, onConfirm }) {
  return (
    <CrudModal
      isOpen={isOpen && Boolean(moto)}
      eyebrow="Eliminar motocicleta"
      title="Confirmar eliminación"
      modalId="motos-delete-modal-title"
      compact
      onClose={onCancel}
    >
      <p className="crud-modal__message">
        Vas a eliminar <strong>{moto?.nombre}</strong>. Esta acción no se puede deshacer.
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
