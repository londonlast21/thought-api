const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');


// ad prefix /comments to routes from userId/comments
router.use('/thoughts', thoughtRoutes);
// add prefix '/users' to routes from user-routes.js
router.use('/users', userRoutes);



module.exports = router;