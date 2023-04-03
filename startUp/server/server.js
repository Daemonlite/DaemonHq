const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);
const port = process.env.PORT || 7000;
const connectDb = require('./Database/connect');
const passport = require("passport");
const session = require('express-session');
const cookieSession = require("cookie-session");
//connecting to mongodb
connectDb();

//sessions
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
//socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/companies', require('./Routes/companyRoutes'));
app.use('/api/listings', require('./Routes/listingRoutes'));
app.use('/api/comments', require('./Routes/commentRoutes'));
app.use('/api/comments/reply', require('./Routes/replyRoutes'));
app.use('/api/listing/bids', require('./Routes/bidRoutes'));
app.use('/api/company/newsletter', require('./Routes/newsLetterRoutes'));
app.use('/api/company/rating', require('./Routes/reviewRoutes'));
app.use('/api/jobs/find', require('./Routes/jobRoutes'));
app.use('/api/auth',require('./Routes/passportRoutes'))





// socket-io connections
io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});


server.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));


