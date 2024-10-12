const express = require('express');
const {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require('../controllers/departmentController');

const router = express.Router();

// Routes for department management
router.get('/', getAllDepartments);                   // Get all departments
router.get('/:id', getDepartmentById);                // Get department by ID
router.post('/', createDepartment);                   // Create a new department
router.put('/:id', updateDepartment);                 // Update a department
router.delete('/:id', deleteDepartment);              // Delete a department

module.exports = router;
