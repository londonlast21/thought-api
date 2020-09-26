const route = require('express').Router();
const { addThought, removeThought } = require('../../controllers/thought-controller');
const router = require('./user-routes');


// route to post thought /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought);

module.exports = router;
