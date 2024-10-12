// /controllers/studentController.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs'); // Assuming students also have passwords

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT student_id, fullname, username, created_at FROM students');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get student by ID
const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT student_id, fullname, username FROM students WHERE student_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new student
const createStudent = async (req, res) => {
    const { fullname, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO students (fullname, username, password) VALUES (?, ?, ?)', [fullname, username, hashedPassword]);
        res.status(201).json({ id: result.insertId, fullname, username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a student
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { fullname, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('UPDATE students SET fullname = ?, username = ?, password = ? WHERE student_id = ?', [fullname, username, hashedPassword, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
