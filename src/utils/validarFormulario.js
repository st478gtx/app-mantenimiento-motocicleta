import { validateValue } from './validadores';

export function useFormValidation(formData, rules) {

    const formularioValido = Object.entries(rules).every(
        ([campo, reglas]) => {
            return validateValue(formData[campo], reglas);
        }
    );    

    return formularioValido;
}