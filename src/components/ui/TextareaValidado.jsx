import { useState } from "react";
import { validateValue } from "../../utils/validadores";

export function TextareaValidado({
    label,
    name,
    value,
    onChange,
    rules = {},
    style,
    successMessage = 'Correcto',
    errorMessage = 'Valor inválido',
    placeholder = '',
    disabled = false,
    rows = 4,
}) {
    const [touched, setTouched] = useState(false);

    const esVacio = String(value ?? '').trim() === '';

    const esValido = validateValue(value, rules);

    const mostrarError = touched && !esValido;
    const mostrarExito = touched && esValido && !esVacio;

    function handleChange(event) {
        setTouched(true);
        onChange(event);
    }

    return (
        <label className={style}>

            <div className="textarea-header">
                {label}
                {rules.required && <span> *</span>}
            </div>

            <textarea
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                className={
                    mostrarError
                        ? 'textarea-error'
                        : mostrarExito
                            ? 'textarea-success'
                            : ''
                }
            />

            {mostrarError && (
                <span className="textarea-message error">
                    {esVacio && rules.required
                        ? `${label} es obligatorio`
                        : errorMessage
                    }
                </span>
            )}

            {mostrarExito && (
                <span className="textarea-message success">
                    ✓ {successMessage}
                </span>
            )}

        </label>
    );
}