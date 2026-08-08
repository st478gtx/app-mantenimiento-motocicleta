export function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function cloneItems(items) {
  return items.map((item) => ({ ...item }))
}

export function readStorage(key, fallback) {
  if (!canUseStorage()) return cloneItems(fallback)

  const raw = window.localStorage.getItem(key)

  if (!raw) return cloneItems(fallback)

  try {
    const parsed = JSON.parse(raw)

    return Array.isArray(parsed) ? cloneItems(parsed) : cloneItems(fallback)
  } catch {
    return cloneItems(fallback)
  }
}

export function writeStorage(key, items) {
  if (canUseStorage()) {
    window.localStorage.setItem(key, JSON.stringify(items))
  }
}

export function buildNextId(items, prefix) {
  const maxNumericId = items.reduce((max, item) => {
    const numericPart = Number.parseInt(String(item.id).replace(/\D/g, ''), 10)

    return Number.isNaN(numericPart) ? max : Math.max(max, numericPart)
  }, 0)

  return `${prefix}-${String(maxNumericId + 1).padStart(3, '0')}`
}
