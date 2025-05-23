import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createTask } from '../services/taskService';

const AddTask = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    assignedTo: '',
    status: 'Pending'
  });

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
      await createTask(formData);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creating task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-primary bg-opacity-10 border-0">
              <h1 className="h4 text-primary mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Create New Task
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
                  <label className="form-label" htmlFor="title">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    required
                    placeholder="Enter task title"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="description">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    required
                    placeholder="Enter task description"
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="deadline">
                      Deadline <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="form-control"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="assignedTo">
                      Assigned To <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="assignedTo"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      className="form-control"
                      required
                      placeholder="Enter assignee name"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between align-items-center border-top pt-4 mt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/tasks')}
                    className="btn btn-light btn-lg"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Create Task
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

export default AddTask;