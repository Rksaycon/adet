const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your route files
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const courseRoutes = require('./routes/courseRoutes'); 
const studentRoutes = require('./routes/studentRoutes'); // Import student routes
const departmentRoutes = require('./routes/departmentRoutes'); // Import department routes

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoute);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes); // Use student routes
app.use('/api/departments', departmentRoutes); // Add this line to use department routes

// Root endpoint
app.get('/', (req, res) => {
    res.send("Welcome to the API!");
});

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
