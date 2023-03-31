const  Chatroom  = require('../Models/chatRoom');

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected.`);

    socket.on('join', async ({ name }) => {
      console.log(`User ${socket.id} joined chatroom ${name}.`);

      // Find or create the chatroom in the database
      let chatroom = await Chatroom.findOne({ name }).exec();
      if (!chatroom) {
        chatroom = await Chatroom.create({ name });
      }

      // Join the chatroom
      socket.join(chatroom.id);

      // Send a message to everyone in the chatroom
      io.to(chatroom.id).emit('message', {
        sender: 'system',
        message: `User ${socket.id} joined the chatroom.`,
        createdAt: new Date(),
      });
    });

    socket.on('message', async ({ chatroom, message }) => {
      console.log(`User ${socket.id} sent message to chatroom ${chatroom}: ${message}.`);

      // Find the chatroom in the database
      const dbChatroom = await Chatroom.findById(chatroom).exec();
      if (!dbChatroom) {
        throw new Error(`Chatroom ${chatroom} not found.`);
      }

      // Add the message to the chatroom and save it
      dbChatroom.messages.push({
        sender: socket.id,
        message,
        createdAt: new Date(),
      });
      await dbChatroom.save();

      // Send the message to everyone in the chatroom
      io.to(chatroom).emit('message', {
        sender: socket.id,
        message,
        createdAt: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected.`);
    });
  });
};
