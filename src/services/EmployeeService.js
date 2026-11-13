import { ValidationError } from '../errors/ValidationError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

// Casos de uso RF-01 a RF-05.
// Recibe sus dependencias por constructor (Inversión de Dependencias).
export class EmployeeService {
  #repository;
  #validator;

  constructor(repository, validator) {
    this.#repository = repository;
    this.#validator = validator;
  }

  // RF-01
  register(data) {
    const clean = this.#validator.validate(data);
    if (this.#repository.findByIdentificacion(clean.identificacion)) {
      throw new ValidationError(
        `Ya existe un empleado con la identificación ${clean.identificacion}.`
      );
    }
    return this.#repository.add(clean);
  }

  // RF-02
  list() {
    return this.#repository.findAll();
  }

  // RF-03
  findByIdentificacion(identificacion) {
    const employee = this.#repository.findByIdentificacion(identificacion.trim());
    if (!employee) {
      throw new NotFoundError(`No existe un empleado con identificación "${identificacion}".`);
    }
    return employee;
  }

  // RF-04: mezcla datos actuales + cambios y vuelve a validar
  update(id, changes) {
    const current = this.#repository.findById(id);
    if (!current) throw new NotFoundError(`No existe un empleado con ID ${id}.`);

    const merged = this.#validator.validate({ ...current, ...changes });

    const duplicate = this.#repository.findByIdentificacion(merged.identificacion);
    if (duplicate && duplicate.id !== id) {
      throw new ValidationError(
        `Ya existe otro empleado con la identificación ${merged.identificacion}.`
      );
    }
    return this.#repository.update(id, merged);
  }

  // RF-05
  delete(id) {
    if (!this.#repository.remove(id)) {
      throw new NotFoundError(`No existe un empleado con ID ${id}.`);
    }
  }
}
