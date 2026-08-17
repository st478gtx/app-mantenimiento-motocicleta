import { useState } from 'react'
import CrudModal from '../ui/CrudModal'
import { getClientes } from '../../services/clientesService'

const TIPO_OPTIONS = ['Deportiva', 'Naked', 'Scooter', 'Touring', 'Cross', 'Otra']

function buildInitialFormData(initialMoto) {  

  console.log("initialMoto: ", initialMoto)

  return {
    marca: initialMoto?.marca ?? '',
    placa: initialMoto?.placa ?? '',
    color: initialMoto?.color ?? '',
    modelo: initialMoto?.modelo ?? '',
    tipo: initialMoto?.tipo ?? TIPO_OPTIONS[0],
    anio: initialMoto?.anio ?? new Date().getFullYear(),
    activo: initialMoto?.activo ?? true,
    kilometraje: initialMoto?.kilometraje ?? '',
    clienteId: initialMoto?.clienteId ?? ''
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

  function handleClienteChange(clienteId) {
    setFormData((current) => ({
      ...current,
      clienteId
    }) )
  }

  function handleSubmit(event) {
    event.preventDefault()   
    console.log("formData: ", formData)

    onSubmit({
      marca: formData.marca.trim(),
      placa: formData.placa.trim(),
      modelo:formData.modelo.trim(),
      anio: Number(formData.anio),
      color: formData.color.trim(),
      tipo: formData.tipo,
      kilometraje: Number(formData.kilometraje),
      activo: formData.activo,
      clienteId: Number(formData.clienteId)
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
          <span>Marca</span>
          <input name="marca" value={formData.marca} onChange={handleChange} required />
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
          <input name="anio" type="number" value={formData.anio} onChange={handleChange} min="1900" max="2100" required />
        </label>
        <label className="crud-modal__field">
          <span>Placa</span>
          <input name="placa" type="text" value={formData.placa} onChange={handleChange} required />
        </label>

        <label className="crud-modal__field">
          <span>Cliente</span>
          <select name="clienteId" value={formData.clienteId} onChange={(e) => handleClienteChange(e.target.value)} required>
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
