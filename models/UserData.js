const mongoose = require('mongoose');
const {Schema} = mongoose; // =const Schema = mongoose.Schema;  es2015 destructuring


const userDataSchema = new Schema ({
    fname: String,
    lname: String,
    _user: {type:Schema.Types.ObjectId, ref: 'User' }

 

})

mongoose.model('danceuserdata',userDataSchema);

/*

*/