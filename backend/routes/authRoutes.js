const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User Authentication Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put('/goals/:userId', authController.saveGoals);

module.exports = router;