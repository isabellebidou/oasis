const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring


const studentvideoSchema = new Schema ({
    _step: {type:Schema.Types.ObjectId, ref: 'Step' },
    _user: {type:Schema.Types.ObjectId, ref: 'User' },
    step: String,
    dateSent: {type: Date, default:Date.now()},
    videoPath: String,
    videoUrl :String,
    type: String,
    comment: {type: String, default:''},
    originalname:String
    
})

mongoose.model('studentvideos',studentvideoSchema);