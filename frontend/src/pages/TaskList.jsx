import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {message && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Tasks</h2>
        <div className="space-x-4">
          <Link
            to="/tasks/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Task
          </Link>
          <button
            onClick={generatePDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/tasks/${task._id}`} className="text-blue-600 hover:text-blue-800">
                    {task.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{task.assignedTo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    task.status === 'Done' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <Link
                    to={`/tasks/edit/${task._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/tasks/${task._id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;