const mongoose = require('mongoose')
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  destructuring


const teachervideoSchema = new Schema ({
    _step: {type:Schema.Types.ObjectId, ref: 'Step' },
    _user: {type:Schema.Types.ObjectId, ref: 'User' },
    dateSent: {type: Date, default:Date.now()},
    videoPath: String,
    videoUrl :String,
    type: String,
    comment: {type: String, default:''},
    originalname:String
    
})

mongoose.model('teachervideos',teachervideoSchema);