const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring



const feedbackSchema = new Schema ({
    _user: {type:Schema.Types.ObjectId, ref: 'User' },
    _studentVideo: {type:Schema.Types.ObjectId, ref: 'StudentVideo' },
    _offer: {type:Schema.Types.ObjectId, ref: 'Offer' },
    dateSent: Date,
    dateCompleted: {type: Date, default:null},
    expectations:String,
    
})

mongoose.model('feedbacks',feedbackSchema);