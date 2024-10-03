const BloodStock = require('../models/bloodStockModel');

// Handle Hospital Blood Requests
exports.processHospitalRequest = async (req, res) => {
    const { bloodType, unitsRequested } = req.body; // Assuming 1 unit = 1 litre

    try {
        // Check if the blood type is available in stock
        const stock = await BloodStock.findOne({ bloodType });

        if (!stock || stock.unitsAvailable < unitsRequested) {
            return res.status(400).json({
                message: `Not enough ${bloodType} blood units available.`,
            });
        }

        // Deduct the requested units from available stock
        stock.unitsAvailable -= unitsRequested;
        await stock.save();

        // Return success response
        res.status(200).json({
            message: `Supplied ${unitsRequested} unit(s) of ${bloodType} blood to hospital.`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing hospital request.', error });
    }
};
