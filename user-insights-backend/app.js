// backend/app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define your API routes
app.use('/api/users', userRoutes);


// Routes
app.use('/users', userRoutes);

module.exports = app;
