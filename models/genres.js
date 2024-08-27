const Joi = require('joi')
const mongoose = require('mongoose')


const Genre = new mongoose.model('Genre', new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minimumlength: 1,
        maximumlength: 255,
    }
}))


const schema = Joi.object({
    name:Joi.string().min(3).max(255).required(),
})

function validationGenre(object) {
    return schema.validate(object)
}


module.exports.Genre = Genre
module.exports.validate = validationGenre
