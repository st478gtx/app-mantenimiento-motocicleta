
export function formatoId(id, tipo = "OT") {
    return `${tipo}-${String(id).padStart(3, '0')}`;
}