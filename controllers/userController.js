const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// Get all users
async function getAllUsers(req, res) {
    try {
        const [rows] = await pool.query('SELECT user_id, fullname, username, created_at FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT user_id, fullname, username FROM users WHERE user_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { fullname, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)', [fullname, username, hashedPassword]);
        res.status(201).json({ id: result.insertId, fullname, username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('UPDATE users SET fullname = ?, username = ?, password = ? WHERE user_id = ?', [fullname, username, hashedPassword, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
