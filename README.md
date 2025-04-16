# Patient Management System

## Setup Instructions

1. Ensure Docker and Docker Compose are installed.
2. Run the project:

```bash
docker-compose up --build -d
```
3. Initialize the DB
```bash
docker exec -it patient_backend npx prisma migrate dev --name init
```

4. Initialize Prisma Schema
```bash
docker exec -it patient_backend npx prisma generate 
```

5. Access the app:
- Frontend: http://localhost:3100
- Backend API: http://localhost:5100/api/patients


## Requirements

1. Frontend (React)

- List all patients with key info (name, age, status)

- Filter patients by status (All / Active / Inactive)

- Form to add new patients

- Option to update status (active/inactive)

- Delete a patient


2. Backend (Node.js + Express)

- Implement RESTful CRUD API for the patient


## Optional features

- Add search by patient name

- Add pagination or sorting

- Add simple validation

- Basic login (mocked)