// Nombre y apellido: solo letras y espacios
export const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;

// DNI exactamente 8 dígitos
export const regexDni = /^\d{8}$/;

// Celular empieza en 9 y tiene 9 dígitos
export const regexTelefono = /^9\d{8}$/;

// Correo
export const regexCorreo = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/;

// Placa: GHT-652
export const regexPlaca = /^[A-Z0-9]+-[A-Z0-9]+$/i;

// Dirección: letras, números, espacios y algunos caracteres comunes
export const regexDireccion = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s.,#°-]+$/;

// Distrito: letras y espacios
export const regexDistrito = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;

// Marca / modelo: letras, números, espacios y guiones
export const regexMarcaModelo = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s-]+$/;

// Color: letras y espacios
export const regexColor = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;

// Año: 4 dígitos
export const regexAnio = /^\d{4}$/;

// Kilometraje: solamente números enteros
export const regexKilometraje = /^\d+$/;

// Precio: números enteros o decimales
export const regexPrecio = /^\d+(\.\d{1,2})?$/;

// Cantidad: entero positivo
export const regexCantidad = /^[1-9]\d*$/;


export function validateValue(value, rules = {}) {
    const text = String(value ?? '').trim();

    if (rules.required && text === '') {
        return false;
    }

    if (
        rules.notEqual !== undefined &&
        String(value) === String(rules.notEqual)
    ) {
        return false;
    }

    if (!rules.required && text === '') {
        return true;
    }

    if (
        rules.minLength !== undefined &&
        text.length < rules.minLength
    ) {
        return false;
    }

    if (
        rules.maxLength !== undefined &&
        text.length > rules.maxLength
    ) {
        return false;
    }

    if (rules.regex && !rules.regex.test(text)) {
        return false;
    }

    if (
        rules.min !== undefined &&
        Number(text) < rules.min
    ) {
        return false;
    }

    if (
        rules.max !== undefined &&
        Number(text) > rules.max
    ) {
        return false;
    }

    return true;
}