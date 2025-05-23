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
  console.log('User session:', req.user);
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json(req.user);
});

// @route   GET /api/auth/logout
// @desc    Logout user / clear cookie
// @access  Public
router.get('/logout', (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.clearCookie('connect.sid', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
});

// @route   GET /api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.get('/google', (req, res, next) => {
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account',
    accessType: 'offline',
    failureRedirect: 'http://localhost:1812/login',
    successRedirect: 'http://localhost:1812/dashboard'
  })(req, res, next);
});

// @route   GET /api/auth/google/callback
// @desc    Google authentication callback
// @access  Public
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:1812/login'
  }),
  (req, res) => {
    console.log('Google callback successful');
    res.redirect('http://localhost:1812/dashboard');
  }
);

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);

module.exports = router;