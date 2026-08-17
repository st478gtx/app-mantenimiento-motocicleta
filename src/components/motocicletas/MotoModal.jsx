import { useState } from 'react'
import CrudModal from '../ui/CrudModal'
import { getClientes } from '../../services/clientesService'
import { regexColor, regexNombre, regexPlaca } from '../../utils/validadores'
import { InputValidado } from '../ui/InputValidado'
import { useFormValidation } from '../../utils/validarFormulario'

const TIPO_OPTIONS = ['Deportiva', 'Naked', 'Scooter', 'Touring', 'Cross', 'Otra']

function buildInitialFormData(initialMoto) {  

  return {
    marca: initialMoto?.marca ?? '',
    placa: initialMoto?.placa ?? '',
    color: initialMoto?.color ?? '',
    modelo: initialMoto?.modelo ?? '',
    tipo: initialMoto?.tipo ?? TIPO_OPTIONS[0],
    anio: initialMoto?.anio ?? new Date().getFullYear(),
    activo: initialMoto?.activo ?? true,
    //kilometraje: initialMoto?.kilometraje ?? '',
    clienteId: initialMoto?.clienteId ?? ''
  }
}

export default function MotoModal({ isOpen, title, initialMoto, onClose, onSubmit }) {
  const [formData, setFormData] = useState(() => buildInitialFormData(initialMoto))
  const clientes = getClientes()

  const reglasMoto = {
    marca: {
        required: true,
        regex: regexNombre,
        minLength: 2,
        maxLength: 30,
    },

    placa: {
        required: true,
        regex: regexPlaca,
    },

    modelo: {
        required: false,
        regex: regexNombre,
        minLength: 2,
        maxLength: 30,
    },

    anio: {
        required: true,
        regex: /^\d{4}$/,
        min: 1901,
        max: 2100,
    },

    color: {
        required: true,
        regex: regexColor,
        minLength: 2,
        maxLength: 30,
    },

    tipo: {
        required: true,
        regex: regexNombre,
    },

    // kilometraje: {
    //     required: true,
    //     regex: /^\d+$/,
    //     min: 0,
    // },

    clienteId: {
        required: true,
        notEqual: 0,
    },
  };

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

    onSubmit({
      marca: formData.marca.trim(),
      placa: formData.placa.trim(),
      modelo:formData.modelo.trim(),
      anio: Number(formData.anio),
      color: formData.color.trim(),
      tipo: formData.tipo,
      //kilometraje: Number(formData.kilometraje),
      activo: formData.activo,
      clienteId: Number(formData.clienteId)
    })
  }

  const formularioValido = useFormValidation(
    formData,
    reglasMoto
  );

  return (
    <CrudModal
      isOpen={isOpen}
      eyebrow="Motocicletas"
      title={title}
      modalId="motos-modal-title"
      onClose={onClose}
    >
      <form className="crud-modal__form" onSubmit={handleSubmit}>        

        <InputValidado
          label="Marca"
          name="marca"
          style="crud-modal__field"
          value={formData.marca}
          onChange={handleChange}
          rules={reglasMoto.marca}
          errorMessage="Solo se permiten letras y espacios"
          successMessage="Marca válida"
        />

        <InputValidado
          label="Color"
          name="color"
          style="crud-modal__field"
          value={formData.color}
          onChange={handleChange}
          rules={reglasMoto.color}
          errorMessage="Solo se permiten letras y espacios"
          successMessage="Color válido"
        />

        <InputValidado
          label="Modelo"
          name="modelo"
          style="crud-modal__field"
          value={formData.modelo}
          onChange={handleChange}
          rules={reglasMoto.modelo}
          errorMessage="Solo se permiten letras y espacios"
          successMessage="Modelo válido"
        />

        <label className="crud-modal__field">
          <span>Tipo</span>
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            {TIPO_OPTIONS.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </label>

        <InputValidado
          label="Año"
          name="anio"
          type='number'
          style="crud-modal__field"
          value={formData.anio}
          onChange={handleChange}
          rules={reglasMoto.anio}
          errorMessage="Año no válido"
          successMessage="Año en rango"
        />

        <InputValidado
          label="Placa"
          name="placa"
          style="crud-modal__field"
          value={formData.placa}
          onChange={handleChange}
          rules={reglasMoto.placa}
          errorMessage="Formato de placa inválido"
          successMessage="Placa válida"
        />

        <label className="crud-modal__field crud-modal__field--full">
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
          <button type="submit" className="crud-modal__button crud-modal__button--primary" disabled={!formularioValido}>
            Guardar
          </button>
        </div>
      </form>
    </CrudModal>
  )
}
