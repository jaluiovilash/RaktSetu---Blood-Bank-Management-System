const Donor = require('../models/donorModel');
const { sendEmergencyNotification, sendEmailNotification, sendPushNotification } = require('../utils/notificationUtils');

// notificationController.js
exports.triggerEmergency = async (req, res) => {
    const { donorPhoneNumber, location } = req.body;

    if (!location || !location.latitude || !location.longitude) {
        return res.status(400).json({ success: false, message: 'Location data is required' });
    }

    const { latitude, longitude } = location;

    // Your logic for sending notifications
    console.log('Donor Phone Number:', donorPhoneNumber);
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    // Additional code to send notification using Twilio...
};
