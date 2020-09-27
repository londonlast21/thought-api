const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// friends schema
const FriendSchema = new Schema(
    {
        username: {
            type: String
        },
      
    },
      {
          toJSON: {
              getters: true
          },
          id: false
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
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
            required: [true, "Email required"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [FriendSchema]  
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