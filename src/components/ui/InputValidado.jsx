import { useState } from "react";
import '../ui/CrudModal.css'
import { validateValue } from "../../utils/validadores";

export function InputValidado({
    label,
    name,
    value,
    onChange,
    rules = {},
    style,
    successMessage = 'Correcto',
    errorMessage = 'Valor inválido',
    placeholder = '',
    type = 'text',
    disabled = false,
}) {
    const [touched, setTouched] = useState(false);

    const esVacio = String(value ?? '').trim() === '';
    
    const esValido = validateValue(value, rules);
    
    const mostrarError = touched && !esValido;
    const mostrarExito = touched && esValido && !esVacio;

    function handleChange(event) {
        setTouched(true)
        onChange(event);
    }  

    return (
        <label className={style}>

            <div className="input-header">
                {label}
                {rules.required && <span> *</span>}
            </div>

            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                className={
                    mostrarError
                        ? 'input-error'
                        : mostrarExito
                            ? 'input-success'
                            : ''
                }
            />

            {mostrarError && (
                <span className="input-message error">
                    {esVacio && rules.required
                        ? `${label} es obligatorio`
                        :  errorMessage
                    }
                </span>
            )}

            {mostrarExito && (
                <span className="input-message success">
                    ✓ {successMessage}
                </span>
            )}

        </label>
    );
}