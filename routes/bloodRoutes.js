// routes/bloodRoutes.js
const express = require('express');
const { requestBlood, checkAvailability } = require('../controllers/bloodController');
const router = express.Router();

// Request blood
router.post('/request', requestBlood);

// Check blood availability
router.get('/availability/:bloodType', checkAvailability);

module.exports = router;
