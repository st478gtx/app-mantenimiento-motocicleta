import { motocicletas as initialMotocicletas } from '../data/staticData'
import { buildNextId, cloneItems, readStorage, writeStorage } from './storageService'

const STORAGE_KEY = 'mobiservice-motocicletas'

function read() {
  return readStorage(STORAGE_KEY, initialMotocicletas)
}

function write(motocicletas) {
  writeStorage(STORAGE_KEY, motocicletas)
}

export function getMotocicletas() {
  return read()
}

export function createMotocicleta(motoData) {
  const motocicletas = read()
  const nextMoto = {
    id: buildNextId(motocicletas, 'MOT'),
    nombre: motoData.nombre.trim(),
    color: motoData.color.trim(),
    tipo: motoData.tipo.trim(),
    año: Number(motoData.año),
    activo: motoData.activo,
    fechaIngreso: new Date().toISOString().slice(0, 10),
    cliente: motoData.cliente
  }

  const next = [nextMoto, ...motocicletas]
  write(next)

  return cloneItems(next)
}

export function updateMotocicleta(motoId, motoData) {
  const motocicletas = read()
  const next = motocicletas.map((moto) =>
    moto.id === motoId
      ? {
          ...moto,
          nombre: motoData.nombre.trim(),
          color: motoData.color.trim(),
          tipo: motoData.tipo.trim(),
          año: Number(motoData.año),
          activo: motoData.activo,
          cliente: motoData.cliente
        }
      : moto
  )

  write(next)

  return cloneItems(next)
}

export function deleteMotocicleta(motoId) {
  const next = read().filter((moto) => moto.id !== motoId)

  write(next)

  return cloneItems(next)
}
