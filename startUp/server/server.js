const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ["GET", "POST"],
  AccessControlAllowOrigin: ["*"],
  credentials: true
};
const port = process.env.PORT || 7000;
const connectDb = require('./Database/connect');
const chatroomSocket = require('./Handlers/chatroomHandler');

//connecting to mongodb
connectDb();
chatroomSocket(io);

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Handle CORS error
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  }
});

http.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));


