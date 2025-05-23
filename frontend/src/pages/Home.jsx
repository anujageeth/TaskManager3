// frontend/src/pages/Home.js
import { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  BsListCheck, 
  BsCheckCircle, 
  BsCalendar3, 
  BsFileEarmarkPdf 
} from 'react-icons/bs';

const Home = () => {
  const { currentUser, loading } = useContext(AuthContext);

  // Only redirect if we're not loading and user is authenticated
  if (!loading && currentUser) {
    return <Navigate to="/dashboard" />;
  }

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Show home page content when not authenticated
  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3">
            Welcome to Task Management System
          </h1>
          <p className="lead text-muted mb-5">
            Efficiently manage your tasks with our comprehensive task management solution.
          </p>

          <div className="mt-5">
            <Link
              to="/login"
              className="btn btn-primary btn-lg px-5 py-3 d-inline-flex align-items-center"
            >
              <i className="bi bi-arrow-right-circle me-2 fs-4"></i>
              Get Started
            </Link>
          </div>

          <br/><br/>
          
          <div className="mb-5">
            <h2 className="h3 mb-4">Features:</h2>
            
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="text-primary mb-3">
                      <BsListCheck size={32} />
                    </div>
                    <h3 className="h5 card-title">Task Management</h3>
                    <p className="card-text text-muted">
                      Create, view, update, and delete tasks with ease.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="text-success mb-3">
                      <BsCheckCircle size={32} />
                    </div>
                    <h3 className="h5 card-title">Task Status Tracking</h3>
                    <p className="card-text text-muted">
                      Track the status of tasks with customizable statuses.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="text-info mb-3">
                      <BsCalendar3 size={32} />
                    </div>
                    <h3 className="h5 card-title">Deadline Management</h3>
                    <p className="card-text text-muted">
                      Set and track deadlines for each task.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="text-danger mb-3">
                      <BsFileEarmarkPdf size={32} />
                    </div>
                    <h3 className="h5 card-title">PDF Reports</h3>
                    <p className="card-text text-muted">
                      Generate and download PDF reports of tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;