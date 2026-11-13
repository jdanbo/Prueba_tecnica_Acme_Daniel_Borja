import { ValidationError } from '../errors/ValidationError.js';

// Responsabilidad única: reglas de negocio RN-01 a RN-05.
export class EmployeeValidator {
  static GENEROS = ['M', 'F', 'O'];

  #requerido(valor, etiqueta) {
    if (typeof valor !== 'string' || valor.trim() === '') {
      throw new ValidationError(`${etiqueta} es obligatorio.`);
    }
  }

  validate(data) {
    this.#requerido(data.identificacion, 'La identificación');

    // RN-01
    this.#requerido(data.nombres, 'Los nombres');
    this.#requerido(data.apellidos, 'Los apellidos');

    // RN-02
    const genero = String(data.genero ?? '').trim().toUpperCase();
    if (!EmployeeValidator.GENEROS.includes(genero)) {
      throw new ValidationError('El género debe ser "M", "F" u "O".');
    }

    // RN-03
    this.#requerido(data.email, 'El email');
    this.#requerido(data.telefono, 'El teléfono');
    this.#requerido(data.direccion, 'La dirección');
    this.#requerido(data.ciudad, 'La ciudad de residencia');
    if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
      throw new ValidationError('El email no tiene un formato válido.');
    }

    // RN-04
    this.#requerido(data.profesion, 'La profesión');
    this.#requerido(data.cargo, 'El cargo');

    // RN-05
    const salario = Number(data.salario);
    if (!Number.isFinite(salario) || salario <= 0) {
      throw new ValidationError('El salario debe ser un número mayor a 0.');
    }

    // Devuelve los datos limpios (sin espacios sobrantes)
    return {
      identificacion: data.identificacion.trim(),
      nombres: data.nombres.trim(),
      apellidos: data.apellidos.trim(),
      genero,
      email: data.email.trim(),
      telefono: data.telefono.trim(),
      direccion: data.direccion.trim(),
      ciudad: data.ciudad.trim(),
      profesion: data.profesion.trim(),
      cargo: data.cargo.trim(),
      salario,
    };
  }
}
