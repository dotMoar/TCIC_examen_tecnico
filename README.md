# Prueba tecnica

## Instalacion

### **Requerimientos**
- **Node.js** `>=22.0.0`  
- **npm** `>=10.0.0`  
- **Docker** y **Docker Compose** ([Docker install](https://docs.docker.com/desktop/setup/install/windows-install/))
- **Git**   

### **Uso**

1. git clone git@github.com:dotMoar/TCIT_examen_tecnico.git
2. cd ./TCIT_examen_tecnico
3. npm i <'o> npm ci
4. `cp ./back/.env_template .env` o incluir tu base de datos local
4. npm run db:up 
5. npm run dev

### DataBase

- **IP:** `localhost`  
- **Puerto:** `5432`  
- **Usuario (Local):** `nest_tcit`  
- **Contraseña (Local):** `tcit`  
- **Base de Datos (Local):** `tcit_database`

### Rutas **Frontend**
- **Ruta base de la API:** [http://localhost:5000](http://localhost:5001)  

### Rutas **Backend**
- **Ruta base de la API:** [http://localhost:5001/api/](http://localhost:5001/api/)  
- **Documentación Swagger:** [http://localhost:5001/docs/](http://localhost:5001/docs/)  
- **Esquema JSON:** [http://localhost:5001/docs-json](http://localhost:5001/docs-json)  
- **Nota:** No requiere autenticación (`Auth`)

## Frontend TCIT — React + RTK

Frontend desarrollado con **React 19**, **RTK** y **openapi gen**.
Incluye integración con API REST del backend (NestJS).

## Backend TCIT — NestJS + TypeORM + PostgreSQL

Backend desarrollado con **NestJS 10**, **TypeORM 0.3**, y **PostgreSQL**.  
Incluye **Swagger**, **Jest (unit & end to end)**, validación con **class-validator**.

Incluye servicios de **POSTS** sin validacion de login (JWT :ojos:),

## Estructura

```
.
├── back/                 # Backend con NestJS (Express)
├── front/                # Frontend con React + Redux Toolkit
├── DB/                   # Docker Compose y scripts de inicialización de base de datos
├── package.json          # Configuración raíz (npm workspaces)
├── README.md             
├── InsomniaCurls.yaml    # Insomnia Curls
├── Challenge desarrollador web React y Node.JS.pdf        
```

### Tecnologías Backend

| Librería | Versión | Uso principal |
|-----------|----------|----------------|
| **NestJS** | `^10.0.0` | Framework backend modular y escalable |
| **TypeORM** | `^0.3.27` | ORM para PostgreSQL |
| **PostgreSQL (pg)** | `^8.16.3` | Driver de base de datos |
| **Swagger / @nestjs/swagger** | `^7.4.2` | Documentación y exploración de la API |
| **Class Validator / Transformer** | `^0.14.2` / `^0.5.1` | Validación y transformación de DTOs |
| **RxJS** | `^7.8.1` | Programación reactiva utilizada por NestJS |
| **Jest / Supertest** | `^29.7.0` / `^7.1.4` | Pruebas unitarias y end-to-end |
| **Prettier / ESLint** | `^3.0.0` / `^8.0.0` | Formateo y linting del código |

---

### Tecnologías Frontend

| Librería | Versión | Uso principal |
|-----------|----------|----------------|
| **React** | `^19.1.1` | Librería principal para la interfaz de usuario |
| **Vite** | `^7.1.12` | Bundler ultrarrápido para desarrollo y build |
| **Redux Toolkit / React Redux** | `^2.9.2` / `^9.2.0` | Manejo de estado global |
| **TailwindCSS** | `^4.1.16` | Framework de utilidades CSS |
| **OpenAPI TypeScript Codegen** | `^0.29.0` | Generación automática del cliente API |
| **ESLint / TypeScript** | `^9.36.0` / `^5.9.3` | Linter y tipado estático |
| **@vitejs/plugin-react** | `^5.0.4` | Integración optimizada de React en Vite |

---

## Scripts globales del monorepo

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Inicia **backend y frontend** en modo desarrollo concurrente |
| `npm run build` | Compila ambos proyectos (`back` y `front`) |
| `npm run start` | Inicia solo el backend en modo producción |
| `npm run api:generate` | Genera el cliente API en el frontend desde Swagger |
| `npm run db:up` / `npm run db:down` | Levanta o detiene la base de datos PostgreSQL |
| `npm run db:rebuild` | Limpia y reconstruye la base de datos Docker |
---
