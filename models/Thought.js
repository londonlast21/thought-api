const { Schema, model, Types } = require('mongoose');
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
    thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId,

    },
    
   
    // replies: [
    //     ReplySchema
    // ]
    // },
    // {
    //     toJSON: {
    //         virtuals: true,
    //     },
    //     id: false
    }
    
);

// friend count


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;