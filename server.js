const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bloodBankRoutes = require('./routes/bloodBankRoutes');
const bloodRequestRoutes = require('./routes/bloodRequestRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);

// Blood Bank Routes
app.use('/api/bloodbank', bloodBankRoutes);

// Hospital Routes
app.use('/api/hospitals', bloodRequestRoutes);

// Notification Routes
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
