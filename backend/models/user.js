const mongoose = require('mongoose');

// User Schema (Data Access Layer - DAL)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    caloriesTarget: { type: Number, default: 2000 },
    proteinTarget: { type: Number, default: 60 },
    waterTarget: { type: Number, default: 8 },
    weight: { type: Number, default: 70 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);