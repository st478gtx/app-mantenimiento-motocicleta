import CrudModal from '../ui/CrudModal'

export default function MotoViewModal({ isOpen, moto, onClose }) {
  return (
    <CrudModal
      isOpen={isOpen && Boolean(moto)}
      eyebrow="Motocicleta"
      title={moto?.nombre ?? ''}
      modalId="motos-view-modal-title"
      onClose={onClose}
    >
      <dl className="crud-view__grid">
        <div className="crud-view__item">
          <dt>Año</dt>
          <dd>{moto?.anio}</dd>
        </div>
        <div className="crud-view__item">
          <dt>Tipo</dt>
          <dd>{moto?.tipo}</dd>
        </div>
        <div className="crud-view__item">
          <dt>Color</dt>
          <dd>{moto?.color}</dd>
        </div>
        <div className="crud-view__item">
          <dt>Estado</dt>
          <dd>{moto?.activo ? 'Activo' : 'Inactivo'}</dd>
        </div>
        <div className="crud-view__item crud-view__item--full">
          <dt>Cliente</dt>
          <dd>{moto?.clienteNombre ?? '—'}</dd>
        </div>
        <div className="crud-view__item crud-view__item--full">
          <dt>Fecha de ingreso</dt>
          <dd>
            {moto?.fechaIngreso
              ? new Date(moto.fechaIngreso).toLocaleDateString('es-PE', {
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
