const mongoose = require('mongoose')

const newsletterSchema = new mongoose.Schema({
    subject: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    },
    userMail: {
      type: String,
      required: true
    },
    companyName:{
      type: String,
      required: false
    }
 
  });

  module.exports = mongoose.model('Newsletter',newsletterSchema)