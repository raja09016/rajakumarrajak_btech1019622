# Task Management System (Kanban Board)

This project is a full-stack Task Management System with user authentication
and a Kanban-style task board. Users can register, log in, and manage their
tasks using a drag-and-drop interface.

# Click Here

https://rajakumarrajak-btech1019622.vercel.app/login


<img width="1577" height="825" alt="image" src="https://github.com/user-attachments/assets/6ee28d80-74c0-472d-a35e-70d970a69618" />

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)

## ✨ Features

### User Authentication
- User registration with validation
- Secure login with JWT tokens
- Protected routes and API endpoints
- User profile management (view, update, delete)

### Task Management
- Create, read, update, and delete tasks
- Each task includes: title, description, status, due date
- Tasks are user-specific (isolated by authentication)
- Filter tasks by status (pending, in-progress, completed)
- Automatic validation of due dates

### Kanban Board
- Three-column layout: Pending, In Progress, Completed
- Drag and drop tasks between columns
- Real-time status updates via API
- Visual indicators for overdue tasks
- Responsive design for mobile and desktop

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Validation**: express-validator

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Drag & Drop**: react-beautiful-dnd
- **Styling**: Tailwind CSS
- **Icons**: lucide-react

## 📁 Project Structure

```
rajakumarrajak_btech10196/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── KanbanBoard.jsx   # Main board component
│   │   │   ├── TaskCard.jsx      # Individual task card
│   │   │   ├── AddTaskModal.jsx  # Create task modal
│   │   │   ├── EditTaskModal.jsx # Edit task modal
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   └── Profile.jsx       # User profile page
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication state
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)

## 🚀 Installation

### 1. Clone the Repository
```bash

git clone https://github.com/raja09016/rajakumarrajak_btech1019622.git
cd rajakumarrajak_btech1019622


```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🔐 Environment Variables

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Important**: Change `JWT_SECRET` to a strong, random string in production.

### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS/Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

### Start Frontend Development Server
Open a new terminal:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.new@example.com",
  "password": "newpassword123"
}
```

#### Delete User Profile
```http
DELETE /api/auth/profile
Authorization: Bearer <token>
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>

# Optional: Filter by status
GET /api/tasks?status=pending
GET /api/tasks?status=in-progress
GET /api/tasks?status=completed
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "due_date": "2024-12-31"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "due_date": "2024-12-31"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

## 🎨 Features Walkthrough

### User Registration & Login
1. Navigate to the registration page
2. Enter your name, email, and password (min 6 characters)
3. Upon successful registration, you'll be automatically logged in
4. JWT token is stored in localStorage for session persistence

### Creating Tasks
1. Click the "Add Task" button on the dashboard
2. Fill in task details (title, description, status, due date)
3. Submit to create the task
4. Task appears in the appropriate column based on status

### Drag & Drop
1. Click and hold any task card
2. Drag it to a different column
3. Release to drop
4. Task status updates automatically via API

### Editing Tasks
1. Click the edit icon on any task card
2. Modify task details in the modal
3. Save changes to update the task

### Profile Management
1. Click "Profile" in the navigation bar
2. Update your name, email, or password
3. Save changes to update your profile
4. Option to delete account (deletes all tasks)

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs before storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Both frontend and backend routes are protected
- **Input Validation**: Comprehensive validation on all inputs
- **Error Handling**: Meaningful error messages without exposing sensitive data
- **CORS**: Configured to allow requests only from the frontend URL

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🚦 Git Best Practices

This project follows proper Git practices:
- Meaningful commit messages
- Incremental commits showing development progress
- `.gitignore` files to exclude:
  - `node_modules/`
  - `.env` files
  - Build outputs
  - IDE configuration files

## 🧪 Testing

To run the application in production mode:

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check if the `MONGODB_URI` in `.env` is correct
- Verify MongoDB is listening on the correct port

### Port Already in Use
- Change the `PORT` in backend `.env` file
- Kill the process using the port: `lsof -ti:5000 | xargs kill`

### CORS Errors
- Ensure `CLIENT_URL` in backend `.env` matches your frontend URL
- Check that both servers are running

### Authentication Issues
- Clear localStorage and login again
- Verify JWT_SECRET is set in backend `.env`
- Check token expiration (default: 30 days)

## 📄 License

This project is created for educational purposes as part of an internship assignment.

## 👤 Author

Raja Kumar Rajak

---

**Note**: This is a complete, production-ready application with all features implemented as per the assignment requirements. The code is original, well-structured, and follows industry best practices.
