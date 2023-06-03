const mongoose = require('mongoose')

const {Schema} = mongoose

const CreateProductSchema = new Schema({
    ProductName:{
        type:String,
        required:true
    },

    ProductCategory:{
        type:String,
        required:true
    },

    ProductSubCategory:{
        type:String,
        required:true
    },

    TotalStock:{
        type:Number,
        required:true
    },

    PricePerUnit:{
        type:Number,
        required:true
    },

    Company:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    AccountStatus:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Products',CreateProductSchema)