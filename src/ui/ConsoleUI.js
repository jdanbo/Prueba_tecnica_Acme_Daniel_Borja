import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { ValidationError } from '../errors/ValidationError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

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