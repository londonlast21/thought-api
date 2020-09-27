const { relativeTimeRounding } = require('moment');
const { Thought } = require('../models');
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

        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then (dbThoughtData => {
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

        const reactionId = Thought.reactionId;
        


        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
       
    },
    


    // remove thought user DELETE api/thoughts/thoughtid
    deleteThought({ params, body }, res) {
        
        console.log(params);


        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(
            User.findOneAndUpdate(
                { _id: userId },
                console.log(_id),
                { $pull: { thoughts: thoughtId } },
                console.log(thoughtId),
                { new: true }
            )
        )
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