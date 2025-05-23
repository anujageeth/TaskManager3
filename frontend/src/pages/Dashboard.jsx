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
<<<<<<< Updated upstream
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
=======
      <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
>>>>>>> Stashed changes
      </div>
    );
  }

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;

  return (
<<<<<<< Updated upstream
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {currentUser?.name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-1">Here's an overview of your tasks</p>
      </div>

      {/* Task Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">{tasks.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-yellow-500">{pendingTasks}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold text-blue-500">{inProgressTasks}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-green-500">{completedTasks}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
=======
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
>>>>>>> Stashed changes
            </div>
          </div>
        </div>
      </div>

<<<<<<< Updated upstream
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/tasks/new" 
              className="btn-primary flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Task
            </Link>
            <Link 
              to="/tasks" 
              className="btn-secondary flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              View All Tasks
            </Link>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
          {upcomingDeadlines.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {upcomingDeadlines.slice(0, 3).map(task => (
                <li key={task._id} className="py-3">
                  <Link to={`/tasks/${task._id}`} className="block hover:bg-gray-50 rounded-md -mx-2 px-2 py-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-500">
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No upcoming deadlines in the next 7 days.</p>
          )}
          {upcomingDeadlines.length > 3 && (
            <Link to="/tasks" className="text-blue-600 hover:text-blue-800 text-sm font-medium block mt-3">
              View all deadlines
            </Link>
          )}
=======
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
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default Dashboard;