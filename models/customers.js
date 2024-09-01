const Joi = require('joi')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:1,
        maxlength:255,
    },
    phone:{
        type:Number,
        required: true,
        minlength:5,
        maxlength:255,
    },
    isGold:{
        type:Boolean,
        default:false
    }
})

const Customer = mongoose.model('Customer', customerSchema)

const schema = Joi.object({
    name:Joi.string().min(1).max(255).required(),
    phone:Joi.string().min(5).max(255).required(),
    isGold:Joi.boolean()
})

function validateCustomer(object) {
    return schema.validate(object)
}


module.exports.Customer = Customer
module.exports.validate = validateCustomer
module.exports.customerSchema = customerSchema
