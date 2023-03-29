const mongoose = require('mongoose')

const connectDb = async (req,res) => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('DB CONNECTED')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
 
}

module.exports = connectDb