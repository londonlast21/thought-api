const { Thought, User } = require('../models');

const thoughtController = {

    // GET all thoughts /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET thought by Id /api/thoughts/thoughtid

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => {
                // if no user found send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID '});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
          
    },

    
    // add thought from user POST api/thoughts/userid
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));

    },

    // remove thought user DELETE api/thoughts/userid
    deleteThought({ params }, res) {
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

    },

    // update thought PUT api/thoughts/thoughtid
    updateThought({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtId) {
                    res.status(404).json({ message: 'No thought found with this ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;