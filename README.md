# 🧾 Budget Generator

![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular&logoColor=white)
![MariaDB](https://img.shields.io/badge/Database-MariaDB-blue?logo=mariadb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-lightgrey)
![Status](https://img.shields.io/badge/Status-Active-success)

---

📸 Vista previa

🎯 Módulos principales:

Clientes

Presupuestos

Calculadora de Materiales

Historial de Presupuestos

Exportación a PDF

🧩 Descripción general

Budget Generator es una aplicación Full Stack profesional desarrollada con Spring Boot y Angular, destinada a la gestión integral de presupuestos para obras y trabajos de construcción.

Permite:

Registrar y administrar clientes.

Crear presupuestos con ítems detallados.

Calcular automáticamente totales.

Exportar presupuestos en PDF.

Usar una calculadora de materiales vinculada directamente a los presupuestos.

Mantener un historial de modificaciones por cada presupuesto.

Gestionar roles de usuario (ADMIN / USER) mediante JWT.

💡 El proyecto está diseñado bajo una arquitectura limpia, aplicando principios SOLID, patrones de diseño y comunicación REST entre backend y frontend.

⚙️ Tecnologías utilizadas
🖥️ Backend

Java 17

Spring Boot 3.x

Spring Security + JWT

Spring Data JPA

MariaDB

Lombok

Swagger UI

Docker Compose

🌐 Frontend

Angular 20 (Standalone Components)

Bootstrap 5

RxJS

TypeScript

HTML / SCSS

🧠 Arquitectura del proyecto
back/
├── controller/
│   ├── AuthController.java
│   ├── BudgetController.java
│   ├── ClientController.java
│   └── CalculationController.java
│
├── model/
│   ├── Budget.java
│   ├── BudgetItem.java
│   ├── BudgetHistory.java
│   ├── Client.java
│   ├── snapshot/
│   │   ├── BudgetSnapshot.java
│   │   └── BudgetItemSnapshot.java
│
├── repository/
│   ├── BudgetRepository.java
│   ├── BudgetHistoryRepository.java
│   └── ClientRepository.java
│
├── service/
│   ├── IBudgetService.java
│   └── impl/
│       └── BudgetServiceImpl.java
│
└── security/
    ├── JwtUtil.java
    ├── JwtAuthenticationFilter.java
    └── SecurityConfig.java

front/
├── core/
│   ├── models/
│   ├── services/
│   ├── guards/
│   └── pipes/
│
├── features/
│   ├── clients/
│   ├── budgets/
│   ├── calculator/
│   └── auth/
│
└── app.routes.ts

🧾 Módulos principales
👤 Clientes

Crear, listar, editar y eliminar clientes.

Seguridad por ROL ADMIN.

Relación 1 a N con presupuestos.

💰 Presupuestos

Crear presupuestos con:

Fecha

Cliente

Ítems

Cálculo automático del total.

Edición completa mediante modal:

Cliente

Fecha

Ítems (agregar / editar / eliminar)

Exportación automática a PDF.

Historial de modificaciones (Budget History).

Seguridad por JWT + Roles.

🧮 Calculadora de materiales

Calcular superficie: ancho × alto

Seleccionar tipo de material.

Enviar ítems directamente al presupuesto.

Integración con SharedDataService.

🧱 Patrones y principios aplicados
Principio / Patrón	Aplicación
SOLID	Separación en capas: Controller, Service, Repository, DTO
Repository Pattern	Interfaces JPA para persistencia
Strategy Pattern	Exportadores de archivos (PDF, extensible)
Dependency Inversion (DIP)	Servicios dependen de interfaces
DTO Pattern	Comunicación limpia API ↔ Frontend
JWT Authentication	Seguridad por token
Role-Based Access Control	ADMIN / USER
State Sharing (Angular)	SharedDataService
🐳 Ejecución con Docker
docker-compose up --build


Se levantan automáticamente:

Backend: http://localhost:8080

Base de datos: MariaDB

Frontend: http://localhost:4200

⚙️ Ejecución manual
▶ Backend
cd back
mvn spring-boot:run

▶ Frontend
cd front
npm install
ng serve --open

📡 API Endpoints principales
🔐 Autenticación

POST /api/auth/login

POST /api/auth/register

👤 Clientes

GET /api/clients

POST /api/clients

PUT /api/clients/{id}

DELETE /api/clients/{id}

💰 Presupuestos

GET /api/budgets

POST /api/budgets

PUT /api/budgets/{id}

DELETE /api/budgets/{id}

GET /api/budgets/{id}/history

📄 Exportación

GET /api/export/pdf/{id}

🧩 Ejemplo de creación de presupuesto
{
  "clientId": 1,
  "date": "2025-10-21",
  "items": [
    { "description": "Porcelanato (10.5 m²)", "quantity": 10.5, "unitPrice": 8000 },
    { "description": "Revoque (5.2 m²)", "quantity": 5.2, "unitPrice": 5000 }
  ]
}

🧮 Ejemplo de uso de la Calculadora
{
  "width": 5.2,
  "height": 2.0,
  "materialType": "PORCELANATO"
}


Respuesta:

{
  "squareMeters": 10.4,
  "totalPrice": 83200
}

👨‍💻 Autor

Nahuel Gallardo
📍 Miramar, Buenos Aires, Argentina
🎓 Analista en Programación y Desarrollo de Aplicaciones
📧 gallardonahuel293@gmail.com

🔗 LinkedIn: agregás tu link
🐙 GitHub: https://github.com/gallard00

⭐ Contribución

Si querés proponer mejoras o reportar bugs:

Abrí un Issue

Enviá un Pull Request

Toda colaboración es bienvenida 🤝

🏁 Estado del Proyecto

✅ Arquitectura profesional
✅ Seguridad por JWT
✅ Historial de presupuestos
✅ Edición completa con modales
✅ Exportación a PDF
✅ Principios SOLID aplicados
✅ Listo para defensa académica

💙 Desarrollado con dedicación por Nahuel Gallardo

Proyecto académico y profesional — POO 3 / Full Stack
