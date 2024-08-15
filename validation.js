const Joi = require('joi')

const schema = Joi.object({
    id: Joi.number().required(),
    name:Joi.string().min(3).required(),
})

function validate(object) {
    return schema.validate(object)
}

module.exports= validate