import api from './api';

const BASE_URL = 'http://localhost:5000/api/tasks';

export const getAllTasks = async () => {
  try {
    const response = await api.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await api.get(`${BASE_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post(BASE_URL, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`${BASE_URL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`${BASE_URL}/${taskId}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.data.msg || 'Error deleting task');
  } catch (error) {
    console.error('Delete task error:', error);
    throw error.response?.data || error;
  }
};

export const downloadPdfReport = () => {
  window.open(`${BASE_URL}/report/pdf`, '_blank');
};