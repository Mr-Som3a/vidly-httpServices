const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minimumlength: 1,
        maximumlength: 255,
    }
})

const Genre = mongoose.model('Genre', genreSchema)


const schema = Joi.object({
    name:Joi.string().min(3).max(255).required(),
})

function validationGenre(object) {
    return schema.validate(object)
}


module.exports.Genre = Genre
module.exports.validate = validationGenre
module.exports.genreSchema = genreSchema
