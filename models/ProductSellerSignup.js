const mongoose = require('mongoose')

const {Schema} = mongoose

const SellerSignupSchema = new Schema({
    Username:{
        type:String,
        required:true
    },

    Password:{
        type:String,
        required:true,
        unique:true
    },
    
    Email:{
        type:String,
        required:true,
        unique:true
    },

    Companyname:{
        type:String,
        required:true,
        unique:true
    },

    FirmName:{
        type:String,
        required:true,
        unique:true
    },

    GST_Number:{
        type:Number,
        required:true,
        unique:true
    },

    FirmOwner:{
        type:String,
        required:true
    },

    CompanyOwner:{
        type:String,
        required:true
    },

    Warehouse:{
        type:String,
        required:true
    },

    CompanyOffice:{
        type:String,
        required:true
    },

    DescriptionOFCompany:{
        type:String,
        required:true
    },  

    SpecializedCategory:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('SellerAccount',SellerSignupSchema)