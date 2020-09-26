const { Schema, model } = require('mongoose');
const moment = require('moment');

// username schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
           // validate: 
            
        },
        thoughts: {
            // array of _id values ref Thought.js model
        },
        friends: {
            //array of _id values ref User model (self ref)
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

// User model creation
const User = model('User', UserSchema);

// export User model
module.exports = User;