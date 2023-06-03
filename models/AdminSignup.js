const mongoose = require('mongoose')
const {Schema} = mongoose

const AdminAccountSchema = new Schema({
    AdminUsername:{
        type:String,
        required:true
    },

    AccountPassword:{
        type:String,
        required:true,
        unique:true
    },

    AdminEmail:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model('AdminAccount',AdminAccountSchema)