// backend/controllers/userController.js
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../users.json');

exports.getUsers = (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Read user data from the JSON file
    const usersData = fs.readFileSync(usersFilePath);
    const users = JSON.parse(usersData);

    // Filter users based on query parameters
    let filteredUsers = users;
    if (req.query.name) {
      const nameFilter = req.query.name.toLowerCase();
      filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(nameFilter));
    }
    if (req.query.active) {
      const activeFilter = req.query.active === 'true';
      filteredUsers = filteredUsers.filter(user => user.active === activeFilter);
    }

    // Sort users by last login date
    filteredUsers.sort((a, b) => new Date(b.last_login) - new Date(a.last_login));

    res.json(filteredUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getInsights = (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Read user data from the JSON file
    const usersData = fs.readFileSync(usersFilePath);
    const users = JSON.parse(usersData);

    // Calculate insights
    const activeUsersCount = users.filter(user => user.active).length;
    const inactiveUsersCount = users.filter(user => !user.active).length;
    const totalAge = users.reduce((acc, user) => acc + user.age, 0);
    const averageAge = totalAge / users.length;

    res.json({
      active_users_count: activeUsersCount,
      inactive_users_count: inactiveUsersCount,
      average_age: averageAge.toFixed(2)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
