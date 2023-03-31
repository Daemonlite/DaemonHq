const mongoose = require('mongoose')

const chatroomSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  messages: [
    {
      sender: { type: String, required: true },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports =  mongoose.model('Chatroom', chatroomSchema);
