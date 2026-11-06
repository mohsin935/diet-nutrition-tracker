const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Meal Operations Routes
router.post('/log', mealController.logMeal);
router.get('/today/:userId', mealController.getTodayMeals);
router.delete('/today/:userId', mealController.deleteTodayMeals);

module.exports = router;