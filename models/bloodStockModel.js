const mongoose = require('mongoose');

const bloodStockSchema = mongoose.Schema({
    bloodType: {
        type: String,
        required: true,
        unique: true
    },
    unitsAvailable: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BloodStock', bloodStockSchema);
