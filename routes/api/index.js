const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix '/users' to routes from user-routes.js
router.use('/users', userRoutes);

module.exports = router;