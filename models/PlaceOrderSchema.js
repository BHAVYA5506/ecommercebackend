const mongoose = require('mongoose')

const {Schema} = mongoose

const OrderSchema = new Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },

    ProductName:{
        type:String,
        required:true
    },
    
    ShippmentDetails:[
        {
        City:{
            type:String,
            required:true
        },
    
        Country:{
            type:String,
            required:true
        },
    
        CityPincode:{
            type:Number,
            required:true
        },
    
        HouseAddress:{
            type:String,
            required:true
        },
    }
    ],

    TotalAmount:{
        type:Number,
        required:true
    },

    ModeOfPayment:{
        type:String,
        required:true
    },

    Date:{
        type:Date,
        default:Date.now
    },

    OrderStatus:{
        type:String,
        default:"Placed"
    }
})

module.exports = mongoose.model('Orders',OrderSchema)