# CarsCircle - Full Stack (React + Spring Boot + MongoDB)

A full-stack application featuring a modern React frontend and a Spring Boot backend backed by MongoDB. Includes authentication, role-based dashboards (admin/manager/mechanic), vehicle inventory management (CRUD), bookings, profile management, and robust error handling.

## Tech Stack
- Frontend: React + Vite, Tailwind CSS, Framer Motion
- Backend: Spring Boot 3, Spring Web, Spring Data MongoDB
- Database: MongoDB

## Features
- Authentication (register/login) with global auth state
- Role-based routing and dashboards (admin, manager, mechanic)
- Vehicle inventory CRUD (add/edit/delete)
- Bookings (create/list)
- Profile view/update
- Centralized API helpers, toasts, and error handling

## Project Structure
- `src/` React frontend
- `backend/carcircle/` Spring Boot backend

## Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.9+
- MongoDB running locally on `mongodb://localhost:27017`

## Backend Setup (Spring Boot)
1. Navigate to backend:
   ```bash
   cd backend/carcircle
   ```
2. Configure MongoDB (defaults in `src/main/resources/application.properties`):
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/cars_circle
   spring.data.mongodb.database=cars_circle
   ```
3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```
4. API base: `http://localhost:8080`

## Frontend Setup (React)
1. From project root:
   ```bash
   npm install
   npm run dev
   ```
2. The app runs at `http://localhost:5173` (Vite). Ensure API calls are proxied or same-origin if served together.

## Environment
- Frontend calls the backend using relative paths like `/api/...`. If you run both locally on separate ports, configure a dev proxy in Vite if needed.

## API Overview (Selected)
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Users (Admin): `GET /api/auth/users`, `POST /api/auth/users`, `PUT /api/auth/users/{id}`, `DELETE /api/auth/users/{id}`
- Vehicles: `GET /api/vehicles`, `POST /api/vehicles`, `GET /api/vehicles/{id}`, `PUT /api/vehicles/{id}`, `DELETE /api/vehicles/{id}`
- Cars (public list): `GET /api/cars`, `GET /api/cars/{id}`
- Bookings: `GET /api/bookings`, `POST /api/bookings`
- Dashboard: `GET /api/dashboard/{role}`



## Testing
- Start MongoDB, backend, then frontend
- Create a user via signup or admin panel
- Test: add/edit/delete vehicles; create booking; edit profile; role-based page access

## Deployment
- Build frontend: `npm run dev` (outputs to `dist/`)
- Build backend jar: `cd backend\carcircle; mvn spring-boot:run`
- Serve frontend statically or integrate with Spring static resources as desired

## License
KJSSE/SVU: K J Somaiya School of Engineering / Somaiya Vidyavihar University


