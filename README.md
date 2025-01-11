> [!IMPORTANT]  
> Project is deployed [here](https://apexglobal-technical-test.onrender.com/api)
> 
# ApexGlobal Technical Test Repository

---

## **Introduction** 🌟

The **ApexGlobal Technical Test** project is a robust backend application built using the **NestJS Framework**. This application implements clean architecture principles to ensure modularity, scalability, and maintainability. It includes features like **Product Management** and integration with **NASA's Photo of the Day API**.

The repository demonstrates a well-structured approach to software development by organizing the code into distinct layers such as **Application**, **Domain**, **Infrastructure**, and **Interfaces**. It leverages **MongoDB** as the database, **Swagger** for API documentation, and **Docker** for containerization.

---

## **Usage** 🛠️

1. **API Documentation**:
   - Swagger is integrated for API documentation.
   - Access the Swagger UI at `/api` once the application is running.

2. **Endpoints**:
   - **Products**:
     - Create, Read, Update, Delete (CRUD) operations for managing products.
   - **NASA Photo of the Day**:
     - Fetch the daily photo from NASA's API.

3. **Testing**:
   - Unit and end-to-end tests are implemented using **Jest**.

---

## **Features** ✨

- **Product Management**:
  - CRUD operations for products with validation.
  - Pagination support for product listings.
  
- **NASA Photo of the Day Integration**:
  - Fetches photo data from NASA's API.
  
- **Clean Architecture**:
  - Implements separation of concerns with clearly defined layers.
  
- **Swagger Integration**:
  - Interactive API documentation.
  
- **Environment Configuration**:
  - Manages sensitive configurations using `.env` files and validation.
  
- **Error Handling**:
  - Centralized error handling with custom interceptors.

- **Dockerized Deployment**:
  - Docker support for containerized application deployment.

---

## **Configuration** ⚙️

1. **Environment Variables**:
   - Set up the `.env` file in the root directory. Example variables:
     - `NODE_ENV`: Application environment (development, production, test).
     - `PORT`: The port on which the application runs.
     - `DB_CONNECTION_SCHEMA`: Database schema (e.g., `mongodb`).
     - `DB_HOST`: Database host URL.
     - `DB_PORT`: Port for the database.
     - `DB_USER` and `DB_PASSWORD`: Credentials for the database.
     - `NASA_ENDPOINT`: Endpoint URL for NASA API.
     - `NASA_API_KEY`: API key for NASA's service.

2. **Swagger Configuration**:
   - Defined in `src/infrastructure/config/swagger.ts` and `api-info.ts`.
   - Customize API title, description, and version.
   
3. **Docker Configuration**:
   - `docker-compose.yml` orchestrates the MongoDB and application containers.
   - `Dockerfile` builds the application container.

---

## **Requirements** 📋

- **Node.js**: Version 20 or higher.
- **NestJS**: Framework for building scalable applications.
- **MongoDB**: NoSQL database.
- **Docker**: For containerized deployment.
- **Jest**: Testing framework.

---

## **Installation** 🚀

Follow the steps below to set up the application:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yxd99/apexglobal-technical-test.git
   cd apexglobal-technical-test
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file and populate it with the required variables.

4. **Run the Application Locally**:
   ```bash
   npm run start:dev
   ```

5. **Run with Docker**:
   - Build and start using Docker Compose:
     ```bash
     docker-compose up --build
     ```

6. **Run Tests**:
   - Unit Tests:
     ```bash
     npm run test
     ```
   - End-to-End Tests:
     ```bash
     npm run test:e2e
     ```

---

## **Architectural Decisions** 🏗️

The project adheres to **Clean Architecture** principles, as reflected in the folder structure:

1. **Domain Layer**:
   - Contains core business logic and entities.
   - Example: `src/domain/entities/product.entity.ts`.

2. **Application Layer**:
   - Implements use cases and application-specific logic.
   - Example: `src/application/use-cases/product.use-case.ts`.

3. **Infrastructure Layer**:
   - Handles database interactions, external API calls, and framework-specific configurations.
   - Example:
     - Repositories: `src/infrastructure/database/repositories/product.repository.impl.ts`.
     - Services: `src/infrastructure/services/nasa.service.ts`.
     - Configurations: `src/infrastructure/config`.

4. **Interfaces Layer**:
   - Defines DTOs and controllers for handling HTTP requests.
   - Example: `src/infrastructure/http/dto/products/create-product.dto.ts`.

5. **Main Application**:
   - Initializes the modules and application-level configurations.
   - Example: `src/app.module.ts`.

By structuring the code in this manner, the project ensures separation of concerns, thereby enhancing testability, maintainability, and scalability.
