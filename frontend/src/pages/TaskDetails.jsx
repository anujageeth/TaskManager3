import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getTaskById, deleteTask } from '../services/taskService';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTaskById(taskId);
        setTask(taskData);
      } catch (err) {
        setError('Error loading task details');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        navigate('/tasks');
      } catch (err) {
        setError('Error deleting task');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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