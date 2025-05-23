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

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

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
      <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {message && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
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
            <Link to="/tasks/add" className="btn btn-success btn-lg">
              <i className="bi bi-plus-circle me-2"></i>
              Add Task
            </Link>
            <button onClick={generatePDF} className="btn btn-primary btn-lg">
              <i className="bi bi-download me-2"></i>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4">Title</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Deadline</th>
                <th className="text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-4">
                    <Link to={`/tasks/${task._id}`} className="text-decoration-none">
                      {task.title}
                    </Link>
                  </td>
                  <td>{task.assignedTo}</td>
                  <td>
                    <span className={`badge ${
                      task.status === 'Done' ? 'bg-success' :
                      task.status === 'In Progress' ? 'bg-warning text-dark' :
                      'bg-secondary'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  <td className="text-end px-4">
                    <div className="btn-group" role="group">
                      <Link
                        to={`/tasks/edit/${task._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </Link>
                      <Link
                        to={`/tasks/${task._id}`}
                        className="btn btn-outline-info btn-sm"
                      >
                        <i className="bi bi-eye me-1"></i>
                        View
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowDeleteModal(true);
                        }}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="bi bi-trash me-1"></i>
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