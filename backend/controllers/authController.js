const User = require('../models/user');

// Business Logic Layer: User Signup & Login
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = new User({ name, email, password, setupComplete: false });
        await newUser.save();

        res.status(201).json({ success: true, message: 'Account created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({ success: true, message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.saveGoals = async (req, res) => {
    try {
        const { userId } = req.params;
        const { caloriesTarget, proteinTarget, waterTarget, weight } = req.body;
        const goals = [caloriesTarget, proteinTarget, waterTarget, weight];

        if (
            !/^[a-f\d]{24}$/i.test(userId) ||
            goals.some(value => typeof value !== 'number' || !Number.isFinite(value) || value <= 0)
        ) {
            return res.status(400).json({ success: false, message: 'Please provide valid nutrition goals.' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { caloriesTarget, proteinTarget, waterTarget, weight, setupComplete: true },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({ success: true, message: 'Goals saved successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};