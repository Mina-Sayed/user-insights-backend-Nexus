// backend/routes/userRoutes.js
const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const { getUsers, getInsights } = require('../controllers/userController');

// Validation middleware for getUsers route
const validateGetUsers = [
  query('name').optional().isString().withMessage('Name must be a string'),
  query('active').optional().isBoolean().withMessage('Active must be a boolean'),
];

router.get('/', validateGetUsers, getUsers);
router.get('/insights', getInsights);

module.exports = router;
