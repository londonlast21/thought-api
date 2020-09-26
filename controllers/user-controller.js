const { User } = require('../models');

const userController = {
    // GET all users
    getAllUser(req, res) {
        User.find({})
            //populate with comments when set up
            // .populate({

            // })
            .select('_v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET single user with ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        // populate with comments when set up
        
            .
    }
}