const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const FetchUser = (req,res,next)=>{
    const FetchUserToken = req.header('UserAuthToken')
    if(!FetchUserToken){
        res.status(401).json({Error:"Enter A Valid Token"})
    }

    const VerifyUserToken = jwt.verify(FetchUserToken,process.env.JWT_TOKEN)

    req.UserData = VerifyUserToken.id

    next()
}

module.exports = FetchUser