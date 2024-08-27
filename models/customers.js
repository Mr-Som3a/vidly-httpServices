const Joi = require('joi')
const mongoose = require('mongoose')


const Customer = new mongoose.model('Customer', new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:5,
        maxlength:255,
    },
    email:{
        type:String,
        required: true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required: true,
        minlength:5,
        maxlength:1024,
    },

}))

const schema = Joi.object({
    name:Joi.string().min(3).max(255).required(),
    email:Joi.string().email().min(3).max(255).required(),
    password:Joi.string().min(3).max(255).required(),
})

function validation(object) {
    return schema.validate(object)
}


module.exports.Customer = Customer
module.exports.validate = validation
