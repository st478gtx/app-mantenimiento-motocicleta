import { useState } from 'react'
import CrudModal from '../ui/CrudModal'
import { getClientes } from '../../services/clientesService'

const TIPO_OPTIONS = ['Deportiva', 'Naked', 'Scooter', 'Touring', 'Cross', 'Otra']

function buildInitialFormData(initialMoto) {
  return {
    nombre: initialMoto?.nombre ?? '',
    color: initialMoto?.color ?? '',
    tipo: initialMoto?.tipo ?? TIPO_OPTIONS[0],
    año: initialMoto?.año ?? new Date().getFullYear(),
    activo: initialMoto?.activo ?? true,
    clienteId: initialMoto?.cliente?.id ?? ''
  }
}

export default function MotoModal({ isOpen, title, initialMoto, onClose, onSubmit }) {
  const [formData, setFormData] = useState(() => buildInitialFormData(initialMoto))
  const clientes = getClientes()

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const cliente = clientes.find((c) => c.id === formData.clienteId)

    onSubmit({
      nombre: formData.nombre.trim(),
      color: formData.color.trim(),
      tipo: formData.tipo,
      año: Number(formData.año),
      activo: formData.activo,
      cliente: cliente ? { id: cliente.id, nombre: cliente.nombre } : null
    })
  }

  return (
    <CrudModal
      isOpen={isOpen}
      eyebrow="Motocicletas"
      title={title}
      modalId="motos-modal-title"
      onClose={onClose}
    >
      <form className="crud-modal__form" onSubmit={handleSubmit}>
        <label className="crud-modal__field">
          <span>Nombre</span>
          <input name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>

        <label className="crud-modal__field">
          <span>Color</span>
          <input name="color" value={formData.color} onChange={handleChange} required />
        </label>

        <label className="crud-modal__field">
          <span>Tipo</span>
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            {TIPO_OPTIONS.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </label>

        <label className="crud-modal__field">
          <span>Año</span>
          <input name="año" type="number" value={formData.año} onChange={handleChange} min="1900" max="2100" required />
        </label>

        <label className="crud-modal__field crud-modal__field--full">
          <span>Cliente</span>
          <select name="clienteId" value={formData.clienteId} onChange={handleChange} required>
            <option value="">Seleccionar cliente...</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
            ))}
          </select>
        </label>

        <label className="crud-modal__checkbox">
          <input name="activo" type="checkbox" checked={formData.activo} onChange={handleChange} />
          <span>Motocicleta activa</span>
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
