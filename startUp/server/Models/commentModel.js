const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userProfile:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    replies:{
        type:Array
    },
    listing:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Comment',commentSchema)
