const { relativeTimeRounding } = require('moment');
const { Thought, Reaction } = require('../models');
const User = require('../models/User');

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


    
    // add thought from user POST api/thoughts/
    addThought({ params, body }, res) {
        console.log(body);
        // define what userId is, to then pass into thought.create
        const userId = body.userId;

        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: userId },
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





    // add reaction POST api/thoughts/thoughtId/reactions/
    addReaction({ params, body }, res) {
        console.log(body);
        Reaction.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
                    { id_: params.thoughtId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove DELETE reaction api/thoughts/reactions
    removeReaction({ params }, res) {
        Reaction.findOneAndDelete(
            { _id: params.reactionId })
            .then(deletedReaction => {
                if (!deletedReaction) {
                    return res.status(404).json({ message: 'No reaction found with this ID' });
                }
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { reactions: params.reactionId } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    


    // remove thought user DELETE api/thoughts/thoughtid
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