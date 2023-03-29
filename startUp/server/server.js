const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT
const connectDb = require('./Database/connect')


//connecting to mongodb
connectDb()

//MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api/users',require('./Routes/userRoutes'))
app.use('/api/companies',require('./Routes/companyRoutes'))
app.use('/api/listings',require('./Routes/listingRoutes'))
app.use('/api/comments',require('./Routes/commentRoutes'))
app.use('/api/comments/reply',require('./Routes/replyRoutes'))
app.use('/api/listing/bids',require('./Routes/bidRoutes'))
app.use('/api/company/newsletter',require('./Routes/newsLetterRoutes'))
app.use('/api/company/rating',require('./Routes/reviewRoutes'))
app.use('/api/jobs/find',require('./Routes/jobRoutes'))

app.listen(port,()=> console.log(`SERVER RUNNING ON PORT ${port}`))