const mongoose = require('mongoose')

const bidSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userProfile:{
        type:String,
        required:true
    },
    stake:{
        type:String,
        required:true
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    isAccepted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Bid',bidSchema)