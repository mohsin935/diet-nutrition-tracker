const Meal = require('../models/Meal');

// Business Logic Layer: Meal Logging & Daily Calculations
exports.logMeal = async (req, res) => {
    try {
        const { userId, name, category, calories, protein, qty } = req.body;

        if (!name || !calories || calories <= 0) {
            return res.status(400).json({ success: false, message: 'Valid meal name and calories required' });
        }

        const finalQty = qty || 1;
        const newMeal = new Meal({
            userId,
            name,
            category: category || 'Snack',
            calories: calories * finalQty,
            protein: (protein || 0) * finalQty,
            qty: finalQty
        });

        await newMeal.save();
        res.status(201).json({ success: true, message: 'Meal logged successfully', meal: newMeal });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTodayMeals = async (req, res) => {
    try {
        const { userId } = req.params;
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const meals = await Meal.find({ userId, date: { $gte: startOfDay } });

        // Calculate totals on backend (BLL)
        const totalCals = meals.reduce((sum, item) => sum + item.calories, 0);
        const totalProtein = meals.reduce((sum, item) => sum + item.protein, 0);

        res.status(200).json({
            success: true,
            summary: { totalCals, totalProtein, mealsCount: meals.length },
            meals
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};