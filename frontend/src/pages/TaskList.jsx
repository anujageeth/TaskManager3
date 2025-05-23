import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from '../services/api';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    api.get("/api/tasks")
      .then(res => {
        setTasks(res.data);
        setError("");
      })
      .catch(err => {
        setError("Failed to load tasks: " + (err.response?.data?.message || err.message));
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Task Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableColumn = ["Title", "Assigned To", "Status", "Deadline"];
    const tableRows = [];

    tasks.forEach(task => {
      const taskData = [
        task.title,
        task.assignedTo,
        task.status,
        new Date(task.deadline).toLocaleDateString()
      ];
      tableRows.push(taskData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    doc.save("task_report.pdf");
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/tasks/${selectedTask._id}`);
      setTasks(tasks.filter(task => task._id !== selectedTask._id));
      setShowDeleteModal(false);
      setMessage('Task deleted successfully');
    } catch (err) {
      setError("Failed to delete task: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {message && (
        <div className="alert alert-success alert-dismissible mb-4" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          {message}
        </div>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h2 fw-bold text-primary mb-0">
          <i className="bi bi-list-task me-2"></i>
          All Tasks
        </h2>
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <input
              type="search"
              className="form-control form-control-lg pe-5"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '300px' }}
            />
            <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
          </div>
          <div className="btn-group" role="group">
            <Link
              to="/tasks/add"
              className="btn btn-success btn-lg shadow-sm"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Task
            </Link>
            <button
              onClick={generatePDF}
              className="btn btn-primary btn-lg shadow-sm"
            >
              <i className="bi bi-download me-2"></i>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible mb-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}

      <div className="card shadow-lg border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="px-4 py-3 fw-semibold text-uppercase small">
                    <i className="bi bi-card-text me-2"></i>Title
                  </th>
                  <th scope="col" className="px-4 py-3 fw-semibold text-uppercase small">
                    <i className="bi bi-person-fill me-2"></i>Assigned To
                  </th>
                  <th scope="col" className="px-4 py-3 fw-semibold text-uppercase small">
                    <i className="bi bi-flag-fill me-2"></i>Status
                  </th>
                  <th scope="col" className="px-4 py-3 fw-semibold text-uppercase small">
                    <i className="bi bi-calendar-event me-2"></i>Deadline
                  </th>
                  <th scope="col" className="px-4 py-3 fw-semibold text-uppercase small">
                    <i className="bi bi-gear-fill me-2"></i>Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task._id} className="border-bottom">
                    <td className="px-4 py-3">
                      <Link 
                        to={`/tasks/${task._id}`} 
                        className="text-decoration-none fw-medium"
                      >
                        {task.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center">
                        {task.assignedTo}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge rounded-pill fs-6 ${
                        task.status === 'Done' ? 'bg-success' :
                        task.status === 'In Progress' ? 'bg-warning text-dark' :
                        'bg-secondary'
                      }`}>
                        {task.status === 'Done' && <i className="bi bi-check-circle me-1"></i>}
                        {task.status === 'In Progress' && <i className="bi bi-clock me-1"></i>}
                        {task.status === 'Pending' && <i className="bi bi-pause-circle me-1"></i>}
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-muted">
                        <i className="bi bi-calendar3 me-1"></i>
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="btn-group" role="group">
                        <Link
                          to={`/tasks/edit/${task._id}`}
                          className="btn btn-outline-primary px-3 py-1"
                          title="Edit Task"
                        >
                          <i className="bi bi-pencil fs-5 me-1"></i>
                          Edit
                        </Link>
                        <Link
                          to={`/tasks/${task._id}`}
                          className="btn btn-outline-info px-3 py-1"
                          title="View Task"
                        >
                          <i className="bi bi-eye fs-5 me-1"></i>
                          View
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setShowDeleteModal(true);
                          }}
                          className="btn btn-outline-danger px-3 py-1"
                          title="Delete Task"
                        >
                          <i className="bi bi-trash fs-5 me-1"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        taskTitle={selectedTask?.title}
      />
    </div>
  );
}

export default TaskList;