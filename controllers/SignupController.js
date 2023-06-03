const { body, validationResult } = require('express-validator')
const UserSignupSchema = require('../models/UserSignup')
exports.CreateUserAccount = async (req, res) => { 

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { Username, Email, Password, MobileNumber, City, Country, CityPincode, HouseAddress } = req.body

    const CreateUserAccount = await UserSignupSchema.create({
        Username: Username,
        Email: Email,
        Password: Password,
        MobileNumber: MobileNumber,
        City: City,
        Country: Country,
        CityPincode: CityPincode,
        HouseAddress: HouseAddress
    })

    const SaveCreateUserAccount = await CreateUserAccount.save()
    
    res.json({SaveCreateUserAccount})
}