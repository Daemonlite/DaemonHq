const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    userProfile:{
        type:String,
        required:false
    },
    content:{
        type:String,
        required:true
    },
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Reply',replySchema)