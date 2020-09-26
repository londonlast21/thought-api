const { Thought, User } = require('../models');

const thoughtController = {
    // add thought from user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thought: _id } },
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

    // remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deleteThought => {
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