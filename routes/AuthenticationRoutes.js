const express = require('express')
const { body, validationResult } = require('express-validator')
const UserSignupSchema = require('../models/UserSignup')
const SellerSignupSchema = require('../models/ProductSellerSignup')
const AdminAccountSchema = require('../models/AdminSignup')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const ProductSellerSignup = require('../models/ProductSellerSignup')

const router = express.Router()

// Signup Routes Starts Here
router.post('/UserSignup', [ 
    body('Username', 'Enter a valid username').isString().isLength({ min: 3 }).exists(),
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Enter a valid password').isString().isLength({ min: 8 }).exists(),
    body('MobileNumber', 'Enter a valid MobileNumber').isNumeric().isLength({ min: 9 }).exists(),
    body('City', 'City Name Cannot be blank').isString().exists(),
    body('Country', 'Country Name Cannot be blank').isString().exists(),
    body('CityPincode', 'Enter a vaild CityPincode').isString().exists(),
    body('HouseAddress', 'HouseAddress Cannot be blank').isString().exists()
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { Username, Email, Password, MobileNumber, City, Country, CityPincode, HouseAddress } = req.body

    const GenerateSalt = await bcrypt.genSalt(10)
    const SecurePassword = await bcrypt.hash(Password,GenerateSalt)

    const CreateUserAccount = await UserSignupSchema.create({
        Username: Username,
        Email: Email,
        Password: SecurePassword,
        MobileNumber: MobileNumber,
        City: City,
        Country: Country,
        CityPincode: CityPincode,
        HouseAddress: HouseAddress
    })

    const SaveCreateUserAccount = await CreateUserAccount.save()
    
    res.json({SaveCreateUserAccount})
})

router.post('/SellerSignUp',[
    body('Username').isString().exists(),
    body('Password').isString().exists().isLength({min:8}),
    body('Email').isEmail().exists(),
    body('Companyname').isString().exists(),
    body('FirmName').isString().exists(),
    body('GST_Number').isNumeric().exists(),
    body('CompanyOwner').isString().exists(),
    body('Warehouse').isString().exists(),
    body('CompanyOffice').isString().exists(),
    body('DescriptionOFCompany').isString().exists(),
    body('DescriptionOFCompany').isString().exists(),
    body('FirmOwner').isString().exists()

], async (req,res)=>{
    const {Username,Password,Email,Companyname,FirmName,GST_Number,CompanyOwner,Warehouse,CompanyOffice,DescriptionOFCompany,SpecializedCategory,FirmOwner} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }

    const GenerateSalt = await bcrypt.genSalt(10)
    const SecurePassword = await bcrypt.hash(Password,GenerateSalt)

    const CreateSellerAccount = await SellerSignupSchema.create({
        Username,
        Password:SecurePassword,
        Email,
        Companyname,
        FirmName,
        GST_Number,
        CompanyOwner,
        Warehouse,
        CompanyOffice,
        DescriptionOFCompany,
        SpecializedCategory,
        FirmOwner
    })

    const SaveCreateSellerAccount = await CreateSellerAccount.save()
    res.json({SaveCreateSellerAccount})
})

router.post('/CreateAdminAccount',[
    body("AdminUsername").isString().exists(),
    body("AccountPassword").isString().exists(),
    body("AdminEmail").isEmail().exists()
], async (req,res)=>{   
    const {AdminUsername,AccountPassword,AdminEmail} = req.body 

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const GenerateSalt = await bcrypt.genSalt(10)
    const SecurePassword = await bcrypt.hash(AccountPassword,GenerateSalt)

    const CreateAdminAccount = await AdminAccountSchema.create({
        AdminUsername,
        AccountPassword:SecurePassword,
        AdminEmail
    })
     
    const SaveCreateAdminAccount = await CreateAdminAccount.save()

    res.json({SaveCreateAdminAccount})
})
// Signup Routes End Here


// Login Routes Starts Here
router.post('/UserLogin',[
    body('Email').isEmail().exists(),
    body('Password').isString().exists()
], async (req,res)=>{
    const {Email,Password} = req.body

    const FindUser = await UserSignupSchema.findOne({Email:Email})

    if(!FindUser){
        res.status(400).json({InvalidCredentials:"Enter Valid Credentials"})
    }

    const ComparePassword = await bcrypt.compare(Password,FindUser.Password)

    if(!ComparePassword){
        res.status(400).json({InvalidCredentials:"Enter Valid Credentials"})
    }

    const UserData = {
        id:FindUser.id
    }

    const Create_JWT_Token = jwt.sign(UserData,process.env.JWT_TOKEN)
    res.json({AuthToken:Create_JWT_Token})
})

router.post('/SellerLogin',[
    body('Email').isEmail().exists(),
    body('Password').isString().exists()
], async (req,res)=>{
    const {Email,Password} = req.body

    const FindUser = await ProductSellerSignup.findOne({Email:Email})

    if(!FindUser){
        res.status(400).json({InvalidCredentials:"Enter Valid Credentials"})
    }

    const ComparePassword = await bcrypt.compare(Password,FindUser.Password)

    if(!ComparePassword){
        res.status(400).json({InvalidCredentials:"Enter Valid Credentials"})
    }

    const SellerData = {
        id:FindUser.id
    }

    const Create_JWT_Token = jwt.sign(SellerData,process.env.JWT_TOKEN)
    console.log(process.env.JWT_TOKEN);
    console.log(SellerData.id);
    res.json({AuthToken:Create_JWT_Token})
})

router.post('/AdminLogin',[
    body('AdminEmail').isEmail().exists(),
    body('AccountPassword').isString().exists()
], async (req,res)=>{
    const {AdminEmail,AccountPassword} = req.body

    const FindAdmin = await AdminAccountSchema.findOne({AdminEmail:AdminEmail})

    if(!FindAdmin){
        res.status(400).json({InvalidCredentials:"Enter Valid Credentials"})
    }

    const ComparePassword = await bcrypt.compare(AccountPassword,FindAdmin.AccountPassword)

    if(!ComparePassword){
        res.status(400).json({InvalidCredentials:"Enter Valid Credentials"})
    }

    const AdminData = {
        id:FindAdmin.id
    }

    const Create_JWT_Token = jwt.sign(AdminData,process.env.JWT_TOKEN)
    res.json({AuthToken:Create_JWT_Token})
})

// Login Routes End Here

module.exports = router
