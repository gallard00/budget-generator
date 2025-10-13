# 💼 Budget Generator

![Java](https://img.shields.io/badge/Java-17+-red?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen?logo=springboot)
![Maven](https://img.shields.io/badge/Maven-Project-blue?logo=apachemaven)
![MariaDB](https://img.shields.io/badge/MariaDB-Database-lightblue?logo=mariadb)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

---

### 🧮 **About the project**

**Budget Generator** is a backend application developed with **Spring Boot** to create, manage, and export professional **budgets**.  
It was created as the **final project** for the **EDI3 – Advanced Object-Oriented Programming** course, applying **SOLID principles**, **layered architecture**, and **relational persistence** with **MariaDB**.

---

## 🚀 **Features**

✅ Create, edit, and delete budgets  
✅ Manage clients and items  
✅ Automatically calculate totals and subtotals  
✅ Export budgets in multiple file formats:
- 📄 **PDF** (for printing or sending)
- 📝 **Word (.docx)** (editable version)
- 📊 **Excel (.xlsx)** (for calculations and analysis)

---

## 🧩 **Architecture Overview**

com.nahuelgallardo.budgetgenerator
├── model/ # Entities (Client, Budget, Item, BudgetHistory)
├── repository/ # Repository interfaces + MariaDB implementation
├── service/ # Business logic layer
├── controller/ # REST controllers
├── exporter/ # File exporters (PDF, Word, Excel)
├── exception/ # Global exception handling
└── BudgetGeneratorApplication.java

The project fully applies **SOLID design principles**:

| Principle | Description |
|------------|--------------|
| **S** – Single Responsibility | Each class has one clear purpose |
| **O** – Open/Closed | New exporters can be added without modifying core code |
| **L** – Liskov Substitution | Exporters can substitute each other freely |
| **I** – Interface Segregation | Small, focused interfaces (`BudgetRepository`, `FileExporter`) |
| **D** – Dependency Inversion | Services depend on abstractions, not implementations |

---

## 🗄️ **Database Configuration**

**MariaDB** is used for relational persistence.

`src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mariadb://localhost:3306/budget_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect

server.port=8080

🧰 Technologies
Category	Technologies
Language	Java 17 / 21
Framework	Spring Boot 3.3.x
Database	MariaDB
ORM	Spring Data JPA
Utilities	Lombok, Spring DevTools
Build Tool	Maven
Exporters	iText / Apache POI (PDF, Word, Excel)

🧾 UML Diagram
📘 The class diagram (uml.png) representing the complete architecture is included in the repository:
/docs/uml.png

⚙️ How to Run
Prerequisites
Java 17+

Maven

MariaDB running locally

Steps
# clone repository
git clone https://github.com/gallard00/budget-generator.git

# navigate into project
cd budget-generator

# build and run
mvn spring-boot:run
Access the app at 👉 http://localhost:8080

👤 Author
Nahuel Gallardo
💻 Analyst & Software Developer
📍 Buenos Aires, Argentina
🔗 GitHub • LinkedIn

🏁 License
This project was developed for academic and learning purposes.
You may freely use and modify it for educational use.
