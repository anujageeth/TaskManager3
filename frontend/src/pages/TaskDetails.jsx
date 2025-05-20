import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const TaskDetails = () => {
  const { id } = useParams();  // Changed from taskId to id to match route parameter
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        console.log('Fetching task with ID:', id);
        const response = await api.get(`/api/tasks/${id}`);
        setTask(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching task:', err);
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
      console.error('Error deleting task:', err);
      setError(err.response?.data?.msg || 'Error deleting task');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Task not found
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
              <div className="space-x-2">
                <Link
                  to={`/tasks/edit/${id}`}
                  className="inline-flex items-center px-4 py-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-50 rounded-md transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  {loading ? 'Deleting...' : 'Delete'}
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