const { Schema, model, Types } = require('mongoose');
const ReactionSchema = require('./Reaction');
const moment = require('moment');


const ThoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true
        //,
        // validate 1-280 char
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),

    },
    // thoughtId: {
    //     type: Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId,

    // },
    reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }   
);

// get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;