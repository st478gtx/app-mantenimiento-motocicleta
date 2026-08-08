import { clientes as initialClientes } from '../data/staticData'
import { buildNextId, cloneItems, readStorage, writeStorage } from './storageService'

const STORAGE_KEY = 'mobiservice-clientes'

function read() {
  return readStorage(STORAGE_KEY, initialClientes)
}

function write(clientes) {
  writeStorage(STORAGE_KEY, clientes)
}

export function getClientes() {
  return read()
}

export function createCliente(clienteData) {
  const clientes = read()
  const nextCliente = {
    id: buildNextId(clientes, 'CLI'),
    nombre: clienteData.nombre.trim(),
    correo: clienteData.correo.trim(),
    telefono: clienteData.telefono.trim(),
    distrito: clienteData.distrito.trim(),
    activo: clienteData.activo,
    fechaRegistro: new Date().toISOString().slice(0, 10)
  }

  const next = [nextCliente, ...clientes]
  write(next)

  return cloneItems(next)
}

export function updateCliente(clienteId, clienteData) {
  const clientes = read()
  const next = clientes.map((cliente) =>
    cliente.id === clienteId
      ? {
          ...cliente,
          nombre: clienteData.nombre.trim(),
          correo: clienteData.correo.trim(),
          telefono: clienteData.telefono.trim(),
          distrito: clienteData.distrito.trim(),
          activo: clienteData.activo
        }
      : cliente
  )

  write(next)

  return cloneItems(next)
}

export function deleteCliente(clienteId) {
  const next = read().filter((cliente) => cliente.id !== clienteId)

  write(next)

  return cloneItems(next)
}
