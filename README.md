# Full Stack To-Do Application

This is a **Full Stack To-Do Application** built with:

- **Frontend:** React (Vite + TypeScript), Tailwind CSS
- **Backend:** Node.js, Express.js, MySQL
- **Authentication:** JWT (JSON Web Tokens)

It allows users to register, log in, and manage their personal to-do list securely.

---

## Features

- User Registration & Login with hashed passwords (bcrypt)
- JWT-based authentication for secure API calls
- CRUD (Create, Read, Update, Delete) operations for To-Do items
- Each user has their own private to-do list
- Responsive UI built with Tailwind CSS
- API integration with Axios
- Environment variable configuration

---

## Folder Structure

### Backend
```
backend/
├── controllers/
│   ├── authController.js
│   └── todoController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── db.js
├── routes/
│   ├── authRoutes.js
│   └── todoRoutes.js
├── .env
├── package.json
└── server.js
```

### Frontend
```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── TodoApp.tsx
│   ├── App.tsx
│   ├── api.ts
│   └── main.tsx
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install express cors dotenv mysql2 bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

3. Create `.env` file:
```
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=todo_app
JWT_SECRET=your_jwt_secret
```

4. Create MySQL database & tables:
```sql
CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  text VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

5. Start backend server:
```bash
npm run dev
```

---

## Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Configure Tailwind (`tailwind.config.js`):
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
```

5. Add Tailwind to `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Start frontend:
```bash
npm run dev
```

---

## API Endpoints

### Auth Routes
- **POST** `/api/auth/register` → Register user
- **POST** `/api/auth/login` → Login user

### Todo Routes *(Requires JWT)*
- **GET** `/api/todos` → Get user's todos
- **POST** `/api/todos` → Add todo
- **PUT** `/api/todos/:id` → Update todo
- **DELETE** `/api/todos/:id` → Delete todo

---

## Environment Variables

Both backend and frontend use `.env` files for configuration.

- **Backend**:
  - `PORT`
  - `DB_HOST`
  - `DB_USER`
  - `DB_PASS`
  - `DB_NAME`
  - `JWT_SECRET`

- **Frontend** (optional):
  - `VITE_API_URL=http://localhost:8000/api`

---

## Run the Application

- Start backend: `npm run dev` inside `backend`
- Start frontend: `npm run dev` inside `frontend`
- Visit: `http://localhost:5173`

---

## License

This project is licensed under the MIT License.
