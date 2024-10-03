const mongoose = require('mongoose');

const bloodUnitSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true,
    },
    units: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model('BloodUnit', bloodUnitSchema);
