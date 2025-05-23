import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getTaskById, updateTask } from '../services/taskService';

const EditTask = () => {
<<<<<<< Updated upstream
  const { taskId } = useParams();
=======
  const { id } = useParams();
>>>>>>> Stashed changes
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    assignedTo: '',
    status: 'Pending'
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
<<<<<<< Updated upstream
        const task = await getTaskById(taskId);
=======
        const task = await getTaskById(id);
>>>>>>> Stashed changes
        setFormData({
          title: task.title,
          description: task.description,
          deadline: task.deadline.split('T')[0],
          assignedTo: task.assignedTo,
          status: task.status
        });
      } catch (err) {
        setError('Error loading task details');
      } finally {
        setInitialLoading(false);
      }
    };

<<<<<<< Updated upstream
    fetchTask();
  }, [taskId]);
=======
    if (id) {
      fetchTask();
    }
  }, [id]);
>>>>>>> Stashed changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
<<<<<<< Updated upstream
      await updateTask(taskId, formData);
      navigate('/tasks');
=======
      await updateTask(id, formData);
      navigate('/tasks', { state: { message: 'Task updated successfully' } });
>>>>>>> Stashed changes
    } catch (err) {
      setError(err.response?.data?.msg || 'Error updating task');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary bg-opacity-10 border-0">
              <h1 className="h4 text-primary mb-0">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Task
              </h1>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="deadline" className="form-label">Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                    <input
                      type="text"
                      className="form-control"
                      id="assignedTo"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between align-items-center border-top pt-4 mt-4">
                  <Link to="/tasks" className="btn btn-light btn-lg">
                    <i className="bi bi-arrow-left me-2"></i>
                    Cancel
                  </Link>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;