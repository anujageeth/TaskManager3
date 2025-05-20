// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middlewares/auth'); // Changed from { ensureAuth } to auth
const PDFDocument = require('pdfkit');

// Middleware to ensure user is authenticated
router.use(auth); // Changed from ensureAuth to auth

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Private
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/tasks
// @desc    Create a task
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, description, deadline, assignedTo, status } = req.body;

    // Validation
    if (!title || !description || !deadline || !assignedTo) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newTask = new Task({
      title,
      description,
      deadline,
      assignedTo,
      status: status || 'Pending',
      createdBy: req.user.id
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get task by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    res.json(task);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { title, description, deadline, assignedTo, status } = req.body;
    
    // Build task object
    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (deadline) taskFields.deadline = deadline;
    if (assignedTo) taskFields.assignedTo = assignedTo;
    if (status) taskFields.status = status;
    taskFields.updatedAt = Date.now();

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Update
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.remove();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/tasks/report/pdf
// @desc    Generate PDF report of all tasks
// @access  Private
router.get('/report/pdf', async (req, res) => {
  try {
    // Get all tasks
    const tasks = await Task.find().sort({ deadline: 1 });
    
    // Create PDF
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=task-report.pdf');
    
    // Pipe PDF to response
    doc.pipe(res);
    
    // Add content to PDF
    doc.fontSize(20).text('Task Management Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown();
    
    // Add task table
    doc.fontSize(14).text('Tasks:', { underline: true });
    doc.moveDown();
    
    // Loop through tasks
    tasks.forEach((task, index) => {
      doc.fontSize(12).text(`${index + 1}. ${task.title}`, { underline: true });
      doc.fontSize(10).text(`Description: ${task.description}`);
      doc.fontSize(10).text(`Deadline: ${new Date(task.deadline).toLocaleDateString()}`);
      doc.fontSize(10).text(`Assigned To: ${task.assignedTo}`);
      doc.fontSize(10).text(`Status: ${task.status}`);
      doc.moveDown();
    });
    
    // Add summary
    doc.moveDown();
    doc.fontSize(12).text('Summary:', { underline: true });
    
    const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
    const doneTasks = tasks.filter(task => task.status === 'Done').length;
    
    doc.fontSize(10).text(`Total Tasks: ${tasks.length}`);
    doc.fontSize(10).text(`Pending Tasks: ${pendingTasks}`);
    doc.fontSize(10).text(`In Progress Tasks: ${inProgressTasks}`);
    doc.fontSize(10).text(`Completed Tasks: ${doneTasks}`);
    
    // Finalize PDF
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;