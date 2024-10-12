// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController'); // Ensure this path is correct

const router = express.Router();

router.post('/register', register);
router.post('/login', login); // Add this line for login

module.exports = router;
