
const express = require('express');
const router = express.Router();
const Message = require('../Models/chatRoom');

// Handle incoming chat messages
const handleChatMessage = async (message) => {
  try {
    const newMessage = new Message({
      content: message.content,
      sender: message.sender,
      receiver: message.receiver,
    });

    await newMessage.save();

    // emit message to sender and receiver
    io.to(message.sender).emit('message', newMessage);
    io.to(message.receiver).emit('message', newMessage);
  } catch (error) {
    console.error(error);
  }
};

// Define routes
router.post('/messages', (req, res) => {
  const message = req.body;
  handleChatMessage(message);
  res.status(200).send();
});

module.exports = router;
