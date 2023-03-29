const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    projectImage:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    descr:{
        type:String,
        required:true
    },
    comp:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('project',projectSchema)