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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: {
            //array of _id values ref User model (self ref)
        },
        
       
    }
);

// get total count of friends
// ThoughtSchema.virtual('thoughtCount').get(function() {
//     return this.reactions.length;
// });


// User model creation
const User = model('User', UserSchema);

// export User model
module.exports = User;