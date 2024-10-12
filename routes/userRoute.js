const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController'); // Ensure the path is correct
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for user management
router.get('/',authenticateToken, getAllUsers);              // Get all users
router.get('/:id', getUserById);          // Get user by ID
router.post('/', createUser);              // Create a new user
router.put('/:id', updateUser);            // Update a user
router.delete('/:id', deleteUser);         // Delete a user

module.exports = router;
