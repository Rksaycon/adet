// /routes/studentRoutes.js
const express = require('express');
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

// Define routes for CRUD operations
router.get('/', getAllStudents);         // Get all students
router.get('/:id', getStudentById);     // Get a specific student by ID
router.post('/', createStudent);        // Create a new student
router.put('/:id', updateStudent);      // Update a student by ID
router.delete('/:id', deleteStudent);   // Delete a student by ID

module.exports = router;
