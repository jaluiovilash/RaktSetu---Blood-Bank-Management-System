const express = require('express');
const router = express.Router();
const { processHospitalRequest } = require('../controllers/bloodRequestController');

// Middleware to protect routes (only accessible by staff after authentication)
const { protect } = require('../middleware/authMiddleware');

// Post route to handle hospital blood requests
router.post('/request', protect, processHospitalRequest);

module.exports = router;
