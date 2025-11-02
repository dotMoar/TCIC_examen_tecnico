# Prueba tecnica

## 🧠 Backend TCIT — NestJS + TypeORM + PostgreSQL

Backend desarrollado con **NestJS 10**, **TypeORM 0.3**, y **PostgreSQL**.  
Incluye **Swagger**, **Jest (unit & end to end)**, validación con **class-validator**.

Incluye servicios de **POSTS** sin validacion de login (JWT :ojos:),

---

## Rutas

### DataBase

IP: localhost
PORT: 5432
_USER_Local_: nest_tcit
_PASS_Local_: tcit
_DB_Locql_: tcit_database

### Backend

API Route: <http://localhost:5001/api/>
Documentacion: <http://localhost:5001/docs/>
SChema: <http://localhost:5001/docs-json>

Nota: No rquiere Auth

### Tecnologías principales

| Librería | Versión | Uso principal |
|-----------|----------|----------------|
| **NestJS** | `^10.0.0` | Framework backend |
| **TypeORM** | `^0.3.27` | ORM PostgreSQL |
| **PostgreSQL (pg)** | `^8.16.3` | Driver de base db |
| **Swagger** | `^7.4.2` | Documentación interactiva de la API |
| **Class Validator / Transformer** | `^0.14.2` / `^0.5.1` | Validación de DTOs |
| **Jest / Supertest** | `^29.7.0` / `^7.1.4` | Pruebas unitarias y end to end |
| **Prettier / ESLint** | `^3.0.0` / `^8.0.0` | Estilo y linting de código |

---
