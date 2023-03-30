const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:false
    },
    email:{
        type:String,
        require:false
    },
    bio:{
        type:String,
        require:false
    },
    password:{
        type:String,
        require:false
    },
    profile:{
        type:String,
        require:false
    },
    location:{
        type:String,
        require:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false  
    },
    isInvestor:{
        type:Boolean,
        default:false  
    },
    applications:{
        type:Array
    }
 
},{
    timestamps:true
})
module.exports = mongoose.model('User',userSchema)