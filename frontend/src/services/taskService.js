import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/tasks`;

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export const getAllTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${taskId}:`, error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    throw error;
  }
};

export const downloadPdfReport = async () => {
  try {
    const response = await axios.get(`${API_URL}/report/pdf`, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tasks-report.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading PDF report:', error);
    throw error;
  }
};