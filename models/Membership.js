const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring



const membershipSchema = new Schema ({
    name: String,
    description:String,
    price: Number
    
})

mongoose.model('danceoasismembershipoffers',membershipSchema);