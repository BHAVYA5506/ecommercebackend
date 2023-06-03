const express = require('express')
const FetchSeller = require('../middlewares/FetchSeller')
const CreateProductSchema = require('../models/ProductSchema/CreateProductSchema')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const { findOneAndUpdate } = require('../models/ProductSchema/CreateProductSchema')

router.post('/CreateProduct', FetchSeller, [
    body('ProductName').isString().exists(),
    body('ProductCategory').isString().exists(),
    body('ProductSubCategory').isString().exists(),
    body('TotalStock').isNumeric().exists(),
    body('PricePerUnit').isNumeric().exists()

], async (req, res) => {

    const { ProductName, ProductCategory, ProductSubCategory, TotalStock, PricePerUnit } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const CreateProduct = await CreateProductSchema.create({
        ProductName,
        ProductCategory,
        ProductSubCategory,
        TotalStock,
        PricePerUnit,
        AccountStatus:"Activated",
        Company: req.SellerAccountData
    })

    res.json({ CreateProduct })
})

router.get('/GetCreatedProducts', FetchSeller, async (req, res) => {
    const ProductId = req.SellerAccountData
    console.log(ProductId);
    const GetCreatedProducts = await CreateProductSchema.find({ Company: ProductId })
    res.json({ GetCreatedProducts })
})

router.put('/UpdateCreatedProduct', FetchSeller, [
    body('ProductName').isString().exists(),
    body('ProductCategory').isString().exists(),
    body('ProductSubCategory').isString().exists(),
    body('TotalStock').isNumeric().exists(),
    body('PricePerUnit').isNumeric().exists()
], async (req, res) => {
    const ProductId = req.SellerAccountData
    const {ProductName, ProductCategory, ProductSubCategory, TotalStock, PricePerUnit} = req.body
    
    let UpdatedProduct = {}

    UpdatedProduct.ProductName = ProductName
    UpdatedProduct.ProductCategory = ProductCategory
    UpdatedProduct.ProductSubCategory = ProductSubCategory
    UpdatedProduct.TotalStock = TotalStock
    UpdatedProduct.PricePerUnit = PricePerUnit
    UpdatedProduct.Company = ProductId

    const FindProductToUpdate = await CreateProductSchema.findOne({ Company: ProductId })

    if(FindProductToUpdate.ProductName == ProductName,FindProductToUpdate.ProductCategory == ProductCategory,FindProductToUpdate.ProductSubCategory == ProductSubCategory,FindProductToUpdate.TotalStock == TotalStock,FindProductToUpdate.PricePerUnit == PricePerUnit){
        res.status(401).json({error:"Product Already Updated"})
    }

    else{
        const FindAndUpdateProduct = await CreateProductSchema.findOneAndUpdate({ Company: ProductId }, {
            $set:UpdatedProduct
        },{new:true})

        if(!FindAndUpdateProduct){
            res.status(401).json({error:"Invalid Company Id"})
        }
        res.json({FindAndUpdateProduct})
    }

    // $set:ProductName,ProductCategory, ProductSubCategory, TotalStock, PricePerUnit,Company: ProductId

    // const FindAndUpdateProduct = await CreateProductSchema.findOneAndUpdate({ Company: ProductId })

})

router.delete('/DeleteCreatedProduct', FetchSeller, async (req, res) => {
    const ProductId = req.SellerAccountData

    const FindAndDeleteProduct = await CreateProductSchema.findOneAndDelete({ Company: ProductId })

    if(!FindAndDeleteProduct){
        res.status(401).json({error:"Product Is Already Deleted"})
    }

    else{
        res.json({Deleted:'Deleted Product Succesfully'})
    }

})



module.exports = router

