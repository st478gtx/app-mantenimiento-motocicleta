export const clientes = [
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

export const motocicletas = [
  {
    id: 'MOT-001',
    nombre: 'Yamaha R1',
    color: 'Azul',
    tipo: 'Deportiva',
    año: 2025,
    activo: true,
    fechaIngreso: '2025-09-02',
    cliente: {
      id: 'CLI-001',
      nombre: 'Ana Torres'
    },
  },
  {
    id: 'MOT-002',
    nombre: 'Honda CBR600RR',
    color: 'Rojo',
    tipo: 'Deportiva',
    año: 2024,
    activo: true,
    fechaIngreso: '2025-09-07',
    cliente: {
      id: 'CLI-002',
      nombre: 'Carlos Vega'
    },
  },
  {
    id: 'MOT-003',
    nombre: 'Kawasaki Ninja ZX-6R',
    color: 'Verde',
    tipo: 'Deportiva',
    año: 2023,
    activo: false,
    fechaIngreso: '2025-09-12',
    cliente: {
      id: 'CLI-003',
      nombre: 'Lucia Ramos'
    },
  },
  {
    id: 'MOT-004',
    nombre: 'Suzuki GSX-R750',
    color: 'Negro',
    tipo: 'Deportiva',
    año: 2022,
    activo: true,
    fechaIngreso: '2025-09-16',
    cliente: {
      id: 'CLI-004',
      nombre: 'Mario Salas'
    },
  }
]

import { ORDENES_ESTADOS } from '../util/constants'

export const ordenes = [
  {
    id: 1,
    cliente: {
      id: 'CLI-001',
      nombre: 'Ana Torres'
    },
    motocicleta: {
      id: 'MOT-001',
      nombre: 'Yamaha R1'
    },
    fecha: '2024-06-01',
    estado: ORDENES_ESTADOS.EN_PROGRESO
  },
  {
    id: 2,
    cliente: {
      id: 'CLI-002',
      nombre: 'Carlos Vega'
    },
    motocicleta: {
      id: 'MOT-002',
      nombre: 'Honda CBR600RR'
    },
    fecha: '2024-06-02',
    estado: ORDENES_ESTADOS.COMPLETADA
  },
  {
    id: 3,
    cliente: {
      id: 'CLI-003',
      nombre: 'Lucia Ramos'
    },
    motocicleta: {
      id: 'MOT-003',
      nombre: 'Kawasaki Ninja ZX-6R'
    },
    fecha: '2024-06-03',
    estado: ORDENES_ESTADOS.PENDIENTE
  },
  {
    id: 4,
    cliente: {
      id: 'CLI-004',
      nombre: 'Mario Salas'
    },
    motocicleta: {
      id: 'MOT-004',
      nombre: 'Suzuki GSX-R750'
    },
    fecha: '2024-06-04',
    estado: ORDENES_ESTADOS.EN_PROGRESO
  },
  {
    id: 5,
    cliente: {
      id: 'CLI-004',
      nombre: 'Mario Salas'
    },
    motocicleta: {
      id: 'MOT-004',
      nombre: 'Suzuki GSX-R750'
    },
    fecha: '2024-06-05',
    estado: ORDENES_ESTADOS.COMPLETADA
  }
]