import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
<<<<<<< Updated upstream
import { AuthContext } from '../context/AuthContext';
import { getTaskById, deleteTask } from '../services/taskService';

const TaskDetails = () => {
  const { taskId } = useParams();
=======
import api from '../services/api';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const TaskDetails = () => {
  const { id } = useParams();
>>>>>>> Stashed changes
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
<<<<<<< Updated upstream
        const taskData = await getTaskById(taskId);
        setTask(taskData);
=======
        const response = await api.get(`/api/tasks/${id}`);
        setTask(response.data);
        setError('');
>>>>>>> Stashed changes
      } catch (err) {
        setError('Error loading task details');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleDelete = async () => {
<<<<<<< Updated upstream
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        navigate('/tasks');
      } catch (err) {
        setError('Error deleting task');
      }
=======
    try {
      setLoading(true);
      await api.delete(`/api/tasks/${id}`);
      setShowDeleteModal(false);
      navigate('/tasks', { 
        state: { message: 'Task deleted successfully' }
      });
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting task');
      setLoading(false);
>>>>>>> Stashed changes
    }
  };

  if (loading) {
    return (
<<<<<<< Updated upstream
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
=======
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
>>>>>>> Stashed changes
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

<<<<<<< Updated upstream
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
            <div className="space-x-2">
              <Link
                to={`/tasks/edit/${taskId}`}
                className="btn-secondary"
              >
                Edit
=======
  if (!task) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-question-circle-fill me-2"></i>
          Task not found
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-4">
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="card-title h3 mb-0">{task.title}</h1>
              <div className="btn-group">
                <Link
                  to={`/tasks/edit/${id}`}
                  className="btn btn-outline-primary"
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={loading}
                  className="btn btn-outline-danger"
                >
                  <i className="bi bi-trash me-2"></i>
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <i className="bi bi-flag-fill me-2"></i>
                      Status
                    </h6>
                    <span className={`badge ${
                      task.status === 'Done' ? 'bg-success' :
                      task.status === 'In Progress' ? 'bg-warning text-dark' :
                      'bg-secondary'
                    } fs-6`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <i className="bi bi-person-fill me-2"></i>
                      Assigned To
                    </h6>
                    <p className="card-text">{task.assignedTo}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <i className="bi bi-calendar-check me-2"></i>
                      Created At
                    </h6>
                    <p className="card-text">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <i className="bi bi-calendar-event me-2"></i>
                      Deadline
                    </h6>
                    <p className="card-text">
                      {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4 border-0 bg-light">
              <div className="card-body">
                <h6 className="card-subtitle mb-3 text-muted">
                  <i className="bi bi-card-text me-2"></i>
                  Description
                </h6>
                <p className="card-text">{task.description}</p>
              </div>
            </div>

            <div className="border-top pt-4">
              <Link
                to="/tasks"
                className="btn btn-link text-decoration-none ps-0"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Tasks
>>>>>>> Stashed changes
              </Link>
              <button
                onClick={handleDelete}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-600">Status</p>
              <span className={`inline-block px-2 py-1 rounded text-sm ${
                task.status === 'Done' ? 'bg-green-100 text-green-800' :
                task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.status}
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">Assigned To</p>
              <p className="text-gray-800">{task.assignedTo}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">Created At</p>
              <p className="text-gray-800">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600">Deadline</p>
              <p className="text-gray-800">
                {new Date(task.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">Description</p>
            <p className="text-gray-800 whitespace-pre-wrap">{task.description}</p>
          </div>

          <div className="border-t pt-4">
            <Link
              to="/tasks"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;