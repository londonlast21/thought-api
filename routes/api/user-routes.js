const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

    // friend list funcs
    addFriend,
    removeFriend

} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:userid
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// set up POST friend route at /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:userId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;