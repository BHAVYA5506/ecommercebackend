const express = require('express')
const dotenv = require('dotenv')
const app = express()
const ConnectToMongo = require('./database/database')
app.use(express.json())

app.use("/api/SellerRoutes",require('./routes/SellerRoutes'))
app.use("/api/UserRoutes",require('./routes/UserRoutes'))
app.use("/api/AuthenticationRoutes",require('./routes/AuthenticationRoutes'))


app.listen(process.env.PORT,()=>{
    console.log(`Server Connected successfully`);
})

ConnectToMongo()