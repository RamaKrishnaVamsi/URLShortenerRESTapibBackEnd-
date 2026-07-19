const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema(
    {
        originalUrl : {
            type : String,
            required : true ,
            trim : true
        },
        shortCode : {
            type : String,
            required : true,
            unique : true,
            index : true
        },
        clicks : {
            type : Number,
            default : 0
        },
        expiryDate :{
            type : Date,
            default : null
        },
        userId : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("Url" , urlSchema);