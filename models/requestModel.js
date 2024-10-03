// models/requestModel.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    bloodType: {
        type: String,
        required: true,
    },
    unitsRequested: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Fulfilled', 'Rejected'],
        default: 'Pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
