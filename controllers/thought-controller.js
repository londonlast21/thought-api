const { Thought, User } = require('../models');

const thoughtController = {

    // GET all thoughts /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(db)
    }

    // GET thought by Id /api/thoughts/thoughtid



    
    // add thought from user POST api/thoughts/userid
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },

    // remove thought user DELETE api/thoughts/userid
    removeThought({ params }, res) {
        console.log('hitremove');
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }
            return Thought.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));

    }
};

module.exports = thoughtController;