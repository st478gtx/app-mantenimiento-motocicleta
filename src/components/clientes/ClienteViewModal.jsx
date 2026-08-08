import CrudModal from '../ui/CrudModal'

export default function ClienteViewModal({ isOpen, cliente, onClose }) {
  return (
    <CrudModal
      isOpen={isOpen && Boolean(cliente)}
      eyebrow="Cliente"
      title={cliente?.nombre ?? ''}
      modalId="clientes-view-modal-title"
      onClose={onClose}
    >
      <dl className="crud-view__grid">
        <div className="crud-view__item">
          <dt>Correo</dt>
          <dd>{cliente?.correo}</dd>
        </div>
        <div className="crud-view__item">
          <dt>Teléfono</dt>
          <dd>{cliente?.telefono}</dd>
        </div>
        <div className="crud-view__item">
          <dt>Distrito</dt>
          <dd>{cliente?.distrito}</dd>
        </div>
        <div className="crud-view__item">
          <dt>Estado</dt>
          <dd>{cliente?.activo ? 'Activo' : 'Inactivo'}</dd>
        </div>
        <div className="crud-view__item crud-view__item--full">
          <dt>Fecha de registro</dt>
          <dd>
            {cliente?.fechaRegistro
              ? new Date(cliente.fechaRegistro).toLocaleDateString('es-PE', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })
              : '—'}
          </dd>
        </div>
      </dl>

      <div className="crud-modal__actions">
        <button type="button" className="crud-modal__button crud-modal__button--primary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </CrudModal>
  )
}
