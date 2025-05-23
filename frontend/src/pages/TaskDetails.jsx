import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/api/tasks/${id}`);
        setTask(response.data);
        setError('');
      } catch (err) {
        setError('Error loading task details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleDelete = async () => {
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
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
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
              </Link>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        taskTitle={task?.title}
      />
    </>
  );
};

export default TaskDetails;