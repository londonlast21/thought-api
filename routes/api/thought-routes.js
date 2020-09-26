const router = require('express').Router();
const { route } = require('./user-routes');


const { 
    getAllThoughts,
    getThoughtById,
    addThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction

} = require('../../controllers/thought-controller');



router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);


router
    .route('/:thoughtId/')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// reaction routes
router
    .route('/:thoughtId/reactions')
    .put(addReaction)
    .delete(removeReaction);


module.exports = router;
