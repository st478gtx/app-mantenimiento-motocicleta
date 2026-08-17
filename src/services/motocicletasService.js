import { motocicletas as initialMotocicletas } from '../data/motocicleta'
import { crearMotocicletaConClienteDTO } from '../dto/motocicletaCliente'
import { obtenerNuevoId } from '../utils/crudHelpers'
import { getClientes } from './clientesService'
import { cloneItems, readStorage, writeStorage } from './storageService'

const STORAGE_KEY = 'mobiservice-motocicletas'

function read() {
  return readStorage(STORAGE_KEY, initialMotocicletas)
}

function write(motocicletas) {
  writeStorage(STORAGE_KEY, motocicletas)
}

function toDTO(motocicleta){
  return crearMotocicletaConClienteDTO(
    motocicleta,
    getClientes()
  )
}

export function getMotocicletas() {

  const motocicletas = read()

  return cloneItems(motocicletas.map(toDTO))
}

export function createMotocicleta(motoData) {
  const motocicletas = read()
  const nextMoto = {
    id: obtenerNuevoId(motocicletas),
    clienteId: Number(motoData.clienteId),
    placa: motoData.placa.trim(),
    marca: motoData.marca.trim(),
    modelo: motoData.modelo.trim(),
    anio: Number(motoData.anio),
    color: motoData.color.trim(),
    tipo: motoData.tipo.trim(),
    activo: motoData.activo,
    fechaIngreso: new Date().toISOString().slice(0, 10),
    kilometraje: Number(motoData.kilometraje)
  }

  const next = [nextMoto, ...motocicletas]
  write(next)

  return cloneItems(next.map(toDTO))
}

export function updateMotocicleta(motoId, motoData) {
  const motocicletas = read()
  const next = motocicletas.map((moto) =>
    moto.id === motoId
      ? {
        ...moto,
        placa: motoData.placa.trim(),
        marca: motoData.marca.trim(),
        color: motoData.color.trim(),
        modelo: motoData.modelo.trim(),
        tipo: motoData.tipo.trim(),
        anio: Number(motoData.anio),
        activo: motoData.activo,
        kilometraje: Number(motoData.kilometraje),
        clienteId: Number(motoData.clienteId)
      }
      : moto
  )

  write(next)

  return cloneItems(next.map(toDTO))
}

export function deleteMotocicleta(motoId) {
  const next = read().filter((moto) => moto.id !== motoId)

  write(next)

  return cloneItems(next.map(toDTO))
}
