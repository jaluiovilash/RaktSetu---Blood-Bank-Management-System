const express = require('express');
const {
    registerUser,
    loginUser,
    registerDonor,
    loginDonor,
    getDonorProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Register route for blood bank users
router.post('/register', registerUser);

// Login route for blood bank users
router.post('/login', loginUser);

// Register route for donors
router.post('/donor/register', registerDonor);

// Login route for donors
router.post('/donor/login', loginDonor);

// Get donor profile (protected route)
router.get('/donor/profile', protect, getDonorProfile);

module.exports = router;
