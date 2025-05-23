# Task Management System

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring Google OAuth authentication.

## 🚀 Features

- **User Authentication**
  - Google OAuth 2.0 integration
  - Secure session management
  - Protected routes

- **Task Management**
  - Create, read, update, and delete tasks
  - Assign tasks to team members
  - Set deadlines and track status
  - Filter and search tasks

- **Dashboard**
  - Task statistics overview
  - Status distribution
  - Upcoming deadlines
  - Quick actions

- **Reports**
  - Generate PDF reports
  - Task status summaries
  - Deadline tracking

## 🛠️ Tech Stack

- **Frontend:**
  - React.js
  - Bootstrap 5
  - Context API for state management
  - Axios for API requests

- **Backend:**
  - Node.js & Express.js
  - MongoDB & Mongoose
  - Passport.js for authentication
  - JWT for session management

## 🏗️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/task-manager-3.git
cd task-manager-3
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd ../backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**
```bash
# In backend directory, create .env file
MONGO_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:3000
```

4. **Run the application**
```bash
# Start backend server
cd backend
nodemon server.js

# Start frontend
cd ../frontend
npm start
```

## 🌐 API Endpoints

### Auth Routes
- `GET /api/auth/google` - Google authentication
- `GET /api/auth/user` - Get current user
- `GET /api/auth/logout` - Logout user

### Task Routes
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/report/pdf` - Generate PDF report


## 📞 Contact

Anuja Geeth - [@anujageeth](https://www.linkedin.com/in/anujageeth/)
Project Link: [https://github.com/anujageeth/task-manager-3](https://github.com/anujageeth/task-manager-3)
