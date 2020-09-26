const { User } = require('../models');

const userController = {
    // GET all users
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET one user by ID
    getuserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                // if no user found send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
          
    },
   

   
}

module.exports = userController;