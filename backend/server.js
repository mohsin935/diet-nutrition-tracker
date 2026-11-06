const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const mealRoutes = require('./routes/mealRoutes.js');

const app = express();

// Connect Data Access Layer (Database)
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Presentation & Business Logic Routing
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);

// app.get('/', (req, res) => {
//     res.send('NutriTrack Backend API is Running Successfully!');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
