// routes/studentRoutes.js
const express = require('express');
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const router = express.Router();

router.get('/', getAllStudents);                // GET /api/students
router.get('/:id', getStudentById);             // GET /api/students/:id
router.post('/', createStudent);                // POST /api/students
router.put('/:id', updateStudent);              // PUT /api/students/:id
router.delete('/:id', deleteStudent);           // DELETE /api/students/:id

module.exports = router;
