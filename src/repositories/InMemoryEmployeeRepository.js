import { Employee } from '../models/Employee.js';

// Responsabilidad única: guardar y recuperar empleados (en un arreglo).
// Para usar una BD se crea otra clase con los mismos métodos.
export class InMemoryEmployeeRepository {
  #employees = [];
  #nextId = 1;

  add(data) {
    const employee = new Employee({ id: this.#nextId++, ...data });
    this.#employees.push(employee);
    return employee;
  }

  findAll() {
    return [...this.#employees]; // copia: no se expone el arreglo interno
  }

  findById(id) {
    return this.#employees.find((e) => e.id === id);
  }

  findByIdentificacion(identificacion) {
    return this.#employees.find((e) => e.identificacion === identificacion);
  }

  update(id, data) {
    const employee = this.findById(id);
    if (!employee) return undefined;
    Object.assign(employee, data);
    return employee;
  }

  remove(id) {
    const index = this.#employees.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.#employees.splice(index, 1);
    return true;
  }
}
