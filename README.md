# 🧾 Budget Generator

![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular&logoColor=white)
![MariaDB](https://img.shields.io/badge/Database-MariaDB-blue?logo=mariadb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-lightgrey)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 📸 Vista previa

| Módulo Clientes | Módulo Presupuestos | Módulo Calculadora |
|-----------------|----------------------|--------------------|
| ![Clients](https://github.com/gallard00/budget-generator/assets/preview_clients.png) | ![Budgets](https://github.com/gallard00/budget-generator/assets/preview_budgets.png) | ![Calculator](https://github.com/gallard00/budget-generator/assets/preview_calculator.png) |

---

## 🧩 Descripción general

**Budget Generator** es una aplicación **Full Stack (Spring Boot + Angular)** que permite:
- Registrar y administrar clientes.
- Crear presupuestos con ítems detallados.
- Calcular automáticamente totales y exportar a PDF.
- Usar una **calculadora de materiales** para agregar ítems según superficie y tipo de material.

💡 Diseñado con una arquitectura profesional, aplicando principios **SOLID**, patrones **Repository** y **Strategy**, e integración completa **REST** entre backend y frontend.

---

## ⚙️ Tecnologías utilizadas

### 🖥️ Backend
- **Java 17**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **MariaDB**
- **ModelMapper**
- **Lombok**
- **Swagger UI**
- **Docker Compose**

### 🌐 Frontend
- **Angular 20 (standalone components)**
- **Bootstrap 5**
- **Axios**
- **RxJS**
- **TypeScript**
- **HTML / SCSS**

---

## 🧠 Arquitectura

back/
├── controller/
│ ├── BudgetController.java
│ ├── ClientController.java
│ └── CalculationController.java
├── model/
│ ├── Budget.java
│ ├── Client.java
│ ├── Item.java
│ ├── CalculationInput.java
│ ├── CalculationResult.java
│ └── MaterialType.java
├── repository/
│ ├── BudgetRepository.java
│ └── ClientRepository.java
├── service/
│ ├── ICalculationService.java
│ └── impl/CalculationServiceImpl.java
├── strategy/
│ ├── IFileExporter.java
│ ├── PDFExporter.java
│ └── WordExporter.java
└── BudgetGeneratorApplication.java

front/
├── core/
│ ├── models/
│ ├── services/
│ └── pipes/
├── features/
│ ├── clients/
│ ├── budgets/
│ └── calculator/
└── app.routes.ts

yaml
Copiar código

---

## 🧾 Módulos principales

### 👤 Clientes
- Crear, listar y eliminar clientes.
- Relación 1:N con presupuestos.
- Eliminación en cascada.

### 💰 Presupuestos
- Crear presupuestos con fecha, cliente e ítems.
- Calcular el total automáticamente.
- Exportar presupuesto en formato **PDF**.

### 🧮 Calculadora de materiales
- Calcular superficie (ancho × alto).
- Seleccionar tipo de material y calcular costo total.
- Enviar los ítems calculados directamente al presupuesto activo.

---

## 🧱 Patrones y principios aplicados

| Patrón / Principio | Implementación |
|--------------------|----------------|
| **SOLID** | Separación en capas: Controller, Service, Repository, DTO. |
| **Repository Pattern** | `IBudgetRepository` / `MariaDBBudgetRepository`. |
| **Strategy Pattern** | `IFileExporter` con implementaciones `PDFExporter` y `WordExporter`. |
| **Dependency Inversion** | `Budget` depende de abstracciones. |
| **DTO Layer** | Comunicación limpia entre API y Frontend. |
| **Observable Sharing** | `SharedDataService` entre componentes Angular. |

---

## 📊 Diagrama UML (simplificado)

Client 1 ────◆───* Budget ◇───* Item
Budget ──> IFileExporter ──> PDFExporter | WordExporter
Budget ──> IBudgetRepository ──> MariaDBBudgetRepository
Calculator ──> SharedDataService ──> Budgets

yaml
Copiar código

---

## 🐳 Ejecución con Docker

```bash
docker-compose up --build
Esto levanta:

Backend Spring Boot en http://localhost:8080

Base de datos MariaDB

Frontend Angular en http://localhost:4200

⚙️ Ejecución manual
Backend
bash
Copiar código
cd back
mvn spring-boot:run
Frontend
bash
Copiar código
cd front
npm install
ng serve --open
📡 API Endpoints
Método	Endpoint	Descripción
GET	/api/clients	Listar clientes
POST	/api/clients	Crear cliente
DELETE	/api/clients/{id}	Eliminar cliente
GET	/api/budgets	Listar presupuestos
POST	/api/budgets	Crear presupuesto
GET	/api/export/pdf/{id}	Exportar presupuesto a PDF
POST	/api/calc	Calcular materiales

🧩 Ejemplo de presupuesto
json
Copiar código
{
  "clientId": 1,
  "date": "2025-10-21",
  "items": [
    { "description": "Porcelanato (10.5 m²)", "quantity": 10.5, "unitPrice": 8000 },
    { "description": "Revoque (5.2 m²)", "quantity": 5.2, "unitPrice": 5000 }
  ]
}
🧮 Ejemplo de cálculo (módulo Calculator)
json
Copiar código
{
  "width": 5.2,
  "height": 2.0,
  "materialType": "PORCELANATO"
}
Respuesta:

json
Copiar código
{
  "squareMeters": 10.4,
  "totalPrice": 83200
}
👨‍💻 Autor
Nahuel Gallardo
Analista en Programación y Desarrollo de Aplicaciones
📍 Miramar, Buenos Aires, Argentina
📧 gallardonahuel293@gmail.com
🔗 LinkedIn
🐙 GitHub

⭐ Contribución
Si querés proponer mejoras o reportar bugs, abrí un Issue o hacé un Pull Request.
¡Las sugerencias son siempre bienvenidas!

Desarrollado con ❤️ por Nahuel Gallardo — Proyecto académico y profesional.
