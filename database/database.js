const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:"./config/config.env"})

const ConnectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI,console.log("Connected To MongoDB"))
}

module.exports = ConnectToMongo