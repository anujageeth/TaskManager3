// frontend/src/pages/Dashboard.js
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { 
  BsListTask, 
  BsCheckCircleFill, 
  BsClockHistory, 
  BsHourglassSplit 
} from 'react-icons/bs';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        setError('Error loading tasks');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;

  return (
    <div className="container-fluid py-4">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col">
          <div className="card border-0 bg-primary text-white shadow-lg">
            <div className="card-body p-4">
              <h1 className="display-6 mb-0">
                <i className="bi bi-person-circle me-3"></i>
                Welcome, {currentUser?.name || 'User'}!
              </h1>
              <p className="lead mt-2 mb-0 opacity-75">Here's your task overview</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <BsListTask className="text-primary" size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-1">Total Tasks</h6>
                  <h2 className="mb-0">{totalTasks}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <BsCheckCircleFill className="text-success" size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-1">Completed</h6>
                  <h2 className="mb-0">{completedTasks}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <BsClockHistory className="text-warning" size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-1">In Progress</h6>
                  <h2 className="mb-0">{inProgressTasks}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-secondary bg-opacity-10 p-3 rounded">
                    <BsHourglassSplit className="text-secondary" size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-1">Pending</h6>
                  <h2 className="mb-0">{pendingTasks}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="row">
        <div className="col">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Tasks</h5>
                <Link to="/tasks" className="btn btn-primary">
                  <i className="bi bi-list me-2"></i>
                  View All Tasks
                </Link>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="px-4">Title</th>
                      <th scope="col">Status</th>
                      <th scope="col">Deadline</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.slice(0, 5).map(task => (
                      <tr key={task._id}>
                        <td className="px-4">{task.title}</td>
                        <td>
                          <span className={`badge ${
                            task.status === 'Done' ? 'bg-success' :
                            task.status === 'In Progress' ? 'bg-warning' :
                            'bg-secondary'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td>{new Date(task.deadline).toLocaleDateString()}</td>
                        <td>
                          <Link to={`/tasks/${task._id}`} className="btn btn-sm btn-outline-primary">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;