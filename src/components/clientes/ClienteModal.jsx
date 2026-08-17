import { useState } from 'react'
import CrudModal from '../ui/CrudModal'
import { InputValidado } from '../ui/InputValidado'
import { regexCorreo, regexDistrito, regexNombre, regexTelefono } from '../../utils/validadores'
import { useFormValidation } from '../../utils/validarFormulario'

function buildInitialFormData(initialClient) {
  return {
    nombre: initialClient?.nombre ?? '',
    apellido: initialClient?.apellido ?? '',
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

  const reglasCliente = {
    nombre: {
        regex: regexNombre,
        required: true,
        minLength: 3,
    },
    distrito: {
        regex: regexDistrito,
        required: true,
        minLength: 3,
    },
    telefono: {
        regex: regexTelefono,
        required: true,
        minLength: 9,
    },
    correo: {
        regex: regexCorreo,
        required: true,
        minLength: 6,
    },
};

  const formularioValido = useFormValidation(formData, reglasCliente);

  return (
    <CrudModal
      isOpen={isOpen}
      eyebrow="Clientes"
      title={title}
      modalId="clientes-modal-title"
      onClose={onClose}
    >
      <form className="crud-modal__form" onSubmit={handleSubmit}>        
        <InputValidado
          label="Nombre"
          name="nombre"
          style="crud-modal__field"
          value={formData.nombre}
          onChange={handleChange}
          rules={reglasCliente.nombre}
          errorMessage="Solo se permiten letras y espacios"
          successMessage="Nombre válido"
        />

        <InputValidado
          label="Correo"
          name="correo"
          style="crud-modal__field"
          value={formData.correo}
          onChange={handleChange}
          rules={reglasCliente.correo}
          errorMessage="Formato de correo inválido"
          successMessage="Correo válido"
        />

        <InputValidado
          label="Teléfono"
          name="telefono"
          style="crud-modal__field"
          value={formData.telefono}
          onChange={handleChange}
          rules={reglasCliente.telefono}
          errorMessage="Formato de teléfono inválido"
          successMessage="Teléfono válido"
        />

        <InputValidado
          label="Distrito"
          name="distrito"
          style="crud-modal__field"
          value={formData.distrito}
          onChange={handleChange}
          rules={reglasCliente.distrito}
          errorMessage="Solo ser permiten letras y espacios"
          successMessage="Distrito válido"
        />

        <label className="crud-modal__checkbox">
          <input name="activo" type="checkbox" checked={formData.activo} onChange={handleChange} />
          <span>Cliente activo</span>
        </label>

        <div className="crud-modal__actions">
          <button type="button" className="crud-modal__button crud-modal__button--ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="crud-modal__button crud-modal__button--primary" disabled={!formularioValido}>
            Guardar
          </button>
        </div>
      </form>
    </CrudModal>
  )
}
