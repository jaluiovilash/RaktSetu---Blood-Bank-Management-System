// controllers/bloodController.js
const Blood = require('../models/bloodModel');
const Request = require('../models/requestModel');

// Request Blood
exports.requestBlood = async (req, res) => {
    const { hospitalName, bloodType, unitsRequested } = req.body;

    try {
        const bloodInventory = await Blood.findOne({ bloodType });

        if (!bloodInventory || bloodInventory.unitsAvailable < unitsRequested) {
            return res.status(400).json({ message: 'Insufficient blood units available' });
        }

        const newRequest = await Request.create({
            hospitalName,
            bloodType,
            unitsRequested,
            status: 'Pending',
        });

        // Deduct the units from the inventory
        bloodInventory.unitsAvailable -= unitsRequested;
        await bloodInventory.save();

        res.status(201).json({
            message: 'Request successful',
            request: newRequest,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Check Blood Availability
exports.checkAvailability = async (req, res) => {
    const { bloodType } = req.params;

    try {
        const bloodInventory = await Blood.findOne({ bloodType });

        if (!bloodInventory) {
            return res.status(404).json({ message: 'Blood type not found' });
        }

        res.json({
            bloodType: bloodInventory.bloodType,
            unitsAvailable: bloodInventory.unitsAvailable,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
