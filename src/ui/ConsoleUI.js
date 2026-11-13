import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { ValidationError } from '../errors/ValidationError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

// Responsabilidad única: hablar con el usuario. Sin reglas de negocio.
export class ConsoleUI {
  #service;
  #rl;


  constructor(service) {
    this.#service = service;
    this.#rl = createInterface({ input, output });
  }

  // ---------- utilidades ----------
  async #ask(texto) {
    return (await this.#rl.question(texto)).trim();
  }

  #print(employee) {
    console.log(`
  ID interno      : ${employee.id}
  Identificación  : ${employee.identificacion}
  Nombre completo : ${employee.nombres} ${employee.apellidos}
  Género          : ${employee.genero}
  Email           : ${employee.email}
  Teléfono        : ${employee.telefono}
  Dirección       : ${employee.direccion}
  Ciudad          : ${employee.ciudad}
  Profesión       : ${employee.profesion}
  Cargo           : ${employee.cargo}
  Salario         : ${employee.salario.toLocaleString('es-GT')}
  ------------------------------------------`);
  }

  #showMenu() {
    console.log(`
==========================================
   ACME · GESTIÓN DE EMPLEADOS V1.0
==========================================
  1. Registrar empleado
  2. Listar empleados
  3. Buscar por identificación
  4. Actualizar empleado
  5. Eliminar empleado
  0. Salir
------------------------------------------`);
  }
}
