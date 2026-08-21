export default function CrudModal({ isOpen, eyebrow, title, modalId, compact, onClose, children, isOrden = false }) {
  if (!isOpen) {
    return null
  }

  let ordenModal = ''

  if(isOrden){
    ordenModal = 'extend'
  }

  return (
    <div className="crud-modal__overlay" role="presentation" onClick={onClose}>
      <div
        className={`crud-modal__panel${compact ? ' crud-modal__panel--compact' : ''} ${ordenModal}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="crud-modal__header">
          <div>
            <p className="crud-modal__eyebrow">{eyebrow}</p>
            <h2 id={modalId} className="crud-modal__title">{title}</h2>
          </div>
          <button type="button" className="crud-modal__close" onClick={onClose} aria-label="Cerrar modal">
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}
