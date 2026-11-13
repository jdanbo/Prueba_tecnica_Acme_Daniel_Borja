// Se lanza cuando un dato incumple una regla de negocio.
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
