import { simulateAsync } from './mockApi'

const clientes = [
  {
    id: 'CLI-001',
    nombre: 'Ana Torres',
    correo: 'ana.torres@correo.com',
    telefono: '+51 955 112 441',
    distrito: 'Miraflores',
    activo: true,
    fechaRegistro: '2026-08-02'
  },
  {
    id: 'CLI-002',
    nombre: 'Carlos Vega',
    correo: 'carlos.vega@correo.com',
    telefono: '+51 955 112 442',
    distrito: 'Surco',
    activo: true,
    fechaRegistro: '2026-08-11'
  },
  {
    id: 'CLI-003',
    nombre: 'Lucia Ramos',
    correo: 'lucia.ramos@correo.com',
    telefono: '+51 955 112 443',
    distrito: 'San Borja',
    activo: false,
    fechaRegistro: '2026-07-14'
  },
  {
    id: 'CLI-004',
    nombre: 'Mario Salas',
    correo: 'mario.salas@correo.com',
    telefono: '+51 955 112 444',
    distrito: 'La Molina',
    activo: true,
    fechaRegistro: '2026-07-25'
  },
  {
    id: 'CLI-005',
    nombre: 'Elena Prado',
    correo: 'elena.prado@correo.com',
    telefono: '+51 955 112 445',
    distrito: 'Magdalena',
    activo: true,
    fechaRegistro: '2026-06-18'
  }
]

const clientesService = {
  async listarClientes() {
    return simulateAsync([...clientes])
  }
}

export default clientesService
