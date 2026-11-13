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

  #parseId(texto) {
    const id = Number(texto);
    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError('Error: El ID debe ser un número entero positivo.');
    }
    return id;
  }

  // ---------- acciones del menú ----------
  async #register() {
    console.log('\n---- Registro de empleado ----');
    const data = {
      identificacion: await this.#ask('Identificación: '),
      nombres: await this.#ask('Nombres: '),
      apellidos: await this.#ask('Apellidos: '),
      genero: await this.#ask('Género (M/F/O): '),
      email: await this.#ask('Email: '),
      telefono: await this.#ask('Teléfono: '),
      direccion: await this.#ask('Dirección: '),
      ciudad: await this.#ask('Ciudad de residencia: '),
      profesion: await this.#ask('Profesión: '),
      cargo: await this.#ask('Cargo: '),
      salario: await this.#ask('Salario: '),
    };
    const employee = this.#service.register(data);
    console.log(`\nEmpleado registrado correctamentecon ID interno ${employee.id}.`);
  }

  #list() {
    console.log('\n--- Lista de empleados ---');
    const employees = this.#service.list();
    if (employees.length === 0) {
      console.log('No hay empleados registrados actualmente.');
      return;
    }
    employees.forEach((e) => this.#print(e));
    console.log(`Total de empleados: ${employees.length}`);
  }

  async #search() {
    console.log('\n----- Buscar empleado especifico ---');
    const identificacion = await this.#ask('ID a buscar: ');
    this.#print(this.#service.findByIdentificacion(identificacion));
  }

  async #update() {
    console.log('\n--- Actualizacion de empleado ---');
    const id = this.#parseId(await this.#ask('ID interno del empleado: '));
    console.log('(Presiona Enter para dejar un campo sin cambios)');

    const campos = [
      ['identificacion', 'Identificación'], ['nombres', 'Nombres'],
      ['apellidos', 'Apellidos'], ['genero', 'Género (M/F/O)'],
      ['email', 'Email'], ['telefono', 'Teléfono'],
      ['direccion', 'Dirección'], ['ciudad', 'Ciudad'],
      ['profesion', 'Profesión'], ['cargo', 'Cargo'], ['salario', 'Salario'],
    ];

    const changes = {};
    for (const [clave, etiqueta] of campos) {
      const valor = await this.#ask(`${etiqueta}: `);
      if (valor !== '') changes[clave] = valor;
    }
    this.#service.update(id, changes);
    console.log('\nEmpleado actualizado correctamente.');
  }

  async #remove() {
    console.log('\n----- Eliminar empleado -----');
    const id = this.#parseId(await this.#ask('ID interno del empleado: '));
    const confirmar = (await this.#ask('¿Seguro que desea eliminarlo? (s/n): ')).toLowerCase();
    if (confirmar !== 's') {
      console.log('Operación cancelada.');
      return;
    }
    this.#service.delete(id);
    console.log('\nEmpleado eliminado.');
  }
}
