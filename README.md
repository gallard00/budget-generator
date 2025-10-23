# 💼 Budget Generator

![Java](https://img.shields.io/badge/Java-17+-red?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen?logo=springboot)
![Maven](https://img.shields.io/badge/Maven-Project-blue?logo=apachemaven)
![MariaDB](https://img.shields.io/badge/MariaDB-Database-lightblue?logo=mariadb)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

Budget Generator es una aplicación Full Stack (Spring Boot + Angular 20) diseñada para la gestión y creación de presupuestos de manera dinámica y profesional.
Permite registrar clientes, crear presupuestos con ítems detallados, generar archivos PDF, y realizar cálculos de materiales según superficie y tipo de trabajo.

🧩 Tecnologías utilizadas
🖥️ Backend

Java 17

Spring Boot 3.x

Spring Data JPA

MariaDB

Lombok

ModelMapper

Springdoc OpenAPI / Swagger UI

ReportLab (para exportación PDF)

Docker Compose

🌐 Frontend

Angular 20.3.4 (standalone components)

Bootstrap 5

Axios

RxJS

TypeScript

HTML / SCSS

⚙️ Arquitectura

El sistema se organiza bajo una arquitectura en capas:

back/
├── controller/
│   └── BudgetController.java
│   └── ClientController.java
│   └── CalculationController.java
├── model/
│   ├── Budget.java
│   ├── Client.java
│   ├── Item.java
│   ├── CalculationInput.java
│   ├── CalculationResult.java
│   ├── MaterialType.java
├── repository/
│   └── BudgetRepository.java
│   └── ClientRepository.java
├── service/
│   ├── ICalculationService.java
│   ├── impl/
│   │   └── CalculationServiceImpl.java
├── strategy/
│   ├── IFileExporter.java
│   ├── PDFExporter.java
│   ├── WordExporter.java
└── BudgetGeneratorApplication.java

front/
├── core/
│   ├── models/
│   ├── services/
│   └── pipes/
├── features/
│   ├── clients/
│   ├── budgets/
│   └── calculator/
└── app.routes.ts

🧮 Módulos principales
👤 Gestión de Clientes

Alta, baja y modificación de clientes.

Eliminación en cascada: si se elimina un cliente, se eliminan sus presupuestos.

🧾 Gestión de Presupuestos

Creación de presupuestos con fecha, cliente e ítems.

Cada ítem contiene descripción, cantidad y precio unitario.

Cálculo automático del total.

Exportación en PDF.

🧱 Calculadora de Materiales

Permite calcular superficie (m²) multiplicando ancho × alto.

Según el tipo de material (Porcelanato, Mármol, Revoque, etc.) calcula el costo total.

Los resultados pueden agregarse directamente al presupuesto activo.

🧠 Patrones y Principios aplicados
Patrón / Principio	Implementación
SOLID	Separación de responsabilidades (Service, Repository, Mapper, DTO).
Repository Pattern	IBudgetRepository / MariaDBBudgetRepository.
Strategy Pattern	IFileExporter con implementaciones PDFExporter, WordExporter.
Dependency Inversion	Budget depende de abstracciones (interfaces), no implementaciones concretas.
DTO Layer	Transferencia de datos entre API y frontend.
Exception Handling Global	GlobalExceptionHandler.
Observable Data Sharing	SharedDataService entre componentes Angular.
📊 Diagrama UML (actualizado)
Relación	Descripción
Client ●───1───* Budget	Composición: al borrar un cliente, se eliminan sus presupuestos.
Budget ◇───1───* Item	Composición: los ítems pertenecen al presupuesto.
Budget → IFileExporter	Usa una estrategia para exportar (PDF/Word).
Budget → IBudgetRepository	Usa un repositorio para persistencia.
Calculator → SharedDataService → Budgets	Comunicación entre módulos del frontend.
🧰 Ejecución del proyecto
🐳 Con Docker Compose
docker-compose up --build


Esto levanta:

Backend Spring Boot en http://localhost:8080

Base de datos MariaDB

Frontend Angular (servidor de desarrollo)

⚙️ Manual (sin Docker)
Backend
cd back
mvn spring-boot:run

Frontend
cd front
npm install
ng serve --open


App: http://localhost:4200

📦 API Endpoints principales
Método	Endpoint	Descripción
GET	/api/clients	Lista todos los clientes.
POST	/api/clients	Crea un nuevo cliente.
DELETE	/api/clients/{id}	Elimina un cliente.
GET	/api/budgets	Obtiene todos los presupuestos.
POST	/api/budgets	Crea un presupuesto nuevo.
GET	/api/export/pdf/{id}	Exporta presupuesto a PDF.
POST	/api/calc	Calcula superficie y costo según material.
📁 Ejemplo de presupuesto (JSON)
{
  "clientId": 3,
  "date": "2025-10-21",
  "items": [
    { "description": "Porcelanato (10.5 m²)", "quantity": 10.5, "unitPrice": 8000 },
    { "description": "Revoque (5.2 m²)", "quantity": 5.2, "unitPrice": 5000 }
  ]
}

🧱 Ejemplo de cálculo desde el módulo Calculator
{
  "width": 5.2,
  "height": 2.0,
  "materialType": "PORCELANATO"
}


Resultado:

{
  "squareMeters": 10.4,
  "totalPrice": 83200
}

🧠 Autor

👨‍💻 Nahuel Gallardo
Analista en Programación y Desarrollo de Aplicaciones
📍 Miramar, Buenos Aires, Argentina
🔗 LinkedIn

🐙 GitHub

⭐ Contribución

Las contribuciones son bienvenidas.
Si querés proponer mejoras, abrí un issue o hacé un pull request con una descripción clara de los cambios.
