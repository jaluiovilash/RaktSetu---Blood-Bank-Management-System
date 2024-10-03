const express = require('express');
const { triggerEmergency } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to send emergency notifications to nearby donors
router.post('/emergency', protect, triggerEmergency);

module.exports = router;
