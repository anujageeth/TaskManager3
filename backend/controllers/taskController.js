const Task = require('../models/Task');
const PDFDocument = require('pdfkit');

// Get all tasks for current user
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create task with user reference
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo, status } = req.body;
    
    const newTask = new Task({
      title,
      description,
      deadline,
      assignedTo,
      status: status || 'Pending',
      createdBy: req.user._id
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
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
};

// Update task with user check
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!task) {
      return res.status(404).json({ msg: 'Task not found or unauthorized' });
    }

    // Update task
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete task with user check
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!task) {
      return res.status(404).json({ msg: 'Task not found or unauthorized' });
    }

    await Task.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Generate PDF report
exports.generatePdfReport = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 });
    
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=task-report.pdf');
    
    doc.pipe(res);
    
    doc.fontSize(20).text('Task Management Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).text('Tasks:', { underline: true });
    doc.moveDown();
    
    tasks.forEach((task, index) => {
      doc.fontSize(12).text(`${index + 1}. ${task.title}`, { underline: true });
      doc.fontSize(10).text(`Description: ${task.description}`);
      doc.fontSize(10).text(`Deadline: ${new Date(task.deadline).toLocaleDateString()}`);
      doc.fontSize(10).text(`Assigned To: ${task.assignedTo}`);
      doc.fontSize(10).text(`Status: ${task.status}`);
      doc.moveDown();
    });
    
    doc.moveDown();
    doc.fontSize(12).text('Summary:', { underline: true });
    
    const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
    const doneTasks = tasks.filter(task => task.status === 'Done').length;
    
    doc.fontSize(10).text(`Total Tasks: ${tasks.length}`);
    doc.fontSize(10).text(`Pending Tasks: ${pendingTasks}`);
    doc.fontSize(10).text(`In Progress Tasks: ${inProgressTasks}`);
    doc.fontSize(10).text(`Completed Tasks: ${doneTasks}`);
    
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};