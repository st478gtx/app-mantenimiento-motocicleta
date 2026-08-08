import { useState } from 'react'
import CrudModal from '../ui/CrudModal'

function buildInitialFormData(initialClient) {
  return {
    nombre: initialClient?.nombre ?? '',
    correo: initialClient?.correo ?? '',
    telefono: initialClient?.telefono ?? '',
    distrito: initialClient?.distrito ?? '',
    activo: initialClient?.activo ?? true
  }
}

export default function ClienteModal({ isOpen, title, initialClient, onClose, onSubmit }) {
  const [formData, setFormData] = useState(() => buildInitialFormData(initialClient))

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <CrudModal
      isOpen={isOpen}
      eyebrow="Clientes"
      title={title}
      modalId="clientes-modal-title"
      onClose={onClose}
    >
      <form className="clientes-modal__form" onSubmit={handleSubmit}>
        <label className="clientes-modal__field">
          <span>Nombre</span>
          <input name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>

        <label className="clientes-modal__field">
          <span>Correo</span>
          <input name="correo" type="email" value={formData.correo} onChange={handleChange} required />
        </label>

        <label className="clientes-modal__field">
          <span>Teléfono</span>
          <input name="telefono" value={formData.telefono} onChange={handleChange} required />
        </label>

        <label className="clientes-modal__field">
          <span>Distrito</span>
          <input name="distrito" value={formData.distrito} onChange={handleChange} required />
        </label>

        <label className="clientes-modal__checkbox">
          <input name="activo" type="checkbox" checked={formData.activo} onChange={handleChange} />
          <span>Cliente activo</span>
        </label>

        <div className="crud-modal__actions">
          <button type="button" className="crud-modal__button crud-modal__button--ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="crud-modal__button crud-modal__button--primary">
            Guardar
          </button>
        </div>
      </form>
    </CrudModal>
  )
}
