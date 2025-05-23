// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');

// Apply auth middleware to all routes
router.use(auth);

// Routes
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/report/pdf', taskController.generatePdfReport);

module.exports = router;