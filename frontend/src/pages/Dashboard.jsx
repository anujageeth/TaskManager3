// frontend/src/pages/Dashboard.js
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAllTasks } from '../services/taskService';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Count tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const completedTasks = tasks.filter(task => task.status === 'Done').length;

  // Get upcoming deadlines (tasks due in the next 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingDeadlines = tasks
    .filter(task => {
      const deadline = new Date(task.deadline);
      return deadline >= today && deadline <= nextWeek && task.status !== 'Done';
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold">
          Welcome back, {currentUser?.name || 'User'}! 👋
        </h1>
        <p className="mt-2 text-blue-100">Manage your tasks and stay productive</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1 bg-blue-100 rounded-full">
              <div className="h-1 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-500">{pendingTasks}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1 bg-yellow-100 rounded-full">
              <div className="h-1 bg-yellow-500 rounded-full" 
                style={{ width: `${(pendingTasks / tasks.length) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* In Progress Tasks Card */}
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-blue-500">{inProgressTasks}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1 bg-blue-100 rounded-full">
              <div className="h-1 bg-blue-500 rounded-full" 
                style={{ width: `${(inProgressTasks / tasks.length) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-500">{completedTasks}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1 bg-green-100 rounded-full">
              <div className="h-1 bg-green-500 rounded-full" 
                style={{ width: `${(completedTasks / tasks.length) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions and Deadlines Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/tasks/new" 
              className="flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Task
            </Link>
            <Link to="/tasks" 
              className="flex items-center justify-center w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              View All Tasks
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Deadlines</h2>
          {upcomingDeadlines.length > 0 ? (
            <div className="space-y-4">
              {upcomingDeadlines.slice(0, 3).map(task => (
                <Link key={task._id} to={`/tasks/${task._id}`} 
                  className="block p-4 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Due: {new Date(task.deadline).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No upcoming deadlines</p>
              <p className="text-sm text-gray-400 mt-1">You're all caught up! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;