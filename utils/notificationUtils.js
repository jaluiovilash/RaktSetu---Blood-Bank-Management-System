const twilio = require('twilio');

// Load credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Log the environment variables to ensure they are being loaded correctly
console.log("TWILIO_ACCOUNT_SID:", accountSid);
console.log("TWILIO_AUTH_TOKEN:", authToken);

// Ensure credentials are loaded
if (!accountSid || !authToken || !twilioPhoneNumber) {
    throw new Error('Twilio credentials are missing. Check your .env file.');
}

// Initialize Twilio client
const client = new twilio(accountSid, authToken);

/**
 * Sends an SMS notification to the recipient's phone number
 * @param {string} message - The message to be sent via SMS
 * @param {string} recipientPhone - The recipient's phone number
 * @returns {Promise} - Twilio message response
 */
const sendSmsNotification = async (message, recipientPhone) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: twilioPhoneNumber, // Twilio phone number from .env
            to: recipientPhone, // Recipient phone number
        });
        return response;
    } catch (error) {
        console.error('Failed to send SMS:', error);
        throw error;
    }
};

module.exports = { sendSmsNotification };
