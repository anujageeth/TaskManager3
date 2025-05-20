// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const authController = require('../controllers/authController');

// @route   GET /api/auth/user
// @desc    Get logged in user
// @access  Private
router.get('/user', (req, res) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

// @route   GET /api/auth/logout
// @desc    Logout user / clear cookie
// @access  Public
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);

module.exports = router;