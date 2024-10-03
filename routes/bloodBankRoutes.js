const express = require('express');
const router = express.Router();
const { updateDonor, donateBlood, processHospitalRequest, getBloodStock } = require('../controllers/bloodBankController');

// Middleware to protect routes (only accessible by staff after authentication)
const { protect } = require('../middleware/authMiddleware');

// 1. Post route to donate blood
router.post('/donate', protect, donateBlood);

// 2. Post route to handle hospital blood requests
router.post('/request', protect, processHospitalRequest);

// 3. Get route to view blood stock (dashboard)
router.get('/stock', protect, getBloodStock);

// Route to update donor information
router.put('/donors/:id', protect, updateDonor);

module.exports = router;
