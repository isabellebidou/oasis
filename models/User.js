const mongoose = require('mongoose');
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  es2015 destructuring


const userSchema = new Schema ({
    googleId : String,
    numberOfFeedbacks: {type: Number, default: 0},
    type: {type: String, default: 'danceuser'},
    email: String,
    hasReviews: {type: Boolean, default: false},
    hasMembership:{type: Date}
  
})

mongoose.model('danceusers',userSchema);