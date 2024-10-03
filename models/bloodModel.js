// models/bloodModel.js
const mongoose = require('mongoose');

const bloodSchema = mongoose.Schema(
    {
        bloodType: {
            type: String,
            required: true,
            unique: true,
        },
        unitsAvailable: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Blood = mongoose.model('Blood', bloodSchema);

module.exports = Blood;
