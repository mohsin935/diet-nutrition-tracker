const mongoose = require('mongoose');

// Meal Schema (Data Access Layer - DAL)
const mealSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, default: 0 },
    qty: { type: Number, default: 1 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meal', mealSchema);