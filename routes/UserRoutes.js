const express = require('express')
const router = express.Router() 
const ProductSchema = require('../models/ProductSchema/CreateProductSchema')
const FetchUser = require('../middlewares/FetchUser')
const UserSchema = require('../models/UserSignup')

const {body,validationResult} = require('express-validator')
const PlaceOrderSchema = require('../models/PlaceOrderSchema')
const { findById } = require('../models/PlaceOrderSchema')
const CreateProductSchema = require('../models/ProductSchema/CreateProductSchema')

router.get('/GetAllProducts',async (req,res)=>{
    const GetProducts = await ProductSchema.find({})
    res.json({GetProducts})
})

router.get('/GetSpecificProduct/:ProductId',async (req,res)=>{
    const GetSpecificProduct = await ProductSchema.findById(req.params.ProductId)
    res.json({GetSpecificProduct})
})

router.post('/PlaceOrder/:ProductId', FetchUser, [
    body('TotalAmount').isNumeric().exists(),
    body('ModeOfPayment').isString().exists(),
    // body('OrderStatus').isString().exists()

] ,async (req,res)=>{
    const {TotalAmount,ModeOfPayment} = req.body
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({error:errors.array()})
    }

    const UserId = req.UserData
    const ProductId = req.params.ProductId

    const FindUserDetails = await UserSchema.findById(UserId).select('-Password -Email')
    const FindProduct = await CreateProductSchema.findById(ProductId)

    const {City,Country,CityPincode,HouseAddress} = FindUserDetails
    const {ProductName} = FindProduct

    const CreateOrder = await PlaceOrderSchema.create({
        ProductName,
        ShippmentDetails:[
            {
              City,
              Country,
              CityPincode,
              HouseAddress
            }
        ],
        TotalAmount,
        ModeOfPayment,
        UserId:UserId

    })

    res.json({CreateOrder})
})

router.get('/GetOrders', FetchUser, async (req,res)=>{
    const UserId = req.UserData

    const FindOrders = await PlaceOrderSchema.find({UserId:UserId}).select('-ShippmentDetails')
    res.json({FindOrders})
})

router.delete('/CancelOrder/:OrderId',FetchUser,async (req,res)=>{

    const OrderId = req.params.OrderId
    const UserId = req.UserData

    const FindOrder = await PlaceOrderSchema.findById(OrderId)
    console.log(FindOrder.OrderStatus);
    if(FindOrder.OrderStatus == "Shipped" || "shipped"){
        res.status(200).json({Error:"Sorry Your Order Cannot Be Cancelled Because It Is Shipped But You Can Return The Product When It Will Be Delivered"})
    }

    else{
        const DeleteOrder = await PlaceOrderSchema.findByIdAndDelete(OrderId)
        res.json({Success:"Order Cancelled Succesfully"})
    }

})



module.exports = router