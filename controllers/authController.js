const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. User Registration
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Password එක හංගන්න (Hashing)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Password එක match ද බලන්න
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // JWT Token එකක් හදන්න (මේකෙන් තමයි user ලොග් වෙලා ඉන්නේ කියලා හඳුනාගන්නේ)
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: '1h' });
        
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};