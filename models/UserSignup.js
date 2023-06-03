const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSignupSchema = new Schema({
    Username:{
        type:String,
        required:true
    },

    Email:{
        type:String,
        required:true,
        unique:true
    },

    Password:{
        type:String,
        required:true,
        unique:true
    },  

    MobileNumber:{
        type:Number,
        required:true,
    },

    // ShippingInformation:[
    //     {

        City:{
            type:String,
            required:true,
            default:"India"
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
    // }
    // ],

    Date:{
        type:Date,
        default:Date.now,
    }
   
})

module.exports = mongoose.model('AppUsers',UserSignupSchema)