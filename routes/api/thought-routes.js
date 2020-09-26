const router = require('express').Router();
const { route } = require('./user-routes');


const { 
    getAllThoughts,
    getThoughtById,
    addThought,
    deleteThought,
    updateThought

} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);


router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);



module.exports = router;
