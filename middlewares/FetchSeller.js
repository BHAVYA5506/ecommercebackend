const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path:'./Config/config.env'})



const FetchSeller = (req,res,next)=>{
    const FetchSellerToken = req.header('SellerAuthToken')
    if(!FetchSellerToken){
        res.status(401).json({Error:"Enter A Valid Token"})
    }

    const VerifySellerToken = jwt.verify(FetchSellerToken,process.env.JWT_TOKEN)
    req.SellerAccountData = VerifySellerToken.id

    next()
}

module.exports = FetchSeller
