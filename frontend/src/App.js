import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';  // Add this import
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/tasks" element={
                <PrivateRoute>
                  <TaskList />
                </PrivateRoute>
              } />
              <Route path="/tasks/:id" element={
                <PrivateRoute>
                  <TaskDetails />
                </PrivateRoute>
              } />
              <Route path="/tasks/add" element={
                <PrivateRoute>
                  <AddTask />
                </PrivateRoute>
              } />
              <Route path="/tasks/edit/:id" element={
                <PrivateRoute>
                  <EditTask />
                </PrivateRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
