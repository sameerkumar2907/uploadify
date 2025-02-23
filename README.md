# File Management System

This project is a full-stack file management system that allows users to upload, preview, download, and delete files. The backend is built with Node.js (Express), Prisma (ORM), and PostgreSQL (dockerized), while the frontend is built with React.

## Tech Stack

### Frontend
- React (UI)
- Redux (State Management)
- Material UI (for Icons, Buttons, etc.)

### Backend
- Node.js with Express.js (API)
- PostgreSQL (Database)
- Prisma (ORM)
- Multer (File uploads)

## Repository structure
### Frontend
```bash
frontend/
│── public/
│── src/
│   ├── components/
│   │   ├── FileList.js
│   │   ├── FileUpload.js
│   ├── redux/
│   │   ├── actions/
│   │   ├── reducers/
│   │   ├── store.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│── .gitignore
│── package.json
│── yarn.lock
```

### Backend
```bash
backend/
│── prisma/
│── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│── uploads/
│── .env
│── docker-compose.yml
│── package.json
│── .gitignore
```

## Backend Setup
### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/sameerkumar2907/uploadify.git
cd backend
```

### 2. Start the PostgreSQL container
```bash
docker-compose up -d
```

### 3. Install dependencies
```bash
yarn install
```

### 4. Create a .env file in backend/ and add:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### 5. Run migrations:
```bash
npx prisma migrate dev --name init
```

### 6. Start the server
```bash
yarn dev
```

## Frontend Setup
### 1. Go to the frontend/ folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Start the frontend
```bash
npm start
```

## To-Do & Improvements
- Store files in S3/Cloud Storage instead of local folder.
- UI improvements (drag & drop file upload feature).