const { Schema, model } = require('mongoose');
const moment = require('moment');


// friends schema
const FriendSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },

        
    

    }
);


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
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Friend'
            }
        ]  
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    
    }
    
);


// get total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


// User model creation
const User = model('User', UserSchema);

// export User model
module.exports = User;