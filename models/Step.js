const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring



const stepSchema = new Schema ({
    name: String,
    family:String
    
})

mongoose.model('steps',stepSchema);