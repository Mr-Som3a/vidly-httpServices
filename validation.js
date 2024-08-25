const Joi = require('joi')
const mongoose = require('mongoose')

const schema = Joi.object({
    name:Joi.string().min(3).required(),
})

function validate(object) {
    return schema.validate(object)
}

module.exports= validate