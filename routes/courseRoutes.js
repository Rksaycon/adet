const express = require('express');
const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

// CRUD routes for courses
router.get('/', getAllCourses);               // Get all courses
router.get('/:id', getCourseById);           // Get course by ID
router.post('/', createCourse);               // Create a new course
router.put('/:id', updateCourse);             // Update a course
router.delete('/:id', deleteCourse);          // Delete a course

module.exports = router;
