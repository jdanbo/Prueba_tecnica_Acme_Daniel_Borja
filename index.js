import { InMemoryEmployeeRepository } from './src/repositories/InMemoryEmployeeRepository.js';
import { EmployeeValidator } from './src/validators/EmployeeValidator.js';
import { EmployeeService } from './src/services/EmployeeService.js';
import { ConsoleUI } from './src/ui/ConsoleUI.js';

// "Composition root": único lugar donde se crean y conectan los objetos.
const repository = new InMemoryEmployeeRepository();
const validator = new EmployeeValidator();
const service = new EmployeeService(repository, validator);
const app = new ConsoleUI(service);

app.run();
