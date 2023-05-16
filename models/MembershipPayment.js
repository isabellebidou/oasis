const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring



const membersdhipPaymentSchema = new Schema ({
    _user: {type:Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    expectations:String
    
})

mongoose.model('feedbacks',membersdhipPaymentSchema);