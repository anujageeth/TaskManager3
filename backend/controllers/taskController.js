const Task = require('../models/Task');
const PDFDocument = require('pdfkit');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo, status } = req.body;

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

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo, status } = req.body;
    
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
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Use deleteOne() instead of remove()
    await Task.deleteOne({ _id: req.params.id });
    
    res.json({ msg: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete task error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).json({ msg: 'Server error deleting task' });
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