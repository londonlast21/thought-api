const router = require('express').Router();
// import api routes from /api/index.js
const apiRoutes = require('./api');

//add prefix '/api' to all api routes imported
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>');
});

module.exports = router;