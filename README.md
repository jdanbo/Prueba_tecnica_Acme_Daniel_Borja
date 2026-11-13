# ACME · Gestión de Empleados

Aplicación de consola en Node.js para gestionar los empleados del área de Talento Humano.

## Requisitos

- Node.js 18 o superior
- Sin dependencias externas ni base de datos (los datos viven en memoria mientras la app está abierta)

## Cómo ejecutar

```bash
node app.js
```

## Funcionalidades (menú)

| Opción | Acción | Requisito |
|--------|--------|-----------|
| 1 | Registrar empleado | RF-01 |
| 2 | Listar empleados | RF-02 |
| 3 | Buscar por identificación | RF-03 |
| 4 | Actualizar empleado (por ID interno) | RF-04 |
| 5 | Eliminar empleado (por ID interno) | RF-05 |
| 0 | Salir | — |

## Reglas de negocio validadas

- Nombres y apellidos no pueden estar vacíos.
- Género: `M`, `F` u `O`.
- Email, teléfono, dirección y ciudad son obligatorios.
- Profesión y cargo son obligatorios.
- Salario mayor a 0.
- Extra: formato de email válido e identificación no duplicada.

## Estructura del código (`app.js`)

| Clase | Responsabilidad |
|-------|-----------------|
| `Employee` | Modelo de datos |
| `EmployeeValidator` | Reglas de negocio |
| `InMemoryEmployeeRepository` | Almacenamiento en un arreglo |
| `EmployeeService` | Casos de uso (CRUD) |
| `ConsoleUI` | Menú e interacción con el usuario |
| `ValidationError` / `NotFoundError` | Errores personalizados |

## Buenas prácticas aplicadas

- POO y principios SOLID (responsabilidad única, inyección de dependencias).
- JavaScript moderno: ES Modules, clases, campos privados `#`, `async/await`.
- Manejo de errores con `try/catch`: la app no se cierra ante datos inválidos.