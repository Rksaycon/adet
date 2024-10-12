// /controllers/authController.js
const pool = require('../config/database'); // Ensure the path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    const { fullname, username, password } = req.body;

    try {
        // Check if the username already exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert the new user into the database
        const [result] = await pool.query(
            'INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)',
            [fullname, username, hashedPassword]
        );

        res.status(201).json({
            id: result.insertId,
            fullname,
            username,
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
};

// Login a user
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = users[0];

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user.user_id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token and user details
        res.json({ 
            token, 
            user: { 
                id: user.user_id, 
                fullname: user.fullname, 
                username: user.username 
            } 
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

module.exports = {
    register,
    login,
};
