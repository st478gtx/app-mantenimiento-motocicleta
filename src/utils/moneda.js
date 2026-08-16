export function formatoMoneda(amount, currency, locale = "en-US") {
    // Valida monto
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Monto inválido: debe ser un número válido.");
    }

    // Validata codido de moneda
    if (typeof currency !== "string" || currency.length !== 3) {
        throw new Error("Moneda inválida: debe ser 3 letras de codigo ISO 4217.");
    }

    // Formato
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}