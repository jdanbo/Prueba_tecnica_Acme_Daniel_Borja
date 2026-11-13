// Se lanza cuando se busca un empleado que no existe.
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
  }
}
