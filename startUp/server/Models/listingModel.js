const mongoose = require('mongoose')

const listingsSchema = new mongoose.Schema({
   headLine:{
        type:String,
        require:true
    },
    companyName:{
        type:String,
        require:true
    },
    descr:{
        type:String,
        require:true
    },
    revenueGenerated:{
        type:String,
        require:true
    },
    image: {
        type: String,
        required: true
      },
   comp:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    bids:{
      type:Array
    },
    comments:{
        type:Array 
    },
    views:{
        type:Array
    }

},{
    timestamps:true
})
module.exports = mongoose.model('Listing',listingsSchema)