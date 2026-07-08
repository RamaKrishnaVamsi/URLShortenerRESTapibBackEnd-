const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    User : String ,
    id : String,
    name : String,
    email : String,
    password : String,
    createdAt : {
        type: Date,
        default :Date.now
    }
})


module.exports = mongoose.model("User" , UserSchema);

// const User = mongoose.model("User" , UserSchema);
// mongoose.model.exports = User;