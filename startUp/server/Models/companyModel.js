const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    logo:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    // specify if its a company or startup
    type:{
        type:String,
        require:true
    },
    contactEmail:{
        type:String,
        require:true
    },
    officePhoneNumber:{
        type:Number,
        require:true
    },
    advertisements:{
        type:Array,
    },
    listings:{
        type:Array,
    },
    ratings:{
        type:Array,
    },
    user:{
        type:String,
        require:true
    },
    netWorth:{
        type:String,
        require:true
    },
    services:{
        type:String,
        require:true
    },
    website:{
        type:String,
        require:false
    },
    category:{
        type:String,
        require:true  
    },
    jobs:{
        type:Array,
    }


},{
    timestamps:true
})
module.exports = mongoose.model('Company',companySchema)