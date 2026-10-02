# Sistema de Gestión para Farmacia

## Integrante

- Lautaro Altamirano

## Descripción

Trabajo práctico realizado para la materia Programación II.

El proyecto consiste en una aplicación web para la gestión básica de una farmacia.

El sistema permite administrar:

- Medicamentos
- Categorías
- Empleados

También cuenta con un Dashboard donde se muestra la cantidad total de medicamentos, categorías y empleados registrados.

El proyecto está dividido en un backend desarrollado con Flask, un frontend desarrollado con React y una base de datos MySQL.

## Tecnologías utilizadas

### Backend

- Python
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- PyMySQL
- MySQL

### Frontend

- React
- JavaScript
- Vite
- Material UI
- Fetch API

### Control de versiones

- Git
- GitHub

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Python 3
- Node.js
- npm
- MySQL
- Git

También se utilizó MySQL Workbench para trabajar con la base de datos.

## Base de datos

La base de datos utilizada se llama `farmacia_db`.

El script se encuentra en:

`database/farmacia_db.sql`

El archivo permite crear la base de datos, las tablas y cargar los datos iniciales.

Datos incluidos:

- 5 categorías
- 10 medicamentos
- 5 empleados

## Backend

El backend se encuentra en la carpeta `backend`.

Para ejecutarlo:

```bash
cd backend
venv\Scripts\activate
python app.py
```

El servidor Flask se ejecuta en:

`http://127.0.0.1:5000`

## Frontend

El frontend se encuentra en la carpeta `frontend`.

Para instalar las dependencias:

```bash
cd frontend
npm install
```

Para ejecutar el frontend:

```bash
npm run dev
```

Luego abrir en el navegador:

`http://localhost:5173`

## Rutas de la API

### Categorías

- `GET /api/categorias`
- `GET /api/categorias/<id>`
- `POST /api/categorias`
- `PUT /api/categorias/<id>`
- `DELETE /api/categorias/<id>`

### Medicamentos

- `GET /api/medicamentos`
- `GET /api/medicamentos/<id>`
- `POST /api/medicamentos`
- `PUT /api/medicamentos/<id>`
- `DELETE /api/medicamentos/<id>`

### Empleados

- `GET /api/empleados`
- `GET /api/empleados/<id>`
- `POST /api/empleados`
- `PUT /api/empleados/<id>`
- `DELETE /api/empleados/<id>`

### Dashboard

- `GET /api/dashboard`

## Funcionalidades

### Dashboard

Muestra la cantidad de:

- Medicamentos
- Categorías
- Empleados

Los datos son obtenidos desde el backend.

### Categorías

Permite:

- Crear categorías
- Listar categorías
- Editar categorías
- Eliminar categorías

### Medicamentos

Permite:

- Crear medicamentos
- Listar medicamentos
- Editar medicamentos
- Eliminar medicamentos
- Seleccionar una categoría

### Empleados

Permite:

- Crear empleados
- Listar empleados
- Editar empleados
- Eliminar empleados

## Validaciones

### Medicamentos

- Nombre obligatorio
- Precio mayor a 0
- Stock no negativo
- Categoría obligatoria
- Fecha válida

### Categorías

- Nombre obligatorio
- No permite categorías duplicadas

### Empleados

- Nombre obligatorio
- Apellido obligatorio
- DNI obligatorio
- Email válido
- Cargo obligatorio

## Estructura del proyecto

```text
farmacia-app
│
├── backend
│   ├── app.py
│   ├── config.py
│   ├── extensions.py
│   │
│   ├── models
│   │   ├── categoria.py
│   │   ├── medicamento.py
│   │   └── empleado.py
│   │
│   ├── controllers
│   │   ├── categoria_controller.py
│   │   ├── medicamento_controller.py
│   │   └── empleado_controller.py
│   │
│   └── routes
│       ├── categoria_routes.py
│       ├── medicamento_routes.py
│       ├── empleado_routes.py
│       └── dashboard_routes.py
│
├── frontend
│   └── src
│       ├── App.jsx
│       └── components
│           ├── Categorias.jsx
│           ├── Medicamentos.jsx
│           └── Empleados.jsx
│
├── database
│   └── farmacia_db.sql
│
└── README.md
```

## Capturas de pantalla

Se realizaron capturas de las principales pantallas del sistema:

- Dashboard
- Categorías
- Medicamentos
- Empleados
- Base de datos en MySQL Workbench

## Distribución de tareas

El trabajo fue realizado de manera individual.

Las tareas realizadas fueron:

- Creación de la estructura del proyecto
- Desarrollo del backend con Flask
- Creación de modelos, controladores y rutas
- Integración con MySQL
- Desarrollo del frontend con React
- Uso de Material UI
- CRUD de categorías
- CRUD de medicamentos
- CRUD de empleados
- Desarrollo del Dashboard
- Carga de datos iniciales
- Pruebas de funcionamiento
- Uso de Git y GitHub
- Documentación del proyecto

## Repositorio

https://github.com/Lautaroalt/farmacia-app