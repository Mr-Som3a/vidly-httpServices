const Joi = require('joi')
Joi.objectId= require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const {genreSchema}=require('../models/genres')


const Movies =  mongoose.model('Movies', new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim:true,
        minlength:5,
        maxlength:255,
    },
    genre: {
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255,
        default:0       
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255,
        default:0
    }
}))

const schema = Joi.object({
    title:Joi.string().min(3).max(255).required(),
    genreId:Joi.objectId().required(),
    numberInStock:Joi.number().integer().required(),
    dailyRentalRate:Joi.number().required(),
    
})

function validateMovie(object) {
    return schema.validate(object)
}


module.exports.Movies = Movies
module.exports.validate = validateMovie
