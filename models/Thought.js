const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


// Reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            // 280 char max
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }

);



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
    thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId,

    },
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


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;