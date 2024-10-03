// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Donor = require('../models/donorModel');
const User = require('../models/userModel'); // Assuming you're using a User model

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Register a new donor
exports.registerDonor = async (req, res) => {
    const { name, email, password, bloodType } = req.body;

    // Check if all fields are filled
    if (!name || !email || !password || !bloodType) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if donor already exists
    const donorExists = await Donor.findOne({ email });
    if (donorExists) {
        return res.status(400).json({ message: 'Donor already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new donor
    const donor = await Donor.create({
        name,
        email,
        password: hashedPassword,
        bloodType,
    });

    if (donor) {
        res.status(201).json({
            _id: donor._id,
            name: donor.name,
            email: donor.email,
            bloodType: donor.bloodType,
            token: generateToken(donor._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid donor data' });
    }
};

// Login a donor
exports.loginDonor = async (req, res) => {
    const { email, password } = req.body;

    // Check for donor email
    const donor = await Donor.findOne({ email });

    if (donor && (await bcrypt.compare(password, donor.password))) {
        res.json({
            _id: donor._id,
            name: donor.name,
            email: donor.email,
            bloodType: donor.bloodType,
            token: generateToken(donor._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Get donor profile (protected route)
exports.getDonorProfile = async (req, res) => {
    const donor = await Donor.findById(req.user._id).select('-password');
    if (donor) {
        res.json(donor);
    } else {
        res.status(404).json({ message: 'Donor not found' });
    }
};
