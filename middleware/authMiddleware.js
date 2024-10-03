const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Donor = require('../models/donorModel');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Donor.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized, token verification failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Unauthorized, no token provided' });
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
