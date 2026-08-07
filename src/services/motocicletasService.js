import { simulateAsync } from './mockApi'

const motocicletas = [
  {
    id: 'MOT-001',
    nombre: 'Yamaha R1',
    color: 'Azul',
    tipo: 'Deportiva',
    año: 2025,
    activo: true,
    fechaIngreso: '2025-09-02'
  },
  {
    id: 'MOT-002',
    nombre: 'Honda CBR600RR',
    color: 'Rojo',
    tipo: 'Deportiva',
    año: 2024,
    activo: true,
    fechaIngreso: '2025-09-07'
  },
  {
    id: 'MOT-003',
    nombre: 'Kawasaki Ninja ZX-6R',
    color: 'Verde',
    tipo: 'Deportiva',
    año: 2023,
    activo: false,
    fechaIngreso: '2025-09-12'
  },
  {
    id: 'MOT-004',
    nombre: 'Suzuki GSX-R750',
    color: 'Negro',
    tipo: 'Deportiva',
    año: 2022,
    activo: true,
    fechaIngreso: '2025-09-16'
  }
]

const motocicletasService = {
  async listar() {
    return simulateAsync(cloneArray(motocicletas))
  }
}

export default motocicletasService
