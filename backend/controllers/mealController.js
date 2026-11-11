const Meal = require('../models/meal');
const mongoose = require('mongoose');

// Business Logic Layer: Meal Logging & Daily Calculations
exports.logMeal = async (req, res) => {
    try {
        const { userId, name, category, calories, protein, qty } = req.body;
        const finalQty = qty === undefined ? 1 : qty;
        const finalProtein = protein === undefined ? 0 : protein;
        const finalCategory = category === undefined ? 'Snack' : category;
        

        if (
            typeof name !== 'string' ||
            !name.trim() ||
            !mongoose.Types.ObjectId.isValid(userId) ||
            typeof calories !== 'number' ||
            !Number.isFinite(calories) ||
            calories <= 0 ||
            !Number.isInteger(finalQty) ||
            finalQty <= 0 ||
            typeof finalProtein !== 'number' ||
            !Number.isFinite(finalProtein) ||
            finalProtein < 0 ||
            !['Breakfast', 'Lunch', 'Dinner', 'Snack'].includes(finalCategory)
        ) {
            return res.status(400).json({ success: false, message: 'Please provide valid meal details.' });
        }

        const newMeal = new Meal({
            userId,
            name: name.trim(),
            category: finalCategory,
            calories: calories * finalQty,
            protein: finalProtein * finalQty,
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
        const startOfNextDay = new Date(startOfDay);
        startOfNextDay.setDate(startOfNextDay.getDate() + 1);

        const meals = await Meal.find({ userId, date: { $gte: startOfDay, $lt: startOfNextDay } });

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

exports.deleteTodayMeals = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'A valid user ID is required.' });
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const startOfNextDay = new Date(startOfDay);
        startOfNextDay.setDate(startOfNextDay.getDate() + 1);

        const result = await Meal.deleteMany({
            userId,
            date: { $gte: startOfDay, $lt: startOfNextDay }
        });

        res.status(200).json({
            success: true,
            message: "Today's meals were cleared.",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};