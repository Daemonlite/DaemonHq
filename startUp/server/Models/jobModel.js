const mongoose = require('mongoose');

// Define job posting schema
const jobPostingSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyLogo:{
    type:String,
    require:false
  },
  location: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  skills:{
    type: String,
    required: true
  },
  responsibilities: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  isFilled: {
    type: Boolean,
    default: false
  },
  comp:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Company',
    required:true
  },
  applications:{
    type:Array,
},
user:{
  type: String,
  required: true
},
jobType:{
  type:String,
  required:true
}
},{
    timestamps:true
});


module.exports = mongoose.model('JobPosting', jobPostingSchema);
