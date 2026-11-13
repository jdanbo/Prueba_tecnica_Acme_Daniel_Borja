import { ValidationError } from '../errors/ValidationError.js';

// Responsabilidad única: reglas de negocio RN-01 a RN-05.
export class EmployeeValidator {
  static GENEROS = ['M', 'F', 'O'];

  #requerido(valor, etiqueta) {
    if (typeof valor !== 'string' || valor.trim() === '') {
      throw new ValidationError(`${etiqueta} es obligatorio.`);
    }
  }

  
}
