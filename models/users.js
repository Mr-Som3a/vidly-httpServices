const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
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
    isAdmin:{
        type:Boolean
    }
})

const User = mongoose.model('User', userSchema)

const schema = Joi.object({
    username:Joi.string().min(3).max(255).required(),
    email:Joi.string().email().min(3).max(255).required(),
    password:Joi.string().email().min(3).max(255).required(),
    isAdmin:Joi.boolean()
})

function validateUser(object) {
    return schema.validate(object)
}


module.exports.User = User
module.exports.validate = validateUser

